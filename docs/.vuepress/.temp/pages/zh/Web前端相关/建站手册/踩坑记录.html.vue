<template><div><h2 id="error-from-chokidar-d-error-ebusy-resource-busy-or-locked-lstat-d-xxx" tabindex="-1"><a class="header-anchor" href="#error-from-chokidar-d-error-ebusy-resource-busy-or-locked-lstat-d-xxx" aria-hidden="true">#</a> Error from chokidar (D:): Error: EBUSY: resource busy or locked, lstat 'D:xxx'</h2>
<p>npm run dev之后报错，这里我是因为在某个.md文件中引入了自定义组件，因为这个框架dev时会自动把components目录下的组件自动全局注册，无需我们引入，把该行import去掉就行了。</p>
<h2 id="在-md文件中-使用jq动态添加了video标签并含src属性-部署到gitee-pages后发现视频资源找不到-404-not-found" tabindex="-1"><a class="header-anchor" href="#在-md文件中-使用jq动态添加了video标签并含src属性-部署到gitee-pages后发现视频资源找不到-404-not-found" aria-hidden="true">#</a> 在.md文件中，使用jq动态添加了video标签并含src属性，部署到gitee pages后发现视频资源找不到（404 not found）</h2>
<p>首先如果是部署到gitee pages、github page上，需要在config.js中配置base:/'你的仓库名'/。比如我的仓库名是gaosen</p>
<div class="custom-container tip">
<p class="custom-container-title">提示</p>
<p>我试过如果使用腾讯云静态托管，它的根路径就是它默认给的域名，所以不用配置base，默认的就行</p>
</div>
<p>容易发现此src不含/'repo'/.然而我们已经在config.js中配置了base: /'gaosen'/，这是因为jq动态添加的video的src属性在打包后不会自动添加/'repo'/，我的解决方法是jq添加src时就直接写成/gaosen/img/bg.mp4</p>
<div class="custom-container tip">
<p class="custom-container-title">提示</p>
<p>显然这样写src虽然在gitee pages上能正常访问，但在本地测试会404.所以我干脆在public文件夹下新建文件夹gaosen，视频资源放入，则有/gaosen/img/bg.mp4
<br>
更合理的解决方法：<a href="https://vuepress.vuejs.org/zh/guide/assets.html#%E5%85%AC%E5%85%B1%E6%96%87%E4%BB%B6" target="_blank" rel="noopener noreferrer">官方文档<ExternalLinkIcon/></a></p>
<p>我一开始没好好看文档，吃亏了...所以希望大家都能好好的看文档</p>
</div>
<h2 id="end-of-the-stream-or-a-document-separator-is-expected-at-line-3-column-6" tabindex="-1"><a class="header-anchor" href="#end-of-the-stream-or-a-document-separator-is-expected-at-line-3-column-6" aria-hidden="true">#</a> end of the stream or a document separator is expected at line 3, column 6:</h2>
<p>指注意空格</p>
<h2 id="can-not-read-a-block-mapping-entry-a-multiline-key-may-not-be-an-implicit-key" tabindex="-1"><a class="header-anchor" href="#can-not-read-a-block-mapping-entry-a-multiline-key-may-not-be-an-implicit-key" aria-hidden="true">#</a> can not read a block mapping entry; a multiline key may not be an implicit key</h2>
<p>冒号后面少了空格</p>
<h2 id="自定义组件中禁用图片放大插件" tabindex="-1"><a class="header-anchor" href="#自定义组件中禁用图片放大插件" aria-hidden="true">#</a> 自定义组件中禁用图片放大插件</h2>
<p>需要这样做：自定义类名&quot;myImgBox&quot;，并在插件的选项中这样配置：<img src="@source/zh/Web前端相关/建站手册/img_1.png" alt="img_1.png" loading="lazy"></p>
<h2 id="项目打包时报错-error-jquery-requires-a-window-with-a-document" tabindex="-1"><a class="header-anchor" href="#项目打包时报错-error-jquery-requires-a-window-with-a-document" aria-hidden="true">#</a> 项目打包时报错:Error: jQuery requires a window with a document</h2>
<p>在stackoverflow上查到：
As Nuxt also renders on the Server you can't use JS that relies on window because on server render it's not available.
Put your jQuery scripts into the mounted() hook. Check this guide</p>
<h2 id="项目打包时报错-vue-warn-error-in-data-referenceerror-window-is-not-defined" tabindex="-1"><a class="header-anchor" href="#项目打包时报错-vue-warn-error-in-data-referenceerror-window-is-not-defined" aria-hidden="true">#</a> 项目打包时报错：[Vue warn]: Error in data(): &quot;ReferenceError: window is not defined&quot;</h2>
<p>同上，出现这个问题的原因是：在Node环境运行浏览器环境中的代码，node端不存在window对象。</p>
<p>Web中使用JavaScript，BOM是核心，而BOM的核心对象是window</p>
<p>解决办法如stackoverflow中所说，把含window对象的代码放到mounted()中</p>
<h2 id="vuepress-图片资源中文路径问题" tabindex="-1"><a class="header-anchor" href="#vuepress-图片资源中文路径问题" aria-hidden="true">#</a> Vuepress 图片资源中文路径问题</h2>
<p>参考[博客](<a href="https://segmentfault.com/a/1190000022275001" target="_blank" rel="noopener noreferrer">Vuepress 图片资源中文路径问题<ExternalLinkIcon/></a>)</p>
<div class="custom-container tip">
<p class="custom-container-title">提示</p>
<p>使用 <a href="https://link.segmentfault.com/?enc=HJcBEGQavzeCLEyorJA4QA%3D%3D.mmarSRpO3oNjabIHOXBN%2FQ%3D%3D" target="_blank" rel="noopener noreferrer">Typora<ExternalLinkIcon/></a> 编写 Markdown 文件，其中的图片路径含中文时，不能被正常编译</p>
</div>
<ol>
<li>首先，typro设置成这样：</li>
</ol>
<p><img src="@source/zh/Web前端相关/建站手册/踩坑记录.assets/image-20220524175912591.png" alt="image-20220524175912591" loading="lazy"></p>
<ol start="2">
<li>
<p>安装 <code v-pre>markdown-it-disable-url-encode</code></p>
<p><code>npm i markdown-it-disable-url-encode</code></p>
</li>
<li>
<p><code>.vuepress/config.js</code></p>
</li>
</ol>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token comment">// .....</span>
  <span class="token literal-property property">markdown</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token comment">// ......</span>
    <span class="token function-variable function">extendMarkdown</span><span class="token operator">:</span> <span class="token parameter">md</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
      md<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span><span class="token function">require</span><span class="token punctuation">(</span><span class="token string">"markdown-it-disable-url-encode"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这样Typora 编写的含中文路径的图片资源的 markdown 文件就可以在<code v-pre>vuepress</code>中完美编译，可以一心写文档了。</p>
<h2 id="使用vercel部署到线上" tabindex="-1"><a class="header-anchor" href="#使用vercel部署到线上" aria-hidden="true">#</a> 使用vercel部署到线上</h2>
<h2 id="下次遇到新的坑再更新" tabindex="-1"><a class="header-anchor" href="#下次遇到新的坑再更新" aria-hidden="true">#</a> 下次遇到新的坑再更新</h2>
</div></template>


