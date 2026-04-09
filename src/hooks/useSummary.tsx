import { getHeroesSummary } from "@/App/actions/get-summary.response";
import { useQuery } from "@tanstack/react-query";

const useSummary = () => {

    return useQuery({
        queryKey: ["heroesSummary"],
        queryFn: () => getHeroesSummary(),
        staleTime: 1000 * 60 * 5 // 5 minutos
    })
}

export default useSummary;
