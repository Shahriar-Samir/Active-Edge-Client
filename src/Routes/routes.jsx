import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import Dashboard from "../Pages/Dashboard/Dashboard";
import Profile from "../Pages/Dashboard/Pages/Profile";
import RecommendedClasses from "../Pages/Dashboard/Pages/RecommendedClasses";
import Balance from "../Pages/Dashboard/Pages/Balance";
import AppliedTrainer from "../Pages/Dashboard/Pages/AppliedTrainer";
import AllTrainers from "../Pages/Dashboard/Pages/AllTrainers";
import AllNewsletterSubs from "../Pages/Dashboard/Pages/AllNewsletterSubs";
import AddNewSlot from "../Pages/Dashboard/Pages/AddNewSlot";
import AddNewForum from "../Pages/Dashboard/Pages/AddNewForum";
import AddNewClass from "../Pages/Dashboard/Pages/AddNewClass";


const routes = createBrowserRouter([
{
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
        },
    ],
},

{
    path: 'dashboard',
    element: <Dashboard/>,
    children:[
        {
            path:'profile',
            element: <Profile/>
        },
        {
            path: 'recommendation',
            element: <RecommendedClasses/>
        },
        {
            path: 'addNewClass',
            element: <AddNewClass/>
        },
        {
            path: 'addNewForum',
            element: <AddNewForum/>
        },
        {
            path: 'addNewSlot',
            element: <AddNewSlot/>
        },
        {
            path: 'newsletterSubscribers',
            element: <AllNewsletterSubs/>
        },
        {
            path: 'allTrainers',
            element: <AllTrainers/>
        },
        {
            path: 'appliedTrainers',
            element: <AppliedTrainer/>
        },
        {
            path: 'balance',
            element: <Balance/>
        },
    ]
}

])

export default routes;