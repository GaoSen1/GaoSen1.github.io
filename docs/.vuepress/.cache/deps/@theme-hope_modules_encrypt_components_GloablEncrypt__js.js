import {
  PasswordModal_default,
  useGlobalEcrypt
} from "./chunk-VK7LPIUT.js";
import "./chunk-2T2XIH66.js";
import "./chunk-XTTSXGMF.js";
import "./chunk-M6P24VQ2.js";
import "./chunk-ANKY43RT.js";
import "./chunk-TYRIGETP.js";
import "./chunk-E7KEG4JQ.js";
import {
  defineComponent,
  h
} from "./chunk-ZYRIB4P5.js";
import "./chunk-YTQSFUAA.js";
import "./chunk-BPKF3OQJ.js";

// node_modules/.pnpm/vuepress-theme-hope@2.0.0-beta.103/node_modules/vuepress-theme-hope/lib/client/modules/encrypt/components/GloablEncrypt.js
var GloablEncrypt_default = defineComponent({
  name: "GlobalEncrypt",
  setup(_props, { slots }) {
    const { isGlobalEncrypted, validateGlobalToken } = useGlobalEcrypt();
    return () => {
      var _a;
      return isGlobalEncrypted.value ? h(PasswordModal_default, { full: true, onVerify: validateGlobalToken }) : ((_a = slots["default"]) == null ? void 0 : _a.call(slots)) || null;
    };
  }
});

// dep:@theme-hope_modules_encrypt_components_GloablEncrypt__js
var theme_hope_modules_encrypt_components_GloablEncrypt_js_default = GloablEncrypt_default;
export {
  theme_hope_modules_encrypt_components_GloablEncrypt_js_default as default
};
//# sourceMappingURL=@theme-hope_modules_encrypt_components_GloablEncrypt__js.js.map
