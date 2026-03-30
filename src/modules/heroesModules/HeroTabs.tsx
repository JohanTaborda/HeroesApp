import  { TabsList, TabsTrigger, TabsContent, Tabs } from "@/components/ui/tabs"
import { useMemo, type JSX } from "react"
import { useSearchParams } from "react-router"

interface HeroTabsProps{
    heroGridComponent: JSX.Element,
}

const HeroTabs = ({heroGridComponent}: HeroTabsProps) => {

    const [searchParams, setSearchParams] = useSearchParams('');

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
                        return prev
                    })}
                >
                    All Characters (16)
                </TabsTrigger>
                
                <TabsTrigger value="favorites" className="flex items-center gap-2" 
                    onClick={() => setSearchParams((prev) => {
                        prev.set('tab', 'favorites')
                        return prev
                    })}
                >
                    Favorites (3)
                </TabsTrigger>

                <TabsTrigger value="heroes" 
                    onClick={() => setSearchParams((prev) => {
                        prev.set('tab', 'heroes')
                        return prev
                    })}
                >
                    Heroes (12)
                </TabsTrigger>

                <TabsTrigger value="villains" 
                    onClick={() => setSearchParams((prev) => {
                        prev.set('tab', 'villains')
                        return prev
                    })}
                >
                    Villains (2)
                </TabsTrigger>
            </TabsList>

            <TabsContent value="all">
                {/*Todos los personajes*/}
                {heroGridComponent}
            </TabsContent>
            <TabsContent value="favorites">
                {/*Todos los personajes favoritos*/}
                <h1>Favoritos</h1>
                {/* {heroGridComponent} */}
            </TabsContent>
            <TabsContent value="heroes">
                {/*Todos los personajes heroes*/}
                <h1>Heroes</h1>
                {/* {heroGridComponent} */}
            </TabsContent>
            <TabsContent value="villains">
                {/*Todos los personajes villanos*/}
                <h1>Villanos</h1>
                {/* {heroGridComponent} */}
            </TabsContent>
        </Tabs>
    )
}

export default HeroTabs
