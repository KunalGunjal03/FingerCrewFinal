import { COMMANAPILINK } from 'constants/api.constant'
import ApiService from './ApiService'


export async function apiGetSurveyStatistic(params) {
    return ApiService.fetchData({
        url: '',
        method: 'get',
        params,
    })
}

export async function apiGetSurveList(data) {
    return ApiService.fetchData({
        url: COMMANAPILINK + 'ViewverifiedSurvey/GetSurveyList',
        method: 'post',
        data,
    })
}

export async function apiGetSurveByID(data) {
    console.log(data)
    return ApiService.fetchData({
        url: '',
        method: 'post',
        data,
    })
}