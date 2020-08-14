//app.js
App({
 
  onLaunch: function () {
    // 展示本地存储能力
    console.log("app is loading");
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息 
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  
  tcData:{
  //wx4258730509d07230  易金刚
 // wx8615109d21a62678  触摸屏
 // 8252cf7c07c7298748826dd0ced4fdd9 小程序秘钥
   // tcPostUrl:"http://localhost:2964/api/TouchCentral/post",
  //  tcPostUrl:"https://106.53.215.5:8080/api/TouchCentral/post",
  // 触摸平板 是http- 8080  不支持https
    tcPostUrl:"https://www.zaihangzhineng.com:7070/api/TouchCentral/post",
    tcPostUrl:"https://www.zaihangzhineng.com:443/api/WisRoom/post",
    currentDeviceIndex:0,
    currentDeviceName:"",
    currentDeviceDID:"",
    currentClassIndex:"",
    currentClassCID:"",
    currentClassName:"",
    UserID:"",
    UserName:"",
    UserPwd:"",
    UserType:"None", 
    CusID:"",
    UserLevel:"-1",
    OperPlatform:"WeiXin",
    deviceArray:[], 
    classRoomList:[],
    sceneArray:[],
    logArray:[],
    customerArray:[],

    san_result_classID:"",
    san_result_className:"",
    san_result_classAddress:"",
  },
 
  globalData: {
    userInfo: null,
    deviceArray:[{
      Id:0,
      DevDID:"00",
      DevType:"Computer",
      DevName: "电脑",
      DevState: false,
    }],
    appId: "wx4258730509d07230",
    secret: "8252cf7c07c7298748826dd0ced4fdd9" 
  }
})
