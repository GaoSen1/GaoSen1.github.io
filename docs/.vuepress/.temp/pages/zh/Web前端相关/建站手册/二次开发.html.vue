<template><div><h2 id="修改背景色" tabindex="-1"><a class="header-anchor" href="#修改背景色" aria-hidden="true">#</a> 修改背景色</h2>
<p><a href="https://vuepress-theme-reco.recoluan.com/views/1.x/customStyleAndScript.html" target="_blank" rel="noopener noreferrer">reco主题文档<ExternalLinkIcon/></a>给出了一些选项，<a href="https://vuepress.vuejs.org/zh/config/#palette-styl" target="_blank" rel="noopener noreferrer">vuepress文档<ExternalLinkIcon/></a>给出了所有可调整的主题变量。总而言之要新建<code>.vuepress/styles/palette.styl</code>或<code>.vuepress/styles/index.styl</code></p>
<p>但在设置背景色过程中发现<code>palette.styl</code>文件中设置的不生效，经过多处寻找，发现网站的根标签html设置了内联样式style，<code>palette.styl</code>被覆盖。为了解决该问题，引入外部js文件，在dom渲染、html被reco主题附加内联样式之后，手动修改其内联样式。如我新建了一个js文件<code>RemoveRecoDark.js</code>:</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">/*修改一些默认reco主题色*/</span>
<span class="token keyword">function</span> <span class="token function">adjustRecoColor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">let</span> myStyle <span class="token operator">=</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">--default-color-10: rgba(0, 0, 0, 1);
    --default-color-9: rgba(0, 0, 0, 0.9);
    --default-color-8: rgba(0, 0, 0, 0.8);
    --default-color-7: rgba(0, 0, 0, 0.7);
    --default-color-6: rgba(0, 0, 0, 0.6);
    --default-color-5: rgba(0, 0, 0, 0.5);
    --default-color-4: rgba(0, 0, 0, 0.4);
    --default-color-3: rgba(0, 0, 0, 0.3);
    --default-color-2: rgba(0, 0, 0, 0.2);
    --default-color-1: rgba(0, 0, 0, 0.1);
    --background-color: #1d2025;
    --box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.6);
    --box-shadow-hover: 0 2px 16px 0 rgba(0, 0, 0, 0.7);
    --text-color: rgba(255, 255, 255, 0.8);
    --text-color-sub: #8B8B8B;
    --border-color: rgba(0, 0, 0, 0.3);
    --code-color: rgba(0, 0, 0, 0.3);
    --mask-color: #000;</span><span class="token template-punctuation string">`</span></span>
  <span class="token function">$</span><span class="token punctuation">(</span><span class="token string">'html.dark'</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">attr</span><span class="token punctuation">(</span><span class="token string">'style'</span><span class="token punctuation">,</span>myStyle<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token comment">/*根据向下滚动举例调整导航栏透明度*/</span>
<span class="token keyword">function</span> <span class="token function">adjustHeadBar</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token function">$</span><span class="token punctuation">(</span>window<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">scroll</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> scrollTop <span class="token operator">=</span> <span class="token number">80</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token function">$</span><span class="token punctuation">(</span>window<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">scrollTop</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">></span> scrollTop<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token function">$</span><span class="token punctuation">(</span><span class="token string">'header.navbar'</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">attr</span><span class="token punctuation">(</span><span class="token string">'style'</span><span class="token punctuation">,</span> <span class="token string">'background: var(--background-color);'</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">else</span> <span class="token punctuation">{</span>
      <span class="token function">$</span><span class="token punctuation">(</span><span class="token string">'header.navbar'</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">attr</span><span class="token punctuation">(</span><span class="token string">'style'</span><span class="token punctuation">,</span> <span class="token string">'background: none;'</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token function">$</span><span class="token punctuation">(</span>document<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">ready</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  <span class="token function">setInterval</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token function">adjustRecoColor</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span><span class="token number">1000</span><span class="token punctuation">)</span>
  <span class="token function">adjustHeadBar</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上述代码中的myStyle当然不是手打的，而是在浏览器中复制了reco主题html标签的样式，然后只改了其中的<code>--background-color</code>属性值。</p>
<p>使用定时器<code>setInterval</code>函数，是因为发现当页面路由跳转到/timeline、/category等处时，reco默认的html样式又会重新覆盖我设置的。</p>
<h2 id="修改导航栏透明度" tabindex="-1"><a class="header-anchor" href="#修改导航栏透明度" aria-hidden="true">#</a> 修改导航栏透明度</h2>
<p>在上面贴出的js代码中<code>adjustHeadBar</code>函数就是所求。</p>
<p>上述<code>adjustHeadBar</code>即为所求。关键是<code>$(window).scroll()、$(window).scrollTop()</code>的使用。</p>
<h2 id="设置首页动态背景" tabindex="-1"><a class="header-anchor" href="#设置首页动态背景" aria-hidden="true">#</a> 设置首页动态背景</h2>
<p>嗯，其实就是放一个video标签，关键是找到dom的位置。在工程目录的node_modules下找到<code>vuepress-theme-reco/components/HomeBlog/index.vue</code>，这个文件就是博客首页了，自己<s>魔改一番</s>。如图：</p>
<p><img src="@source/zh/Web前端相关/建站手册/二次开发.assets/image-20220513202518644.png" alt="image-20220513202518644" loading="lazy"></p>
<div class="custom-container tip">
<p class="custom-container-title">提示</p>
<p>是不是蛮简单的。但是这修改的是reco主题的源码，原则上是不可以修改node_modules下的文件的，你在修改时IDE也会提示你。而且这种修改也不好触发热重载，必须重新<code>npm run dev</code>才会生效。但是我在这我说了算😆。</p>
</div>
<p>当然你可以在首页的README.md中的<code>script</code>标签中动态添加、删除dom元素，以实现想要的效果；而且这是可以触发热重载的。但是这样会使README.md很冗余，编写js代码时不会有自动换行缩进，代码联想补全较少，代码高亮也不如直接的js文件。总之开发体验不是很好。而且我还遇到过一些谜之bug：在本地运行良好，部署到服务器上丢失了某些效果...所以我还是选择动了node_modules。可能有更好的解决办法不修改node_modules，但其实修改node_modules也不是什么罪恶滔天之事，正所谓</p>
<blockquote>
<p>“不管黑猫白猫，能抓到老鼠的就是好猫。”</p>
</blockquote>
<p>我的评价是：“能实现效果就行”。😋</p>
<hr>
<h2 id="后续更新-关于修改颜色的终极方案" tabindex="-1"><a class="header-anchor" href="#后续更新-关于修改颜色的终极方案" aria-hidden="true">#</a> 后续更新：关于修改颜色的终极方案</h2>
<p>上述做法虽然能达到效果，但是感觉不合常理、不优雅、蛮丑陋的😦。在我参考了一篇关于<a href="https://blog.csdn.net/jaykm/article/details/106214527" target="_blank" rel="noopener noreferrer">设计黑暗/亮色模式的博客<ExternalLinkIcon/></a>以及<a href="https://github.com/zpj80231/znote" target="_blank" rel="noopener noreferrer">其他人的vuepress开源库<ExternalLinkIcon/></a>之后，以下的做法更加优雅（嗯而且可以触发触发热重载😋）</p>
<p>来到node_modules下的<code>vuepress-theme-reco</code>,直接拷贝到<code>docs/.vuepress</code>，且更名为<code>theme</code>.此时的文件夹目录如图：</p>
<p><img src="@source/zh/Web前端相关/建站手册/二次开发.assets/image-20220524091503374.png" alt="image-20220524091503374" loading="lazy"></p>
<p>然后去到<code>theme/components/Mode/modeOptions.js</code>里修改它的颜色变量，该文件内容大致如下：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> modeOptions <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">light</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token string-property property">'--default-color-10'</span><span class="token operator">:</span> <span class="token string">'rgba(255, 255, 255, 1)'</span><span class="token punctuation">,</span>
    <span class="token string-property property">'--default-color-9'</span><span class="token operator">:</span> <span class="token string">'rgba(255, 255, 255, .9)'</span><span class="token punctuation">,</span>
    <span class="token string-property property">'--default-color-8'</span><span class="token operator">:</span> <span class="token string">'rgba(255, 255, 255, .8)'</span><span class="token punctuation">,</span>
    <span class="token string-property property">'--default-color-7'</span><span class="token operator">:</span> <span class="token string">'rgba(255, 255, 255, .7)'</span><span class="token punctuation">,</span>
    <span class="token string-property property">'--default-color-6'</span><span class="token operator">:</span> <span class="token string">'rgba(255, 255, 255, .6)'</span><span class="token punctuation">,</span>
     <span class="token comment">/* ...... */</span>
  <span class="token punctuation">}</span>
  <span class="token literal-property property">dark</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token string-property property">'--default-color-10'</span><span class="token operator">:</span> <span class="token string">'rgba(29, 32, 37, 1)'</span><span class="token punctuation">,</span>
    <span class="token string-property property">'--default-color-9'</span><span class="token operator">:</span> <span class="token string">'rgba(29, 32, 37, .9)'</span><span class="token punctuation">,</span>
    <span class="token string-property property">'--default-color-8'</span><span class="token operator">:</span> <span class="token string">'rgba(29, 32, 37, .8)'</span><span class="token punctuation">,</span>
    <span class="token string-property property">'--default-color-7'</span><span class="token operator">:</span> <span class="token string">'rgba(29, 32, 37, .7)'</span><span class="token punctuation">,</span>
    <span class="token string-property property">'--default-color-6'</span><span class="token operator">:</span> <span class="token string">'rgba(29, 32, 37, .6)'</span><span class="token punctuation">,</span>
    <span class="token comment">/* ...... */</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后修改里面的颜色值就可以触发热重载改变一些reco主题的颜色。而且在浏览器中根据vue-tools快速找到页面内容对应的组件后，就可以在该<code>components</code>目录下自己修改任何reco主题的组件了~</p>
<p>比如我修改了导航栏一开始是透明的，滚动条下移80px后才不透明：</p>
<p>在<code>docs/.vuepress/theme/components/Navbar.vue</code>里简单自己写了一个函数：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">adjustHeadBar</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token function">$</span><span class="token punctuation">(</span>window<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">scroll</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        <span class="token keyword">let</span> scrollTop <span class="token operator">=</span> <span class="token number">80</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token function">$</span><span class="token punctuation">(</span>window<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">scrollTop</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">></span> scrollTop<span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token function">$</span><span class="token punctuation">(</span><span class="token string">'header.navbar'</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">attr</span><span class="token punctuation">(</span><span class="token string">'style'</span><span class="token punctuation">,</span> <span class="token string">'background: var(--background-color);'</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">else</span> <span class="token punctuation">{</span>
          <span class="token function">$</span><span class="token punctuation">(</span><span class="token string">'header.navbar'</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">attr</span><span class="token punctuation">(</span><span class="token string">'style'</span><span class="token punctuation">,</span> <span class="token string">'background: none;'</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token function">adjustHeadBar</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container warning">
<p class="custom-container-title">注意</p>
<p>现在这种做法既可以触发热重载，又不修改作者的源码，比起之前直接修改node_modules下文件的做法要优雅。但是这同样意味着不能更新作者的代码(而之前的做法由于只是增添了脚本，而且脚本只是关于主题颜色中的几个颜色，影响不大)。不过博主当前的使用版本应该是1.x中的最新了，更新版的在2.x了，作者似乎也没有写迁移文档呢，难道是不能迁移？</p>
</div>
<h2 id="首页打字机效果" tabindex="-1"><a class="header-anchor" href="#首页打字机效果" aria-hidden="true">#</a> 首页打字机效果</h2>
<p><s>同样来到node_modules下的<code>vuepress-theme-reco/components/HomeBlog</code>创建一个<code>ShowFont.vue</code>。</s></p>
<p><code>docs/.vuepress/theme/components/HomeBlog/ShowFont.vue</code></p>
<p>这个组件就是打字机效果的组件，具体怎么写，可参考<a href="https://www.bilibili.com/video/BV1Rz4y1D7Lp?p=24" target="_blank" rel="noopener noreferrer">B站教程<ExternalLinkIcon/></a>。<s>这里主要想说的是在什么地方引入使用改组件。很简单，还是在<code>vuepress-theme-reco/components/HomeBlog/index.vue</code></s> 在<code>docs/.vuepress/theme/components/HomeBlog/index.vue</code>的如图位置引用:</p>
<p><img src="@source/zh/Web前端相关/建站手册/二次开发.assets/image-20220513205215091.png" alt="image-20220513205215091" loading="lazy"></p>
<h2 id="vuepress中引入element-ui" tabindex="-1"><a class="header-anchor" href="#vuepress中引入element-ui" aria-hidden="true">#</a> vuepress中引入element UI</h2>
<p>在<code>docs/.vuepress</code>下新建<code>enhanceApp.js</code>，该文件的一些说明可参考<a href="https://vuepress.vuejs.org/zh/guide/basic-config.html#%E5%BA%94%E7%94%A8%E7%BA%A7%E5%88%AB%E7%9A%84%E9%85%8D%E7%BD%AE" target="_blank" rel="noopener noreferrer">官方文档<ExternalLinkIcon/></a>.</p>
<p>在该文件中这样写:</p>
<div class="language-vue ext-vue line-numbers-mode"><pre v-pre class="language-vue"><code>import ElementUI from "element-ui";
import 'element-ui/lib/theme-chalk/index.css'
export default ({
                  Vue, // the version of Vue being used in the VuePress app
                  // options, // the options for the root Vue instance
                  // router, // the router instance for the app
                  // siteData // site metadata
                }) => {
  Vue.use(ElementUI);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>虽然但是，我出现了报错：<code>Cannot find module 'core-js/library/xxx' when import element-ui</code>。<a href="https://blog.csdn.net/qq_32855007/article/details/108726430" target="_blank" rel="noopener noreferrer">参考文章<ExternalLinkIcon/></a>.大概是版本号的问题。需执行<code>yarn add async-validator@1.11.5</code>或<code>npm install async-validator@1.11.5</code>,重新运行就可以了~</p>
<p>虽然但是，这些组件没有适配移动端，以下给出几个组件的适配代码：</p>
<p>在<code>docs/.vuepress/styles/index.styl</code>中：</p>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code><span class="token comment">/*弹窗*/</span>
<span class="token atrule"><span class="token rule">@media</span> screen <span class="token keyword">and</span> <span class="token punctuation">(</span><span class="token property">max-width</span><span class="token punctuation">:</span> 500px<span class="token punctuation">)</span></span> <span class="token punctuation">{</span>
  <span class="token selector">.el-message</span> <span class="token punctuation">{</span>
    <span class="token property">min-width</span><span class="token punctuation">:</span> 300px <span class="token important">!important</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token atrule"><span class="token rule">@media</span> screen <span class="token keyword">and</span> <span class="token punctuation">(</span><span class="token property">max-width</span><span class="token punctuation">:</span> 500px<span class="token punctuation">)</span></span> <span class="token punctuation">{</span>
  <span class="token selector">.el-message-box</span><span class="token punctuation">{</span>
    <span class="token property">width</span><span class="token punctuation">:</span> 300px <span class="token important">!important</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="引入mermaid" tabindex="-1"><a class="header-anchor" href="#引入mermaid" aria-hidden="true">#</a> 引入<a href="https://github.com/mermaid-js/mermaid" target="_blank" rel="noopener noreferrer">mermaid<ExternalLinkIcon/></a></h2>
<ul>
<li>npm i mermaid</li>
<li>npm i vuepress-plugin-mermaidjs</li>
</ul>
<div class="custom-container tip">
<p class="custom-container-title">提示</p>
<p>一定要两个都下载！其中mermaidjs是插件要在config.js中填入。如果不装mermaid会报错can not find mermaid之类的，我也不知这个插件为什么没有集成mermaid，难道是为了体量..？具体说明在其<a href="https://vuepress-plugin-mermaidjs.efrane.com/" target="_blank" rel="noopener noreferrer">文档<ExternalLinkIcon/></a>。</p>
<p>🤕找了半天的官方文档，最后在npm的github链接处找到了。我真是个笨蛋，npm逛了那么久都没注意，以为如果<a href="https://www.npmjs.com/package/vuepress-plugin-mermaidjs" target="_blank" rel="noopener noreferrer">npm<ExternalLinkIcon/></a>处没有文档说明就没有了，毕竟好多插件都这样。。。</p>
</div>
<p>效果：</p>
<Mermaid id="mermaid-64a56fec" code="flowchart%20LR%0AA%5BHard%5D%20--%3E%7CText%7C%20B(Round)%0AB%20--%3E%20C%7BDecision%7D%0AC%20--%3E%7COne%7C%20D%5BResult%201%5D%0AC%20--%3E%7CTwo%7C%20E%5BResult%202%5D%0A"></Mermaid><p>还有一种用法顺嘴一说（不感兴趣的跳过）：</p>
<p>下载<code>npm i mermaid</code>,在<code>docs/.vuepress/enhanceApp.js</code>下引入并初始化：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> Mermaid <span class="token keyword">from</span> <span class="token string">'mermaid'</span>
Mermaid<span class="token punctuation">.</span><span class="token function">initialize</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token literal-property property">startOnLoad</span><span class="token operator">:</span><span class="token boolean">true</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>在markdown文件或一般的html中这样使用:</p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>mermaid<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
flowchart LR

A[Hard] -->|Text| B(Round)
B --> C{Decision}
C -->|One| D[Result 1]
C -->|Two| E[Result 2]
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我使用这种方法的时候，第一次进入页面时流程图没有渲染，要刷新后才能渲染，而且切换路由后又会变回原样，试了很多次都这样，我甚至参考了mermaid提供的<a href="https://mermaid-js.github.io/mermaid/#/usage?id=api-usage" target="_blank" rel="noopener noreferrer">API<ExternalLinkIcon/></a>,自己编写了渲染函数，试来试去都没用啊，我想啸啊🤕。一度想在它的github开源库上提issue。。</p>
<h2 id="引入mathjax" tabindex="-1"><a class="header-anchor" href="#引入mathjax" aria-hidden="true">#</a> 引入mathjax</h2>
<p><code>npm i markdown-it-mathjax3</code>,在<code>docs/.vuepress/config.js</code>中引入、使用：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> mathjax3 <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'markdown-it-mathjax3'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">/*...*/</span>

<span class="token literal-property property">markdown</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">lineNumbers</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
    <span class="token function-variable function">extendMarkdown</span><span class="token operator">:</span> <span class="token parameter">md</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
      md<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>mathjax3<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这样在typro中键入的数学公式就可以正常渲染了，如图</p>
<p><img src="@source/zh/Web前端相关/建站手册/二次开发.assets/image-20220524170715873.png" alt="image-20220524170715873" loading="lazy"></p>
<h2 id="引入echarts" tabindex="-1"><a class="header-anchor" href="#引入echarts" aria-hidden="true">#</a> 引入echarts</h2>
<p>根据官方文档，可以这样引入：</p>
<ul>
<li>npm i echarts</li>
<li>CDN引入</li>
<li>下载js文件到本地</li>
</ul>
<p>但我在使用过程中，前两种方法都失效了，据说应该在<code v-pre>mounted</code>之后动态引入，而我不会🤕, 最终选择了第三种方式。</p>
<h2 id="使用vuepress-plugin-auto-sidebar" tabindex="-1"><a class="header-anchor" href="#使用vuepress-plugin-auto-sidebar" aria-hidden="true">#</a> 使用vuepress-plugin-auto-sidebar</h2>
<p><a href="https://shanyuhai123.github.io/vuepress-plugin-auto-sidebar/zh/" target="_blank" rel="noopener noreferrer">文档地址<ExternalLinkIcon/></a>。</p>
<p>安装：<code v-pre>npm i vuepress-plugin-auto-sidebar -D</code></p>
<p>使用：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">plugins</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token punctuation">[</span><span class="token string">"vuepress-plugin-auto-sidebar"</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
      <span class="token comment">// options</span>
    <span class="token punctuation">}</span><span class="token punctuation">]</span>
  <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>vuepress nav docs
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>会生成一个nav.js文件，引用它。</p>
<div class="custom-container tip">
<p class="custom-container-title">提示</p>
<p><a href="http://xn--README-9m7i9kb25rwz4c7x6apdex6te88h49ya.md" target="_blank" rel="noopener noreferrer">每个文件夹都要有一个README.md<ExternalLinkIcon/></a>，否则会出现404</p>
</div>
<h3 id="多个分组" tabindex="-1"><a class="header-anchor" href="#多个分组" aria-hidden="true">#</a> 多个分组</h3>
<p>如果希望<strong>一个文件夹内</strong>的文件再进一步分组：</p>
<div class="language-markdown ext-md line-numbers-mode"><pre v-pre class="language-markdown"><code><span class="token front-matter-block"><span class="token punctuation">---</span>
<span class="token front-matter yaml language-yaml"><span class="token key atrule">autoGroup-2</span><span class="token punctuation">:</span> 数组方法
<span class="token comment"># autoGroup+10: group10</span></span>
<span class="token punctuation">---</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其中 <code v-pre>-</code> 和 <code v-pre>+</code> 二者选其一，<code v-pre>-</code> 代表在默认分组的下方，<code v-pre>+</code> 代表在默认分组的上方，符号后面的数字会进一步决定分组的排序。</p>
<h3 id="隐藏文件" tabindex="-1"><a class="header-anchor" href="#隐藏文件" aria-hidden="true">#</a> 隐藏文件</h3>
<p>当你有文件不想显示在侧边栏时：</p>
<div class="language-markdown ext-md line-numbers-mode"><pre v-pre class="language-markdown"><code><span class="token front-matter-block"><span class="token punctuation">---</span>
<span class="token front-matter yaml language-yaml"><span class="token key atrule">autoIgnore</span><span class="token punctuation">:</span> <span class="token boolean important">true</span></span>
<span class="token punctuation">---</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


