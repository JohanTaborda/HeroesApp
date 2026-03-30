import { lazy } from "react";
import { createBrowserRouter } from "react-router";


import AdminPage from "@/pages/admin/AdminPage";
import AdminLayout from "@/layouts/adminLayout/AdminLayout";
import HeroesPage from "@/pages/heroes/HeroesPage";
import {HomePage} from "@/pages/home/HomePage";
import HeroesLayout from "@/layouts/heroesLayout/HeroesLayout";

const SearchPage = lazy(() => import('@/pages/search/SearchPage')); //Lazyload -> Carga diferida.

export const AppRoutes = createBrowserRouter([
    {
        path: '/',
        element: <HeroesLayout/>,
        children: [
            {
                index: true,
                element: <HomePage/>
            },
            {
                path: 'heroes/:idSlug',
                element: <HeroesPage/>
            },
            {
                path: 'search',
                element: <SearchPage/>
            },
            {
                path: '*',
                element: <HomePage/>
            },
        ]
    },
    
    {
        path: '/admin',
        element: <AdminLayout/>,
        children: [
            {
                index: true,
                element: <AdminPage/>
            },
        ]
    },
    
])