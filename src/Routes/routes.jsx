import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login";
import Register from "../Pages/Register";


const routes = createBrowserRouter([{
    path: '/',
    element: <App/>,
    children:[
        {
            path:'/',
            element: <Home/>
        },
        {
            path: '/login',
            element: <Login/>
        },
        {
            path: '/signup',
            element: <Register/>
        }
    ]
}])

export default routes;