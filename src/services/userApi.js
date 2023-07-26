import BaseService from './BaseService';
import { TOKEN_TYPE, REQUEST_HEADER_AUTH_KEY, TOKEN_KEY, COMMANAPILINK } from '../constants/api.constant';
import ApiService from './ApiService';

//for saving User Data
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

//For Fetching Role Dropdown Data
export const RoleOptionsDrop = async () => {
  try {
    const accessToken = BaseService.defaults.headers[REQUEST_HEADER_AUTH_KEY];
    const tokenKey = BaseService.defaults.headers[TOKEN_KEY];
    const response = await BaseService({
      url: 'http://fingercrewapi.alphonsol.com/Role/GetAllRole', // Replace with the actual URL for fetching role options
      method: 'post',
      headers: {
        Authorization: accessToken ? `${TOKEN_TYPE} ${accessToken}` : undefined,
        [TOKEN_KEY]: tokenKey || undefined,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error(error.response?.data || 'An error occurred while fetching role options');
  }
};

//To Fetch ALL User Data
export async function apiGetlistsUser(data) {
  return ApiService.fetchData({
      url: COMMANAPILINK + 'user/ViewAlluserFilterList',
      method: 'Post',
      data,
  })
};

// To Fetch Single User Data
export async function apiGetSingleUser(data) {
  return ApiService.fetchData({
      url: COMMANAPILINK + 'User/viewuserdetails',
      method: 'Post',
      data,
  })
};

export const updateUserData = async (data) => {
  try {
    const accessToken = BaseService.defaults.headers[REQUEST_HEADER_AUTH_KEY];
    const tokenKey = BaseService.defaults.headers[TOKEN_KEY];
    const response = await BaseService({
      url: 'http://fingercrewapi.alphonsol.com/User/updateuserdetails', // Replace with the actual URL for fetching role options
      method: 'post',
      data: data,
      headers: {
        Authorization: accessToken ? `${TOKEN_TYPE} ${accessToken}` : undefined,
        [TOKEN_KEY]: tokenKey || undefined,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error(error.response?.data || 'An error occurred while fetching role options');
  }
};
export async function apiGetlistsAssignRoles(data) {
  return ApiService.fetchData({
      url: COMMANAPILINK + 'Role/AssignRoleFilter',
      method: 'Post',
      data,
  })
};
//For Delete User data
export const DeleteUserData = async (user_id) => {
  try {
    const accessToken = BaseService.defaults.headers[REQUEST_HEADER_AUTH_KEY];
    const tokenKey = BaseService.defaults.headers[TOKEN_KEY];
    const response = await BaseService({
      url: 'http://fingercrewapi.alphonsol.com/User/DeleteUser', // Replace with the actual URL for fetching role options
      method: 'post',
      headers: {
        Authorization: accessToken ? `${TOKEN_TYPE} ${accessToken}` : undefined,
        [TOKEN_KEY]: tokenKey || undefined,
      },
      data: {
        user_id: user_id,
      }
    });
    
  } catch (error) {
    console.error(error);
    throw new Error(error.response?.data || 'An error occurred while fetching role options');
  }
};