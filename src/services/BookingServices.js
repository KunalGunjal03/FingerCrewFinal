import { COMMANAPILINK } from 'constants/api.constant'
import {LOCALPATH} from 'constants/api.constant'
import ApiService from './ApiService'

export async function apiGetBookingList(data) {
    return ApiService.fetchData({
        url: COMMANAPILINK + 'ViewBookings/ViewBookinglist',
        method: 'post',
        data,
    })
}

export async function apiGetBookingDetails(data) {
    return ApiService.fetchData({
        url: COMMANAPILINK + 'ViewBookings/ViewBookingDetails',
        method: 'post',
        data,
    })
}
export async function apiGetSurveyDetails(data) {
    return ApiService.fetchData({
        url: LOCALPATH + 'SurveyDetails/ViewSurveyDetails',
        method: 'post',
        data,
    })
}
export async function apiGetRejectedSurveyDetails(data) {
    return ApiService.fetchData({
        url: LOCALPATH + 'ViewRejection/ViewSurveyDetails',
        method: 'post',
        data,
    })
}
export async function apiGetElectricDetails(data) {
    return ApiService.fetchData({
        url: COMMANAPILINK + 'SurveyDetails/ViewElectricDetails',
        method: 'post',
        data,
    })
}
export async function apiGetPVDetails(data) {
    return ApiService.fetchData({
        url: COMMANAPILINK + 'SurveyDetails/ViewPreviousPVDetails',
        method: 'post',
        data,
    })
}
export async function apiGetBookSurveyByID(data) {
    console.log(data)
    return ApiService.fetchData({
        url: '',
        method: 'post',
        data,
    })
}
export async function apiGetRejectionList(data) {
    return ApiService.fetchData({
        url: COMMANAPILINK + 'ViewRejection/ViewRejectionList',
        method: 'post',
        data,
    })
}