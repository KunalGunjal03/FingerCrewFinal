//--------------First Dynamic COde
import { UI_COMPONENTS_PREFIX_PATH } from 'constants/route.constant'
import {
   NAV_ITEM_TYPE_TITLE,
   NAV_ITEM_TYPE_COLLAPSE,
   NAV_ITEM_TYPE_ITEM,
  } from 'constants/navigation.constant'
//   import { fetchMenuData } from 'services/menu.js';
//   let navigationConfig = [];
//   let getMenuConfig = async () => {
//     const data ={ "userid" :"2"}
//     let menuData = await fetchMenuData(data);
//       navigationConfig.push(menuData);
//     return navigationConfig;
// }
// navigationConfig = getMenuConfig();
// if (!Array.isArray(navigationConfig)) {
//  navigationConfig = [navigationConfig];
// }
// export default navigationConfig;
// console.log(navigationConfig);


//--------Second Dynamic Code 
// import { fetchMenuData } from 'services/menu.js';
// let navigationConfig = [];
// const fetchData = async () => {
//   const data = { userid: "2" };
//   let menuData = await fetchMenuData(data);
//   console.log(menuData)
//   navigationConfig.push(menuData);
// };
// fetchData();
// export default navigationConfig;


///------------hardcore code 
const navigationConfig = [
  {

    key: "uiComponent",
    path: "",
    title: "",
    translateKey: "",
    icon: "icon",
    type: "title",
    authority: [],
    subMenu: [
  {
    key: 'Home',
    path: '/home',
    title: 'HOME',
    translateKey: 'nav.Home',
    icon: 'home',
    type: NAV_ITEM_TYPE_ITEM,
    authority: [],
    subMenu: [],
  },
  {
    key: "Dashboard",
    path: "/dashboard",
    title: "Dashboard",
    translateKey: "Dashboard",
    icon: "singleMenu",
    type: "item",
    authority: [],
    visible: "true",
    subMenu: []
  },
  {
    key: "registrationlist",
    path: "",
    title: "Solar Surveyor",
    translateKey: "nav.surveyor",
    icon: "singleMenu",
    type: "collapse",
    authority: [],
    visible: "true",
    subMenu: [
        
        {
          key: "registrationlist",
          path: "/registrationlist",
          title: "Registartion Request List",
          translateKey: "nav.surveyor",
          icon: "singleMenu",
          type: "collapse",
          authority: [],
          visible: "true",
          subMenu: []
        },
        {
          key: "surveyor",
          path: "/serveyorlist",
          title: "Surveyor List",
          translateKey: "nav.surveyor",
          icon: "singleMenu",
          type: "collapse",
          authority: [],
          visible: "true",
          subMenu: []
        }
    ]
  },
  {
    key: "installer",
    path: "",
    title: "Solar Company",
    translateKey: "nav.installer",
    icon: "singleMenu",
    type: "collapse",
    authority: [],
    visible: "true",
    subMenu: [
      {
        key: "installerlist",
        path: "/installerlist",
        title: "Registration List",
        translateKey: "nav.installer",
        icon: "singleMenu",
        type: "collapse",
        authority: [],
        visible: "true",
        subMenu: []
      },
      {
        key: "InstallerLists",
        path: "/InstallerLists",
        title: " Solar Company List",
        translateKey: "nav.installer",
        icon: "singleMenu",
        type: "collapse",
        authority: [],
        visible: "true",
        subMenu: []
      },
      {
        key: "Bookinglist",
        path: "/BookingList",
        title: "Booking List",
        translateKey: "nav.Bookinglist",
        icon: "singleMenu",
        type: "item",
        authority: [],
        visible: "true",
        subMenu: []
      },
      {
        key: "RejectionList",
        path: "/RejectionList",
        title: "Rejection List",
        translateKey: "nav.RejectionList",
        icon: "singleMenu",
        type: "item",
        authority: [],
        visible: "true",
        subMenu: []
      },
    ]
  },
  {
    key: "RBSC",
    path: "",
    title: "User details",
    translateKey: "RBSC",
    icon: "singleMenu",
    type: "item",
    authority: [],
    visible: "true",
    subMenu: [
      {
        key: "adduser",
        path: "/adduser",
        title: "Add user",
        translateKey: "nav.adduser",
        icon: "singleMenu",
        type: "item",
        authority: [],
        visible: "true",
        subMenu: []
      },
      {
        key: "viewUser",
        path: "/viewUser",
        title: "User list",
        translateKey: "nav.viewUser",
        icon: "singleMenu",
        type: "item",
        authority: [],
        visible: "true",
        subMenu: []
      },
      {
        key: "addRoles",
        path: "/addRoles",
        title: "add Roles",
        translateKey: "nav.addRoles",
        icon: "singleMenu",
        type: "item",
        authority: [],
        visible: "true",
        subMenu: []
      },
      {
        key: "viewRoles",
        path: "/viewRoles",
        title: "Role list",
        translateKey: "nav.viewRoles",
        icon: "singleMenu",
        type: "item",
        authority: [],
        visible: "true",
        subMenu: []
      },
      {
        key: "assignRole",
        path: "/assignRole",
        title: "Assign Role",
        translateKey: "nav.assignRole",
        icon: "singleMenu",
        type: "item",
        authority: [],
        visible: "true",
        subMenu: []
      },
      {
        key: "viewAssignRoles",
        path: "/viewAssignRoles",
        title: "View Assign Roles",
        translateKey: "nav.viewAssignRoles",
        icon: "singleMenu",
        type: "item",
        authority: [],
        visible: "true",
        subMenu: []
      },
      {
        key: "addRights",
        path: "/addRights",
        title: "addRights",
        translateKey: "nav.addRights",
        icon: "singleMenu",
        type: "item",
        authority: [],
        visible: "true",
        subMenu: []
      },
      {
        key: "viewRights",
        path: "/viewRights",
        title: "View Rights",
        translateKey: "nav.viewRights",
        icon: "singleMenu",
        type: "item",
        authority: [],
        visible: "true",
        subMenu: []
      }
    ]
  },
  {
    key: "Masters",
    path: "",
    title: "Masters",
    translateKey: "nav.Masters",
    icon: "singleMenu",
    type: "collapse",
    authority: [],
    visible: "true",
    subMenu: [
      {
        key: "addPackage",
        path: "/addPackage",
        title: "add Package",
        translateKey: "nav.addPackage",
        icon: "singleMenu",
        type: "item",
        authority: [],
        visible: "true",
        subMenu: []
      },
      {
        key: "viewPackage",
        path: "/viewPackage",
        title: "Package list",
        translateKey: "nav.viewPackage",
        icon: "singleMenu",
        type: "item",
        authority: [],
        visible: "true",
        subMenu: []
      },
      {
        key: "packageMap",
        path: "/packageMap",
        title: "Package Mapping",
        translateKey: "nav.packageMap",
        icon: "singleMenu",
        type: "item",
        authority: [],
        visible: "true",
        subMenu: []
      },
      {
        key: "addSuspend",
        path: "/addSuspend",
        title: "add Suspend",
        translateKey: "nav.addSuspend",
        icon: "singleMenu",
        type: "item",
        authority: [],
        visible: "true",
        subMenu: []
      },
      {
        key: "viewSuspend",
        path: "/viewSuspend",
        title: "view Suspend",
        translateKey: "nav.viewSuspend",
        icon: "singleMenu",
        type: "item",
        authority: [],
        visible: "true",
        subMenu: []
      },
      {
        key: "viewCancelSuspend",
        path: "/viewCancelSuspend",
        title: "view Cancel Suspend",
        translateKey: "nav.viewCancelSuspend",
        icon: "singleMenu",
        type: "item",
        authority: [],
        visible: "true",
        subMenu: []
      },
      {
        key: "addBlacklist",
        path: "/addBlacklist",
        title: "add Blacklist",
        translateKey: "nav.addBlacklist",
        icon: "singleMenu",
        type: "item",
        authority: [],
        visible: "true",
        subMenu: []
      },
      {
        key: "viewBlacklist",
        path: "/viewBlacklist",
        title: "view Blacklist",
        translateKey: "nav.viewBlacklist",
        icon: "singleMenu",
        type: "item",
        authority: [],
        visible: "true",
        subMenu: []
      },
      {
        key: "viewCancelBlacklist",
        path: "/viewCancelBlacklist",
        title: "view Cancel Blacklist",
        translateKey: "nav.viewCancelBlacklist",
        icon: "singleMenu",
        type: "item",
        authority: [],
        visible: "true",
        subMenu: []
      },
      {
        key: "viewFAQ",
        path: "/viewFAQ",
        title: "view FAQ",
        translateKey: "nav.viewFAQ",
        icon: "singleMenu",
        type: "item",
        authority: [],
        visible: "true",
        subMenu: []
      },
      {
        key: "viewRateReview",
        path: "/viewRateReview",
        title: "view Rate & Review",
        translateKey: "nav.viewRateReview",
        icon: "singleMenu",
        type: "item",
        authority: [],
        visible: "true",
        subMenu: []
      },
      {
        key: "map",
        path: "/map",
        title: "Tracker Partner",
        translateKey: "nav.map",
        icon: "singleMenu",
        type: "item",
        authority: [],
        visible: "true",
        subMenu: []
      }
    ]
  },
  // {
  //   key: "Surveyor",
  //   path: "",
  //   title: "Surveyor",
  //   translateKey: "nav.Surveyor",
  //   icon: "singleMenu",
  //   type: "collapse",
  //   authority: [],
  //   visible: "true",
  //   subMenu: [
  //     {
  //       key: "SurveyorDetails",
  //       path: "/serveyorlist",
  //       title: "Surveyor Details",
  //       translateKey: "nav.SurveyorDetails",
  //       icon: "singleMenu",
  //       type: "collapse",
  //       visible: "true",
  //       authority: []
  //     },
  //     {
  //       key: "VerifySurveyor",
  //       path: "/VerifySurveyor/:Id",
  //       title: "Verify Surveyor",
  //       translateKey: "nav.VerifySurveyor",
  //       icon: "singleMenu",
  //       type: "collapse",
  //       visible: "true",
  //       authority: []
  //     },
  //     // {
  //     //   key: "SurveyorAdd",
  //     //   path: "/AddServeyor",
  //     //   title: "Surveyor Add",
  //     //   translateKey: "nav.SurveyorAdd",
  //     //   icon: "singleMenu",
  //     //   type: "collapse",
  //     //   visible: "true",
  //     //   authority: []
  //     // }
  //   ]
  // }
]
  }
]
export default navigationConfig;



