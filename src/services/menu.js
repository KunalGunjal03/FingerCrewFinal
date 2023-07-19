import axios from 'axios';
import { LOCALPATH } from 'constants/api.constant';
import BaseService from './BaseService';
import { TOKEN_TYPE, REQUEST_HEADER_AUTH_KEY, TOKEN_KEY, COMMANAPILINK } from '../constants/api.constant';
import ApiService from './ApiService';

// export const fetchMenuData = async (data) => {
//   try {
//     console.log(data)
//     const response = await axios.post("http://fingercrewapi.alphonsol.com/GetRole/getRoleWiseMenu", data); 
//     console.log(response)
//     return response.data;
//   } catch (error) {
//     console.error(error);
//   }
// };

export const fetchMenuData = async (data) => {
  console.log(data)
try {
  const accessToken = BaseService.defaults.headers[REQUEST_HEADER_AUTH_KEY];
  const tokenKey = BaseService.defaults.headers[TOKEN_KEY];
  const response = await BaseService({
    url: 'http://fingercrewapi.alphonsol.com/GetRole/getRoleWiseMenu',
    method: 'post',
    data: data,
    headers: {
      Authorization: accessToken ? `${TOKEN_TYPE} ${accessToken}` : undefined,
      [TOKEN_KEY]: tokenKey || undefined,
    },
  });
  console.log(response)
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
