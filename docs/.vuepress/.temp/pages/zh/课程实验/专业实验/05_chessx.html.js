export const data = JSON.parse("{\"key\":\"v-727b1415\",\"path\":\"/zh/%E8%AF%BE%E7%A8%8B%E5%AE%9E%E9%AA%8C/%E4%B8%93%E4%B8%9A%E5%AE%9E%E9%AA%8C/05_chessx.html\",\"title\":\"象棋的设计(3):电脑自动走棋\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"象棋的设计(3):电脑自动走棋\",\"summary\":\"摘要 这一节，程序将可以自动行棋。但仅仅是走了一步符合象棋规则的棋，电脑智商为0。 走法生成 将（帅） 使用一个辅助数组表示这四个方向： let KING_DELTA = [-16, -1, 1, 16]; 已知帅在一维棋局数组中的起点位置sqSrc。生成帅的走法，就是获取帅全部的合法终点sqDes。使用一个数组存储所有可能的走法，伪代码如下： 仕 同样使用\",\"head\":[[\"meta\",{\"property\":\"og:url\",\"content\":\"https://mister-hope.github.io/zh/%E8%AF%BE%E7%A8%8B%E5%AE%9E%E9%AA%8C/%E4%B8%93%E4%B8%9A%E5%AE%9E%E9%AA%8C/05_chessx.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"博客演示\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"象棋的设计(3):电脑自动走棋\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:image\",\"content\":\"https://mister-hope.github.io/\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}],[\"meta\",{\"property\":\"og:locale:alternate\",\"content\":\"en-US\"}],[\"meta\",{\"name\":\"twitter:card\",\"content\":\"summary_large_image\"}],[\"meta\",{\"name\":\"twitter:image:alt\",\"content\":\"象棋的设计(3):电脑自动走棋\"}],[\"meta\",{\"property\":\"article:published_time\",\"content\":\"2022-05-17T11:32:00.000Z\"}],[\"link\",{\"rel\":\"alternate\",\"hreflang\":\"en-us\",\"href\":\"https://mister-hope.github.io/en/zh/%E8%AF%BE%E7%A8%8B%E5%AE%9E%E9%AA%8C/%E4%B8%93%E4%B8%9A%E5%AE%9E%E9%AA%8C/05_chessx.html\"}]]},\"excerpt\":\"\",\"headers\":[{\"level\":2,\"title\":\"走法生成\",\"slug\":\"走法生成\",\"link\":\"#走法生成\",\"children\":[{\"level\":3,\"title\":\"将（帅）\",\"slug\":\"将-帅\",\"link\":\"#将-帅\",\"children\":[]},{\"level\":3,\"title\":\"仕\",\"slug\":\"仕\",\"link\":\"#仕\",\"children\":[]},{\"level\":3,\"title\":\"象\",\"slug\":\"象\",\"link\":\"#象\",\"children\":[]},{\"level\":3,\"title\":\"马\",\"slug\":\"马\",\"link\":\"#马\",\"children\":[]},{\"level\":3,\"title\":\"车\",\"slug\":\"车\",\"link\":\"#车\",\"children\":[]},{\"level\":3,\"title\":\"炮\",\"slug\":\"炮\",\"link\":\"#炮\",\"children\":[]},{\"level\":3,\"title\":\"兵\",\"slug\":\"兵\",\"link\":\"#兵\",\"children\":[]}]}],\"readingTime\":{\"minutes\":4.69,\"words\":1408},\"filePathRelative\":\"zh/课程实验/专业实验/05_chessx.md\"}")

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
