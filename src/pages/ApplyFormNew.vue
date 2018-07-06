<template>
	<div class="relative">
		<img src="../assets/images/p_a_01.jpg">
		<img src="../assets/images/p_a_02.jpg">
		<img src="../assets/images/p_b_03.jpg">
		<div class="form_list">
			<div class="form_box">
				<form id="FormBox" method="post">
					<p class="displaybox">
						<label class="label_name" for="partName">阅读馆</label><span>：</span>
						<input class="input_normal boxflex01" type="text" name="partName" v-model="partName">
					</p>
					<p class="displaybox">
						<label class="label_name" for="partNum">期数</label><span>：</span>
						<input class="input_normal boxflex01" type="text" name="partNum" v-model="partNum">
					</p>
					<p class="displaybox">
						<label class="label_name" for="userName">姓名</label><span>：</span>
						<input class="input_normal boxflex01" type="text" name="userName" v-model="userName">
					</p>
					<p class="displaybox">
						<label class="label_name" for="mobile">手机</label><span>：</span>
						<input class="input_normal boxflex01" type="text" name="mobile" v-model="mobile">
					</p>
					<p class="displaybox">
						<label class="label_name" for="code">验证码</label><span>：</span>
						<input class="input_normal boxflex01 wp100" type="text" name="code" v-model="code">
						<label class="label_name mleft10 grey" @click="getCode">验证码</label>
					</p>
					<p class="displaybox">
						<label class="label_name" for="userAge">年龄</label><span>：</span>
						<input class="input_normal boxflex01" type="text" name="userAge" v-model="userAge">
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
	import Valid from '../js/common/validate'
	import showMessage from 'vue-show-message'
	
	Vue.use(showMessage, {
		duration: 2000
	})

	export default {
		name: 'applyFormNew',
		data() {
			return {
				partName: '',
				partNum: '',
				userName: '',
				mobile: '',
				code: '',
				userAge: '',
			}
		},
		mounted() {
			console.log(Valid)
		},
		methods: { 
			submitForm() {
				let self = this;
				let validateMsg = self.validateResult();
				if(validateMsg){
					self.$showMsg(validateMsg);
					return;
				}

				self.$axios({
					method:"post",
					url:"/wxApi/signUp",
					data:{
						readRoomId:1,
						readRoomName:self.partName,
						termNum:self.partNum,
						signName:self.userName,
						signMobile:self.mobile,
						age:self.userAge,
						validateCode:self.code
					}
				})
				.then((res)=>{
					console.log(res.data);
					self.$router.push({name:"nameListNew",query:{id:1}})
				})
				.catch((error) => {
					console.log(error)
				})
			},
			validateResult:function () {
                var self = this,
                    names = [
                        {name:'partName'},
                        {name:'partNum'},
                        {name:'userName'},
                        {name:'mobile', reg:Valid.validate.validateMobile},
                        {name:'code'}
                    ],
                    message;
                var messages = {
                    partName: {require: '阅读馆不能为空'},
                    partNum: {require: '期数不能为空'},
                    userName: {require: '姓名不能为空'},
                    mobile: {require: '手机号不能为空', regex: '手机号不合法，请重新输入'},
                    code: {require: '验证码不能为空', regex: '验证码不正确，请重新输入'}
                };

                for (var i = 0; i < names.length; i++) {
                    var item = names[i];
                    var name = item.name;
                    if (!self[name]) {
                        message = messages[name].require;
                        break;
                    }
                    if (item.reg&&!item.reg(self[name])) {
                        message = messages[name].regex;
                        break;
                    }
                }
                return message;
			},
			getCode: function(){
				let self = this;
				let mobile = self.mobile,
					dataParams = {
						mobile:mobile
					};

				if(!mobile){
					self.$showMsg('请输入手机号');
					return;
				}
				if(!Valid.validate.validateMobile(mobile)){
					self.$showMsg('手机号不合法，请重新输入');
					return;
				}

				self.$showMsg('验证码已发送');
				self.$axios.get('/wxApi/sendValidateCode', {
					params: dataParams
				})
				.then((res)=>{
					console.log(res.data);
				})
				.catch((error) => {
					console.log(error)
				})
			}

		}
	}
</script>

<style scope>
	html, body{height:100%; min-height: 100%;}
	body {
		 text-align: left;
	}
	.form_list{ background: url(../assets/images/bg_repeat.jpg) repeat-y; background-size: 100% 100%;}
	.form_box{ padding: 0 0.7rem 0 0.5rem; margin: 0 auto;}
	.form_box p{ margin-bottom: 15px; overflow: hidden;}
</style>