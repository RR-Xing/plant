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
        fengShan: "\u6B63\u5728\u83B7\u53D6",
        content: ""
      };
    },
    onLoad() {
      this.timer = setInterval(() => this.huoQu(), 6e4);
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
          success: (res) => {
            formatAppLog("log", "at pages/index/index.vue:63", res);
            let shuJu = res.data.data.docs[0];
            let shu = shuJu.message.split("#");
            this.shiDu = shu[1] + "%";
            this.shuiCao = shu[2];
            this.yanWu = Math.floor(shu[3] / 1023 * 100) + "%";
            this.fengShan = shu[4];
            this.time = shuJu.created;
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
                  this.timer = setInterval(() => this.huoQu(), 6e4);
                }
              }
            });
          }
        });
      },
      faSong() {
        uni.request({
          url: "https://iot_s1.dfrobot.com.cn/apiv2/publish?topic=bGJkTK1nR&msg=" + this.content + "&token=711b0145cf743d16e4b30dcdaf9ab4e2&iname=wBE94qNnR&ipwd=wfE9VqHngz&timemark=1665110169024",
          method: "GET",
          dataType: "json",
          complete: (res) => {
            if (res.message = "Success") {
              uni.showToast({
                icon: "success",
                title: "\u53D1\u9001\u6210\u529F\uFF01\uFF01\uFF01"
              });
              this.content = "";
            } else {
              uni.showToast({
                icon: "fail",
                title: "\u53D1\u9001\u5931\u8D25\uFF01\uFF01\uFF01"
              });
              this.content = "";
            }
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
        vue.createElementVNode("text", { class: "biaoTi" }, "\u53D1\u9001\u65F6\u95F4\uFF1A"),
        vue.createElementVNode("text", { class: "jieGuo" }, vue.toDisplayString($data.time), 1)
      ]),
      vue.createElementVNode("text", { class: "shuoMing" }, "\uFF08\u6BCF\u5206\u949F\u66F4\u65B0\u4E00\u6B21\uFF09"),
      vue.createElementVNode("view", { class: "text-area" }, [
        vue.createElementVNode("text", { class: "biaoTi" }, "\u9608\u503C\u7BA1\u7406"),
        vue.createElementVNode("view", { class: "shuRu jieGuo" }, [
          vue.withDirectives(vue.createElementVNode("input", {
            type: "text",
            placeholder: "\u8F93\u5165\u9608\u503C",
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $data.content = $event)
          }, null, 512), [
            [vue.vModelText, $data.content]
          ]),
          vue.createElementVNode("button", {
            size: "mini",
            onClick: _cache[1] || (_cache[1] = ($event) => $options.faSong())
          }, "\u53D1\u9001")
        ])
      ])
    ]);
  }
  var PagesIndexIndex = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render], ["__file", "C:/Users/gkq/Desktop/plant/pages/index/index.vue"]]);
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
  var App = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "C:/Users/gkq/Desktop/plant/App.vue"]]);
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
