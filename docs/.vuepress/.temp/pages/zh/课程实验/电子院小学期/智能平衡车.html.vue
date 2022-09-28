<template><div><p>[TOC]</p>
<h2 id="焊接" tabindex="-1"><a class="header-anchor" href="#焊接" aria-hidden="true">#</a> 焊接</h2>
<h3 id="电烙铁" tabindex="-1"><a class="header-anchor" href="#电烙铁" aria-hidden="true">#</a> 电烙铁</h3>
<p>电烙铁是手工焊接的主要工具，在焊接过程中合理选择正确使用适当的电烙铁，是确保焊接质量的基础.</p>
<p>按照加热的方式分类，电烙铁有直热式、感应式、气体燃烧式等.手工焊接常用的电烙铁为直热式.</p>
<p>根据加热体的位置的不同，直热式电烙铁又分为内热式、外热式和恒温式三大类.</p>
<p>加热体位于烙铁头外面的称为外热式，位于烙铁头内部的称为内热式.恒温式电烙铁通过内部温度传感器和开关进行恒温控制，实现恒温焊接.</p>
<p>内热式电烙铁升温快，热效率高，体积小、重量轻、使用方便，适用于小型电子产品的手工焊接，也适宜初学者使用.</p>
<h3 id="焊接的手法与技巧" tabindex="-1"><a class="header-anchor" href="#焊接的手法与技巧" aria-hidden="true">#</a> 焊接的手法与技巧</h3>
<p>手工焊接时电烙铁要拿稳对准，不能烫伤、损坏被焊件，因此要合理地选择电烙铁的拿法.</p>
<ul>
<li>
<p><strong>反握法</strong></p>
<p>焊接时动作稳定，长时间操作不易疲劳，适用于大功率烙铁焊接热容量大的被焊件.</p>
</li>
<li>
<p><strong>正握法</strong></p>
<p>适用于中等功率的电烙铁.</p>
</li>
<li>
<p><strong>握笔法</strong>
比较方便灵活，便于初学者掌握，但长时间操作容易疲劳，烙铁也较容易出现抖动现象，适用于小功率电烙铁焊接小规模印制电路板，或电子产品的维修.</p>
</li>
</ul>
<ol>
<li>焊接时，左手拿焊锡丝，右手持电烙铁，电烙铁已经通电加热，可随时施焊，并且要求烙铁头洁净无焊渣.</li>
<li>将烙铁头放在被焊接的两焊件连接处，是两个焊件都与烙铁头相接触，持续1~2秒钟.</li>
<li>焊锡丝从烙铁对面接触焊件，焊锡丝融化浸润两焊接面.</li>
<li>焊接面布满也太焊锡后，立即向左上45°方向移开焊锡丝.</li>
<li>焊锡丝移开后，迅速将烙铁头贴刮着被焊件（元件引脚或导线）离开焊点.</li>
</ol>
<blockquote>
<p><strong>注意</strong></p>
<p>焊锡的量要适中：</p>
<ul>
<li>过量焊锡不但造成浪费，还增加了焊接时间，降低了工作速度，还容易造成焊点与焊点之间的短路.</li>
<li>焊锡过少则焊件之间不能形成牢固结合，影响焊点的质量.</li>
</ul>
</blockquote>
<h2 id="认识stm32cubemx" tabindex="-1"><a class="header-anchor" href="#认识stm32cubemx" aria-hidden="true">#</a> 认识STM32CubeMX</h2>
<h3 id="软件介绍" tabindex="-1"><a class="header-anchor" href="#软件介绍" aria-hidden="true">#</a> 软件介绍</h3>
<p>STM32CubeMX 是 ST 意法半导体近几年来大力推荐的STM32 芯片图形化配置工具，目的就是为了方便开发者， 允许用户使用图形化向导生成C 初始化代码，可以大大减轻开发工作，时间和费用，提高开发效率.STM32CubeMX几乎覆盖了STM32 全系列芯片.在CubeMX上，通过傻瓜化的操作便能实现相关配置，最终能够生成C语言代码，支持多种工具链，比如MDK、IAR For ARM、TrueStudio等 省去了我们配置各种外设的时间，大大的节省了时间.</p>
<h3 id="hal库" tabindex="-1"><a class="header-anchor" href="#hal库" aria-hidden="true">#</a> HAL库</h3>
<p>STM32 HAL固件库是Hardware Abstraction Layer的缩写，中文名称是：硬件抽象层.HAL库是ST公司为STM32的MCU最新推出的抽象层嵌入式软件，为更方便的实现跨STM32产品的最大可移植性.HAL库可以在CubeMX中在线安装：打开安装好的 STM32CubeMX 软件 点上面的<code>Help -&gt; Manage embedded software packages </code></p>
<img src="@source/zh/课程实验/电子院小学期/智能平衡车.assets/image-20220904105335642.png" alt="image-20220904105335642" style="zoom:50%;" />
<p>会跳出来一个选择型号界面  勾选上你要安装的HAL库， 点击<code>Install</code> 直到安装成功.</p>
<img src="@source/zh/课程实验/电子院小学期/智能平衡车.assets/image-20220904105505660.png" alt="image-20220904105505660" style="zoom:50%;" />
<h3 id="一些工程配置" tabindex="-1"><a class="header-anchor" href="#一些工程配置" aria-hidden="true">#</a> 一些工程配置</h3>
<ul>
<li>
<p><strong>配置程序烧写：</strong></p>
<img src="@source/zh/课程实验/电子院小学期/智能平衡车.assets/image-20220904110003147.png" alt="image-20220904110003147" style="zoom:50%;" />
<p>选择SW协议.</p>
</li>
<li>
<p><strong>配置时钟：</strong></p>
<img src="@source/zh/课程实验/电子院小学期/智能平衡车.assets/image-20220904110112661.png" alt="image-20220904110112661" style="zoom:50%;" />
<p>选择时钟源是内部晶振.</p>
</li>
<li>
<p><strong>配置中断：</strong></p>
<img src="@source/zh/课程实验/电子院小学期/智能平衡车.assets/image-20220904110323831.png" alt="image-20220904110323831" style="zoom:50%;" />
<p>使能中断.</p>
<blockquote>
<p><strong>备注</strong></p>
<p>在之后生成的初始项目文件中，找到<code>stm32f1xx_it.c</code>，在其中可找到类似<code>EXTI_IRQHandler(void)</code>函数中的回调函数<code>HAL_GPIO_EXTI_IRQHandler(BTN_0_Pin);</code></p>
<p>转到定义，可找到<code>__weak void HAL_GPIO_EXTI_Callback(uint16_t GPIO_Pin)</code></p>
<p>拷贝到自己的.c文件中,写成<code>void HAL_GPIO_EXTI_Callback(uint16_t GPIO_Pin)</code>，这样就会优先使用自己的函数了.</p>
</blockquote>
</li>
<li>
<p><strong>配置定时器：</strong></p>
</li>
</ul>
<p>配置适合自己使用的定时器需要经过一定的计算.</p>
<img src="@source/zh/课程实验/电子院小学期/智能平衡车.assets/image-20220904111304062.png" alt="image-20220904111304062" style="zoom:50%;" />
<p>设置时钟源为内部时钟，，内部时钟是APB1或APB2（具体看手册）.</p>
<img src="@source/zh/课程实验/电子院小学期/智能平衡车.assets/image-20220904111322401.png" alt="image-20220904111322401" style="zoom:50%;" />
<p>在parameter Setttings设置分频系数（PSC），counter为计数值.</p>
<p>然后设置定时器的中断NVIC，有四种中断模式，这里选择update（即记到上限值）.</p>
<p>可以在NVIC中适当降低它的优先级.</p>
<img src="@source/zh/课程实验/电子院小学期/智能平衡车.assets/image-20220904111922418.png" alt="image-20220904111922418" style="zoom:50%;" />
<h2 id="pid算法" tabindex="-1"><a class="header-anchor" href="#pid算法" aria-hidden="true">#</a> PID算法</h2>
<h3 id="什么是pid" tabindex="-1"><a class="header-anchor" href="#什么是pid" aria-hidden="true">#</a> 什么是PID</h3>
<p>PID，即<strong>P</strong>roportion <strong>I</strong>ntegration <strong>D</strong>ifferentiation，实际上是一个公式，由<strong>比例项（Proportion ）</strong>，<strong>积分项（Integration ）</strong>，<strong>微分项（Differentiation）</strong> 三个部分组成，具体形式为：</p>
<p class='katex-block'><span class="katex-display"><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML" display="block"><semantics><mrow><mi>U</mi><mo stretchy="false">(</mo><mi>t</mi><mo stretchy="false">)</mo><mo>=</mo><msub><mi>k</mi><mi>p</mi></msub><mo stretchy="false">{</mo><mi>e</mi><mi>r</mi><mi>r</mi><mo stretchy="false">(</mo><mi>t</mi><mo stretchy="false">)</mo><mo>+</mo><mfrac><mn>1</mn><msub><mi>T</mi><mi>I</mi></msub></mfrac><mo>∫</mo><mrow><mi>e</mi><mi>r</mi><mi>r</mi><mo stretchy="false">(</mo><mi>t</mi><mo stretchy="false">)</mo><mi>d</mi><mi>t</mi></mrow><mo>+</mo><mfrac><mrow><msub><mi>T</mi><mi>D</mi></msub><mo separator="true">⋅</mo><mi>d</mi><mi>e</mi><mi>r</mi><mi>r</mi><mo stretchy="false">(</mo><mi>t</mi><mo stretchy="false">)</mo></mrow><mrow><mi>d</mi><mi>t</mi></mrow></mfrac><mo stretchy="false">}</mo></mrow><annotation encoding="application/x-tex">
U(t)=k_p\{err(t)+\frac{1}{T_I} \int{err(t)dt} + \frac {T_D·derr(t)}{dt}\}
</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.10903em;">U</span><span class="mopen">(</span><span class="mord mathnormal">t</span><span class="mclose">)</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="base"><span class="strut" style="height:1.0361em;vertical-align:-0.2861em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.03148em;">k</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.1514em;"><span style="top:-2.55em;margin-left:-0.0315em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight">p</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.2861em;"><span></span></span></span></span></span></span><span class="mopen">{</span><span class="mord mathnormal" style="margin-right:0.02778em;">err</span><span class="mopen">(</span><span class="mord mathnormal">t</span><span class="mclose">)</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">+</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:2.2222em;vertical-align:-0.8622em;"></span><span class="mord"><span class="mopen nulldelimiter"></span><span class="mfrac"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:1.3214em;"><span style="top:-2.314em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord"><span class="mord mathnormal" style="margin-right:0.13889em;">T</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3283em;"><span style="top:-2.55em;margin-left:-0.1389em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight" style="margin-right:0.07847em;">I</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span></span></span><span style="top:-3.23em;"><span class="pstrut" style="height:3em;"></span><span class="frac-line" style="border-bottom-width:0.04em;"></span></span><span style="top:-3.677em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord">1</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.836em;"><span></span></span></span></span></span><span class="mclose nulldelimiter"></span></span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mop op-symbol large-op" style="margin-right:0.44445em;position:relative;top:-0.0011em;">∫</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.02778em;">err</span><span class="mopen">(</span><span class="mord mathnormal">t</span><span class="mclose">)</span><span class="mord mathnormal">d</span><span class="mord mathnormal">t</span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">+</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:2.113em;vertical-align:-0.686em;"></span><span class="mord"><span class="mopen nulldelimiter"></span><span class="mfrac"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:1.427em;"><span style="top:-2.314em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord mathnormal">d</span><span class="mord mathnormal">t</span></span></span><span style="top:-3.23em;"><span class="pstrut" style="height:3em;"></span><span class="frac-line" style="border-bottom-width:0.04em;"></span></span><span style="top:-3.677em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord"><span class="mord mathnormal" style="margin-right:0.13889em;">T</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3283em;"><span style="top:-2.55em;margin-left:-0.1389em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight" style="margin-right:0.02778em;">D</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mpunct">⋅</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord mathnormal">d</span><span class="mord mathnormal" style="margin-right:0.02778em;">err</span><span class="mopen">(</span><span class="mord mathnormal">t</span><span class="mclose">)</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.686em;"><span></span></span></span></span></span><span class="mclose nulldelimiter"></span></span><span class="mclose">}</span></span></span></span></span></p>
<p>其中 <strong>err(t)</strong> 是当前值和目标值的误差，PID的公式就是<strong>对这个误差分别进行比例、积分、微分处理后叠加输出</strong>.</p>
<h3 id="pid参数调节的方法" tabindex="-1"><a class="header-anchor" href="#pid参数调节的方法" aria-hidden="true">#</a> PID参数调节的方法</h3>
<p>我们在使用PID的时候，单独只使用一个参数是没有意义的至少使用两个参数，并且P（比例项）是必须要有的，虽然PID有三个参数，但大多数情况下PID三个参数并不是都使用上的，一般会其中两个来组合使用，比如PI组合用于追求稳定的系统，PD组合用于追求快速响应的系统，当然PID用于即追求稳定又追求快速响应的系统，但是实际上PID参数越多越难调，而且许多情况下两个参数的效果已经足够了.</p>
<h4 id="pi系统调节" tabindex="-1"><a class="header-anchor" href="#pi系统调节" aria-hidden="true">#</a> PI系统调节</h4>
<p>在调节PI系统时，P的选取一般有两种情况</p>
<ul>
<li>
<p>P偏小一点，稳定时，实际值在目标值之下，一直存在误差，这时再从0开始，一直加大I，消除稳定时的误差，这种情况下的最终稳定曲线会一直保持在目标曲线之下，达到比较稳定的调节效果，不会有过冲（<strong>无过冲，稳定！</strong>）</p>
</li>
<li>
<p>P大一点，在第一次到达目标值的时候有一定的过冲，但之后就会稳定，其与第一种相比反应速度更快！（<strong>有过冲，但他快！</strong>）</p>
</li>
</ul>
<h4 id="pd系统调节" tabindex="-1"><a class="header-anchor" href="#pd系统调节" aria-hidden="true">#</a> PD系统调节</h4>
<p>由一开始的概念我们可以知道，与 I 的不同点在于，<strong>I是计算累计误差，而D则是计算未来趋势</strong>，因此PD系统的反应速度更快，相对于PI系统会更快的到达目标位置附近，<strong>其调节方式首先还是调节P</strong>.</p>
<h4 id="pid系统调节" tabindex="-1"><a class="header-anchor" href="#pid系统调节" aria-hidden="true">#</a> PID系统调节</h4>
<p>首先我们先按照PI系统进行调节，先调P在调I，让系统有一定的过冲后达到稳定，然后<strong>开始调节D</strong>，慢慢增加D，将过冲补偿掉，直到系统稳定.</p>
<h2 id="本人在实习项目中的具体工作" tabindex="-1"><a class="header-anchor" href="#本人在实习项目中的具体工作" aria-hidden="true">#</a> 本人在实习项目中的具体工作</h2>
<p>由于我的队友在焊接完LED点阵后的第一天就被隔离，小车的组装、调试、外观设计由我个人完成.</p>
<h2 id="车模控制" tabindex="-1"><a class="header-anchor" href="#车模控制" aria-hidden="true">#</a> 车模控制</h2>
<h3 id="验收要求" tabindex="-1"><a class="header-anchor" href="#验收要求" aria-hidden="true">#</a> 验收要求</h3>
<p>在查看学生的调试结果后，老师确定了验收要求：小车在障碍物50cm处保持动态平衡.</p>
<h3 id="设计思路" tabindex="-1"><a class="header-anchor" href="#设计思路" aria-hidden="true">#</a> 设计思路</h3>
<p>车模作为一个控制对象，它的控制输入量是两个电机的转动速度. 车模运动控制任务可以分解成以下三个基本控制任务：</p>
<ol>
<li>控制车模平衡：通过控制两个电机正反向运动动保持车模直立平衡状态.</li>
<li>控制车模速度：通过调节车模的倾角来实现车模速度控制，实际上最后还是演变成通过控制电机的转速来实现车轮速度的控制.</li>
<li>控制车模方向：通过控制两个电机之间的转动差速实现车模转向控制.</li>
</ol>
<p>三个分解后的任务各自独立进行控制.由于最终都是对同一个控制对象（车模的电机）进行控制，所以它们之间存在着耦合.</p>
<p>这三个任务中保持车模平衡是关键.由于车模同时受 到三种控制的影响，从车模平衡控制的角度来看，其它两个控制就成为它的干扰.因此 对车模速度、方向的控制应该尽量保持平滑，以减少对于平衡控制的干扰.</p>
<p>根据验收要求，需要完成的任务有：</p>
<ul>
<li>保持平衡</li>
<li>避障</li>
<li>控制小车运动轨迹基本为直线</li>
</ul>
<p>其中平衡的衡量可以用角度来表征.根据上文所述，可定义两个函数，分别控制角度（<code>AngleControl</code>）、速度（<code>SpeedControl</code>）.</p>
<p>第一项任务需要调节角度和速度，定义四个变量：<code>CarAngle_P,CarAngle_D,CarSpeed_P,CarSpeed_I</code>.可以看到，该思路的角度控制是PD系统，速度控制是PI系统.再定义角度控制环的输出变量、速度控制环的输出变量和方向控制环的输出变量，最后在电机输出函数中根据这三个变量的线性运算直接影响电机的转速.</p>
<p>第二项任务需要配合超声波测距模块，根据测到的距离对速度控制环产生影响，或直接影响电机输出函数.如&lt;50cm时，对后退控制量赋值，&gt;60cm时，对前进控制量赋值，然后在稍后执行的速度控制函数里加入这两种变量的影响.</p>
<p>第三项任务需要引入方向控制环（<code>DirectionControl</code>）和旋转PID.考虑到<strong>I是累计误差，D是计算未来趋势</strong>，本思路采用PI系统控制方向.定义两个变量<code>CarAngleZ_P,CarAngleZ_I</code>，再定义方向控制环的输出变量，在稍后执行的电机输出函数中加入该变量的影响.</p>
<blockquote>
<p><strong>备注</strong></p>
<p>这里的AngleZ指的是从Z轴看（俯视）小车，小车的旋转角度，若该旋转角度是零，即小车一直朝同一方向.</p>
</blockquote>
<h3 id="详细实现过程" tabindex="-1"><a class="header-anchor" href="#详细实现过程" aria-hidden="true">#</a> 详细实现过程</h3>
<p>下发的程序已基本能使小车平衡，经过微调，最后角度的PD参数分别为350，5；速度的PI参数为10,0.1.调试的过程一般是先调角度的P，再调D，再调速度的P，再调I，保证每次调整只改变一个量，然后下载程序到小车主板上，启动小车查看效果.</p>
<p>为实现避障功能，超声波模块相应的关键程序如下：</p>
<div class="language-c ext-c line-numbers-mode"><pre v-pre class="language-c"><code><span class="token keyword">if</span> <span class="token punctuation">(</span>g_Moto_Ctrl<span class="token punctuation">.</span>UltrasonicWaveDistance <span class="token operator">&lt;</span> <span class="token number">595</span><span class="token punctuation">)</span><span class="token comment">//595mm,UltrasonicWaveDistance指距障碍物的距离</span>
	<span class="token punctuation">{</span>
		g_Moto_Ctrl<span class="token punctuation">.</span>DistanceSet <span class="token operator">=</span> <span class="token operator">-</span><span class="token number">50</span><span class="token punctuation">;</span><span class="token comment">//负值将使小车减速、后退</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>g_Moto_Ctrl<span class="token punctuation">.</span>UltrasonicWaveDistance <span class="token operator">></span> <span class="token number">620</span><span class="token punctuation">)</span>
	<span class="token punctuation">{</span>
		g_Moto_Ctrl<span class="token punctuation">.</span>DistanceSet <span class="token operator">=</span> <span class="token number">50</span><span class="token punctuation">;</span><span class="token comment">//正值将使小车加速、前进</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>g_Moto_Ctrl<span class="token punctuation">.</span>UltrasonicWaveDistance <span class="token operator">></span> <span class="token number">700</span><span class="token punctuation">)</span>
	<span class="token punctuation">{</span>
		g_Moto_Ctrl<span class="token punctuation">.</span>DistanceSet <span class="token operator">=</span> <span class="token number">100</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>DistanceSet是中间变量，在速度控制环里会加入它的影响：</p>
<div class="language-c ext-c line-numbers-mode"><pre v-pre class="language-c"><code>g_Moto_Ctrl<span class="token punctuation">.</span>CarPosition <span class="token operator">+=</span> g_Moto_Ctrl<span class="token punctuation">.</span>DistanceSet<span class="token punctuation">;</span>	 <span class="token comment">//融合超声波给定速度</span>
<span class="token comment">//CarPosition将在后续参与速度PWM输出变量的运算</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>为实现直行功能，引入旋转PI。经测试发现P=8、I=1时较为合适.</p>
<p>方向控制环函数如下：</p>
<div class="language-c ext-c line-numbers-mode"><pre v-pre class="language-c"><code><span class="token keyword">void</span> <span class="token function">DirectionControl</span><span class="token punctuation">(</span><span class="token keyword">void</span><span class="token punctuation">)</span> 
<span class="token punctuation">{</span>
	g_Moto_Ctrl<span class="token punctuation">.</span>angleSpeedZ <span class="token operator">=</span> g_QMI8610<span class="token punctuation">.</span>gyro_z<span class="token punctuation">;</span><span class="token comment">//gyro_z是z轴旋转角速度</span>
	g_Moto_Ctrl<span class="token punctuation">.</span>angleZSpeedLast <span class="token operator">*=</span> <span class="token number">0.7</span><span class="token punctuation">;</span>
	g_Moto_Ctrl<span class="token punctuation">.</span>angleZSpeedLast <span class="token operator">+=</span> g_Moto_Ctrl<span class="token punctuation">.</span>angleSpeedZ <span class="token operator">*</span> <span class="token number">0.3</span><span class="token punctuation">;</span>
	g_Moto_Ctrl<span class="token punctuation">.</span>angleZ <span class="token operator">+=</span> g_Moto_Ctrl<span class="token punctuation">.</span>angleZSpeedLast <span class="token operator">-</span> CAR_SPEED_SET<span class="token punctuation">;</span><span class="token comment">//角速度积分，即角度</span>
	<span class="token comment">// if(g_Moto_Ctrl.angleZ > 800) g_Moto_Ctrl.angleZ = 800;//设置积分上限</span>
	<span class="token comment">// if(g_Moto_Ctrl.angleZ &lt; -800) g_Moto_Ctrl.angleZ = -800;//设置积分下限</span>
	g_Moto_Ctrl<span class="token punctuation">.</span>AngleControlOutZ <span class="token operator">=</span> <span class="token punctuation">(</span>g_Moto_Ctrl<span class="token punctuation">.</span>angleZSpeedLast <span class="token operator">-</span> CAR_SPEED_SET<span class="token punctuation">)</span><span class="token operator">*</span> g_Moto_Ctrl<span class="token punctuation">.</span>CarAngleZ_P <span class="token operator">+</span> g_Moto_Ctrl<span class="token punctuation">.</span>angleZ <span class="token operator">*</span> g_Moto_Ctrl<span class="token punctuation">.</span>CarAngleZ_D<span class="token punctuation">;</span>
	<span class="token comment">// AngleControlOutZ在电机输出函数中参与运算</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>电机输出函数相关代码：</p>
<div class="language-c ext-c line-numbers-mode"><pre v-pre class="language-c"><code>g_Moto_Ctrl<span class="token punctuation">.</span>LeftMotorOut <span class="token operator">=</span> g_Moto_Ctrl<span class="token punctuation">.</span>AngleControlOut <span class="token operator">+</span> g_Moto_Ctrl<span class="token punctuation">.</span>SpeedControlOutNext <span class="token operator">-</span> g_Moto_Ctrl<span class="token punctuation">.</span>AngleControlOutZ<span class="token punctuation">;</span>  <span class="token comment">//左电机转向PWM控制融合平衡角度、速度输出</span>
	g_Moto_Ctrl<span class="token punctuation">.</span>RightMotorOut <span class="token operator">=</span> g_Moto_Ctrl<span class="token punctuation">.</span>AngleControlOut <span class="token operator">+</span> g_Moto_Ctrl<span class="token punctuation">.</span>SpeedControlOutNext <span class="token operator">+</span> g_Moto_Ctrl<span class="token punctuation">.</span>AngleControlOutZ<span class="token punctuation">;</span> <span class="token comment">//右电机转向PWM控制融合平衡角度、速度输出</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>注意一个是<strong>加上</strong>，一个是<strong>减去</strong>.</p>
<h3 id="一点创新" tabindex="-1"><a class="header-anchor" href="#一点创新" aria-hidden="true">#</a> 一点创新</h3>
<p>现在的小车按下左键（PB1）可以启动电机，但是右键（PB2）的资源却没有使用到，我一开始便设想若有余力能否开发为按下左键是平衡模式，按下右键是直行模式.最终也是实现了.</p>
<p><code>commen.c</code>中定义变量ModeFlag，0表示直行模式，1表示平衡模式.</p>
<p>按键相关的中断服务函数中对ModeFlag赋值.</p>
<div class="language-c ext-c line-numbers-mode"><pre v-pre class="language-c"><code><span class="token class-name">uint8_t</span> ModeFlag <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span><span class="token comment">//默认是平衡模式</span>
<span class="token comment">/* some code... */</span>
<span class="token keyword">void</span> <span class="token function">HAL_GPIO_EXTI_Callback</span><span class="token punctuation">(</span><span class="token class-name">uint16_t</span> GPIO_Pin<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
	<span class="token keyword">switch</span> <span class="token punctuation">(</span>GPIO_Pin<span class="token punctuation">)</span>
	<span class="token punctuation">{</span>
		<span class="token comment">/* some code... */</span>
		<span class="token keyword">case</span> BTN1_Pin<span class="token operator">:</span><span class="token comment">//左键被按下时</span>
			btn_state<span class="token punctuation">.</span>left <span class="token operator">=</span> <span class="token function">HAL_GPIO_ReadPin</span><span class="token punctuation">(</span>BTN1_GPIO_Port <span class="token punctuation">,</span> BTN1_Pin<span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token keyword">if</span> <span class="token punctuation">(</span>btn_state<span class="token punctuation">.</span>left<span class="token punctuation">)</span> <span class="token punctuation">{</span>
				btn_flag<span class="token punctuation">.</span>left <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
				ModeFlag <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
			<span class="token punctuation">}</span>
			<span class="token keyword">break</span><span class="token punctuation">;</span>
		
		<span class="token keyword">case</span> BTN2_Pin<span class="token operator">:</span><span class="token comment">//右键被按下时</span>
			btn_state<span class="token punctuation">.</span>right <span class="token operator">=</span> <span class="token function">HAL_GPIO_ReadPin</span><span class="token punctuation">(</span>BTN2_GPIO_Port <span class="token punctuation">,</span> BTN2_Pin<span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token keyword">if</span> <span class="token punctuation">(</span>btn_state<span class="token punctuation">.</span>right<span class="token punctuation">)</span> <span class="token punctuation">{</span>
				btn_flag<span class="token punctuation">.</span>right <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
				ModeFlag <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
			<span class="token punctuation">}</span>
			<span class="token keyword">break</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>定义两套PID参数（其实两套基本相同，只是其中一套含有方向控制的PI参数），根据ModeFlag取值的不同，使用不同的PID参数.</p>
<p>注意<code>UserTask()</code>是被放在主循环里的函数.这里对它作了一些改变：</p>
<div class="language-c ext-c line-numbers-mode"><pre v-pre class="language-c"><code><span class="token keyword">void</span>	<span class="token function">UserTask</span><span class="token punctuation">(</span> <span class="token keyword">void</span> <span class="token punctuation">)</span>
<span class="token punctuation">{</span>
	<span class="token keyword">if</span> <span class="token punctuation">(</span> btn_flag<span class="token punctuation">.</span>left <span class="token punctuation">)</span>
	<span class="token punctuation">{</span>
		ModeFlag <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
		<span class="token function">MotoCtrlInit</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>	<span class="token comment">//重置小车状态;1表示平衡模式</span>
		<span class="token keyword">switch</span>  <span class="token punctuation">(</span> g_system_mode <span class="token punctuation">)</span> 
		<span class="token punctuation">{</span>
			<span class="token keyword">case</span> SYSTEM_DOTMATRIX <span class="token operator">:</span>
					g_system_mode <span class="token operator">=</span> SYSTEM_BALANCE <span class="token punctuation">;</span>
					<span class="token function">MX_I2C1_Init</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
					<span class="token function">OLED_init</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
					<span class="token function">OLED_clear</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
					<span class="token comment">// MotoCtrlInit();					  //小车直立参数初始化</span>
					<span class="token keyword">static</span> <span class="token keyword">const</span> <span class="token class-name">uint8_t</span> initInfo<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token number">17</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">{</span>
						<span class="token punctuation">{</span><span class="token string">"Balance Mode"</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
					<span class="token punctuation">}</span><span class="token punctuation">;</span>
					<span class="token function">OLED_ShowAscii</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token class-name">uint8_t</span> <span class="token operator">*</span><span class="token punctuation">)</span>initInfo<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token number">12</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//平衡模式时在屏幕中显示“Balance Mode”</span>
					<span class="token function">QMI8610_Init</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
					<span class="token function">UltrasonicWave_Init</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
					btn_flag<span class="token punctuation">.</span>left <span class="token operator">=</span> <span class="token number">0</span> <span class="token punctuation">;</span>
				<span class="token keyword">break</span> <span class="token punctuation">;</span>
				
			<span class="token keyword">case</span> SYSTEM_BALANCE <span class="token operator">:</span>
					g_system_mode <span class="token operator">=</span> SYSTEM_DOTMATRIX <span class="token punctuation">;</span>
					<span class="token function">OLED_Notice</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
					<span class="token function">led_matrix_init</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
					<span class="token function">show_led_matrix</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">;</span>
				<span class="token keyword">break</span> <span class="token punctuation">;</span>		
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>
	
	<span class="token keyword">else</span> <span class="token keyword">if</span><span class="token punctuation">(</span>btn_flag<span class="token punctuation">.</span>right<span class="token punctuation">)</span>
	<span class="token punctuation">{</span>
		ModeFlag <span class="token operator">=</span> <span class="token number">0</span> <span class="token punctuation">;</span>
		<span class="token function">MotoCtrlInit</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>	<span class="token comment">//重置小车状态;0表示前进模式</span>
		<span class="token keyword">switch</span>  <span class="token punctuation">(</span> g_system_mode <span class="token punctuation">)</span> 
		<span class="token punctuation">{</span>
			<span class="token keyword">case</span> SYSTEM_DOTMATRIX <span class="token operator">:</span>
					g_system_mode <span class="token operator">=</span> SYSTEM_BALANCE <span class="token punctuation">;</span>
					<span class="token function">MX_I2C1_Init</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
					<span class="token function">OLED_init</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
					<span class="token function">OLED_clear</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
					<span class="token comment">// MotoCtrlInit();					  //小车直立参数初始化</span>
					<span class="token keyword">static</span> <span class="token keyword">const</span> <span class="token class-name">uint8_t</span> initInfo<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token number">17</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">{</span>
						<span class="token punctuation">{</span><span class="token string">"Forward Mode"</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
					<span class="token punctuation">}</span><span class="token punctuation">;</span>
					<span class="token function">OLED_ShowAscii</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token class-name">uint8_t</span> <span class="token operator">*</span><span class="token punctuation">)</span>initInfo<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token number">12</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//平衡模式时在屏幕中显示“Forward Mode”</span>
					<span class="token function">QMI8610_Init</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
					<span class="token function">UltrasonicWave_Init</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
					btn_flag<span class="token punctuation">.</span>right <span class="token operator">=</span> <span class="token number">0</span> <span class="token punctuation">;</span>
				<span class="token keyword">break</span> <span class="token punctuation">;</span>
			<span class="token keyword">case</span> SYSTEM_BALANCE <span class="token operator">:</span>
					g_system_mode <span class="token operator">=</span> SYSTEM_DOTMATRIX <span class="token punctuation">;</span>
					<span class="token function">OLED_Notice</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
					<span class="token function">led_matrix_init</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
					<span class="token function">show_led_matrix</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">;</span>
				<span class="token keyword">break</span> <span class="token punctuation">;</span>		
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>
	<span class="token function">QMI8610_Check_Data</span><span class="token punctuation">(</span>ModeFlag<span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//该函数作为按键与电机输出的桥梁，根据传入的参数，应用不同的PID参数.</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后改写角度控制函数（<code>AngleControl(void)</code>、速度控制函数（<code>SpeedControl(void)</code>为需要传参的函数，即传入一个标志平衡/直行模式的参数.剩下的部分较为简单，就不再赘述.</p>
<h2 id="遇到的问题及解决方法" tabindex="-1"><a class="header-anchor" href="#遇到的问题及解决方法" aria-hidden="true">#</a> 遇到的问题及解决方法</h2>
<ol>
<li>
<p>测试中发现右轮的驱动能力总是略小于左轮，导致小车总是以右轮为轴旋转.</p>
<p>猜测可能是硬件上左右轮略有差异，可以在程序中提高右轮的PWM输出量。在电机输出函数中：</p>
<div class="language-c ext-c line-numbers-mode"><pre v-pre class="language-c"><code><span class="token function">SetMotorVoltageAndDirection</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token class-name">int16_t</span><span class="token punctuation">)</span>g_Moto_Ctrl<span class="token punctuation">.</span>LeftMotorOut<span class="token punctuation">,</span> <span class="token number">1.2</span><span class="token operator">*</span><span class="token punctuation">(</span><span class="token class-name">int16_t</span><span class="token punctuation">)</span>g_Moto_Ctrl<span class="token punctuation">.</span>RightMotorOut<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">//右轮添加了系数1.2</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>小车在避障时，前后摆动距离过大.</p>
<p>猜测原因可能有二：</p>
<ul>
<li>速度控制环中超声波测距的影响程度相比其他因素太小.</li>
<li>g_Moto_Ctrl.DistanceSet设置的过大或过小，过大则加减速太大刹不住，过小则难以产生影响.</li>
</ul>
<p>解决方法：</p>
<ul>
<li>
<p>将超声波测距的影响因素直接加到速度控制环的输出变量中，这样可显著增加超声波模块的影响程度.</p>
</li>
<li>
<p>在保持小车基本平衡的情况下，尽量减小g_Moto_Ctrl.DistanceSet的绝对值.</p>
</li>
<li>
<p>前进控制量可以稍微大于后腿控制量，且前进控制量不能太大，否则会撞墙.</p>
</li>
</ul>
</li>
<li>
<p>启动电机后转动缓慢.</p>
<p>一般为电量不足，充电即可.</p>
</li>
<li>
<p>下载程序后小车的前进方向为反方向.</p>
<p>检查程序无误后，检查硬件发现小车主板装反了.</p>
</li>
</ol>
<h2 id="心得体会和总结" tabindex="-1"><a class="header-anchor" href="#心得体会和总结" aria-hidden="true">#</a> 心得体会和总结</h2>
<ul>
<li>
<p>焊接选择的工具很重要.我自己之前用的一个刀头型电烙铁，接触面积很小，在万用板上焊接直插元件感觉很不方便，而且那款电烙铁的烙铁头很容易氧化，氧化后难以去掉氧化层，不沾锡、甚至不能熔化锡丝；这次实习使用的马蹄形电烙铁，烙铁头干净整洁有光泽，沾锡充分</p>
</li>
<li>
<p>组装好小车后应先仔细检查硬件，确认无误后再调试软件.</p>
</li>
<li>
<p>测试过程中注意保护屏幕和超声波探头，用不到时可以拆下.</p>
</li>
<li>
<p>PID参数的调节不是瞎调，是了解原理后、根据小车每次的表现来调.</p>
</li>
</ul>
<p>在为期两周的实习当中感触最深的便是实习联系理论的重要性，当遇到实际问题时，只要认真思考，对就是思考，用所学的知识，再一步步探索，是完全可以解决遇到的一般问题的。</p>
<p>这一次的实习没有多少东西要我们去想，更多的是要我们去做，好多东西看起来十分简单，一说都知道要调那几个PID参数，都知道几个参数代表什么意义，但没有亲自去做它，就不会明白理论与实践是有很大区别的.</p>
<p>通过一个星期的学习，我觉得自己在以下几个方面与有收获：</p>
<ul>
<li>对电子工艺的理论有了初步的系统了解。了解到了焊接普通元件与电路元件的技巧、印制电路板图的设计制作与工艺流程、工作原理与组成元件的作用等。</li>
<li>对自己的动手能力是个很大的锻炼。在实习中，我锻炼了自己动手技巧，提高了自己解决问题的能力。</li>
</ul>
<p>十分感谢老师对我们的细心指导，从他那里我学会了很多书本上学不到的东西，教我们怎样把理论与实际操作更好的联系起来。</p>
<h2 id="参考文献" tabindex="-1"><a class="header-anchor" href="#参考文献" aria-hidden="true">#</a> 参考文献</h2>
<p>[1]竞赛秘书处.电磁组直立行车参考设计方案[DB/OL].<a href="https://www.docin.com/p-2702632504.html" target="_blank" rel="noopener noreferrer">https://www.docin.com/p-2702632504.html<ExternalLinkIcon/></a>, 2012.03.01.</p>
<p>[2]北京邮电大学电子工程学院电路中心.电子工艺实习教程[DB/OL].().2022.08.</p>
</div></template>


