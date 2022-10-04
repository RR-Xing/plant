if (typeof Promise !== "undefined" && !Promise.prototype.finally) {
  Promise.prototype.finally = function(callback) {
    const promise = this.constructor;
    return this.then((value) => promise.resolve(callback()).then(() => value), (reason) => promise.resolve(callback()).then(() => {
      throw reason;
    }));
  };
}
;
if (typeof uni !== "undefined" && uni && uni.requireGlobal) {
  const global = uni.requireGlobal();
  ArrayBuffer = global.ArrayBuffer;
  Int8Array = global.Int8Array;
  Uint8Array = global.Uint8Array;
  Uint8ClampedArray = global.Uint8ClampedArray;
  Int16Array = global.Int16Array;
  Uint16Array = global.Uint16Array;
  Int32Array = global.Int32Array;
  Uint32Array = global.Uint32Array;
  Float32Array = global.Float32Array;
  Float64Array = global.Float64Array;
  BigInt64Array = global.BigInt64Array;
  BigUint64Array = global.BigUint64Array;
}
;
if (uni.restoreGlobal) {
  uni.restoreGlobal(Vue, weex, plus, setTimeout, clearTimeout, setInterval, clearInterval);
}
(function(vue) {
  "use strict";
  function formatAppLog(type, filename, ...args) {
    if (uni.__log__) {
      uni.__log__(type, filename, ...args);
    } else {
      console[type].apply(console, [...args, filename]);
    }
  }
  var _export_sfc = (sfc, props) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props) {
      target[key] = val;
    }
    return target;
  };
  const _sfc_main$1 = {
    data() {
      return {
        shiDu: "\u6B63\u5728\u83B7\u53D6",
        time: "\u6B63\u5728\u83B7\u53D6",
        shuiCao: "\u6B63\u5728\u83B7\u53D6",
        yanWu: "\u6B63\u5728\u83B7\u53D6",
        fengShan: "\u6B63\u5728\u83B7\u53D6"
      };
    },
    onLoad() {
      this.timer = setInterval(() => this.huoQu(), 30100);
    },
    onUnload() {
      clearInterval(this.timer);
    },
    onHide() {
      clearInterval(this.timer);
    },
    methods: {
      huoQu() {
        uni.request({
          url: "https://iot_s1.dfrobot.com.cn/apiv2/messages?topic=9QOBcXG4g&order=desc&field=created&pnum=1&psize=1000&begin=&end=&token=d5cb32edc0f0b3d9915f03cf1d7ea97a&iname=wBE94qNnR&ipwd=wfE9VqHngz",
          method: "GET",
          dataType: "json",
          timeout: 3e4,
          then: (res) => {
            formatAppLog("log", "at pages/index/index.vue:54", res);
            let shuJu = res.data.data.docs[0];
            let shu = shuJu.message.split("#");
            this.shiDu = shu[1] + "%";
            this.time = shuJu.created;
            this.shuiCao = shu[2];
            this.yanWu = Math.floor(shu[3] / 1023 * 100) + "%";
            this.fengShan = shu[4];
          },
          fail: (res) => {
            clearInterval(this.timer);
            this.shiDu = "\u83B7\u53D6\u5931\u8D25";
            this.shuiCao = "\u83B7\u53D6\u5931\u8D25";
            this.time = "\u83B7\u53D6\u5931\u8D25";
            this.yanWu = "\u83B7\u53D6\u5931\u8D25";
            this.fengShan = "\u83B7\u53D6\u5931\u8D25";
            uni.showModal({
              icon: "error",
              title: "\u83B7\u53D6\u5931\u8D25" + res,
              confirmText: "\u91CD\u8BD5",
              success: (res2) => {
                if (res2.confirm) {
                  this.timer = setInterval(() => this.huoQu(), 1500);
                }
              }
            });
          }
        });
      }
    }
  };
  function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "content" }, [
      vue.createElementVNode("view", { class: "text-area" }, [
        vue.createElementVNode("text", { class: "biaoTi" }, "\u571F\u58E4\u6E7F\u5EA6\uFF1A"),
        vue.createElementVNode("text", { class: "jieGuo" }, vue.toDisplayString($data.shiDu), 1)
      ]),
      vue.createElementVNode("view", { class: "text-area" }, [
        vue.createElementVNode("text", { class: "biaoTi" }, "\u6C34\u69FD\u6C34\u91CF\u60C5\u51B5\uFF1A"),
        vue.createElementVNode("text", { class: "jieGuo" }, vue.toDisplayString($data.shuiCao), 1)
      ]),
      vue.createElementVNode("view", { class: "text-area" }, [
        vue.createElementVNode("text", { class: "biaoTi" }, "\u70DF\u96FE\u6D53\u5EA6\uFF1A"),
        vue.createElementVNode("text", { class: "jieGuo" }, vue.toDisplayString($data.yanWu), 1)
      ]),
      vue.createElementVNode("view", { class: "text-area" }, [
        vue.createElementVNode("text", { class: "biaoTi" }, "\u5C0F\u98CE\u6247\u72B6\u6001\uFF1A"),
        vue.createElementVNode("text", { class: "jieGuo" }, vue.toDisplayString($data.fengShan), 1)
      ]),
      vue.createElementVNode("view", { class: "text-area" }, [
        vue.createElementVNode("text", { class: "biaoTi" }, "\u65F6\u95F4\uFF1A"),
        vue.createElementVNode("text", { class: "jieGuo" }, vue.toDisplayString($data.time), 1)
      ])
    ]);
  }
  var PagesIndexIndex = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render], ["__file", "E:/\uE001/\uE001/\u65B0\u5EFA\u6587\u4EF6\u5939 (4)/plant/pages/index/index.vue"]]);
  __definePage("pages/index/index", PagesIndexIndex);
  const _sfc_main = {
    onLaunch: function() {
      formatAppLog("log", "at App.vue:4", "App Launch");
    },
    onShow: function() {
      formatAppLog("log", "at App.vue:7", "App Show");
    },
    onHide: function() {
      formatAppLog("log", "at App.vue:10", "App Hide");
    }
  };
  var App = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "E:/\uE001/\uE001/\u65B0\u5EFA\u6587\u4EF6\u5939 (4)/plant/App.vue"]]);
  function createApp() {
    const app = vue.createVueApp(App);
    return {
      app
    };
  }
  const { app: __app__, Vuex: __Vuex__, Pinia: __Pinia__ } = createApp();
  uni.Vuex = __Vuex__;
  uni.Pinia = __Pinia__;
  __app__.provide("__globalStyles", __uniConfig.styles);
  __app__._component.mpType = "app";
  __app__._component.render = () => {
  };
  __app__.mount("#app");
})(Vue);
