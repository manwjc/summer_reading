    
export default {
    //获取用户信息
    getUserData: function(callback) {
        let self = Vue;
        self.$axios.get('/wx/wxApi/getUserInfo').then((res)=>{
            callback(res);
        })
    }
}