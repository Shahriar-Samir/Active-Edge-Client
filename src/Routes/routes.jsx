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
import ManageSlots from "../Pages/Dashboard/Pages/ManageSlots";
import TrainerBooking from "../Pages/TrainerBooking";
import Payment from "../Pages/Payment";
import ErrorPage from "../Pages/ErrorPage";
import PrivateRoute from "../Providers/PrivateRoute";
import AdminRoute from "./AdminRoute";
import MemberRoute from "./MemberRoute";


const routes = createBrowserRouter([
{
    path: '/',
    element: <App/>,
    errorElement: <ErrorPage/>,
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
            element: <PrivateRoute><MemberRoute><TrainerApplication/></MemberRoute></PrivateRoute>
        },
        {
            path: '/trainerBooking/:slotId',
            element: <PrivateRoute><MemberRoute><TrainerBooking/></MemberRoute></PrivateRoute>
        },
        {
            path: '/payment',
            element: <PrivateRoute><MemberRoute><Payment/></MemberRoute></PrivateRoute>
        },
    ],
},

{
    path: 'dashboard',
    element: <PrivateRoute><Dashboard/></PrivateRoute>,
    children:[
        {
            path:'profile',
            element: <MemberRoute><Profile/></MemberRoute>
        },
        {
            path: 'recommendedClasses',
            element: <MemberRoute><RecommendedClasses/></MemberRoute>
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
            element: <AdminRoute><AllNewsletterSubs/></AdminRoute>
        },
        {
            path: 'allTrainers',
            element: <AdminRoute><AllTrainers/></AdminRoute>
        },
        {
            path: 'appliedTrainers',
            element: <AdminRoute><AppliedTrainer/></AdminRoute>
        },
        {
            path: 'balance',
            element: <AdminRoute><Balance/></AdminRoute>
        },
        {
            path: 'activityLog',
            element: <MemberRoute><ActivityLog/></MemberRoute>
        },
        {
            path: 'manageSlots',
            element: <ManageSlots/>
        },
    ]
}

])

export default routes;