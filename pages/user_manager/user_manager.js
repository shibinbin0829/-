// pages/user_manager/user_manager.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: { 
    RegListScrollHeight:600,     
    devicesTipCss:"",
    devListViewCss:"", 
     switchCss:"wx-switch-input",
     RegUserArray:[],  
     timerout:"", 
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.getUserMsgList();
  },
  //允许注册
  click_allow_reg:function(e){
    var that=this;
    var uid = e.currentTarget.dataset.tag;
    console.log("id:"+uid)
    that.setUserState(uid,"1","0");
    that.setData({
      timerout:setTimeout(function(){
        wx.request(
          {     
              url: app.tcData.tcPostUrl,
              method:"post",
              data:{
                  "UserInfo":
                      {
                        "UserID":app.tcData.UserID,       
                        "UserPwd":app.tcData.UserPwd,
                        "UserName":app.tcData.UserName,
                        "UserType":app.tcData.UserType,
                        "CusID":app.tcData.CusID
                      },
                      "OperInfo":
                      {
                        "OperCmdType":"GetNeedManagerUserInfo",
                        "OperPlatform":"WeiXin",
                      }
              },
              header: {
                'content-type' : 'application/json'
              },
              success (res) 
              {                      
                  if (typeof (res.data) == 'string') {
                  var model = JSON.parse(res.data);
                  console.log("---recv data---:"+res.data);                   
                  that.setData({ 
                      RegUserArray:model.RegUserList,                 
                      RegListScrollHeight:model.RegUserList.length *80+100,
                     })                      
                 if(model.Result=="0"){
                     wx.showToast({
                     title: '暂无用户申请',
                     image:'../../imgs/msg.png',
                     duration:2000
                    })
                  }
                 else if(model.Result=="-1")
                  {
                   wx.showToast({
                    title: '用户请求失败',
                    image:'../../imgs/error.png',
                    duration:2000
                   })
                 }       
               }             
              },
              fail(res){
                console.log("fail:"+res); 
              }     
          })
      },2000)
   })   
  },
  //忽略注册
  click_un_allow_reg:function(e){
    var that=this;
    var uid = e.currentTarget.dataset.tag;
    that.setUserState(uid,"0","-2");
    that.setData({
      timerout:setTimeout(function(){
        wx.request(
          {     
              url: app.tcData.tcPostUrl,
              method:"post",
              data:{
                  "UserInfo":
                      {
                        "UserID":app.tcData.UserID,       
                        "UserPwd":app.tcData.UserPwd,
                        "UserName":app.tcData.UserName,
                        "UserType":app.tcData.UserType,
                        "CusID":app.tcData.CusID
                      },
                      "OperInfo":
                      {
                        "OperCmdType":"GetNeedManagerUserInfo",
                        "OperPlatform":"WeiXin",
                      }
              },
              header: {
                'content-type' : 'application/json'
              },
              success (res) 
              {                      
                  if (typeof (res.data) == 'string') {
                  var model = JSON.parse(res.data);
                  console.log("---recv data---:"+res.data);                   
                  that.setData({ 
                      RegUserArray:model.RegUserList,                 
                      RegListScrollHeight:model.RegUserList.length *80+100,
                     })                      
                 if(model.Result=="0"){
                     wx.showToast({
                     title: '暂无用户申请',
                     image:'../../imgs/msg.png',
                     duration:2000
                    })
                  }
                 else if(model.Result=="-1")
                  {
                   wx.showToast({
                    title: '用户请求失败',
                    image:'../../imgs/error.png',
                    duration:2000
                   })
                 }       
               }             
              },
              fail(res){
                console.log("fail:"+res); 
              }     
          })
      },2000)
   })   
  },
  //设备管理员
  click_set_admin:function(e){
    var that=this;
    var uid = e.currentTarget.dataset.tag;     
    that.setUserState(uid,"0","0");
    that.setData({
      timerout:setTimeout(function(){
        wx.request(
          {     
              url: app.tcData.tcPostUrl,
              method:"post",
              data:{
                  "UserInfo":
                      {
                        "UserID":app.tcData.UserID,       
                        "UserPwd":app.tcData.UserPwd,
                        "UserName":app.tcData.UserName,
                        "UserType":app.tcData.UserType,
                        "CusID":app.tcData.CusID
                      },
                      "OperInfo":
                      {
                        "OperCmdType":"GetNeedManagerUserInfo",
                        "OperPlatform":"WeiXin",
                      }
              },
              header: {
                'content-type' : 'application/json'
              },
              success (res) 
              {                      
                  if (typeof (res.data) == 'string') {
                  var model = JSON.parse(res.data);
                  console.log("---recv data---:"+res.data);                   
                  that.setData({ 
                      RegUserArray:model.RegUserList,                 
                      RegListScrollHeight:model.RegUserList.length *80+100,
                     })                      
                 if(model.Result=="0"){
                     wx.showToast({
                     title: '暂无用户申请',
                     image:'../../imgs/msg.png',
                     duration:2000
                    })
                  }
                 else if(model.Result=="-1")
                  {
                   wx.showToast({
                    title: '用户请求失败',
                    image:'../../imgs/error.png',
                    duration:2000
                   })
                 }       
               }
              
              },
              fail(res){
                console.log("fail:"+res); 
              }     
          })
      },3000)
   })   
    
  },
  //操作
  setUserState:function(uid,level,state){
    var that = this;
    wx.request(
      {     
          url: app.tcData.tcPostUrl,
          method:"post",
          data:{
              "UserInfo":
                  {
                    "UserID":app.tcData.UserID,       
                    "UserPwd":app.tcData.UserPwd,
                    "UserName":app.tcData.UserName,
                    "UserType":app.tcData.UserType,
                    "CusID":app.tcData.CusID
                  },
                  "RegisterUser":
                  {
                    "UserID":uid,
                    "UserLevel":level,
                    "UserState":state,
                  },
                  "OperInfo":
                  {
                    "OperCmdType":"ManagerUser",
                    "OperPlatform":"WeiXin",
                  }
          },
          header: {
            'content-type' : 'application/json'
          },
          success (res) 
          {                    
              if (typeof (res.data) == 'string') {
                var model = JSON.parse(res.data);
                console.log("recv data:"+res.data); 
                if(model.Result=="0")
                {
                   wx.showToast({
                    title: '操作成功',
                    icon: 'success',
                    duration:2000,
                    mask:true                                    
                })             
              }
              else if(model.Result=="-1")             
              {
                wx.showToast({
                  title: '操作失败',
                  image:'../../imgs/error.png',
                  duration:2000,
                  mask:true
                 })
              }
           }          
          },
          fail(res){
            console.log("fail:"+res); 
          }

      })
   
  },
 //获取申请列表
  getUserMsgList:function(){
    var that = this;
    wx.request(
      {     
          url: app.tcData.tcPostUrl,
          method:"post",
          data:{
              "UserInfo":
                  {
                    // "UserID":app.globalData.userInfo.nickName,                  
                    // "UserLevel":app.tcData.UserLevel,
                    // "CusID":app.tcData.CusID
                    "UserID":app.tcData.UserID,       
                    "UserPwd":app.tcData.UserPwd,
                    "UserName":app.tcData.UserName,
                    "UserType":app.tcData.UserType,
                    "CusID":app.tcData.CusID
                  },
                  "OperInfo":
                  {
                    "OperCmdType":"GetNeedManagerUserInfo",
                    "OperPlatform":"WeiXin",
                  }
          },
          header: {
            'content-type' : 'application/json'
          },
          success (res) 
          {                      
              if (typeof (res.data) == 'string') {
              var model = JSON.parse(res.data);
              console.log("---recv data---:"+res.data);                   
              that.setData({ 
                  RegUserArray:model.RegUserList,                 
                  RegListScrollHeight:model.RegUserList.length *80+100,
                 }) 
               
             if(model.Result=="0"){
                 wx.showToast({
                 title: '暂无用户申请',
                 image:'../../imgs/msg.png',
                 duration:2000
                })
              }
             else if(model.Result=="-1")
              {
               wx.showToast({
                title: '用户请求失败',
                image:'../../imgs/error.png',
                duration:2000
               })
             }       
           }
          
          },
          fail(res){
            console.log("fail:"+res); 
          }

      })
   
  },
   
 

})