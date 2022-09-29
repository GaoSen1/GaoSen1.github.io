import {
  useAutoLink,
  useThemeLocaleData
} from "./chunk-6XTULYFI.js";
import {
  Ht
} from "./chunk-GPV43ANE.js";
import {
  AutoLink_default
} from "./chunk-HUF4YNPL.js";
import {
  Icon_default
} from "./chunk-3DQRD7ZQ.js";
import {
  ensureEndingSlash,
  isLinkExternal,
  isPlainObject
} from "./chunk-MOAPKBNV.js";
import {
  client_exports
} from "./chunk-ANKY43RT.js";
import {
  useRoute
} from "./chunk-3PS27LUP.js";
import {
  computed,
  h,
  inject,
  provide
} from "./chunk-Q5ZHDAOU.js";
import {
  isArray,
  isString
} from "./chunk-5WH6ZM22.js";

// node_modules/.pnpm/vuepress-theme-hope@2.0.0-beta.104/node_modules/vuepress-theme-hope/lib/client/modules/sidebar/utils/isActive.js
var isActiveSidebarItem = (route, item, exact = false) => {
  if ("activeMatch" in item)
    return new RegExp(item.activeMatch).test(route.path);
  if (Ht(route, item.link))
    return true;
  if (item.children && !exact)
    return item.children.some((child) => isActiveSidebarItem(route, child));
  return false;
};
var isMatchedSidebarItem = (route, item) => {
  if (item.type === "group")
    return item.children.some((child) => {
      if (child.type === "group")
        return isMatchedSidebarItem(route, child);
      return child.type === "page" && isActiveSidebarItem(route, child, true);
    }) || "prefix" in item && Ht(route, item.prefix);
  return false;
};

// node_modules/.pnpm/vuepress-theme-hope@2.0.0-beta.104/node_modules/vuepress-theme-hope/lib/client/modules/sidebar/composables/render.js
var renderItem = (config, props) => config.link ? h(AutoLink_default, {
  ...props,
  config
}) : h("p", props, [h(Icon_default, { icon: config.icon }), config.text]);
var renderChildren = (children) => {
  const route = useRoute();
  if (!children)
    return null;
  return h("ul", { class: "sidebar-sub-headers" }, children.map((child) => {
    const active = isActiveSidebarItem(route, child, true);
    return h("li", { class: "sidebar-sub-header" }, [
      renderItem(child, {
        class: ["sidebar-link", "heading", { active }]
      }),
      renderChildren(child.children)
    ]);
  }));
};

// node_modules/.pnpm/vuepress-theme-hope@2.0.0-beta.104/node_modules/vuepress-theme-hope/lib/client/modules/sidebar/composables/utils.js
var resolvePrefix = (prefix = "", path = "") => path.startsWith("/") ? path : `${ensureEndingSlash(prefix)}${path}`;

// docs/.vuepress/.temp/theme-hope/sidebar.js
var sidebarData = { "/demo/": ["page.md", "markdown.md", "disable.md", "encrypt.md"], "/posts/": ["strawberry.md", "tomato.md", "dragonfruit.md", "cherry.md"], "/\u7535\u5B50\u7535\u8DEF/\u5E38\u7528\u7535\u8DEF/": ["\u79EF\u5206\u5668.md", "\u6EE4\u6CE2\u5668.md", "\u538B\u63A7\u632F\u8361\u5668.md"], "/\u7535\u5B50\u7535\u8DEF/\u5E38\u7528\u82AF\u7247/": ["\u7EE7\u7535\u5668.md", "CD4046.md", "DDS.md"], "/\u7535\u5B50\u7535\u8DEF/\u653E\u5927\u5668/": ["\u4F60\u597D\uFF0C\u653E\u5927\u5668.md"], "/\u8BFE\u7A0B\u5B9E\u9A8C/\u4E13\u4E1A\u5B9E\u9A8C/": ["01_waveform.md", "02_piano.md", "03_sample.md", "04_prize.md", "\u5B9E\u9A8C\u62A5\u544A.md", "05_chess1.md", "05_chess2.md", "05_chessx.md", "05_chessx2.md", "05_chess_demo.md", "01_waveform_demo.md", "02_piano_demo.md", "03_sample_demo.md", "04_prize_demo.md"], "/\u8BFE\u7A0B\u5B9E\u9A8C/\u5355\u7247\u673A\u5B9E\u9A8C/": ["\u7535\u5B50\u65F6\u949F.md"], "/\u8BFE\u7A0B\u5B9E\u9A8C/\u6570\u7535\u5B9E\u9A8C/": ["\u65F6\u5E8F\u7535\u8DEF\u7684\u8BBE\u8BA1\u4E0E\u5B9E\u73B0.md", "\u968F\u673A\u6570\u751F\u6210\u53CA\u663E\u793A\u7535\u8DEF\u7684\u8BBE\u8BA1\u4E0E\u5B9E\u73B0.md"], "/\u8BFE\u7A0B\u5B9E\u9A8C/\u6982\u7387\u8BBA/": ["\u6982\u7387\u8BBA\u671F\u4E2D\u8BBA\u6587.md"], "/\u8BFE\u7A0B\u5B9E\u9A8C/\u6A21\u7535\u5B9E\u9A8C/": ["\u6676\u4F53\u7BA1\u56FE\u793A\u4EEA.md"], "/\u8BFE\u7A0B\u5B9E\u9A8C/\u7535\u5B50\u9662\u5C0F\u5B66\u671F/": ["\u667A\u80FD\u5E73\u8861\u8F66.md"], "/Web\u524D\u7AEF\u76F8\u5173/\u5DE5\u5177\u5E93/": ["\u5730\u56FE.md", "echarts.md", "\u5F15\u7528\u5B57\u4F53.md"], "/Web\u524D\u7AEF\u76F8\u5173/\u5EFA\u7AD9\u624B\u518C/": ["\u8E29\u5751\u8BB0\u5F55.md", "\u4E8C\u6B21\u5F00\u53D1.md"], "/posts/apple/": ["1.md", "2.md", "3.md", "4.md"], "/posts/banana/": ["1.md", "2.md", "3.md", "4.md"] };

// node_modules/.pnpm/vuepress-theme-hope@2.0.0-beta.104/node_modules/vuepress-theme-hope/lib/client/modules/sidebar/composables/resolveConfig.js
var headerToSidebarItem = (header, headerDepth) => {
  const page = (0, client_exports.usePageData)();
  return {
    type: "heading",
    text: header.title,
    link: `${page.value.path}#${header.slug}`,
    children: headersToSidebarItemChildren(header.children, headerDepth)
  };
};
var headersToSidebarItemChildren = (headers, headerDepth) => headerDepth > 0 ? headers.map((header) => headerToSidebarItem(header, headerDepth - 1)) : [];
var resolveHeadingSidebarItems = (headerDepth) => {
  const page = (0, client_exports.usePageData)();
  return headersToSidebarItemChildren(page.value.headers, headerDepth);
};
var resolveArraySidebarItems = (sidebarConfig, headerDepth, prefix = "") => {
  const page = (0, client_exports.usePageData)();
  const route = useRoute();
  const handleChildItem = (item, pathPrefix = prefix) => {
    var _a;
    const childItem = isString(item) ? useAutoLink(resolvePrefix(pathPrefix, item)) : item.link ? {
      ...item,
      ...!isLinkExternal(item.link) ? { link: useAutoLink(resolvePrefix(pathPrefix, item.link)).link } : {}
    } : item;
    if ("children" in childItem) {
      const prefix2 = resolvePrefix(pathPrefix, childItem.prefix);
      const children = childItem.children === "structure" ? sidebarData[prefix2] : childItem.children;
      return {
        type: "group",
        ...childItem,
        prefix: prefix2,
        children: children.map((item2) => handleChildItem(item2, prefix2))
      };
    }
    return {
      type: "page",
      ...childItem,
      children: childItem.link === route.path ? headersToSidebarItemChildren(
        ((_a = page.value.headers[0]) == null ? void 0 : _a.level) === 1 ? page.value.headers[0].children : page.value.headers,
        headerDepth
      ) : []
    };
  };
  return sidebarConfig.map((item) => handleChildItem(item));
};
var resolveMultiSidebarItems = (sidebarConfig, headerDepth) => {
  const route = useRoute();
  const keys = Object.keys(sidebarConfig).sort((x, y) => y.length - x.length);
  for (const base of keys) {
    if (decodeURI(route.path).startsWith(base)) {
      const matchedConfig = sidebarConfig[base];
      return matchedConfig ? resolveArraySidebarItems(matchedConfig === "structure" ? sidebarData[base] : matchedConfig, headerDepth, base) : [];
    }
  }
  console.warn(`${route.path} do not have valid sidebar config`);
  return [];
};
var resolveSidebarItems = () => {
  var _a, _b, _c, _d;
  const routeLocale = (0, client_exports.useRouteLocale)();
  const frontmatter = (0, client_exports.usePageFrontmatter)();
  const themeLocale = useThemeLocaleData();
  const sidebarConfig = frontmatter.value.home ? false : (_b = (_a = frontmatter.value.sidebar) != null ? _a : themeLocale.value.sidebar) != null ? _b : "structure";
  const headerDepth = (_d = (_c = frontmatter.value.headerDepth) != null ? _c : themeLocale.value.headerDepth) != null ? _d : 2;
  return sidebarConfig === false ? [] : sidebarConfig === "heading" ? resolveHeadingSidebarItems(headerDepth) : sidebarConfig === "structure" ? resolveArraySidebarItems(sidebarData[routeLocale.value], headerDepth, routeLocale.value) : isArray(sidebarConfig) ? resolveArraySidebarItems(sidebarConfig, headerDepth) : isPlainObject(sidebarConfig) ? resolveMultiSidebarItems(sidebarConfig, headerDepth) : [];
};

// node_modules/.pnpm/vuepress-theme-hope@2.0.0-beta.104/node_modules/vuepress-theme-hope/lib/client/modules/sidebar/composables/setup.js
var sidebarItemsSymbol = Symbol.for("sidebarItems");
var setupSidebarItems = () => {
  const sidebarItems = computed(() => resolveSidebarItems());
  provide(sidebarItemsSymbol, sidebarItems);
};
var useSidebarItems = () => {
  const sidebarItems = inject(sidebarItemsSymbol);
  if (!sidebarItems) {
    throw new Error("useSidebarItems() is called without provider.");
  }
  return sidebarItems;
};

export {
  isActiveSidebarItem,
  isMatchedSidebarItem,
  renderItem,
  renderChildren,
  resolvePrefix,
  sidebarItemsSymbol,
  setupSidebarItems,
  useSidebarItems
};
//# sourceMappingURL=chunk-ADDKNDKM.js.map
