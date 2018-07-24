<template>
	<div class="relative">
		<div class="mask" v-show="maskShow" @click="hideMask"><img @click.prevent src="../assets/images/toShare.png"></div>
		<img @click.prevent src="static/images/page2_01.jpg">
		<img @click.prevent src="static/images/page2_02.jpg">
		<div class="video_box">
			<!-- <div class="video">
				<video controls="controls" poster="static/images/page2_01.jpg" src="https://pic.ibaotu.com/00/43/09/17T888piCtVf.mp4"></video>
			</div> -->
			<div class="video relative">
				<div class="relative">
					<el-upload
					class="upload-box center"
					ref="upload"
					type="post"
					:action="importFileUrl"
					:limit="1"
					:file-list="fileList"
					:upload-error="uploadError"
					:before-upload="beforeUpload"
					:auto-upload="false">
					<el-button slot="trigger" size="small" type="primary">选取视频</el-button>
					<el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">开始上传</el-button>
					<div slot="tip" class="el-upload__tip">只能上传mp4文件，且不超过100MB</div>
					</el-upload>
					<img @click.prevent src="static/images/page2_01.jpg">

				</div>


				<!-- 你可以得到event对象，然后判断来源，从而只做一次事件处理，但是事件还是触发了两次。一般这种组件都有封装好的自定义事件吧，就是为了不让你使用click.native的，你可以看看文档

我刚刚看了下，它是有一个自定义的change事件的，你直接<el-checkbox @change=”popup”>就行了 -->
			</div>
		</div>
		<img @click.prevent src="static/images/page2_04.jpg">
		<div class="form_list01">
			<div class="scene_list f22 bold mb10" :class="index % 2 === 1 ? 'minuleft20' : 'mleft20'" v-for="(item, index) in nameList">
				<div class="scene_name">{{item.name}}</div>
			</div>
		</div>
		<img @click.prevent src="static/images/page1_04.jpg">
		<!-- <div @click.prevent="showMask"><img @click.prevent src="../assets/images/p_c_06.jpg"></div> -->
	</div>
</template>

<script>
	import Vue from 'vue'
	import Element from 'element-ui'
	import 'element-ui/lib/theme-chalk/index.css'

	Vue.use(Element)
	
	export default {
		data() {
			return {
				nameList: [
						{
							name: '“小剧场”剧本台词',
						},
						{
							name: '“小剧场”剧本录音',
						},
						{
							name: '“小剧场”作业',
						}
					],
				nameData: [],
				maskShow: false,
				importFileUrl: '/wx/chelApi/uploadVideo',
				upLoadData: '153217813843359801501873',
				fileList: [],
			}
		},
		mounted() {
			let self = this;
			//self.getNameList();
			self.$axios.get('/wx/chelApi/getCoursewareList', {
				params: {}
			})
			/* self.$axios.post('/wx/chelApi/uploadVideo', {
				params: {}
			}) */
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
			beforeUpload (file) {
				let self = this;
				let fd = new FormData()

				fd.append('file', file)
				fd.append('coursewareId',self.upLoadData)
				self.$axios.post('/wx/chelApi/uploadVideo', fd, {})
				return false;	//拦截默认提交
			},
			uploadSuccess (file) {
				console.log('上传文件', response,)
			},
			// 上传错误
			uploadError (file) {
				console.log('上传失败，请重试！')
			},
			// 上传前对文件的大小的判断
			beforeAvatarUpload (file) {
				const fileArr = file.name.split('.');
				const fileLength = fileArr.length;
				const extension = fileArr[fileLength - 1] === 'mp4';
				const isLt2M = file.size / 1024 / 1024 < 100;
				if (!extension) {
					console.log('上传文件只能是 mp4 格式!')
				}
				if (!isLt2M) {
					console.log('上传文件大小不能超过 100MB!')
				}
				return extension && isLt2M
			},
			handleRemove(file) {
				console.log(file);
			},
			submitUpload() {
				this.$refs.upload.submit();
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
.video_box {
  background: url(../assets/images/video_bg.jpg) repeat-y;
  background-size: 100% 100%;
  width: 100%;
}
.video{ height: 100%; margin: 0 0.7rem; overflow: hidden;}
.video video{ width: 100%; object-fit: contain;}
.upload_btn{ position: absolute; top: 0; bottom: 0; left: 0; right: 0; opacity: 0;}
.el-upload__tip, .el-upload-list__item-name{ color: #c5744c !important;}
.el-upload-list__item-name{ padding-left: 0.4rem;}

.upload-box{ padding: 0.5rem 0;}
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
.scene_name{ margin: 0.4rem 0 0 2.4rem;}
.scene_name5{ margin: 0.3rem 0 0 2.4rem;}
.scene_name5 div{ margin-left: 0.6rem;}
</style>