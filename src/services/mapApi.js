import BaseService from './BaseService';
import { TOKEN_TYPE, REQUEST_HEADER_AUTH_KEY, TOKEN_KEY, COMMANAPILINK } from '../constants/api.constant';
import ApiService from './ApiService';

//For Update Role data
export const getLatLongSouryour = async (surveyor_master_id) => {
    try {
      const accessToken = BaseService.defaults.headers[REQUEST_HEADER_AUTH_KEY];
      const tokenKey = BaseService.defaults.headers[TOKEN_KEY];
      const response = await BaseService({
        url: 'http://fingercrewapi.alphonsol.com/Partner/getSurveyorTrackLocation', // Replace with the actual URL for fetching role options
        method: 'post',
        data: {surveyor_master_id:surveyor_master_id},
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