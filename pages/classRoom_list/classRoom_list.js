// pages/device_control/device_control.js
const app=getApp()
Page({
  data: {
    timer:"",
    scrollHeight:1000,
    index:0, 
    UserName:'', 
    classRoomList: [],      
    paddingTopNum:wx.getSystemInfoSync().statusBarHeight+30
  },

  onLoad:function(){
      this.LoadClassList();
  },

  onShow: function () {
    if (typeof this.getTabBar === 'function' &&
    this.getTabBar()) {
    this.getTabBar().setData({
      selected: 0
    })
  }
     var that=this;
     that.setData({
       timer:setInterval(function(){
           console.log("on show get classRoomList");
            wx.request({
              url: app.tcData.tcPostUrl,
              method:'post',
              data:{
                 "OperInfo":
                 {
                    "OperCmdType":"GetWisRoomList",
                 }, 
                 "UserInfo":
                  {
                  // "UserID":app.globalData.userInfo.nickName,         
                 "UserID":app.tcData.UserID,       
                 "UserPwd":app.tcData.UserPwd,
                 "UserName":app.tcData.UserName,
                 "UserType":app.tcData.UserType,
                 "CusID":app.tcData.CusID
                  }           
              },
               header:{
                'content-type' : 'application/json'
               },
               success(res){
                  if(typeof(res.data=='string')){
                       var data=JSON.parse(res.data);
                     // console.log("-aa--recv data---:"+res.data);
                       app.tcData.classRoomList=data.ClassRoomList,
                       that.setData({
                          classRoomList:data.ClassRoomList,
                          scrollHeight:data.ClassRoomList.length*120+100,
                       })
                  }
               }
            })
       },2000)
     })
  },

  //加载教室列表
LoadClassList:function(){
  var that=this; 
         wx.request({
           url: app.tcData.tcPostUrl,
           method:'post',
           data:{
              "OperInfo":
              {
                 "OperCmdType":"GetWisRoomList",
              }, 
              "UserInfo":
               {
                // "UserID":app.globalData.userInfo.nickName,       
                 "UserID":app.tcData.UserID,       
                 "UserPwd":app.tcData.UserPwd,
                 "UserName":app.tcData.UserName,
                 "UserType":app.tcData.UserType,
                 "CusID":app.tcData.CusID
               }           
           },
            header:{
             'content-type' : 'application/json'
            },
            success(res){
               if(typeof(res.data)=='string'){
                    var data=JSON.parse(res.data);
                    console.log("-aa--recv data---:"+res.data);
                    app.tcData.classRoomList=data.ClassRoomList,
                    that.setData({
                       classRoomList:data.ClassRoomList,
                       scollHeight:data.length*120+100,
                    })
               }
            }
         })
},

click_class_head:function(e){
    var id=e.currentTarget.dataset.index;
  //   if(this.data.classRoomList[id].Online==false)
  //  {
  //      wx.showToast({
  //        title: '设备离线',
  //        icon: 'fail',
  //        image:'../../imgs/error.png',
  //        duration: 2000,
  //        mask:true,
  //      })
  //  }
  //  else{
       app.tcData.currentClassIndex=id;
       app.tcData.currentClassCID=this.data.classRoomList[id].CID,
       app.tcData.currentClassName=this.data.classRoomList[id].Name;
       console.log("--currentClassCID:"+app.tcData.currentClassCID);
       wx.switchTab({
        url: '../device_control/device_control',
       })
   // }
},
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    let timer = this.data.timer;
    console.log("onUnload-----------------");
    clearInterval(timer);
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
       
  },
  
})