<template>
	<div class="relative">
		<img @click.prevent src="../assets/images/p_a_01.jpg">
		<img @click.prevent src="../assets/images/p_b_02.jpg">
		<img @click.prevent src="../assets/images/p_b_03.jpg">
		<div class="form_list">
			<div class="form_box">
				<form id="FormBox" method="post">
					<p class="displaybox">
						<label class="label_name" for="mobile">手机</label><span>：</span>
						<input class="input_normal boxflex01" type="text" name="mobile" v-model="mobile">
					</p>
					<p class="displaybox">
						<label class="label_name" for="code">验证码</label><span>：</span>
						<input class="input_normal boxflex01 wp100" type="text" name="code" v-model="code">
						<label class="label_name mleft10 grey underline" @click="getCode">验证码</label>
					</p>
					<div class="displaybox f30">
						<label class="label_name" for="password">是否在读学员</label><span>：</span>
						<div v-for="(item,index) in list"><input :value="item.key" v-model="checkedValue" type="radio" name="isAtSchool" /> {{item.value}}</div>
						<!-- <div><input class="" type="radio" name="radio" /> 否</div> -->
      <!-- <input type="radio" name="isAtSchool" v-for="(item,index) in list" :value="item.value" v-model="checkedValue"> -->
					</div>
				</form>
			</div>
		</div>
		<div @click="submitForm"><img @click.prevent src="../assets/images/p_b_06.jpg"></div>
		<img @click.prevent src="../assets/images/p_a_07.jpg">
		<img @click.prevent src="../assets/images/p_a_08.jpg">
	</div>
</template>

<script>
	import Valid from '@/js/common/validate'

	export default {
		data() {
			return {
				mobile: '',
				code: '',
				checkedValue: true,
				list:[
					{value: '是', key: true},
					{value: '否', key: false}
				]
			}
		},
		mounted() {
			
		},
		methods: { 
			getUserInfo() {
				let self = this;
				self.$service.getUserInfo((res) => {
					let data = res.data;
					if(data.code === '0'){
						if(data.data && data.data.isBindPhone === true && data.data.isBuyUser === true){
							self.$router.push({name:"sceneList"})
						}else if(data.data && data.data.isBindPhone === true && data.data.isBuyUser === false){
							self.$router.push({name:"newGay"})
						}
					}else{
						self.$showMsg(data.message);
					}
				}, (error) => {
					self.$showMsg(error)
				})
			},
			submitForm() {
				let self = this;
				let validateMsg = self.validateResult();
				let dataParams = self.$qs.stringify({
						signMobile:self.mobile,
						validateCode:self.code,
						isOldStudent:self.checkedValue
					});
				if(validateMsg){
					self.$showMsg(validateMsg);
					return;
				}

				self.$service.bindMobile(dataParams, (res) => {
					if(res.data.code === '0'){
						self.getUserInfo();
					}else{
						self.$showMsg(res.data.message);
					}
				}, (error) => {
					self.$showMsg(error)
				})
			},
			validateResult() {
                var self = this,
                    names = [
                        {name:'mobile', reg:Valid.validateMobile},
                        {name:'code'}
                    ],
                    message;
                var messages = {
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
                    if (item.reg && !item.reg(self[name])) {
                        message = messages[name].regex;
                        break;
                    }
                }
                return message;
			},
			getCode(){
				let self = this;
				let mobile = self.mobile,
					dataParams = {
						mobile:mobile
					};

				if(!mobile){
					self.$showMsg('请输入手机号');
					return;
				}
				if(!Valid.validateMobile(mobile)){
					self.$showMsg('手机号不合法，请重新输入');
					return;
				}

				self.$showMsg('验证码已发送');
				self.$service.sendValidateCode(dataParams, (res) => {
					var validCode = res.data.data;
					if(validCode){
						self.code = validCode;
					}
				}, (error) => {
					self.$showMsg(error)
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
	input[type=radio]{ width: 0.3rem; height: 0.3rem; vertical-align: -1px;}
</style>