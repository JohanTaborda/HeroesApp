import CustomBreadcrumbs from "@/components/custom/CustomBreadcrumbs"
import CustomHeader from "@/components/custom/CustomHeader"
import SearchModule from "@/modules/searchModules/SearchControls"
import HeroStats from "@/modules/shared/HeroStats"
import { useQuery } from "@tanstack/react-query"

import { searchHeroAction } from "@/App/actions/search-heroes.action"
import { useSearchParams } from "react-router"
import HeroGrid from "@/modules/heroesModules/HeroGrid"

const SearchPage = () => {

  const [searchParams] = useSearchParams();

  const name = searchParams.get('name') ?? undefined;
  const strength = searchParams.get('strength') ?? undefined;


  const {data} = useQuery({
    queryKey: ["name", {name, strength}],
    queryFn: () => searchHeroAction({name, strength}),
    staleTime: 6000 * 5,
    retry:false
  }); 

  if(!data) return;

  return (
    <>
      <CustomHeader 
        title="Search Superhero Universe" 
        description="Discover, explore, and manage your favorite superheroes and villains"
      />

      <CustomBreadcrumbs currentPage="Buscador de Héroes"
        breadCrumbs={[
          {label: "home",to: "/"},
          {label: "home1",to: "/"},
          {label: "home2",to: "/"},
        ]}
      />

      {/* Stats Dashboard */}
      <HeroStats/>

      {/* Search */}
      <SearchModule/>

      {/*HeroGrid */} 
      <HeroGrid heroes={data}/>
    </>
  )
}

export default SearchPage
