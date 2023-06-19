import React from 'react'
import authRoute from './authRoute'

export const publicRoutes = [...authRoute]
export const protectedRoutes = [
    {
        key: 'home',
        path: '/home',
        component: React.lazy(() => import('views/Home')),
        authority: [],
    },
    // {
    //     key: 'adduser',
    //     path: '/adduser',
    //     component: React.lazy(() => import('views/Models/adduser')),
    //     authority: [],
    // },
    {
        key: 'Dashboard',
        path: '/dashboard',
        component: React.lazy(() => import('views/Models/dashboard')),
        authority: [],
    },
    {
        key: 'surveyor',
        path: '/serveyorlist',
        component: React.lazy(() => import('views/lists/SurveyorList')),
        authority: [],
    },
    {
        key: 'survey',
        path: '/Survey',
        component: React.lazy(() =>
            import('views/Models/Survey')
        ),
        authority: [],
    },
    {
        key: 'SurveyView',
        path: '/SurveyView/:Id',
        component: React.lazy(() => import('views/Models/Survey/components/SurveyView')),
        authority: [],
    },
    // {
    //     key: 'SurveyorInfo',
    //     path: '/SurveyorInfo',
    //     component: React.lazy(() => import('views/Models/Survey/components/SurveyForm/SurveyorInfo')),
    //     authority: [],
    // },
    {
        key: 'VerifySurveyor',
        path: '/VerifySurveyor/:Id',
        component: React.lazy(() => import('views/KycForm')),
        authority: [],
    },
    {

        key: 'adduser',
        path: '/adduser',
        component: React.lazy(() => import('views/Models/Users/adduser')),
        authority: [],

    },

    {
        key: 'viewUser',
        path: '/viewUser',
        component: React.lazy(() => import('views/Models/Users/viewUser')),
        authority: [],

    },

    {

        key: 'editUser',
        path: '/editUser/:Id',
        component: React.lazy(() => import('views/Models/userEdit')),
        authority: [],

    },
    
]
