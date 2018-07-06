<template>
	<div class="relative">
		<img src="../assets/images/p_a_01.jpg">
		<img src="../assets/images/p_a_02.jpg">
		<img src="../assets/images/p_b_03.jpg">
		<div class="form_list">
			<div class="form_box">
				<form id="FormBox" method="post">
					<p class="displaybox">
						<label class="label_name" for="password">手机</label><span>：</span>
						<input class="input_normal boxflex01" type="text" name="password">
					</p>
					<p class="displaybox">
						<label class="label_name" for="password">验证码</label><span>：</span>
						<input class="input_normal boxflex01" type="text" name="password">
					</p>
					<p class="mb0">
						<label class="label_name" for="password"></label>
						<span class="f18 grey mleft10">验证码</span>
					</p>
					<p class="displaybox">
						<label class="label_name" for="password">是否在读学员</label><span>：</span>
						<input class="" type="radio" name="radio">
					</p>
				</form>
			</div>
		</div>
		<div @click="submitForm"><img src="../assets/images/p_b_06.jpg"></div>
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
				productList: {},
				productNum: 1,
				curtabNum: 0,	
			}
		},
		mounted() {

		},
		methods: { 
			submitForm() {
				this.$axios({
					method:"post",
					url:"/api/haveUser",
					data:{
						name:this.productNum,
						password:this.curtabNum
					}
				})
				.then((res)=>{
					console.log(res.data);
				})
				.catch((error) => {
					console.log(error)
					this.$router.push({name:"nameListNew",query:{id:1}})
				})
			},

		}
	}
</script>

<style scope>
	html, body{height:100%; min-height: 100%;}
	body {
		 text-align: left;
	}
	.form_list{  background: url(../assets/images/bg_repeat.jpg) repeat-y; background-size: 100% 100%;}
	.form_box{ padding: 0 0.7rem 0 0.5rem; margin: 0 auto;}
	.form_box p{ margin-bottom: 15px; overflow: hidden;}
</style>