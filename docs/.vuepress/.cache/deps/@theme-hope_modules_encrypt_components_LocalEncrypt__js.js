import {
  PasswordModal_default,
  usePathEncrypt
} from "./chunk-IFEECQEO.js";
import "./chunk-MI5LLHVC.js";
import "./chunk-6XTULYFI.js";
import "./chunk-GPV43ANE.js";
import "./chunk-ANKY43RT.js";
import "./chunk-3PS27LUP.js";
import "./chunk-5OCNPY23.js";
import {
  defineComponent,
  h
} from "./chunk-Q5ZHDAOU.js";
import "./chunk-5WH6ZM22.js";
import "./chunk-BPKF3OQJ.js";

// node_modules/.pnpm/vuepress-theme-hope@2.0.0-beta.104/node_modules/vuepress-theme-hope/lib/client/modules/encrypt/components/LocalEncrypt.js
var LocalEncrypt_default = defineComponent({
  name: "LocalEncrypt",
  setup(_props, { slots }) {
    const { isEncrypted, validateToken } = usePathEncrypt();
    return () => {
      var _a;
      return isEncrypted.value ? h(PasswordModal_default, { full: true, onVerify: validateToken }) : ((_a = slots["default"]) == null ? void 0 : _a.call(slots)) || null;
    };
  }
});

// dep:@theme-hope_modules_encrypt_components_LocalEncrypt__js
var theme_hope_modules_encrypt_components_LocalEncrypt_js_default = LocalEncrypt_default;
export {
  theme_hope_modules_encrypt_components_LocalEncrypt_js_default as default
};
//# sourceMappingURL=@theme-hope_modules_encrypt_components_LocalEncrypt__js.js.map
