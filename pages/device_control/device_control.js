// pages/device_control/device_control.js
const app=getApp()
Page({

  data: {
    currentIndex: 0,
    deviceListScrollHeight:0,
    currentClassName:"",
    currentClassCID:"",
    devicesTipCss:"",
    devListViewCss:"", 
    switchCss:"wx-switch-input",
    deviceArray:[],
    timer:"" 
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setStartView();
    this.loadDevices();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
     
  },

setStartView: function(){

      this.setData({
          currentClassCID:app.tcData.currentClassCID
      })
      if(app.tcData.currentClassCID==""){
          this.setData({
            devicesTipCss:"view_devices_tip_show",
            devListViewCss:"view_devlist_hide",
          })
      }
      else{
          this.setData({
            devicesTipCss:"view_devices_tip_hide",
            devListViewCss:"view_devlist_show",
          })
      }
},
//加载设备
loadDevices: function(){
     if(app.tcData.currentClassCID==""){
         return;
     }
   else{
        wx.setNavigationBarTitle({
           title:app.tcData.currentClassName,
        })
        this.GetDeviceList();     
     }
},
//获取设备
GetDeviceList:function(){
      var that=this;
      wx.request({
        url: app.tcData.tcPostUrl,
        method:'post',
        data:{
            "OperInfo":
                { 
                  "OperCmdType":"GetWisRoomDevList",
                  "ClassID":app.tcData.currentClassCID, 
                }, 
            "UserInfo":
                {
                //  "UserID":app.globalData.userInfo.nickName,                 
                 "UserID":app.tcData.UserID,       
                 "UserPwd":app.tcData.UserPwd,
                 "UserName":app.tcData.UserName,
                 "UserType":app.tcData.UserType,
                 "CusID":app.tcData.CusID
                }     
        },
        header: {
          'content-type' : 'application/json'
        },
          success(res){              
               if(typeof(res.data)=='string'){
                  var data=JSON.parse(res.data);
                  console.log("--recv data--:"+res.data);
                   app.tcData.deviceArray=data.DevList,
                   that.setData({
                      deviceArray:data.DevList,
                      deviceListScrollHeight:data.DevList.length*70+100,
                   })                  
               }
          },
         fail(res){
           console.log("fail:"+res)
         }                 
      })
},


  onShow: function () {
    if (typeof this.getTabBar === 'function' &&
    this.getTabBar()) {
    this.getTabBar().setData({
      selected: 1
    })
  }   
     this.setStartView();
     this.loadDevices();
     this.checkDeviceStatus();
  },
//开
device_control_open:function(e){
     var that=this;
     var id=e.currentTarget.dataset.index;
     var DevID=that.data.deviceArray[id].DID;    
     console.log("--did--"+DevID);
     wx.request({
       url: app.tcData.tcPostUrl,
       method:"post",
       data:{
         
        "UserInfo":{
         // "UserID":app.globalData.userInfo.nickName,               
         "UserID":app.tcData.UserID,       
         "UserPwd":app.tcData.UserPwd,
         "UserName":app.tcData.UserName,
         "UserType":app.tcData.UserType,
         "CusID":app.tcData.CusID
        },
          "OperInfo":
             {
              "OperCmdType":"OpenDevice",
              "OperID":DevID,
             }      
       },     
       header:{
        'content-type' : 'application/json'
       },
      success(res){   
        var data=JSON.parse(res.data);      
        console.log("---control data---:"+res.data);
         if(data.Result=="0"){
          wx.showToast({
            title: '执行成功',
            icon: 'success',
            duration: 2000,
            mask:true,
          })    
         }
         else{
          wx.showToast({
            title: '执行失败',
            image:'../../imgs/error.png',
            duration: 2000,
            mask:true,
          })    
         }
      },
      fail(res){
        console.log("----fail----"+res);
      }
     })
},
//关
device_control_close:function(e){
      var that=this;
      var id=e.currentTarget.dataset.index;
      var DevID=that.data.deviceArray[id].DID;
      console.log("--did--"+DevID)
      wx.request({
        url: app.tcData.tcPostUrl,
        method:'post',
        data:{
          "OperInfo":
          {
           "OperCmdType":"CloseDevice",
           "OperID":DevID,
          },
         "UserInfo":{
          // "UserID":app.globalData.userInfo.nickName,      
          // "UserType":app.tcData.UserType,
          // "CusID":app.tcData.CusID
          "UserID":app.tcData.UserID,       
          "UserPwd":app.tcData.UserPwd,
          "UserName":app.tcData.UserName,
          "UserType":app.tcData.UserType,
          "CusID":app.tcData.CusID
         }
        },
        success(res){     
          var data=JSON.parse(res.data);
          console.log("---control data---:"+res.data);
           if(data.Result=="0"){
            wx.showToast({
              title: '执行成功',
              icon: 'success',
              duration: 2000,
              mask:true,
            })    
           }
           else{
            wx.showToast({
              title: '执行失败',
              image:'../../imgs/error.png',
              duration: 2000,
              mask:true,
            })    
           }         
        },
        fail(res){
          console.log("--fail--"+res);
        }
      })
},
//检测设备状态
checkDeviceStatus:function()
{
       var that=this;
       that.setData({
          timer: setInterval(function(){
            wx.request({
              url: app.tcData.tcPostUrl,
              method:'post',
              data:{
                  "OperInfo":
                      { 
                        "OperCmdType":"GetWisRoomDevList",
                        "ClassID":app.tcData.currentClassCID, 
                      }, 
                  "UserInfo":
                      {
                        "UserID":app.globalData.userInfo.nickName,              
                        "UserType":"WeiXin",
                        "CusID":app.tcData.CusID
                      }    
              },
              header:{
                'content-type' : 'application/json'
              },
               success(res){
                if(typeof(res.data)=='string'){
                  var data=JSON.parse(res.data);
               //   console.log("--recv data--:"+res.data);
                   app.tcData.deviceArray=data.DevList,
                   that.setData({ 
                      deviceArray:data.DevList,
                      deviceListScrollHeight:data.DevList.length*70+100,
                   })                  
               }
               },
               fail(res){
                console.log("fail:"+res)
              }      
            })
         },2000)
       })   
},

onUnload:function(){
  let timer = this.data.timer;
  console.log("onUnload-----------------");
  clearInterval(timer);
  
},
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
      
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },
})