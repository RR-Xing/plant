<template>
  <view class="content">
    <view class="text-area">
      <text class='biaoTi'>土壤湿度：</text>
      <text class='jieGuo'>{{shiDu}}</text>
    </view>
    <view class="text-area">
      <text class='biaoTi'>水槽水量情况：</text>
      <text class='jieGuo'>{{shuiCao}}</text>
    </view>
    <view class="text-area">
      <text class='biaoTi'>烟雾浓度：</text>
      <text class='jieGuo'>{{yanWu}}</text>
    </view>
    <view class="text-area">
      <text class='biaoTi'>小风扇状态：</text>
      <text class='jieGuo'>{{fengShan}}</text>
    </view>
    <view class="text-area">
      <text class='biaoTi'>发送时间：</text>
      <text class='jieGuo'>{{time}}</text>
    </view>
    <text class="shuoMing">（每分钟更新一次）</text>
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
        fengShan: '正在获取'
      }
    },
    onLoad() {
      this.timer = setInterval(() => this.huoQu(), 60000)
    },
    onUnload() {
      clearInterval(this.timer)
    },
    onHide() {
      clearInterval(this.timer)
    },
    methods: {
      huoQu() {
        uni.request({
          url: 'https://iot_s1.dfrobot.com.cn/apiv2/messages?topic=9QOBcXG4g&order=desc&field=created&pnum=1&psize=1000&begin=&end=&token=d5cb32edc0f0b3d9915f03cf1d7ea97a&iname=wBE94qNnR&ipwd=wfE9VqHngz',
          method: 'GET',
          dataType: 'json',
          timeout: 30000,
          success: (res) => {
            console.log(res)
            let shuJu = res.data.data.docs[0]
            let shu = shuJu.message.split('#')
            this.shiDu = shu[1] + '%'
            this.shuiCao = shu[2]
            this.yanWu = Math.floor(shu[3] / 1023 * 100) + '%'
            this.fengShan = shu[4]
            this.time = shuJu.created
          },
          fail: (res) => {
            clearInterval(this.timer)
            this.shiDu = '获取失败'
            this.shuiCao = "获取失败"
            this.time = '获取失败'
            this.yanWu = '获取失败'
            this.fengShan = '获取失败'
            uni.showModal({
              icon: 'error',
              title: "获取失败" + res,
              confirmText: '重试',
              success: (res) => {
                if (res.confirm) {
                  this.timer = setInterval(() => this.huoQu(), 1500)
                }
              }
            })

          }



        })
      }
    }
  }
</script>

<style>
  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  text {
    font-size: 43rpx;
    font-weight: 400;
  }

  .text-area {
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
  }
</style>
