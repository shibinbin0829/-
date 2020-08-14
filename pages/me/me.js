// pages/me/me.js

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    UserName:"NULL",
    UserLevel:"0",
    UserID:"NULL",
  },
   
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   // template.tabbar("tabBar", 3, this)
  
    this.setData({
    
      UserName: app.tcData.UserName,
      UserID: app.tcData.UserID,
      UserLevel:app.tcData.UserLevel,
    })
  },
 onShow:function(){
  if (typeof this.getTabBar === 'function' &&
  this.getTabBar()) {
  this.getTabBar().setData({
    selected: 3
  })
}    
 },
  click_user_msg:function(){
    console.log("用户消息");
    wx.navigateTo(
      {
         url: '../user_msg/user_msg'
      })
  },

  click_user_manager:function(){
    console.log("用户管理");
    if(app.tcData.UserLevel !="0"){
      wx.showToast(
        {
          title: '权限不足',
          image:'../../imgs/disable.png',
          mask:true,
          duration: 2000
        })  
        return;
    }
    wx.navigateTo(
      {
         url: '../user_manager/user_manager'
      })
  },
  click_manager_dev:function(){
    console.log("设备绑定");
    wx.navigateTo(
      {
         url: '../device_manager/device_manager?flag=bind'
      })
  },
  
  click_log_center:function(){
      wx.navigateTo({
        url: '../device_log/device_log',
      })
       
  },
  click_classroom_repair:function(){
       wx.navigateTo({
         url: '../classroom_repair/classroom_repair',
       })  
  },
  click_subscribe:function(){
       wx.navigateTo({
         url: '../subscribe_Msg/subscribe_Msg',
       }) 
  }

})
