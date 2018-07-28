<template>
	<div class="relative">
		<div class="mask" v-show="maskShow" @click="hideMask"><img @click.prevent src="../assets/images/toShare.png"></div>
		<img @click.prevent :src="topImg">
		<div class="form_list01">
			<div class="scene_list f22 bold" @click="redirect(item,index)" :class="[index % 2 === 1 ? 'minuleft20' : 'mleft20',{'gray' : item.isGray},classBg6_8]" v-for="(item, index) in listData">
				<div class="scene_name" v-if="index < nameList.length - 1">{{index+1}}. {{item.name}} SCENE {{index+1}} {{item.length}}</div>
				<div class="scene_name5" v-else>
					{{index+1}}. {{item.name}}
					<div>{{item.englishName}}</div>
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
				topImg : "static/images/page1_01.jpg",
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
				listData: [],
				maskShow: false,
				classBg6_8 : "",
			}
		},
		mounted() {
			let self = this;
			self.getList();
		},
		methods: {
			redirect(item,index){
				let self = this;
				if(item.isGray){
					return;
				}
				if(index === 4){
					self.$router.push({ name: 'sceneLastDay', params: { }});
				}
				else{
					self.$router.push({ name: 'sceneCon', params: { id: item.id }});
				}

			},
			format(time, format){
			    var t = new Date(time);
			    var tf = function(i){return (i < 10 ? '0' : '') + i};
			    return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function(a){
			        switch(a){
			            case 'yyyy':
			                return tf(t.getFullYear());
			                break;
			            case 'MM':
			                return tf(t.getMonth() + 1);
			                break;
			            case 'mm':
			                return tf(t.getMinutes());
			                break;
			            case 'dd':
			                return tf(t.getDate());
			                break;
			            case 'HH':
			                return tf(t.getHours());
			                break;
			            case 'ss':
			                return tf(t.getSeconds());
			                break;
			        }
			    })
			}, 
			getList() {
				let self = this;

				self.$axios.get('/wx/chelApi/getCoursewareList', {
					params: {}
				})
				.then((res)=>{
					if(res.data.code === '0'){
						self.listData = res.data.data;
						let date = new Date();
						date = date.toUTCString();
						let y = self.format(date,"yyyy");
						let m = self.format(date,"MM");
						let d = self.format(date,"dd");
						let h = self.format(date,"HH");
						let min = self.format(date,"mm");
						let s = self.format(date,"ss");
						let currentDate = y + "-" + m + "-" + d + " " + h + ":" + min + ":" + s;
						if(self.listData.length){
							self.topImg = self.listData[0].id === "153215547923659801807438" ? "static/images/page1_01.jpg" : "static/images/page1_02.jpg";
							if(self.listData[0].id === "153215547923659801807438"){
								sessionStorage.setItem("isAge3_5",true);
							}
							else{
								self.classBg6_8 = "bg6_8";
							}
							for(let i=0,len=self.listData.length;i<len;i++){
								self.listData[i].isGray = true;//是否置灰
								if(self.listData[i].beginClassTime <= currentDate ){
									self.listData[i].isGray = false;
								}

							}
						}
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
}
.form_list01 {
  background: #fcf6e8;
  padding-bottom: 0.15rem; 
  overflow:hidden;
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
.scene_list.bg6_8{
	background: url(../assets/images/page2_list_bg2.jpg) no-repeat;
	background-size: 100% 100%;
}
.scene_list.gray{
	opacity:0.5;
}
.scene_name{ margin: 0.4rem 0 0 2.4rem;}
.scene_name5{ margin: 0.3rem 0 0 2.4rem;}
.scene_name5 div{ margin-left: 0.6rem;}
</style>