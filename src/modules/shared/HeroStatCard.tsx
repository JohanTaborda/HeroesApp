import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { JSX, PropsWithChildren } from 'react'
import React from 'react'

interface HeroStatCardProps extends PropsWithChildren{
    title: string,
    icon: JSX.Element
}


const HeroStatCard = React.memo(({title, icon, children}: HeroStatCardProps) => {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{title}</CardTitle>
                {icon}
            </CardHeader>
            <CardContent>
                {children}
            </CardContent>
        </Card>
    )
})

export default HeroStatCard
