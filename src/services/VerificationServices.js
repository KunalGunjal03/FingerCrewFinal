import ApiService from './ApiService'
import BaseService from './BaseService';
import { TOKEN_TYPE, REQUEST_HEADER_AUTH_KEY, TOKEN_KEY, COMMANAPILINK } from '../constants/api.constant';

export const VerifyPersonalDetails = async (data) => {
    console.log(data)
  try {
    const accessToken = BaseService.defaults.headers[REQUEST_HEADER_AUTH_KEY];
    const tokenKey = BaseService.defaults.headers[TOKEN_KEY];

    const response = await BaseService({
      url: COMMANAPILINK+'Surveyor/Verifypersonaldetails',
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