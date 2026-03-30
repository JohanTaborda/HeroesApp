import { Link, useLocation } from 'react-router'
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from '../ui/navigation-menu'
import { cn } from '@/lib/utils';

const CustomNavigation = () => {

    const {pathname} = useLocation();

    const isActive = (path: string) => pathname === path;

    const sectionNavigation = [
        {
            ref: "/", 
            name: "Inicio"
        },
        {
            ref: "/search", 
            name: "Buscar"
        },
    ];

    return (
        <NavigationMenu>
            <NavigationMenuList>
            {
                sectionNavigation.map((v, i) => (
                    <NavigationMenuItem key={i}>
                        <NavigationMenuLink 
                            asChild 
                            className={cn(isActive(v.ref) && "bg-slate-200", "p-2 m-1 rounded-md hover:bg-slate-200")}
                        >
                            <Link to={v.ref}>{v.name}</Link>
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                ))
            }
            </NavigationMenuList>
        </NavigationMenu>
    )
}

export default CustomNavigation
