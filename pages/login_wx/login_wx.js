// pages/register/register.js
const app = getApp()

Page({

   data:{
    regNameValue:"",
    weixinName:"null",
    timeout:"",
    page_show:"",
    page_show:"display:none",
    scan_code_show:"display:none",

    san_result_classID:"",
    san_result_className:"",
    san_result_classOnline:"",
    san_result_classAddress:"",

    userInfo: "",
    hasUserInfo: "",
    login_btn_show:"display:none",

    select:false,
    CusName:"请选择平台",
    CusID:"",
    CustomerArray:[],   
   },
   
   onLoad:function(options){

     console.log("onload start "+app.globalData.userInfo.nickName); 
     this.setData({
       weixinName:app.globalData.userInfo.nickName,
     })

     this.getCustomerList();
     this.startScanCodeFun();   
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
   //扫码
   getScancode: function(did) {
    var _this = this;
    // 允许从相机和相册扫码
    wx.scanCode({
      success(res){ 
        var classID= res.result;
        _this.setData({
          san_result_classID: classID, 
        })
        if(classID !=""){
          //  _this.getDevice(classID);
            _this.openDevice(classID)
        }      
      }
    })
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

  //打开设备
   openDevice:function(cid){

    console.log("---openDevice cid---: "+cid);
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
                  "CusID":app.tcData.CusID,
                },
               "OperInfo":
                {              
                  "OperCmdType":"ScanCodeOpenDevice",
                  "OperID":cid           
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
              console.log("-----OperCR------data:"+res.data); 
              that.setData({
                  san_result_classID:data.OperCR.CID,
                  san_result_className:data.OperCR.Name,
                  san_result_classOnline:data.OperCR.Online,
                  san_result_classAddress:data.OperCR.Address
              })
              if(data.Result =="0")
              { 
                   if(data.OperCR.Online==true)
                   {
                        wx.showToast({
                          title: '设备在线',
                          icon:'success',
                          duration:2000
                        })
                   }
                   else{
                    wx.showToast({
                       title: '设备离线',
                       image:'../../imgs/error.png',
                       duration:2000
                    })
                   }
              }
             else if(data.Result =="-1")
             {
              wx.showToast(
                {
                  title: '教室信息不存在',
                  image:'../../imgs/error.png',
                  duration: 2000,
                  mask:true,
                })
            }  
            else if(data.Result=="-2"){
              wx.showToast(
                {
                  title: '提交失败',
                  image:'../../imgs/error.png',
                  duration: 2000,
                  mask:true,
                })
            }           
          }
        }
      })
   },

   //进入后台
   wx_loginFun: function(e)
   {      
     console.log("wx_loginFun:"+app.globalData.userInfo.nickName); 
     var that = this;
       wx.request(
         {      
             url: app.tcData.tcPostUrl,
             method:"post",
             data:{ 
                  "UserInfo":
                   {
                     "UserID":app.globalData.userInfo.nickName,
                     "UserType":"WeiXin",
                     "CusID":app.tcData.CusID                          
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
                 console.log("----wx_loginFun---------data:"+res.data); 
                 if(data.Result =="0")
                 {  
                       app.tcData.UserName = data.UserInfo.UserName;
                       app.tcData.UserLevel = data.UserInfo.UserLevel;
                       app.tcData.UserID = data.UserInfo.UserID;
                       app.tcData.UserType = data.UserInfo.UserType; 
                       app.tcData.CusID = data.UserInfo.CusID;                    
                       wx.switchTab({
                         url: '../classRoom_list/classRoom_list',
                       })
               }
               else if(data.Result=="-1")
               {
                wx.showToast(
                  {
                    title: '正在审核...',
                    icon: 'success',
                    mask:true,
                    duration: 3000
                  }) 
               }
               else if(data.Result =="-2")
               {
                    // 用户不存在，显示注册
                    console.log("用户不存在");
                    that.setData({
                      page_show:""
                    })  
                    wx.setNavigationBarTitle({
                     title: "用户申请",
                   })
               }
               else if(data.Result =="-3")
               {      
                wx.showToast(
                  {
                    title: '密码不正确',
                    image:'../../imgs/error.png',
                    mask:true,
                    duration: 3000
                  }) 
               }
               else if(data.Result =="-4")
               {                
                wx.showToast(
                  {
                    title: '用户被禁用',
                    image:'../../imgs/yichang.png',
                    mask:true,
                    duration: 3000
                  }) 
               }
               else if(data.Result =="-5")
               {                
                wx.showToast(
                  {
                    title: '登陆异常',
                    image:'../../imgs/yichang.png',
                    mask:true,
                    duration: 3000
                  }) 
               }
             }
           }
         })
      },

   //初始
    startScanCodeFun: function(e)
  {    
    console.log("--startScanCodeFun---:"+app.globalData.userInfo.nickName);
    var name=app.globalData.userInfo.nickName;
    var that = this;
      wx.request(
        {
            url: app.tcData.tcPostUrl,
            method:"post",
            data:{ 
                 "UserInfo":
                  {
                    "UserID":app.globalData.userInfo.nickName,        
                  //  "UserID":"sjhi" ,         
                    "UserType":"WeiXin",
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
                console.log("------login-------data:"+res.data); 
                if(data.Result =="0")
                {                    
                      app.tcData.UserName = data.UserInfo.UserName;
                      app.tcData.UserLevel = data.UserInfo.UserLevel;
                      app.tcData.UserID = data.UserInfo.UserID;
                      app.tcData.UserType = data.UserInfo.UserType;  
                      app.tcData.CusID = data.UserInfo.CusID;
                   //  用户存在，直接扫码
                      that.setData({
                        scan_code_show:""
                      }) 
                      if(data.UserInfo.UserLevel=="0"){
                           that.setData({
                             login_btn_show:""
                           })
                      }
                      else{
                           that.setData({
                              login_btn_show:"display:none"
                           })
                      }
                      wx.setNavigationBarTitle({
                        title: "扫码打开设备",
                      })

                      that.getScancode();
              }    
              else if(data.Result=="-1")
              { 
                 wx.showToast(
                   {
                    title: '正在审核...',
                    image:'../../imgs/msg.png', 
                    mask:true,
                    duration: 3000
                   })
              }         
              else if(data.Result =="-2")
              {
                   // 用户不存在，显示注册
                   that.setData({
                     page_show:""
                   }) 
                   wx.setNavigationBarTitle({
                    title: "用户申请",
                  })
              }
              else if(data.Result=="-4"){
                wx.showToast(
                  {
                    title: '用户被禁用',
                    image:'../../imgs/disable.png',
                    mask:true,
                    duration: 3000
                  }) 
              }
              else if(data.Result=="-5"){
                wx.showToast(
                  {
                    title: '登陆异常',
                    image:'../../imgs/yichang.png',
                    mask:true,
                    duration: 3000
                  }) 
              }
              else{
                wx.showToast(
                  {
                    title: data.Result,
                    image:'../../imgs/yichang.png',
                    mask:true,
                    duration: 3000
                  }) 
              }
 
            }
          }
        })
     },

   //注册
    click_register:function(e){    

    console.log(this.data.regNameValue); 
    if(this.data.regNameValue == ""){
        wx.showToast({
          title: '请输入昵称',
          image:'../../imgs/warn.png',
          duration:2000
        })
        return;
      }
      if(this.data.CusName == "请选择平台"){
        wx.showToast({
          title: '请选择平台',
          image:'../../imgs/warn.png',
          duration:2000
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
                   "UserID":app.globalData.userInfo.nickName,                    
                    "UserName":this.data.regNameValue,
                    "UserType":"WeiXin",
                    "CusID":this.data.CusID,
                  },
                 "OperInfo":
                  {
                    "OperCmdType":"RegisterUser",
                    "OperPlatform":"WeiXin",                   
                  }, 
            },
            header: 
            {
              'content-type' : 'application/json'
            },
            success (res) 
            {
              if (typeof (res.data) == 'string')
              { 
               var data = JSON.parse(res.data);
                console.log("--register data--:"+res.data); 
                 if(data.Result =="0")
                    { 
                      wx.showToast(
                        {
                          title: '已提交申请',
                          icon: 'success',
                          mask:true,
                          duration: 2000
                        }) 
                    }
                    else if(data.Result =="-1")
                    {
                        wx.showToast(
                        {
                          title: '提交失败',                         
                          image:'../../imgs/error.png',
                          mask:true,
                          duration: 2000
                        })
                  }            
                  else if(data.Result =="-3")
                    {
                        wx.showToast(
                        {
                          title: '用户正在审核',                        
                          image:'../../imgs/msg.png',
                          mask:true,
                          duration: 2000
                        })
                  }    
                  else if(data.Result =="-4")
                  {
                      wx.showToast(
                      {
                        title: '用户被禁用',                        
                        image:'../../imgs/disable.png',
                        mask:true,
                        duration: 2000
                      })
                }                                                                                         
              }
            }
          
        })
 
  },
   
   //报修
  dev_repair:function(){
      wx.navigateTo({
        url: '../classroom_repair/classroom_repair',
      })
    

  },

  regName:function(e){
      this.setData({
        regNameValue:e.detail.value,
         })
  },
   
})