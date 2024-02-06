import React from 'react';
import ReactDOM from 'react-dom/client';
import Header from './src/components/Header';
import PostJob from './src/components/PostJob';
import Home from './src/components/Home';
import Error from './src/components/Error';
import Login from './src/components/Login';
import Register from './src/components/Register';
import JobDetail from './src/components/JobDetail';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import { Provider } from 'react-redux';
import appStore from './src/utils/appStore';

const AppLayout = () => {
    return (
        <Provider store={appStore}>
            <div className="app">
                <Header/>
                <Outlet />
            </div>
        </Provider>
    );
};


const appRouter = createBrowserRouter([
    {
        path:"/",
        element: <AppLayout />,
        children:[    
            {
                path:"/",
                element: <Home/>
            },
            {
                path:"/postJob",
                element: <PostJob/>
            },
            {
                path: "/jobs/:jobId",
                element: <JobDetail />
            },
            {
                path:"/login",
                element: <Login />
            },
            {
                path:"/register",
                element: <Register />
            }
        ],
        errorElement: <Error />
    }
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);