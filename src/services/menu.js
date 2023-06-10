import axios from 'axios';


export const fetchMenuData = async (data) => {
  try {
    const response = await axios.post('https://localhost:7076/api/RoleWiseMenu/getRoleWiseMenu', data); 
    return response.data;
  } catch (error) {
    console.error(error);
  }
};


// export const fetchmenuconfig = async () => {
//   try {
  
//     const response =  [{
//           key: 'Home',
//           path: '/home',
//           component: React.lazy(() => import('views/home')),
//           authority: [],
//       },
//       {
//           key: 'Dashboard',
//           path: '/dashboard',
//           component: React.lazy(() => import('views/Models/dashboard')),
//           authority: [],
//       },
//       {
//           key: 'Surveyor',
//           path: '/serveyorlist',
//           component: React.lazy(() => import('views/Models/serveyorlist')),
//           authority: [],
//       } ]
//     return response;
//   } catch (error) {
//     console.error(error);
//   }
// };
