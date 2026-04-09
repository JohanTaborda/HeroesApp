import { heroApi } from "@/service/api"
import type { HeroesResponse, Hero } from "@/App/types/TypesHero.response";

const BASE_URL = import.meta.env.VITE_URL_API_BACKEND;

export const getHeroByPage = async(
    limit:number, 
    page: number,
    category: string
):Promise<HeroesResponse> => {
    console.log(category)

    if(isNaN(page)){
        page = 1
    }

    if(isNaN(limit)){
        limit = 6
    }

    const {data} = await heroApi.get<HeroesResponse>('/', {
        params:{
            limit: limit,
            offset: (page - 1) * limit,
            category
        }
    });

    const heroes = data.heroes.map((hero) => ({
        ...hero,
        image: `${BASE_URL}/images/${hero.image}`
    }))

    return {
        ...data,
        heroes: heroes
    };
}

export const getHeroById = async(id:string): Promise<Hero> => {
    const {data} = await heroApi.get<Hero>(`/${id}`);

    return {
        ...data,
        image: `${BASE_URL}/images/${data.image}`
    };
}
