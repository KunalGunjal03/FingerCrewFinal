import BaseService from './BaseService';
import { TOKEN_TYPE, REQUEST_HEADER_AUTH_KEY, TOKEN_KEY, COMMANAPILINK } from '../constants/api.constant';
import ApiService from './ApiService';

//To Fetch ALL FaqList Data
export async function apiGetFaqlist(data) {
    return ApiService.fetchData({
        url: COMMANAPILINK + 'FAQ/GetAllFAQDetailsScreen',
        method: 'Post',
        data,
    })
};

//To Fetch ALL RateReview Data
export async function apiGetRateReviewlist(data) {
    return ApiService.fetchData({
        url: COMMANAPILINK + 'RateAndReview/ViewRateAndReviewList',
        method: 'Post',
        data,
    })
  };