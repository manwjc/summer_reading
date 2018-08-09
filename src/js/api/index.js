    
export default {
    //获取微信签名信息
    getWechatSign: '/wx/wechat/portal/getWechatSign',
    //获取用户信息
    getUserInfo: '/wx/wxApi/getUserInfo',
    //绑定手机号
    bindMobile: '/wx/wxApi/bindMobile',
    //发送验证码
    sendValidateCode: '/wx/wxApi/sendValidateCode',
    //判断当前阅读馆当前期数是否已满额
    getTermNum: '/wx/wxApi/getTermNum',
    //获取已报名用户
    recommendSignUp: '/wx/wxApi/recommendSignUp',
    //获取期数
    getTermNumList: '/wx/chelApi/getTermNumList',
    //获取阅读馆
    getReadRoomList: '/wx/chelApi/getReadRoomList',
    //获取课程列表
    getCoursewareList: '/wx/chelApi/getCoursewareList',
    //上传视频
    uploadVideo: '/wx/chelApi/uploadVideo',
    //获取精彩花絮数据
    getReadRoomGradeVideo: '/wx/chelApi/getReadRoomGradeVideo',
    //获取用户上传视频
    getUserVideo: '/wx/chelApi/getUserVideo',
}