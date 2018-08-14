<template>
	<div class="relative">
		<div ref="maskVideoBox" class="mask-video" v-show="maskShow">
			<video ref="maskVideo" controls="controls" :src="curVideoUrl"></video>
		</div>
		<div class="mask relative" v-show="maskShow" @click="hideMask">
		</div>
		<img @click.prevent src="static/images/page2_01.jpg">
		<img @click.prevent src="static/images/page2_02.jpg">
		<div class="video_box">
			<div class="video">
				<video ref="firstVideo" controls="controls" poster="static/images/black_bg.png" :src="firstVideoUrl"></video>
			</div>
		</div>
		<img @click.prevent src="static/images/page2_04.jpg">
		<div class="form_list01">
			<div class="scene_list f22 bold mb10">
				<div class="scene_name">“小剧场”花絮</div>
			</div>
			<ul class="list_box">
				<li v-for="item in videoListData" @click="showMask(item)">
					<div class="img_box"><img src="static/images/video_img.jpg" alt=""></div>
				</li>
			</ul>
			<ul class="list_box">
				<li v-for="item in imgData">
					<div class="img_box"><img :src="item.url" alt=""></div>
				</li>
			</ul>
		</div>
		<img @click.prevent src="static/images/page1_04.jpg">
	</div>
</template>

<script>
	import constant from '@/js/common/constant'
	import shareImg from '../assets/images/share_img.jpg'
	import wx from 'weixin-js-sdk'
	import mixin from '../js/common/wxshare_mixin'
	export default {
		data() {
			return {
				listData: [],
				maskShow: false,
				curVideoUrl: '',
				firstVideoUrl: 'https://pic.ibaotu.com/00/43/09/17T888piCtVf.mp4',
				videoListData: [],
				imgData: [],
				userData: null,
				shareImg: constant.chelchost + "/wx/" + shareImg
			}
		},
		mounted() {
			let self = this;
			self.getUserInfo();
			self.getList();
		},
		mixins: [mixin],
		methods: { 
			setShareData() {
				let self = this;
            	let openId = self.userData.data && self.userData.data !== null ? self.userData.data.openId : '';
				wx.ready (function () {
			        // 微信分享的数据
			        var shareData = {
			            "imgUrl" : self.shareImg,    // 分享显示的缩略图地址
			            "link" : constant.chelchost + '/wx/index?sharePage=sceneLastDay&shareFrom=' + openId,    // 分享地址/* location.href.split('#')[0] +  */
			            "desc" : '原价699元，新生99元报名',   // 分享描述
			            "title" : '暑假英文阅读戏剧表演营'   // 分享标题
			        }
			        wx.onMenuShareTimeline (shareData)
			        wx.onMenuShareAppMessage (shareData)
			    })
			},
			getList() {
				let self = this;

				self.$service.getReadRoomGradeVideo((res) => {
					if(res.data.code === '0'){
						self.listData = res.data.data;
						self.listData.forEach(function(item, index){
							switch (item.type){
								case 'video1':
									self.firstVideoUrl = item.urlList[0].url;
									break;
								case 'video2': 
									self.videoListData = item.urlList;
									break;
								default:
									self.imgData = item.urlList;
									break;

							}
						})
					}
				}, (error) => {
					console.error(error)
				})
			},
			showMask(item) {
				this.curVideoUrl = item.url;
				this.maskShow = true;
				document.body.style = 'overflow: hidden';
				setTimeout(()=>{
					this.$refs.firstVideo.pause();
					this.$refs.maskVideo.play();
				}, 50)
			},
			hideMask() {
				this.maskShow = false;
				document.body.style = 'overflow: inherit';
				this.$refs.maskVideo.pause();
			},
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
  overflow: hidden;
}
.video_box {
  background: url(../assets/images/video_bg.jpg) repeat-y;
  background-size: 100% 100%;
  width: 100%;
}
.video{ height: 100%; margin: 0 0.7rem;}
video{ width: 100%; object-fit: fill;}
.scene_list {
  background: url(../assets/images/page2_list_bg.jpg) no-repeat;
  background-size: 100% 100%;
  width: 100%;
  height: calc(93*100vw/640);
  margin: 0 auto;
  overflow: hidden;
  color: #ad2924;
}
.scene_name{ margin: 0.4rem 0 0 2.4rem;}
.scene_name5{ margin: 0.3rem 0 0 2.4rem;}
.scene_name5 div{ margin-left: 0.6rem;}

.list_box{ overflow: hidden;}
.list_box li{ float: left; width: 50%; min-height: 2rem; text-align: center; margin: 0.1rem auto; overflow: hidden;}
.list_box li .img_box{ width: 90%; margin: 0 5%;}

.mask-video{ height: 100%; position: absolute; top: 0; bottom: 0; left: 0; right: 0;}
.mask-video video{position: fixed; width: 90%; top: 50%; left: 5%;; right: 5%; transform: translate(0, -50%); z-index: 9999;}
</style>