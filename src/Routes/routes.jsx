import { createBrowserRouter } from "react-router-dom";
import App from "../App";


const routes = createBrowserRouter([{
    path: '/',
    element: <App/>,
    children:[
        {
            path:'/',
            element:
        }
    ]
}])

export default routes;