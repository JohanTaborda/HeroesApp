import { heroApi } from "@/service/api"
import type { Hero } from "../types/TypesHero.response";

const BASE_URL = import.meta.env.VITE_URL_API_BACKEND

interface Options{
    name?: string,
    team?: string,
    category?: string,
    universe?: string,
    status?: string,
    strength?: string;
}

export const searchHeroAction = async(options: Options): Promise<Hero[]> => {

    const {name,category,status,strength,team,universe} = options;

    if(!name && !category && !status && !strength && !team && !universe){
        return [];
    }

    const {data} = await heroApi.get<Hero[]>('/search', {
        params: {
            name,
            category,
            status,
            strength,
            team,
            universe
        }
    })

    const hero = data.map((hero) => ({
        ...hero,
        image: `${BASE_URL}/images/${hero.image}`
    }))

    return hero;
}