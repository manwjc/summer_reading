<template>
	<div class="relative">
		<img src="../assets/images/p_a_01.jpg">
		<img src="../assets/images/p_a_02.jpg">
		<img src="../assets/images/p_b_03.jpg">
		<div class="form_list">
			<div class="form_box f30">
				<!-- <div class="displaybox mb10" v-for="(item, index) in nameList">
					<span>{{index+1}}.</span>
					<div class="head_img mleft5"><img :src="item.pic"></div>
					<div class="boxflex01 mleft5">{{item.name}}</div>
					<span class="w50 right">已报名</span>
				</div> -->
				<div class="displaybox mb10" v-for="(item, index) in nameData">
					<span>{{index+1}}.</span>
					<div class="head_img mleft5"><img :src="item.pic"></div>
					<div class="boxflex01 mleft5">{{item.userName}}</div>
					<span class="w50 right">已报名</span>
				</div>
			</div>
		</div>
		<div><img src="../assets/images/successed.jpg"></div>
		<img src="../assets/images/p_a_07.jpg">
	</div>
</template>

<script>
	import Vue from 'vue'
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
							pic: '../assets/images/head_img.jpg',
							name: 'jerry',
						},
						{
							pic: './dist/head_img.jpg',
							name: 'jerry',
						},
						{
							pic: '/dist/head_img.jpg',
							name: 'jerry',
						},
						{
							pic: 'dist/head_img.jpg',
							name: 'jerry',
						}
					],
				nameData: null
			}
		},
		mounted() {
			this.getNameList();

		},
		methods: { 
			getNameList() {
				let self = this;

				self.$axios.get('/login').then(
					self.$axios.get('/wxApi/recommendSignUp', {
						params: {}
					})
					.then((res)=>{
						console.log(res.data);
						self.nameData = res.data.data;
					})
				)
			},
		}
	}
</script>

<style scope>
	html, body{height:100%; min-height: 100%; color: #79d1d5;}
	body {
		 text-align: left;
	}
	.form_list{ background: url(../assets/images/bg_repeat.jpg) repeat-y; background-size: 100% 100%;}
	.form_box{ padding: 0 0.7rem 0 0.5rem; margin: 0 auto;}
	.form_box p{ margin-bottom: 15px;}
</style>