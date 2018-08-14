    
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
    //获取阅读馆
    getReadRoomList: function(success, fail) {
        axios.get(api.getReadRoomList).then((res)=>{
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
    //获取期数判断当前阅读馆当前期数是否已满额
    getTermNum: function(params, success, fail) {
        return new Promise((resolve, reject) => {
            axios.get(api.getTermNum, params).then((res)=>{
                resolve(res);
            })
            .catch((error) => {
                fail && fail(error);
            })
        })
    },
    //获取期数
    getTermNumList: function(params, success, fail) {
        return new Promise((resolve, reject) => {
            axios.get(api.getTermNumList, params).then((res)=>{
                resolve(res);
            })
            .catch((error) => {
                reject(error);
            })
        })
    },
    //提交报名
    signUp: function(params, success, fail) {
        return new Promise((resolve, reject) => {
            axios.post(api.signUp, params).then((res)=>{
                resolve(res);
            })
            .catch((error) => {
                reject(error);
            })
        })
    },
    //获取课程列表
    getCoursewareList: function(success, fail) {
        axios.get(api.getCoursewareList).then((res)=>{
            success && success(res);
        })
        .catch((error) => {
            fail && fail(error);
        })
    },
    //上传视频
    uploadVideo: function(params, success, fail) {
        axios.post(api.uploadVideo, params).then((res)=>{
            success && success(res);
        })
        .catch((error) => {
            fail && fail(error);
        })
    },
    //获取精彩花絮数据
    getReadRoomGradeVideo: function(success, fail) {
        axios.get(api.getReadRoomGradeVideo).then((res)=>{
            success && success(res);
        })
        .catch((error) => {
            fail && fail(error);
        })
    },
    //获取已报名用户
    recommendSignUp: function(success, fail) {
        axios.get(api.recommendSignUp).then((res)=>{
            success && success(res);
        })
        .catch((error) => {
            fail && fail(error);
        })
    },
    //获取用户上传视频
    getUserVideo: function(params, success, fail) {
        axios.get(api.getUserVideo, params).then((res)=>{
            success && success(res);
        })
        .catch((error) => {
            fail && fail(error);
        })
    },
}