<template>
	<div class="relative">
		<div class="mask" v-show="maskShow" @click="hideMask"><img @click.prevent src="../assets/images/toShare.png"></div>
		<img @click.prevent src="../assets/images/p_a_01.jpg">
		<img @click.prevent src="../assets/images/p_a_02.jpg">
		<img @click.prevent src="../assets/images/p_b_03.jpg">
		<img @click.prevent src="../assets/images/p_c_04.jpg">
		<img @click.prevent src="../assets/images/p_c_05.jpg">
		<div class="form_list01">
			<div class="form_box f30">
				<div class="displaybox mb10" v-for="(item, index) in nameData">
					<span>{{index+1}}.</span>
					<div class="head_img mleft10" v-if="item.pic"><img @click.prevent :src="item.pic"></div>
					<div class="head_img mleft10" v-else><img @click.prevent src="../assets/images/head-img.jpg"></div>
					<div class="boxflex01 mleft10">{{item.userName}}</div>
					<span class="w50 right">已报名</span>
				</div>
			</div>
		</div>
		<div v-if="nameData && nameData.length > 2" @click.prevent="showMask"><img @click.prevent src="../assets/images/successed.jpg"></div>
		<div v-else @click.prevent="showMask"><img @click.prevent src="../assets/images/p_c_06.jpg"></div>
		<img @click.prevent src="../assets/images/p_a_07.jpg">
	</div>
</template>

<script>
	import Vue from 'vue'
	import headImg from '../assets/images/head-img.jpg'
	import showMessage from 'vue-show-message'
	
	Vue.use(showMessage, {
		duration: 2000
	})

	export default {
		name: 'applyFormNew',
		data() {
			return {
				nameList: [
						{
							pic: headImg,
							userName: 'jerry',
						},
						{
							pic: headImg,
							userName: 'jerry',
						},
						{
							pic: headImg,
							userName: 'jerry',
						},
						{
							pic: headImg,
							userName: 'jerry',
						}
					],
				nameData: [],
				maskShow: false
			}
		},
		mounted() {
			let self = this;
			self.getNameList();
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
  color: #79d1d5;
}
body {
  text-align: left;
}
.form_list01 {
  background: url(../assets/images/bg_repeat.jpg) repeat-y;
  background-size: 100% 100%;
  min-height: calc(20*100vh/640); padding-bottom: 0.15rem; 
}
.form_box {
  padding: 0 0.7rem 0 0.5rem;
  margin: 0 auto;
}
.form_box p {
  margin-bottom: 15px;
}
.mask{ width: 100%; height: 100%; background: rgba(0, 0, 0, 0.95); position: absolute; z-index: 999;}
.mask img{ width: 100%;}
</style>