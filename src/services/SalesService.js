import { COMMANAPILINK } from 'constants/api.constant'
import ApiService from './ApiService'

export async function apiGetSalesDashboardData(data) {
    return ApiService.fetchData({
        url: '/sales/dashboard',
        method: 'post',
        data,
    })
}

export async function apiGetSalesProducts(data) {
    return ApiService.fetchData({
        url: 'https://localhost:7107/api/Login/GetSurveyList',
        method: 'get',
        data,
    })
}

export async function apiDeleteSalesProducts(data) {
    return ApiService.fetchData({
        url: '/sales/products/delete',
        method: 'delete',
        data,
    })
}

export async function apiGetSalesProduct(params) {
    return ApiService.fetchData({
        url: '/sales/product',
        method: 'get',
        params,
    })
}

export async function apiPutSalesProduct(data) {
    return ApiService.fetchData({
        url: '/sales/products/update',
        method: 'put',
        data,
    })
}

export async function apiCreateSalesProduct(data) {
    return ApiService.fetchData({
        url: '/sales/products/create',
        method: 'post',
        data,
    })
}

export async function apiGetSalesOrders(params) {
    return ApiService.fetchData({
        url: '/sales/orders',
        method: 'get',
        params,
    })
}

export async function apiDeleteSalesOrders(data) {
    return ApiService.fetchData({
        url: '/sales/orders/delete',
        method: 'delete',
        data,
    })
}

export async function apiGetSalesOrderDetails(params) {
    return ApiService.fetchData({
        url: '/sales/orders-details',
        method: 'get',
        params,
    })
}

// export async function apiGetlistsSurveyor(data) {
//     return ApiService.fetchData({
//         url: COMMANAPILINK + 'ViewSurveyor/ViewAllSurveyor',
//         method: 'Post',
//         data,
//     })
// }
export async function apiGetlistsSurveyor(data) {
    return ApiService.fetchData({
        url: COMMANAPILINK + 'ViewSurvey/Viewsurveycountandrating',
        method: 'Post',
        data,
    })
}
export async function apiGetreqlistsSurveyor(data) {
    return ApiService.fetchData({
        url: COMMANAPILINK + 'ViewSurveyor/ViewAllFilterSurveyor',
        method: 'Post',
        data,
    })
}
export async function apiGetlistsInstaller(data) {
    return ApiService.fetchData({
        url: COMMANAPILINK + 'Installer/ViewAllFilterInstaller',
        method: 'Post',
        data,
    })
}
export async function apiGetlistsInstallerSurveyCount(data) {
    return ApiService.fetchData({
        url: COMMANAPILINK + 'Installer/ViewInstallerSurveyCount',
        method: 'Post',
        data,
    })
}
export async function apigetCities(data) {
    return ApiService.fetchData({
        url: COMMANAPILINK + 'City/ViewCity',
        method: 'Post',
        data,
    })
}
export async function apigetStates (data) {
    return ApiService.fetchData({
        url: COMMANAPILINK + 'State/GetAllState',
        method: 'Post',
        data,
    })
}