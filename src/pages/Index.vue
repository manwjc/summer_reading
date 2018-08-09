<template>
	<div>
		<img @click.prevent src="../assets/images/p_a_01.jpg">
		<img @click.prevent src="../assets/images/p_a_02.jpg">
		<img @click.prevent src="../assets/images/p_a_03.jpg">
		<img @click.prevent src="static/images/p_a_04_new.jpg" v-if="userData && userData.data && userData.data.utmSource === 'cmb'">
		<img @click.prevent src="../assets/images/p_a_04.jpg" v-else>
		<img @click.prevent src="../assets/images/p_a_05.jpg">
		<div @click.prevent="joinIn"><img src="../assets/images/p_a_06.jpg"></div>
		<img @click.prevent src="../assets/images/p_a_07.jpg">
		<img @click.prevent src="../assets/images/p_a_08.jpg">
	</div>
</template>

<script>
	export default {
		name: 'index',
		data() {
			return {
				userData: null
			}
		},
		mounted() {
			let self = this;
			self.getUserInfo();
		},
		methods: { 
			getUserInfo() {
				let self = this;
				if(self.$store.state.userData !== null){
					self.userData = self.$store.state.userData;
					self.goToRouter(self.userData);
				}else{
					self.$service.getUserInfo((res) => {
						self.userData = res.data;
						self.goToRouter(self.userData);
					}, (error) => {
						self.$showMsg(error)
					})
				}
			},
			goToRouter(userData){
				let self = this;
				if(userData.code === '0'){
					if(userData.data.isBindPhone === true && userData.data.isBuyUser === true){
						self.$router.push({name:"sceneList"})
					}
				}else{
					self.$showMsg(userData.message);
				}
			},
			joinIn() {
				let self = this;
				if(self.userData.code === '0'){
					if(self.userData.data && self.userData.data.isBindPhone === true && self.userData.data.isBuyUser === false){
						self.$router.push({name:"newGay"})
					}else if(self.userData.data && self.userData.data.isBindPhone === false){
						self.$router.push({name:"checkPhone"})
					}
				}else{
					self.$showMsg(self.userData.message);
				}
			},
		}
	}
</script>