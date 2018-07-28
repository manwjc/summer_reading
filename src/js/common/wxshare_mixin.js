    


import wx from 'weixin-js-sdk'
export default {
    methods: { 
        getUserInfo() {
            let self = this;
            self.$axios.get('/wx/wxApi/getUserInfo').then((res)=>{
                self.userData = res.data;
                self.getWxInfo();
            })
        },
        getWxInfo() {
            let self = this;
            self.$axios.get('/wx/wechat/portal/getWechatSign', {
                params: {url: location.href.split('#')[0]}
            })
            .then((res)=>{
                let data = res.data;
                if(data.code === '0'){
                    self.wxInfo = data.data;
                    self.wxShareInit();
                }
            })
            .catch((error) => {
                console.log(error)
            })
        },
        wxShareInit(shareData) {
            let self = this;
            //配置微信信息
            wx.config ({
                debug : false,    // true:调试时候弹窗
                appId : self.wxInfo.appId, // 微信appid
                timestamp : self.wxInfo.timestamp, // 时间戳
                nonceStr : self.wxInfo.nonceStr, // 随机字符串
                signature : self.wxInfo.signature, // 签名
                jsApiList : [
                    // 所有要调用的 API 都要加到这个列表中
                    'onMenuShareTimeline',       // 分享到朋友圈接口
                    'onMenuShareAppMessage',  //  分享到朋友接口
                ]
            });
            self.setShareData();
            wx.error(function(res){ 
                // config信息验证失败会执行error函数，如签名过期导致验证失败，
                // 具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，
                //对于SPA可以在这里更新签名。 
                //alert("好像出错了！！");
            });
        },
        setShareData() {}
    }
}