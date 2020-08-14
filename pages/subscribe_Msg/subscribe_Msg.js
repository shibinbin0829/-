// pages/subscribe_Msg/subscribe_Msg.js
const app=getApp()
Page({

  data: {

       

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      
  },

  //用户申请通知订阅
  subscribe_msg_reg:function(){
     wx.requestSubscribeMessage({
        tmplIds: [''],
        success:(res)=>{
          if(res['']=='accept'){
             console.log("已授权接收订阅消息："+res)
          }
          else{
            wx.showToast({
              title: '已拒绝授权',
              image:'../../imgs/error.png',
              duration:2000,
              mask:true
            })
          }
        }
     })
  },

   //设备告警通知订阅
  subscribe_msg_dev:function(){
    wx.requestSubscribeMessage({
      tmplIds: [''],
       success:(res)=>{
         if(res['']=='accept'){
             console.log("已授权接收订阅消息："+res)
         }
         else{
           wx.showToast({
             title: '已拒绝授权',
             image:'../../imgs/error.png',
           })
         }
       }
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
      
  }

})