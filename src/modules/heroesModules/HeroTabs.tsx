import { FavoriteHeroContext } from "@/App/context/FavoritesHeroContext";
import  { TabsList, TabsTrigger, TabsContent, Tabs } from "@/components/ui/tabs"
import useSummary from "@/hooks/useSummary";
import HeroGrid from "./HeroGrid";
import { use, useMemo, type JSX } from "react"
import { useSearchParams } from "react-router"

interface HeroTabsProps{
    heroGridComponent: JSX.Element,
}

const HeroTabs = ({heroGridComponent}: HeroTabsProps) => {

    const {favoriteCount, favoritesHero} = use(FavoriteHeroContext);
    const [searchParams, setSearchParams] = useSearchParams('');
    const {data: heroSummary} = useSummary();

    const activeTab = searchParams.get('tab') ?? 'all';

    const selectedTab = useMemo(() => {
        const validTabs = ['all', 'favorites', 'heroes', 'villains'];

        return validTabs.includes(activeTab) ? activeTab : 'all';
    }, [activeTab])


    return (
        <Tabs value={selectedTab} className="mb-8">
            <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="all" 
                    onClick={() => setSearchParams((prev) => {
                        prev.set('tab', 'all');
                        prev.set('category', 'all');
                        prev.set('page', '1');
                        return prev
                    })}
                >
                    All Characters ({heroSummary?.totalHeroes})
                </TabsTrigger>
                
                <TabsTrigger value="favorites" className="flex items-center gap-2" 
                    onClick={() => setSearchParams((prev) => {
                        prev.set('tab', 'favorites')
                        prev.set('category', 'favorites')
                        return prev
                    })}
                >
                    Favorites ({favoriteCount})
                </TabsTrigger>

                <TabsTrigger value="heroes" 
                    onClick={() => setSearchParams((prev) => {
                        prev.set('tab', 'heroes');
                        prev.set('category', 'hero');
                        prev.set('page', '1');
                        return prev
                    })}
                >
                    Heroes ({heroSummary?.heroCount})
                </TabsTrigger>

                <TabsTrigger value="villains" 
                    onClick={() => setSearchParams((prev) => {
                        prev.set('tab', 'villains');
                        prev.set('category', 'villain');
                        prev.set('page', '1');
                        return prev
                    })}
                >
                    Villains ({heroSummary?.villainCount})
                </TabsTrigger>
            </TabsList>

            <TabsContent value="all">
                {/*Todos los personajes*/}
                {heroGridComponent}
            </TabsContent>
            <TabsContent value="favorites">
                {/*Todos los personajes favoritos*/}
                {
                    favoritesHero.length > 0
                        ? <HeroGrid heroes={favoritesHero} />
                        : <p className="text-center text-muted-foreground py-8">No hay favoritos aun.</p>
                }
            </TabsContent>
            <TabsContent value="heroes">
                {/*Todos los personajes heroes*/}
                {heroGridComponent}
                {/* {heroGridComponent} */}
            </TabsContent>
            <TabsContent value="villains">
                {/*Todos los personajes villanos*/}
                {heroGridComponent}
                {/* {heroGridComponent} */}
            </TabsContent>
        </Tabs>
    )
}

export default HeroTabs
