<template>
	<div class="relative">
		<img @click.prevent src="../assets/images/p_a_01.jpg">
		<img @click.prevent src="../assets/images/p_a_02.jpg">
		<img @click.prevent src="../assets/images/p_b_03.jpg">
		<div class="form_list">
			<div class="form_box">
				<form id="FormBox" method="post">
					<p class="displaybox">
						<label class="label_name" for="userName">家长姓名</label><span>：</span>
						<input class="input_normal boxflex01" type="text" name="userName" v-model="userName">
					</p>
					<p class="displaybox">
						<label class="label_name" for="userAge">宝贝年龄</label><span>：</span>
						<input class="input_normal boxflex01" type="text" name="userAge" v-model="userAge">
					</p>
					<p class="displaybox">
						<label class="label_name" for="defaultRoom">阅读馆</label><span>：</span>
						<select class="input_normal boxflex01" v-model="defaultRoom" name="defaultRoom" >
							<option v-for="(item,index) in readingRooms"  :value="index+1">{{ item.name }}</option>
						</select>

					</p>
					<p class="displaybox">
						<label class="label_name" for="partNum">期数</label><span>：</span>
						<!-- <input class="input_normal boxflex01" type="text" name="partNum" v-model="partNum"> -->
						<select class="input_normal boxflex01" v-model="defaultTerm" name="defaultTerm" >
							<option v-for="(item,index) in termList"  :value="index+1">{{ item.time }}</option>
						</select>
					</p>
					<!-- <p class="displaybox">
						<label class="label_name" for="mobile">手机</label><span>：</span>
						<input class="input_normal boxflex01" type="text" name="mobile" v-model="mobile">
					</p>
					<p class="displaybox">
						<label class="label_name" for="code">验证码</label><span>：</span>
						<input class="input_normal boxflex01 wp100" type="text" name="code" v-model="code">
						<label class="label_name mleft10 grey" @click="getCode">验证码</label>
					</p> -->
				</form>
			</div>
		</div>
		<div @click.prevent="submitForm"><img @click.prevent src="../assets/images/p_b_06.jpg"></div>
		<img @click.prevent src="../assets/images/p_a_07.jpg">
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
				readingRooms: [
					{name: '深圳太古城阅读馆'},
					{name: '深圳华润城阅读馆'},
					{name: '深圳Cococity阅读馆'},
					{name: '深圳喜荟城阅读馆'},
					{name: '深圳虹湾阅读馆'},
					{name: '梅州万达阅读馆'},
					{name: '成都九方阅读馆'},
					{name: '宁波银泰城阅读馆'},
					{name: '杭州新天地阅读馆'},
				],
				defaultRoom: 1,
				termList: [],
				//3-5岁
				termList01: [
					{time: '第一期 10:15--11:00'},
					{time: '第一期 15:15--16:00'},
					{time: '第一期 17:15--18:00'},
					// {time: '第二期 10:15--11:00'},
					// {time: '第二期 11:15--12:00'},
					// {time: '第三期 10:15--11:00'},
					// {time: '第三期 11:15--12:00'},
					// {time: '第四期 10:15--11:00'},
					// {time: '第四期 11:15--12:00'},
					// {time: '第五期 10:15--11:00'},
					// {time: '第五期 11:15--12:00'},
				],
				//6-8岁
				termList02: [
					{time: '第一期 11:15--12:00'},
					{time: '第一期 14:15--15:00'},
					{time: '第一期 16:15--17:00'},
					// {time: '第二期 10:15--11:00'},
					// {time: '第二期 11:15--12:00'},
					// {time: '第三期 10:15--11:00'},
					// {time: '第三期 11:15--12:00'},
					// {time: '第四期 10:15--11:00'},
					// {time: '第四期 11:15--12:00'},
					// {time: '第五期 10:15--11:00'},
					// {time: '第五期 11:15--12:00'},
				],
				defaultTerm: 1,
				partNum: '',
				userName: '',
				// mobile: '',
				// code: '',
				userAge: '',
				userData: null
			}
		},
		mounted() {
			console.log(Valid)
		},
		methods: { 
			submitForm() {
				let self = this;
				let validateMsg = self.validateResult();
				let dataParams;

				if(validateMsg){
					self.$showMsg(validateMsg);
					return;
				}
				
				dataParams = self.$qs.stringify({
						signName:self.userName,
						age:self.userAge,
						readRoomName:self.readingRooms[self.defaultRoom-1].name,
						termNum:self.termList[self.defaultTerm-1].time,
						// signMobile:self.mobile,
						// validateCode:self.code
					})

				self.$axios.get('/wx/wxApi/getTermNum', {
					params: {
						termNum:self.termList[self.defaultTerm-1].time,
						readRoomName:self.readingRooms[self.defaultRoom-1].name
					}
				}).then((res)=>{
					if(!res.data.data.canSignUp){
						self.$showMsg('本期报名人数已满，欢迎到店领取精美绘本');
					}else{
						self.$axios({
							method: "post",
							url: "/wx/wxApi/signUp",
							data: dataParams
						})
						.then((res) => {
							let data = res.data;
							if(data.code === '0'){
								self.$axios.get('/wx/wxApi/getUserInfo').then((res)=>{
									self.userData = res.data;
									if(self.userData.code === '0'){
										if(self.userData.data.isBindPhone === true && self.userData.data.isBuyUser === true){
											self.$router.push({name:"nameList"})
										}else{
											self.toPay(data.data);
										}
									}else{
										self.$showMsg(self.userData.message);
									}
								})
							}else{
								self.$showMsg(data.message)
							}
							//self.$router.push({name:"nameListNew",query:{id:1}})
						})
						.catch((error) => {
							console.log(error)
						})
					}
				})

			},
			validateResult:function () {
				var self = this,
                    names = [
						{name:'userName'},
                        {name:'userAge', reg:Valid.validateAge},
                        {name:'defaultRoom'},
                        {name:'defaultTerm'},
                        // {name:'mobile', reg:Valid.validateMobile},
                        // {name:'code'}
                    ],
                    message;
                var messages = {
                    userName: {require: '姓名不能为空'},
                    userAge: {require: '宝贝年龄不能为空', regex: '年龄为1-3为整数'},
                    defaultRoom: {require: '阅读馆不能为空'},
                    defaultTerm: {require: '期数不能为空'},
                    // mobile: {require: '手机号不能为空', regex: '手机号不合法，请重新输入'},
                    // code: {require: '验证码不能为空', regex: '验证码不正确，请重新输入'}
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
				if(!Valid.validateMobile(mobile)){
					self.$showMsg('手机号不合法，请重新输入');
					return;
				}

				self.$showMsg('验证码已发送');
				self.$axios.get('/wx/wxApi/sendValidateCode', {
					params: dataParams
				})
				.then((res)=>{
					var validCode = res.data.data;
					if(validCode){
						self.code = validCode;
					}
				})
				.catch((error) => {
					console.log(error)
				})
			},
			toPay(obj) {
				let self = this;
				// alert("appId：" + obj.appid+"timeStamp："+obj.timeStamp+"nonceStr："+obj.nonceStr+"package："+'prepay_id=' + obj.prepayId+"signType："+obj.signType+"paySign："+obj.sign  );
				WeixinJSBridge.invoke('getBrandWCPayRequest',{  
					"appId":obj.appid,                 //公众号名称，由商户传入  
					"timeStamp":obj.timeStamp,          //时间戳，自 1970 年以来的秒数  
					"nonceStr":obj.nonceStr,         //随机串  
					"package":'prepay_id=' + obj.prepayId,      //prepay_id=*** 
					"signType":obj.signType,        //微信签名方式:MD5  
					"paySign":obj.sign           //微信签名  
					},function(res){      
						//alert(res.err_msg); // get_brand_wcpay_request:ok
					if(res.err_msg == "get_brand_wcpay_request:ok" ) {  
						self.$router.push({name:"nameList"})
					}else{  
						// alert("错误：" + res.err_msg);
						self.$router.push({name:"newGay"}) 
					}  
				});
			}

		},
		watch: {
			userAge(val){
				let self = this;
				if(val && val*1 < 6){
					self.termList = self.termList01;
				}else if(val && val*1 >= 6){ 
					self.termList = self.termList02;
				}
　　　　　　 },
		}
	}
</script>

<style scope>
	html, body{height:100%; min-height: 100%;}
	body {
		 text-align: left;
	}
	.form_list{ background: url(../assets/images/bg_repeat.jpg) repeat-y; background-size: 100% 100%;}
	.form_box{ padding: 0 0.6rem 0 0.5rem; margin: 0 auto;}
	.form_box p{ margin-bottom: 15px; overflow: hidden;}
	select option{
		appearance:none;
		-moz-appearance:none; 
		-webkit-appearance:none;  
	}
	option{ width: 100%;}
</style>