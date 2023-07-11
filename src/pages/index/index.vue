<template>
    <view class="index">
        <view>
            <img src="" alt="">
        </view>
        {{ state.msg }}
        <view class="btn">
            <nut-button type="primary" @click="handleClick('text', state.msg2, true)">点我</nut-button>
            <nut-button v-if="envIsWeapp" type="primary" @click="fetchCode">小程序点我</nut-button>
        </view>
        <nut-toast :msg="state.msg" v-model:visible="state.show" :type="state.type" :cover="state.cover" />

        <nut-button class="btn-max-w" open-type="getPhoneNumber"
            @getphonenumber="getPhoneNumber">
            获取用户手机号
        </nut-button>
    </view>
</template>

<script setup>
import { reactive } from 'vue';
import { appUrl, envIsWeapp } from "../../util/conf";
import Taro from "@tarojs/taro";
import { apiMiscWeappLogin } from "../../services/user";

const state = reactive({
    msg: '欢迎使用 NutUI4.0 开发小程序',
    msg2: '你成功了～',
    type: 'text',
    show: false,
    cover: false
});


const getPhoneNumber = function (e) {
    console.log(e)
}

const handleClick = (type, msg, cover = false) => {
    console.log(appUrl)
    state.show = true;
    state.msg2 = msg;
    state.type = type;
    state.cover = cover;
};

const fetchCode = () => {
    console.log(appUrl)
    Taro.login().then((res) => {
        apiMiscWeappLogin({
            code: res.code
        }).then(({ data, header, errMsg }) => {
            Taro.showToast({
                title: data.message
            })
            console.log(data, header, errMsg);
        })
    })
}

</script>

<style lang="scss">
.index {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
}
</style>
