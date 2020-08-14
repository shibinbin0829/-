// pages/device_add/device_add.js


const app = getApp()




Page({

  /**
   * 页面的初始数据
   */
  data: {
    UserID:"",
    UserName:"",
    DevID:"",
    DevName:"",
    DevAddress:"",


    CSS_UserID:"display:none",
    CSS_UserName:"display:none",
    CSS_DevID:"display:none",
    CSS_DevName:"display:none",
    CSS_DevAddress:"display:none",

    CSS_Btn_Bind:"display:none",
    CSS_Btn_Add:"display:none",
    CSS_Btn_Edit:"display:none", 
    CSS_Btn_Un_Bind:"display:none",

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    console.log("options:"+options.flag);

    if(options.flag == "bind"){
      this.setData({
        UserID:app.tcData.UserID,
        DevID:"",  

        CSS_UserID:"", 
        CSS_DevID:"",  

        CSS_Btn_Bind:"",
      })
    }
    else if(options.flag == "edit"){
             
    }
    else if(options.flag == "delete"){

    }
    else if(options.flag == "add"){

    } 
  },

  usernameInput:function(e){
     
    this.setData({
      UserName : e.detail.value
    })
  },
  useridInput: function (e) {
     
    this.setData({
      UserID : e.detail.value
    })
  },

  devnameInput:function(e){
 
    this.setData({
      DevName : e.detail.value
    })
  },
  devidInput: function (e) { 
    this.setData({
      DevID : e.detail.value
    })
  },
 devaddressInput: function (e) {
 
    this.setData({
      DevAddress : e.detail.value
    })
  },
  click_device_bind:function(){
    console.log("绑定设备");
   var uid = this.data.UserID;
   var devID = this.data.DevID;
  console.log("uid:"+uid);
  console.log("devID:"+devID);

    wx.request(
      {
         // 用户登录
          url: app.tcData.tcPostUrl,
          method:"post",
          data:{ 
               "UserInfo":
                {
                  "UserID":app.tcData.UserID,
                  "UserPwd":app.tcData.UserPwd,
                  "UserType":app.tcData.UserType,
                },
               "OperInfo":
                {
                  "OperCmdType":"BindDevice",
                  "OperPlatform":"Devices", 
                }, 
                "OperDev":
                {
                  "DevID":devID,
                  "UserID":uid,
                }, 
                
          },
          header: 
          {
            'content-type' : 'application/json'
          },
          success (res) 
          {
              var data = JSON.parse(res.data);
              console.log("data:"+res.data);
              if(data.Result =="0")
              {
             
                wx.showToast(
                  {
                    title: '绑定成功',
                    icon: 'success',
                    mask:true,
                    duration: 2000
                  }) 
                  wx.navigateTo({
                    url: '../me/me'
                  })

              }
              else
              {
                  wx.showToast(
                  {
                    title: '绑定失败', 
                    icon: 'fail',
                    image:'../../imgs/error.png',
                    mask:true,
                    duration: 2000
                  })
              }
          }
        
      })
  }

})