
  const app = getApp()
Page({
  data:{

    imgUrls:[
      '../../imgs/cuanbo.png',
      '../../imgs/logo0.png',
      '../../imgs/logo1.png',
      '../../imgs/logo2.png'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 1000,
    
    admin_login_css_show:"view_hide",
    scan_code_css_show:"",

    schname:"",
    userid: '',
    userpwd: '',
    
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),

    select:false,
    CusName:"请选择平台",
    CusID:"",
    CustomerArray:[],   
  }, 

    onLoad: function (options) {
      this.setData({
        userid:app.tcData.UserID,
        userpwd:app.tcData.UserPwd
      })
      this.getCustomerList();
    },  
    
    bindShowMsg() {
      this.setData({
          select:!this.data.select
      })
    },
     //选择用户平台
  mySelect(e) {
    var id=e.currentTarget.dataset.index;
    var name=this.data.CustomerArray[id].CusName;
    var cusID=this.data.CustomerArray[id].CusID;
   console.log("--name--cusid--:"+name+cusID);
    this.setData({
        CusName: name,
        CusID: cusID,
        select: false
    })
    console.log("CusName--CusID---:"+this.data.CusName+this.data.CusID);
 },
 
  //入口切换
 btn_show_admin:function(){
     if(this.data.admin_login_css_show == ""){
        this.setData({
          admin_login_css_show:"view_hide",
          scan_code_css_show:"",
        })
      }
      else{
        this.setData({
          admin_login_css_show:"",
          scan_code_css_show:"view_hide",
        })
      }
     
    },

   //获取用户平台信息
  getCustomerList:function(){
    var that=this;
    wx.request({
      url: app.tcData.tcPostUrl,
      method:"post",
      data:{       
           "OperInfo":{
              "OperCmdType":"GetPlatformCusInfo", 
           },
      },
       header:{
          'content-type' : 'application/json'
       },
       success(res){     
          if(typeof(res.data)=='string')
          { 
              var data=JSON.parse(res.data);
              console.log("--customerList---:"+res.data);
              app.tcData.customerArray=data.CustomerList,
              that.setData({
                CustomerArray:data.CustomerList,             
              })
          }
       },
       fail(res){
          console.log("--fail--:"+res);
       }
    })
  },

    click_scan:function(e){ 
       this.getUserInfo(e);
    },
   // 获取输入账号 
   useridInput: function (e) {
    this.setData({
      userid: e.detail.value
    })
  },
    // 获取输入密码 
    passwordInput: function (e) {
      this.setData({
        userpwd: e.detail.value
      })
    },

    //管理员登录
  loginFun: function(e)
  {  
      var that = this;
      app.tcData.UserID= that.data.userid;
      app.tcData.UserPwd = that.data.userpwd;
      app.tcData.CusID = that.data.CusID;
      console.log("----loginFun-----:"+app.tcData.UserID+app.tcData.UserPwd+app.tcData.CusID);
      console.log("----nickname-----:"+app.globalData.userInfo.nickName);
       if(app.tcData.UserID == ""){
        wx.showToast(
          {
            title: '请输入账号',
            icon: 'fail',
            image:'../../imgs/warn.png',
            duration: 2000,
            mask:true
          })
         return;
       }
       if(app.tcData.UserPwd == ""){
        wx.showToast(
          {
            title: '请输入密码',
            icon: 'fail',
            image:'../../imgs/warn.png',
            duration: 2000,
            mask:true
          })
        return;
       }
       if(app.tcData.CusID == "请选择平台"){
        wx.showToast(
          {
            title: '请选择平台',
            icon: 'fail',
            image:'../../imgs/warn.png',
            duration: 2000,
            mask:true
          })
         return;
       }      
      wx.request(
        {  
            url: app.tcData.tcPostUrl,
            method:"post",
            data:{ 
                 "UserInfo":
                  {
                    "UserID":that.data.userid,
                    "UserPwd":that.data.userpwd,        
                    "UserType":"Normal",  
                    "CusID":that.data.CusID,
                  },
                 "OperInfo":
                  {
                    "OperCmdType":"UserLogin",
                    "OperPlatform":"WeiXin",
                    "OperObjectType":"LoginSystem",
                  }, 
            },
            header: {
              'content-type' : 'application/json'
            },
            success (res) 
            {
              if (typeof (res.data) == 'string')
              { 
                    var data = JSON.parse(res.data);                
                    console.log("-----adminlogin-------data:"+res.data);
                    app.tcData.UserName = data.UserInfo.UserName;
                    app.tcData.UserPwd=data.UserInfo.UserPwd;
                    app.tcData.UserLevel = data.UserInfo.UserLevel;
                    app.tcData.UserID = data.UserInfo.UserID;
                    app.tcData.UserType = data.UserInfo.UserType;    
                    app.tcData.CusID = data.UserInfo.CusID;
                if(data.Result =="0")
                { 
                    wx.showToast(
                      {
                        title: '验证成功',
                        icon: 'success',
                        duration: 2000,
                        mask:true,
                        success:function() 
                          {
                              setTimeout(() => 
                              {
                                wx.switchTab({
                                  url: '../classRoom_list/classRoom_list',
                                })
                              }, 2000); 
                         }
                      })
                  } 
                  else if(data.Result=="-2"){
                    wx.showToast(
                      {
                        title: '用户不存在',
                        icon: 'fail',
                        image:'../../imgs/error.png',
                        duration: 2000,
                        mask:true
                      })
                  }
                  else if(data.Result=="-3"){
                    wx.showToast(
                      {
                        title: '密码不正确',
                        icon: 'fail',
                        image:'../../imgs/error.png',
                        duration: 2000,
                        mask:true
                      })
                  }
                  else if(data.Result=="-4"){
                    wx.showToast(
                      {
                        title: '用户被禁用',
                        icon: 'fail',
                        image:'../../imgs/disable.png',
                        duration: 2000,
                        mask:true
                      })
                  }
                  else if(data.Result=="-5"){
                    wx.showToast(
                      {
                        title: '登陆异常',
                        icon: 'fail',
                        image:'../../imgs/yichang.png',
                        duration: 2000,
                        mask:true
                      })
                  }
              } 
            },
           
            fail(res){
              console.log("fail:"+res);       
              wx.showToast(
                {
                  title: '登陆失败',
                  icon: 'fail',
                  image:'../../imgs/error.png',
                  duration: 2000,
                  mask:true
                })                 
            }

        })
     },
 

    getUserInfo: function(e) {
      
      app.globalData.userInfo = e.detail.userInfo;
   //   console.log("---userinfo---:"+e.detail.userInfo.openId)
      this.setData({ 
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      })
      
      console.log("11111:"+app.globalData.userInfo.nickName)
      wx.navigateTo({
        url: '../login_wx/login_wx'
        },2000)
    },
  
})