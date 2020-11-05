// pages/detail/detail.js
let datas =require('../../datas/list-data.js');
let appDatas = getApp();
console.log(appDatas,typeof appDatas);
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detailObj:{},
    index:null,
    isCollected:false,
    isMusicPlay:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    // 获取参数值
    let index = options.index;
    // 更新data中的detailObj的状态值
    this.setData({
    detailObj:datas.list_data[index],
    index
    });
    // // 根据本地缓存的数据判断用户是否缓存当前的文章
    // let detailStorage = wx.getStorageSync('isCollected');
    // console.log(detailStorage);
    
    // if(!detailStorage){
    // //   // 在缓存中初始化空对象
    //   wx.setStorageSync('isCollected', {});
    // }
    // // 根据获取的缓存数据判断用户是否收藏，若收藏过则更新isCollected的值为true
    // if(detailStorage[index]){
    //   this.setData({
    //     isCollected:true
    //   })
    // }
    // 监听音乐播放
    wx.onBackgroundAudioPlay(()=>{
    console.log('音乐播放');
    // 修改音乐播放标识的状态值
    this.setData({
      isMusicPlay:true
    });
    // 修改appDatas中的数据
    appDatas.data.isPlay = true;
    appDatas.data.pageindex = index;
    });
    //判断音乐是否在播放
    if(appDatas.data.isPlay && appDatas.data.pageindex === index){
      this.setData({
        isMusicPlay: true
      });
    } 

    // 监听音乐暂停
    wx.onBackgroundAudioPause(() =>{
      console.log('音乐暂停');
      // 修改音乐播放标识的状态值
      this.setData({
        isMusicPlay: false
      });
      // 修改appDatas中的数据
      appDatas.data.isPlay = false;
    });
  },
  handleCollection(){
    // 定义isCollected，让其在true和false这两个值之间切换达到切换图片的作用
    let isCollected = !this.data.isCollected;
    // 更新状态
    this.setData({
    isCollected
    });
    // 提示用户
    let title = isCollected ? '收藏成功' : '取消收藏';
    wx:wx.showToast({
      title,
      icon: 'success',
     
    })
    // 缓存数据到本地
    // 理想的缓存数据应该是个对象，里面存着key和value，{1:true,2:false}
    let {index} = this.data;
    //  let obj ={};不可行，会覆盖原来的状态
    // 读取缓存数据
    wx:wx.getStorage({
      key: 'isCollected',
      success:(datas)=> {
        console.log(datas,typeof datas);
        let obj =datas.data;
        obj[index] = isCollected;
        wx:wx.setStorage({
        key: 'isCollected',
        data: obj,
        success: ()=>{

        console.log('缓存成功');
         }      
       });
      },      
    });
  },
 handleMusicPlay(){
  // 处理音乐播放
  let isMusicPlay = !this.data.isMusicPlay;
  this.setData({
    isMusicPlay
  });
  // 控制音乐播放
  if (isMusicPlay) {
    // 播放音乐
    let {dataUrl,title} = this.data.detailObj.music;
    wx.playBackgroundAudio({
      dataUrl,
      title
    });
  } else {
    //暂停音乐
    wx.pauseBackgroundAudio()
  }
 },
//  实现分享功能
 handleShare(){
  wx.showActionSheet({
    itemList: [
      '分享到朋友圈', '分享到qq空间', '分享到微博'
    ],
  })
 }
 
  
})