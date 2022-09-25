<template><div><p>有时我们的项目会使用到一些特殊的字体，英文字体还好说，一般比较小，中文字体动辄几MB甚至十几MB，如果直接把中文字体的ttf格式文件放到项目中会很影响网页的加载速度。有什么办法可以使项目中引用的字体文件变小呢？</p>
<h2 id="_1-有字库" tabindex="-1"><a class="header-anchor" href="#_1-有字库" aria-hidden="true">#</a> 1.<a href="https://www.webfont.com/" target="_blank" rel="noopener noreferrer">有字库<ExternalLinkIcon/></a></h2>
<p>典型的webfont，免安装、免下载、直接在线使用。它的优点是非常简单，有两种引用模式：</p>
<ul>
<li>
<p>css模式</p>
<p><img src="@source/zh/Web前端相关/工具库/font.assets/image-20220420232831425.png" alt="image-20220420232831425" loading="lazy"></p>
<p>输入需要的文字，点击生成，自动跳转到CSS引用结果界面，会告诉你具体怎么引用</p>
<p><img src="@source/zh/Web前端相关/工具库/font.assets/image-20220420233004411.png" alt="image-20220420233004411" loading="lazy"></p>
</li>
<li>
<p>js模式</p>
<p><img src="@source/zh/Web前端相关/工具库/font.assets/image-20220420233106012.png" alt="image-20220420233106012" loading="lazy"></p>
<h2 id="_2-字蛛" tabindex="-1"><a class="header-anchor" href="#_2-字蛛" aria-hidden="true">#</a> 2.<a href="https://github.com/aui/font-spider" target="_blank" rel="noopener noreferrer">字蛛<ExternalLinkIcon/></a></h2>
<p>第一种方案是最简单的，但是也有缺点：<strong>付费</strong>。当然一般新用户会有点免费额度，不过基本上调用几次就用完了。我就是用着用着发现自己的网站的字体失效了，非常难受。</p>
<p>字蛛的原理是爬取html文件中的字体，然后生成新的字体文件，新的字体文件中不含未使用的字，所以减小了体积。</p>
<p>然而字蛛对静态网页友好，对我的vue项目很不友好。特别是它只支持html格式，尝试了一番后我最后放弃了。</p>
<p>话说字蛛官网好像重定向到了某个不可名状的网站，蛮怪的.jpg。所以上面的链接是github地址。</p>
<h2 id="_3-最终方案-fontmin" tabindex="-1"><a class="header-anchor" href="#_3-最终方案-fontmin" aria-hidden="true">#</a> 3.最终方案：<a href="http://ecomfe.github.io/fontmin/#banner" target="_blank" rel="noopener noreferrer">Fontmin<ExternalLinkIcon/></a></h2>
<p>我直接下载了桌面版，非常香，可以直接生成只含所需文字的字体文件，使几十MB的字体文件减小到几kb</p>
<p><img src="@source/zh/Web前端相关/工具库/font.assets/image-20220420234404158.png" alt="image-20220420234404158" loading="lazy"></p>
</li>
</ul>
<p>点击生成后会得到如下文件</p>
<p><img src="@source/zh/Web前端相关/工具库/font.assets/image-20220420234453127.png" alt="image-20220420234453127" loading="lazy"></p>
<p>然后就可以把这些文件拿去项目中引用了~</p>
<div class="custom-container tip">
<p class="custom-container-title">提示</p>
<p>顺便分享两个有关字体的网站：</p>
<p>字体下载：<a href="https://www.fonts.net.cn/me/downloads-1.html" target="_blank" rel="noopener noreferrer">字体天下<ExternalLinkIcon/></a></p>
<p>可进行相关字体格式的转换：<a href="https://convertio.co/zh/" target="_blank" rel="noopener noreferrer">文件转换<ExternalLinkIcon/></a></p>
</div>
</div></template>


