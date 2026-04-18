import { RouterProvider } from "react-router"
import { AppRoutes } from "./routes/AppRoutes"
import {QueryClient, QueryClientProvider} from "@tanstack/react-query"
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import FavoritesHeroProvider from "./App/context/FavoritesHeroContext";

const queryClient = new QueryClient();

const HeroesApp = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <FavoritesHeroProvider>
        <RouterProvider router={AppRoutes}/>

        <ReactQueryDevtools initialIsOpen={false} />
      </FavoritesHeroProvider>
    </QueryClientProvider>
  )
}

export default HeroesApp
