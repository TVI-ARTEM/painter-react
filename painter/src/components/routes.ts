import {ARTWORK_ROUTE, CREATION_ROUTE, MAIN_ROUTE, PROFILE_ROUTE, SEARCH_ROUTE} from "../utils/consts";
import MainPage from "./pages/MainPage";
import CreationPage from "./pages/creationPage/CreationPage";
import ProfilePage from "./pages/ProfilePage";
import ArtworkPage from "./pages/ArtworkPage";
import SearchPage from "./pages/SearchPage";

export const authRoutes = [
    {
        path: CREATION_ROUTE,
        Component: CreationPage
    }
]

export const publicRoutes = [
    {
        path: MAIN_ROUTE,
        Component: MainPage
    },
    {
        path: PROFILE_ROUTE,
        Component: ProfilePage
    },
    {
        path: ARTWORK_ROUTE,
        Component: ArtworkPage
    },
    {
        path: SEARCH_ROUTE,
        Component: SearchPage
    }
]