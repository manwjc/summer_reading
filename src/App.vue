<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
	import Vue from 'vue'
	import shareImg from './assets/images/share_img.jpg'
	import shareImg01 from './assets/images/share_img01.jpg'
	import wx from 'weixin-js-sdk'
  export default {
    name: "app",
    data() {
      return {
          wxInfo: null,
          shareImg: shareImg,
          shareImg01: shareImg01
      };
    },
    mounted() {
        let self = this;
        var shareDataaa = {
            "imgUrl" : self.shareImg,    // 分享显示的缩略图地址
            "link" : 'index.html',    // 分享地址
            "desc" : '原价699元，新生99元报名',   // 分享描述
            "title" : '暑假英文阅读戏剧表演营'   // 分享标题
        }
        //self.getWxInfo();

        var fun = function(doc, win) {
            var docEl = doc.documentElement,
            resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
            recalc = function() {
                var clientWidth = docEl.clientWidth > 640 ? 640 : docEl.clientWidth;
                if (!clientWidth) return;
    
                //这里是假设在640px宽度设计稿的情况下，1rem = 10px；
                //可以根据实际需要修改
                docEl.style.fontSize = 100 * (clientWidth / 640) + 'px';
                console.log(100 * (clientWidth / 640) + 'px');
            };
            if (!doc.addEventListener) return;
            win.addEventListener(resizeEvt, recalc, false);
            doc.addEventListener('DOMContentLoaded', recalc, false);
        }
        fun(document, window);
    },
    methods: {
        getWxInfo() {
            let self = this;

            self.$axios.get('/wx/wxApi/getWxInfo', {
                params: {currentUrl: location.href.split('#')[0]}
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
        wxShareInit() {
            //配置微信信息
            wx.config ({
                debug : true,    // true:调试时候弹窗
                appId : self.wxInfo.appid,  // 微信appid
                timestamp : self.wxInfo.timeStamp, // 时间戳
                nonceStr : self.wxInfo.nonceStr,  // 随机字符串
                signature : self.wxInfo.sign, // 签名
                jsApiList : [
                    // 所有要调用的 API 都要加到这个列表中
                    'onMenuShareTimeline',       // 分享到朋友圈接口
                    'onMenuShareAppMessage',  //  分享到朋友接口
                ]
            });
            wx.ready (function () {
                // 微信分享的数据
                var shareData = {
                    "imgUrl" : '../assets/share_img.jpg',    // 分享显示的缩略图地址
                    "link" : 'index.html',    // 分享地址
                    "desc" : '原价699元，新生99元报名',   // 分享描述
                    "title" : '暑假英文阅读戏剧表演营'   // 分享标题
                }
                wx.onMenuShareTimeline (shareData)
                wx.onMenuShareAppMessage (shareData)
            })
            wx.error(function(res){ 
                // config信息验证失败会执行error函数，如签名过期导致验证失败，
                // 具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，
                //对于SPA可以在这里更新签名。 
                alert("好像出错了！！");
            });
        }
    }
  };
</script>

<style>
  html {
    font-size: 100px;
  }
  
  body {
    font-size: 0.16rem;
    text-align: left;
    tap-highlight-color: rgba(143,142,148,0); focus-ring-color: rgba(0, 0, 0, 0); -webkit-tap-highlight-color: rgba(143,142,148,0); -webkit-focus-ring-color: rgba(0, 0, 0, 0); 
  }
  html,
  body,
  p {
    margin: 0;
    padding: 0;
    color: #79d1d5;
  }
  
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
  @media only screen and (min-width:640px) {
    html,
    body {
      width: 640px;
      margin: 0 auto;
    }
  }
  
  @media only screen and (max-width:639px) {
    html,
    body {
      width: 100%;
    }
  }
  
  img {
    width: 100%;
    max-width: 100%;
    display: block;
  }
  
  h1,
  h2 {
    font-weight: normal;
  }
  
  ul,
  li {
    list-style-type: none;
    padding: 0;
  }
  
  a {
    color: #42b983;
  }
  
  select, input {
    outline: none; font-size: 0.3rem;
  }
  
  .relative {
    position: relative;
  }
  
  .mleft5 {
    margin-left: 0.05rem;
  }
  
  .mleft10 {
    margin-left: 0.1rem;
  }
  
  .mleft20 {
    margin-left: 0.2rem !important;
  }
  
  .minuleft20 {
    margin-left: -0.2rem !important;
  }
  
  .mb0 {
    margin-bottom: 0 !important;
  }
  
  .mb10 {
    margin-bottom: 10px !important;
  }
  
  .mtop10 {
    margin-top: 10px !important;
  }
  
  .center {
    text-align: center;
  }
  
  .left {
    text-align: left;
  }
  
  .right {
    text-align: right;
  }
  
  .f18 {
    font-size: 0.18rem;
  }
  
  .f20 {
    font-size: 0.2rem;
  }
  
  .f22 {
    font-size: 0.22rem;
  }
  
  .f24 {
    font-size: 0.24rem;
  }
  
  .f30 {
    font-size: 0.30rem;
  }
  
  .grey {
    color: #a3a4a6;
  }
  .bold{ font-weight: bold;}
  
  .w54 {
    width: 0.54rem;
  }
  
  .w80 {
    width: 0.8rem;
  }

  .wp100{ width: 100%;}
  .heightp100{ height: 100%;}
  
  .displaybox {
    display: -moz-flex;
    display: -webkit-flex;
    display: flex;
    -moz-align-items: center;
    -webkit-align-items: center;
    align-items: center;
  }
  
  .boxflex01 {
    -moz-box-flex: 1;
    -webkit-box-flex: 1;
    box-flex: 1;
    -moz-flex: 1;
    -webkit-flex: 1;
    flex: 1;
    display: block;
  }
  
  .boxalign {
    -webkit-box-align: center !important;
    box-align: center !important;
    -webkit-align-items: center !important;
    align-items: center !important
  }
  
  .boxalignstart {
    -webkit-box-align: start !important;
    box-align: start !important;
    -webkit-align-items: flex-start !important;
    align-items: flex-start !important
  }
  
  .boxalignend {
    -webkit-box-align: end !important;
    box-align: end !important;
    -webkit-align-items: flex-end !important;
    align-items: flex-end !important
  }
  
  .label_name {
    display: block;
    min-width: 1.3rem;
    text-align: justify;
    text-align-last: justify;
    font-size: 0.26rem;
  }
  
  .input_normal {
    border: 1px solid #9e9fa1;
    border-radius: 0.02rem;
    text-indent: 0.5em;
    height: 0.6rem;
    line-height: 0.6rem;
  }
  
  .head_img {
    width: 0.7rem;
    height: 0.7rem;
  }
  .head_img img{
    width: 0.7rem;
    height: 0.7rem;
    border-radius: 1rem;
  }

  .form_list{ min-height: calc(260*100vh/640); padding-bottom: 0.15rem; }
  .message{ font-size: 0.24rem !important; padding: 0 0.1rem;}
  .underline{ text-decoration: underline;}
    
  .mask{ width: 100%; height: 100%; background: rgba(0, 0, 0, 0.95); position: absolute; z-index: 999;}
  .mask img{ width: 100%;}

  .message{ width: 3.6rem !important; height: 0.8rem !important;}
</style>
