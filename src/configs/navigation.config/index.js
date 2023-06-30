// import { UI_COMPONENTS_PREFIX_PATH } from 'constants/route.constant'
// import {
//    NAV_ITEM_TYPE_TITLE,
//    NAV_ITEM_TYPE_COLLAPSE,
//    NAV_ITEM_TYPE_ITEM,
//   } from 'constants/navigation.constant'
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

// import { UI_COMPONENTS_PREFIX_PATH } from 'constants/route.constant';
// import {
//   NAV_ITEM_TYPE_TITLE,
//   NAV_ITEM_TYPE_COLLAPSE,
//   NAV_ITEM_TYPE_ITEM,
// } from 'constants/navigation.constant';




// // // const userInfo = useSelector((state) => state.auth.user)
// // // console.log(userInfo.id)

// const fetchData = async () => {
// //  const userInfo = useSelector((state) => state.auth.user)
// //   console.log(userInfo.id)
//   const data = { userid: "2" };
//   try
//   {
//     let menuData = await fetchMenuData(data);
//     navigationConfig.push(menuData);
//   }
//   catch(error)
//   {
//     console.error(error)
//   }
  
  
// };

// fetchData();
import { fetchMenuData } from 'services/menu.js';
import {
  NAV_ITEM_TYPE_TITLE,
  NAV_ITEM_TYPE_COLLAPSE,
  NAV_ITEM_TYPE_ITEM,
} from 'constants/navigation.constant'
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
    key: 'home',
    path: '/home',
    title: 'HOME',
    translateKey: 'nav.home',
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
    key: "User",
    path: "",
    title: "User",
    translateKey: "nav.User",
    icon: "singleMenu",
    type: "collapse",
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
    ]
  },
  {
    key: "survey",
    path: "",
    title: "Survey",
    translateKey: "nav.survey",
    icon: "singleMenu",
    type: "collapse",
    authority: [],
    visible: "true",
    subMenu: [
      {
        key: "survey",
        path: "/Survey",
        title: "Survey Queue",
        translateKey: "nav.survey",
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
    ]
  },
  {
    key: "registrationlist",
    path: "",
    title: "Surveyor",
    translateKey: "nav.surveyor",
    icon: "singleMenu",
    type: "collapse",
    authority: [],
    visible: "true",
    subMenu: [
        // {
        //   key: "surveyor",
        //   path: "/serveyorlist",
        //   title: "Surveyor List",
        //   translateKey: "nav.surveyor",
        //   icon: "singleMenu",
        //   type: "collapse",
        //   authority: [],
        //   visible: "true",
        //   subMenu: []
        // },
        {
          key: "registrationlist",
          path: "/registrationlist",
          title: " Surveyor Registration List",
          translateKey: "nav.surveyor",
          icon: "singleMenu",
          type: "collapse",
          authority: [],
          visible: "true",
          subMenu: []
        }
        // {
        //   key: "VerifySurveyor",
        //   path: "/VerifySurveyor/:text",
        //   title: "Verify Surveyor",
        //   translateKey: "nav.VerifySurveyor",
        //   icon: "singleMenu",
        //   type: "item",
        //   authority: [],
        //   visible: "false",
        //   subMenu: []
        // },
    ]
  },
  {
    key: "installer",
    path: "",
    title: "Installer",
    translateKey: "nav.installer",
    icon: "singleMenu",
    type: "collapse",
    authority: [],
    visible: "true",
    subMenu: [
      {
        key: "installerlist",
        path: "/installerlist",
        title: " Installer Registration List",
        translateKey: "nav.installer",
        icon: "singleMenu",
        type: "collapse",
        authority: [],
        visible: "true",
        subMenu: []
      }
    ]
  },
  {
    key: "Role Master",
    path: "",
    title: "Roles Master",
    translateKey: "nav.Role",
    icon: "singleMenu",
    type: "collapse",
    authority: [],
    visible: "true",
    subMenu: [
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

    ]
  },
  {
    key: "Assign Role",
    path: "",
    title: "AssignRole",
    translateKey: "nav.AssignRole",
    icon: "singleMenu",
    type: "collapse",
    authority: [],
    visible: "true",
    subMenu: [
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
      }
    ]
  },
  {
    key: "Assign Rights",
    path: "",
    title: "AssignRights",
    translateKey: "nav.AssignRights",
    icon: "singleMenu",
    type: "collapse",
    authority: [],
    visible: "true",
    subMenu: [
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



