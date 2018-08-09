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
		<div @click.prevent="JoinIn"><img @click.prevent src="static/images/scene_share_04.jpg"></div>
		<img @click.prevent src="static/images/scene_share_05.jpg">
		<img @click.prevent src="static/images/page1_04.jpg">
	</div>
</template>

<script>
	import utils from '@/js/common/utils'

	export default {
		data() {
			return {
				userData: null,
				videoUrl: '',
			}
		},
		mounted() {
			let self = this;
			self.init();
		},
		methods: { 
			init() {
				const self = this
				self.$service.getUserInfo((res) => {
					self.userData = res.data;
					self.getUserVideo();
				})
			},
			getUserVideo() {
				let self = this;
				self.$service.getUserVideo({
					params: { 
						id: self.$route.query.id, 
						shareFrom: self.userData.data && self.userData.data !== null ? self.userData.data.openId : ''
					}
				}, (res)=>{
					if(res.data.code === '0'){
						self.videoUrl = utils.handleUrl(res.data.data.vidoUrl);
					}else{
						self.$showMsg(res.data.message);
					}
				})
			},
			JoinIn() {
				let self = this;
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
.video_box {
  background: url(../assets/images/video_bg.jpg) repeat-y;
  background-size: 100% 100%;
  width: 100%;
}
.video{ height: 100%; margin: 0 0.7rem; overflow: hidden;}
.video video{ width: 100%; object-fit: contain;}

</style>