import { heroApi } from "@/service/api";
import type { HeroesSummary } from "../types/TypesSummary.response";

export const getHeroesSummary = async(): Promise<HeroesSummary> => {
    const {data} = await heroApi.get<HeroesSummary>('/summary');

    return data;
}