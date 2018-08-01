<template>
	<div class="relative hp100">
		<div class="mask" v-show="maskShow" @click="hideMask"><img @click.prevent src="static/images/paycode.jpg"></div>
		<img @click.prevent src="static/images/opening_01.jpg">
		<img @click.prevent src="static/images/opening_02.jpg">
		<div @click.prevent="showMask"><img src="static/images/opening_03.jpg"></div>
		<img @click.prevent src="static/images/opening_04.jpg">
	</div>
</template>

<script>
	import shareImg from '../assets/images/share_img.jpg'
	import wx from 'weixin-js-sdk'
	import mixin from '../js/common/wxshare_mixin'
	export default {
		beforeCreate: function() {
        	document.getElementsByTagName("body")[0].className="bgcolor";
		},
		data() {
			return {
				maskShow: false,
				shareImg: "https://www.chel-c.com/wx/" + shareImg
			}
		},
		mounted() {
		},
		methods: { 
			setShareData() {
				let self = this;
				wx.ready (function () {
			        // 微信分享的数据
			        var shareData = {
			            "imgUrl" : self.shareImg,    // 分享显示的缩略图地址
			            "link" : 'https://www.chel-c.com/wx/index?sharePage=openingActivity',    // 分享地址/* location.href.split('#')[0] +  */
			            "desc" : '99元即可购买原价499元，31天无限次阅读体验券，海量纯英文绘本借阅',   // 分享描述
			            "title" : '乔希家的书开业特权'   // 分享标题
			        }
			        wx.onMenuShareTimeline (shareData)
			        wx.onMenuShareAppMessage (shareData)
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
			topay(){
				location.href = 'https://payapp.weixin.qq.com/qrpay/order/home2?key=idc_CHNDVI__Bn8ajNZIWPo0MoDgwTlHw--'
			}
		}
	}
</script>

<style>
html, body, #app, .hp100{  height: 100%; min-height: 100%;}
.bgcolor{ background: #faf4e6;}
.mask{ width: 100%; height: 100%; background: rgba(0, 0, 0, 0.55); position: absolute; z-index: 999;}
.mask img{ position: relative; width: 100%; top: 50%; transform: translate(0, -50%);}
</style>