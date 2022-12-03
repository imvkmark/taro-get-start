import { appUrl, envIsH5, storageKey, taroEnv } from './conf';
import { each, forEach, get, isNaN, isNil, isObject, keys, merge, set, trim } from 'lodash-es';
import { MD5 } from 'crypto-js';
import pkgJson from '../../package.json';
import Taro from "@tarojs/taro";

/**
 * 请求签名
 * @param params
 * @param token
 */
const requestSignV1 = (params: any, token = '') => {
    let debug = false;
    let str = '';
    let paramsKeys = keys(params);
    paramsKeys.sort();
    forEach(paramsKeys, function (key) {
        if (key !== 'image' && key !== 'file') {
            if (isObject(params[key])) {
                str += key + '=' + JSON.stringify(params[key]) + ','
            } else {
                str += key + '=' + params[key] + ','
            }
        }
    });
    str = str.slice(0, -1);
    let step1Md5 = MD5(MD5(str).toString() + token).toString();

    let signStr = `${step1Md5.charAt(1)}${step1Md5.charAt(3)}${step1Md5.charAt(15)}${step1Md5.charAt(31)}`
    if (debug) {
        console.log('ori:', str, 'step1:', step1Md5, 'step2:', step1Md5, 'sign', signStr);
    }
    return signStr;
};


// 请求方法
const combineOptions = (options: RequestOptions) => {
    let { method = 'post', params: oriParams = {}, url, headers = {} } = options;
    let params: any;
    if (envIsH5 && oriParams instanceof FormData) {
        params = new FormData();
        for (let pair of oriParams.entries()) {
            if (isNil(pair[1])) {
                return;
            }
            if (isNaN(pair[1])) {
                return;
            }
            let sv = pair[1];
            if (typeof pair[1] === 'string') {
                sv = trim(pair[1]);
            }
            params.append(pair[0], sv);
        }
    } else {
        params = {};
        each(oriParams, function (val, key) {
            if (isNil(val)) {
                return;
            }
            if (isNaN(val)) {
                return;
            }
            let sv = val;
            if (typeof val === 'string') {
                sv = trim(val);
            }
            set(params, key, sv);
        })
    }


    let token = String(Taro.getStorageSync(storageKey.APP_TOKEN));
    set(params, 'timestamp', Math.round(new Date().getTime() / 1000));
    set(params, 'sign', requestSignV1(params, token ? token : ''));
    console.info('地址:' + appUrl + "/" + options.url, '\n参数:' + '\n', params);
    // stip : 这里使用 data = {...params, token : token || ''}, 则会丢失form表单的数据
    return {
        method: method.toUpperCase(),
        url: appUrl + url,
        data: params,
        header: {
            Authorization: token ? `Bearer ${token}` : '',
            'x-os': taroEnv,
            'x-ver': pkgJson.version,
            'content-type': get(headers, 'Content-Type') ? get(headers, 'Content-Type') : 'application/json'
        }
    }
};

export default async function request(options: RequestOptions) {
    return await Taro.request(merge(combineOptions(options), {
        fail: function () {
            console.log(
                'request fail'
            )
        }
    }))
}

