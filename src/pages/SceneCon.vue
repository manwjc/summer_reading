<template>
	<div class="relative">
		<img @click.prevent src="static/images/page2_01.jpg">
		<img @click.prevent src="static/images/page2_02.jpg">
		<div class="video_box">
			<div v-show="!uploadVideo" class="video relative demo-upload">
				<div class="relative">
					<el-upload
					class="upload-box center"
					ref="upload"
					type="post"
					action=""
					:limit="1"
					:file-list="fileList"
					:upload-error="uploadError"
					:before-upload="beforeUpload"
					:on-success="uploadSuccess" 
					:auto-upload="false">
					<el-button class="select-file"  slot="trigger" size="small" type="primary"></el-button>
					<div slot="tip" class="el-upload__tip">只能上传mp4文件，且不超过100MB</div>
					</el-upload>
					<el-button class="up-button" size="small" type="success" @click="submitUpload">开始上传</el-button>
					<!--<img @click.prevent src="static/images/page2_01.jpg">-->
				</div>
				<!-- 你可以得到event对象，然后判断来源，从而只做一次事件处理，但是事件还是触发了两次。一般这种组件都有封装好的自定义事件吧，就是为了不让你使用click.native的，你可以看看文档
我刚刚看了下，它是有一个自定义的change事件的，你直接<el-checkbox @change=”popup”>就行了 -->
			</div>
			<div v-show="uploadVideo" class="video" >
				<video id="video" controls="controls" poster="static/images/black_bg.png" :src="uploadVideo"></video>
			</div>
		</div>
		<img @click.prevent src="static/images/page2_04.jpg">
		<div class="form_list01">
			<div @click="redirect(item)" class="scene_list f22 bold mb10" :class="[index % 2 === 1 ? 'minuleft20' : 'mleft20',classBg6_8]" v-for="(item, index) in listData">
				<div class="scene_name">{{item.name}}</div>
			</div>
		</div>
		<audio id="audio" ></audio>
		<img @click.prevent src="static/images/page1_04.jpg">
	</div>
</template>

<script>
	import Vue from 'vue'
	import constant from '@/js/common/constant'
	import Element from 'element-ui'
	import 'element-ui/lib/theme-chalk/index.css'
	
	import shareImg from '@/assets/images/share_img.jpg'
	import wx from 'weixin-js-sdk'
	import mixin from '@/js/common/wxshare_mixin'

	Vue.use(Element)
	
	export default {
		data() {
			return {
				listData: [
						{
							name: '“小剧场”剧本台词',
							url : "",
						},
						{
							name: '“小剧场”剧本录音',
							url : "",
						},
						{
							name: '“小剧场”作业',
							url : "",
						}
					],
				maskShow: false,
				upLoadData: '',
				fileList: [],
				uploadVideo : null,
				userData: null,
				mp3Url : "",
				classBg6_8 : "",
				shareImg: constant.chelchost + "/wx/" + shareImg

			}
		},
		mounted() {
			console.log('get to scene')
			let self = this;
			let id = this.$route.params.id;
			let isAge3_5 = sessionStorage.getItem("isAge3_5");//是否是3-5岁
			if(isAge3_5 !== "true"){
				self.classBg6_8 = "bg6_8";
			}

			self.getUserInfo();
			self.$service.getCoursewareList((res) => {
				if(res.data.code === '0'){
					for(let i=0,len=res.data.data.length;i<len;i++){
						if(res.data.data[i].id === id){
							let matchData = res.data.data[i];
							if(matchData){
								self.uploadVideo = matchData.uploadVideo;
								self.upLoadData = matchData.id;
								self.listData[2].url = constant.chelchost + matchData.homeworkUrl;
								for(let i=0,len=matchData.coursewareUrlList.length;i<len;i++){
									if(matchData.coursewareUrlList[i].coursewareUrl.substr(-4,4) === ".mp3" ){
										self.listData[1].url = matchData.coursewareUrlList[i].coursewareUrl;
									}
									else if(matchData.coursewareUrlList[i].coursewareUrl.substr(-4,4) === ".pdf"){
										self.listData[0].url = matchData.coursewareUrlList[i].coursewareUrl;
									}
								}
							}
						}
					}

					

				}
			}, (error) => {
				alert(error)
			})
		},
		mixins: [mixin],
		methods: { 
			redirect(item){
				let self = this;
				location.href = item.url;
			},
			beforeUpload (file) {
				let self = this;
				let fd = new FormData()

				if(!self.beforeAvatarUpload(file)){
					return false;
				}

				this.$showMsg('上传中，请稍候…');

				fd.append('file', file)
				fd.append('coursewareId',self.upLoadData)
				self.$service.uploadVideo(fd, (res) => {
					// alert(JSON.stringify(res))
			        let data = res.data;

			        if(data.code === '0'){
			        	let host = constant.chelchost;
			            self.uploadVideo =host + data.data.APPENDIX_URL;
						this.$showMsg('文件上传成功');
			        }else{
						let message = data.message || '上传失败!';
						this.$showMsg(message)
					}
			    }, (error) => {
			        console.error(error)
			    })
				return false;	//拦截默认提交
			},
			uploadSuccess (file) {
				alert('上传文件成功！')
			},
			// 上传错误
			uploadError (file) {
				alert('上传失败，请重试！')
			},
			// 上传前对文件的大小的判断
			beforeAvatarUpload (file) {
				const fileArr = file.name.split('.');
				const fileLength = fileArr.length;
				const extension = fileArr[fileLength - 1] === 'mp4' || file.name.indexOf('mov') > -1;
				const isLt2M = file.size / 1024 / 1024 < 100;
				// if (!extension) {
				// 	this.$showMsg('上传文件只能是 mp4/mov 格式!')
				// }
				if (!isLt2M) {
					this.$showMsg('上传文件大小不能超过 100MB!')
				}
				return isLt2M
			},
			submitUpload() {
				this.$refs.upload.submit();
			},
			setShareData() {
				let self = this;
            	let openId = self.userData.data && self.userData.data !== null ? self.userData.data.openId : '';
				wx.ready (function () {
			        // 微信分享的数据
			        var shareData = {
			            "imgUrl" : self.shareImg,    // 分享显示的缩略图地址
			            "link" : constant.chelchost + '/wx/index?id=' + self.$route.params.id + '&shareFrom=' + openId,    // 分享地址
			            "desc" : '原价699元，新生99元报名',   // 分享描述
			            "title" : '暑假英文阅读戏剧表演营'   // 分享标题
			        }
			        wx.onMenuShareTimeline (shareData)
			        wx.onMenuShareAppMessage (shareData)
			    })
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
.video_box {
  background: url(../assets/images/video_bg.jpg) repeat-y;
  background-size: 100% 100%;
  width: 100%;
}
.video{ height: 100%; margin: 0 0.7rem; overflow: hidden;}
.video video{ width: 100%; object-fit: fill;}
.upload_btn{ position: absolute; top: 0; bottom: 0; left: 0; right: 0; opacity: 0;}
.el-upload__tip, a.el-upload-list__item-name{ color: #c5744c !important;}
.el-upload-list__item-name{ padding-left: 0.4rem;}
.up-button{ position: relative; width: 2rem; left: 50%; transform:translate(-50%, 0);}
.upload-box{ padding: 0.5rem 0 0.2rem;}
/* .el-upload input{display: none} */

.scene_list {
  background: url(../assets/images/page2_list_bg.jpg) no-repeat;
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
.scene_name{ margin: 0.4rem 0 0 2.4rem;}
.scene_name5{ margin: 0.3rem 0 0 2.4rem;}
.scene_name5 div{ margin-left: 0.6rem;}
.select-file,.select-file:hover{
	background: url(../assets/images/btn-upload.jpg) no-repeat;
	width:4.82rem;
	height:2.45rem;
	background-size:100% 100%;
	border:none;
}

</style>