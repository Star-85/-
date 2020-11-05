// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    msg:'LaLisa',
    userInfo:{},
    isShow:true
  },
  handleClick(){
    // 点击跳转到list页面
    wx.switchTab({
      url:'/pages/list/list'
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  getuserInfo(){
    // 判断用户是否授权了
    wx.getSetting({
      success: data => {
        console.log(data);
        if (data.authSetting['scope.userInfo']) {
          // 用户已经授权
          this.setData({
            isShow: false
          });
        } else {
          // 用户未授权
          this.setData({
            isShow: true
          });
        }
      }
    })

    // 获取用户登录的信息
    wx.getUserInfo({
      success: data => {
        console.log(data);
        this.setData({
          userInfo: data.userInfo
        });
      },
      fail: () => {
        console.log('获取用户信息失败');
      }
    })
  },
  onLoad: function (options) {
  // 做一些初始化工作，发送请求，开启定时器
  console.log('onLoad 页面加载');
  console.log(this);

  this.getuserInfo();

  },
  handleGetUserInfo(data){
    // 判断用户当前点击的是否允许
       console.log('用户点击了',data);
      if(data.detail.rawData){
        // 进入循环说明用户点击了允许，需要将页面刷新显示用户信息
        this.getuserInfo();
      }
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

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})