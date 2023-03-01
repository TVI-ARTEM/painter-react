import {observer} from "mobx-react-lite";
import {Routes, Route, Navigate} from "react-router-dom";
import {authRoutes, publicRoutes} from "./routes";
import {MAIN_ROUTE} from "../utils/consts";

const AppRouter = observer(() => {
        const isAuth = true
        const authComponents = authRoutes.map(
            ({path, Component}) =>
                <Route path={path} key={path} element={<Component/>}/>
        )

        const publicComponents = publicRoutes.map(
            ({path, Component}) =>
                <Route path={path} key={path} element={<Component/>}/>
        )
        return (
            <Routes>
                {isAuth && authComponents}
                {publicComponents}
                <Route path="*" element={
                    <Navigate to={MAIN_ROUTE} replace={true}/>
                }/>
            </Routes>
        )
    }
);

export default AppRouter;