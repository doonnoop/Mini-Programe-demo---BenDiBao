// pages/shopList/shopList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      shopList: [],
      pageNum: 0,
      pageLimit: 20,
      catId: 0,
      hasMore: true
  },

    // 自定义加载更多函数
    loadMore: function () {
        if (!this.data.hasMore) return;
        wx.request({
            url: "https://locally.uieee.com/categories/" + this.data.catId + '/shops',
            data: {
                _page: ++this.data.pageNum,
                _limit: this.data.pageLimit
            },
            success: (res) => {
                console.log(res);
                var newList = this.data.shopList.concat(res.data);
                var count = parseInt(res.header['X-Total-Count']);
                var flag = this.data.pageNum * this.data.pageLimit < count;
                this.setData({
                    shopList: newList,
                    hasMore: flag
                })
            }
        })
    },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      console.log(options);
      if (options.title){
          wx.setNavigationBarTitle({
              title: options.title
          })
      };
      this.setData({
          catId: options.cat
      });
      this.loadMore();
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
      this.setData({
          shopList:[],
          pageNum: 0,
          hasMore: true
      })
      this.loadMore();
      wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
      this.loadMore()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})