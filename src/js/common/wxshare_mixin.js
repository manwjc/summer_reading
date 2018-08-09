import wx from 'weixin-js-sdk'
import service from '@/js/service'
import shareImg from '@/assets/images/share_img.jpg'

export default {
    data() {
      return {
          shareImg: shareImg,
      };
    },
    methods: { 
        getUserInfo(callback) {
            let self = this;
            let stateUserData = self.$store.state.userData;
            if(stateUserData !== null){
                self.userData = self.$store.state.userData
                self.getWxInfo();
                callback && callback();
            }else{
                service.getUserInfo((res)=>{
                    self.userData = self.$store.state.userData = res.data;
                    self.getWxInfo();
                    callback && callback();
                })
            }
        },
        getWxInfo() {
            let self = this;
            if(self.$store.state.wxInfo !== null){
                self.wxShareInit();
            }else{
                service.getWechatSign({
                    params: {url: location.href.split('#')[0]}
                }, (res) => {
                    let data = res.data;
                    if(data.code === '0'){
                        self.wxInfo = self.$store.state.wxInfo = data.data;
                        self.wxShareInit();
                    }
                })
            }
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
        setShareData() {
            let self = this;
            let openId = self.userData.data && self.userData.data !== null ? self.userData.data.openId : '';
            wx.ready (function () {
                // 微信分享的数据
                var shareData = {
                    "imgUrl" : self.shareImg,    // 分享显示的缩略图地址
                    "link" : 'https://www.chel-c.com/wx/index?sharePage=' + self.$route.path === '/' ? '' : self.$route.path + '&shareFrom=' + openId,    // 分享地址/* location.href.split('#')[0] +  */
                    "desc" : '原价699元，新生99元报名',   // 分享描述
                    "title" : '暑假英文阅读戏剧表演营'   // 分享标题
                }
                wx.onMenuShareTimeline (shareData)
                wx.onMenuShareAppMessage (shareData)
            })
        },
    }
}