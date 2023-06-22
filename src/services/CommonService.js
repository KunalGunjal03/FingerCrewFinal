import ApiService from './ApiService'

export async function apiGetNotificationCount() {
    return ApiService.fetchData({
        url: '',
        method: 'get',
    })
}

export async function apiGetNotificationList() {
    return ApiService.fetchData({
        url: '',
        method: 'get',
    })
}

export async function apiGetSearchResult(data) {
    return ApiService.fetchData({
        url: '',
        method: 'post',
        data,
    })
}
