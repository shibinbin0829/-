// pages/device_control/device_control.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {

    currentIndex: 0,
    sceneListScrollHeight:0,
    currentClassCID:"",
    currentClassName:"",
    scenesTipCss:"",
    sceneListViewCss:"", 
    switchCss:"wx-switch-input",
    sceneArray:[]
       
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    this.setStartView();
    this.loadScenes();
  },

click_dev_head:function(e){
  console.log("click_dev_head:" +this.data.index);
  // 获得编号
  var id = e.currentTarget.dataset.index;
  console.log("dev id:"+id);
  var devID = this.data.deviceArray[id].DevDID;
  var title= this.data.deviceArray[id].DevName;
  console.log(devID+"  ---dev --- "+title);
},

 //获取场景列表
  getSceneList:function(){
    var that = this;
    wx.request(
      {
          url: app.tcData.tcPostUrl,
          method:"post",
          data:{
             "OperInfo":
               {
                  "OperCmdType":"GetSceneList", 
                  "ClassID":app.tcData.currentClassCID,
                  "OperPlatform":"WeiXin",
               }, 
                  "UserInfo":
                {
                  //"UserID":app.globalData.userInfo.nickName,            
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
          success (res) 
          {
              var data = JSON.stringify(res);        
              if (typeof (res.data) == 'string') {
                var data = JSON.parse(res.data);
                console.log("--sceneList data--:"+res.data);
                app.tcData.sceneArray = data.SceneList,
                that.setData({ 
                     sceneArray:data.SceneList,                
                     sceneListScrollHeight:app.tcData.sceneArray.length *70+100,
              }) ;              
           }       
          },
          fail(res){
            console.log("fail:"+res); 
          }
      })   
  },
  
  loadScenes:function(){

    if(app.tcData.currentClassCID==""){
        return;
    }
    else{
      //设置当前窗口标题
      wx.setNavigationBarTitle({
        title: app.tcData.currentClassName
      })
    }
    this.getSceneList();
  },

  //场景调用
  button_click_scene:function(e){
    var that = this;         
    var id = e.currentTarget.dataset.index;      
    var sceneID = that.data.sceneArray[id].SID;   

    console.log("--sceneID--:"+sceneID);              
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
                "OperCmdType":"CallScene",                
                "OperID":sceneID,             
              }
          },
          header: {
            'content-type' : 'application/json'
          },
          success (res) 
          {
            if(typeof(res.data=='string'))
            {    
              console.log("---success---:"+res.data); 
              var data = JSON.parse(res.data);              
              if(data.Result =="0")
              {
                wx.showToast(
                  {
                    title: '执行成功',
                    icon: 'success',
                    duration: 2000,
                    mask:true,
                  })
              }
              else{
                wx.showToast(
                  {
                    title: '执行失败',
                    image:'../../imgs/error.png',
                    duration: 2000,
                    mask:true,
                  })
              }
            }
          },
          fail(res){
            console.log("--fail--:"+res); 
          }
      })  
  },

  button_update_scene_click:function(){
    this.getSceneList();
   // this.addScene("00"+this.data.sceneArray.length,"场景"+this.data.sceneArray.length);
  },


 setStartView:function(){

    this.setData({
      currentClassCID:app.tcData.currentClassCID
    })
    if(app.tcData.currentClassCID==""){
      this.setData({
        scenesTipCss:"view_scenes_tip_show",
        sceneListViewCss:"view_scenelist_hide",
      })
    }
    else{
      this.setData({
        scenesTipCss:"view_scenes_tip_hide",
        sceneListViewCss:"view_scenelist_show",
    })
    }
  },
  
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (typeof this.getTabBar === 'function' &&
    this.getTabBar()) {
    this.getTabBar().setData({
      selected: 2
    })
  }  
     this.setStartView();
     this.loadScenes();
  },

})