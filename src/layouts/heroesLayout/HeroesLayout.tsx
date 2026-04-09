import CustomNavigation from "@/components/custom/CustomNavigation"
import { Outlet } from "react-router"

const HeroesLayout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <div className="max-w-7xl mx-auto p-6">

        <CustomNavigation/>

        <Outlet/> {/*Salida de la ruta*/}
      </div>
    </div>
  )
}

export default HeroesLayout
