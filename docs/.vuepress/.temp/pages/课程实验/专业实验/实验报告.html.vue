<template><div><h2 id="数字波形生成" tabindex="-1"><a class="header-anchor" href="#数字波形生成" aria-hidden="true">#</a> 数字波形生成</h2>
<h3 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述" aria-hidden="true">#</a> 1.概述</h3>
<ul>
<li>设计的任务：给出数字序列A、B的值和逻辑函数F的表达式(与、或、非、异或同或等),生成A、B和F的波形图。注:A、B序列长度最大值不小于16。</li>
<li>需要的知识点：vuepress的二次开发、逻辑运算基础知识、vue.js基本语法、echarts插件的使用等。</li>
<li>具体完成的设计内容：己完成题目所有需求：输入通道A、B，输出通道F0~F4的波形绘制；要求的5种逻辑运算。其中波形绘制模块规模较大，使用了echarts插件，代码行数在130行左右；逻辑运算模块耗时较多，主要花在调试，代码行数在50左右。</li>
<li>创新点：设计方案和演示效果集成在个人网站中，界面优雅简洁；波形图和用户有一定的交互，如鼠标移入可查看当前点的坐标、多通道选择显示与否、图表横坐标量程自适应、可下载当前显示的波形图、可切换波形图/柱状图、可显示数据视图。</li>
</ul>
<h3 id="_2-总体设计" tabindex="-1"><a class="header-anchor" href="#_2-总体设计" aria-hidden="true">#</a> 2.总体设计</h3>
<ul>
<li>
<p>软件结构设计。对用户可见：输入框，波形界面，我们要做的就是获取用户的输入 -&gt; 将这串输入进行逻辑运算 -&gt; 将运算结果以某种方式呈现到波形界面。其中用户的输入是两串字符串（通道A和通道B），遍历字符串时配合逻辑运算符“|、&amp;、~”等可以得到输出波形的字符串，再确定好横坐标（字符串的索引值，用户端看起来是时间），纵坐标（只有两个值：0和1）就可以调用echarts插件绘制波形。</p>
<Mermaid id="mermaid-382ee189" code="flowchart%20TB%0A%20%20subgraph%20wave%5B%22%E6%B3%A2%E5%BD%A2%E7%94%9F%E6%88%90%E6%A8%A1%E5%9D%97%22%5D%0A%20%20direction%20LR%0A%20%20%20%20x(%22%E8%B0%83%E7%94%A8echarts%E6%8F%92%E4%BB%B6%EF%BC%8C%0A%20%20%20%20%E6%A0%B9%E6%8D%AE%E9%80%BB%E8%BE%91%E8%BF%90%E7%AE%97%E6%A8%A1%E5%9D%97%E8%BF%94%E5%9B%9E%E7%9A%84%E8%BF%90%E7%AE%97%E7%BB%93%E6%9E%9C%EF%BC%8C%0A%20%20%20%20%E7%94%9F%E6%88%90%E6%B3%A2%E5%BD%A2%22)%20%20--%3E%20dots1(...)%20--%3E%20y(%22some%20operation%22)%0A%20%20end%0A%20%20subgraph%20cal%5B%E9%80%BB%E8%BE%91%E8%BF%90%E7%AE%97%E6%A8%A1%E5%9D%97%5D%0A%20%20direction%20LR%0A%20%20%20%20z(%22some%20operation%22)%20%20--%3E%20dots2(...)%20--%3E%20g(%22some%20operation%22)%0A%20%20end%0A%20%20wave%20---%3E%7C%E8%B0%83%E7%94%A8%E8%BF%90%E7%AE%97%E6%96%B9%E6%B3%95%7C%20cal%20---%3E%7C%E8%BF%94%E5%9B%9E%E8%BF%90%E7%AE%97%E7%BB%93%E6%9E%9C%7C%20wave%0A%20%20x1(%22%E7%94%A8%E6%88%B7%E8%BE%93%E5%85%A5%22)%20--%3E%20cal%0A"></Mermaid></li>
<li>
<p>数据结构设计。采用的全局变量：用户的输入A、B，输出与函数F0、或函数F1、非函数F2、异或函数F3、同或函数F4；其中A、B为字符串类型，期间会转成数组类型；F0~F1为数组类型；A、B用于保存用户的输入，F0 ~ F1用于保存逻辑运算结果。</p>
</li>
</ul>
<h3 id="_3-详细设计及实现" tabindex="-1"><a class="header-anchor" href="#_3-详细设计及实现" aria-hidden="true">#</a> 3.详细设计及实现</h3>
<ul>
<li>
<p>主要模块的流程图。</p>
<Mermaid id="mermaid-382ee1c3" code="flowchart%20TB%0A%20%20subgraph%20wave%5B%E9%80%BB%E8%BE%91%E8%BF%90%E7%AE%97%E6%A8%A1%E5%9D%97%5D%0A%20%20direction%20LR%0A%20%20%09X1(%22%E5%88%86%E5%88%AB%E5%B0%86A%EF%BC%8CB%E8%BD%AC%E6%8D%A2%E6%88%90%E6%95%B0%E7%BB%84%2C%0A%20%20%09%E6%96%B9%E4%BE%BF%E8%BF%90%E7%AE%97%22)%0A%20%20%20%20X2(%22%E9%81%8D%E5%8E%86A%E6%95%B0%E7%BB%84%E6%88%96B%E6%95%B0%E7%BB%84%EF%BC%8C%0A%20%20%20%20%E6%8C%89%E4%BD%8D%E5%81%9A%E9%80%BB%E8%BE%91%E8%BF%90%E7%AE%97%22)%0A%20%20%20%20X3(%22%E5%B0%86%E8%BF%90%E7%AE%97%E7%BB%93%E6%9E%9C%E5%AD%98%E5%82%A8%E5%88%B0%E5%AF%B9%E5%BA%94%E7%9A%84%E5%87%BD%E6%95%B0%E6%95%B0%E7%BB%84%E4%B8%AD%22)%0A%20%20%20%20X1%20--%3E%20X2%20--%3E%20X3%0A%20%20end%0A%20%20x2(%22%E9%80%9A%E9%81%93A%E7%9A%84%E8%BE%93%E5%85%A5%22)%20---%3E%20wave%0A%20%20x3(%22%E9%80%9A%E9%81%93B%E7%9A%84%E8%BE%93%E5%85%A5%22)%20---%3E%20wave%0A%20%20wave%20---%3E%20x4(%22A%EF%BC%8CB%E7%9A%84%E4%B8%8E%E5%87%BD%E6%95%B0%22)%20%0A%20%20wave%20---%3E%20x5(%22A%EF%BC%8CB%E7%9A%84%E6%88%96%E5%87%BD%E6%95%B0%22)%20%0A%20%20wave%20---%3E%20x6(%22A%EF%BC%8CB%E7%9A%84%E5%BC%82%E6%88%96%E5%87%BD%E6%95%B0%22)%0A%20%20wave%20---%3E%20x7(%22A%EF%BC%8CB%E7%9A%84%E5%90%8C%E6%88%96%E5%87%BD%E6%95%B0%22)%0A"></Mermaid><Mermaid id="mermaid-382ee1c4" code="flowchart%20TB%0A%20%20subgraph%20wave%5B%E6%B3%A2%E5%BD%A2%E7%94%9F%E6%88%90%E6%A8%A1%E5%9D%97%5D%0A%20%20direction%20LR%0A%20%20%09X1(%22%E6%A0%B9%E6%8D%AE%E9%80%BB%E8%BE%91%E8%BF%90%E7%AE%97%E6%A8%A1%E5%9D%97%E8%BF%94%E5%9B%9E%E7%9A%84%E8%BF%90%E7%AE%97%E7%BB%93%E6%9E%9C%2C%0A%20%20%09%E7%94%9F%E6%88%90echarts%E7%9A%84%E7%9B%B8%E5%85%B3%E9%85%8D%E7%BD%AE%E9%A1%B9%E5%92%8C%E6%95%B0%E6%8D%AE%22)%0A%20%20%20%20X2(%22%E7%94%B1%E9%85%8D%E7%BD%AE%E9%A1%B9%E5%92%8C%E6%95%B0%E6%8D%AE%E7%94%9F%E6%88%90echarts%E5%9B%BE%E8%A1%A8%EF%BC%8C%0A%20%20%20%20%E7%94%9F%E6%88%90%E6%B3%A2%E5%BD%A2%22)%20%20%0A%20%20%20%20X1%20--%3E%20X2%0A%20%20end%0A%20%20x1(%22%E5%BD%93%E5%89%8D%E6%97%B6%E5%88%BBtime%22)%20---%3E%20wave%0A%20%20x2(%22%E9%80%9A%E9%81%93A%E7%9A%84%E8%BE%93%E5%85%A5%22)%20---%3E%20wave%0A%20%20x3(%22%E9%80%9A%E9%81%93B%E7%9A%84%E8%BE%93%E5%85%A5%22)%20---%3E%20wave%0A%20%20x4(%22A%EF%BC%8CB%E7%9A%84%E4%B8%8E%E5%87%BD%E6%95%B0%22)%20---%3E%20wave%0A%20%20x5(%22A%EF%BC%8CB%E7%9A%84%E6%88%96%E5%87%BD%E6%95%B0%22)%20---%3E%20wave%0A%20%20x6(%22A%EF%BC%8CB%E7%9A%84%E5%BC%82%E6%88%96%E5%87%BD%E6%95%B0%22)%20---%3E%20wave%0A%20%20x7(%22A%EF%BC%8CB%E7%9A%84%E5%90%8C%E6%88%96%E5%87%BD%E6%95%B0%22)%20---%3E%20wave%0A%20%20wave%20---%3E%20y1(%22%E6%8E%A7%E5%88%B6%E5%9C%A8%E7%94%A8%E6%88%B7%E7%95%8C%E9%9D%A2%E4%B8%8A%E6%B8%B2%E6%9F%93%E8%BF%99%E4%BA%9B%E6%B3%A2%E5%BD%A2%22)%0A"></Mermaid><p>项目结果运行分析：</p>
<p><img src="@source/课程实验/专业实验/实验报告.assets/image-20220604113216012.png" alt="image-20220604113216012" loading="lazy"></p>
<p>点击链接，查看项目运行地址：<img src="@source/课程实验/专业实验/实验报告.assets/image-20220604113354706.png" alt="image-20220604113354706" loading="lazy"></p>
<p>可以看到用户界面初始渲染了样例输入的波形</p>
<p>现在A输入0001000100010001，在B输入0101010101010101，结果显示:</p>
<p><img src="@source/课程实验/专业实验/实验报告.assets/image-20220604130304737.png" alt="image-20220604130304737" loading="lazy"></p>
<p>点击上方按钮，把其他波形隐藏，只观测异或波形：</p>
<p><img src="@source/课程实验/专业实验/实验报告.assets/image-20220604130430763.png" alt="image-20220604130430763" loading="lazy"></p>
</li>
<li>
<p>设计过程中出现的错误。</p>
<ol>
<li>
<p>根据echarts的<a href="https://echarts.apache.org/zh/index.html" target="_blank" rel="noopener noreferrer">官方文档<ExternalLinkIcon/></a>,有三种方式引入echarts：</p>
<ul>
<li>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>npm install echarts --save
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
<li>
<p>CDN引入</p>
</li>
<li>
<p>下载js文件到本地</p>
</li>
</ul>
<p>但可能是vuepress不同于一般vue项目，我在引入过程中发现前两种方式失效，据说需要动态引入，但是我不太会，所以我选择了第三种方式。</p>
</li>
<li>
<p>Error from chokidar (D:): Error: EBUSY: resource busy or locked, lstat 'D:xxx'</p>
<p>npm run dev（即运行项目）之后报错，这里我是因为在某个.md文件中引入了自定义组件，因为这个框架dev时会自动把components目录下的组件自动全局注册，无需我们引入，把该行import去掉就行了。</p>
</li>
</ol>
</li>
</ul>
<h3 id="_4-结论" tabindex="-1"><a class="header-anchor" href="#_4-结论" aria-hidden="true">#</a> 4.结论</h3>
<p>本次实验达到了设计题目的要求，功能完善，亦有特点：设计方案和演示效果集成在个人网站中，界面优雅简洁；波形图和用户有一定的交互，如鼠标移入可查看当前点的坐标、多通道选择显示与否、图表横坐标量程自适应、可下载当前显示的波形图、可切换波形图/柱状图、可显示数据视图。</p>
<p>不足之处：用户只能选择已有的函数输出，不能自定义输出函数。</p>
<h3 id="_5-结束语" tabindex="-1"><a class="header-anchor" href="#_5-结束语" aria-hidden="true">#</a> 5.结束语</h3>
<p>本次实验过程中基本没有遇到什么困难。</p>
<p>通过本次实验，我对vuepress的二次开发使用以及echarts的引入和使用有了一定的掌握。</p>
<h3 id="_6-程序清单" tabindex="-1"><a class="header-anchor" href="#_6-程序清单" aria-hidden="true">#</a> 6.程序清单</h3>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">/*逻辑运算模块的主要函数1*/</span>
<span class="token function">trans</span><span class="token punctuation">(</span><span class="token parameter">channel</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">/*依次将用户输入的A、B按位做逻辑运算填入数组
      /*`this.${channel}`会解析为'this.A'！！不是this.A，有点难受*/</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>channel <span class="token operator">===</span> <span class="token string">'A'</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token keyword">in</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token constant">A</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token keyword">this</span><span class="token punctuation">.</span>time<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">t</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>i<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span><span class="token punctuation">)</span>
          <span class="token keyword">let</span> item0 <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token constant">A</span><span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">&amp;</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token constant">B</span><span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token comment">//与</span>
          <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token constant">F0</span><span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">compareWithZero</span><span class="token punctuation">(</span>item0<span class="token punctuation">)</span><span class="token punctuation">)</span>

          <span class="token keyword">let</span> item1 <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token constant">A</span><span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">|</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token constant">B</span><span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token comment">//或</span>
          <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token constant">F1</span><span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">compareWithZero</span><span class="token punctuation">(</span>item1<span class="token punctuation">)</span><span class="token punctuation">)</span>

          <span class="token keyword">let</span> item2 <span class="token operator">=</span> <span class="token operator">~</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token constant">A</span><span class="token punctuation">[</span>i<span class="token punctuation">]</span>  <span class="token comment">//非</span>
          <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token constant">F2</span><span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">compareWithZero</span><span class="token punctuation">(</span>item2<span class="token punctuation">)</span><span class="token punctuation">)</span>
          console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>item2<span class="token punctuation">)</span><span class="token punctuation">;</span>
          console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token constant">F2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>


          <span class="token keyword">let</span> item3 <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token constant">A</span><span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">^</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token constant">B</span><span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token comment">//异或</span>
          <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token constant">F3</span><span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">compareWithZero</span><span class="token punctuation">(</span>item3<span class="token punctuation">)</span><span class="token punctuation">)</span>

          <span class="token keyword">let</span> item4 <span class="token operator">=</span> <span class="token operator">~</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token constant">A</span><span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">^</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token constant">B</span><span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token comment">//同或</span>
          <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token constant">F4</span><span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">compareWithZero</span><span class="token punctuation">(</span>item4<span class="token punctuation">)</span><span class="token punctuation">)</span>

        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span> <span class="token keyword">else</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token keyword">in</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token constant">B</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token keyword">this</span><span class="token punctuation">.</span>time<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">t</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>i<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span><span class="token punctuation">)</span>
          <span class="token keyword">let</span> item0 <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token constant">A</span><span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">&amp;</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token constant">B</span><span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token comment">//与</span>
          <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token constant">F0</span><span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">compareWithZero</span><span class="token punctuation">(</span>item0<span class="token punctuation">)</span><span class="token punctuation">)</span>

          <span class="token keyword">let</span> item1 <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token constant">A</span><span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">|</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token constant">B</span><span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token comment">//或</span>
          <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token constant">F1</span><span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">compareWithZero</span><span class="token punctuation">(</span>item1<span class="token punctuation">)</span><span class="token punctuation">)</span>

          <span class="token keyword">let</span> item2 <span class="token operator">=</span> <span class="token operator">~</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token constant">A</span><span class="token punctuation">[</span>i<span class="token punctuation">]</span>  <span class="token comment">//非</span>
          <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token constant">F2</span><span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">compareWithZero</span><span class="token punctuation">(</span>item2<span class="token punctuation">)</span><span class="token punctuation">)</span>

          <span class="token keyword">let</span> item3 <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token constant">A</span><span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">^</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token constant">B</span><span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token comment">//异或</span>
          <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token constant">F3</span><span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">compareWithZero</span><span class="token punctuation">(</span>item3<span class="token punctuation">)</span><span class="token punctuation">)</span>

          <span class="token keyword">let</span> item4 <span class="token operator">=</span> <span class="token operator">~</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token constant">A</span><span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">^</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token constant">B</span><span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token comment">//同或</span>
          <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token constant">F4</span><span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">compareWithZero</span><span class="token punctuation">(</span>item4<span class="token punctuation">)</span><span class="token punctuation">)</span>

        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token comment">/*逻辑运算模块的主要函数2*/</span>
<span class="token function">compareWithZero</span><span class="token punctuation">(</span><span class="token parameter">item</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">if</span><span class="token punctuation">(</span>item <span class="token operator">===</span> <span class="token operator">-</span><span class="token number">2</span><span class="token punctuation">)</span> <span class="token keyword">return</span> <span class="token number">0</span>
	<span class="token keyword">else</span> <span class="token keyword">if</span><span class="token punctuation">(</span>item <span class="token operator">===</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token keyword">return</span> <span class="token number">1</span>
    <span class="token keyword">else</span> <span class="token keyword">return</span> item <span class="token operator">></span> <span class="token number">0</span> <span class="token operator">?</span> <span class="token number">1</span> <span class="token operator">:</span> <span class="token number">0</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span>
        
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">/*波形生成的主要函数*/</span>
<span class="token function">drawLine</span><span class="token punctuation">(</span><span class="token parameter">time<span class="token punctuation">,</span> <span class="token constant">A</span><span class="token punctuation">,</span> <span class="token constant">B</span><span class="token punctuation">,</span> <span class="token constant">F0</span><span class="token punctuation">,</span> <span class="token constant">F1</span><span class="token punctuation">,</span> <span class="token constant">F2</span><span class="token punctuation">,</span> <span class="token constant">F3</span><span class="token punctuation">,</span> <span class="token constant">F4</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">let</span> myChart <span class="token operator">=</span> echarts<span class="token punctuation">.</span><span class="token function">init</span><span class="token punctuation">(</span>document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">'my-chart-box'</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      window<span class="token punctuation">.</span><span class="token function-variable function">onresize</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        myChart<span class="token punctuation">.</span><span class="token function">resize</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span><span class="token punctuation">;</span>
      <span class="token keyword">let</span> option <span class="token operator">=</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">tooltip</span><span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token literal-property property">show</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
          <span class="token literal-property property">trigger</span><span class="token operator">:</span> <span class="token string">'axis'</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token literal-property property">legend</span><span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token literal-property property">data</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">'A'</span><span class="token punctuation">,</span> <span class="token string">'B'</span><span class="token punctuation">,</span> <span class="token string">'F0:与'</span><span class="token punctuation">,</span><span class="token string">'F1:或'</span><span class="token punctuation">,</span><span class="token string">'F2:非'</span><span class="token punctuation">,</span><span class="token string">'F3:异或'</span><span class="token punctuation">,</span><span class="token string">'F4:同或'</span><span class="token punctuation">]</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token literal-property property">grid</span><span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token literal-property property">left</span><span class="token operator">:</span> <span class="token string">'3%'</span><span class="token punctuation">,</span>
          <span class="token literal-property property">right</span><span class="token operator">:</span> <span class="token string">'4%'</span><span class="token punctuation">,</span>
          <span class="token literal-property property">bottom</span><span class="token operator">:</span> <span class="token string">'3%'</span><span class="token punctuation">,</span>
          <span class="token literal-property property">containLabel</span><span class="token operator">:</span> <span class="token boolean">true</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token literal-property property">toolbox</span><span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token literal-property property">show</span><span class="token operator">:</span><span class="token boolean">true</span><span class="token punctuation">,</span>
          <span class="token literal-property property">feature</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token literal-property property">dataView</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token literal-property property">readOnly</span><span class="token operator">:</span> <span class="token boolean">false</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
            <span class="token literal-property property">magicType</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">'line'</span><span class="token punctuation">,</span> <span class="token string">'bar'</span><span class="token punctuation">]</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
            <span class="token literal-property property">saveAsImage</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token literal-property property">xAxis</span><span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">'category'</span><span class="token punctuation">,</span>
          <span class="token literal-property property">data</span><span class="token operator">:</span> time
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token literal-property property">yAxis</span><span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">'value'</span><span class="token punctuation">,</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token literal-property property">series</span><span class="token operator">:</span> <span class="token punctuation">[</span>
          <span class="token punctuation">{</span>
            <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'A'</span><span class="token punctuation">,</span>
            <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">'line'</span><span class="token punctuation">,</span>
            <span class="token literal-property property">step</span><span class="token operator">:</span> <span class="token string">'end'</span><span class="token punctuation">,</span>
            <span class="token literal-property property">data</span><span class="token operator">:</span> <span class="token constant">A</span><span class="token punctuation">,</span>
            <span class="token literal-property property">label</span><span class="token operator">:</span> <span class="token punctuation">{</span>
              <span class="token literal-property property">show</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
              <span class="token literal-property property">position</span><span class="token operator">:</span> <span class="token string">'bottom'</span><span class="token punctuation">,</span>
              <span class="token literal-property property">textStyle</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                <span class="token literal-property property">fontSize</span><span class="token operator">:</span> <span class="token number">20</span>
              <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
          <span class="token punctuation">}</span><span class="token punctuation">,</span>
          <span class="token punctuation">{</span>
            <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'B'</span><span class="token punctuation">,</span>
            <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">'line'</span><span class="token punctuation">,</span>
            <span class="token literal-property property">step</span><span class="token operator">:</span> <span class="token string">'end'</span><span class="token punctuation">,</span>
            <span class="token literal-property property">data</span><span class="token operator">:</span> <span class="token constant">B</span><span class="token punctuation">,</span>
            <span class="token literal-property property">label</span><span class="token operator">:</span> <span class="token punctuation">{</span>
              <span class="token literal-property property">show</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
              <span class="token literal-property property">position</span><span class="token operator">:</span> <span class="token string">'bottom'</span><span class="token punctuation">,</span>
              <span class="token literal-property property">textStyle</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                <span class="token literal-property property">fontSize</span><span class="token operator">:</span> <span class="token number">20</span>
              <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
          <span class="token punctuation">}</span><span class="token punctuation">,</span>
          <span class="token punctuation">{</span>
            <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'F0:与'</span><span class="token punctuation">,</span>
            <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">'line'</span><span class="token punctuation">,</span>
            <span class="token literal-property property">step</span><span class="token operator">:</span> <span class="token string">'end'</span><span class="token punctuation">,</span>
            <span class="token literal-property property">data</span><span class="token operator">:</span> <span class="token constant">F0</span><span class="token punctuation">,</span>
            <span class="token literal-property property">label</span><span class="token operator">:</span> <span class="token punctuation">{</span>
              <span class="token literal-property property">show</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
              <span class="token literal-property property">position</span><span class="token operator">:</span> <span class="token string">'bottom'</span><span class="token punctuation">,</span>
              <span class="token literal-property property">textStyle</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                <span class="token literal-property property">fontSize</span><span class="token operator">:</span> <span class="token number">20</span>
              <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
          <span class="token punctuation">}</span><span class="token punctuation">,</span>
          <span class="token punctuation">{</span>
            <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'F1:或'</span><span class="token punctuation">,</span>
            <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">'line'</span><span class="token punctuation">,</span>
            <span class="token literal-property property">step</span><span class="token operator">:</span> <span class="token string">'end'</span><span class="token punctuation">,</span>
            <span class="token literal-property property">data</span><span class="token operator">:</span> <span class="token constant">F1</span><span class="token punctuation">,</span>
            <span class="token literal-property property">label</span><span class="token operator">:</span> <span class="token punctuation">{</span>
              <span class="token literal-property property">show</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
              <span class="token literal-property property">position</span><span class="token operator">:</span> <span class="token string">'bottom'</span><span class="token punctuation">,</span>
              <span class="token literal-property property">textStyle</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                <span class="token literal-property property">fontSize</span><span class="token operator">:</span> <span class="token number">20</span>
              <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
          <span class="token punctuation">}</span><span class="token punctuation">,</span>
          <span class="token punctuation">{</span>
            <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'F2:非'</span><span class="token punctuation">,</span>
            <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">'line'</span><span class="token punctuation">,</span>
            <span class="token literal-property property">step</span><span class="token operator">:</span> <span class="token string">'end'</span><span class="token punctuation">,</span>
            <span class="token literal-property property">data</span><span class="token operator">:</span> <span class="token constant">F2</span><span class="token punctuation">,</span>
            <span class="token literal-property property">label</span><span class="token operator">:</span> <span class="token punctuation">{</span>
              <span class="token literal-property property">show</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
              <span class="token literal-property property">position</span><span class="token operator">:</span> <span class="token string">'bottom'</span><span class="token punctuation">,</span>
              <span class="token literal-property property">textStyle</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                <span class="token literal-property property">fontSize</span><span class="token operator">:</span> <span class="token number">20</span>
              <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
          <span class="token punctuation">}</span><span class="token punctuation">,</span>
          <span class="token punctuation">{</span>
            <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'F3:异或'</span><span class="token punctuation">,</span>
            <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">'line'</span><span class="token punctuation">,</span>
            <span class="token literal-property property">step</span><span class="token operator">:</span> <span class="token string">'end'</span><span class="token punctuation">,</span>
            <span class="token literal-property property">data</span><span class="token operator">:</span> <span class="token constant">F3</span><span class="token punctuation">,</span>
            <span class="token literal-property property">label</span><span class="token operator">:</span> <span class="token punctuation">{</span>
              <span class="token literal-property property">show</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
              <span class="token literal-property property">position</span><span class="token operator">:</span> <span class="token string">'bottom'</span><span class="token punctuation">,</span>
              <span class="token literal-property property">textStyle</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                <span class="token literal-property property">fontSize</span><span class="token operator">:</span> <span class="token number">20</span>
              <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
          <span class="token punctuation">}</span><span class="token punctuation">,</span>
          <span class="token punctuation">{</span>
            <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'F4:同或'</span><span class="token punctuation">,</span>
            <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">'line'</span><span class="token punctuation">,</span>
            <span class="token literal-property property">step</span><span class="token operator">:</span> <span class="token string">'end'</span><span class="token punctuation">,</span>
            <span class="token literal-property property">data</span><span class="token operator">:</span> <span class="token constant">F4</span><span class="token punctuation">,</span>
            <span class="token literal-property property">label</span><span class="token operator">:</span> <span class="token punctuation">{</span>
              <span class="token literal-property property">show</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
              <span class="token literal-property property">position</span><span class="token operator">:</span> <span class="token string">'bottom'</span><span class="token punctuation">,</span>
              <span class="token literal-property property">textStyle</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                <span class="token literal-property property">fontSize</span><span class="token operator">:</span> <span class="token number">20</span>
              <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
          <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token punctuation">]</span>
      <span class="token punctuation">}</span><span class="token punctuation">;</span>
      <span class="token comment">// 使用刚指定的配置项和数据显示图表。</span>
      myChart<span class="token punctuation">.</span><span class="token function">setOption</span><span class="token punctuation">(</span>option<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="电子钢琴" tabindex="-1"><a class="header-anchor" href="#电子钢琴" aria-hidden="true">#</a> 电子钢琴</h2>
<h3 id="_1-概述-1" tabindex="-1"><a class="header-anchor" href="#_1-概述-1" aria-hidden="true">#</a> 1.概述</h3>
<ul>
<li>
<p>设计的任务:已知各音阶标称频率值： （HZ）:</p>
<p><img src="@source/课程实验/专业实验/实验报告.assets/image-20220604193609677.png" alt="image-20220604193609677" loading="lazy"></p>
<p>完成一个程序，实现如下功能
(1)程序每间隔 0.5 秒扬声器发出不同频率的声音，每次升高 100HZ，直到频率达到2000hz。
(2)谱曲功能：首先给出基准节拍，并定义每个音节频率，输入一串字符串，可输出一段音乐。例如 0.5A1/1A2/0.5B3/1C4/5D1</p>
</li>
<li>
<p>需要的知识点：vuepress的二次开发、&lt;audio&gt;标签的使用、vue.js基本语法、钢琴相邻音阶频率的差值、模板字符串语法、js动态操作dom等。</p>
</li>
<li>
<p>具体完成的设计内容:已完成所有要求，主要分成三个模块：点击琴键模块、输入字符串模块、点击100~2000Hz按钮模块。</p>
</li>
<li>
<p>创新点：设计方案和演示效果集成在个人博客中，界面优雅简洁；琴键可视化，用户可以点击鼠标“弹琴”；健壮性较好，有错误提示，如输入字符串不合法等。</p>
</li>
</ul>
<h3 id="_2-总体设计-1" tabindex="-1"><a class="header-anchor" href="#_2-总体设计-1" aria-hidden="true">#</a> 2.总体设计</h3>
<ul>
<li>
<p>软件结构设计：对用户可见：输入框、几个操控按钮、38个琴键，我们要做的就是根据用户点击的按钮、输入的字符串 -&gt; 将字符串转成程序可识别的标识 -&gt; 播放相关音频文件。</p>
<Mermaid id="mermaid-64a56ef4" code="flowchart%20TB%0AclassDef%20manage%20fill%3A%23ffffde%3B%0Amodu1%3A%3A%3Amanage%0Amodu2%3A%3A%3Amanage%0Amodu3%3A%3A%3Amanage%0A%20%20subgraph%20modu1%5B%22100~2000Hz%E4%BE%9D%E6%AC%A1%E6%92%AD%E6%94%BE%E6%A8%A1%E5%9D%97%22%5D%0A%20%20direction%20TB%0A%20%20%20%20y1(%22%E7%9B%B4%E6%8E%A5%E9%A1%BA%E5%BA%8F%E6%92%AD%E6%94%BE%E9%9F%B3%E9%A2%91%E6%96%87%E4%BB%B6%22)%0A%20%20end%0A%20%20%0A%20%20subgraph%20modu2%5B%E8%B0%B1%E6%9B%B2%E6%A8%A1%E5%9D%97%5D%0A%20%20direction%20TB%0A%20%20%20%20g1(%22%E9%80%9A%E8%BF%87%E6%98%A0%E5%B0%84%E8%A1%A8%E5%B0%86%E5%AD%97%E7%AC%A6%E4%B8%B2%E6%98%A0%E5%B0%84%E4%B8%BA%E9%9F%B3%E9%A2%91%E6%96%87%E4%BB%B6%22)%20%20--%3E%20g2(%22%E5%BE%97%E5%88%B0%E4%B8%80%E4%B8%B2%E9%9F%B3%E9%A2%91%E6%96%87%E4%BB%B6%E7%9A%84%E7%B4%A2%E5%BC%95%E5%80%BC%22)%20--%3E%20g3(%22%E6%8C%89%E7%B4%A2%E5%BC%95%E5%80%BC%E9%A1%BA%E5%BA%8F%E6%92%AD%E6%94%BE%E5%8F%AF%E6%BC%94%E5%A5%8F%E6%9B%B2%E5%AD%90%22)%0A%20%20end%0A%20%20subgraph%20modu3%5B%E7%90%B4%E9%94%AE%E6%A8%A1%E6%8B%9F%E6%A8%A1%E5%9D%97%5D%0A%20%20direction%20TB%0A%20%20%20%20z1(%22%E7%90%B4%E9%94%AE1%22)%20%20--%3E%20z2(%22%E9%9F%B3%E9%A2%91%E6%96%87%E4%BB%B61%22)%0A%20%20%20%20z3(%22%E7%90%B4%E9%94%AE2%22)%20%20--%3E%20z4(%22%E9%9F%B3%E9%A2%91%E6%96%87%E4%BB%B62%22)%0A%20%20%20%20z5(%22%E7%90%B4%E9%94%AE3%22)%20%20--%3E%20z6(%22%E9%9F%B3%E9%A2%91%E6%96%87%E4%BB%B63%22)%0A%20%20%20%20z7(%22%E7%90%B4%E9%94%AE4%22)%20%20--%3E%20z8(%22%E9%9F%B3%E9%A2%91%E6%96%87%E4%BB%B64%22)%0A%20%20%20%20dots3(%22...%22)%0A%20%20%20%20%0A%20%20end%0A%20%20%0A%20%20%0A%20%20x1(%22%E7%94%A8%E6%88%B7%22)%20--%3E%20sel1(%22%E7%82%B9%E5%87%BB%E7%90%B4%E9%94%AE%22)%0A%20%20x1(%22%E7%94%A8%E6%88%B7%22)%20--%3E%20sel2(%22%E8%BE%93%E5%85%A5%E5%AD%97%E7%AC%A6%E4%B8%B2%22)%0A%20%20x1(%22%E7%94%A8%E6%88%B7%22)%20--%3E%20sel3(%22%E7%82%B9%E5%87%BB100~2000Hz%E6%8C%89%E9%92%AE%22)%0A%20%20sel1%20--%3E%20modu3%20--%3E%20z9(%22%E7%82%B9%E5%87%BB%E6%9F%90%E4%B8%80%E7%90%B4%E9%94%AE%E5%B0%B1%E4%BC%9A%E6%92%AD%E6%94%BE%E7%9B%B8%E5%BA%94%E7%9A%84%E9%9F%B3%E9%A2%91%E6%96%87%E4%BB%B6%22)%0A%20%20sel2%20--%3E%20modu2%0A%20%20sel3%20--%3E%20modu1%0A%20%20%0A"></Mermaid></li>
<li>
<p>数据结构设计：采用的全局变量：keyNum(整型)、userInput(字符串型)、songStr(数组型)、playIndex（数组型）、以及38个音频文件。</p>
<Mermaid id="mermaid-64a56ee8" code="flowchart%20TB%0A%09subgraph%20A1%5B%22%E5%8F%98%E9%87%8F%E8%AF%B4%E6%98%8E%22%5D%0A%09keyNum%20--%3E%20x1(%22%E7%94%A8%E4%BA%8E%E8%AE%B0%E5%BD%95%E7%90%B4%E9%94%AE%E6%95%B0%E3%80%81%E9%9F%B3%E9%A2%91%E6%96%87%E4%BB%B6%E6%95%B0%22)%0A%09userInput%20--%3E%20x2(%22%E5%AD%98%E6%94%BE%E7%94%A8%E6%88%B7%E8%BE%93%E5%85%A5%E7%9A%84%E5%AD%97%E7%AC%A6%E4%B8%B2%22)%0A%09songStr%20--%3E%20x3(%22%E5%AD%97%E7%AC%A6%E4%B8%B2%E8%BD%AC%E6%8D%A2%E6%88%90%E6%95%B0%E7%BB%84%E8%B0%B1%E6%9B%B2%22)%0A%09playIndex%20--%3E%20x4(%22%E9%9F%B3%E9%A2%91%E6%96%87%E4%BB%B6%E6%92%AD%E6%94%BE%E7%9A%84%E7%B4%A2%E5%BC%95%E6%95%B0%E7%BB%84%22)%0A%09end%0A"></Mermaid></li>
</ul>
<h3 id="_3-详细设计及实现-1" tabindex="-1"><a class="header-anchor" href="#_3-详细设计及实现-1" aria-hidden="true">#</a> 3.详细设计及实现</h3>
<ol>
<li>
<p>先找到钢琴音频文件,我是在网上找到在线钢琴模拟器,自己录制声音然后剪辑，一共50个，实际使用了39个。</p>
<p><a href="https://www.xiwnn.com/piano/" target="_blank" rel="noopener noreferrer">在线钢琴模拟器<ExternalLinkIcon/></a></p>
<p>录音软件用的是“金舟电脑录音软件”——显然听都没听说过👍。虽然普通用户最久只能录制几分钟，但是我们就使用一下，完全ok，过后也可以马上卸载
音频剪辑软件我用的是adobe旗下的audition（需破解）</p>
<p><img src="@source/课程实验/专业实验/实验报告.assets/image-20220604220857738.png" alt="image-20220604220857738" loading="lazy"></p>
<p><img src="@source/课程实验/专业实验/实验报告.assets/image-20220604220916911.png" alt="image-20220604220916911" loading="lazy"></p>
<p>全选然后重命名可以批量重命名这些文件 看着很多，其实一共<strong>1.2MB</strong> 实际我只选用了前38个音频文件。</p>
<p>说实话，钢琴的音频文件还真不好找，不然我也不会用这种笨方法了。</p>
<p>针对任务（1），我是用一个循环+延时，其中每个按键绑定的延时需要递增，否则就会出现所有按键几乎同时被点击，非常难受😢。 接着js控制按键依次被自动点击。</p>
<p>针对任务（2），我是用一个输入框来存放用户输入的字符串变量，将该字符串转成数组，遍历数组依次判断本次循环中的数组元素应该对应哪个音频文件，遍历完后可以得到字符串与音频文件的对应关系，（期间你需要定义一个数组类型变量来记录播放顺序）然后遍历这个播放顺序的数组，依次让按钮自动被点击。</p>
<p>npm run dev(项目运行)结果：</p>
<p><img src="@source/课程实验/专业实验/实验报告.assets/image-20220604221345851.png" alt="image-20220604221345851" loading="lazy"></p>
<p>点击链接，查看项目运行地址</p>
<p><img src="@source/课程实验/专业实验/实验报告.assets/image-20220604221436067.png" alt="image-20220604221436067" loading="lazy"></p>
<p>用户界面可见四个按钮和一个输入框，以及38个琴键。点击琴键会听到相应的音频。</p>
</li>
</ol>
<ul>
<li>
<p>设计过程中出现的错误。</p>
<p>播放100~2000Hz音频时几乎所有音频同时播放。解决方法是循环时每个音频文件都延时播放，且延时递增。</p>
</li>
</ul>
<h3 id="_4-结论-1" tabindex="-1"><a class="header-anchor" href="#_4-结论-1" aria-hidden="true">#</a> 4.结论</h3>
<p>本次实验已达到设计题目的要求，功能完善，特点是设计方案和演示效果集成在个人博客中，界面优雅简洁；琴键可视化，用户可以点击鼠标“弹琴”；健壮性较好，有错误提示，如输入字符串不合法等。</p>
<p>不足之处是由于音频标签audio本身的特性，音频短时间内不能被多次点击播放，导致相邻播放音频间延时要足够，否则当相邻播放音频为同一音源时只触发一次播放，不能完全模拟钢琴的效果。</p>
<h3 id="_5-结束语-1" tabindex="-1"><a class="header-anchor" href="#_5-结束语-1" aria-hidden="true">#</a> 5.结束语</h3>
<p>本次实验过程中基本没有遇到什么困难。</p>
<p>通过本次实验，我对vuepress的二次开发使用、前端引用外部音频文件、audio标签的使用有了更深的掌握。</p>
<h3 id="_6-程序清单-1" tabindex="-1"><a class="header-anchor" href="#_6-程序清单-1" aria-hidden="true">#</a> 6.程序清单</h3>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">/*100~2000Hz（大概）依次播放*/</span>
    <span class="token function">f1</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      document<span class="token punctuation">.</span><span class="token function">querySelectorAll</span><span class="token punctuation">(</span><span class="token string">'.audio-box audio'</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">e<span class="token punctuation">,</span> index</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>index <span class="token operator">%</span> <span class="token number">2</span> <span class="token operator">===</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
            e<span class="token punctuation">.</span><span class="token function">play</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
          <span class="token punctuation">}</span><span class="token punctuation">,</span> index <span class="token operator">*</span> <span class="token number">250</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token comment">/*根据谱曲数组，播放相应音频*/</span>
    <span class="token function">compose</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>playIndex<span class="token punctuation">.</span>length <span class="token operator">></span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">let</span> time <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token keyword">in</span> <span class="token keyword">this</span><span class="token punctuation">.</span>playIndex<span class="token punctuation">)</span> <span class="token punctuation">{</span>
          console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'循环'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
          console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'此次序数为:'</span><span class="token operator">+</span><span class="token keyword">this</span><span class="token punctuation">.</span>playIndex<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
          <span class="token keyword">let</span> temp <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>playIndex<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
          <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
            document<span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token string">'#piano'</span> <span class="token operator">+</span> temp<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">play</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
            time <span class="token operator">++</span>
            <span class="token comment">//延时递增</span>
          <span class="token punctuation">}</span><span class="token punctuation">,</span> i <span class="token operator">*</span> <span class="token number">1000</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
      <span class="token keyword">else</span> <span class="token punctuation">{</span>
        document<span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token string">'#piano20'</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">play</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token function">alert</span><span class="token punctuation">(</span><span class="token string">'请输入自定义曲子,然后点击确定'</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>

<span class="token comment">/*将用户输入的字符串转化成谱曲函数可以识别的数组*/</span>
<span class="token function">inputCompo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>songStr <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>playIndex <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
      console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>userInput<span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//userInput为类似'A1,B2,C3'的字符串</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>userInput<span class="token punctuation">.</span><span class="token function">split</span><span class="token punctuation">(</span><span class="token string">"/"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token parameter">e</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>songStr<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span> <span class="token comment">//</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

      console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'songStr:'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>songStr<span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//此处songStr应为数组类型</span>

      <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token keyword">in</span> <span class="token keyword">this</span><span class="token punctuation">.</span>songStr<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">let</span> index <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>songStr<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token comment">//用于计算audio实际序数</span>
        <span class="token keyword">let</span> ch <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>songStr<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token comment">//ch用以判断在第几行</span>

        <span class="token keyword">if</span><span class="token punctuation">(</span>index <span class="token operator">></span> <span class="token number">13</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token function">alert</span><span class="token punctuation">(</span><span class="token string">'谱曲字符串不合法'</span><span class="token punctuation">)</span>
          <span class="token keyword">return</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">if</span> <span class="token punctuation">(</span>ch <span class="token operator">===</span> <span class="token string">'A'</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token comment">// console.log('第一行');</span>
          <span class="token keyword">this</span><span class="token punctuation">.</span>playIndex<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>index<span class="token punctuation">)</span>

        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>ch <span class="token operator">===</span> <span class="token string">'B'</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token keyword">this</span><span class="token punctuation">.</span>playIndex<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token function">parseInt</span><span class="token punctuation">(</span>index<span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token number">13</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>ch <span class="token operator">===</span> <span class="token string">'C'</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token keyword">this</span><span class="token punctuation">.</span>playIndex<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token function">parseInt</span><span class="token punctuation">(</span>index<span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token number">26</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span>
          <span class="token function">alert</span><span class="token punctuation">(</span><span class="token string">'谱曲字符串不合法'</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
      console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'audio实际序数:\n'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>playIndex<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="采样定理" tabindex="-1"><a class="header-anchor" href="#采样定理" aria-hidden="true">#</a> 采样定理</h2>
<h3 id="_1-概述-2" tabindex="-1"><a class="header-anchor" href="#_1-概述-2" aria-hidden="true">#</a> 1.概述</h3>
<ul>
<li>
<p>设计的任务：请用动画描述采样定理，分为两种情况 f s≥2f max 和 f s&lt;2f max。</p>
</li>
<li>
<p>需要的知识点：vuepress的二次开发、了解什么是采样定理、信号的时域和频域波形、傅里叶变化、动画制作软件AE的使用，重点是变速、路径动画、修剪路径等</p>
</li>
<li>
<p>具体完成的设计内容：已完成所有要求，主要分成三个模块：初始模块、对比模块、傅里叶变换模块。</p>
</li>
<li>
<p>创新点：集成到个人网站中，可查看在线链接。</p>
</li>
</ul>
<h3 id="_2-总体设计-2" tabindex="-1"><a class="header-anchor" href="#_2-总体设计-2" aria-hidden="true">#</a> 2.总体设计</h3>
<p>使用动画制作工具实现，无软件结构和数据结构。没有引用其他文件，一切从零开始。</p>
<h3 id="_3-详细设计及实现-2" tabindex="-1"><a class="header-anchor" href="#_3-详细设计及实现-2" aria-hidden="true">#</a> 3.详细设计及实现</h3>
<ul>
<li>主要模块的流程图。</li>
</ul>
<Mermaid id="mermaid-64a5619a" code="flowchart%20TB%0A%09subgraph%20p1%5B%22%E5%88%9D%E5%A7%8B%E6%A8%A1%E5%9D%97%22%5D%0A%09direction%20TB%0A%20%20%20%20%20%20%20%20x1(%22%E7%94%BB%E5%87%BA%E6%8A%BD%E6%A0%B7%E4%BF%A1%E5%8F%B7%E7%9A%84%E6%97%B6%E5%9F%9F%E5%9B%BE%E5%83%8Ffs%22)%0A%20%20%20%20%20%20%20%20x2(%22%E7%94%BB%E5%87%BA%E5%BE%85%E6%B5%8B%E4%BF%A1%E5%8F%B7%E7%9A%84%E6%97%B6%E5%9F%9F%E5%9B%BE%E5%83%8Ff1%22)%0A%20%20%20%20%20%20%20%20x3(%22%E7%94%BB%E5%87%BA%E5%BE%85%E6%B5%8B%E4%BF%A1%E5%8F%B7%E4%B8%8E%E6%8A%BD%E6%A0%B7%E4%BF%A1%E5%8F%B7%E7%9A%84%E4%B9%98%E7%A7%AFf2%22)%0A%20%20%20%20%20%20%20%20x1%20--%3E%20x2%20--%3E%20x3%0A%09end%0A%09%0A%09subgraph%20p2%5B%22%E5%AF%B9%E6%AF%94%E6%A8%A1%E5%9D%97%22%5D%0A%09direction%20TB%0A%20%20%20%20%20%20%20%20y1(%22%E7%94%BB%E5%87%BA%E6%8A%BD%E6%A0%B7%E4%BF%A1%E5%8F%B7%E7%9A%84%E9%A2%91%E5%9F%9F%E5%9B%BE%E5%83%8FFs%22)%0A%20%20%20%20%20%20%20%20y2(%22%E7%94%BB%E5%87%BA%E5%BE%85%E6%B5%8B%E4%BF%A1%E5%8F%B7%E7%9A%84%E9%A2%91%E5%9F%9F%E5%9B%BE%E5%83%8FF1%22)%0A%20%20%20%20%20%20%20%20y3(%22%E7%94%BB%E5%87%BA%E5%BE%85%E6%B5%8B%E4%BF%A1%E5%8F%B7%E4%B8%8E%E6%8A%BD%E6%A0%B7%E4%BF%A1%E5%8F%B7%E7%9A%84%E5%8D%B7%E7%A7%AFF2%22)%0A%20%20%20%20%20%20%20%20y4(%22%E5%88%B0%E6%AD%A4%E4%B8%BA%E6%AD%A2%E5%B7%B2%E7%BB%8F%E5%BE%97%E5%88%B0%E4%BA%866%E4%B8%AA%E5%9B%BE%E5%83%8F%EF%BC%8C%E6%94%BE%E5%9C%A8%E4%B8%80%E8%B5%B7%E5%AF%B9%E6%AF%94%22)%0A%20%20%20%20%20%20%20%20y1%20--%3E%20y2%20--%3E%20y3%20--%3E%20y4%0A%09end%0A%09%0A%09subgraph%20p3%5B%22%E5%82%85%E9%87%8C%E5%8F%B6%E5%8F%98%E6%8D%A2%E6%A8%A1%E5%9D%97%22%5D%0A%09direction%20LR%0A%20%20%20%20%20%20%20%20z1(%22%E6%8A%BD%E6%A0%B7%E4%BF%A1%E5%8F%B7%E7%9A%84%0A%20%20%20%20%20%20%20%20%E6%97%B6%E5%9F%9F%E5%9B%BE%E5%83%8Ffs%E7%9A%84%0A%20%20%20%20%20%20%20%20%E9%A2%91%E7%8E%87%E4%B8%8D%E6%96%AD%E5%87%8F%E5%B0%8F%EF%BC%8C%E5%91%A8%E6%9C%9F%E6%89%A9%E5%A4%A7%0A%20%20%20%20%20%20%20%20%E8%A1%A8%E7%8E%B0%E4%B8%BA%E5%9B%BE%E5%83%8F%E6%8B%89%E5%AE%BD%22)%0A%20%20%20%20%20%20%20%20z2(%22%E6%8A%BD%E6%A0%B7%E4%BF%A1%E5%8F%B7%E7%9A%84%0A%20%20%20%20%20%20%20%20%E9%A2%91%E5%9F%9F%E5%9B%BE%E5%83%8FFs%0A%20%20%20%20%20%20%20%20%E4%B8%8E%E5%8E%9F%E7%82%B9%E7%9A%84%E8%B7%9D%E7%A6%BB%E7%BC%A9%E5%B0%8F%0A%20%20%20%20%20%20%20%20%E8%A1%A8%E7%8E%B0%E4%B8%BA%E5%9B%BE%E5%83%8F%E7%BC%A9%E7%AA%84%22)%0A%20%20%20%20%20%20%20%20z3(%22%E4%B9%98%E7%A7%AF%E4%BF%A1%E5%8F%B7f2%0A%20%20%20%20%20%20%20%20%E7%9A%84%E5%9B%BE%E5%83%8F%E6%8B%89%E5%AE%BD%22)%0A%20%20%20%20%20%20%20%20z4(%22%E5%8D%B7%E7%A7%AF%E4%BF%A1%E5%8F%B7F2%E7%9A%84%E5%9B%BE%E5%83%8F%0A%20%20%20%20%20%20%20%20%E7%BC%A9%E7%AA%84%E3%80%81%E5%B9%85%E5%80%BC%E7%BC%A9%E5%B0%8F%22)%0A%20%20%20%20%20%20%20%20z1%20---%7C%E5%90%8C%E6%97%B6%E5%8F%91%E7%94%9F%7C%20z2%20---%7C%E5%90%8C%E6%97%B6%E5%8F%91%E7%94%9F%7C%20z3%20---%7C%E5%90%8C%E6%97%B6%E5%8F%91%E7%94%9F%7C%20z4%20%0A%09end%0A%09p1%20--%3E%20p2%20--%3E%20p3%0A"></Mermaid><p><img src="@source/课程实验/专业实验/实验报告.assets/image-20220604231442779.png" alt="image-20220604231442779" loading="lazy"></p>
<p><img src="@source/课程实验/专业实验/实验报告.assets/image-20220604231459303.png" alt="image-20220604231459303" loading="lazy"></p>
<ul>
<li>由于该题较为简单，所以设计过程中基本没有出现什么错误。</li>
</ul>
<h3 id="_4-结论-2" tabindex="-1"><a class="header-anchor" href="#_4-结论-2" aria-hidden="true">#</a> 4.结论</h3>
<p>本次实验已达到设计题目的要求，功能完善，特点是设计方案和演示效果集成在个人博客中，界面优雅简洁。</p>
<p>不足之处是没有程序般严密的计算。</p>
<h3 id="_5-结束语-2" tabindex="-1"><a class="header-anchor" href="#_5-结束语-2" aria-hidden="true">#</a> 5.结束语</h3>
<p>本次实验过程中基本没有遇到什么困难。</p>
<p>通过本次实验，我重拾了After Effect这款软件，对它有了更熟练的操作；对抽样定理有了更深的理解。</p>
<h2 id="兑奖算法" tabindex="-1"><a class="header-anchor" href="#兑奖算法" aria-hidden="true">#</a> 兑奖算法</h2>
<h3 id="_1-概述-3" tabindex="-1"><a class="header-anchor" href="#_1-概述-3" aria-hidden="true">#</a> 1.概述</h3>
<ul>
<li>
<p>设计的任务：</p>
<ol>
<li>
<p>问题描述：设兑奖方式为：从 1 到 22 选出 5 个不重复的数字{a0,a1,a2,a3,a4}，而主办方开出5 个号码P0、P1、P2、P3、P4，外加一个特别号 P5，得奖方式如下：</p>
<p>大奖：5 个号码和特别号码完全相同 一等奖：5 个号码完全相同，即{a0,a1,a2,a3,a4}={ P0，P1，P2，P3，P4}。</p>
<p>二等奖：{a0,a1,a2,a3,a4}中有 4 个号码出现在{ P0，P1，P2，P3，P4}，另一个号码等于P5。</p>
<p>三得奖：{a0,a1,a2,a3,a4}中有 4 个号码出现在{ P0，P1，P2，P3，P4}，另一个号码不等于P5。</p>
<p>四等奖：{a0,a1,a2,a3,a4}中有 3 个号码出现在{ P0，P1，P2，P3，P4}。</p>
<p>五等奖：{a0,a1,a2,a3,a4}中有 2 个号码出现在{ P0，P1，P2，P3，P4}。问题是：根据投注情况，求出中奖的注。</p>
</li>
<li>
<p>基本要求</p>
<p>（1） 设计投注的数据结构。</p>
<p>（2） 设计投注方式：键盘输入或从文件输入等。</p>
<p>（3） 设计求解中奖注的算法。</p>
<p>（4） 输出中奖注。</p>
<p>（5） 输入随机注，判断是否中奖，中几等奖。</p>
</li>
</ol>
</li>
<li>
<p>需要的知识点：vue.js基本语法、vue中watch的基本用法、vuepress的二次开发、第三方插件Lucky Canvas的引入和使用、简单的按键消抖等。</p>
</li>
<li>
<p>具体完成的设计内容：已完成所有内容，主要分为三个模块：抽奖模块、开奖模块、兑奖模块。</p>
</li>
<li>
<p>创新点：设计方案和演示效果集成在个人博客中，界面优雅简洁；不止是给出获奖等级，模拟了抽奖转盘，用户对抽奖流程可见；用户可“作弊”。</p>
</li>
</ul>
<h3 id="_2-总体设计-3" tabindex="-1"><a class="header-anchor" href="#_2-总体设计-3" aria-hidden="true">#</a> 2.总体设计</h3>
<ul>
<li>
<p>软件结构设计：对用户可见：开奖按钮、兑奖按钮、抽奖按钮，抽奖的转盘，外加一个“作弊”的输入框，各模块说明如下：用户点击抽奖 -&gt; 转盘转动，模拟随机抽奖效果 -&gt; 给出抽到的数字或别的什么标识；用户点击开奖 -&gt; 给出后台随机生成的5个号码及1个特殊号码；用户点击兑奖 -&gt; 对比开奖号码和抽奖号码，判断用户获奖等级并告知用户；用户在输入框输入想要的号码 -&gt; 后台直接将这串号码当成用户抽到的号码。</p>
</li>
<li>
<p>数据结构设计：采用的全局变量：msg（字符串型）、userNumber（数组型）、btnClickNum（整型）、adminNumbers（数组型）、specialNumber（整型）、grade（获奖等级）、userInput（字符串型）</p>
<Mermaid id="mermaid-64a559a6" code="flowchart%20LR%0A%09x1(%22msg%22)%20--%3E%20y1(%22%E7%94%A8%E4%BA%8E%E5%AD%98%E5%82%A8%E6%8F%90%E7%A4%BA%E4%BF%A1%E6%81%AF%22)%0A%09x2(%22userNumber%22)%20--%3E%20y2(%22%E7%94%A8%E4%BA%8E%E5%AD%98%E5%82%A8%E7%94%A8%E6%88%B7%E6%8A%BD%E5%88%B0%E7%9A%84%E5%8F%B7%E7%A0%81%E6%95%B0%22)%0A%09x3(%22btnClickNum%22)%20--%3E%20y3(%22%E7%94%A8%E4%BA%8E%E8%AE%A1%E6%95%B0%E6%B3%95%E6%8C%89%E9%94%AE%E6%B6%88%E6%8A%96%22)%0A%09x4(%22adminNumbers%22)%20--%3E%20y4(%22%E7%94%A8%E4%BA%8E%E5%AD%98%E5%82%A8%E4%B8%BB%E5%8A%9E%E6%96%B9%E7%9A%84%E5%BC%80%E5%A5%96%E5%8F%B7%E7%A0%81%22)%0A%09x5(%22specialNumber%22)%20--%3E%20y5(%22%E7%94%A8%E4%BA%8E%E5%AD%98%E5%82%A8%E7%94%A8%E6%88%B7%E6%8A%BD%E5%88%B0%E7%9A%84%E5%8F%B7%E7%A0%81%E6%95%B0%22)%0A%09x6(%22grade%22)%20--%3E%20y6(%22%E7%94%A8%E4%BA%8E%E5%AD%98%E5%82%A8%E7%94%A8%E6%88%B7%E6%8A%BD%E5%88%B0%E7%9A%84%E5%8F%B7%E7%A0%81%E6%95%B0%22)%0A%09x7(%22userInput%22)%20--%3E%20y7(%22%E7%94%A8%E4%BA%8E%E5%AD%98%E5%82%A8%E7%94%A8%E6%88%B7%E7%9A%84%E8%BE%93%E5%85%A5%22)%0A%09%0A"></Mermaid></li>
</ul>
<h3 id="_3-详细设计及实现-3" tabindex="-1"><a class="header-anchor" href="#_3-详细设计及实现-3" aria-hidden="true">#</a> 3.详细设计及实现</h3>
<ul>
<li>主要模块的流程图:</li>
</ul>
<Mermaid id="mermaid-64a55962" code="%20%20flowchart%20TB%09%09%0A%20%20%09subgraph%20p1%5B%22%E6%8A%BD%E5%A5%96%E6%A8%A1%E5%9D%97%22%5D%0A%20%20%09direction%20TB%0A%20%20%09%09subgraph%20p0%5B%22%E8%BF%99%E6%98%AF%E4%B8%80%E4%B8%AA%E9%BB%91%E7%AE%B1%22%5D%0A%20%20%20%20%20%20%20%20%20%20direction%20TB%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20a1(%22A0%2CA1%2C...%2CA21%22)%0A%20%20%20%20%20%20%20%20%20%20end%0A%20%20%20%20%20%20%20%20%20%20x1(%22a0%2Ca1%2Ca2%2Ca3%2Ca4%22)%20%20%20%20%20%0A%20%20%20%20%20%20%20%20%20%20p0%20--%3E%7C%E9%9A%8F%E6%9C%BA%E4%B8%8D%E9%87%8D%E5%A4%8D%E6%8A%9B%E5%87%BA5%E4%B8%AA%2C%5Cn%E7%BB%8F%E8%BF%87%E6%8E%92%E5%BA%8F%E6%95%B4%E7%90%86%7Cx1%0A%20%20%09end%0A%20%20%09%0A%20%20%09subgraph%20p2%5B%22%E5%BC%80%E5%A5%96%E6%A8%A1%E5%9D%97%22%5D%0A%20%20%09direction%20TB%0A%20%20%20%20%20%20%20%20%20subgraph%20p4%5B%22%E8%BF%99%E6%98%AF%E4%B8%80%E4%B8%AA%E9%BB%91%E7%AE%B1%22%5D%0A%20%20%20%20%20%20%20%20%20%20direction%20TB%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20a2(%22A0%2CA1%2C...%2CA21%22)%0A%20%20%20%20%20%20%20%20%20%20end%0A%20%20%20%20%20%20%20%20%20%20y1(%22P0%2CP1%2CP2%2CP3%2CP4%22)%20%20%20%20%20%0A%20%20%20%20%20%20%20%20%20%20p4%20--%3E%7C%E9%9A%8F%E6%9C%BA%E4%B8%8D%E9%87%8D%E5%A4%8D%E6%8A%9B%E5%87%BA5%E4%B8%AA%2C%5Cn%E7%BB%8F%E8%BF%87%E6%8E%92%E5%BA%8F%E6%95%B4%E7%90%86%7Cy1%0A%20%20%20%20%20%20%20%20%20%20p4%20--%3E%7C%E9%9A%8F%E6%9C%BA%E6%8A%9B%E5%87%BA%E4%B8%80%E4%B8%AA%E7%89%B9%E6%AE%8A%E5%8F%B7%E7%A0%81P0%7C%20y2(%22P5%22)%0A%20%20%09end%0A%20%20%09%0A%20%20%09subgraph%20p3%5B%22%E5%85%91%E5%A5%96%E6%A8%A1%E5%9D%97%22%5D%0A%20%20%09direction%20LR%0A%20%20%20%20%20%20%20%20%20%20z1(%22some%20operation%22)%20--%3E%20z2(%22...%22)%20--%3E%20z3(%22some%20operation%22)%0A%20%20%09end%0A%20%20%09p1%20--%3E%20t1(%22a0%2Ca1%2Ca2%2Ca3%2Ca4%22)%20--%3E%20p3%0A%20%20%09p2%20--%3E%20t2(%22(P0%2CP1%2CP2%2CP3%2CP4)%2BP5%22)%20--%3E%20p3%20--%3E%20res(%22%E5%91%8A%E7%9F%A5%E7%94%A8%E6%88%B7%E8%8E%B7%E5%A5%96%E7%AD%89%E7%BA%A7%22)%0A"></Mermaid><p>找到LuckyCanvas插件的github地址</p>
<p><img src="@source/课程实验/专业实验/实验报告.assets/image-20220605183642963.png" alt="image-20220605183642963" loading="lazy"></p>
<p>项目运行结果：</p>
<p><img src="@source/课程实验/专业实验/实验报告.assets/image-20220605200926790.png" alt="image-20220605200926790" loading="lazy"></p>
<p>点击链接查看项目运行地址：</p>
<p><img src="@source/课程实验/专业实验/实验报告.assets/image-20220605201008044.png" alt="image-20220605201008044" loading="lazy"></p>
<p>点击开奖：</p>
<p><img src="@source/课程实验/专业实验/实验报告.assets/image-20220605201050205.png" alt="image-20220605201050205" loading="lazy"></p>
<p>点击单抽或五连抽，会有类似大转盘的抽奖动画：</p>
<p><img src="@source/课程实验/专业实验/实验报告.assets/image-20220605201130956.png" alt="image-20220605201130956" loading="lazy"></p>
<p>抽完五个数后，会显示用户手中的号码数：</p>
<p><img src="@source/课程实验/专业实验/实验报告.assets/image-20220605201228520.png" alt="image-20220605201228520" loading="lazy"></p>
<p>点击兑奖，会给出用户的获奖等级：</p>
<p><img src="@source/课程实验/专业实验/实验报告.assets/image-20220605201320740.png" alt="image-20220605201320740" loading="lazy"></p>
<p>再次点击开奖，会有提示信息：</p>
<p><img src="@source/课程实验/专业实验/实验报告.assets/image-20220605201407280.png" alt="image-20220605201407280" loading="lazy"></p>
<p>再次点击抽奖，也会有提示信息：</p>
<p><img src="@source/课程实验/专业实验/实验报告.assets/image-20220605201437751.png" alt="image-20220605201437751" loading="lazy"></p>
<p>可以在“作弊”输入框输入想要的号码：</p>
<p><img src="@source/课程实验/专业实验/实验报告.assets/image-20220605201553452.png" alt="image-20220605201553452" loading="lazy"></p>
<ul>
<li>由于该题较为简单，所以设计过程中基本没有出现什么错误。</li>
</ul>
<h3 id="_4-结论-3" tabindex="-1"><a class="header-anchor" href="#_4-结论-3" aria-hidden="true">#</a> 4.结论</h3>
<p>本次实验已达到设计题目的要求，功能完善，特点是设计方案和演示效果集成在个人博客中，界面优雅简洁；不止是给出获奖等级，模拟了抽奖转盘，用户对抽奖流程可见；用户可“作弊”。</p>
<p>不足之处由于插件LuckyCanvas本身的局限，不能同时抽到多个数，设计中所谓的五连抽其实是连续单抽五次。</p>
<h3 id="_5-结束语-3" tabindex="-1"><a class="header-anchor" href="#_5-结束语-3" aria-hidden="true">#</a> 5.结束语</h3>
<p>本次实验过程中基本没有遇到什么困难。</p>
<p>通过本次实验，我对vuepress的二次开发使用有了更深的掌握，对Lucky Canvas有了初步的认识与使用。</p>
<h3 id="_6-程序清单-2" tabindex="-1"><a class="header-anchor" href="#_6-程序清单-2" aria-hidden="true">#</a> 6.程序清单</h3>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// 点击抽奖按钮会触发star回调</span>
    <span class="token function">startCallback</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// 调用抽奖组件的play方法开始游戏</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>$refs<span class="token punctuation">.</span>myLucky<span class="token punctuation">.</span><span class="token function">play</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token comment">// 模拟调用接口异步抽奖</span>
      <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        <span class="token comment">// 假设后端返回的中奖索引是0</span>
        <span class="token keyword">let</span> haveSameNum <span class="token operator">=</span> <span class="token boolean">true</span>
        <span class="token keyword">let</span> prizeIndex<span class="token comment">//奖品的索引</span>
        <span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          prizeIndex <span class="token operator">=</span> Math<span class="token punctuation">.</span><span class="token function">floor</span><span class="token punctuation">(</span>Math<span class="token punctuation">.</span><span class="token function">random</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">*</span> <span class="token number">21</span> <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token comment">//得到1~22之间的一个随机数，不保证不重复</span>
          <span class="token comment">// console.log(prizeIndex);</span>
          haveSameNum <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">checkHaveSame</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>userNumbers<span class="token punctuation">,</span>prizeIndex<span class="token punctuation">)</span>
          <span class="token keyword">if</span><span class="token punctuation">(</span>haveSameNum <span class="token operator">===</span> <span class="token boolean">false</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>userNumbers<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>prizeIndex<span class="token punctuation">)</span>
            <span class="token keyword">break</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token comment">// 调用stop停止旋转并传递中奖索引</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>$refs<span class="token punctuation">.</span>myLucky<span class="token punctuation">.</span><span class="token function">stop</span><span class="token punctuation">(</span>prizeIndex<span class="token punctuation">)</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">1000</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token comment">// 抽奖结束会触发end回调</span>
    <span class="token function">endCallback</span> <span class="token punctuation">(</span><span class="token parameter">prize</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>msg <span class="token operator">=</span> <span class="token string">'你抽到了数字：'</span> <span class="token operator">+</span> prize<span class="token punctuation">.</span>fonts<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span>text
      <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">showMsg</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token comment">/*单抽*/</span>
    <span class="token function">singleClick</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>btnClickNum <span class="token operator">++</span>
      <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>btnClickNum <span class="token operator">===</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>userNumbers<span class="token punctuation">.</span>length <span class="token operator">>=</span> <span class="token number">5</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token comment">//用户号码数有5个，即此时是选择重开与否</span>
          <span class="token keyword">this</span><span class="token punctuation">.</span>confirmRes <span class="token operator">=</span> <span class="token function">confirm</span><span class="token punctuation">(</span><span class="token string">'你已经抽到了5个数，确定重开吗'</span><span class="token punctuation">)</span>
          <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>confirmRes<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">//若用户选择了重开</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>userNumbers <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token comment">//用户号码数'清零'</span>
            <span class="token comment">//用户号码数提示框隐藏</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">startCallback</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>confirmRes <span class="token operator">=</span> <span class="token boolean">false</span> <span class="token comment">//恢复默认值</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">else</span> <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>userNumbers<span class="token punctuation">.</span>length <span class="token operator">>=</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token comment">//初始情况，直接单抽</span>
          <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">startCallback</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
        <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
          <span class="token keyword">this</span><span class="token punctuation">.</span>btnClickNum <span class="token operator">=</span> <span class="token number">0</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span><span class="token number">2000</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token comment">/*五连抽*/</span>
    <span class="token function">seriesDraw</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>btnClickNum <span class="token operator">++</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>btnClickNum <span class="token operator">===</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
          <span class="token keyword">this</span><span class="token punctuation">.</span>btnClickNum <span class="token operator">=</span> <span class="token number">0</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span><span class="token number">2000</span><span class="token punctuation">)</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>userNumbers<span class="token punctuation">.</span>length <span class="token operator">>=</span> <span class="token number">5</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token comment">//当用户号码数有5个</span>
          <span class="token keyword">this</span><span class="token punctuation">.</span>confirmRes <span class="token operator">=</span> <span class="token function">confirm</span><span class="token punctuation">(</span><span class="token string">'你已经抽到了5个数，确定重开吗'</span><span class="token punctuation">)</span>
          <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>confirmRes<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">//若用户选择重开</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>userNumbers <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token comment">//用户号码数'清零'</span>
            <span class="token comment">//用户号码数提示框隐藏</span>
            <span class="token function">$</span><span class="token punctuation">(</span><span class="token string">'.userNum'</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">animate</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
              <span class="token literal-property property">opacity</span><span class="token operator">:</span> <span class="token string">'0'</span>
            <span class="token punctuation">}</span><span class="token punctuation">)</span>
            <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;=</span> <span class="token number">4</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
              <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
                <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">startCallback</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
              <span class="token punctuation">}</span><span class="token punctuation">,</span> i <span class="token operator">*</span> <span class="token number">3000</span><span class="token punctuation">)</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>confirmRes <span class="token operator">=</span> <span class="token boolean">false</span><span class="token comment">//恢复默认值</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">else</span> <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>userNumbers<span class="token punctuation">.</span>length <span class="token operator">>=</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token comment">//已经单抽过了</span>
          <span class="token keyword">this</span><span class="token punctuation">.</span>msg <span class="token operator">=</span> <span class="token string">'你已经单抽了，不能五连抽'</span>
          <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">showMsg</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>userNumbers<span class="token punctuation">.</span>length <span class="token operator">>=</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token comment">//初始情况,可直接进行五连抽</span>
          <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;=</span> <span class="token number">4</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
              <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">startCallback</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span> i <span class="token operator">*</span> <span class="token number">3000</span><span class="token punctuation">)</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token comment">/*主办方开奖*/</span>
    <span class="token function">getAdminNumbers</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>btnClickNum <span class="token operator">++</span>
      <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>btnClickNum <span class="token operator">===</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">//防止按键短时间内被点击使函数执行多次</span>
        <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span><span class="token keyword">this</span><span class="token punctuation">.</span>btnClickNum <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">}</span><span class="token punctuation">,</span><span class="token number">2000</span><span class="token punctuation">)</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>adminNumbers<span class="token punctuation">.</span>length <span class="token operator">>=</span> <span class="token number">5</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token keyword">this</span><span class="token punctuation">.</span>confirmRes <span class="token operator">=</span> <span class="token function">confirm</span><span class="token punctuation">(</span><span class="token string">'你已开奖，确定重新开奖？'</span><span class="token punctuation">)</span>
          <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>confirmRes<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>confirmRes <span class="token operator">=</span> <span class="token boolean">false</span> <span class="token comment">//恢复默认值</span>
            <span class="token keyword">let</span> num <span class="token operator">=</span> Math<span class="token punctuation">.</span><span class="token function">floor</span><span class="token punctuation">(</span>Math<span class="token punctuation">.</span><span class="token function">random</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">*</span> <span class="token number">21</span> <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>adminNumbers <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>adminNumbers<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>num<span class="token punctuation">)</span>
            <span class="token keyword">let</span> haveSameNum
            <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>adminNumbers<span class="token punctuation">.</span>length <span class="token operator">&lt;</span> <span class="token number">5</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
              <span class="token keyword">let</span> adminIndex <span class="token operator">=</span> Math<span class="token punctuation">.</span><span class="token function">floor</span><span class="token punctuation">(</span>Math<span class="token punctuation">.</span><span class="token function">random</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">*</span> <span class="token number">21</span> <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span>
              haveSameNum <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">checkHaveSame</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>adminNumbers<span class="token punctuation">,</span>adminIndex<span class="token punctuation">)</span>
              <span class="token keyword">if</span><span class="token punctuation">(</span>haveSameNum <span class="token operator">===</span> <span class="token boolean">false</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">this</span><span class="token punctuation">.</span>adminNumbers<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>adminIndex<span class="token punctuation">)</span>
              <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>specialNumber <span class="token operator">=</span> Math<span class="token punctuation">.</span><span class="token function">floor</span><span class="token punctuation">(</span>Math<span class="token punctuation">.</span><span class="token function">random</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">*</span> <span class="token number">21</span> <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token comment">//特殊号码数</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">else</span> <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>adminNumbers<span class="token punctuation">.</span>length <span class="token operator">===</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token comment">//初始情况，直接开奖</span>
          <span class="token keyword">let</span> num <span class="token operator">=</span> Math<span class="token punctuation">.</span><span class="token function">floor</span><span class="token punctuation">(</span>Math<span class="token punctuation">.</span><span class="token function">random</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">*</span> <span class="token number">21</span> <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span>
          <span class="token keyword">this</span><span class="token punctuation">.</span>adminNumbers <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
          <span class="token keyword">this</span><span class="token punctuation">.</span>adminNumbers<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>num<span class="token punctuation">)</span>
          <span class="token keyword">let</span> haveSameNum
          <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>adminNumbers<span class="token punctuation">.</span>length <span class="token operator">&lt;</span> <span class="token number">5</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">let</span> adminIndex <span class="token operator">=</span> Math<span class="token punctuation">.</span><span class="token function">floor</span><span class="token punctuation">(</span>Math<span class="token punctuation">.</span><span class="token function">random</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">*</span> <span class="token number">21</span> <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span>
            haveSameNum <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">checkHaveSame</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>adminNumbers<span class="token punctuation">,</span>adminIndex<span class="token punctuation">)</span>
            <span class="token keyword">if</span><span class="token punctuation">(</span>haveSameNum <span class="token operator">===</span> <span class="token boolean">false</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
              <span class="token keyword">this</span><span class="token punctuation">.</span>adminNumbers<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>adminIndex<span class="token punctuation">)</span>
            <span class="token punctuation">}</span>
          <span class="token punctuation">}</span>
          <span class="token keyword">this</span><span class="token punctuation">.</span>specialNumber <span class="token operator">=</span> Math<span class="token punctuation">.</span><span class="token function">floor</span><span class="token punctuation">(</span>Math<span class="token punctuation">.</span><span class="token function">random</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">*</span> <span class="token number">21</span> <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token comment">//特殊号码数</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token comment">/*兑奖*/</span>
    <span class="token function">getMyPrize</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>userNumbers<span class="token punctuation">.</span>length <span class="token operator">>=</span><span class="token number">5</span> <span class="token operator">&amp;&amp;</span> <span class="token keyword">this</span><span class="token punctuation">.</span>adminNumbers<span class="token punctuation">.</span>length <span class="token operator">>=</span><span class="token number">5</span> <span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">let</span> judgeSum <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">compareArray</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>userNumbers<span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>adminNumbers<span class="token punctuation">)</span>
        <span class="token keyword">let</span> judgeSpecial <span class="token operator">=</span> <span class="token boolean">false</span>
        <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token keyword">in</span> <span class="token keyword">this</span><span class="token punctuation">.</span>userNumbers<span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>userNumbers<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">===</span> <span class="token keyword">this</span><span class="token punctuation">.</span>specialNumber<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            judgeSpecial <span class="token operator">=</span> <span class="token boolean">true</span>
            <span class="token keyword">break</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>judgeSum <span class="token operator">&lt;</span> <span class="token number">2</span><span class="token punctuation">)</span> <span class="token keyword">this</span><span class="token punctuation">.</span>grade <span class="token operator">=</span> <span class="token number">0</span>
        <span class="token keyword">else</span> <span class="token keyword">if</span><span class="token punctuation">(</span>judgeSum <span class="token operator">===</span> <span class="token number">2</span><span class="token punctuation">)</span> <span class="token keyword">this</span><span class="token punctuation">.</span>grade <span class="token operator">=</span> <span class="token number">1</span><span class="token comment">//五等奖</span>
        <span class="token keyword">else</span> <span class="token keyword">if</span><span class="token punctuation">(</span>judgeSum <span class="token operator">===</span> <span class="token number">3</span><span class="token punctuation">)</span> <span class="token keyword">this</span><span class="token punctuation">.</span>grade <span class="token operator">=</span> <span class="token number">2</span><span class="token comment">//四等奖</span>
        <span class="token keyword">else</span> <span class="token keyword">if</span><span class="token punctuation">(</span>judgeSum <span class="token operator">===</span> <span class="token number">4</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token operator">!</span>judgeSpecial<span class="token punctuation">)</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>grade <span class="token operator">=</span> <span class="token number">3</span> <span class="token comment">//三等奖</span>
          <span class="token keyword">else</span> <span class="token keyword">this</span><span class="token punctuation">.</span>grade <span class="token operator">=</span> <span class="token number">4</span> <span class="token comment">//二等奖</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">else</span> <span class="token keyword">if</span><span class="token punctuation">(</span>judgeSum <span class="token operator">===</span> <span class="token number">5</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token operator">!</span>judgeSpecial<span class="token punctuation">)</span> <span class="token keyword">this</span><span class="token punctuation">.</span>grade <span class="token operator">=</span> <span class="token number">5</span><span class="token comment">//一等奖</span>
          <span class="token keyword">else</span> <span class="token keyword">this</span><span class="token punctuation">.</span>grade <span class="token operator">=</span> <span class="token number">6</span><span class="token comment">//特等奖</span>
        <span class="token punctuation">}</span>
        <span class="token function">alert</span><span class="token punctuation">(</span><span class="token string">'获奖等级：'</span> <span class="token operator">+</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">switchGradeToStr</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>grade<span class="token punctuation">)</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="中国象棋" tabindex="-1"><a class="header-anchor" href="#中国象棋" aria-hidden="true">#</a> 中国象棋</h2>
<h3 id="_1-概述-4" tabindex="-1"><a class="header-anchor" href="#_1-概述-4" aria-hidden="true">#</a> 1.概述</h3>
<ul>
<li>
<p>设计的任务：自己设计一款类似围棋的棋类对战软件，不能用五子棋等已有规则。</p>
<p>要求：</p>
<p>（1）可人人对战</p>
<p>（2）规则判断（提子、判断打劫）</p>
<p>（3）人机对战</p>
<p>（4）可点目（数子）判断胜负</p>
<p>（5）网络对战（选作）</p>
<p>注：课上老师指出也可以设计围棋、象棋等。</p>
</li>
<li>
<p>需要的知识点：vue.js基本语法、vue中watch的基本用法、vuepress的二次开发、中国象棋的走法、FEN串等、element UI的引入和使用。</p>
</li>
<li>
<p>具体完成的设计内容：已完成（1）（2）（3）（4）要求。其中玩家对战模块和人机对战模块规模最大，代码行数分别在400、900左右。</p>
</li>
<li>
<p>创新点：简单的评分系统和评语系统；人机对战中给电脑方设计了三项被动技能：兵线刷新、替父从军和草木皆兵；设置了三种难度：简单、困难和地狱。</p>
</li>
</ul>
<h3 id="_2-总体设计-4" tabindex="-1"><a class="header-anchor" href="#_2-总体设计-4" aria-hidden="true">#</a> 2.总体设计</h3>
<ul>
<li>
<p>软件结构设计：对用户可见：一个棋盘和棋子（包括空白处也算作空白棋子），重开按钮，人机对战按钮，难度选择按钮。各模块说明如下：获取用户前后两次鼠标点击的位置（即一个棋子的起点和终点） -&gt; 判断走法是否合法 -&gt; 合法则控制棋子坐标变化，重新渲染棋盘；人机对战轮到电脑方执棋时，电脑先计算求出所有红方可能走的棋子，选出对红方最有利的走法 -&gt; 电脑得知了红方下一步最有可能怎么走 -&gt; 电脑计算求出所有它可以走的棋子，找出能阻断破坏上述对红方最有利的走法、或对自己黑方最有利的走法，比如红方将军，轮到电脑执棋时，电脑会检索到红方将军这一步走法，然后尝试阻断这一将军；而在没有将军时，电脑也会尝试去吃掉红方价值最大的棋子。</p>
<Mermaid id="mermaid-64a550b0" code="flowchart%20TB%0A%09classDef%20manage%20file%3A%23ffffde%3B%0A%09p1%3A%3A%3Amanage%0A%09p2%3A%3A%3Amanage%0A%09subgraph%20p1%5B%22%E7%8E%A9%E5%AE%B6%E5%AF%B9%E6%88%98%E6%A8%A1%E5%9D%97%22%5D%0A%09direction%20TB%09%09%0A%09%09x3(%22%E8%B5%B0%E6%B3%95%E6%98%AF%E5%90%A6%E5%90%88%E6%B3%95%22)%0A%09end%0A%09x1(%22%E9%BC%A0%E6%A0%87%E7%AC%AC%E4%B8%80%E6%AC%A1%E7%82%B9%E5%87%BB%E7%9A%84%E4%BD%8D%E7%BD%AE%22)%0A%09x2(%22%E9%BC%A0%E6%A0%87%E7%AC%AC%E4%BA%8C%E6%AC%A1%E7%82%B9%E5%87%BB%E7%9A%84%E4%BD%8D%E7%BD%AE%22)%0A%09x1%20--%3E%20p1%0A%09x2%20--%3E%20p1%20--%3E%20x4(%22%E6%94%B9%E5%8F%98%E6%A3%8B%E5%AD%90%E5%9D%90%E6%A0%87%0A%09%E9%87%8D%E6%96%B0%E6%B8%B2%E6%9F%93%E6%A3%8B%E7%9B%98%0A%09%E5%AE%9E%E7%8E%B0%E8%B5%B0%E6%A3%8B%22)%0A%09%0A%09%0A%09subgraph%20p2%5B%22%E4%BA%BA%E6%9C%BA%E5%AF%B9%E6%88%98%E6%A8%A1%E5%9D%97%22%5D%0A%09direction%20TB%0A%09%09y2(%22%E9%80%9A%E8%BF%87%E6%90%9C%E7%B4%A2%E7%AE%97%E6%B3%95%E8%AE%A1%E7%AE%97%E5%87%BA%E7%94%B5%E8%84%91%E5%BA%94%E8%AF%A5%E8%B5%B0%E5%93%AA%E4%B8%80%E6%AD%A5%E6%A3%8B%22)%0A%09end%0A%09y1(%22%E7%8E%A9%E5%AE%B6%E7%9A%84%E8%B5%B0%E6%A3%8B%22)%20--%3E%20p2%20--%3E%20y3(%22%E6%94%B9%E5%8F%98%E6%A3%8B%E5%AD%90%E5%9D%90%E6%A0%87%0A%09%E9%87%8D%E6%96%B0%E6%B8%B2%E6%9F%93%E6%A3%8B%E7%9B%98%0A%09%E5%AE%9E%E7%8E%B0%E8%B5%B0%E6%A3%8B%22)%0A"></Mermaid></li>
<li>
<p>数据结构设计：采用的全局变量有dispalyChess(数组型)、playerSide（布尔型）、IN_BOARD_（数组型）、sqSelected（整型）、currentChess（字符型）、isHaveK_w（布尔型）、isHaveK_b（布尔型）、difficulty（字符串型）、probability（浮点型）、sqSrc（整型）、sqDest（整型）、IN_FORT_（数组型）、LEGAL_SPAN（数组型）、KNIGHT_PIN_（数组型）、wScore（整型）、bScore（整型）、markMsgArr（数组型），以及棋子图片、棋子背景图共18张图片。</p>
<Mermaid id="mermaid-64a550a4" code="flowchart%20LR%0Ax1(%22dispalyChess%22)%20--%3Ey1(%22%E7%94%A8%E4%BA%8E%E5%AD%98%E5%82%A8%E5%BD%93%E5%89%8D%E6%A3%8B%E7%9B%98%E4%BF%A1%E6%81%AF%22)%0Ax2(%22playerSide%22)%20--%3Ey2(%22%E7%94%A8%E4%BA%8E%E5%AD%98%E5%82%A8%E5%BD%93%E5%89%8D%E8%B5%B0%E6%A3%8B%E6%96%B9%E4%BF%A1%E6%81%AF%22)%0Ax3(%22IN_BOARD_%22)%20--%3Ey3(%22%E8%BE%85%E5%8A%A9%E6%95%B0%E7%BB%84%EF%BC%8C%E7%94%A8%E4%BA%8E%E5%88%A4%E6%96%AD%E6%9F%90%E4%B8%80%0A%E6%A3%8B%E5%AD%90%E7%9A%84%E4%B8%80%E7%BB%B4%E5%9D%90%E6%A0%87%E6%98%AF%E5%90%A6%E5%9C%A8%E6%A3%8B%E7%9B%98%E5%86%85%22)%0Ax4(%22sqSelected%22)%20--%3Ey4(%22%E5%BD%93%E5%89%8D%E9%BC%A0%E6%A0%87%E6%98%AF%E5%90%A6%E9%80%89%E4%B8%AD%E4%B8%80%E6%A3%8B%E5%AD%90%22)%0Ax5(%22currentChess%22)%20--%3Ey5(%22%E5%BD%93%E5%89%8D%E9%80%89%E4%B8%AD%E7%9A%84%E6%A3%8B%E5%AD%90%EF%BC%8C%E7%9A%84%E9%A6%96%E5%AD%97%E6%AF%8D%2C%22)%0Ax6(%22isHaveK_w%22)%20--%3Ey6(%22%E7%94%A8%E4%BA%8E%E8%AE%B0%E5%BD%95%E5%BD%93%E5%89%8D%E6%A3%8B%E7%9B%98%E6%98%AF%E5%90%A6%E8%BF%98%E6%9C%89%E7%BA%A2%E6%96%B9%E5%B8%85%22)%0Ax7(%22isHaveK_w%22)%20--%3Ey7(%22%E7%94%A8%E4%BA%8E%E8%AE%B0%E5%BD%95%E5%BD%93%E5%89%8D%E6%A3%8B%E7%9B%98%E6%98%AF%E5%90%A6%E8%BF%98%E6%9C%89%E9%BB%91%E6%96%B9%E5%B0%86%22)%0Ax8(%22difficulty%22)%20--%3Ey8(%22%E8%AE%B0%E5%BD%95%E7%94%A8%E6%88%B7%E9%80%89%E6%8B%A9%E7%9A%84%E9%9A%BE%E5%BA%A6%22)%0Ax9(%22probability%22)%20--%3Ey9(%22%E6%8E%A7%E5%88%B6%E8%A2%AB%E5%8A%A8%E6%8A%80%E8%83%BD%E2%80%9C%E6%9B%BF%E7%88%B6%E4%BB%8E%E5%86%9B%E2%80%9D%E8%A7%A6%E5%8F%91%E7%9A%84%E6%A6%82%E7%8E%87%22)%0Ax10(%22sqSrc%22)%20--%3Ey10(%22%E8%AE%B0%E5%BD%95%E6%9F%90%E4%B8%80%E6%96%B9%E9%80%89%E6%8B%A9%E6%A3%8B%E5%AD%90%E7%9A%84%E8%B5%B7%E7%82%B9%22)%0Ax11(%22sqDest%22)%20--%3Ey11(%22%E8%AE%B0%E5%BD%95%E6%9F%90%E4%B8%80%E6%96%B9%E9%80%89%E6%8B%A9%E6%A3%8B%E5%AD%90%E7%9A%84%E7%BB%88%E7%82%B9%22)%0Ax12(%22LEGAL_SPAN%22)%20--%3Ey12(%22%E7%94%A8%E4%BA%8E%E5%88%A4%E6%96%ADsqDest-sqSrc%E7%AD%89%E4%BA%8E-16%E3%80%81-1%E3%80%811%E3%80%8116%22)%0Ax13(%22KNIGHT_PIN_%22)%20--%3Ey13(%22%E8%BE%85%E5%8A%A9%E6%95%B0%E7%BB%84%EF%BC%8C%E7%94%A8%E4%BA%8E%E5%88%A4%E6%96%AD%E9%A9%AC%E8%84%9A%E5%A4%84%E6%98%AF%E5%90%A6%E6%9C%89%E6%A3%8B%E5%AD%90%22)%0Ax14(%22wScore%22)%20--%3Ey14(%22%E8%AE%B0%E5%BD%95%E7%BA%A2%E6%96%B9%E5%BE%97%E5%88%86%22)%0Ax15(%22bScore%22)%20--%3Ey15(%22%E8%AE%B0%E5%BD%95%E9%BB%91%E6%96%B9%E5%BE%97%E5%88%86%22)%0Ax16(%22markMsgArr%22)%20--%3Ey16(%22%E5%AD%98%E5%82%A8%E6%89%80%E6%9C%89%E8%AF%84%E8%AF%AD%E4%BF%A1%E6%81%AF%22)%0A"></Mermaid></li>
</ul>
<h3 id="_3-详细设计及实现-4" tabindex="-1"><a class="header-anchor" href="#_3-详细设计及实现-4" aria-hidden="true">#</a> 3.详细设计及实现</h3>
<ul>
<li>
<p>算法介绍：</p>
<h4 id="_1-设计图形界面" tabindex="-1"><a class="header-anchor" href="#_1-设计图形界面" aria-hidden="true">#</a> 1.设计图形界面</h4>
<p>中国象棋有10行9列，很自然地想到可以用10×9矩阵表示棋盘。事实上，我们使用16×16矩阵来表示一个扩充了的虚拟棋盘。</p>
<p><img src="@source/课程实验/专业实验/实验报告.assets/image-20220605213010267.png" alt="image-20220605213010267" loading="lazy"></p>
<p>如上图所示，灰色部分为真实棋盘，置于虚拟棋盘之中。这么做是因为可以快速判断棋子是否走出边界，以及便于之后的一些运算。</p>
<p>容易想到使用二维数组表示16×16矩阵，这样棋盘上的一个位置需要两个变量表示。如果使用长度为256的一维数组表示，一个位置只需一个变量，这就可以减少计算量。因此用一维数组表示16×16矩阵。</p>
<p>一维矩阵和二维矩阵之间的转换已经有现成算法，如下：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token constant">RANK_Y</span><span class="token punctuation">(</span><span class="token parameter">sq</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token comment">// 根据一维矩阵，获取二维矩阵行数 行数从0开始</span>
      <span class="token keyword">return</span> sq <span class="token operator">>></span> <span class="token number">4</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token constant">FILE_X</span><span class="token punctuation">(</span><span class="token parameter">sq</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token comment">// 根据一维矩阵，获取二维矩阵列数 列数从0开始</span>
      <span class="token keyword">return</span> sq <span class="token operator">&amp;</span> <span class="token number">15</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>判断某位置是否在棋盘内：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token constant">IN_BOARD</span><span class="token punctuation">(</span><span class="token parameter">sq</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token constant">IN_BOARD_</span><span class="token punctuation">[</span>sq<span class="token punctuation">]</span> <span class="token operator">!=</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2-棋子表示" tabindex="-1"><a class="header-anchor" href="#_2-棋子表示" aria-hidden="true">#</a> 2.棋子表示</h4>
<p>使用整数表示棋子</p>
<table>
<thead>
<tr>
<th style="text-align:center"></th>
<th style="text-align:center">将</th>
<th style="text-align:center">士</th>
<th style="text-align:center">象</th>
<th style="text-align:center">马</th>
<th style="text-align:center">车</th>
<th style="text-align:center">炮</th>
<th style="text-align:center">卒</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">红方</td>
<td style="text-align:center">8</td>
<td style="text-align:center">9</td>
<td style="text-align:center">10</td>
<td style="text-align:center">11</td>
<td style="text-align:center">12</td>
<td style="text-align:center">13</td>
<td style="text-align:center">14</td>
</tr>
<tr>
<td style="text-align:center">黑方</td>
<td style="text-align:center">16</td>
<td style="text-align:center">17</td>
<td style="text-align:center">18</td>
<td style="text-align:center">19</td>
<td style="text-align:center">20</td>
<td style="text-align:center">21</td>
<td style="text-align:center">22</td>
</tr>
</tbody>
</table>
<p>这样可以快速判断某棋子属于红方还是黑方，如下表所示：</p>
<table>
<thead>
<tr>
<th style="text-align:center">红方棋子</th>
<th style="text-align:center">红方棋子</th>
<th style="text-align:center">黑方棋子</th>
<th style="text-align:center">黑方棋子</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">十进制</td>
<td style="text-align:center">二进制</td>
<td style="text-align:center">十进制</td>
<td style="text-align:center">二进制</td>
</tr>
<tr>
<td style="text-align:center">8</td>
<td style="text-align:center">0000 1000</td>
<td style="text-align:center">16</td>
<td style="text-align:center">0001 0000</td>
</tr>
<tr>
<td style="text-align:center">9</td>
<td style="text-align:center">0000 1001</td>
<td style="text-align:center">17</td>
<td style="text-align:center">0001 0001</td>
</tr>
<tr>
<td style="text-align:center">10</td>
<td style="text-align:center">0000 1010</td>
<td style="text-align:center">18</td>
<td style="text-align:center">0001 0010</td>
</tr>
<tr>
<td style="text-align:center">11</td>
<td style="text-align:center">0000 1011</td>
<td style="text-align:center">19</td>
<td style="text-align:center">0001 0011</td>
</tr>
<tr>
<td style="text-align:center">12</td>
<td style="text-align:center">0000 1100</td>
<td style="text-align:center">20</td>
<td style="text-align:center">0001 0100</td>
</tr>
<tr>
<td style="text-align:center">13</td>
<td style="text-align:center">0000 1101</td>
<td style="text-align:center">21</td>
<td style="text-align:center">0001 0101</td>
</tr>
<tr>
<td style="text-align:center">14</td>
<td style="text-align:center">0000 1110</td>
<td style="text-align:center">22</td>
<td style="text-align:center">0001 0110</td>
</tr>
</tbody>
</table>
<p>可以看出：</p>
<p>红方棋子 &amp; 8 = 1</p>
<p>黑方棋子 &amp; 16 = 1</p>
<h4 id="_3-字符串表示局面" tabindex="-1"><a class="header-anchor" href="#_3-字符串表示局面" aria-hidden="true">#</a> 3.字符串表示局面</h4>
<p>我们可以用一行字符串表示一个局面，这就是FEN格式串，一种使用ASCII码字符描述国际象棋局面的标准，当然也可应用于中国象棋。中国象棋的初始局面可表示为：</p>
<p>rnbakabnr/9/1c5c1/p1p1p1p1p/9/9/P1P1P1P1P/1C5C1/9/RNBAKABNR w - - 0 1</p>
<table>
<thead>
<tr>
<th style="text-align:center">红方</th>
<th style="text-align:center">字母</th>
<th style="text-align:center">黑方</th>
<th style="text-align:center">字母</th>
<th style="text-align:center">对应单词</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">帅</td>
<td style="text-align:center">K</td>
<td style="text-align:center">将</td>
<td style="text-align:center">k</td>
<td style="text-align:center">king</td>
</tr>
<tr>
<td style="text-align:center">仕</td>
<td style="text-align:center">A</td>
<td style="text-align:center">士</td>
<td style="text-align:center">a</td>
<td style="text-align:center">advisor</td>
</tr>
<tr>
<td style="text-align:center">相</td>
<td style="text-align:center">B</td>
<td style="text-align:center">象</td>
<td style="text-align:center">b</td>
<td style="text-align:center">bishop</td>
</tr>
<tr>
<td style="text-align:center">马</td>
<td style="text-align:center">N</td>
<td style="text-align:center">马</td>
<td style="text-align:center">n</td>
<td style="text-align:center">knight</td>
</tr>
<tr>
<td style="text-align:center">车</td>
<td style="text-align:center">R</td>
<td style="text-align:center">车</td>
<td style="text-align:center">r</td>
<td style="text-align:center">rook</td>
</tr>
<tr>
<td style="text-align:center">炮</td>
<td style="text-align:center">C</td>
<td style="text-align:center">炮</td>
<td style="text-align:center">c</td>
<td style="text-align:center">cannon</td>
</tr>
<tr>
<td style="text-align:center">兵</td>
<td style="text-align:center">P</td>
<td style="text-align:center">卒</td>
<td style="text-align:center">p</td>
<td style="text-align:center">pawn</td>
</tr>
</tbody>
</table>
<p>中国象棋共有十行，每行都用一个字符串表示，行间使用正斜杠分割。</p>
<p>例如：</p>
<ul>
<li>
<p>rnbakabnr表示</p>
<p><img src="@source/课程实验/专业实验/实验报告.assets/image-20220605222447238.png" alt="image-20220605222447238" loading="lazy"></p>
</li>
<li>
<p>9表示：第二行都是空格。</p>
</li>
<li>
<p>w表示轮到哪一方走，w即白方，b即黑方（没有用r表示红方，是为了与国际象棋对应，毕竟国际象棋是黑白两色。）</p>
</li>
<li>
<p>&quot;- -&quot;，在中国象棋中没有意义，始终用“-”表示。</p>
</li>
<li>
<p>末尾的“0”表示双方没有吃子的走棋步数(半回合数)，通常该值达到120就要判和(六十回合自然限着)，一旦形成局面的上一步是吃子，这里就标记“0”。</p>
</li>
<li>
<p>末尾的“1”表示当前的回合数。</p>
<p>使用FEN串初始化棋局，这就涉及到了将FEN串转化为一维棋局数组。暂时不考虑哪方走子，只解析红色部分，伪代码如下：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// 将FEN串转为一维数组</span>
行变量 y <span class="token operator">=</span> <span class="token number">3</span>
列变量 x <span class="token operator">=</span> <span class="token number">3</span>
<span class="token keyword">var</span> c <span class="token operator">=</span> <span class="token constant">FEN</span>串第一个字符<span class="token punctuation">;</span>
<span class="token keyword">while</span> <span class="token punctuation">(</span>c <span class="token operator">!=</span> <span class="token string">" "</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>c <span class="token operator">==</span> <span class="token string">"/"</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>   <span class="token comment">// 换行</span>
    x <span class="token operator">=</span> <span class="token number">3</span><span class="token punctuation">;</span>
    y <span class="token operator">++</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>y <span class="token operator">></span> <span class="token number">12</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">break</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>c <span class="token operator">>=</span> <span class="token string">"1"</span> <span class="token operator">&amp;&amp;</span> c <span class="token operator">&lt;=</span> <span class="token string">"9"</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>  <span class="token comment">// 出现空位</span>
    列向量x增加c
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>c <span class="token operator">>=</span> <span class="token string">"A"</span> <span class="token operator">&amp;&amp;</span> c <span class="token operator">&lt;=</span> <span class="token string">"Z"</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>  <span class="token comment">// 红方棋子</span>
    将字符表示的棋子转换为整数，并放入数组x <span class="token operator">+</span> <span class="token punctuation">(</span>y <span class="token operator">&lt;&lt;</span> <span class="token number">4</span><span class="token punctuation">)</span>的位置
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>c <span class="token operator">>=</span> <span class="token string">"a"</span> <span class="token operator">&amp;&amp;</span> c <span class="token operator">&lt;=</span> <span class="token string">"z"</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    将字符表示的棋子转换为整数，并放入数组x <span class="token operator">+</span> <span class="token punctuation">(</span>y <span class="token operator">&lt;&lt;</span> <span class="token number">4</span><span class="token punctuation">)</span>的位置
  <span class="token punctuation">}</span>
   
  c <span class="token operator">=</span> <span class="token constant">FEN</span>串的下一个字符<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_4-棋盘界面设计" tabindex="-1"><a class="header-anchor" href="#_4-棋盘界面设计" aria-hidden="true">#</a> 4.棋盘界面设计</h4>
<p>假设有一张棋盘如下：</p>
<p><img src="@source/课程实验/专业实验/实验报告.assets/image-20220605222656149.png" alt="image-20220605222656149" loading="lazy"></p>
<p>由于棋盘有90个交叉点，我们把棋盘划分为的90个小正方形区域，交叉点是小正方形的中心。每个区域都会定义一个img标签。</p>
<p>这些img标签有两个作用：</p>
<ul>
<li>
<p>显示棋子图片</p>
<p>如果某个区域存在棋子，就会显示相应的棋子图片；否则，显示一张透明图片</p>
</li>
<li>
<p>响应点击事件</p>
</li>
</ul>
<p>每个img标签都会绑定onmousedown事件。点击不同的img标签时，会传递不同的参数给响应函数，这样就知道点击的具体是哪个区域了。</p>
<h4 id="_5-棋盘相关的html、css" tabindex="-1"><a class="header-anchor" href="#_5-棋盘相关的html、css" aria-hidden="true">#</a> 5.棋盘相关的html、css</h4>
<p>在网上找到一副象棋的图片，在photoshop中抠图、导出为png格式；全部导出后全选右键重命名（这样可以批量重命名），利用模板字符串+v-for语法可以在html中快捷方便地列出所有象棋，如:</p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>imgBox myImgBox<span class="token punctuation">"</span></span> <span class="token attr-name">v-for</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>(item,index) in 90<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>img</span> <span class="token attr-name">:src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>$withBase(`/img/chess/K_.png`)<span class="token punctuation">"</span></span>
             <span class="token attr-name">:id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>`pos${index}`<span class="token punctuation">"</span></span> <span class="token attr-name">alt</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>一个棋子<span class="token punctuation">"</span></span>
             <span class="token attr-name">:key</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>index<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>棋盘的css设计，这里我取了个巧，只要设置每个象棋的位置（包括暂时没有棋子的地方）的背景图为如下：</p>
<p><img src="@source/课程实验/专业实验/实验报告.assets/image-20220605225358012.png" alt="image-20220605225358012" loading="lazy"></p>
<p>这样就能组合成一张宫格很多的图，且棋子都在格子的顶点处。然后在楚河汉界处设置<code v-pre>background: none</code>即可</p>
<h4 id="_6-棋子的走法表示" tabindex="-1"><a class="header-anchor" href="#_6-棋子的走法表示" aria-hidden="true">#</a> 6.棋子的走法表示</h4>
<p>一个走法包括起点和终点，分别用sqSrc和pcDst表示一维棋局数组中的起点和终点。很容易想到，使用数组[sqSrc, pcDst]表示一个走法。（我不考虑节省内存）</p>
<blockquote>
<p><strong>提示</strong></p>
<p>如果想节省内存，由于sqSrc和pcDst都是不超过255的整数（因为一维棋盘数组的大小是256），可以将sqSrc和pcDst压缩到一个整数中，算法如下：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// 获取走法的起点</span>
<span class="token keyword">function</span> <span class="token constant">SRC</span><span class="token punctuation">(</span><span class="token parameter">mv</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> mv <span class="token operator">&amp;</span> <span class="token number">255</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">// 获取走法的终点</span>
<span class="token keyword">function</span> <span class="token constant">DST</span><span class="token punctuation">(</span><span class="token parameter">mv</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> mv <span class="token operator">>></span> <span class="token number">8</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></blockquote>
<ul>
<li>
<p><strong>将</strong></p>
<p>将的走法有四个方向，如下图所示：</p>
<p><img src="@source/课程实验/专业实验/实验报告.assets/image-20220605225910517.png" alt="image-20220605225910517" loading="lazy"></p>
<p>在一维数组中，1、2、3、4几个方向的起点和终点分别满足以下等式：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>pcDst <span class="token operator">=</span> sqSrc <span class="token operator">-</span> <span class="token number">16</span>

pcDst <span class="token operator">=</span> sqSrc <span class="token operator">-</span> <span class="token number">1</span>

pcDst <span class="token operator">=</span> sqSrc <span class="token operator">+</span> <span class="token number">1</span>

pcDst <span class="token operator">=</span> sqSrc <span class="token operator">+</span> <span class="token number">16</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>且必须在九宫格内</p>
</li>
<li>
<p><strong>士</strong></p>
<p>士的走法也是四个方向，如下所示:</p>
<p><img src="@source/课程实验/专业实验/实验报告.assets/image-20220605230051257.png" alt="image-20220605230051257" loading="lazy"></p>
<p>士的4个方向分别满足以下等式：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>pcDst <span class="token operator">=</span> sqSrc <span class="token operator">-</span> <span class="token number">17</span>

pcDst <span class="token operator">=</span> sqSrc <span class="token operator">-</span> <span class="token number">15</span>

pcDst <span class="token operator">=</span> sqSrc <span class="token operator">+</span> <span class="token number">15</span>

pcDst <span class="token operator">=</span> sqSrc <span class="token operator">+</span> <span class="token number">17</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>且终点sqSrc位于九宫内</p>
</li>
<li>
<p><strong>象</strong></p>
<p>象的四个走法如下图所示，黑三角是相应的象眼位置</p>
<p><img src="http://blog-4g1hzhqud8c196ff-1310711486.tcloudbaseapp.com/assets/img/image-20220408144442127.18696fd2.png" alt="image-20220408144442127" loading="lazy"></p>
<p>象的4个方向分别满足以下等式：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>pcDst <span class="token operator">=</span> sqSrc <span class="token operator">-</span> <span class="token number">34</span>

pcDst <span class="token operator">=</span> sqSrc <span class="token operator">-</span> <span class="token number">30</span>

pcDst <span class="token operator">=</span> sqSrc <span class="token operator">+</span> <span class="token number">30</span>

pcDst <span class="token operator">=</span> sqSrc <span class="token operator">+</span> <span class="token number">34</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>1）象不能过河</p>
<p>在程序中，棋局被表示为大小为256的一维数组，一半棋盘位于0到127，另一半位于128到255。</p>
<p>128的二进制是1000 0000，右起第八位是1。128到255这些数的二进制，右起第8位都是1；0到127这些数的二进制，右起第8位都是0。因此，如果象没过河，也就是pcDst和sqSrc位于相同的一半棋盘，那么</p>
<p>2）象眼无棋子</p>
<p>象眼位于sqSrc和sqDst的中点，判断(sqSrc + sqDst)/2 的位置是否有棋子即可。</p>
</li>
<li>
<p><strong>马</strong></p>
<p>马的8个走法如下图所示，黑三角是相应的马脚位置</p>
<p><img src="http://blog-4g1hzhqud8c196ff-1310711486.tcloudbaseapp.com/assets/img/image-20220524103951071.33cb6ddf.png" alt="image-20220524103951071" loading="lazy"></p>
<p>马的8个方向满足以下等式：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>pcDst <span class="token operator">=</span> sqSrc <span class="token operator">-</span> <span class="token number">33</span>
pcDst <span class="token operator">=</span> sqSrc <span class="token operator">-</span> <span class="token number">31</span>
pcDst <span class="token operator">=</span> sqSrc <span class="token operator">-</span> <span class="token number">18</span>
pcDst <span class="token operator">=</span> sqSrc <span class="token operator">+</span> <span class="token number">14</span>
pcDst <span class="token operator">=</span> sqSrc <span class="token operator">-</span> <span class="token number">14</span>
pcDst <span class="token operator">=</span> sqSrc <span class="token operator">+</span> <span class="token number">18</span>
pcDst <span class="token operator">=</span> sqSrc <span class="token operator">+</span> <span class="token number">31</span>
pcDst <span class="token operator">=</span> sqSrc <span class="token operator">+</span> <span class="token number">33</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>对应的马脚分别位于：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>sqSrc <span class="token operator">-</span> <span class="token number">16</span>
sqSrc <span class="token operator">-</span> <span class="token number">16</span>
sqSrc <span class="token operator">-</span> <span class="token number">1</span>
sqSrc <span class="token operator">-</span> <span class="token number">1</span>
sqSrc <span class="token operator">+</span> <span class="token number">1</span>
sqSrc <span class="token operator">+</span> <span class="token number">1</span>
sqSrc <span class="token operator">+</span> <span class="token number">16</span>
sqSrc <span class="token operator">+</span> <span class="token number">16</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>马的走法需要满足下面两个条件：</p>
<p>（1）、pcDst - sqSrc等于-33、-31、-18、14、-14、18、31、33其中的一个</p>
<p>（2）、对应马脚的位置没有棋子</p>
<p>我们使用一个新的辅助数组，来判断马的走法是否合法。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> <span class="token constant">KNIGHT_PIN_</span> <span class="token operator">=</span> <span class="token punctuation">[</span>
                              <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>
  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>
  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>
  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>
  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>
  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>
  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>
  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>
  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>
  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>
  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>
  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>
  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>
  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>
  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span><span class="token operator">-</span><span class="token number">16</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span><span class="token operator">-</span><span class="token number">16</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>
  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">1</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>
  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>
  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">1</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>
  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">16</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">16</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>
  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>
  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>
  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>
  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>
  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>
  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>
  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>
  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>
  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>
  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>
  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>
  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>
  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>
  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>
<span class="token punctuation">]</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>该数组在（-33 + 256）、（-31 + 256）、（-18 + 256）、（14 + 256）、（-14 + 256）、（18 + 256）、（31 + 256）、（33 + 256）这8个位置分别存放了-1、-1、-16、-16、1、1、16、16，其他位置都是0。</p>
<p>设置变量sqPin满足：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>sqPin <span class="token operator">=</span> sqSrc <span class="token operator">+</span> <span class="token constant">KNIGHT_PIN_</span><span class="token punctuation">[</span>sqDst <span class="token operator">-</span> sqSrc <span class="token operator">+</span> <span class="token number">256</span><span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>如果马的走法满足条件（1），那么spPin就是马脚的位置；否则sqPin = sqSrc。</p>
<p>因此马的走法合法，只需要满足sqPin != sqSrc并且sqPin位置无棋子。</p>
</li>
<li>
<p><strong>车、炮</strong></p>
<p>车的走法如下图所示：</p>
<p><img src="http://blog-4g1hzhqud8c196ff-1310711486.tcloudbaseapp.com/assets/img/image-20220524112305759.e67df6b8.png" alt="image-20220524112305759" loading="lazy"></p>
<p>沿着四条直线走，每个方向可一直向前走，直到：</p>
<p>（1）、走出棋盘</p>
<p>（2）、碰到本方棋子</p>
<p>（3）、吃掉对方棋子</p>
<p>例如方向1，每走一步都是在起点基础上-1；方向2是在起点基础上-16；方向3是在起点基础上+1；方向4是在起点基础上+16。</p>
<p>炮与车的行棋规则类似，也可以沿一个方向一直向前走，不过遇到棋子时，要越过去（也就是翻山）。翻山后，炮只能吃对方棋子，不能落到空位置。</p>
</li>
<li>
<p><strong>卒(兵)</strong></p>
<p>红兵的走法如下图所示：</p>
<p><img src="http://blog-4g1hzhqud8c196ff-1310711486.tcloudbaseapp.com/assets/img/image-20220524112420825.de4eef7b.png" alt="image-20220524112420825" loading="lazy"></p>
<p>（1）、判断是否过河</p>
<p>以红方为例，红方是向上走。如果红方过河，则会走到棋盘0到127的位置，此时所处位置的二进制表示，右起第8位是0。（因为128的二进制是1000 0000，这与之前讲过的SAME_HALF函数类似）</p>
<p>判断函数如下：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// sp是棋子位置，sd是走棋方（红方0，黑方1）。如果该位置已过河，则返回true；否则返回false。</span>
<span class="token keyword">function</span> <span class="token constant">AWAY_HALF</span><span class="token punctuation">(</span><span class="token parameter">sq<span class="token punctuation">,</span> sd</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token punctuation">(</span>sq <span class="token operator">&amp;</span> <span class="token number">0x80</span><span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token punctuation">(</span>sd <span class="token operator">&lt;&lt;</span> <span class="token number">7</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
 
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果兵已经过河，是可以左右走的，满足下面条件的走法一定合法：</p>
<p>AWAY_HALF(sq, sd) &amp;&amp; (sqDst == sqSrc - 1 || sqDst == sqSrc + 1)</p>
<p>（2）、判断兵（卒）是否是向前走了一步</p>
<p>红兵向前走一步是sqSrc - 16，黑卒向前走一步是sqSrc + 16。可用如下函数得到兵（卒）向前一步的位置：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// sp是棋子位置，sd是走棋方（红方0，黑方1）。返回兵（卒）向前走一步的位置。</span>
<span class="token keyword">function</span> <span class="token constant">SQUARE_FORWARD</span><span class="token punctuation">(</span><span class="token parameter">sq<span class="token punctuation">,</span> sd</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> sq <span class="token operator">-</span> <span class="token number">16</span> <span class="token operator">+</span> <span class="token punctuation">(</span>sd <span class="token operator">&lt;&lt;</span> <span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>因此，只要sqDst = = SQUARE_FORWARD(sq, sd)，说明兵（卒）是向前走了一步，走法合法。</p>
<h4 id="_7-电脑自动走棋" tabindex="-1"><a class="header-anchor" href="#_7-电脑自动走棋" aria-hidden="true">#</a> 7.电脑自动走棋</h4>
<p>电脑生成的走棋与上一部分叙述的棋子走法写的代码有点类似。</p>
<ul>
<li>
<p><strong>将</strong>
<img src="http://blog-4g1hzhqud8c196ff-1310711486.tcloudbaseapp.com/assets/img/image-20220517193459830.207885a3.png" alt="image-20220517193459830" loading="lazy"></p>
<p>使用一个辅助数组表示这四个方向：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>let KING_DELTA = [-16, -1, 1, 16];
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>已知帅在一维棋局数组中的起点位置sqSrc。生成帅的走法，就是获取帅全部的合法终点sqDes。使用一个数组存储所有可能的走法，伪代码如下：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">var</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">4</span><span class="token punctuation">;</span> i <span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>       <span class="token comment">// 将的4个方向</span>
  <span class="token keyword">let</span> sqDst <span class="token operator">=</span> sqSrc <span class="token operator">+</span> <span class="token constant">KING_DELTA</span><span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">;</span>    <span class="token comment">// 得到一个可能的终点位置</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>该位置不位于九宫中<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 该走法不合法，执行下一轮循环</span>
    <span class="token keyword">continue</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">var</span> pcDst <span class="token operator">=</span> 终点位置的棋子<span class="token punctuation">;</span>  　　　　<span class="token comment">// 如果终点位置没有棋子，那么pcDst=0</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>pcDst不是本方棋子<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    走法合法，保存到步骤数组中
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p><strong>仕</strong>
<img src="http://blog-4g1hzhqud8c196ff-1310711486.tcloudbaseapp.com/assets/img/image-20220519141003639.60b4bdb0.png" alt="image-20220519141003639" loading="lazy"></p>
<p>同样使用辅助数组表示仕的4个方向：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>let ADVISOR_DELTA = [-17, -15, 15, 17];
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>生成仕的走法，伪代码如下：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">var</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">4</span><span class="token punctuation">;</span> i <span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>　　　　　　<span class="token comment">// 仕的4个方向</span>
  <span class="token keyword">var</span> sqDst <span class="token operator">=</span> sqSrc <span class="token operator">+</span> <span class="token constant">ADVISOR_DELTA</span><span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token comment">// 得到一个可能的终点位置</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>该位置不位于九宫中<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 该走法不合法，执行下一轮循环</span>
    <span class="token keyword">continue</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">var</span> pcDst <span class="token operator">=</span> 终点棋子<span class="token punctuation">;</span>　　　　　　　　　　<span class="token comment">// 如果终点位置没有棋子，那么pcDst=0</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>pcDst不是本方棋子<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    走法合法，保存到步骤数组中
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p><strong>象</strong>
<img src="http://blog-4g1hzhqud8c196ff-1310711486.tcloudbaseapp.com/assets/img/image-20220519140908980.9a4b4aa3.png" alt="image-20220519140908980" loading="lazy"></p>
<p>我们并不用设置一个类似[-34, -30, 30, 37]的数组保存象的方向。因为仕的方向，跟象眼的方向一致。仕方向的二倍，就是象的方向。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">var</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">4</span><span class="token punctuation">;</span> i <span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>       <span class="token comment">// 象的4个方向</span>
  <span class="token keyword">var</span> sqDst <span class="token operator">=</span> sqSrc <span class="token operator">+</span> <span class="token constant">ADVISOR_DELTA</span><span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token comment">// 获得象眼的位置</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>象眼不在棋盘上，或者象眼位置已过河，或者象眼存在棋子<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 位置不合法，执行下一轮循环</span>
    <span class="token keyword">continue</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  sqDst <span class="token operator">+=</span> <span class="token constant">ADVISOR_DELTA</span><span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">;</span>    　　　　<span class="token comment">// 得到一个可能的终点位置</span>
  <span class="token keyword">var</span> pcDst <span class="token operator">=</span> 终点位置的棋子   　　　　<span class="token comment">// 如果终点位置没有棋子，那么pcDst=0</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>pcDst不是本方棋子<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    走法合法，保存到步骤数组中
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p><strong>马</strong></p>
<p><img src="http://blog-4g1hzhqud8c196ff-1310711486.tcloudbaseapp.com/assets/img/image-20220519141337953.98e56194.png" alt="image-20220519141337953" loading="lazy"></p>
<p>用辅助数组表示马的方向：</p>
<p>KNIGHT_DELTA = [[-33, -31], [-18, 14], [-14, 18], [31, 33]];</p>
<p>对应马腿的4个方向，与帅的4个方向是一样的。</p>
<p>生成马的走法，伪代码如下：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">var</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">4</span><span class="token punctuation">;</span> i <span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>　　　　　　<span class="token comment">// 马腿的4个方向</span>
  <span class="token keyword">var</span> sqDst <span class="token operator">=</span> sqSrc <span class="token operator">+</span> <span class="token constant">KING_DELTA</span><span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">;</span>　　<span class="token comment">// 得到一个马腿的位置</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>马腿位置存在棋子<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">continue</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">var</span> j <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> j <span class="token operator">&lt;</span> <span class="token number">2</span><span class="token punctuation">;</span> j <span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">// 1个马腿对应2个马的方向</span>
    sqDst <span class="token operator">=</span> sqSrc <span class="token operator">+</span> <span class="token constant">KNIGHT_DELTA</span><span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">[</span>j<span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token comment">// 得到一个马的可能的终点位置</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>该位置不在棋盘上<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">continue</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">var</span> pcDst <span class="token operator">=</span> 终点位置的棋子<span class="token punctuation">;</span>        <span class="token comment">// 如果终点位置没有棋子，那么pcDst=0</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>pcDst不是本方棋子<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      走法合法，保存到步骤数组中
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p><strong>车</strong></p>
<p><img src="http://blog-4g1hzhqud8c196ff-1310711486.tcloudbaseapp.com/assets/img/image-20220519141533975.8243ae79.png" alt="image-20220519141533975" loading="lazy"></p>
<p>车的方向与帅的方向相同，只不过车可以连续走下去。</p>
<p>生成车的走法，伪代码如下：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">var</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">4</span><span class="token punctuation">;</span> i <span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">var</span> delta <span class="token operator">=</span> <span class="token constant">KING_DELTA</span><span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">;</span>    <span class="token comment">// 得到一个方向</span>
  <span class="token keyword">var</span> sqDst <span class="token operator">=</span> sqSrc <span class="token operator">+</span> delta<span class="token punctuation">;</span>    <span class="token comment">// 从起点sqSrc开始，沿着方向delta走一步</span>
  <span class="token keyword">while</span> <span class="token punctuation">(</span>sqDst在棋盘上<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> pcDst <span class="token operator">=</span> sqDst位置的棋子<span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>pcDst <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>       <span class="token comment">// sqDst位置上根本就没有棋子</span>
      走法合法，保存到步骤数组中
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>pcDst是对方的棋子<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        走法合法，保存到步骤数组中
      <span class="token punctuation">}</span>
      <span class="token comment">// 已经遇到了对方棋子，终止循环</span>
      <span class="token keyword">break</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    sqDst <span class="token operator">+=</span> delta<span class="token punctuation">;</span>     <span class="token comment">// 沿着方向delta向前走一步</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p><strong>炮</strong></p>
<p><img src="http://blog-4g1hzhqud8c196ff-1310711486.tcloudbaseapp.com/assets/img/image-20220519141616658.f9452d21.png" alt="image-20220519141616658" loading="lazy"></p>
<p>炮的走法与车类似，但炮遇到一个棋子后，可以越过去，也就是翻山，并吃掉一个对方棋子。</p>
<p>生成炮的走法，伪代码如下：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">var</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">4</span><span class="token punctuation">;</span> i <span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">var</span> delta <span class="token operator">=</span> <span class="token constant">KING_DELTA</span><span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">;</span>    <span class="token comment">// 得到一个方向</span>
  <span class="token keyword">var</span> sqDst <span class="token operator">=</span> sqSrc <span class="token operator">+</span> delta<span class="token punctuation">;</span>    <span class="token comment">// 从起点sqSrc开始，沿着方向delta走一步</span>
  <span class="token keyword">while</span> <span class="token punctuation">(</span>sqDst在棋盘上<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> pcDst <span class="token operator">=</span> sqDst位置的棋子<span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>pcDst <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>       <span class="token comment">// sqDst位置上根本就没有棋子</span>
      走法合法，保存到步骤数组中
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>            <span class="token comment">// 终点存在棋子，炮需要翻山</span>
      <span class="token keyword">break</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    sqDst <span class="token operator">+=</span> delta<span class="token punctuation">;</span>     <span class="token comment">// 沿着方向delta向前走一步</span>
  <span class="token punctuation">}</span>
  sqDst <span class="token operator">+=</span> delta<span class="token punctuation">;</span>       <span class="token comment">// 沿着方向delta向前走一步</span>
  <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token constant">IN_BOARD</span><span class="token punctuation">(</span>sqDst<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">// 如果sqDst仍位于棋盘，那么此时炮已经翻山了</span>
    <span class="token keyword">var</span> pcDst <span class="token operator">=</span> sqDst位置的棋子<span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>pcDst <span class="token operator">></span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>     <span class="token comment">// 炮翻山后遇到了一个棋子</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>pcDst是对方棋子<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        走法合法，保存到步骤数组中
      <span class="token punctuation">}</span>
      <span class="token comment">// 炮翻山后，不管遇到的是对方棋子，还是己方棋子，都要结束对当前方向的搜索</span>
      <span class="token keyword">break</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    sqDst <span class="token operator">+=</span> delta<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p><strong>兵</strong></p>
<p><img src="http://blog-4g1hzhqud8c196ff-1310711486.tcloudbaseapp.com/assets/img/image-20220519141658949.4c3cf982.png" alt="image-20220519141658949" loading="lazy"></p>
<p>红兵和黑卒向前走的方向是不一样的，分别是-16和16。我们已经介绍了下面的函数：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// sp是棋子位置，sd是走棋方（红方0，黑方1）。返回兵（卒）向前走一步的位置。</span>
<span class="token keyword">function</span> <span class="token constant">SQUARE_FORWARD</span><span class="token punctuation">(</span><span class="token parameter">sq<span class="token punctuation">,</span> sd</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> sq <span class="token operator">-</span> <span class="token number">16</span> <span class="token operator">+</span> <span class="token punctuation">(</span>sd <span class="token operator">&lt;&lt;</span> <span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>该函数可以获得兵（卒）前进一步的位置。</p>
<p>生成兵的走法，伪代码如下：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> sqDst <span class="token operator">=</span> <span class="token constant">SQUARE_FORWARD</span><span class="token punctuation">(</span>sqSrc<span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>sdPlayer<span class="token punctuation">)</span><span class="token punctuation">;</span>   <span class="token comment">// 得到兵（卒）前进一步的位置</span>
<span class="token keyword">if</span> <span class="token punctuation">(</span>sqDst在棋盘上<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">var</span> pcDst <span class="token operator">=</span> sqDst位置的棋子<span class="token punctuation">;</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>pcDst不是本方棋子<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    走法合法，保存到步骤数组中
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">if</span> <span class="token punctuation">(</span>这个兵（卒）已过河<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">var</span> delta <span class="token operator">=</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span> delta <span class="token operator">&lt;=</span> <span class="token number">1</span><span class="token punctuation">;</span> delta <span class="token operator">+=</span> <span class="token number">2</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// delta只能取-1和1两个值，这正是兵（卒）的左右两个方向</span>
    sqDst <span class="token operator">=</span> sqSrc <span class="token operator">+</span> delta<span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>sqDst在棋盘上<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">var</span> pcDst <span class="token operator">=</span> sqDst位置的棋子<span class="token punctuation">;</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>pcDst不是本方棋子<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        走法合法，保存到步骤数组中
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
<h4 id="_8-搜索算法" tabindex="-1"><a class="header-anchor" href="#_8-搜索算法" aria-hidden="true">#</a> 8.搜索算法</h4>
<ul>
<li>
<p><strong>局面评估</strong></p>
<p>局面评估，就是判断局面对红方（或黑方）的优势，并把优势量化。棋子价值可用以下不等式表达：</p>
<p>帅 &gt; 车 &gt; 马、炮 &gt; 仕、相 &gt; 兵</p>
<p>棋子价值可以简单量化为：</p>
<table>
<thead>
<tr>
<th style="text-align:center">兵</th>
<th style="text-align:center">仕</th>
<th style="text-align:center">相</th>
<th style="text-align:center">炮</th>
<th style="text-align:center">马</th>
<th style="text-align:center">车</th>
<th style="text-align:center">帅</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">10</td>
<td style="text-align:center">20</td>
<td style="text-align:center">20</td>
<td style="text-align:center">40</td>
<td style="text-align:center">45</td>
<td style="text-align:center">90</td>
<td style="text-align:center">1000</td>
</tr>
</tbody>
</table>
<blockquote>
<p><strong>提示</strong></p>
<p>但是棋子价值是跟位置有关系的，比如兵在过河前价值很小，过河后价值大涨。在我的程序中，就不考虑这个了。</p>
</blockquote>
</li>
<li>
<p><strong>搜索算法</strong></p>
<p>思路：轮到电脑方执棋时:</p>
<ol>
<li>电脑先计算求出所有红方可能走的棋子，选出对红方最有利的走法。</li>
<li>然后电脑得知了红方下一步最有可能怎么走。</li>
<li>电脑计算求出所有它可以走的棋子，找出能阻断破坏上述对红方最有利的走法、或对自己黑方最有利的走法。</li>
<li>比如红方将军，轮到电脑执棋时，电脑会检索到红方将军这一步走法，然后尝试阻断这一将军；而在没有将军时，电脑也会尝试去吃掉红方价值最大的棋子。</li>
</ol>
</li>
</ul>
</li>
</ul>
</li>
</ul>
</li>
<li>
<p>主要模块的流程图：</p>
<p>搜索算法的流程图如下：</p>
<Mermaid id="mermaid-300885a8" code="flowchart%20TD%0A%20%20%20%20A%5B%22%E5%BC%80%E5%A7%8B%22%5D%0A%20%20%20%20B(%5B%22%E5%85%88%E5%AE%9A%E4%B9%89%E4%B8%80%E4%B8%AA%E5%8F%98%E9%87%8FmaxVal%EF%BC%8C%0A%20%20%20%20%E7%84%B6%E5%90%8E%E9%81%8D%E5%8E%86%E7%BA%A2%E6%96%B9%E6%A3%8B%E5%AD%90%0A%20%20%20%20(%E6%AF%8F%E6%AC%A1%E9%81%8D%E5%8E%86%E7%9A%84%E5%85%83%E7%B4%A0%EF%BC%9A%E7%BA%A2%E6%A3%8Bitem1)%22%5D)%0A%20%20%20%20C(%5B%22%E4%BD%BF%E7%94%A8machine_getExactStep(item1)%0A%20%20%20%20%E5%87%BD%E6%95%B0%E5%BE%97%E5%88%B0item1%E7%9A%84%E6%9C%80%E4%BD%B3%E8%B5%B0%E6%B3%95%5BsqSrc%2CsqDst%5D%22%5D)%0A%20%20%20%20C1(%5B%22%E4%BD%BF%E7%94%A8machine_evaluate(arr)%E5%87%BD%E6%95%B0%0A%20%20%20%20%E6%B1%82%E5%87%BA%E5%BD%93%E5%89%8D%E6%A3%8B%E7%9B%98%E7%9A%84%E4%BB%B7%E5%80%BC%EF%BC%8C%E5%85%B6%E4%B8%AD%E5%8F%82%E6%95%B0arr%E4%B8%BA%E5%BD%93%E5%89%8D%0A%20%20%20%20%E6%A3%8B%E7%9B%98%E6%95%B0%E7%BB%84%EF%BC%9B%E7%BB%93%E6%9E%9C%E4%BF%9D%E5%AD%98%E5%9C%A8val1%22%5D)%0A%09D%7Bval1%20%3E%20maxVal%3F%7D%0A%20%20%20%20E(%5B%22%E8%AE%B0%E5%BD%95%E5%BD%93%E5%89%8D%E6%9C%80%E5%A4%A7%E8%AF%84%E4%BC%B0%E5%80%BC%3A%20maxVal%3Dval1%3B%0A%20%20%20%20%E8%AE%B0%E5%BD%95%E6%AD%A4%E6%97%B6%E7%9A%84%E8%B5%B7%E7%82%B9%3A%20sqSrc_w%20%3D%20sqSrc%22%5D)%0A%20%20%20%20F%7B%22%E6%98%AF%E5%90%A6%E9%81%8D%E5%8E%86%E5%AE%8C%E7%BA%A2%E6%A3%8B%EF%BC%9F%22%7D%0A%20%20%20%20G%5B(%22%E6%AD%A4%E6%97%B6%E7%94%B5%E8%84%91%E5%B7%B2%E8%AE%A1%E7%AE%97%E5%87%BA%E7%BA%A2%E6%96%B9%0A%20%20%20%20%E6%9C%80%E6%9C%89%E5%8F%AF%E8%83%BD%E8%B5%B0%E7%9A%84%E6%A3%8B%E5%AD%90%EF%BC%8C%E5%8D%B3sqSrc_w%22)%5D%0A%20%20%20%20%0A%20%20%20%20J(%5B%22%E5%88%9D%E5%A7%8B%E5%8C%96%E4%B8%80%E4%B8%AA%E5%8F%98%E9%87%8FminVal%20%3D%20maxVal%2C%0A%20%20%20%20%E9%81%8D%E5%8E%86%E9%BB%91%E6%A3%8B%EF%BC%88item2%EF%BC%89%22%5D)%0A%20%20%20%20K(%5B%22%E9%81%8D%E5%8E%86%E9%BB%91%E6%A3%8Bitem2%E7%9A%84%E6%89%80%E6%9C%89%E8%B5%B0%E6%B3%95(item3)%22%5D)%0A%20%20%20%20L(%5B%22%E7%94%B5%E8%84%91%E5%86%85%E9%83%A8%E6%A8%A1%E6%8B%9F%E9%BB%91%E6%A3%8B%E4%BD%BF%0A%20%20%20%20%E7%94%A8%E4%BA%86%E8%B5%B0%E6%B3%95item3(%5BsqSrc%2CsqDst%5D)%22%5D)%0A%20%20%20%20M(%5B%22%E9%87%8D%E6%96%B0%E4%BD%BF%E7%94%A8machine_getExactStep(item3)%0A%20%20%20%20%E5%87%BD%E6%95%B0%E5%BE%97%E5%88%B0%E7%BA%A2%E6%A3%8BsqSrc_w%E7%9A%84%E6%9C%80%E4%BD%B3%E8%B5%B0%E6%B3%95%5BsqSrc_w%2CsqDst%5D%22%5D)%0A%20%20%20%20N(%5B%22%E7%94%B5%E8%84%91%E5%86%85%E9%83%A8%E6%A8%A1%E6%8B%9F%E8%AF%A5%E7%BA%A2%E6%A3%8B%E6%8C%89%E6%9C%80%E4%BD%B3%E8%B5%B0%E6%B3%95%E8%90%BD%E5%AD%90%22%5D)%0A%20%20%20%20O(%5B%22%E8%B0%83%E7%94%A8machine_evaluate(arr)%0A%20%20%20%20%E5%87%BD%E6%95%B0%E8%AE%A1%E7%AE%97%E6%AD%A4%E6%97%B6%E5%86%85%E9%83%A8%E6%A8%A1%E6%8B%9F%E6%A3%8B%E7%9B%98%E7%9A%84%E4%BB%B7%E5%80%BC%EF%BC%8C%0A%20%20%20%20%E5%85%B6%E4%B8%AD%E5%8F%82%E6%95%B0arr%E4%B8%BA%E6%A8%A1%E6%8B%9F%E6%A3%8B%E7%9B%98%E6%95%B0%E7%BB%84%3B%E7%BB%93%E6%9E%9C%E4%BF%9D%E5%AD%98%E5%9C%A8val2%E4%B8%AD%22%5D)%0A%20%20%20%20P%7Bval2%20%3C%20minVal%3F%7D%0A%20%20%20%20Q(%5B%22%E8%AE%B0%E5%BD%95%E5%BD%93%E5%89%8D%E6%9C%80%E5%B0%8F%E8%AF%84%E4%BC%B0%E5%80%BC%3A%20maxVal%3Dval1%3B%0A%20%20%20%20%E8%AE%B0%E5%BD%95%E6%AD%A4%E6%97%B6%E7%9A%84%E8%B5%B7%E7%82%B9%3A%20sqSrc_b%20%3D%20sqSrc%0A%20%20%20%20%E8%AE%B0%E5%BD%95%E6%AD%A4%E6%97%B6%E7%9A%84%E7%BB%88%E7%82%B9sqDst_b%20%3D%20sqDst%22%5D)%0A%20%20%20%20R%7B%22%E6%98%AF%E5%90%A6%E9%81%8D%E5%8E%86%E5%AE%8C%E8%AF%A5%E9%BB%91%E6%A3%8B%E7%9A%84%E8%B5%B0%E6%B3%95%EF%BC%9F%22%7D%0A%20%20%20%20S%7B%22%E6%98%AF%E5%90%A6%E9%81%8D%E5%8E%86%E5%AE%8C%E6%89%80%E6%9C%89%E9%BB%91%E6%A3%8B%EF%BC%9F%22%7D%0A%20%20%20%20T%5B(%22%E6%AD%A4%E6%97%B6%E7%94%B5%E8%84%91%E8%AE%A1%E7%AE%97%0A%20%20%20%20%E5%87%BA%E5%AF%B9%E5%AE%83%E6%9C%80%E6%9C%89%E5%88%A9%E7%9A%84%E8%B5%B0%E6%B3%95%5BsqSrc_b%2CsqDst_b%5D%22)%5D%0A%20%20%20%20%0A%20%20%20%20A%20--%3E%20B%20--%3E%20C%20--%3E%20C1%20--%3E%20D%0A%20%20%20%20D%20----%3E%7Cno%7C%20B%0A%20%20%20%20D%20--%3E%7Cyes%7C%20E%20--%3E%20F%0A%09F%20--%3E%7Cno%7C%20B%0A%09F%20--%3E%7Cyes%7CG%0A%09G%20--%3E%20J%20--%3E%20K%20--%3E%20L%20--%3E%20M%20--%3E%20N%20--%3E%20O%20--%3E%20P%0A%09P%20--%3E%7Cno%7CL%20%0A%09P%20--%3E%7Cyes%7C%20Q%20--%3E%20R%0A%09R%20--%3E%7Cno%7CK%0A%09R%20--%3E%7Cyes%7CS%0A%09S%20--%3E%7Cno%7CJ%0A%09S%20--%3E%7Cyes%7CT%0A"></Mermaid><p>项目运行结果：</p>
<p><img src="@source/课程实验/专业实验/实验报告.assets/image-20220605231838669.png" alt="image-20220605231838669" loading="lazy"></p>
<p>点击链接，查看项目运行地址：</p>
<p><img src="@source/课程实验/专业实验/实验报告.assets/image-20220605231908645.png" alt="image-20220605231908645" loading="lazy"></p>
<p>默认为玩家对战模式，尝试走棋，若走棋合法则该棋移动，走棋方切换；若不合法则不移动也不切换。</p>
<p><img src="@source/课程实验/专业实验/实验报告.assets/image-20220605232038825.png" alt="image-20220605232038825" loading="lazy"></p>
<p>鼠标悬浮在人机对战按钮上，会提示被动技能相关信息：</p>
<p><img src="@source/课程实验/专业实验/实验报告.assets/image-20220605232209053.png" alt="image-20220605232209053" loading="lazy"></p>
<p>点击人机对战后：</p>
<p><img src="@source/课程实验/专业实验/实验报告.assets/image-20220605232310274.png" alt="image-20220605232310274" loading="lazy"></p>
<p><img src="@source/课程实验/专业实验/实验报告.assets/image-20220605232314472.png" alt="image-20220605232314472" loading="lazy"></p>
<p>电脑走棋时会给用户提示电脑移动了哪步棋：</p>
<p><img src="@source/课程实验/专业实验/实验报告.assets/image-20220605232518947.png" alt="image-20220605232518947" loading="lazy"></p>
<p>触发替父从军：</p>
<p><img src="@source/课程实验/专业实验/实验报告.assets/image-20220605232642449.png" alt="image-20220605232642449" loading="lazy"></p>
<p><img src="@source/课程实验/专业实验/实验报告.assets/image-20220605232655918.png" alt="image-20220605232655918" loading="lazy"></p>
<p>触发兵线刷新：</p>
<p><img src="@source/课程实验/专业实验/实验报告.assets/image-20220605232758291.png" alt="image-20220605232758291" loading="lazy"></p>
<p><img src="@source/课程实验/专业实验/实验报告.assets/image-20220605232808275.png" alt="image-20220605232808275" loading="lazy"></p>
<p>触发草木皆兵：</p>
<p><img src="@source/课程实验/专业实验/实验报告.assets/image-20220605232926165.png" alt="image-20220605232926165" loading="lazy"></p>
<p><img src="@source/课程实验/专业实验/实验报告.assets/image-20220605232937020.png" alt="image-20220605232937020" loading="lazy"></p>
<p>一方胜利后会有评分结算：</p>
<p><img src="@source/课程实验/专业实验/实验报告.assets/image-20220605232433106.png" alt="image-20220605232433106" loading="lazy"></p>
</li>
<li>
<p>设计过程中出现的错误。</p>
</li>
</ul>
<p>vuepress引入element UI报错：<code v-pre>Cannot find module 'core-js/library/xxx' when import element-ui</code></p>
<p>element UI是饿了么前端团队开发的一套UI组件库，较为成熟，根据其<a href="https://vuepress.vuejs.org/zh/guide/basic-config.html#%E5%BA%94%E7%94%A8%E7%BA%A7%E5%88%AB%E7%9A%84%E9%85%8D%E7%BD%AE" target="_blank" rel="noopener noreferrer">官方文档<ExternalLinkIcon/></a>，在<code v-pre>docs/.vuepress</code>下新建<code v-pre>enhanceApp.js</code>，在该文件中这样写:</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> ElementUI <span class="token keyword">from</span> <span class="token string">"element-ui"</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token string">'element-ui/lib/theme-chalk/index.css'</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">(</span><span class="token punctuation">{</span>
                  Vue<span class="token punctuation">,</span> <span class="token comment">// the version of Vue being used in the VuePress app</span>
                  <span class="token comment">// options, // the options for the root Vue instance</span>
                  <span class="token comment">// router, // the router instance for the app</span>
                  <span class="token comment">// siteData // site metadata</span>
                <span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  Vue<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>ElementUI<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>参考<a href="https://blog.csdn.net/qq_32855007/article/details/108726430" target="_blank" rel="noopener noreferrer">文章<ExternalLinkIcon/></a>解决，这大概是版本号的问题，需执行<code v-pre>yarn add async-validator@1.11.5</code>或<code v-pre>npm install async-validator@1.11.5</code>,重新运行就可以了。虽然但是，这些组件没有适配移动端，以下给出几个组件的适配代码：</p>
<p>在<code v-pre>docs/.vuepress/styles/index.styl</code>中：</p>
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-结论-4" tabindex="-1"><a class="header-anchor" href="#_4-结论-4" aria-hidden="true">#</a> 4.结论</h3>
<p>本次实验已达到设计题目的要求，功能完善，特点是设计方案和演示效果集成在个人博客中，界面优雅简洁；简单的评分系统和评语系统；人机对战中给电脑方设计了三项被动技能：兵线刷新、替父从军和草木皆兵；设置了三种难度：简单、困难和地狱。</p>
<p>不足之处是人机对战中电脑的棋力很弱（≤小学生）。</p>
<h3 id="_5-结束语-4" tabindex="-1"><a class="header-anchor" href="#_5-结束语-4" aria-hidden="true">#</a> 5.结束语</h3>
<p>本次实验遇到最大的困难是电脑走棋的搜索算法，由于棋子很多，而且存储棋盘的数组的长度高达256，算法的时间复杂度甚至在 <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>O</mi><mtext>（</mtext><msup><mi>n</mi><mn>4</mn></msup><mtext>）</mtext></mrow><annotation encoding="application/x-tex">O（n^4）</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8141em;"></span><span class="mord mathnormal" style="margin-right:0.02778em;">O</span><span class="mord cjk_fallback">（</span><span class="mord"><span class="mord mathnormal">n</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8141em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight">4</span></span></span></span></span></span></span></span><span class="mord cjk_fallback">）</span></span></span></span> 左右，一旦出现bug将很难定位该bug出现在哪步，有时修改到深夜一两点钟仍无果。解决方法是debug时先不遍历整个棋盘，而是棋盘的前10个（左右）的棋子，将流程图与伪代码放在旁边，时刻提示自己算法步骤。</p>
<p>到目前为止前端开发也做了好几个小项目了，基本没碰到什么高深的算法，本次实验让我再次体会到算法的珠玑奥妙，让我不得不感慨算法的门槛之高。</p>
<h3 id="_6-程序清单-3" tabindex="-1"><a class="header-anchor" href="#_6-程序清单-3" aria-hidden="true">#</a> 6.程序清单</h3>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">/*玩家对战模块*/</span>
<span class="token comment">/*每个img绑定一个点击事件*/</span>
    document<span class="token punctuation">.</span><span class="token function">querySelectorAll</span><span class="token punctuation">(</span><span class="token string">'div.imgBox img'</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">e<span class="token punctuation">,</span> index</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
      e<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">'mousedown'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">e<span class="token punctuation">,</span> index</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        <span class="token keyword">let</span> fileName <span class="token operator">=</span> e<span class="token punctuation">.</span>target<span class="token punctuation">.</span>src<span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">(</span><span class="token number">32</span><span class="token punctuation">,</span> <span class="token number">33</span><span class="token punctuation">)</span>
        <span class="token comment">// console.log(fileName);</span>
        <span class="token keyword">let</span> alertStr <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">ImgNameToChessName</span><span class="token punctuation">(</span>fileName<span class="token punctuation">)</span>

        <span class="token keyword">let</span> imgIndex <span class="token operator">=</span> <span class="token function">parseInt</span><span class="token punctuation">(</span>e<span class="token punctuation">.</span>target<span class="token punctuation">.</span>id<span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token number">1</span>
        <span class="token comment">// console.log(imgIndex);</span>
        <span class="token comment">// console.log(this.displayChessTemp);</span>
        <span class="token keyword">let</span> chessInfo <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token comment">//棋子的一些信息</span>
          <span class="token literal-property property">displayChess</span><span class="token operator">:</span> <span class="token keyword">this</span><span class="token punctuation">.</span>displayChessTemp<span class="token punctuation">,</span>
          <span class="token literal-property property">fileName</span><span class="token operator">:</span> fileName<span class="token punctuation">,</span>
          <span class="token literal-property property">imgIndex</span><span class="token operator">:</span> imgIndex<span class="token punctuation">,</span>
          <span class="token literal-property property">sqSelected</span><span class="token operator">:</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">imgIndexToSq</span><span class="token punctuation">(</span>imgIndex<span class="token punctuation">)</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">chess1Click</span><span class="token punctuation">(</span>chessInfo<span class="token punctuation">)</span>

        <span class="token comment">/*用户每次点击棋子应该将该棋子储存到当前棋子currentChess*/</span>
        <span class="token comment">// this.currentChess = fileName</span>
        <span class="token comment">// if(this.sqSelected) {</span>
        <span class="token comment">//   if(this.currentChess != 'U') {</span>
        <span class="token comment">//     console.log('上次点击的是空白处');</span>
        <span class="token comment">//   }</span>
        <span class="token comment">// }</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token comment">/*棋子走法相关辅助函数*/</span>
<span class="token comment">/*传入一维坐标，如果在棋盘内，返回true*/</span>
    <span class="token constant">IN_BOARD</span><span class="token punctuation">(</span><span class="token parameter">sq</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token constant">IN_BOARD_</span><span class="token punctuation">[</span>sq<span class="token punctuation">]</span> <span class="token operator">!==</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token comment">/*判断是否在九宫格内,若是，返回true*/</span>
    <span class="token constant">IN_FORT</span><span class="token punctuation">(</span><span class="token parameter">sq</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token constant">IN_FORT_</span><span class="token punctuation">[</span>sq<span class="token punctuation">]</span> <span class="token operator">!==</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token comment">/*将二维矩阵坐标转换为一维矩阵坐标 (x,y)含(0,0)*/</span>
    <span class="token constant">COORD_XY</span><span class="token punctuation">(</span><span class="token parameter">x<span class="token punctuation">,</span> y</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token comment">// 将二维矩阵坐标转换为一维矩阵坐标 (x,y)含(0,0)</span>
      <span class="token keyword">return</span> x <span class="token operator">+</span> <span class="token punctuation">(</span>y <span class="token operator">&lt;&lt;</span> <span class="token number">4</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token comment">/*根据一维矩阵，获取二维矩阵行数 行数从0开始*/</span>
    <span class="token constant">RANK_Y</span><span class="token punctuation">(</span><span class="token parameter">sq</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token comment">// 根据一维矩阵，获取二维矩阵行数 行数从0开始</span>
      <span class="token keyword">return</span> sq <span class="token operator">>></span> <span class="token number">4</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token comment">/*根据一维矩阵，获取二维矩阵列数*/</span>
    <span class="token constant">FILE_X</span><span class="token punctuation">(</span><span class="token parameter">sq</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token comment">// 根据一维矩阵，获取二维矩阵列数</span>
      <span class="token keyword">return</span> sq <span class="token operator">&amp;</span> <span class="token number">15</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token comment">/*初始化棋盘，得到棋盘一开始的布局*/</span>
        <span class="token function">initBoard</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>displayChessTemp <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token comment">//清空一下棋盘</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>FENArray <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token constant">FEN</span><span class="token punctuation">.</span><span class="token function">split</span><span class="token punctuation">(</span><span class="token string">''</span><span class="token punctuation">)</span> <span class="token comment">//将FEN字符串转为数组</span>

      <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">FENtoBoard</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>FENArray<span class="token punctuation">)</span><span class="token comment">//将FEN串(array型)转化为一维数组形式，并且字符元素映射为整型,保存在this.displayChessTemp</span>
      <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">256</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token comment">//将棋盘外元素设置为null</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token constant">IN_BOARD</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token keyword">this</span><span class="token punctuation">.</span>displayChessTemp<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token keyword">null</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
      <span class="token keyword">let</span> start <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token constant">COORD_XY</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span> <span class="token comment">//51,循环开始处</span>
      <span class="token keyword">let</span> end <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token constant">COORD_XY</span><span class="token punctuation">(</span><span class="token number">11</span><span class="token punctuation">,</span> <span class="token number">12</span><span class="token punctuation">)</span> <span class="token comment">//203，循环结束处</span>
      <span class="token comment">// let imgDomArr = document.querySelectorAll('div.imgBox img')</span>
      <span class="token comment">/*tag用作记录文件名关键信息；
      **row是当前循环索引值i对应的二维坐标的行数,col是列数；
      **imgIndex用于记录i对应第几个图片*/</span>
      <span class="token keyword">let</span> tag <span class="token operator">=</span> <span class="token string">''</span><span class="token punctuation">,</span> row <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">,</span> imgIndex <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">,</span> col <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
      <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> start<span class="token punctuation">;</span> i <span class="token operator">&lt;=</span> end<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token constant">IN_BOARD</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token keyword">switch</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>displayChessTemp<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">case</span> <span class="token number">8</span><span class="token operator">:</span>
              tag <span class="token operator">=</span> <span class="token string">'K'</span><span class="token punctuation">;</span>
              <span class="token keyword">break</span><span class="token punctuation">;</span>
            <span class="token keyword">case</span> <span class="token number">9</span><span class="token operator">:</span>
              tag <span class="token operator">=</span> <span class="token string">'A'</span><span class="token punctuation">;</span>
              <span class="token keyword">break</span><span class="token punctuation">;</span>
            <span class="token keyword">case</span> <span class="token number">10</span><span class="token operator">:</span>
              tag <span class="token operator">=</span> <span class="token string">'B'</span><span class="token punctuation">;</span>
              <span class="token keyword">break</span><span class="token punctuation">;</span>
            <span class="token keyword">case</span> <span class="token number">11</span><span class="token operator">:</span>
              tag <span class="token operator">=</span> <span class="token string">'N'</span><span class="token punctuation">;</span>
              <span class="token keyword">break</span><span class="token punctuation">;</span>
            <span class="token keyword">case</span> <span class="token number">12</span><span class="token operator">:</span>
              tag <span class="token operator">=</span> <span class="token string">'R'</span><span class="token punctuation">;</span>
              <span class="token keyword">break</span><span class="token punctuation">;</span>
            <span class="token keyword">case</span> <span class="token number">13</span><span class="token operator">:</span>
              tag <span class="token operator">=</span> <span class="token string">'C'</span><span class="token punctuation">;</span>
              <span class="token keyword">break</span><span class="token punctuation">;</span>
            <span class="token keyword">case</span> <span class="token number">14</span><span class="token operator">:</span>
              tag <span class="token operator">=</span> <span class="token string">'P'</span><span class="token punctuation">;</span>
              <span class="token keyword">break</span><span class="token punctuation">;</span>

            <span class="token keyword">case</span> <span class="token number">16</span><span class="token operator">:</span>
              tag <span class="token operator">=</span> <span class="token string">'k_'</span><span class="token punctuation">;</span>
              <span class="token keyword">break</span><span class="token punctuation">;</span>
            <span class="token keyword">case</span> <span class="token number">17</span><span class="token operator">:</span>
              tag <span class="token operator">=</span> <span class="token string">'a_'</span><span class="token punctuation">;</span>
              <span class="token keyword">break</span><span class="token punctuation">;</span>
            <span class="token keyword">case</span> <span class="token number">18</span><span class="token operator">:</span>
              tag <span class="token operator">=</span> <span class="token string">'b_'</span><span class="token punctuation">;</span>
              <span class="token keyword">break</span><span class="token punctuation">;</span>
            <span class="token keyword">case</span> <span class="token number">19</span><span class="token operator">:</span>
              tag <span class="token operator">=</span> <span class="token string">'n_'</span><span class="token punctuation">;</span>
              <span class="token keyword">break</span><span class="token punctuation">;</span>
            <span class="token keyword">case</span> <span class="token number">20</span><span class="token operator">:</span>
              tag <span class="token operator">=</span> <span class="token string">'r_'</span><span class="token punctuation">;</span>
              <span class="token keyword">break</span><span class="token punctuation">;</span>
            <span class="token keyword">case</span> <span class="token number">21</span><span class="token operator">:</span>
              tag <span class="token operator">=</span> <span class="token string">'c_'</span><span class="token punctuation">;</span>
              <span class="token keyword">break</span><span class="token punctuation">;</span>
            <span class="token keyword">case</span> <span class="token number">22</span><span class="token operator">:</span>
              tag <span class="token operator">=</span> <span class="token string">'p_'</span><span class="token punctuation">;</span>
              <span class="token keyword">break</span><span class="token punctuation">;</span>
            <span class="token keyword">case</span> <span class="token number">1</span><span class="token operator">:</span>
              tag <span class="token operator">=</span> <span class="token string">'UNexist'</span><span class="token punctuation">;</span>
              <span class="token keyword">break</span><span class="token punctuation">;</span>
            <span class="token keyword">case</span> <span class="token number">0</span><span class="token operator">:</span>
              tag <span class="token operator">=</span> <span class="token string">'UNexist'</span>
              <span class="token keyword">break</span><span class="token punctuation">;</span>
            <span class="token keyword">default</span><span class="token operator">:</span>
              tag <span class="token operator">=</span> <span class="token string">'UNexist'</span>
          <span class="token punctuation">}</span>
          row <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token constant">RANK_Y</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span>
          col <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token constant">FILE_X</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span>
          imgIndex <span class="token operator">=</span> i <span class="token operator">-</span> <span class="token number">7</span> <span class="token operator">*</span> row <span class="token operator">-</span> <span class="token number">30</span>
          <span class="token keyword">let</span> imgSrcStr <span class="token operator">=</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">/img/chess/</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>tag<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">.png</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">;</span>
          <span class="token keyword">this</span><span class="token punctuation">.</span>imgDomArr<span class="token punctuation">[</span>imgIndex<span class="token punctuation">]</span><span class="token punctuation">.</span>src <span class="token operator">=</span> imgSrcStr
          <span class="token comment">/*清空变量*/</span>
          tag <span class="token operator">=</span> <span class="token string">''</span><span class="token punctuation">;</span>
          row <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
          imgIndex <span class="token operator">=</span> <span class="token number">0</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">continue</span>
      <span class="token punctuation">}</span>

    <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token comment">/*人机对战模块*/</span>     
    <span class="token comment">/*电脑走棋
    * dom:电脑操控模拟鼠标点击处的dom对象(实际上是调用了chess1Click函数，没有点击)
    * 1代表起点，2代表终点
    * 实现效果为棋子移动
    * */</span>
    <span class="token function">machineMove</span><span class="token punctuation">(</span><span class="token parameter">dom1<span class="token punctuation">,</span>dom2</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
      <span class="token keyword">let</span> fileName1 <span class="token operator">=</span> dom1<span class="token punctuation">.</span><span class="token function">attr</span><span class="token punctuation">(</span><span class="token string">'src'</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">(</span><span class="token number">11</span><span class="token punctuation">,</span> <span class="token number">12</span><span class="token punctuation">)</span>
      <span class="token keyword">let</span> imgIndex1 <span class="token operator">=</span> <span class="token function">parseInt</span><span class="token punctuation">(</span>dom1<span class="token punctuation">.</span><span class="token function">attr</span><span class="token punctuation">(</span><span class="token string">'id'</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token number">1</span>
      <span class="token keyword">let</span> chessInfo1 <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token comment">//棋子的一些信息</span>
        <span class="token literal-property property">displayChess</span><span class="token operator">:</span> <span class="token keyword">this</span><span class="token punctuation">.</span>displayChessTemp<span class="token punctuation">,</span>
        <span class="token literal-property property">fileName</span><span class="token operator">:</span> fileName1<span class="token punctuation">,</span>
        <span class="token literal-property property">imgIndex</span><span class="token operator">:</span> imgIndex1<span class="token punctuation">,</span>
        <span class="token literal-property property">sqSelected</span><span class="token operator">:</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">imgIndexToSq</span><span class="token punctuation">(</span>imgIndex1<span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">chess1Click</span><span class="token punctuation">(</span>chessInfo1<span class="token punctuation">)</span><span class="token comment">//相当于鼠标点击了pos0车的位置</span>

      <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        <span class="token keyword">let</span> fileName2 <span class="token operator">=</span> dom2<span class="token punctuation">.</span><span class="token function">attr</span><span class="token punctuation">(</span><span class="token string">'src'</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">(</span><span class="token number">11</span><span class="token punctuation">,</span> <span class="token number">12</span><span class="token punctuation">)</span>
        <span class="token keyword">let</span> imgIndex2 <span class="token operator">=</span> <span class="token function">parseInt</span><span class="token punctuation">(</span>dom2<span class="token punctuation">.</span><span class="token function">attr</span><span class="token punctuation">(</span><span class="token string">'id'</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token number">1</span>
        <span class="token keyword">let</span> chessInfo2 <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token comment">//棋子的一些信息</span>
          <span class="token literal-property property">displayChess</span><span class="token operator">:</span> <span class="token keyword">this</span><span class="token punctuation">.</span>displayChessTemp<span class="token punctuation">,</span>
          <span class="token literal-property property">fileName</span><span class="token operator">:</span> fileName2<span class="token punctuation">,</span>
          <span class="token literal-property property">imgIndex</span><span class="token operator">:</span> imgIndex2<span class="token punctuation">,</span>
          <span class="token literal-property property">sqSelected</span><span class="token operator">:</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">imgIndexToSq</span><span class="token punctuation">(</span>imgIndex2<span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">chess1Click</span><span class="token punctuation">(</span>chessInfo2<span class="token punctuation">)</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span><span class="token number">500</span><span class="token punctuation">)</span>

    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token comment">/*根据输入的棋子dom对象，返回该棋子所有可能的下一步走法（array型，但数组元素为dom对象）*/</span>
    <span class="token function">machine_getSteps</span><span class="token punctuation">(</span><span class="token parameter">dom<span class="token punctuation">,</span> arr</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// console.log(arr);</span>
      <span class="token keyword">if</span><span class="token punctuation">(</span>arr <span class="token operator">!==</span> <span class="token keyword">undefined</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">let</span> step <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
        <span class="token keyword">let</span> fileName <span class="token operator">=</span> dom<span class="token punctuation">.</span><span class="token function">attr</span><span class="token punctuation">(</span><span class="token string">'src'</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">(</span><span class="token number">11</span><span class="token punctuation">,</span> <span class="token number">12</span><span class="token punctuation">)</span>
        <span class="token keyword">let</span> sqSrc <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">imgIndexToSq</span><span class="token punctuation">(</span><span class="token function">parseInt</span><span class="token punctuation">(</span>dom<span class="token punctuation">.</span><span class="token function">attr</span><span class="token punctuation">(</span><span class="token string">'id'</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token comment">//获取一维坐标</span>
        <span class="token keyword">switch</span> <span class="token punctuation">(</span>fileName<span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token keyword">case</span> <span class="token string">'k'</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token keyword">let</span> <span class="token constant">KING_DELTA</span><span class="token operator">=</span> <span class="token punctuation">[</span><span class="token operator">-</span><span class="token number">16</span><span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">16</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
            <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token keyword">in</span> <span class="token constant">KING_DELTA</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token comment">// 将的4个方向</span>
              <span class="token keyword">let</span> sqDst <span class="token operator">=</span> sqSrc <span class="token operator">+</span> <span class="token constant">KING_DELTA</span><span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token comment">// 得到一个可能的终点位置</span>
              <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token operator">!</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token constant">IN_BOARD</span><span class="token punctuation">(</span>sqDst<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token comment">//终点处不在棋盘内</span>
                <span class="token keyword">continue</span>
              <span class="token punctuation">}</span>
              <span class="token keyword">if</span><span class="token punctuation">(</span>arr<span class="token punctuation">[</span>sqDst<span class="token punctuation">]</span> <span class="token operator">&lt;</span> <span class="token number">16</span> <span class="token operator">&amp;&amp;</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token constant">IN_FORT</span><span class="token punctuation">(</span>sqDst<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token comment">//终点处没有棋子没有本方（黑方）棋子，且终点在九宫格内</span>
                <span class="token keyword">let</span> row <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token constant">RANK_Y</span><span class="token punctuation">(</span>sqDst<span class="token punctuation">)</span>
                <span class="token keyword">let</span> imgIndex <span class="token operator">=</span> sqDst <span class="token operator">-</span> <span class="token number">7</span><span class="token operator">*</span>row <span class="token operator">-</span><span class="token number">29</span> <span class="token operator">-</span> <span class="token number">1</span>
                <span class="token keyword">let</span> domTemp <span class="token operator">=</span>  <span class="token function">$</span><span class="token punctuation">(</span><span class="token string">'#pos'</span> <span class="token operator">+</span> imgIndex<span class="token punctuation">)</span>
                step<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>domTemp<span class="token punctuation">)</span>
              <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">break</span>
          <span class="token punctuation">}</span>
          <span class="token keyword">case</span> <span class="token string">'a'</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token keyword">let</span> <span class="token constant">ADVISOR_DELTA</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token operator">-</span><span class="token number">15</span><span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">17</span><span class="token punctuation">,</span> <span class="token number">17</span><span class="token punctuation">,</span> <span class="token number">15</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
            <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token keyword">in</span> <span class="token constant">ADVISOR_DELTA</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
              <span class="token keyword">let</span> sqDst <span class="token operator">=</span> sqSrc <span class="token operator">+</span> <span class="token constant">ADVISOR_DELTA</span><span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token comment">// 得到一个可能的终点位置</span>
              <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token operator">!</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token constant">IN_BOARD</span><span class="token punctuation">(</span>sqDst<span class="token punctuation">)</span> <span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token comment">//终点处不在棋盘内，或不在九宫格内</span>
                <span class="token keyword">continue</span>
              <span class="token punctuation">}</span>
              <span class="token keyword">if</span><span class="token punctuation">(</span>arr<span class="token punctuation">[</span>sqDst<span class="token punctuation">]</span> <span class="token operator">&lt;</span> <span class="token number">16</span> <span class="token operator">&amp;&amp;</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token constant">IN_FORT</span><span class="token punctuation">(</span>sqDst<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token comment">//终点处没有棋子没有本方（黑方）棋子,且终点在九宫格内</span>
                <span class="token keyword">let</span> row <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token constant">RANK_Y</span><span class="token punctuation">(</span>sqDst<span class="token punctuation">)</span>
                <span class="token keyword">let</span> imgIndex <span class="token operator">=</span> sqDst <span class="token operator">-</span> <span class="token number">7</span><span class="token operator">*</span>row <span class="token operator">-</span><span class="token number">29</span> <span class="token operator">-</span> <span class="token number">1</span>
                <span class="token keyword">let</span> domTemp <span class="token operator">=</span>  <span class="token function">$</span><span class="token punctuation">(</span><span class="token string">'#pos'</span> <span class="token operator">+</span> imgIndex<span class="token punctuation">)</span>
                step<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>domTemp<span class="token punctuation">)</span>
              <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">break</span>
          <span class="token punctuation">}</span>
          <span class="token keyword">case</span> <span class="token string">'b'</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token keyword">let</span> <span class="token constant">BISHOP_DELTA</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token operator">-</span><span class="token number">34</span><span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">30</span><span class="token punctuation">,</span> <span class="token number">30</span><span class="token punctuation">,</span> <span class="token number">34</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
            <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token keyword">in</span> <span class="token constant">BISHOP_DELTA</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
              <span class="token keyword">let</span> sqDst <span class="token operator">=</span> sqSrc <span class="token operator">+</span> <span class="token constant">BISHOP_DELTA</span><span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token comment">// 得到一个可能的终点位置</span>
              <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token operator">!</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token constant">IN_BOARD</span><span class="token punctuation">(</span>sqDst<span class="token punctuation">)</span> <span class="token operator">||</span> <span class="token operator">!</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token constant">SAME_HALF</span><span class="token punctuation">(</span>sqSrc<span class="token punctuation">,</span>sqDst<span class="token punctuation">)</span>
                  <span class="token operator">||</span> arr<span class="token punctuation">[</span><span class="token punctuation">(</span>sqSrc<span class="token operator">+</span>sqDst<span class="token punctuation">)</span><span class="token operator">/</span><span class="token number">2</span><span class="token punctuation">]</span> <span class="token operator">></span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token comment">//终点处不在棋盘内,或过河,或象眼无棋子</span>
                <span class="token keyword">continue</span>
              <span class="token punctuation">}</span>
              <span class="token keyword">if</span><span class="token punctuation">(</span>arr<span class="token punctuation">[</span>sqDst<span class="token punctuation">]</span> <span class="token operator">&lt;</span> <span class="token number">16</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token comment">//终点处没有棋子没有本方（黑方）棋子</span>
                <span class="token keyword">let</span> row <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token constant">RANK_Y</span><span class="token punctuation">(</span>sqDst<span class="token punctuation">)</span>
                <span class="token keyword">let</span> imgIndex <span class="token operator">=</span> sqDst <span class="token operator">-</span> <span class="token number">7</span><span class="token operator">*</span>row <span class="token operator">-</span><span class="token number">29</span> <span class="token operator">-</span> <span class="token number">1</span>
                <span class="token keyword">let</span> domTemp <span class="token operator">=</span>  <span class="token function">$</span><span class="token punctuation">(</span><span class="token string">'#pos'</span> <span class="token operator">+</span> imgIndex<span class="token punctuation">)</span>
                step<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>domTemp<span class="token punctuation">)</span>
              <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">break</span>
          <span class="token punctuation">}</span>
          <span class="token keyword">case</span> <span class="token string">'n'</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token keyword">let</span> <span class="token constant">KING_DELTA</span><span class="token operator">=</span> <span class="token punctuation">[</span><span class="token operator">-</span><span class="token number">16</span><span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">16</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
            <span class="token keyword">let</span> <span class="token constant">KNIGHT_DELTA</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">[</span><span class="token operator">-</span><span class="token number">33</span><span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">31</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token operator">-</span><span class="token number">18</span><span class="token punctuation">,</span> <span class="token number">14</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token operator">-</span><span class="token number">14</span><span class="token punctuation">,</span> <span class="token number">18</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token number">31</span><span class="token punctuation">,</span> <span class="token number">33</span><span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
            <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token keyword">in</span> <span class="token constant">KNIGHT_DELTA</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token comment">// 马腿的4个方向</span>
              <span class="token keyword">let</span> sqDst <span class="token operator">=</span> sqSrc <span class="token operator">+</span> <span class="token constant">KING_DELTA</span><span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token comment">// 得到一个马腿的位置</span>
              <span class="token keyword">if</span><span class="token punctuation">(</span>arr<span class="token punctuation">[</span>sqDst<span class="token punctuation">]</span> <span class="token operator">></span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token comment">//马脚处有棋子</span>
                <span class="token keyword">continue</span>
              <span class="token punctuation">}</span>
              <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> j <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> j <span class="token operator">&lt;</span> <span class="token number">2</span><span class="token punctuation">;</span> j <span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">// 1个马腿对应2个马的方向</span>
                sqDst <span class="token operator">=</span> sqSrc <span class="token operator">+</span> <span class="token constant">KNIGHT_DELTA</span><span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">[</span>j<span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token comment">// 得到一个马的可能的终点位置</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token constant">IN_BOARD</span><span class="token punctuation">(</span>sqDst<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                  <span class="token keyword">continue</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
                <span class="token keyword">if</span><span class="token punctuation">(</span>arr<span class="token punctuation">[</span>sqDst<span class="token punctuation">]</span> <span class="token operator">&lt;</span> <span class="token number">16</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                  <span class="token comment">//终点处没有棋子没有本方（黑方）棋子</span>
                  <span class="token keyword">let</span> row <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token constant">RANK_Y</span><span class="token punctuation">(</span>sqDst<span class="token punctuation">)</span>
                  <span class="token keyword">let</span> imgIndex <span class="token operator">=</span> sqDst <span class="token operator">-</span> <span class="token number">7</span><span class="token operator">*</span>row <span class="token operator">-</span><span class="token number">29</span> <span class="token operator">-</span> <span class="token number">1</span>
                  <span class="token keyword">let</span> domTemp <span class="token operator">=</span>  <span class="token function">$</span><span class="token punctuation">(</span><span class="token string">'#pos'</span> <span class="token operator">+</span> imgIndex<span class="token punctuation">)</span>
                  step<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>domTemp<span class="token punctuation">)</span>
                <span class="token punctuation">}</span>
              <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">break</span>
          <span class="token punctuation">}</span>
          <span class="token keyword">case</span> <span class="token string">'r'</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token keyword">let</span> <span class="token constant">KING_DELTA</span><span class="token operator">=</span> <span class="token punctuation">[</span><span class="token operator">-</span><span class="token number">16</span><span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">16</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
            <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">4</span><span class="token punctuation">;</span> i <span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
              <span class="token keyword">let</span> delta <span class="token operator">=</span> <span class="token constant">KING_DELTA</span><span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">;</span>    <span class="token comment">// 得到一个方向</span>
              <span class="token keyword">let</span> sqDst <span class="token operator">=</span> sqSrc <span class="token operator">+</span> delta<span class="token punctuation">;</span>    <span class="token comment">// 从起点sqSrc开始，沿着方向delta走一步</span>
              <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token constant">IN_BOARD</span><span class="token punctuation">(</span>sqDst<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token comment">//在棋盘上</span>
                <span class="token keyword">if</span><span class="token punctuation">(</span>arr<span class="token punctuation">[</span>sqDst<span class="token punctuation">]</span> <span class="token operator">&lt;</span> <span class="token number">16</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                  <span class="token comment">//终点处没有棋子没有本方（黑方）棋子,或有红方棋子</span>
                  <span class="token keyword">let</span> row <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token constant">RANK_Y</span><span class="token punctuation">(</span>sqDst<span class="token punctuation">)</span>
                  <span class="token keyword">let</span> imgIndex <span class="token operator">=</span> sqDst <span class="token operator">-</span> <span class="token number">7</span><span class="token operator">*</span>row <span class="token operator">-</span><span class="token number">29</span> <span class="token operator">-</span> <span class="token number">1</span>
                  <span class="token keyword">let</span> domTemp <span class="token operator">=</span>  <span class="token function">$</span><span class="token punctuation">(</span><span class="token string">'#pos'</span> <span class="token operator">+</span> imgIndex<span class="token punctuation">)</span>
                  step<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>domTemp<span class="token punctuation">)</span>
                  <span class="token keyword">if</span><span class="token punctuation">(</span>arr<span class="token punctuation">[</span>sqDst<span class="token punctuation">]</span> <span class="token operator">>=</span> <span class="token number">8</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    <span class="token comment">//终点处有对方（红方）棋子</span>
                    <span class="token keyword">break</span>
                  <span class="token punctuation">}</span>
                <span class="token punctuation">}</span>
                <span class="token keyword">else</span> <span class="token keyword">break</span>
                sqDst <span class="token operator">+=</span> delta<span class="token punctuation">;</span>     <span class="token comment">// 沿着方向delta向前走一步</span>
              <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">break</span>
          <span class="token punctuation">}</span>
          <span class="token keyword">case</span> <span class="token string">'c'</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token keyword">let</span> <span class="token constant">KING_DELTA</span><span class="token operator">=</span> <span class="token punctuation">[</span><span class="token operator">-</span><span class="token number">16</span><span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">16</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
            <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">4</span><span class="token punctuation">;</span> i <span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
              <span class="token keyword">let</span> delta <span class="token operator">=</span> <span class="token constant">KING_DELTA</span><span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">;</span>    <span class="token comment">// 得到一个方向</span>
              <span class="token keyword">let</span> sqDst <span class="token operator">=</span> sqSrc <span class="token operator">+</span> delta<span class="token punctuation">;</span>    <span class="token comment">// 从起点sqSrc开始，沿着方向delta走一步</span>
              <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token constant">IN_BOARD</span><span class="token punctuation">(</span>sqDst<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">if</span><span class="token punctuation">(</span>arr<span class="token punctuation">[</span>sqDst<span class="token punctuation">]</span> <span class="token operator">===</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                  <span class="token comment">//终点处没有棋子</span>
                  <span class="token keyword">let</span> row <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token constant">RANK_Y</span><span class="token punctuation">(</span>sqDst<span class="token punctuation">)</span>
                  <span class="token keyword">let</span> imgIndex <span class="token operator">=</span> sqDst <span class="token operator">-</span> <span class="token number">7</span><span class="token operator">*</span>row <span class="token operator">-</span><span class="token number">29</span> <span class="token operator">-</span> <span class="token number">1</span>
                  <span class="token keyword">let</span> domTemp <span class="token operator">=</span>  <span class="token function">$</span><span class="token punctuation">(</span><span class="token string">'#pos'</span> <span class="token operator">+</span> imgIndex<span class="token punctuation">)</span>
                  step<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>domTemp<span class="token punctuation">)</span>
                <span class="token punctuation">}</span>
                <span class="token keyword">else</span> <span class="token punctuation">{</span>            <span class="token comment">// 终点存在棋子，炮需要翻山</span>
                  <span class="token keyword">break</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
                sqDst <span class="token operator">+=</span> delta<span class="token punctuation">;</span>     <span class="token comment">// 沿着方向delta向前走一步</span>
              <span class="token punctuation">}</span>
              sqDst <span class="token operator">+=</span> delta<span class="token punctuation">;</span>       <span class="token comment">// 沿着方向delta向前走一步</span>
              <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token constant">IN_BOARD</span><span class="token punctuation">(</span>sqDst<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">// 如果sqDst仍位于棋盘，那么此时炮已经翻山了</span>
                <span class="token keyword">if</span><span class="token punctuation">(</span>arr<span class="token punctuation">[</span>sqDst<span class="token punctuation">]</span> <span class="token operator">>=</span> <span class="token number">8</span> <span class="token operator">&amp;&amp;</span> arr<span class="token punctuation">[</span>sqDst<span class="token punctuation">]</span> <span class="token operator">&lt;</span> <span class="token number">16</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                  <span class="token comment">//终点处是红方棋子</span>
                  <span class="token keyword">let</span> row <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token constant">RANK_Y</span><span class="token punctuation">(</span>sqDst<span class="token punctuation">)</span>
                  <span class="token keyword">let</span> imgIndex <span class="token operator">=</span> sqDst <span class="token operator">-</span> <span class="token number">7</span><span class="token operator">*</span>row <span class="token operator">-</span> <span class="token number">29</span> <span class="token operator">-</span> <span class="token number">1</span>
                  <span class="token keyword">let</span> domTemp <span class="token operator">=</span> <span class="token function">$</span><span class="token punctuation">(</span><span class="token string">'#pos'</span> <span class="token operator">+</span> imgIndex<span class="token punctuation">)</span>
                  step<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>domTemp<span class="token punctuation">)</span>
                  <span class="token keyword">break</span>
                <span class="token punctuation">}</span>
                sqDst <span class="token operator">+=</span> delta<span class="token punctuation">;</span>
              <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">break</span>
          <span class="token punctuation">}</span>
          <span class="token keyword">case</span> <span class="token string">'p'</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token keyword">let</span> PAWN_delta <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">16</span><span class="token punctuation">,</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">]</span> <span class="token comment">//兵一开始只能向下走,过河后可向左/右走</span>
            <span class="token keyword">let</span> sqDst <span class="token operator">=</span> sqSrc <span class="token operator">+</span> PAWN_delta<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span>
            <span class="token keyword">if</span><span class="token punctuation">(</span>arr<span class="token punctuation">[</span>sqDst<span class="token punctuation">]</span> <span class="token operator">&lt;</span> <span class="token number">16</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token comment">//终点处不是黑方棋子</span>
              <span class="token keyword">let</span> row <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token constant">RANK_Y</span><span class="token punctuation">(</span>sqDst<span class="token punctuation">)</span>
              <span class="token keyword">let</span> imgIndex <span class="token operator">=</span> sqDst <span class="token operator">-</span> <span class="token number">7</span><span class="token operator">*</span>row <span class="token operator">-</span><span class="token number">29</span> <span class="token operator">-</span> <span class="token number">1</span>
              <span class="token keyword">let</span> domTemp <span class="token operator">=</span>  <span class="token function">$</span><span class="token punctuation">(</span><span class="token string">'#pos'</span> <span class="token operator">+</span> imgIndex<span class="token punctuation">)</span>
              step<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>domTemp<span class="token punctuation">)</span>
            <span class="token punctuation">}</span>
            <span class="token comment">//若兵过河了(此处的131是经过计算得到的过河临界值，且终点在棋盘内</span>
            <span class="token keyword">if</span><span class="token punctuation">(</span>sqSrc <span class="token operator">>=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">domToSq</span><span class="token punctuation">(</span><span class="token function">$</span><span class="token punctuation">(</span><span class="token string">'#pos45'</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
              <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">2</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                sqDst <span class="token operator">=</span> sqSrc <span class="token operator">+</span> PAWN_delta<span class="token punctuation">[</span>i<span class="token operator">+</span><span class="token number">1</span><span class="token punctuation">]</span>
                <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token operator">!</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token constant">IN_BOARD</span><span class="token punctuation">(</span>sqDst<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token keyword">break</span>
                <span class="token keyword">if</span><span class="token punctuation">(</span>arr<span class="token punctuation">[</span>sqDst<span class="token punctuation">]</span> <span class="token operator">&lt;</span> <span class="token number">16</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                  <span class="token keyword">let</span> row <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token constant">RANK_Y</span><span class="token punctuation">(</span>sqDst<span class="token punctuation">)</span>
                  <span class="token keyword">let</span> imgIndex <span class="token operator">=</span> sqDst <span class="token operator">-</span> <span class="token number">7</span><span class="token operator">*</span>row <span class="token operator">-</span><span class="token number">29</span> <span class="token operator">-</span> <span class="token number">1</span>
                  <span class="token keyword">let</span> domTemp <span class="token operator">=</span>  <span class="token function">$</span><span class="token punctuation">(</span><span class="token string">'#pos'</span> <span class="token operator">+</span> imgIndex<span class="token punctuation">)</span>
                  step<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>domTemp<span class="token punctuation">)</span>
                <span class="token punctuation">}</span>
              <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">break</span>
          <span class="token punctuation">}</span>

          <span class="token keyword">case</span> <span class="token string">'K'</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token keyword">let</span> <span class="token constant">KING_DELTA</span><span class="token operator">=</span> <span class="token punctuation">[</span><span class="token operator">-</span><span class="token number">16</span><span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">16</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
            <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token keyword">in</span> <span class="token constant">KING_DELTA</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token comment">// 将的4个方向</span>
              <span class="token keyword">let</span> sqDst <span class="token operator">=</span> sqSrc <span class="token operator">+</span> <span class="token constant">KING_DELTA</span><span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token comment">// 得到一个可能的终点位置</span>
              <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token operator">!</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token constant">IN_BOARD</span><span class="token punctuation">(</span>sqDst<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token comment">//终点处不在棋盘内</span>
                <span class="token keyword">continue</span>
              <span class="token punctuation">}</span>
              <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token operator">!</span><span class="token punctuation">(</span>arr<span class="token punctuation">[</span>sqDst<span class="token punctuation">]</span> <span class="token operator">&amp;</span> <span class="token number">8</span><span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token constant">IN_FORT</span><span class="token punctuation">(</span>sqDst<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token comment">//终点处没有棋子没有本方（红方）棋子，且终点在九宫格内</span>
                <span class="token keyword">let</span> row <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token constant">RANK_Y</span><span class="token punctuation">(</span>sqDst<span class="token punctuation">)</span>
                <span class="token keyword">let</span> imgIndex <span class="token operator">=</span> sqDst <span class="token operator">-</span> <span class="token number">7</span><span class="token operator">*</span>row <span class="token operator">-</span><span class="token number">29</span> <span class="token operator">-</span> <span class="token number">1</span>
                <span class="token keyword">let</span> domTemp <span class="token operator">=</span>  <span class="token function">$</span><span class="token punctuation">(</span><span class="token string">'#pos'</span> <span class="token operator">+</span> imgIndex<span class="token punctuation">)</span>
                step<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>domTemp<span class="token punctuation">)</span>
              <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">break</span>
          <span class="token punctuation">}</span>
          <span class="token keyword">case</span> <span class="token string">'A'</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token keyword">let</span> <span class="token constant">ADVISOR_DELTA</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token operator">-</span><span class="token number">15</span><span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">17</span><span class="token punctuation">,</span> <span class="token number">17</span><span class="token punctuation">,</span> <span class="token number">15</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
            <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token keyword">in</span> <span class="token constant">ADVISOR_DELTA</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
              <span class="token keyword">let</span> sqDst <span class="token operator">=</span> sqSrc <span class="token operator">+</span> <span class="token constant">ADVISOR_DELTA</span><span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token comment">// 得到一个可能的终点位置</span>
              <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token operator">!</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token constant">IN_BOARD</span><span class="token punctuation">(</span>sqDst<span class="token punctuation">)</span> <span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token comment">//终点处不在棋盘内，或不在九宫格内</span>
                <span class="token keyword">continue</span>
              <span class="token punctuation">}</span>
              <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token operator">!</span><span class="token punctuation">(</span>arr<span class="token punctuation">[</span>sqDst<span class="token punctuation">]</span> <span class="token operator">&amp;</span> <span class="token number">8</span><span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token constant">IN_FORT</span><span class="token punctuation">(</span>sqDst<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token comment">//终点处没有棋子没有本方（红方）棋子,且终点在九宫格内</span>
                <span class="token keyword">let</span> row <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token constant">RANK_Y</span><span class="token punctuation">(</span>sqDst<span class="token punctuation">)</span>
                <span class="token keyword">let</span> imgIndex <span class="token operator">=</span> sqDst <span class="token operator">-</span> <span class="token number">7</span><span class="token operator">*</span>row <span class="token operator">-</span><span class="token number">29</span> <span class="token operator">-</span> <span class="token number">1</span>
                <span class="token keyword">let</span> domTemp <span class="token operator">=</span>  <span class="token function">$</span><span class="token punctuation">(</span><span class="token string">'#pos'</span> <span class="token operator">+</span> imgIndex<span class="token punctuation">)</span>
                step<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>domTemp<span class="token punctuation">)</span>
              <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">break</span>
          <span class="token punctuation">}</span>
          <span class="token keyword">case</span> <span class="token string">'B'</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token keyword">let</span> <span class="token constant">BISHOP_DELTA</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token operator">-</span><span class="token number">34</span><span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">30</span><span class="token punctuation">,</span> <span class="token number">30</span><span class="token punctuation">,</span> <span class="token number">34</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
            <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token keyword">in</span> <span class="token constant">BISHOP_DELTA</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
              <span class="token keyword">let</span> sqDst <span class="token operator">=</span> sqSrc <span class="token operator">+</span> <span class="token constant">BISHOP_DELTA</span><span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token comment">// 得到一个可能的终点位置</span>
              <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token operator">!</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token constant">IN_BOARD</span><span class="token punctuation">(</span>sqDst<span class="token punctuation">)</span> <span class="token operator">||</span> <span class="token operator">!</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token constant">SAME_HALF</span><span class="token punctuation">(</span>sqSrc<span class="token punctuation">,</span>sqDst<span class="token punctuation">)</span>
                  <span class="token operator">||</span> arr<span class="token punctuation">[</span><span class="token punctuation">(</span>sqSrc<span class="token operator">+</span>sqDst<span class="token punctuation">)</span><span class="token operator">/</span><span class="token number">2</span><span class="token punctuation">]</span> <span class="token operator">></span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token comment">//终点处不在棋盘内,或过河,或象眼无棋子</span>
                <span class="token keyword">continue</span>
              <span class="token punctuation">}</span>
              <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token operator">!</span><span class="token punctuation">(</span>arr<span class="token punctuation">[</span>sqDst<span class="token punctuation">]</span> <span class="token operator">&amp;</span> <span class="token number">8</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token comment">//终点处没有棋子没有本方（红方）棋子</span>
                <span class="token keyword">let</span> row <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token constant">RANK_Y</span><span class="token punctuation">(</span>sqDst<span class="token punctuation">)</span>
                <span class="token keyword">let</span> imgIndex <span class="token operator">=</span> sqDst <span class="token operator">-</span> <span class="token number">7</span><span class="token operator">*</span>row <span class="token operator">-</span><span class="token number">29</span> <span class="token operator">-</span> <span class="token number">1</span>
                <span class="token keyword">let</span> domTemp <span class="token operator">=</span>  <span class="token function">$</span><span class="token punctuation">(</span><span class="token string">'#pos'</span> <span class="token operator">+</span> imgIndex<span class="token punctuation">)</span>
                step<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>domTemp<span class="token punctuation">)</span>
              <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">break</span>
          <span class="token punctuation">}</span>
          <span class="token keyword">case</span> <span class="token string">'N'</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token keyword">let</span> <span class="token constant">KING_DELTA</span><span class="token operator">=</span> <span class="token punctuation">[</span><span class="token operator">-</span><span class="token number">16</span><span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">16</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
            <span class="token keyword">let</span> <span class="token constant">KNIGHT_DELTA</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">[</span><span class="token operator">-</span><span class="token number">33</span><span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">31</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token operator">-</span><span class="token number">18</span><span class="token punctuation">,</span> <span class="token number">14</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token operator">-</span><span class="token number">14</span><span class="token punctuation">,</span> <span class="token number">18</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token number">31</span><span class="token punctuation">,</span> <span class="token number">33</span><span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
            <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token keyword">in</span> <span class="token constant">KNIGHT_DELTA</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token comment">// 马腿的4个方向</span>
              <span class="token keyword">let</span> sqDst <span class="token operator">=</span> sqSrc <span class="token operator">+</span> <span class="token constant">KING_DELTA</span><span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token comment">// 得到一个马腿的位置</span>
              <span class="token keyword">if</span><span class="token punctuation">(</span>arr<span class="token punctuation">[</span>sqDst<span class="token punctuation">]</span> <span class="token operator">></span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token comment">//马脚处有棋子</span>
                <span class="token keyword">continue</span>
              <span class="token punctuation">}</span>
              <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> j <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> j <span class="token operator">&lt;</span> <span class="token number">2</span><span class="token punctuation">;</span> j <span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">// 1个马腿对应2个马的方向</span>
                sqDst <span class="token operator">=</span> sqSrc <span class="token operator">+</span> <span class="token constant">KNIGHT_DELTA</span><span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">[</span>j<span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token comment">// 得到一个马的可能的终点位置</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token constant">IN_BOARD</span><span class="token punctuation">(</span>sqDst<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                  <span class="token keyword">continue</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
                <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token operator">!</span><span class="token punctuation">(</span>arr<span class="token punctuation">[</span>sqDst<span class="token punctuation">]</span> <span class="token operator">&amp;</span> <span class="token number">8</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                  <span class="token comment">//终点处没有棋子没有本方（红方）棋子</span>
                  <span class="token keyword">let</span> row <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token constant">RANK_Y</span><span class="token punctuation">(</span>sqDst<span class="token punctuation">)</span>
                  <span class="token keyword">let</span> imgIndex <span class="token operator">=</span> sqDst <span class="token operator">-</span> <span class="token number">7</span><span class="token operator">*</span>row <span class="token operator">-</span><span class="token number">29</span> <span class="token operator">-</span> <span class="token number">1</span>
                  <span class="token keyword">let</span> domTemp <span class="token operator">=</span>  <span class="token function">$</span><span class="token punctuation">(</span><span class="token string">'#pos'</span> <span class="token operator">+</span> imgIndex<span class="token punctuation">)</span>
                  step<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>domTemp<span class="token punctuation">)</span>
                <span class="token punctuation">}</span>
              <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">break</span>
          <span class="token punctuation">}</span>
          <span class="token keyword">case</span> <span class="token string">'R'</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token keyword">let</span> <span class="token constant">KING_DELTA</span><span class="token operator">=</span> <span class="token punctuation">[</span><span class="token operator">-</span><span class="token number">16</span><span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">16</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
            <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">4</span><span class="token punctuation">;</span> i <span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
              <span class="token keyword">let</span> delta <span class="token operator">=</span> <span class="token constant">KING_DELTA</span><span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">;</span>    <span class="token comment">// 得到一个方向</span>
              <span class="token keyword">let</span> sqDst <span class="token operator">=</span> sqSrc <span class="token operator">+</span> delta<span class="token punctuation">;</span>    <span class="token comment">// 从起点sqSrc开始，沿着方向delta走一步</span>
              <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token constant">IN_BOARD</span><span class="token punctuation">(</span>sqDst<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token comment">//在棋盘上</span>
                <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token operator">!</span><span class="token punctuation">(</span>arr<span class="token punctuation">[</span>sqDst<span class="token punctuation">]</span> <span class="token operator">&amp;</span> <span class="token number">8</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                  <span class="token comment">//终点处没有棋子没有本方（红方）棋子,或有红方棋子</span>
                  <span class="token keyword">let</span> row <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token constant">RANK_Y</span><span class="token punctuation">(</span>sqDst<span class="token punctuation">)</span>
                  <span class="token keyword">let</span> imgIndex <span class="token operator">=</span> sqDst <span class="token operator">-</span> <span class="token number">7</span><span class="token operator">*</span>row <span class="token operator">-</span><span class="token number">29</span> <span class="token operator">-</span> <span class="token number">1</span>
                  <span class="token keyword">let</span> domTemp <span class="token operator">=</span>  <span class="token function">$</span><span class="token punctuation">(</span><span class="token string">'#pos'</span> <span class="token operator">+</span> imgIndex<span class="token punctuation">)</span>
                  step<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>domTemp<span class="token punctuation">)</span>
                  <span class="token keyword">if</span><span class="token punctuation">(</span>arr<span class="token punctuation">[</span>sqDst<span class="token punctuation">]</span> <span class="token operator">&amp;</span> <span class="token number">16</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    <span class="token comment">//终点处有对方（黑方）棋子</span>
                    <span class="token keyword">break</span>
                  <span class="token punctuation">}</span>
                <span class="token punctuation">}</span>
                <span class="token keyword">else</span> <span class="token keyword">break</span>
                sqDst <span class="token operator">+=</span> delta<span class="token punctuation">;</span>     <span class="token comment">// 沿着方向delta向前走一步</span>
              <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">break</span>
          <span class="token punctuation">}</span>
          <span class="token keyword">case</span> <span class="token string">'C'</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token keyword">let</span> <span class="token constant">KING_DELTA</span><span class="token operator">=</span> <span class="token punctuation">[</span><span class="token operator">-</span><span class="token number">16</span><span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">16</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
            <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">4</span><span class="token punctuation">;</span> i <span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
              <span class="token keyword">let</span> delta <span class="token operator">=</span> <span class="token constant">KING_DELTA</span><span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">;</span>    <span class="token comment">// 得到一个方向</span>
              <span class="token keyword">let</span> sqDst <span class="token operator">=</span> sqSrc <span class="token operator">+</span> delta<span class="token punctuation">;</span>    <span class="token comment">// 从起点sqSrc开始，沿着方向delta走一步</span>
              <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token constant">IN_BOARD</span><span class="token punctuation">(</span>sqDst<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">if</span><span class="token punctuation">(</span>arr<span class="token punctuation">[</span>sqDst<span class="token punctuation">]</span> <span class="token operator">===</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                  <span class="token comment">//终点处没有棋子</span>
                  <span class="token keyword">let</span> row <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token constant">RANK_Y</span><span class="token punctuation">(</span>sqDst<span class="token punctuation">)</span>
                  <span class="token keyword">let</span> imgIndex <span class="token operator">=</span> sqDst <span class="token operator">-</span> <span class="token number">7</span><span class="token operator">*</span>row <span class="token operator">-</span><span class="token number">29</span> <span class="token operator">-</span> <span class="token number">1</span>
                  <span class="token keyword">let</span> domTemp <span class="token operator">=</span>  <span class="token function">$</span><span class="token punctuation">(</span><span class="token string">'#pos'</span> <span class="token operator">+</span> imgIndex<span class="token punctuation">)</span>
                  step<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>domTemp<span class="token punctuation">)</span>
                <span class="token punctuation">}</span>
                <span class="token keyword">else</span> <span class="token punctuation">{</span>            <span class="token comment">// 终点存在棋子，炮需要翻山</span>
                  <span class="token keyword">break</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
                sqDst <span class="token operator">+=</span> delta<span class="token punctuation">;</span>     <span class="token comment">// 沿着方向delta向前走一步</span>
              <span class="token punctuation">}</span>
              sqDst <span class="token operator">+=</span> delta<span class="token punctuation">;</span>       <span class="token comment">// 沿着方向delta向前走一步</span>
              <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token constant">IN_BOARD</span><span class="token punctuation">(</span>sqDst<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">// 如果sqDst仍位于棋盘，那么此时炮已经翻山了</span>
                <span class="token keyword">if</span><span class="token punctuation">(</span>arr<span class="token punctuation">[</span>sqDst<span class="token punctuation">]</span> <span class="token operator">&amp;</span> <span class="token number">16</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                  <span class="token comment">//终点处是黑方棋子</span>
                  <span class="token keyword">let</span> row <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token constant">RANK_Y</span><span class="token punctuation">(</span>sqDst<span class="token punctuation">)</span>
                  <span class="token keyword">let</span> imgIndex <span class="token operator">=</span> sqDst <span class="token operator">-</span> <span class="token number">7</span><span class="token operator">*</span>row <span class="token operator">-</span> <span class="token number">29</span> <span class="token operator">-</span> <span class="token number">1</span>
                  <span class="token keyword">let</span> domTemp <span class="token operator">=</span> <span class="token function">$</span><span class="token punctuation">(</span><span class="token string">'#pos'</span> <span class="token operator">+</span> imgIndex<span class="token punctuation">)</span>
                  step<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>domTemp<span class="token punctuation">)</span>
                  <span class="token keyword">break</span>
                <span class="token punctuation">}</span>
                sqDst <span class="token operator">+=</span> delta<span class="token punctuation">;</span>
              <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">break</span>
          <span class="token punctuation">}</span>
          <span class="token keyword">case</span> <span class="token string">'P'</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token keyword">let</span> PAWN_delta <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token operator">-</span><span class="token number">16</span><span class="token punctuation">,</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">]</span> <span class="token comment">//兵一开始只能向上走,过河后可向左/右走</span>
            <span class="token keyword">let</span> sqDst <span class="token operator">=</span> sqSrc <span class="token operator">+</span> PAWN_delta<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span>
            <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token operator">!</span><span class="token punctuation">(</span>arr<span class="token punctuation">[</span>sqDst<span class="token punctuation">]</span> <span class="token operator">&amp;</span> <span class="token number">8</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token comment">//终点处不是红方棋子,则走法合法</span>
              <span class="token keyword">let</span> row <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token constant">RANK_Y</span><span class="token punctuation">(</span>sqDst<span class="token punctuation">)</span>
              <span class="token keyword">let</span> imgIndex <span class="token operator">=</span> sqDst <span class="token operator">-</span> <span class="token number">7</span><span class="token operator">*</span>row <span class="token operator">-</span><span class="token number">29</span> <span class="token operator">-</span> <span class="token number">1</span>
              <span class="token keyword">let</span> domTemp <span class="token operator">=</span>  <span class="token function">$</span><span class="token punctuation">(</span><span class="token string">'#pos'</span> <span class="token operator">+</span> imgIndex<span class="token punctuation">)</span>
              step<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>domTemp<span class="token punctuation">)</span>
            <span class="token punctuation">}</span>
            <span class="token comment">//若兵过河了(此处的131是经过计算得到的过河临界值，且终点在棋盘内</span>
            <span class="token keyword">if</span><span class="token punctuation">(</span>sqSrc <span class="token operator">&lt;</span> <span class="token number">131</span> <span class="token operator">&amp;&amp;</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token constant">IN_BOARD</span><span class="token punctuation">(</span>sqDst<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
              <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">2</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                sqDst <span class="token operator">=</span> sqSrc <span class="token operator">+</span> PAWN_delta<span class="token punctuation">[</span>i<span class="token operator">+</span><span class="token number">1</span><span class="token punctuation">]</span>
                <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token operator">!</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token constant">IN_BOARD</span><span class="token punctuation">(</span>sqDst<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token keyword">break</span>
                <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token operator">!</span><span class="token punctuation">(</span>arr<span class="token punctuation">[</span>sqDst<span class="token punctuation">]</span> <span class="token operator">&amp;</span> <span class="token number">8</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                  <span class="token keyword">let</span> row <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token constant">RANK_Y</span><span class="token punctuation">(</span>sqDst<span class="token punctuation">)</span>
                  <span class="token keyword">let</span> imgIndex <span class="token operator">=</span> sqDst <span class="token operator">-</span> <span class="token number">7</span><span class="token operator">*</span>row <span class="token operator">-</span><span class="token number">29</span> <span class="token operator">-</span> <span class="token number">1</span>
                  <span class="token keyword">let</span> domTemp <span class="token operator">=</span>  <span class="token function">$</span><span class="token punctuation">(</span><span class="token string">'#pos'</span> <span class="token operator">+</span> imgIndex<span class="token punctuation">)</span>
                  step<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>domTemp<span class="token punctuation">)</span>
                <span class="token punctuation">}</span>
              <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">break</span>
          <span class="token punctuation">}</span>
          <span class="token keyword">default</span><span class="token operator">:</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">$alert</span><span class="token punctuation">(</span><span class="token string">'出错了！'</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> step
      <span class="token punctuation">}</span>
      <span class="token keyword">else</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">$alert</span><span class="token punctuation">(</span><span class="token string">'出错了！'</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token comment">/*根据局面评估值，返回下一步要走的棋子*/</span>
    <span class="token function">machine_getPcToBeMoved</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">let</span> blackAllPc <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span> whiteAllPc <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
      <span class="token keyword">let</span> displayChess_evaluate <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>displayChessTemp<span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token parameter">item</span> <span class="token operator">=></span> <span class="token punctuation">{</span><span class="token keyword">return</span> item<span class="token punctuation">}</span><span class="token punctuation">)</span>
      <span class="token comment">//该循环得到所有可以选择走的棋子，的一维坐标</span>
      <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">let</span> sqSrc <span class="token keyword">in</span> <span class="token keyword">this</span><span class="token punctuation">.</span>displayChessTemp<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>displayChess_evaluate<span class="token punctuation">[</span>sqSrc<span class="token punctuation">]</span> <span class="token operator">&amp;</span> <span class="token number">16</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          blackAllPc<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>sqSrc<span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">else</span> <span class="token keyword">if</span><span class="token punctuation">(</span>displayChess_evaluate<span class="token punctuation">[</span>sqSrc<span class="token punctuation">]</span> <span class="token operator">&amp;</span> <span class="token number">8</span><span class="token punctuation">)</span> whiteAllPc<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>sqSrc<span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
      <span class="token keyword">let</span> ramI_w <span class="token operator">=</span> Math<span class="token punctuation">.</span><span class="token function">floor</span><span class="token punctuation">(</span>Math<span class="token punctuation">.</span><span class="token function">random</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">*</span> blackAllPc<span class="token punctuation">.</span>length<span class="token punctuation">)</span>
      <span class="token keyword">let</span> val2 <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">,</span> maxVal <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">machine_evaluate</span><span class="token punctuation">(</span>displayChess_evaluate<span class="token punctuation">)</span><span class="token punctuation">,</span>
          maxVal2_sqSrc_w <span class="token operator">=</span> blackAllPc<span class="token punctuation">[</span>ramI_w<span class="token punctuation">]</span><span class="token punctuation">,</span> DstDom
      <span class="token comment">/*该循环可得到红方棋子下一步的起点选择哪个*/</span>
      <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">let</span> k <span class="token keyword">in</span> whiteAllPc<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">let</span> sqSrc_w <span class="token operator">=</span> whiteAllPc<span class="token punctuation">[</span>k<span class="token punctuation">]</span><span class="token comment">//某个红方棋子的起点一维坐标</span>
        <span class="token comment">// console.log(sqSrc2);</span>
        <span class="token comment">/*针对该红棋红方得到最有利于它的走法*/</span>

        DstDom <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">machine_getExactStep</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">sqToDom</span><span class="token punctuation">(</span>sqSrc_w<span class="token punctuation">)</span><span class="token punctuation">,</span>displayChess_evaluate<span class="token punctuation">)</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>DstDom <span class="token operator">===</span> <span class="token keyword">undefined</span><span class="token punctuation">)</span> <span class="token keyword">continue</span> <span class="token comment">//如果遍历到的某个红方棋子一种走法都没有，就跳过</span>
        <span class="token comment">// console.log(DstDom);</span>
        <span class="token comment">/*该红方棋子最佳走法的终点一维坐标*/</span>
        <span class="token keyword">let</span> sqDst_w <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">domToSq</span><span class="token punctuation">(</span>DstDom<span class="token punctuation">)</span>
        <span class="token comment">/*假设该红棋移动*/</span>
        <span class="token keyword">let</span> tempNum <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">machine_supposeToMove</span><span class="token punctuation">(</span>displayChess_evaluate<span class="token punctuation">,</span>sqSrc_w<span class="token punctuation">,</span>sqDst_w<span class="token punctuation">)</span>

        val2 <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">machine_evaluate</span><span class="token punctuation">(</span>displayChess_evaluate<span class="token punctuation">)</span><span class="token comment">//试求评估值2</span>
        <span class="token comment">/*恢复中转棋盘*/</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">machine_recoverFicBoard</span><span class="token punctuation">(</span>displayChess_evaluate<span class="token punctuation">,</span>sqSrc_w<span class="token punctuation">,</span>sqDst_w<span class="token punctuation">,</span>tempNum<span class="token punctuation">)</span>
        <span class="token comment">/*站在红方的角度，我肯定力求val2最大*/</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>val2 <span class="token operator">>=</span> maxVal<span class="token punctuation">)</span> <span class="token punctuation">{</span>
          maxVal <span class="token operator">=</span> val2 <span class="token comment">//更新最大评估值</span>
          maxVal2_sqSrc_w <span class="token operator">=</span> sqSrc_w<span class="token comment">//更新评估值最大时选择的棋子</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">else</span> <span class="token punctuation">{</span>
          <span class="token comment">// minMaxVal2_sqSrc = blackAllPc[i]</span>
          <span class="token comment">// console.log('error');</span>
        <span class="token punctuation">}</span>
        <span class="token comment">// break</span>
      <span class="token punctuation">}</span>
      <span class="token keyword">let</span> xDstDom <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">machine_getExactStep</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">sqToDom</span><span class="token punctuation">(</span>maxVal2_sqSrc_w<span class="token punctuation">)</span><span class="token punctuation">,</span><span class="token keyword">this</span><span class="token punctuation">.</span>displayChessTemp<span class="token punctuation">)</span>
      <span class="token keyword">if</span><span class="token punctuation">(</span>xDstDom <span class="token operator">===</span> <span class="token keyword">undefined</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">let</span> xArr <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">machine_getSteps</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">sqToDom</span><span class="token punctuation">(</span>maxVal2_sqSrc_w<span class="token punctuation">)</span><span class="token punctuation">,</span><span class="token keyword">this</span><span class="token punctuation">.</span>displayChessTemp<span class="token punctuation">)</span>
        xDstDom <span class="token operator">=</span> xArr<span class="token punctuation">[</span>Math<span class="token punctuation">.</span><span class="token function">floor</span><span class="token punctuation">(</span>Math<span class="token punctuation">.</span><span class="token function">random</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">*</span> xArr<span class="token punctuation">.</span>length<span class="token punctuation">)</span><span class="token punctuation">]</span>
      <span class="token punctuation">}</span>
      <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">sqToDom</span><span class="token punctuation">(</span>maxVal2_sqSrc_w<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">attr</span><span class="token punctuation">(</span><span class="token string">'id'</span><span class="token punctuation">)</span> <span class="token operator">===</span> <span class="token keyword">undefined</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        maxVal2_sqSrc_w <span class="token operator">=</span> whiteAllPc<span class="token punctuation">[</span>ramI_w<span class="token punctuation">]</span>
      <span class="token punctuation">}</span>
      <span class="token comment">// console.log('红方最好的起点:' + this.sqToDom(maxVal2_sqSrc_w).attr('id'));</span>
      <span class="token comment">// console.log('红方最好的终点:' + xDstDom.attr('id'));</span>
      <span class="token comment">// console.log('假设该红方棋子落子后的评估值：' + maxVal);</span>

      <span class="token comment">// console.log(displayChess_evaluate);</span>
      <span class="token keyword">let</span> sqDst_b<span class="token punctuation">,</span>sqSrc_b<span class="token comment">//黑方最终决定的起点、终点</span>
      <span class="token keyword">let</span> val1 <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">,</span>minVal <span class="token operator">=</span> maxVal
      <span class="token comment">// let minMaxVal2_sqSrc = blackAllPc[0]//使maxVal2最小时的棋子的起点一维坐标(黑方执棋)</span>
      <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token keyword">in</span> blackAllPc<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">//遍历所有黑棋</span>
        <span class="token comment">// console.log(i);</span>
        <span class="token comment">// if(i == 9) break //先遍历前10颗棋子</span>
        <span class="token keyword">let</span> sqSrc <span class="token operator">=</span> blackAllPc<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token comment">//某个黑方棋子的起点一维坐标</span>
        <span class="token comment">// console.log('一黑方棋子的起点:' + this.sqToDom(sqSrc).attr('id'));</span>
        <span class="token comment">// console.log('一黑方棋子的终点：');</span>
        <span class="token comment">/*走法数组，元素为对象类型*/</span>
        <span class="token keyword">let</span> stepArray <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">machine_getSteps</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">sqToDom</span><span class="token punctuation">(</span>sqSrc<span class="token punctuation">)</span><span class="token punctuation">,</span><span class="token keyword">this</span><span class="token punctuation">.</span>displayChessTemp<span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token parameter">e</span> <span class="token operator">=></span> <span class="token punctuation">{</span><span class="token keyword">return</span> e<span class="token punctuation">}</span><span class="token punctuation">)</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>stepArray<span class="token punctuation">.</span>length <span class="token operator">===</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token keyword">continue</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">let</span> j <span class="token keyword">in</span> stepArray<span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token comment">//遍历某黑棋的所有走法</span>
          <span class="token comment">/*该黑方棋子其中一个走法的终点，的一维坐标*/</span>
          <span class="token keyword">if</span><span class="token punctuation">(</span>stepArray<span class="token punctuation">[</span>j<span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">attr</span><span class="token punctuation">(</span><span class="token string">'alt'</span><span class="token punctuation">)</span> <span class="token operator">===</span> <span class="token keyword">undefined</span><span class="token punctuation">)</span> <span class="token keyword">continue</span> <span class="token comment">//谨防有疏漏..</span>
          <span class="token keyword">let</span> sqDst <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">domToSq</span><span class="token punctuation">(</span>stepArray<span class="token punctuation">[</span>j<span class="token punctuation">]</span><span class="token punctuation">)</span>

          <span class="token comment">// console.log(this.sqToDom(sqDst));</span>
          <span class="token comment">//</span>
          <span class="token comment">// console.log(displayChess_evaluate);</span>
          <span class="token comment">// console.log('可以到达一一一一');</span>
          <span class="token comment">/*黑棋的虚拟移动*/</span>
          <span class="token keyword">let</span> tempNum_b <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">machine_supposeToMove</span><span class="token punctuation">(</span>displayChess_evaluate<span class="token punctuation">,</span>sqSrc<span class="token punctuation">,</span>sqDst<span class="token punctuation">)</span>

          <span class="token comment">// console.log(displayChess_evaluate);</span>
          <span class="token comment">/*重新求一下之前确定的红方棋子的终点*/</span>
          <span class="token keyword">let</span> xxxDstDom <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">machine_getExactStep</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">sqToDom</span><span class="token punctuation">(</span>maxVal2_sqSrc_w<span class="token punctuation">)</span><span class="token punctuation">,</span>displayChess_evaluate<span class="token punctuation">)</span>
          <span class="token keyword">if</span><span class="token punctuation">(</span>xxxDstDom <span class="token operator">===</span> <span class="token keyword">undefined</span><span class="token punctuation">)</span> <span class="token keyword">continue</span><span class="token comment">//如果改走法没有了，跳过</span>
          <span class="token keyword">let</span> sqDst_w <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">domToSq</span><span class="token punctuation">(</span>xxxDstDom<span class="token punctuation">)</span>

          <span class="token comment">// console.log('重新求了红棋的终点：' + this.sqToDom(sqDst_w).attr('id'));</span>
          <span class="token comment">// console.log('可以到达二二二二');</span>
          <span class="token keyword">let</span> tempNum_w <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">machine_supposeToMove</span><span class="token punctuation">(</span>displayChess_evaluate<span class="token punctuation">,</span>maxVal2_sqSrc_w<span class="token punctuation">,</span>sqDst_w<span class="token punctuation">)</span>
          val1 <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">machine_evaluate</span><span class="token punctuation">(</span>displayChess_evaluate<span class="token punctuation">)</span><span class="token comment">//黑、红方都假设走完后，求评估值1</span>
          <span class="token comment">// console.log('假设黑棋落子后的评估值：' + val1);</span>

          <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">machine_recoverFicBoard</span><span class="token punctuation">(</span>displayChess_evaluate<span class="token punctuation">,</span>maxVal2_sqSrc_w<span class="token punctuation">,</span>sqDst_w<span class="token punctuation">,</span>tempNum_w<span class="token punctuation">)</span>
          <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">machine_recoverFicBoard</span><span class="token punctuation">(</span>displayChess_evaluate<span class="token punctuation">,</span>sqSrc<span class="token punctuation">,</span>sqDst<span class="token punctuation">,</span>tempNum_b<span class="token punctuation">)</span>
          <span class="token comment">/*站在黑方的角度，我肯定力求val1最小,maxVal2最小*/</span>
          <span class="token keyword">if</span><span class="token punctuation">(</span>val1 <span class="token operator">&lt;=</span> minVal<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            minVal <span class="token operator">=</span> val1
            sqDst_b <span class="token operator">=</span> sqDst
            sqSrc_b <span class="token operator">=</span> sqSrc
            <span class="token comment">// console.log('最小评估值' + minVal);</span>
          <span class="token punctuation">}</span>
          <span class="token comment">// else console.log('err');</span>

          <span class="token comment">// /*黑方走棋破坏的*/</span>
          <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">sqToDom</span><span class="token punctuation">(</span>sqSrc<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">attr</span><span class="token punctuation">(</span><span class="token string">'id'</span><span class="token punctuation">)</span> <span class="token operator">===</span> <span class="token string">'pos2'</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// console.log('------------');</span>
            <span class="token comment">// console.log(displayChess_evaluate);</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>

        <span class="token comment">// break</span>
      <span class="token punctuation">}</span>
      <span class="token comment">// console.log('黑棋最终的起点:');</span>
      <span class="token comment">// console.log(this.sqToDom(sqSrc_b));</span>
      <span class="token comment">// console.log('黑棋最终的终点:');</span>
      <span class="token comment">// console.log(this.sqToDom(sqDst_b));</span>
      <span class="token comment">// return randomSrcDom</span>

      <span class="token keyword">return</span> <span class="token punctuation">[</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">sqToDom</span><span class="token punctuation">(</span>sqSrc_b<span class="token punctuation">)</span><span class="token punctuation">,</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">sqToDom</span><span class="token punctuation">(</span>sqDst_b<span class="token punctuation">)</span><span class="token punctuation">]</span>
      <span class="token comment">/*以下为没有搜索算法，直接随机*/</span>
      <span class="token comment">// let randomIndex</span>
      <span class="token comment">// let randomSrcDom//起点,终点</span>
      <span class="token comment">// while(1) {</span>
      <span class="token comment">//   randomIndex = Math.floor(Math.random() * blackAllPc.length)//随机数在数组中的索引值</span>
      <span class="token comment">//   // let randomSq = blackAllPc[randomIndex]</span>
      <span class="token comment">//   randomSrcDom = this.sqToDom(blackAllPc[randomIndex])</span>
      <span class="token comment">//   if(this.machine_getSteps(randomSrcDom).length > 0)</span>
      <span class="token comment">//     //当选中的棋子至少有一种走法时，才退出循环，否则一直循环直到找到一棋子其走法有至少一种</span>
      <span class="token comment">//     break</span>
      <span class="token comment">// }</span>

    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token comment">/*根据输入的起点dom对象，返回使评估值最小的终点的dom对象*/</span>
    <span class="token function">machine_getExactStep</span><span class="token punctuation">(</span><span class="token parameter">srcDom<span class="token punctuation">,</span>arr</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// console.log(arr);</span>
      <span class="token keyword">let</span> allWays<span class="token punctuation">,</span> displayChess_evaluate
      <span class="token keyword">if</span><span class="token punctuation">(</span>arr <span class="token operator">!==</span> <span class="token keyword">undefined</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        allWays <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">machine_getSteps</span><span class="token punctuation">(</span>srcDom<span class="token punctuation">,</span>arr<span class="token punctuation">)</span>
        displayChess_evaluate <span class="token operator">=</span> arr<span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">item</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
          <span class="token comment">//用于评估分数的中转棋盘(不能直接对数组赋值，应对元素赋值)</span>
          <span class="token keyword">return</span> item
        <span class="token punctuation">}</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
      <span class="token comment">// else {</span>
      <span class="token comment">//   allWays = this.machine_getSteps(srcDom) //该棋子的所有走法,数组元素是dom对象</span>
      <span class="token comment">//   /*棋盘中转站*/</span>
      <span class="token comment">//   displayChess_evaluate = this.displayChessTemp.map((item) => {</span>
      <span class="token comment">//     //用于评估分数的中转棋盘(不能直接对数组赋值，应对元素赋值)</span>
      <span class="token comment">//     return item</span>
      <span class="token comment">//   })</span>
      <span class="token comment">// }</span>
      <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token operator">!</span><span class="token keyword">this</span><span class="token punctuation">.</span>playerSide<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// console.log('黑方执棋，此时求的是红棋的最佳终点');</span>
        <span class="token comment">//如果是黑方执棋</span>
        <span class="token keyword">let</span> maxVal <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">machine_evaluate</span><span class="token punctuation">(</span>arr<span class="token punctuation">)</span>
        <span class="token keyword">let</span> randomDstIndex <span class="token operator">=</span> Math<span class="token punctuation">.</span><span class="token function">floor</span><span class="token punctuation">(</span>Math<span class="token punctuation">.</span><span class="token function">random</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">*</span> allWays<span class="token punctuation">.</span>length<span class="token punctuation">)</span>
        <span class="token keyword">let</span> dstDom <span class="token operator">=</span> allWays<span class="token punctuation">[</span>randomDstIndex<span class="token punctuation">]</span><span class="token comment">//初始就赋一个随机值</span>
        <span class="token comment">// console.log(srcDom);</span>
        <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token keyword">in</span> allWays<span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token keyword">let</span> srcNum <span class="token operator">=</span> displayChess_evaluate<span class="token punctuation">[</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">domToSq</span><span class="token punctuation">(</span>srcDom<span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token comment">//起点棋子代表的Num值</span>
          <span class="token keyword">let</span> sqDst <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">domToSq</span><span class="token punctuation">(</span>allWays<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token comment">//终点棋子的一维坐标</span>
          <span class="token keyword">let</span> tempNum <span class="token operator">=</span> displayChess_evaluate<span class="token punctuation">[</span>sqDst<span class="token punctuation">]</span><span class="token comment">//保存一下落棋前终点处的棋子Num</span>
          <span class="token comment">/*假设终点落下该棋，即终点处的Num值改变*/</span>
          displayChess_evaluate<span class="token punctuation">[</span>sqDst<span class="token punctuation">]</span> <span class="token operator">=</span> srcNum
          <span class="token keyword">let</span> currentVal <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">machine_evaluate</span><span class="token punctuation">(</span>displayChess_evaluate<span class="token punctuation">)</span>
          <span class="token comment">// console.log('评估值：'+ currentVal);</span>
          <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">machine_evaluate</span><span class="token punctuation">(</span>displayChess_evaluate<span class="token punctuation">)</span> <span class="token operator">></span> maxVal<span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token comment">//如果评估值比原来大</span>
            maxVal <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">machine_evaluate</span><span class="token punctuation">(</span>displayChess_evaluate<span class="token punctuation">)</span><span class="token comment">//更新最大值</span>
            dstDom <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">sqToDom</span><span class="token punctuation">(</span>sqDst<span class="token punctuation">)</span><span class="token comment">//更新终点</span>
          <span class="token punctuation">}</span>
          <span class="token comment">// else console.log('此次循环没有大的');</span>
          displayChess_evaluate<span class="token punctuation">[</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">domToSq</span><span class="token punctuation">(</span>srcDom<span class="token punctuation">)</span><span class="token punctuation">]</span> <span class="token operator">=</span> srcNum<span class="token comment">//恢复中转棋盘</span>
          displayChess_evaluate<span class="token punctuation">[</span>sqDst<span class="token punctuation">]</span> <span class="token operator">=</span> tempNum<span class="token comment">//恢复中转棋盘</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> dstDom
      <span class="token punctuation">}</span>
      <span class="token keyword">else</span> <span class="token punctuation">{</span>
        <span class="token keyword">let</span> minVal <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">machine_evaluate</span><span class="token punctuation">(</span>arr<span class="token punctuation">)</span>
        <span class="token keyword">let</span> randomDstIndex <span class="token operator">=</span> Math<span class="token punctuation">.</span><span class="token function">floor</span><span class="token punctuation">(</span>Math<span class="token punctuation">.</span><span class="token function">random</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">*</span> allWays<span class="token punctuation">.</span>length<span class="token punctuation">)</span>
        <span class="token keyword">let</span> dstDom <span class="token operator">=</span> allWays<span class="token punctuation">[</span>randomDstIndex<span class="token punctuation">]</span><span class="token comment">//初始就赋一个随机值</span>
        <span class="token comment">// console.log(srcDom);</span>
        <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token keyword">in</span> allWays<span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token keyword">let</span> srcNum <span class="token operator">=</span> displayChess_evaluate<span class="token punctuation">[</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">domToSq</span><span class="token punctuation">(</span>srcDom<span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token comment">//起点棋子代表的Num值</span>
          <span class="token keyword">let</span> sqDst <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">domToSq</span><span class="token punctuation">(</span>allWays<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token comment">//终点棋子的一维坐标</span>
          <span class="token keyword">let</span> tempNum <span class="token operator">=</span> displayChess_evaluate<span class="token punctuation">[</span>sqDst<span class="token punctuation">]</span><span class="token comment">//保存一下落棋前终点处的棋子Num</span>
          <span class="token comment">/*假设终点落下该棋，即终点处的Num值改变*/</span>
          displayChess_evaluate<span class="token punctuation">[</span>sqDst<span class="token punctuation">]</span> <span class="token operator">=</span> srcNum
          <span class="token keyword">let</span> currentVal <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">machine_evaluate</span><span class="token punctuation">(</span>displayChess_evaluate<span class="token punctuation">)</span>
          <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">machine_evaluate</span><span class="token punctuation">(</span>displayChess_evaluate<span class="token punctuation">)</span> <span class="token operator">&lt;</span> minVal<span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token comment">//如果评估值比原来小</span>
            <span class="token comment">// console.log('------------');</span>
            minVal <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">machine_evaluate</span><span class="token punctuation">(</span>displayChess_evaluate<span class="token punctuation">)</span><span class="token comment">//更新最小值</span>
            dstDom <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">sqToDom</span><span class="token punctuation">(</span>sqDst<span class="token punctuation">)</span><span class="token comment">//更新终点</span>
          <span class="token punctuation">}</span>
          displayChess_evaluate<span class="token punctuation">[</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">domToSq</span><span class="token punctuation">(</span>srcDom<span class="token punctuation">)</span><span class="token punctuation">]</span> <span class="token operator">=</span> srcNum<span class="token comment">//恢复中转棋盘</span>
          displayChess_evaluate<span class="token punctuation">[</span>sqDst<span class="token punctuation">]</span> <span class="token operator">=</span> tempNum<span class="token comment">//恢复中转棋盘</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> dstDom
      <span class="token punctuation">}</span>
      <span class="token comment">// console.log(dstDom);</span>
      <span class="token comment">// console.log(allWays);</span>
      <span class="token comment">// console.log('当前评估值:' + this.machine_evaluate(this.displayChessTemp));</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token comment">/*根据输入的整个棋盘数组，返回红方分数-黑方分数的值，记作《评估值》*/</span>
    <span class="token function">machine_evaluate</span><span class="token punctuation">(</span><span class="token parameter">array</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">let</span> wVal <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">machine_getVal</span><span class="token punctuation">(</span>array<span class="token punctuation">,</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">,</span> bVal <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">machine_getVal</span><span class="token punctuation">(</span>array<span class="token punctuation">,</span><span class="token boolean">false</span><span class="token punctuation">)</span>
      <span class="token keyword">return</span> wVal <span class="token operator">-</span> bVal
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token comment">/*根据输入的整个棋盘数组以及红/黑方标识，返回红/黑方的价值*/</span>
    <span class="token function">machine_getVal</span><span class="token punctuation">(</span><span class="token parameter">array<span class="token punctuation">,</span>isWhite</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">let</span> val <span class="token operator">=</span> <span class="token number">0</span>
      <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token keyword">in</span> array<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>isWhite<span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token comment">//若是红方</span>
          <span class="token keyword">switch</span> <span class="token punctuation">(</span>array<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">case</span> <span class="token number">8</span><span class="token operator">:</span> val <span class="token operator">+=</span> <span class="token number">1000</span><span class="token punctuation">;</span><span class="token keyword">break</span>
            <span class="token keyword">case</span> <span class="token number">9</span><span class="token operator">:</span> val <span class="token operator">+=</span> <span class="token number">20</span><span class="token punctuation">;</span><span class="token keyword">break</span>
            <span class="token keyword">case</span> <span class="token number">10</span><span class="token operator">:</span> val <span class="token operator">+=</span> <span class="token number">20</span><span class="token punctuation">;</span><span class="token keyword">break</span>
            <span class="token keyword">case</span> <span class="token number">11</span><span class="token operator">:</span> val <span class="token operator">+=</span> <span class="token number">45</span><span class="token punctuation">;</span><span class="token keyword">break</span>
            <span class="token keyword">case</span> <span class="token number">12</span><span class="token operator">:</span> val <span class="token operator">+=</span> <span class="token number">90</span><span class="token punctuation">;</span><span class="token keyword">break</span>
            <span class="token keyword">case</span> <span class="token number">13</span><span class="token operator">:</span> val <span class="token operator">+=</span> <span class="token number">40</span><span class="token punctuation">;</span><span class="token keyword">break</span>
            <span class="token keyword">case</span> <span class="token number">14</span><span class="token operator">:</span> val <span class="token operator">+=</span> <span class="token number">10</span><span class="token punctuation">;</span><span class="token keyword">break</span>
            <span class="token keyword">default</span><span class="token operator">:</span> val <span class="token operator">+=</span> <span class="token number">0</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">else</span> <span class="token punctuation">{</span>
          <span class="token keyword">switch</span> <span class="token punctuation">(</span>array<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">case</span> <span class="token number">16</span><span class="token operator">:</span> val <span class="token operator">+=</span> <span class="token number">1000</span><span class="token punctuation">;</span><span class="token keyword">break</span>
            <span class="token keyword">case</span> <span class="token number">17</span><span class="token operator">:</span> val <span class="token operator">+=</span> <span class="token number">20</span><span class="token punctuation">;</span><span class="token keyword">break</span>
            <span class="token keyword">case</span> <span class="token number">18</span><span class="token operator">:</span> val <span class="token operator">+=</span> <span class="token number">20</span><span class="token punctuation">;</span><span class="token keyword">break</span>
            <span class="token keyword">case</span> <span class="token number">19</span><span class="token operator">:</span> val <span class="token operator">+=</span> <span class="token number">45</span><span class="token punctuation">;</span><span class="token keyword">break</span>
            <span class="token keyword">case</span> <span class="token number">20</span><span class="token operator">:</span> val <span class="token operator">+=</span> <span class="token number">90</span><span class="token punctuation">;</span><span class="token keyword">break</span>
            <span class="token keyword">case</span> <span class="token number">21</span><span class="token operator">:</span> val <span class="token operator">+=</span> <span class="token number">40</span><span class="token punctuation">;</span><span class="token keyword">break</span>
            <span class="token keyword">case</span> <span class="token number">22</span><span class="token operator">:</span> val <span class="token operator">+=</span> <span class="token number">10</span><span class="token punctuation">;</span><span class="token keyword">break</span>
            <span class="token keyword">default</span><span class="token operator">:</span> val <span class="token operator">+=</span> <span class="token number">0</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
      <span class="token keyword">return</span> val
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token comment">/*根据输入的中转棋盘数组、起点、终点，完成在该数组上的虚拟移动，返回中转值*/</span>
    <span class="token function">machine_supposeToMove</span><span class="token punctuation">(</span><span class="token parameter">arr<span class="token punctuation">,</span>sqSrc<span class="token punctuation">,</span>sqDst</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span><span class="token punctuation">(</span>arr <span class="token operator">===</span> <span class="token keyword">undefined</span> <span class="token operator">||</span> sqSrc <span class="token operator">===</span> <span class="token keyword">undefined</span> <span class="token operator">||</span> sqDst <span class="token operator">===</span> <span class="token keyword">undefined</span><span class="token punctuation">)</span>
        <span class="token keyword">return</span> <span class="token string">'ERROR'</span>
      <span class="token keyword">let</span> temp <span class="token operator">=</span> arr<span class="token punctuation">[</span>sqDst<span class="token punctuation">]</span>
      arr<span class="token punctuation">[</span>sqDst<span class="token punctuation">]</span> <span class="token operator">=</span> arr<span class="token punctuation">[</span>sqSrc<span class="token punctuation">]</span>
      arr<span class="token punctuation">[</span>sqSrc<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token number">1</span>
      <span class="token keyword">return</span> temp
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token comment">/*根据输入的中转棋盘数组、棋子的起点和终点、中转值，完成中转棋盘的恢复*/</span>
    <span class="token function">machine_recoverFicBoard</span><span class="token punctuation">(</span><span class="token parameter">arr<span class="token punctuation">,</span>sqSrc<span class="token punctuation">,</span>sqDst<span class="token punctuation">,</span>temp</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span><span class="token punctuation">(</span>arr <span class="token operator">===</span> <span class="token keyword">undefined</span> <span class="token operator">||</span> sqSrc <span class="token operator">===</span> <span class="token keyword">undefined</span> <span class="token operator">||</span> sqDst <span class="token operator">===</span> <span class="token keyword">undefined</span> <span class="token operator">||</span> temp <span class="token operator">===</span> <span class="token keyword">undefined</span><span class="token punctuation">)</span>
        <span class="token keyword">return</span> <span class="token string">'ERROR'</span>

      arr<span class="token punctuation">[</span>sqSrc<span class="token punctuation">]</span> <span class="token operator">=</span> arr<span class="token punctuation">[</span>sqDst<span class="token punctuation">]</span>
      arr<span class="token punctuation">[</span>sqDst<span class="token punctuation">]</span> <span class="token operator">=</span> temp
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token comment">/*该函数会使局面重新绘制，返回1,2,3,0
    * 1：表示触发了兵线刷新
    * 2：替父从军
    * 3：草木皆兵*/</span>
    <span class="token function">machine_passiveSkills</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">/*兵线刷新*/</span>
      <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span>reject</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>difficulty <span class="token operator">===</span> <span class="token string">'d3'</span><span class="token punctuation">)</span> <span class="token keyword">this</span><span class="token punctuation">.</span>rounds <span class="token operator">++</span>

        <span class="token comment">/*兵线刷新*/</span>
        <span class="token keyword">let</span> advisorSum <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">,</span> isEaten <span class="token operator">=</span> <span class="token boolean">false</span>
        <span class="token keyword">let</span> currentVal <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">machine_evaluate</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>displayChessTemp<span class="token punctuation">)</span><span class="token punctuation">,</span> isSkill3 <span class="token operator">=</span> <span class="token boolean">false</span>
        <span class="token comment">// console.log(this.machine_getVal(this.displayChessTemp, false));</span>
        <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token keyword">in</span> <span class="token keyword">this</span><span class="token punctuation">.</span>displayChessTemp<span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>displayChessTemp<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">===</span> <span class="token number">22</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            advisorSum <span class="token operator">++</span>
            <span class="token keyword">continue</span>
          <span class="token punctuation">}</span>
          <span class="token comment">/*替父从军*/</span>
          <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>displayChessTemp<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">&amp;</span> <span class="token number">8</span> <span class="token operator">&amp;&amp;</span> <span class="token keyword">this</span><span class="token punctuation">.</span>displayChess_Old<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">&amp;</span> <span class="token number">16</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">//若某处上一步为黑方棋子，下一步为红方棋子，说明黑方棋子被吃掉</span>
            <span class="token keyword">if</span><span class="token punctuation">(</span>Math<span class="token punctuation">.</span><span class="token function">floor</span><span class="token punctuation">(</span>Math<span class="token punctuation">.</span><span class="token function">random</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token keyword">this</span><span class="token punctuation">.</span>probability<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">//附加条件：大概30%几率触发替父从军</span>
              isEaten <span class="token operator">=</span> <span class="token boolean">true</span>
              <span class="token keyword">this</span><span class="token punctuation">.</span>displayChessTemp<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>displayChess_Old<span class="token punctuation">[</span>i<span class="token punctuation">]</span>
            <span class="token punctuation">}</span>
          <span class="token punctuation">}</span>
          <span class="token comment">/*草木皆兵180*/</span>
          <span class="token keyword">if</span><span class="token punctuation">(</span>currentVal <span class="token operator">></span> <span class="token number">180</span>
              <span class="token operator">||</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">machine_getVal</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>displayChessTemp<span class="token punctuation">,</span><span class="token boolean">false</span><span class="token punctuation">)</span> <span class="token operator">&lt;</span> <span class="token number">1220</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">//黑方总价值＜1220，大约损失了两车一炮</span>
            isSkill3 <span class="token operator">=</span> <span class="token boolean">true</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>advisorSum <span class="token operator">&lt;</span> <span class="token number">3</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">,</span>j <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>i <span class="token operator">&lt;</span><span class="token number">5</span><span class="token punctuation">;</span>i<span class="token operator">++</span><span class="token punctuation">,</span>j<span class="token operator">+=</span><span class="token number">2</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">let</span> domSq <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">domToSq</span><span class="token punctuation">(</span><span class="token function">$</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">#pos</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span><span class="token number">27</span> <span class="token operator">+</span> j<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span><span class="token punctuation">)</span><span class="token punctuation">)</span>
            <span class="token comment">// console.log($(`#pos${27 + j}`));</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>displayChessTemp<span class="token punctuation">[</span>domSq<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token number">22</span>
          <span class="token punctuation">}</span>
          document<span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token string">'#skill1'</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">play</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
          <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">drawWithSq</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
            <span class="token comment">// let chessInfo = null</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">chess1Click</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">)</span>
            <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
          <span class="token punctuation">}</span><span class="token punctuation">,</span><span class="token number">3000</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
        <span class="token comment">/*替父从军*/</span>
        <span class="token keyword">else</span> <span class="token keyword">if</span><span class="token punctuation">(</span>isEaten<span class="token punctuation">)</span> <span class="token punctuation">{</span>
          document<span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token string">'#skill2'</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">play</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
          <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">drawWithSq</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
            <span class="token comment">// let chessInfo = null</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">chess1Click</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">)</span>
            <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span>
          <span class="token punctuation">}</span><span class="token punctuation">,</span><span class="token number">2500</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
        <span class="token comment">/*草木皆兵*/</span>
        <span class="token keyword">else</span> <span class="token keyword">if</span><span class="token punctuation">(</span>isSkill3 <span class="token operator">||</span> <span class="token keyword">this</span><span class="token punctuation">.</span>rounds <span class="token operator">>=</span> <span class="token number">5</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token keyword">this</span><span class="token punctuation">.</span>flag <span class="token operator">=</span> <span class="token operator">!</span><span class="token keyword">this</span><span class="token punctuation">.</span>flag
          <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token keyword">in</span> <span class="token keyword">this</span><span class="token punctuation">.</span>displayChessTemp<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>displayChessTemp<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">===</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
              <span class="token keyword">this</span><span class="token punctuation">.</span>displayChessTemp<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token number">22</span>
            <span class="token punctuation">}</span>
          <span class="token punctuation">}</span>
          document<span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token string">'#skill3'</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">play</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
          <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">drawWithSq</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
            <span class="token comment">// let chessInfo = null</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">chess1Click</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">)</span>
            <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span>
          <span class="token punctuation">}</span><span class="token punctuation">,</span><span class="token number">3000</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">else</span> <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span>

      <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


