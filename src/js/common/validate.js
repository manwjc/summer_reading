    
export default {
    //验证手机号
    validateMobile: function(str){
        return /^[1][3,4,5,6,7,8,9][0-9]{9}$/.test(str);
    },
    //验证加密手机号
    validateMaskMobile: function(str){
        return /^[1](([3,4,5,7,8][0-9])|(66|98|99))([0-9]{8}|[0-9]{17,25})$/.test(str);
    },
    //验证用户名
    validateUsername: function(str){
        return /^[a-zA-Z][a-zA-Z0-9]*$/i.test(str);
    },
    //验证图形验证码
    validateImgCode: function(str){
        return /^[0-9a-z]{4}$/i.test(str);
    },
    //验证年龄：1-2位整数
    validateAge: function(str){
        return /^\d{1,3}$/i.test(str);
    },
    //验证短信校验码
    validateOTP: function(str){
        return /^\d{4,7}$/i.test(str);
    },
    //验证身份证
    validateIDCard: function(str){
        return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(str);
    },
    //验证邮箱
    validateEmail: function(str){
        return /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/.test(str);
    },
    //验证账号
    validateName:function(str){
        return /^[a-z\u4e00-\u9fa5*]{2,12}$/.test(str);
    }
}