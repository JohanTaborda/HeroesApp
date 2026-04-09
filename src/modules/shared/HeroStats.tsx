import React from "react"
import HeroStatCard from "./HeroStatCard"
import useSummary from "@/hooks/useSummary"

import { Badge } from "@/components/ui/badge"
import { Heart, Trophy, Users, Zap } from "lucide-react"

const HeroStats = React.memo(({}) => {

    const {data: heroSummary} = useSummary(); //Utilizamos el customHook

    const statsHero = [
        {
            title: "Total Characters",
            icon: <Users className="h-4 w-4 text-muted-foreground" />,
            children: (
                <>
                    <div className="text-2xl font-bold">{heroSummary?.totalHeroes}</div>
                        <div className="flex gap-1 mt-2">
                            <Badge variant="secondary" className="text-xs">
                                {heroSummary?.heroCount} Heroes
                            </Badge>
                            <Badge variant="destructive" className="text-xs">
                                {heroSummary?.villainCount} Villains
                            </Badge>
                    </div>
                </>
            )
        },
        {
            title: "Favorites",
            icon: <Heart className="h-4 w-4 text-muted-foreground" />,
            children: (
                <>
                    {/* TODO: Tenemos que calcular este valor */}
                    <div className="text-2xl font-bold text-red-600">3</div>
                    <p className="text-xs text-muted-foreground">18.8% of total</p>
                </>
            )
        },
        {
            title: "Strongest",
            icon: <Zap className="h-4 w-4 text-muted-foreground" />,
            children: (
                <>
                    <div className="text-lg font-bold">{heroSummary?.strongestHero.alias}</div>
                    <p className="text-xs text-muted-foreground">Strength: {heroSummary?.strongestHero.strength}/10</p>
                </>
            )
        },
        {
            title:"Smartest",
            icon: <Trophy className="h-4 w-4 text-muted-foreground" />,
            children: (
                <>
                    <div className="text-lg font-bold">{heroSummary?.smartestHero.alias}</div>
                    <p className="text-xs text-muted-foreground">Intelligence: {heroSummary?.smartestHero.intelligence}/10</p>
                </>
            )
        },

    ]

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">

            {statsHero.map((v, i) => (
                <HeroStatCard 
                    key={i}
                    title={v.title}
                    icon={v.icon}
                >
                    {v.children}
                </HeroStatCard>
            ))}

        </div>
    )
})

export default HeroStats
