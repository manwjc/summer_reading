<template>
	<div class="relative">
		<div class="mask" v-show="maskShow" @click="hideMask"><img @click.prevent src="../assets/images/toShare.png"></div>
		<img @click.prevent src="static/images/page1_01.jpg">
		<div class="form_list01">
			<div class="scene_list f22 bold" :class="index % 2 === 1 ? 'minuleft20' : 'mleft20'" v-for="(item, index) in nameList">
				<div class="scene_name" v-if="index < nameList.length - 1">{{index+1}}. 小剧场第{{index | numToCh}}幕 SCENE {{index+1}} {{item.length}}</div>
				<div class="scene_name5" v-else>
					{{index+1}}. 小剧场秀(亲子开放日)
					<div>OPEN DAY</div>
				</div>
			</div>
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
							userName: 'jerry',
						},
						{
							userName: 'jerry',
						},
						{
							userName: 'jerry',
						},
						{
							userName: 'jerry',
						},
						{
							userName: 'jerry',
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

<style scope>
html,
body {
  height: 100%;
  min-height: 100%;
}
.form_list01 {
  background: #fcf6e8;
  padding-bottom: 0.15rem; 
}
.scene_list {
  background: url(../assets/images/page1_02.jpg) no-repeat;
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
</style>