import { Link, useLocation } from "react-router"
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "../ui/navigation-menu"
import { cn } from "@/lib/utils";

export const CustomMenu = () => {
    const { pathname } = useLocation();

    const isActive = (path: string) => pathname === path;

    console.log(pathname);

    return (
        <NavigationMenu className="py-5">
            <NavigationMenuList>
                {/* Home */}
                <NavigationMenuItem>
                    <NavigationMenuLink
                        render={<Link to="/" />}
                        className={cn(isActive('/') && 'bg-slate-200', 'p-2 rounded-md')}
                    >
                        Inicio
                    </NavigationMenuLink>
                </NavigationMenuItem>

                {/* Search */}
                <NavigationMenuItem>
                    <NavigationMenuLink
                        render={<Link to="/search" />}
                        className={cn(
                            isActive('/search') && 'bg-slate-200',
                            'p-2 rounded-md'
                        )}
                    >
                        Buscar superhéroes
                    </NavigationMenuLink>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    )
}
