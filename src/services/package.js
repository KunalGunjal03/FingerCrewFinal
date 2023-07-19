import BaseService from './BaseService';
import { TOKEN_TYPE, REQUEST_HEADER_AUTH_KEY, TOKEN_KEY, COMMANAPILINK } from '../constants/api.constant';
import ApiService from './ApiService';

//for saving Package Data
export const savePackageData = async (data) => {
    console.log(data)
  try {
    const accessToken = BaseService.defaults.headers[REQUEST_HEADER_AUTH_KEY];
    const tokenKey = BaseService.defaults.headers[TOKEN_KEY];
    const response = await BaseService({
      url: 'http://fingercrewapi.alphonsol.com/Package/AddPackageDetailsScreen',
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

//To Fetch ALL Package Data
export async function GetPackageAllData(data) {
  return ApiService.fetchData({
      url: COMMANAPILINK + 'Package/GetAllPackageDetailsScreen',
      method: 'Post',
      data,
  })
};

//For Delete Package data
export const DeletePackageData = async (package_mast_id) => {
  try {
    const accessToken = BaseService.defaults.headers[REQUEST_HEADER_AUTH_KEY];
    const tokenKey = BaseService.defaults.headers[TOKEN_KEY];
    const response = await BaseService({
      url: 'http://fingercrewapi.alphonsol.com/Package/DeletePackageDetailsScreen', // Replace with the actual URL for fetching role options
      method: 'post',
      headers: {
        Authorization: accessToken ? `${TOKEN_TYPE} ${accessToken}` : undefined,
        [TOKEN_KEY]: tokenKey || undefined,
      },
      data: {
        package_mast_id: package_mast_id,
      }
    });
    
  } catch (error) {
    console.error(error);
    throw new Error(error.response?.data || 'An error occurred while fetching role options');
  }
};

// To Fetch Single Package Data
export async function apiGetSinglePackage(data) {
  return ApiService.fetchData({
      url: COMMANAPILINK + 'Package/ViewPackageDetailsScreen',
      method: 'Post',
      data,
  })
};

//update Package Data
export const updatePackageData = async (data) => {
  try {
    const accessToken = BaseService.defaults.headers[REQUEST_HEADER_AUTH_KEY];
    const tokenKey = BaseService.defaults.headers[TOKEN_KEY];
    const response = await BaseService({
      url: 'http://fingercrewapi.alphonsol.com/Package/UpdatePackageDetailsScreen', // Replace with the actual URL for fetching role options
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

//To Fetch ALL Package Mapping Data
export async function GetPackageMapping(data) {
  return ApiService.fetchData({
      url: COMMANAPILINK + 'Mapping/GetAllPackageMapping',
      method: 'Post',
      data,
  })
};

// To Fetch Single Package Mapping Data
export async function apiGetSinglePackageMapping(data) {
  return ApiService.fetchData({
      url: COMMANAPILINK + 'Mapping/ViewPackageMapping',
      method: 'Post',
      data,
  })
};
