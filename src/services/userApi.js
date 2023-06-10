import BaseService from './BaseService';
import { TOKEN_TYPE, REQUEST_HEADER_AUTH_KEY, TOKEN_KEY, COMMANAPILINK } from '../constants/api.constant';
import ApiService from './ApiService';

export const saveUserData = async (data) => {
    console.log(data)
  try {
    const accessToken = BaseService.defaults.headers[REQUEST_HEADER_AUTH_KEY];
    const tokenKey = BaseService.defaults.headers[TOKEN_KEY];

    const response = await BaseService({
      url: 'http://fingercrewapi.alphonsol.com/User/AddUser',
      method: 'post',
      data: data,
      headers: {
        Authorization: accessToken ? `${TOKEN_TYPE} ${accessToken}` : undefined,
        [TOKEN_KEY]: tokenKey || undefined,
      },
      
    });

    if (response && response.data) {
      return response.data;
    } else {
      throw new Error('Invalid response');
    }
  } catch (error) {
    console.error(error);
    throw new Error(error.response?.data || 'An error occurred');
  }
};

// export const saveRoleOptions = async () => {
//   try {
//     const accessToken = BaseService.defaults.headers[REQUEST_HEADER_AUTH_KEY];
//     const tokenKey = BaseService.defaults.headers[TOKEN_KEY];
    
//     const response = await BaseService({
//       url: 'http://fingercrewapi.alphonsol.com/Role/GetAllRole', // Replace with the actual URL for fetching role options
//       method: 'post',
//       headers: {
//         Authorization: accessToken ? `${TOKEN_TYPE} ${accessToken}` : undefined,
//         [TOKEN_KEY]: tokenKey || undefined,
//       },
//     });

//     return response.data;
//   } catch (error) {
//     console.error(error);
//     throw new Error(error.response?.data || 'An error occurred while fetching role options');
//   }
// };

export async function apiGetlistsUser(data) {
  return ApiService.fetchData({
      url: COMMANAPILINK + 'User/ViewAlluserdetails',
      method: 'Post',
      data,
  })
};

