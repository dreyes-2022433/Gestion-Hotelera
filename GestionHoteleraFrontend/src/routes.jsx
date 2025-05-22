import { AuthPage } from "./pages/AuthPage"
import { NotFound } from "./pages/NotFound"

import { Home } from "./pages/MainPage"
import { HotelPage } from "./pages/HotelPage"
import { HomePage } from "./pages/Homepage"
import { AdminDashboard } from "./pages/AdminDashboard"
import { HotelComponent } from "./components/Hotel/HotelComponents"

export const routes = [
    { path: '/', element: <AuthPage /> },
    {
        path: '/Home', element: <Home />, children: [
            { index: true, element: <HomePage /> },
            { path: 'Hotelpage', element: <HotelPage /> },
        ],
    },
    { path: '/admin', element: <AdminDashboard /> },
    { path: '/hotels', element: <HotelComponent /> },
    { path: '/*', element: <NotFound /> },

]
