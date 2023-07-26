import BaseService from './BaseService';
import { TOKEN_TYPE, REQUEST_HEADER_AUTH_KEY, TOKEN_KEY, COMMANAPILINK } from '../constants/api.constant';
import ApiService from './ApiService';

  //To Fetch ALL Assign right Data
export async function AllAssignRights(data) {
  return ApiService.fetchData({
      url: COMMANAPILINK + 'Rights/ViewallRights',
      method: 'Post',
      data,
  })
};

  //For Fetching All menu Data
export const AllmenuData = async () => {
  try {
    const accessToken = BaseService.defaults.headers[REQUEST_HEADER_AUTH_KEY];
    const tokenKey = BaseService.defaults.headers[TOKEN_KEY];
    const response = await BaseService({
      url: 'http://fingercrewapi.alphonsol.com/Rights/ViewMenu', // Replace with the actual URL for fetching role options
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

//For Saving Assign Role
export const saveAssignRight = async (data) => {
  try {
    const accessToken = BaseService.defaults.headers[REQUEST_HEADER_AUTH_KEY];
    const tokenKey = BaseService.defaults.headers[TOKEN_KEY];
    const response = await BaseService({
      url: 'http://fingercrewapi.alphonsol.com/Rights/AssignRights', // Replace with the actual URL for fetching role options
      method: 'post',
      data: data,
      headers: {
        Authorization: accessToken ? `${TOKEN_TYPE} ${accessToken}` : undefined,
        [TOKEN_KEY]: tokenKey || undefined,
      },
    });
    if (response && response.data) {
      return response.data;
    }
  } catch (error) {
    console.error(error);
    throw new Error(error.response?.data || 'An error occurred while fetching role options');
  }
};

//For Delete Right data
export const DeleteRightData = async (userrightsid) => {
  try {
    const accessToken = BaseService.defaults.headers[REQUEST_HEADER_AUTH_KEY];
    const tokenKey = BaseService.defaults.headers[TOKEN_KEY];
    const response = await BaseService({
      url: 'http://fingercrewapi.alphonsol.com/Rights/DeleteRights', // Replace with the actual URL for fetching role options
      method: 'post',
      headers: {
        Authorization: accessToken ? `${TOKEN_TYPE} ${accessToken}` : undefined,
        [TOKEN_KEY]: tokenKey || undefined,
      },
      data: {
        userrightsid: userrightsid,
      }
    });
    
  } catch (error) {
    console.error(error);
    throw new Error(error.response?.data || 'An error occurred while fetching role options');
  }
};