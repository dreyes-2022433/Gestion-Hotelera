import { AuthPage } from "./pages/AuthPage"
import { NotFound } from "./pages/NotFound"

import { Home } from "./pages/MainPage"
import { HotelPage } from "./pages/HotelPage"
import { NavigationNav } from "./components/NavigateNav"
import { HomePage } from "./pages/Homepage"


export const routes = [
    {path: '/', element: <AuthPage /> },
    {path: '/Home', element: <Home />, children: [
        {
            index: true,
            element: <HomePage/>
        },
        {
            path: 'Hotelpage',
            element: <HotelPage/>
        },

    ] },
    {path: '/*', element: <NotFound /> },
]