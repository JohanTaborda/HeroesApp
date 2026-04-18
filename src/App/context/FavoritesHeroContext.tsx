import { createContext, useEffect, useState, type PropsWithChildren } from "react";
import type { Hero } from "../types/TypesHero.response";

interface FavoritesHeroContext{
    favoritesHero: Hero[],
    favoriteCount: number,

    //Methods
    isFavorite: (hero: Hero) => boolean,
    toggleFavorite: (hero: Hero) => void,

}

export const FavoriteHeroContext = createContext({} as FavoritesHeroContext);

const getFavoritesFromLocalStorage = (): Hero[] => {
    const favorites = localStorage.getItem('favorites');

    return favorites ? JSON.parse(favorites) : [];
}

const FavoritesHeroProvider = ({children}: PropsWithChildren) => {

    const [favorites, setFavorites] = useState<Hero[]>(getFavoritesFromLocalStorage());

    const toggleFavorite = (hero: Hero) => {

        const heroExist = favorites.find((v) => v.id === hero.id);

        if(heroExist) {
            const newFavorites = favorites.filter((h) => h.id !== hero.id)
            setFavorites(newFavorites);
            return;
        };
        
        setFavorites([...favorites, hero]);
    }

    const handleIsFavorite = (hero: Hero) => {
        return favorites.some(h => h.id === hero.id)
    }

    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }, [favorites])


    return(
        <FavoriteHeroContext
            value={{
                //State
                favoritesHero: favorites,
                favoriteCount: favorites.length,

                //Methods
                toggleFavorite: toggleFavorite,
                isFavorite: handleIsFavorite,
            }}
        >
            {children}
        </FavoriteHeroContext>
    )
}

export default FavoritesHeroProvider
