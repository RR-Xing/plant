<template>
  <view class="tiMu">
    <text class="bigTitle">AI护</text>
    <text class="smallTitle">—城市净氧中心</text>
  </view>
  <view class="content">
    <view :class="shiDuOK">
      <text class='biaoTi'>土壤湿度：</text>
      <text class='jieGuo'>{{shiDu}}</text>
    </view>
    <view :class="shuiCaoOK">
      <text class='biaoTi'>水槽水量情况：</text>
      <text class='jieGuo'>{{shuiCao}}</text>
    </view>
    <view :class="yanWuOK">
      <text class='biaoTi'>烟雾浓度：</text>
      <text class='jieGuo'>{{yanWu}}</text>
    </view>
    <view :class="fengShanOK">
      <text class='biaoTi'>小风扇状态：</text>
      <text class='jieGuo'>{{fengShan}}</text>
    </view>
    <view class="hao">
      <text class='biaoTi'>最后更新时间：</text>
      <text class='jieGuo'>{{time}}</text>
    </view>
    <text class="shuoMing">（每分钟更新一次）</text>
    <view class="hao">
      <text class="biaoTi">阈值管理</text>
      <view class="shuRu jieGuo">
        <input type="text" placeholder="输入阈值" v-model="content">
        <button size="mini" @click="faSong()" type="primary">发送</button>
      </view>
    </view>
  </view>
  <hr>
  <view class="copy">
    <text>Copyright © by RR-Xing</text>
    <text>(https://rr-xing.rth1.one)</text>
    <text id="xiao">开源：</text>
    <text>https://github.com/RR-Xing/plant</text>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        shiDu: '正在获取',
        time: '正在获取',
        shuiCao: '正在获取',
        yanWu: '正在获取',
        fengShan: '正在获取',
        content: '',
        shiDuOK: 'hao',
        shuiCaoOK: 'hao',
        yanWuOK: 'hao',
        fengShanOK: 'hao',
        sdtz: false,
        sctz: false,
        ywtz: false,
      }
    },

    onShow() {
      this.huoQu()
      this.timer = setInterval(() => this.huoQu(), 60000)
    },
    onUnload() {
      clearInterval(this.timer)
    },
    methods: {
      huoQu() {
        uni.showLoading({
          title: '正在获取最新数值……'
        });
        uni.request({
          url: 'https://iot_s1.dfrobot.com.cn/apiv2/messages?topic=9QOBcXG4g&order=desc&field=created&pnum=1&psize=1000&begin=&end=&token=d5cb32edc0f0b3d9915f03cf1d7ea97a&iname=wBE94qNnR&ipwd=wfE9VqHngz',
          method: 'GET',
          dataType: 'json',
          timeout: 30000,
          success: (res) => {
            uni.showToast({
              title: '更新成功！'
            });
            console.log(res)
            let shuJu = res.data.data.docs[0]
            let shu = shuJu.message.split('#')
            this.shiDu = shu[1] + '%'
            if (shu[1] < 10) {
              this.shiDuOK = 'buHao'
              if (!this.sdtz) {
                this.sdtz = true
                this.push('土壤湿度不足！', '水泵正在努力……')
              }
            } else {
              this.shiDuOK = 'hao'
              this.sdtz = false
            }
            this.shuiCao = shu[2]
            if (shu[2] === '没水了') {
              this.shuiCaoOK = 'buHao'
              if (!this.sctz) {
                this.push('水槽水量不足！', '请及时补水！')
                this.sctz = true
              }

            } else {
              this.shiDuOK = 'hao'
              this.sctz = false
            }
            this.yanWu = Math.floor(shu[3] / 1023 * 100) + '%'
            if (shu[3] > 75) {
              this.yanWuOK = 'buHao'
              if (!this.ywtz) {
                this.push('烟雾浓度过高！', '小风扇正在努力……')
                this.ywtz = true
              }
            } else {
              this.yanWuOK = 'hao'
              this.ywtz = false
            }
            this.fengShan = shu[4]
            if (shu[4] === 'on') {
              this.fengShanOK = 'kai'
            } else {
              this.fengShanOK = 'hao'
            }
            this.time = shuJu.created
          },
          fail: (err) => {
            clearInterval(this.timer)
            this.shiDu = '获取失败'
            this.shuiCao = "获取失败"
            this.time = '获取失败'
            this.yanWu = '获取失败'
            this.fengShan = '获取失败'
            uni.showModal({
              title: "获取失败" + err,
              confirmText: '重试',
              success: (res) => {
                if (res.confirm) {
                  this.timer = setInterval(() => this.huoQu(), 60000)
                }
              }
            })

          },
          complete: () => {
            uni.hideLoading()
          }
        })
      },
      faSong() {

        uni.request({
          url: 'https://iot_s1.dfrobot.com.cn/apiv2/publish?topic=bGJkTK1nR&msg=' + this.content +
            '&token=711b0145cf743d16e4b30dcdaf9ab4e2&iname=wBE94qNnR&ipwd=wfE9VqHngz&timemark=1665110169024',
          method: 'GET',
          dataType: 'json',
          complete: res => {
            if (res.message = 'Success') {
              uni.showToast({
                icon: 'success',
                title: '发送成功！！！'
              })
              this.content = ''
            } else {
              uni.showToast({
                icon: 'fail',
                title: '发送失败！！！'
              })
              this.content = ''
            }
          }
        })
      },
      push(title, message) {
        uni.createPushMessage({
          title: title,
          content: message
        })
      }
    }
  }
</script>

<style>
  @font-face {
    font-family: 'tit';
    src: url(~@/static/1.ttf);
  }
  .tiMu{
    display: flex;
    width: 100%;
    flex-direction: column;
    color: #20a162;
  }
  
  .bigTitle{
    font-size: 120rpx;
    font-style:italic;
    font-family: 'tit';
  }
  
  .smallTitle{
    font-size: 100rpx;
    align-self: flex-end;
    font-family: 'tit';
  }
  
  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

  }

  page {
    background-image: url(~@/static/back.webp);
    background-position: center;
    background-repeat: no-repeat;
    background-attachment: fixed;
  }



  text {
    font-size: 43rpx;
    font-weight: 400;
  }

  .hao {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: rgb(141, 255, 115);
    height: 240rpx;
    width: 70%;
    margin: 20rpx;
    border-radius: 0 150rpx;
    padding: 40rpx;
  }

  .buHao {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #ed5a65;
    height: 240rpx;
    width: 70%;
    margin: 20rpx;
    border-radius: 0 150rpx;
    padding: 40rpx;
  }

  .kai {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #23a0ff;
    height: 240rpx;
    width: 70%;
    margin: 20rpx;
    border-radius: 0 150rpx;
    padding: 40rpx;
  }

  .biaoTi {
    align-self: flex-start;
    font-weight: 600;
    margin-bottom: auto;
    font-size: 50rpx;
  }

  .jieGuo {
    align-self: center;
    margin-bottom: auto;
  }

  .shuoMing {
    font-size: 35rpx;
    color: white;
  }

  .shuRu {
    display: flex;
    justify-content: center;
  }

  input {
    border-bottom: 1px blue solid;
    height: 100%;
    flex: 1;
  }
  
  .copy{
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: rgba(39, 40, 51, 0.8);
  }
  
  .copy text{
    margin: 15rpx 0;
    color: aliceblue;
    font-weight: lighter;
  }
  
  #xiao{
    font-size: 35rpx;
  }
  
  hr{
    color: #63bbd0;
  }
</style>
