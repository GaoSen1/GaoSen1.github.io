export const data = JSON.parse("{\"key\":\"v-3ef7b7aa\",\"path\":\"/zh/%E8%AF%BE%E7%A8%8B%E5%AE%9E%E9%AA%8C/%E4%B8%93%E4%B8%9A%E5%AE%9E%E9%AA%8C/05_chessx2.html\",\"title\":\"象棋的设计(4):搜索算法\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"象棋的设计(4):搜索算法\",\"summary\":\"摘要 这一节介绍棋子的搜索算法 局面评估 局面评估，就是判断局面对红方（或黑方）的优势，并把优势量化。棋子价值可用以下不等式表达： 帅 > 车 > 马、炮 > 仕、相 > 兵 棋子价值可以简单量化为： 兵 仕 相 炮 马 车 帅 :--: :--: :--: :--: :--: :--: :--: 10 20 20 40 45 90 1000 \\r但是棋子价值\",\"head\":[[\"meta\",{\"property\":\"og:url\",\"content\":\"https://mister-hope.github.io/zh/%E8%AF%BE%E7%A8%8B%E5%AE%9E%E9%AA%8C/%E4%B8%93%E4%B8%9A%E5%AE%9E%E9%AA%8C/05_chessx2.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"博客演示\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"象棋的设计(4):搜索算法\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}],[\"meta\",{\"property\":\"og:locale:alternate\",\"content\":\"en-US\"}],[\"meta\",{\"property\":\"article:published_time\",\"content\":\"2022-05-24T03:28:00.000Z\"}],[\"link\",{\"rel\":\"alternate\",\"hreflang\":\"en-us\",\"href\":\"https://mister-hope.github.io/en/zh/%E8%AF%BE%E7%A8%8B%E5%AE%9E%E9%AA%8C/%E4%B8%93%E4%B8%9A%E5%AE%9E%E9%AA%8C/05_chessx2.html\"}]]},\"excerpt\":\"\",\"headers\":[{\"level\":2,\"title\":\"局面评估\",\"slug\":\"局面评估\",\"link\":\"#局面评估\",\"children\":[]},{\"level\":2,\"title\":\"搜索算法\",\"slug\":\"搜索算法\",\"link\":\"#搜索算法\",\"children\":[]}],\"readingTime\":{\"minutes\":2.32,\"words\":697},\"filePathRelative\":\"zh/课程实验/专业实验/05_chessx2.md\"}")

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updatePageData) {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ data }) => {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  })
}
