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
import AllTrainersPage from "../Pages/AllTrainers";
import AllNewsletterSubs from "../Pages/Dashboard/Pages/AllNewsletterSubs";
import AddNewSlot from "../Pages/Dashboard/Pages/AddNewSlot";
import AddNewForum from "../Pages/Dashboard/Pages/AddNewForum";
import AddNewClass from "../Pages/Dashboard/Pages/AddNewClass";
import ActivityLog from "../Pages/Dashboard/Pages/ActivityLog";
import AllClasses from "../Pages/AllClasses";
import Forum from "../Pages/Forum";
import TrainerDetails from "../Pages/TrainerDetails";
import TrainerApplication from "../Pages/TrainerApplication";


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
        {
            path: '/allTrainers',
            element: <AllTrainersPage/>
        },
        {
            path: '/allClasses',
            element: <AllClasses/>
        },
        {
            path: '/forum',
            element: <Forum/>
        },
        {
            path: '/profile/:id',
            element: <TrainerDetails/>
        },
        {
            path: '/trainerApplication',
            element: <TrainerApplication/>
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
            path: 'recommendedClasses',
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
        {
            path: 'activityLog',
            element: <ActivityLog/>
        },
    ]
}

])

export default routes;