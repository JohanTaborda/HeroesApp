import type { Hero } from '@/App/types/TypesHero.response'
import HeroGridCard from './HeroGridCard'

interface HeroGridProps{
    heroes: Hero[]   
}

const HeroGrid = ({heroes}:HeroGridProps) => {


    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            { //Mapeamos todos los heroes y los enviamos hacia el HeroGridCard
                heroes.map((hero) => (
                    <HeroGridCard
                        key={hero.id}
                        dataHero={hero}
                    />
                ))
            }
        </div>
    )
}

export default HeroGrid
