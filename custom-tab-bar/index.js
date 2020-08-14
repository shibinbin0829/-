// custom-tar-bar/index.js
Component({
   /**
   * 组件的初始数据
   */
  data: {
      selected:0,
      color:"#7A7E83",
      selectedColor:"#3cc51f",
      list:[
        {
          pagePath:"/pages/classRoom_list/classRoom_list",
          iconPath:"/imgs/classlist.png",
          selectedIconPath:"/imgs/classlist_sel.png",
          text:"教室列表"
        },
        {
          pagePath:"/pages/device_control/device_control",
          iconPath:"/imgs/manager2.png",
          selectedIconPath:"/imgs/manager_sel.png",
          text:"设备控制"
        },  
        {
          pagePath:"/pages/scene_control/scene_control",
          iconPath:"/imgs/list.png",
          selectedIconPath:"/imgs/list_sel.png",
          text:"场景列表"
        },      
        {
          pagePath:"/pages/me/me",
          iconPath:"/imgs/me.png",
          selectedIconPath:"/imgs/me_sel.png",
          text:"我"
        }
      ]

  },

  /**
   * 组件的方法列表
   */
  methods: {
      switchTab(e){
         const data =e.currentTarget.dataset
         const url=data.path
         wx.switchTab({url})
         this.setData({
           selected:data.index
         })
      }
  }
})
