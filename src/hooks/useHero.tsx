import { getHeroByPage } from "@/App/actions/get-heroes-by-page.action"
import { useQuery } from "@tanstack/react-query"



const useHero = (
    page: number,
    limit: number,
    category: string
) => {

    return useQuery({
        queryKey: ['heroes', {page, limit, category}],
        queryFn: () => getHeroByPage(+limit, +page, category),
        staleTime: 1000 * 60 * 5 //5 minutos
    })
}

export default useHero
