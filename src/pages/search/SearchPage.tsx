import CustomBreadcrumbs from "@/components/custom/CustomBreadcrumbs"
import CustomHeader from "@/components/custom/CustomHeader"
import SearchModule from "@/modules/searchModules/SearchControls"
import HeroStats from "@/modules/shared/HeroStats"

const SearchPage = () => {
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

    </>
  )
}

export default SearchPage
