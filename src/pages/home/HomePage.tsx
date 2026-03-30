import { getHeroByPage } from "@/App/actions/get-heroes-by-page.action"
import { useQuery } from "@tanstack/react-query"

import CustomHeader from "@/components/custom/CustomHeader"
import HeroStats from "@/modules/shared/HeroStats"
import HeroGrid from "@/modules/heroesModules/HeroGrid"
import HeroTabs from "@/modules/heroesModules/HeroTabs"
import CustomPagination from "@/components/custom/CustomPagination"
import CustomBreadcrumbs from "@/components/custom/CustomBreadcrumbs"
import { useSearchParams } from "react-router"

export const HomePage = () => {

  const [searchParams] = useSearchParams();

  const page = searchParams.get('page') ?? 1;
  const limit = searchParams.get('limit') ?? 6;

  const {data:heroesResponse} = useQuery({
    queryKey: ['heroes', page, limit],
    queryFn: () => getHeroByPage(+limit, +page),
    staleTime: 1000 * 60 * 5 //5 minutos
  })

  return (
    <>
      <>

        {/* Header */}
        <CustomHeader title="Superhero Universe" description="Discover, explore, and manage your favorite superheroes and villains"/>

        {/*Breadcrumbs*/}
        <CustomBreadcrumbs currentPage="Súper Héroes"/>

        {/* Stats Dashboard */}
        <HeroStats/>

        {/* Tabs */}
        <HeroTabs heroGridComponent=
          {
            <HeroGrid heroes={heroesResponse?.heroes ?? []}/>
          }
        /> 

        {/* Pagination */}
        <CustomPagination totalPages={heroesResponse?.pages ?? 1}/>

      </>
    </>
  )
}