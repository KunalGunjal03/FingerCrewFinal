import ApiService from './ApiService'
import { COMMANAPILINK, LOCALPATH } from 'constants/api.constant'
export async function apiSignIn(data) {
    return ApiService.fetchData({
        url: COMMANAPILINK + 'Authentication/Login',
        method: 'post',
        data,
    })
}

export async function apiSignUp(data) {
    return ApiService.fetchData({
        url: '',
        method: 'post',
        data,
    })
}

export async function apiSignOut(data) {
    return ApiService.fetchData({
        url: '/sign-out',
        method: 'post',
        data,
    })
}

export async function apiForgotPassword(data) {
    return ApiService.fetchData({
        url:  COMMANAPILINK + 'Authentication/ForgotPassword',
        method: 'post',
        data,
    })  
}

export async function apiResetPassword(data) {
    return ApiService.fetchData({
        url: COMMANAPILINK + 'Authentication/ResetPassword',
        method: 'post',
        data
    })
}
