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
        key: 'registrationlist',
        path: '/registrationlist',
        component: React.lazy(() => import('views/lists/RegistrationList')),
        authority: [],
    },
    {
        key: 'installerlist',
        path: '/installerlist',
        component: React.lazy(() => import('views/lists/InstallerList')),
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
    {
        key: 'Bookinglist',
        path: '/BookingList',
        component: React.lazy(() =>
            import('views/Models/BookingList')
        ),
        authority: [],
    },
    {
        key: 'BookingDetails',
        path: '/BookingDetails/:Id',
        component: React.lazy(() => import('views/Models/BookingList/components/BookingView')),
        authority: [],
    },
    {
        key:'bookinginfo',
        path:'/bookinginfo',
        component: React.lazy(() => import ('views/Models/BookingList/components/BookingDetails/BookingTableDetails')),
        authority: []
    },
    {
        key:'surveydetails',
        path:'/surveydetails/:text',
        component: React.lazy(() => import ('views/Models/BookingList/components/BookingDetails/SurveyImages')),
        authority: []
    },
    {
        key:'installerinfo',
        path:'/installerinfo',
        component: React.lazy(() => import ('views/Models/BookingList/components/BookingDetails/InstallerInfo')),
        authority: []
    },
    {
        key: 'VerifyInstaller',
        path: '/VerifyInstaller/:Id',
        component: React.lazy(() => import('views/KycForms')),
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
    {
        key: 'addRoles',
        path: '/addRoles',
        component: React.lazy(() => import('views/Models/Roles/addRoles')),
        authority: [],
    },
    {
        key: 'viewRoles',
        path: '/viewRoles',
        component: React.lazy(() => import('views/Models/Roles/viewRoles')),
        authority: [],
    },
    {
        key: 'assignRole',
        path: '/assignRole',
        component: React.lazy(() => import('views/Models/Roles/assignRole')),
        authority: [],
    },
    {
        key: 'editRole',
        path: '/editRole/:Id',
        component: React.lazy(() => import('views/Models/update')),
        authority: [],
    },
    {
        key: 'viewAssignRoles',
        path: '/viewAssignRoles',
        component: React.lazy(() => import('views/Models/Roles/viewAssignRoles')),
        authority: [],
    },
    {
        key: 'addRights',
        path: '/addRights',
        component: React.lazy(() => import('views/Models/Rights/addRights')),
        authority: [],
    },
    {
        key: 'viewRights',
        path: '/viewRights',
        component: React.lazy(() => import('views/Models/Rights/viewRights')),
        authority: [],
    },
    {
        key: 'addpackage',
        path: '/addpackage',
        component: React.lazy(() => import('views/Models/Package/package/addpackage')),
        authority: [],
    },
    {
        key: 'viewPackage',
        path: '/viewPackage',
        component: React.lazy(() => import('views/Models/Package/package/viewPackage')),
        authority: [],
    },
    {
        key: 'editPackage',
        path: '/editPackage/:Id',
        component: React.lazy(() => import('views/Models/Package/editPackage')),
        authority: [],
    }
    
]
