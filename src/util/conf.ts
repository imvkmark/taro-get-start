export const taroEnv = process.env.TARO_ENV;


export const envIsH5 = taroEnv === 'h5';
export const envIsWeapp = taroEnv === 'weapp';


// 访问接口URL
export const appUrl: string = String(process.env.APP_URL);

console.log(appUrl)

// 存储KEY
export const storageKey = {
    APP_TOKEN: 'user:token',
}
