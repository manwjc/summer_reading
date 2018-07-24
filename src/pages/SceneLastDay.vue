<template>
	<div class="relative">
		<div class="mask" v-show="maskShow" @click="hideMask"><img @click.prevent src="../assets/images/toShare.png"></div>
		<img @click.prevent src="static/images/page2_01.jpg">
		<img @click.prevent src="static/images/page2_02.jpg">
		<div class="video_box">
			<div class="video">
				<video controls="controls" poster="static/images/page2_01.jpg" src="https://pic.ibaotu.com/00/43/09/17T888piCtVf.mp4"></video>
			</div>
		</div>
		<img @click.prevent src="static/images/page2_04.jpg">
		<div class="form_list01">
			<div class="scene_list f22 bold mb10">
				<div class="scene_name">“小剧场”花絮</div>
			</div>
			<!-- <ul class="list_box">
				<li v-for="item in nameList">
					<div class="img_box"><video controls="controls" src="https://pic.ibaotu.com/00/43/09/17T888piCtVf.mp4"></video></div>
					{{item.name}}
				</li>
			</ul> -->
			<ul class="list_box">
				<li v-for="item in nameList">
					<div class="img_box"><img src="static/images/video_img.jpg" alt=""></div>
					<div class="mtop10">{{item.name}}</div>
				</li>
			</ul>
			<ul class="list_box">
				<li v-for="item in nameList">
					<div class="img_box"><img src="static/images/page2_01.jpg" alt=""></div>
					<div class="mtop10">{{item.name}}</div>
				</li>
			</ul>
		</div>
		<img @click.prevent src="static/images/page1_04.jpg">
		<!-- <div @click.prevent="showMask"><img @click.prevent src="../assets/images/p_c_06.jpg"></div> -->
	</div>
</template>

<script>
	export default {
		data() {
			return {
				nameList: [
						{
							name: '“小剧场”剧本台词',
						},
						{
							name: '“小剧场”剧本录音',
						},
						{
							name: '“小剧场”作业',
						},
						{
							name: '“小剧场”作业',
						},
						{
							name: '“小剧场”作业',
						}
					],
				nameData: [],
				maskShow: false
			}
		},
		mounted() {
			let self = this;
			//self.getNameList();
		},
		methods: { 
			getNameList() {
				let self = this;

				self.$axios.get('/wx/wxApi/recommendSignUp', {
					params: {}
				})
				.then((res)=>{
					if(res.data.code === '0'){
						self.nameData = res.data.data;
					}
				})
				.catch((error) => {
					alert(error)
				})
			},
			showMask() {
				this.maskShow = true;
				document.body.scrollTop = 0;
				document.body.style = 'overflow: hidden';
			},
			hideMask() {
				this.maskShow = false;
				document.body.style = 'overflow: inherit';
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
.video video{ width: 100%; object-fit: contain;}
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
.list_box li{ float: left; width: 50%; height: 2.4rem; text-align: center; margin: 0.1rem auto; overflow: hidden;}
.list_box li .img_box{ width: 90%; margin: 0 5%;}
.list_box li .img_box video{ width: 100%; height: 2.4rem;}
</style>