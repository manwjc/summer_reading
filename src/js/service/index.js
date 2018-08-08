    
import axios from 'axios'
import api from '@/js/api'

export default {
    //获取用户信息
    getUserInfo: function(success, fail) {
        axios.get(api.getUserInfo).then((res)=>{
            success && success(res);
        })
        .catch((error) => {
            fail && fail(error);
        })
    },
    //获取用户信息
    getWechatSign: function(params, success, fail) {
        axios.get(api.getWechatSign, params).then((res)=>{
            success && success(res);
        })
        .catch((error) => {
            fail && fail(error);
        })
    },
    //绑定手机号
    bindMobile: function(params, success, fail) {
        axios.post(api.bindMobile, params).then((res)=>{
            success && success(res);
        })
        .catch((error) => {
            fail && fail(error);
        })
    },
    //发送验证码
    sendValidateCode: function(params, success, fail) {
        axios.get(api.sendValidateCode, params).then((res)=>{
            success && success(res);
        })
        .catch((error) => {
            fail && fail(error);
        })
    },
}