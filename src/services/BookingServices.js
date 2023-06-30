import { COMMANAPILINK } from 'constants/api.constant'
import ApiService from './ApiService'

export async function apiGetBookingList(data) {
    return ApiService.fetchData({
        url: COMMANAPILINK + 'ViewBookings/ViewBookinglist',
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