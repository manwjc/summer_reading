<template>
	<div class="relative">
		<img @click.prevent src="static/images/page2_01.jpg">
		<img @click.prevent src="static/images/page2_02.jpg">
		<div class="video_box">
			<div class="video" >
				<video id="video" controls="controls" poster="static/images/page2_01.jpg" :src="videoUrl"></video>
			</div>
		</div>
		<img @click.prevent src="static/images/page2_04.jpg">
		<audio id="audio" ></audio>
		<img @click.prevent src="static/images/scene_share_02.jpg">
		<img @click.prevent src="static/images/scene_share_03.jpg">
		<div @click.prevent="getUserInfo"><img @click.prevent src="static/images/scene_share_04.jpg"></div>
		<img @click.prevent src="static/images/scene_share_05.jpg">
		<img @click.prevent src="static/images/page1_04.jpg">
	</div>
</template>

<script>
	import Vue from 'vue'
	import Router from 'vue-router'
	import Element from 'element-ui'
	import 'element-ui/lib/theme-chalk/index.css'
	import shareImg from '../assets/images/share_img.jpg'
	import wx from 'weixin-js-sdk'
	import showMessage from 'vue-show-message'
	
	Vue.use(showMessage, {
		duration: 2000
	})
	Vue.use(Router)

	export default {
		data() {
			return {
				userData: null,
				videoUrl: '',
				shareImg: "https://www.chel-c.com/wx/" + shareImg

			}
		},
		mounted() {
			let self = this;
			self.getUserVideo();
		},
		methods: { 
			getUserVideo() {
				let self = this;
				self.$axios.get('/wx/chelApi/getUserVideo').then((res)=>{
					if(res.data.code === '0'){
						self.videoUrl = res.data.videoUrl;
					}else{
						self.$showMsg(res.data.message);
					}
				})
			},
			getUserInfo() {
				let self = this;
				self.$axios.get('/wx/wxApi/getUserInfo').then((res)=>{
					self.userData = res.data;
					if(self.userData.code === '0'){
						if(self.userData.data.isBindPhone === true && self.userData.data.isBuyUser === true){
							self.$router.push({name:"sceneList"})
						}else if(self.userData.data && self.userData.data.isBindPhone === true && self.userData.data.isBuyUser === false){
							self.$router.push({name:"newGay"})
						}else if(self.userData.data && self.userData.data.isBindPhone === false){
							self.$router.push({name:"checkPhone"})
						}
					}else{
						self.$showMsg(self.userData.message);
					}
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
			wxShareInit() {
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
			    wx.ready (function () {
			        // 微信分享的数据
			        var shareData = {
			            "imgUrl" : self.shareImg,    // 分享显示的缩略图地址
			            "link" : location.href.split('#')[0]+'#'+location.href.split('#')[1],    // 分享地址
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
			        //alert("好像出错了！！");
			    });
			}
		}
	}
</script>

<style scoped>
html,
body {
  height: 100%;
  min-height: 100%;
}
.form_list01 {
  background: #fcf6e8;
  padding-bottom: 0.15rem; 
}
.video_box {
  background: url(../assets/images/video_bg.jpg) repeat-y;
  background-size: 100% 100%;
  width: 100%;
}
.video{ height: 100%; margin: 0 0.7rem; overflow: hidden;}
.video video{ width: 100%; object-fit: contain;}
.upload_btn{ position: absolute; top: 0; bottom: 0; left: 0; right: 0; opacity: 0;}
.el-upload__tip, a.el-upload-list__item-name{ color: #c5744c !important;}
.el-upload-list__item-name{ padding-left: 0.4rem;}
.up-button{ position: relative; width: 2rem; left: 50%; transform:translate(-50%, 0);}
.upload-box{ padding: 0.5rem 0 0.2rem;}
/* .el-upload input{display: none} */

.scene_list {
  background: url(../assets/images/page2_list_bg.jpg) no-repeat;
  background-size: 100% 100%;
  width: 100%;
  height: calc(93*100vw/640);
  margin: 0 auto;
  overflow: hidden;
  color: #ad2924;
}
.scene_list.bg6_8{
	background: url(../assets/images/page2_list_bg2.jpg) no-repeat;
	background-size: 100% 100%;
}
.scene_name{ margin: 0.4rem 0 0 2.4rem;}
.scene_name5{ margin: 0.3rem 0 0 2.4rem;}
.scene_name5 div{ margin-left: 0.6rem;}
.select-file,.select-file:hover{
	background: url(../assets/images/btn-upload.jpg) no-repeat;
	width:4.82rem;
	height:2.45rem;
	background-size:100% 100%;
	border:none;
}

</style>