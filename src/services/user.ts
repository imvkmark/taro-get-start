/**
 * 获取用户信息
 */
import request from '../util/request';

/**
 * 用户详细
 */
export async function apiMiscWeappLogin(params = {}) {
    return request({
        url: '/api/misc/weapp/login',
        params
    });
}
