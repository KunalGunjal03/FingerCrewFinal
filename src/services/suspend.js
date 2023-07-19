import BaseService from './BaseService';
import { TOKEN_TYPE, REQUEST_HEADER_AUTH_KEY, TOKEN_KEY, COMMANAPILINK } from '../constants/api.constant';
import ApiService from './ApiService';

//For Fetch data for partner
export const partnerOptionsDrop = async (user_type) => {
    console.log(user_type)
    try {
      const accessToken = BaseService.defaults.headers[REQUEST_HEADER_AUTH_KEY];
      const tokenKey = BaseService.defaults.headers[TOKEN_KEY];
      const response = await BaseService({
        url: 'http://fingercrewapi.alphonsol.com/suspend/Viewlist',
        method: 'post',
        headers: {
          Authorization: accessToken ? `${TOKEN_TYPE} ${accessToken}` : undefined,
          [TOKEN_KEY]: tokenKey || undefined,
        },
        data: {
            user_type: user_type,
        }
      });
      return response.data
    } catch (error) {
      console.error(error);
      throw new Error(error.response?.data || 'An error occurred while fetching role options');
    }
};


//For Fetching Number Of Days Data
export const noOfDaysOptionsDrop = async () => {
  try {
    const accessToken = BaseService.defaults.headers[REQUEST_HEADER_AUTH_KEY];
    const tokenKey = BaseService.defaults.headers[TOKEN_KEY];
    const response = await BaseService({
      url: 'http://fingercrewapi.alphonsol.com/suspend/suspendeddays', // Replace with the actual URL for fetching role options
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

//for saving Suspend Data
export const saveSuspendData = async (data) => {
  console.log(data)
try {
  const accessToken = BaseService.defaults.headers[REQUEST_HEADER_AUTH_KEY];
  const tokenKey = BaseService.defaults.headers[TOKEN_KEY];
  const response = await BaseService({
    url: 'http://fingercrewapi.alphonsol.com/suspend/SuspendUser',
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

//To Fetch ALL Suspend Data
export async function apiGetSuspendlist(data) {
  return ApiService.fetchData({
      url: COMMANAPILINK + 'suspend/SuspendedList',
      method: 'Post',
      data,
  })
};

//For Cancel Suspend
export const CancelSuspend = async (user_id,remarks) => {
  try {
    const accessToken = BaseService.defaults.headers[REQUEST_HEADER_AUTH_KEY];
    const tokenKey = BaseService.defaults.headers[TOKEN_KEY];
    const response = await BaseService({
      url: 'http://fingercrewapi.alphonsol.com/suspend/CancelSuspension', // Replace with the actual URL for fetching role options
      method: 'post',
      headers: {
        Authorization: accessToken ? `${TOKEN_TYPE} ${accessToken}` : undefined,
        [TOKEN_KEY]: tokenKey || undefined,
      },
      data: {
        user_id: user_id,
        remarks:remarks,
      }
    });
    return response.data
    
  } catch (error) {
    console.error(error);
    throw new Error(error.response?.data || 'An error occurred while fetching role options');
  }
};

//To Fetch ALL Cancel Suspend Data
export async function apiGetCancelSuspendlist(data) {
  return ApiService.fetchData({
      url: COMMANAPILINK + 'suspend/SuspendedListcancel',
      method: 'Post',
      data,
  })
};