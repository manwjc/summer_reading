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
			toPay() {
			
				var ajaxURL= "../order/submitOrderMulti.do";       
				jQuery.ajax({
					url: ajaxURL,//ajax调用微信统一接口获取prepayId
					cache: false,
					dataType:"json",
					async:false,
					data: dataParams + "&shouldPayAmt=" + shouldPayAmt,
					success:function(data) {
						var obj = jQuery.parseJSON(data);
						if(obj.status !=undefined && "0000"!=obj.status){//提交订单失败
							issubmited = false;
							$('.btn-check-pay').removeClass('bggrey01').addClass('bgred');
							return;
						}
						
						if(shouldPayAmt<0.000001){//100%用券支付成功
							history.replaceState({}, '我的订单', '../order/qryOrderList.do'); //这一行会导致android支付失败，因为修改了支付授权目录，不是./cart开头
							window.location.href = "../order/viewOrderDetail.do?orderId="+obj.orderId+"&isNeedSendMsg=1";
							return false;
						}
					
						WeixinJSBridge.invoke('getBrandWCPayRequest',{  
							"appId":obj.appId,                 //公众号名称，由商户传入  
							"timeStamp":obj.timeStamp,          //时间戳，自 1970 年以来的秒数  
							"nonceStr":obj.nonceStr,         //随机串  
							"package":obj.package,      //prepay_id=*** 
							"signType":obj.signType,        //微信签名方式:MD5  
							"paySign":obj.paySign           //微信签名  
							},function(res){      
								//alert(res.err_msg); // get_brand_wcpay_request:ok
							if(res.err_msg == "get_brand_wcpay_request:ok" ) {  
								history.replaceState({}, '我的订单', '../order/qryOrderList.do'); //这一行会导致android支付失败，因为修改了支付授权目录，不是./cart开头，需在支付成功后设置
								window.location.href = "../order/viewOrderDetail.do?orderId="+obj.orderId+"&isNeedSendMsg=1";
							}else{  
								alert("付款失败，您可查看订单，继续支付");
								//alert("详细错误" + res.err_msg);
								window.location.href="../order/qryOrderList.do";     
							//当失败后，继续跳转该支付页面让用户可以继续付款，特别注意不能直接调转jsp，不然会报system:access_denied 
							}  
					});
					issubmited = false;
						$('.btn-check-pay').removeClass('bggrey01').addClass('bgred');
						
					},
					error: function(data) {
						alert("确认付款失败，请稍后再试");
						issubmited = false;
						$('.btn-check-pay').removeClass('bggrey01').addClass('bgred');
					}
				});
			}
		}
	}
</script>

<style scope>
html,
body {
  height: 100%;
  min-height: 100%;
  color: #79d1d5;
}
body {
  text-align: left;
}
.form_list {
  background: url(../assets/images/bg_repeat.jpg) repeat-y;
  background-size: 100% 100%;
}
.form_box {
  padding: 0 0.7rem 0 0.5rem;
  margin: 0 auto;
}
.form_box p {
  margin-bottom: 15px;
}
</style>