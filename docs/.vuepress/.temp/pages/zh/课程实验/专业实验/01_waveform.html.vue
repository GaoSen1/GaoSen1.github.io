<template><div><h2 id="题目" tabindex="-1"><a class="header-anchor" href="#题目" aria-hidden="true">#</a> 题目</h2>
<p><img src="@source/zh/课程实验/专业实验/assets/img_1.png" alt="img_1.png" loading="lazy"></p>
<h2 id="概述" tabindex="-1"><a class="header-anchor" href="#概述" aria-hidden="true">#</a> 概述</h2>
<ol>
<li>任务需要实现逻辑运算（与、或、非、异或、同或等），并将运算结果以图表形式呈现。需要的知识点：逻辑运算基础知识、vue框架的使用、echarts插件的使用等。</li>
<li>己完成题目所有需求：输入通道A、B，输出通道F0~F4的波形绘制；要求的5种逻辑运算。其中波形绘制模块规模较大，使用了echarts插件；逻辑运算模块耗时较多，主要花在调试。</li>
<li>创新点：设计方案和演示效果集成在个人博客中，界面优雅简洁；波形图和用户有一定的交互，如鼠标移入可查看当前点的坐标、多通道选择显示与否、图表横坐标量程自适应、可下载当前显示的波形图、可切换波形图/柱状图、可显示数据视图</li>
</ol>
<h2 id="总体设计" tabindex="-1"><a class="header-anchor" href="#总体设计" aria-hidden="true">#</a> 总体设计</h2>
<ol>
<li>数据结构设计。采用的全局变量：用户的输入A、B，输出与函数F0、或函数F1、非函数F2、异或函数F3、同或函数F4；其中A、B为字符串类型，期间会转成数组类型；F0<sub>F1为数组类型；A、B用于保存用户的输入，F0</sub>F1用于保存逻辑运算结果</li>
</ol>
<h2 id="思路" tabindex="-1"><a class="header-anchor" href="#思路" aria-hidden="true">#</a> 思路</h2>
<ul>
<li>
<p>选定平台：浏览器，或者说node.js搭建的本地服务器</p>
</li>
<li>
<p>设计语言：html5、css3、javascript，以及vue框架</p>
</li>
<li>
<p>显然需要两个输入框来接收用户的输入，将接收到的两个字符串按位做逻辑运算，将每次运算的结果存入一个数组（使用数组类型是因为方便绘图）</p>
</li>
<li>
<p>算法其实没什么门槛，各种编程语言应该都有基本的逻辑运算符，直接使用就好。但是要注意js中的位操作符的使用，如 ~5 = -6</p>
</li>
<li>
<p>关键的是<strong>如何绘图</strong>。这里我使用绘图插件<a href="https://echarts.apache.org/zh/index.html" target="_blank" rel="noopener noreferrer">echarts<ExternalLinkIcon/></a>.非常感谢Apache ECharts的开发人员，给我们提供了一个非常丰富、渲染强劲、可视化优雅的基于 JavaScript 的开源可视化图表库。</p>
</li>
</ul>
<div class="custom-container tip">
<p class="custom-container-title">提示</p>
<p>二进制原码：0000 0000 0000 0000 0000 0000 0000 0101
取反操作后：1111 1111 1111 1111 1111 1111 1111 1010
有符号整数都是用补码来表示，而补码=反码+1
1.先求反码：1000 0000 0000 0000 0000 0000 0000 0101
2.再求补码：1000 0000 0000 0000 0000 0000 0000 0110
最高位代表符号位 1 表示负数，0 表示正数
~5 = -6</p>
</div>
</div></template>


