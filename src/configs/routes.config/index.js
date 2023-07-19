// import React from 'react'
// import authRoute from './authRoute'

// export const publicRoutes = [...authRoute]
// export const protectedRoutes = [
//     {
//         key: 'Home',
//         path: '/home',
//         component: React.lazy(() => import('views/Home')),
//         authority: [],
//     },
//     {
//         key: 'Dashboard',
//         path: '/dashboard',
//         component: React.lazy(() => import('views/Models/dashboard')),
//         authority: [],
//     },
//     {
//         key: 'surveyor',
//         path: '/serveyorlist',
//         component: React.lazy(() => import('views/lists/SurveyorList')),
//         authority: [],
//     },
//     {
//         key: 'registrationlist',
//         path: '/registrationlist',
//         component: React.lazy(() => import('views/lists/RegistrationList')),
//         authority: [],
//     },
//     {
//         key: 'installerlist',
//         path: '/installerlist',
//         component: React.lazy(() => import('views/lists/InstallerList')),
//         authority: [],
//     },
//     {
//         key: 'InstallerLists',
//         path: '/InstallerLists',
//         component: React.lazy(() => import('views/lists/InstallerLists')),
//         authority: [],
//     },
//     {
//         key: 'survey',
//         path: '/Survey',
//         component: React.lazy(() =>
//             import('views/Models/Survey')
//         ),
//         authority: [],
//     },
//     {
//         key: 'SurveyView',
//         path: '/SurveyView/:Id',
//         component: React.lazy(() => import('views/Models/Survey/components/SurveyView')),
//         authority: [],
//     },
//     {
//         key: 'Bookinglist',
//         path: '/BookingList',
//         component: React.lazy(() =>
//             import('views/Models/BookingList')
//         ),
//         authority: [],
//     },
//     {
//         key: 'RejectionList',
//         path: '/RejectionList',
//         component: React.lazy(() =>
//             import('views/Models/RejectionList')
//         ),
//         authority: [],
//     },
//     {
//         key: 'BookingDetails',
//         path: '/BookingDetails/:Id',
//         component: React.lazy(() => import('views/Models/BookingList/components/BookingView')),
//         authority: [],
//     },
//     {
//         key: 'RejectionDetails',
//         path: '/RejectionDetails/:Id',
//         component: React.lazy(() => import('views/Models/RejectionList/components/BookingDetails/SurveyTabs')),
//         authority: [],
//     },
//     {
//         key:'bookinginfo',
//         path:'/bookinginfo',
//         component: React.lazy(() => import ('views/Models/BookingList/components/BookingDetails/BookingTableDetails')),
//         authority: []
//     },
//     {
//         key:'surveydetails',
//         path:'/surveydetails/:text',
//         component: React.lazy(() => import ('views/Models/BookingList/components/BookingDetails/SurveyImages')),
//         authority: []
//     },
//     {
//         key:'installerinfo',
//         path:'/installerinfo',
//         component: React.lazy(() => import ('views/Models/BookingList/components/BookingDetails/InstallerInfo')),
//         authority: []
//     },
//     {
//         key: 'VerifyInstaller',
//         path: '/VerifyInstaller/:Id',
//         component: React.lazy(() => import('views/KycForms')),
//         authority: [],
//     },
//     {
//         key: 'VerifySurveyor',
//         path: '/VerifySurveyor/:Id',
//         component: React.lazy(() => import('views/KycForm')),
//         authority: [],
//     },
//     {

//         key: 'adduser',
//         path: '/adduser',
//         component: React.lazy(() => import('views/Models/Users/adduser')),
//         authority: [],

//     },

//     {
//         key: 'viewUser',
//         path: '/viewUser',
//         component: React.lazy(() => import('views/Models/Users/viewUser')),
//         authority: [],

//     },

//     {

//         key: 'editUser',
//         path: '/editUser/:Id',
//         component: React.lazy(() => import('views/Models/userEdit')),
//         authority: [],

//     },
//     {
//         key: 'addRoles',
//         path: '/addRoles',
//         component: React.lazy(() => import('views/Models/Roles/addRoles')),
//         authority: [],
//     },
//     {
//         key: 'viewRoles',
//         path: '/viewRoles',
//         component: React.lazy(() => import('views/Models/Roles/viewRoles')),
//         authority: [],
//     },
//     {
//         key: 'assignRole',
//         path: '/assignRole',
//         component: React.lazy(() => import('views/Models/Roles/assignRole')),
//         authority: [],
//     },
//     {
//         key: 'editRole',
//         path: '/editRole/:Id',
//         component: React.lazy(() => import('views/Models/update')),
//         authority: [],
//     },
//     {
//         key: 'viewAssignRoles',
//         path: '/viewAssignRoles',
//         component: React.lazy(() => import('views/Models/Roles/viewAssignRoles')),
//         authority: [],
//     },
//     {
//         key: 'addRights',
//         path: '/addRights',
//         component: React.lazy(() => import('views/Models/Rights/addRights')),
//         authority: [],
//     },
//     {
//         key: 'viewRights',
//         path: '/viewRights',
//         component: React.lazy(() => import('views/Models/Rights/viewRights')),
//         authority: [],
//     },
//     {
//         key: 'addpackage',
//         path: '/addpackage',
//         component: React.lazy(() => import('views/Models/Package/package/addpackage')),
//         authority: [],
//     },
//     {
//         key: 'viewPackage',
//         path: '/viewPackage',
//         component: React.lazy(() => import('views/Models/Package/package/viewPackage')),
//         authority: [],
//     },
//     {
//         key: 'editPackage',
//         path: '/editPackage/:Id',
//         component: React.lazy(() => import('views/Models/Package/editPackage')),
//         authority: [],
//     },
//     {
//         key: 'packageMap',
//         path: '/packageMap',
//         component: React.lazy(() => import('views/Models/Package/package/packageMapping')),
//         authority: [],
//     },
//     {
//         key: 'viewPackageMapping',
//         path: '/viewPackageMapping/:Id',
//         component: React.lazy(() => import('views/Models/Package/viewPackageMapping')),
//         authority: [],
//     },
//     {
//         key: 'addSuspend',
//         path: '/addSuspend',
//         component: React.lazy(() => import('views/Suspend/suspend/addSuspend')),
//         authority: [],
//     },
//     {
//         key: 'viewSuspend',
//         path: '/viewSuspend',
//         component: React.lazy(() => import('views/Suspend/suspend/viewSuspend')),
//         authority: [],
//     },
//     {
//         key: 'viewCancelSuspend',
//         path: '/viewCancelSuspend',
//         component: React.lazy(() => import('views/Suspend/suspend/viewCancelSuspend')),
//         authority: [],
//     },
//     {
//         key: 'addBlacklist',
//         path: '/addBlacklist',
//         component: React.lazy(() => import('views/Suspend/suspend/addBlacklist')),
//         authority: [],
//     },
//     {
//         key: 'viewBlacklist',
//         path: '/viewBlacklist',
//         component: React.lazy(() => import('views/Suspend/suspend/viewBlacklist')),
//         authority: [],
//     },
//     {
//         key: 'viewCancelBlacklist',
//         path: '/viewCancelBlacklist',
//         component: React.lazy(() => import('views/Suspend/suspend/viewCancelBlacklist')),
//         authority: [],
//     },
//     {
//         key: 'viewFaq',
//         path: '/viewFaq',
//         component: React.lazy(() => import('views/FAQ/FAQ/viewFaq')),
//         authority: [],
//     },
//     {
//         key: 'viewRateReview',
//         path: '/viewRateReview',
//         component: React.lazy(() => import('views/RateReview/viewRateReview')),
//         authority: [],
//     },
//     {
//         key: 'bookingSurveyDetails',
//         path: '/bookingSurveyDetails/:Id',
//         component: React.lazy(() => import('views/Models/BookingList/components/BookingDetails/SurveyTabs')),
//         authority: [],
//     },
//     {
//         key: 'map',
//         path: '/map',
//         component: React.lazy(() => import('views/Map/map')),
//         authority: [],
//     },    
// ]


// Route Api from 
import React from 'react'
import authRoute from './authRoute'

export const publicRoutes = [...authRoute]
export const protectedRoutes = [
    {
        key: 'Home',
        path: '/home',
        component: React.lazy(() => import('views/Home')),
        authority: [],
    },
    {
        key: 'SurveyorList',
        path: '/serveyorlist',
        component: React.lazy(() => import('views/lists/SurveyorList')),
        authority: [],
    },
    {
        key: 'RegistartionRequestList',
        path: '/registrationlist',
        component: React.lazy(() => import('views/lists/RegistrationList')),
        authority: [],
    },
    {
        key: 'RegistrationList',
        path: '/installerlist',
        component: React.lazy(() => import('views/lists/InstallerList')),
        authority: [],
    },
    {
        key: 'SolarCompanyList',
        path: '/InstallerLists',
        component: React.lazy(() => import('views/lists/InstallerLists')),
        authority: [],
    },
    // {
    //     key: 'survey',
    //     path: '/Survey',
    //     component: React.lazy(() =>
    //         import('views/Models/Survey')
    //     ),
    //     authority: [],
    // },
    // {
    //     key: 'SurveyView',
    //     path: '/SurveyView/:Id',
    //     component: React.lazy(() => import('views/Models/Survey/components/SurveyView')),
    //     authority: [],
    // },
    {
        key: 'BookingList',
        path: '/BookingList',
        component: React.lazy(() =>
            import('views/Models/BookingList')
        ),
        authority: [],
    },
    {
        key: 'RejectionList',
        path: '/RejectionList',
        component: React.lazy(() =>
            import('views/Models/RejectionList')
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
        key: 'RejectionDetails',
        path: '/RejectionDetails/:Id',
        component: React.lazy(() => import('views/Models/RejectionList/components/BookingDetails/SurveyTabs')),
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
    {
        key: 'VerifySurveyor',
        path: '/VerifySurveyor/:Id',
        component: React.lazy(() => import('views/KycForm')),
        authority: [],
    },
    {

        key: 'AddUser',
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
        key: 'AddRole',
        path: '/addRoles',
        component: React.lazy(() => import('views/Models/Roles/addRoles')),
        authority: [],
    },
    {
        key: 'ViewRole',
        path: '/viewRoles',
        component: React.lazy(() => import('views/Models/Roles/viewRoles')),
        authority: [],
    },
    {
        key: 'AssignRole',
        path: '/assignRole',
        component: React.lazy(() => import('views/Models/Roles/assignRole')),
        authority: [],
    },
    {
        key: 'EditRole',
        path: '/editRole/:Id',
        component: React.lazy(() => import('views/Models/update')),
        authority: [],
    },
    {
        key: 'ViewAssignRoles',
        path: '/viewAssignRoles',
        component: React.lazy(() => import('views/Models/Roles/viewAssignRoles')),
        authority: [],
    },
    {
        key: 'AddRights',
        path: '/addRights',
        component: React.lazy(() => import('views/Models/Rights/addRights')),
        authority: [],
    },
    {
        key: 'ViewRights',
        path: '/viewRights',
        component: React.lazy(() => import('views/Models/Rights/viewRights')),
        authority: [],
    },
    {
        key: 'AddPackage',
        path: '/addpackage',
        component: React.lazy(() => import('views/Models/Package/package/addpackage')),
        authority: [],
    },
    {
        key: 'ViewPackage',
        path: '/viewPackage',
        component: React.lazy(() => import('views/Models/Package/package/viewPackage')),
        authority: [],
    },
    {
        key: 'editPackage',
        path: '/editPackage/:Id',
        component: React.lazy(() => import('views/Models/Package/editPackage')),
        authority: [],
    },
    {
        key: 'packageMapping',
        path: '/packageMap',
        component: React.lazy(() => import('views/Models/Package/package/packageMapping')),
        authority: [],
    },
    {
        key: 'viewPackageMapping',
        path: '/viewPackageMapping/:Id',
        component: React.lazy(() => import('views/Models/Package/viewPackageMapping')),
        authority: [],
    },
    {
        key: 'AddSuspend',
        path: '/addSuspend',
        component: React.lazy(() => import('views/Suspend/suspend/addSuspend')),
        authority: [],
    },
    {
        key: 'ViewSuspend',
        path: '/viewSuspend',
        component: React.lazy(() => import('views/Suspend/suspend/viewSuspend')),
        authority: [],
    },
    {
        key: 'viewCancelSuspend',
        path: '/viewCancelSuspend',
        component: React.lazy(() => import('views/Suspend/suspend/viewCancelSuspend')),
        authority: [],
    },
    {
        key: 'AddBlacklist',
        path: '/addBlacklist',
        component: React.lazy(() => import('views/Suspend/suspend/addBlacklist')),
        authority: [],
    },
    {
        key: 'ViewBlacklist',
        path: '/viewBlacklist',
        component: React.lazy(() => import('views/Suspend/suspend/viewBlacklist')),
        authority: [],
    },
    {
        key: 'viewCancelBlacklist',
        path: '/viewCancelBlacklist',
        component: React.lazy(() => import('views/Suspend/suspend/viewCancelBlacklist')),
        authority: [],
    },
    {
        key: 'ViewFaq',
        path: '/viewFaq',
        component: React.lazy(() => import('views/FAQ/FAQ/viewFaq')),
        authority: [],
    },
    {
        key: 'ViewRateReview',
        path: '/viewRateReview',
        component: React.lazy(() => import('views/RateReview/viewRateReview')),
        authority: [],
    },
    {
        key: 'bookingSurveyDetails',
        path: '/bookingSurveyDetails/:Id',
        component: React.lazy(() => import('views/Models/BookingList/components/BookingDetails/SurveyTabs')),
        authority: [],
    },
    {
        key: 'map',
        path: '/map',
        component: React.lazy(() => import('views/Map/map')),
        authority: [],
    },

    
]
