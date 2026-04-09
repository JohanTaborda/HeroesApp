import { useSearchParams } from "react-router"
import useHero from "@/hooks/useHero"

import CustomHeader from "@/components/custom/CustomHeader"
import HeroStats from "@/modules/shared/HeroStats"
import HeroGrid from "@/modules/heroesModules/HeroGrid"
import HeroTabs from "@/modules/heroesModules/HeroTabs"
import CustomPagination from "@/components/custom/CustomPagination"
import CustomBreadcrumbs from "@/components/custom/CustomBreadcrumbs"

export const HomePage = () => {

  const [searchParams] = useSearchParams();

  const page = searchParams.get('page') ?? 1; //Aplicamos el nullish coalescing
  const limit = searchParams.get('limit') ?? 6;
  const category = searchParams.get('category') ?? "all";


  const {data: heroesResponse} = useHero(+page,+limit, category);

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