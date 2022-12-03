import request from '../util/request';

/**
 * 发送验证码
 */
export async function apiPySystemCaptchaSend(params: object) {
    return request({
        url: '/api_v1/system/captcha/send',
        params
    });
}


export async function apiPySystemAuthLogin(params: object) {
    return request({
        url: '/api_v1/system/auth/login',
        params: {
            guard: 'web',
            device_type: 'h5',
            ...params
        }
    });
}

export async function apiPySystemAuthLogOff() {
    return request({
        url: '/api/user/user/log_off'
    });
}


/**
 *上传图片
 */
export function apiPySystemUploadImage(image, watermark = 0) {
    const data = new FormData()
    data.set('image', image, image.name)
    if (watermark) {
        data.set('watermark', '1')
    }
    return request({
        url: 'api_v1/system/upload/image',
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        params: data
    });
}


/**
 *上传图片   不需要登录
 */
export function apiPySystemUploadImageMiddle(image, watermark = 0) {
    const data = new FormData()
    data.set('image', image, image.name)
    if (watermark) {
        data.set('watermark', '1')
    }
    return request({
        url: '/api/middleman/order/upload_image',
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        params: data
    });
}

/**
 * 登录访问
 */
export async function apiPySystemAuthAccess(params = {}) {
    return request({
        url: '/api_v1/system/auth/access',
        params,
    });
}

/**
 * 退出登录
 */
export async function apiPySystemAuthLogout() {
    return request({
        url: '/api_v1/system/auth/logout',
    });
}

/**
 * Core Info
 */
export async function apiPySystemCoreInfo() {
    return request({
        url: '/api_v1/system/core/info'
    });
}

/**
 * 验证串
 */
export async function apiPySystemCaptchaVerifyCode(params = {}) {
    return request({
        url: '/api_v1/system/captcha/verify_code',
        params
    });
}

/**
 * 验证串
 */
export async function apiPySystemAuthResetPassword(params = {}) {
    return request({
        url: '/api_v1/system/auth/reset_password',
        params
    });
}

/**
 * 换绑手机
 */
export async function apiPySystemAuthBindMobile(params = {}) {
    return request({
        url: '/api_v1/system/auth/bind_mobile',
        params
    });
}

/**
 * 地区码
 */
export async function apiPyAreaCode() {
    return request({
        url: '/api_v1/area/area/code'
    });
}
