// pages/device_log/device_log.js
//获取应用实例
const app = getApp()

const date = new Date();
const years = [];
const months = [];
const days = [];
const hours = [];
const minutes = [];

//获取年
for (let i = date.getFullYear() ; i > date.getFullYear() - 5; i--) {
  years.push("" + i);
}
//获取月份
for (let i = 1; i <= 12; i++) {
  if (i < 10) {
    i = "0" + i;
  }
  months.push("" + i);
}
//获取日期
for (let i = 1; i <= 31; i++) {
  if (i < 10) {
    i = "0" + i;
  }
  days.push("" + i);
}
//获取小时
for (let i = 0; i < 24; i++) {
  if (i < 10) {
    i = "0" + i;
  }
  hours.push("" + i);
}
//获取分钟
for (let i = 0; i < 60; i++) {
  if (i < 10) {
    i = "0" + i;
  }
  minutes.push("" + i);
}

function getToday2(){ 
  var now = new Date(); 
  var year = now.getFullYear(); 
  var month = now.getMonth() + 1; 
  var day = now.getDate(); 
  if (month < 10) { 
  month = '0' + month; 
  }; 
  if (day < 10) { 
  day = '0' + day; 
  }; 
  // 如果需要时分秒 
  // var h = now.getHours(); 
  // var m = now.getMinutes(); 
  // var s = now.getSeconds(); 
  var formatDate = "["+year + ',' + month + ',' + day+"]"; 
  return formatDate; 
  } 

function getToday(){ 
  var now = new Date(); 
  var year = now.getFullYear(); 
  var month = now.getMonth() + 1; 
  var day = now.getDate(); 
  if (month < 10) { 
  month = '0' + month; 
  }; 
  if (day < 10) { 
  day = '0' + day; 
  }; 
  // 如果需要时分秒 
  // var h = now.getHours(); 
  // var m = now.getMinutes(); 
  // var s = now.getSeconds(); 
  var formatDate = year + '年' + month + '月' + day+'日'; 
  return formatDate; 
  } 

Page({

  /**
   * 页面的初始数据
   */
  data: {
    logScrollHeight:100,
    logArray:[],
    logTipCss:"",
    logListViewCss:"",
    logTypeIndex:0,
    logTypeList: ['所有日志',"用户登录","系统报警","设备异常"],
      
    time: '',
    multiArray: [years, months, days],
    multiIndex: [0, 9, 16, 10, 17],
    choose_year: '',
    value:[],
  },

  // 选择国家函数
  changeLogType(e){
    this.setData({ logTypeIndex: e.detail.value});
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
   // template.tabbar("tabBar", 2, this)
 
    this.setPickerData();    
  },
   //获取日志
  loadLogData:function(y,m,d){
    let that = this; 
    console.log("loadLogData UserLevel:"+app.tcData.UserLevel);
    wx.request(
      {      
          url: app.tcData.tcPostUrl,
          method:"post",
          data:{
            "UserInfo":
            {
                //  "UserID":app.globalData.userInfo.nickName,            
                //  "UserLevel":app.tcData.UserLevel,
                //  "CusID":app.tcData.CusID
                "UserID":app.tcData.UserID,       
                "UserPwd":app.tcData.UserPwd,
                "UserName":app.tcData.UserName,
                "UserType":app.tcData.UserType,
                "CusID":app.tcData.CusID
            },
           "OperInfo":
            {
              "OperCmdType":"GetDeviceLog",
              "OperTime":y+"-"+m+"-"+d+" 00:00:00",
              "OperPlatform":app.tcData.OperPlatform,           
            },          

          },
          header: {
            'content-type' : 'application/json'
          },
          success (res) 
          {
            console.log("---log --res.data：---"+res.data);
             if(typeof(res.data) == "string"){
              var data = JSON.parse(res.data);
              app.tcData.logArray = data.DevLogList;
              that.setData({
                logArray:data.DevLogList,
                logScrollHeight:data.DevLogList.length *100+100,
              })
              console.log("--length--:"+data.DevLogList.length);
             }                           
          },
          fail(res){
            console.log("fail:"+res); 
          }

      })

      this.setCss();
  },
  onShow:function(){
    if (typeof this.getTabBar === 'function' &&
    this.getTabBar()) {
    this.getTabBar().setData({
      selected: 2
    })
  }    
     // 1 加载数据
      //设置默认的年份 
    var now = new Date(); 
    var year = now.getFullYear(); 
    var month = now.getMonth() + 1; 
    var day = now.getDate(); 
  console.log("----UserLevel---:"+app.tcData.UserLevel)
    this.loadLogData(year,month,day);
  },

  setCss:function(){

      // let title = app.tcData.currentDeviceName? app.tcData.currentDeviceName:"设备日志";
      // wx.setNavigationBarTitle({
      //   title: title,
      // })  
      this.setData({
        logTipCss:"view_log_tip_hide",
        logListViewCss:"view_log_show",
    }) 
  },
  setPickerData:function(){
    //设置默认的年份 
    var now = new Date(); 
    var year = now.getFullYear(); 
    var month = now.getMonth() + 1; 
    var day = now.getDate(); 

   this.loadLogData(year,month,day);

   var year_index = 0;
   for(let i=0;i<years.length;i++){
      if(years[i] == year){
        year_index = i;
        break;
      }
    }
    var month_index = 0;
    for(let i=0;i<months.length;i++){
      if(months[i] == month){
        month_index = i;
        break;
      }
    }
    var day_index = 0;
    for(let i=0;i<days.length;i++){
      if(days[i] == day){
        day_index = i;
        break;
      }
    }
    this.setData({
      time:getToday(),
      multiIndex:[year_index,month_index,day_index],
      logTypeIndex:0,
    })
  },
  //获取时间日期
  bindMultiPickerChange: function(e) {
     console.log('picker发送选择改变，携带值为', e.detail.value)
     this.setData({
      multiIndex: e.detail.value
    })
    const index = this.data.multiIndex;
    const year = this.data.multiArray[0][index[0]];
    const month = this.data.multiArray[1][index[1]];
    const day = this.data.multiArray[2][index[2]];
    this.setData({
      time: year + '年' + month + '月' + day+'日',// + ' ' + hour + ':' + minute
    })

    this.loadLogData(year,month,day);

  },
  //监听picker的滚动事件
  bindMultiPickerColumnChange: function(e) {
    console.log("监听picker的滚动事件:"+e.detail.value);
  },
})