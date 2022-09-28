import {
  useScrollPromise
} from "./chunk-6XTULYFI.js";
import "./chunk-GPV43ANE.js";
import "./chunk-ANKY43RT.js";
import "./chunk-3PS27LUP.js";
import "./chunk-5OCNPY23.js";
import {
  Transition,
  defineComponent,
  h
} from "./chunk-Q5ZHDAOU.js";
import "./chunk-5WH6ZM22.js";
import "./chunk-BPKF3OQJ.js";

// node_modules/.pnpm/vuepress-theme-hope@2.0.0-beta.104/node_modules/vuepress-theme-hope/lib/client/components/transitions/FadeSlideY.js
import "D:/CodingForFun/Vue/blog/node_modules/.pnpm/vuepress-theme-hope@2.0.0-beta.104/node_modules/vuepress-theme-hope/lib/client/styles/fade-slide-y.scss";
var FadeSlideY_default = defineComponent({
  name: "FadeSlideY",
  setup(_props, { slots }) {
    const scrollPromise = useScrollPromise();
    const onBeforeEnter = scrollPromise.resolve;
    const onBeforeLeave = scrollPromise.pending;
    return () => h(Transition, {
      name: "fade-slide-y",
      mode: "out-in",
      onBeforeEnter,
      onBeforeLeave
    }, () => {
      var _a;
      return (_a = slots["default"]) == null ? void 0 : _a.call(slots);
    });
  }
});

// dep:@theme-hope_components_transitions_FadeSlideY__js
var theme_hope_components_transitions_FadeSlideY_js_default = FadeSlideY_default;
export {
  theme_hope_components_transitions_FadeSlideY_js_default as default
};
//# sourceMappingURL=@theme-hope_components_transitions_FadeSlideY__js.js.map
