import ApiService from './ApiService'
import BaseService from './BaseService';
import { TOKEN_TYPE, REQUEST_HEADER_AUTH_KEY, TOKEN_KEY, COMMANAPILINK } from '../constants/api.constant';

export async function apiGetAccountSettingData() {
    return ApiService.fetchData({
        url: '/account/setting',
        method: 'get',
    })
}   

export async function apiGetAccountSettingIntegrationData() {
    return ApiService.fetchData({
        url: '/account/setting/integration',
        method: 'get',
    })
}

export async function apiGetAccountSettingBillingData() {
    return ApiService.fetchData({
        url: '/account/setting/billing',
        method: 'get',
    })
}

export async function apiGetAccountInvoiceData(params) {
    return ApiService.fetchData({
        url: '/account/invoice',
        method: 'get',
        params,
    })
}

export async function apiGetAccountLogData(data) {
    return ApiService.fetchData({
        url: '/account/log',
        method: 'post',
        data,
    })
}

// export async function apiGetAccountFormData() {
//     return ApiService.fetchData({
//         url: 'https://localhost:7076/api/SurveyorPersonalDetailsViewAndInsert/getSurveyorPersonalDetails ' ,
//         method: 'post',
//     })

// }


export const apiGetAccountFormData = async (data) => {
  try {
    const accessToken = BaseService.defaults.headers[REQUEST_HEADER_AUTH_KEY];
    const tokenKey = BaseService.defaults.headers[TOKEN_KEY];

    const response = await BaseService({
      url: COMMANAPILINK + 'SurveyorDisplayAllDetails/getSurveyorPersonalDetails',
      method: 'post',
      data: data,
      headers: {
        Authorization: accessToken ? `${TOKEN_TYPE} ${accessToken}` : undefined,
        [TOKEN_KEY]: tokenKey || undefined,
      },
     
    });

    if (response && response.data) {
      console.log(response.data)
      return response.data;
    } else {
      throw new Error('Invalid response');
    }
  } catch (error) {
    console.error(error);
    throw new Error(error.response?.data || 'An error occurred');
  }
};
