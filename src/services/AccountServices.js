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


// export const apiGetAccountFormData = async (data) => {
//   try {
//     const accessToken = BaseService.defaults.headers[REQUEST_HEADER_AUTH_KEY];
//     const tokenKey = BaseService.defaults.headers[TOKEN_KEY];

//     const response = await BaseService({
//       url: COMMANAPILINK + 'SurveyorDisplayAllDetails/getSurveyorPersonalDetails',
//       method: 'post',
//       data: data,
//       headers: {
//         Authorization: accessToken ? `${TOKEN_TYPE} ${accessToken}` : undefined,
//         [TOKEN_KEY]: tokenKey || undefined,
//       },
     
//     });

//     if (response && response.data) {
//       console.log(response.data)
//       return response.data;
//     } else {
//       throw new Error('Invalid response');
//     }
//   } catch (error) {
//     console.error(error);
//     throw new Error(error.response?.data || 'An error occurred');
//   }
// };
export async function apiGetAccountFormData(data) {
  return ApiService.fetchData({
      url:  COMMANAPILINK + 'SurveyorDisplayAllDetails/getSurveyorPersonalDetails',
      method: 'post',
      data,
  })

}
export async function apiGetAddressDetails(data) {
  return ApiService.fetchData({
      url:  COMMANAPILINK + 'SurveyorDisplayAllDetails/getSurveyorAddressDetails',
      method: 'post',
      data,
  })

}
export async function apiGetEducationDetails(data) {
  return ApiService.fetchData({
      url:  COMMANAPILINK + 'SurveyorDisplayAllDetails/getSurveyorQualificationDetails',
      method: 'post',
      data,
  })

}
export async function apiGetCertificationDetails(data) {
    return ApiService.fetchData({
        url:  COMMANAPILINK + 'SurveyorDisplayAllDetails/getSurveyorCertificationDetails',
        method: 'post',
        data,
    })
  
  }
  export async function apiGetBankDetails(data) {
    return ApiService.fetchData({
        url:  COMMANAPILINK + 'SurveyorDisplayAllDetails/getSurveyorBankDetails',
        method: 'post',
        data,
    })
  
  }
  export async function apiGetInsuredDetails(data) {
    return ApiService.fetchData({
        url:  COMMANAPILINK + 'SurveyorDisplayAllDetails/getSurveyorInsuranceDetails',
        method: 'post',
        data,
    })
  
  }
  export async function apiGetKYCDetails(data) {
    return ApiService.fetchData({
        url:  COMMANAPILINK + 'SurveyorDisplayAllDetails/getSurveyorKYCDetails',
        method: 'post',
        data,
    })
  
  }
  export async function apiGetBackgroundDetails(data) {
    return ApiService.fetchData({
        url:  COMMANAPILINK + 'SurveyorDisplayAllDetails/getSurveyorBackgroundDetails',
        method: 'post',
        data,
    })
}
export async function apiGetUploadedDocuments(data) {
    return ApiService.fetchData({
        url:  COMMANAPILINK + 'SurveyorDisplayAllDetails/getSurveyorDocumentDetails',
        method: 'post',
        data,
    })
}
  
export async function apiGetSurveyorSkills(data) {
    return ApiService.fetchData({
        url:  COMMANAPILINK + 'SurveyorDisplayAllDetails/getSurveyorSkillsDetails',
        method: 'post',
        data,
    })
  
  }
  export async function apiGetPreviousExp(data) {
    return ApiService.fetchData({
        url:  COMMANAPILINK + 'SurveyorDisplayAllDetails/getSurveyorExperienceDetails',
        method: 'post',
        data,
    })
  
  }
  export async function apiGetpersonalData(data) {
    return ApiService.fetchData({
        url:  COMMANAPILINK + 'Installer/GetInstaller',
        method: 'post',
        data,
        
    })
  
  }
  export async function apiGetInstallerKYCDetails(data) {
    return ApiService.fetchData({
        url:  COMMANAPILINK + 'Installer/GetInstallerKYCdet',
        method: 'post',
        data,
        
    })
  
  }
  export async function apiGetBanksDetails(data) {
    return ApiService.fetchData({
        url:  COMMANAPILINK + 'InstallerDetailsDisplay/getBankDetails',
        method: 'post',
        data,
        
    })
  
  }
  export async function apiGetInstallerUploadDetails(data) {
    return ApiService.fetchData({
        url:  COMMANAPILINK + 'InstallerDetailsDisplay/getInstallerDocDetails',
        method: 'post',
        data,
        
    })
  
  }