// pages/classroomRepair/classroom_repair.js

Page({
  data: {
        openid:"",
        token:"",  
  },
  btnsend:function(e){ 
     wx.requestSubscribeMessage({
       tmplIds: ['QO0YL2yfA4319ZbOYxsle3upZs5ufgwxlkd2StNeTOA'],
       success:(res)=>{
      if(res['QO0YL2yfA4319ZbOYxsle3upZs5ufgwxlkd2StNeTOA']=='accept')
      {
        console.log("已授权接收订阅消息"+res);

        //获取access_token
        wx.request({
        url:  "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=" + getApp().globalData.appId + "&secret=" + getApp().globalData.secret,
        success:(res)=>{
           console.log(res);
            let _access_token=res.data.access_token;
            console.log("---access_token---:"+_access_token);
      
            wx.login({
                success:res=>{
                  // 调用下发接口前需要得到用户的openid
                  if(res.code){
                     wx.request({
                       url: 'https://api.weixin.qq.com/sns/jscode2session',
                       data:{
                          appid:getApp().globalData.appId,
                          secret:getApp().globalData.secret,
                          js_code:res.code,
                          grant_type: "authorization_code",
                       },
                       success:res=>{
                            console.log("获取openid成功："+res);
                            let _openid=res.data.openid;
                            //调用下发接口
                             wx.request({
                               url:'https://api.weixin.qq.com/cgi-bin/message/subscribe/send?access_token=' + _access_token,                                            
                                method: "POST",
                                data:JSON.stringify({
                                    touser:_openid,
                                    template_id:"QO0YL2yfA4319ZbOYxsle3upZs5ufgwxlkd2StNeTOA",
                                     page:'pages/me/me',
                                     data:{
                                      "date1":{
                                        "value": '2020年8月11日',
                                        "color": "#4a4a4a"
                                      },
                                       "thing3":{
                                        "value": '大学城D1',
                                        "color": "#9b9b9b"
                                      },
                                       "thing6":{ 
                                        "value": '烟雾报警',
                                        "color": "#9b9b9b"
                                      },
                                      "character_string9":{
                                        "value": '123456',
                                        "color": "#9b9b9b"
                                      }     
                                     }
                                }),
                                success:res=>{
                                   console.log("---res---:"+res.data);
                                    wx.showToast({
                                      title: '下发成功！',
                                      icon:'success'
                                    })
                                }
                             })                           
                       }
                     })
                  }               
                }
            })
        }
      })    
    } else{
        wx.showToast({
          title: '已拒绝授权',
        })
      }
    }
  })
 },  
  onLoad: function (options) {
      var that=this;
      //获取openid
      // wx.login({
      //     success:(res)=>{
      //        if(res.code){
      //           wx.request({
      //             url: 'https://api.weixin.qq.com/sns/jscode2session',
      //             data:{
      //               appid:getApp().globalData.appId,
      //               secret: getApp().globalData.secret, 
      //               js_code: res.code,
      //               grant_type: "authorization_code"
      //             },
      //             success: (res) => {
      //               console.log(res);
      //               that.setData({
      //                 openid: res.data.openid
      //               })
      //             }
      //           })
      //        }
      //     }
      // })      

    },
  
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
   
})