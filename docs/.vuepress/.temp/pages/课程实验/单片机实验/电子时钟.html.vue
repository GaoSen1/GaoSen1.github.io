<template><div><h1 id="基于stm32f103单片机的时钟设计与实现" tabindex="-1"><a class="header-anchor" href="#基于stm32f103单片机的时钟设计与实现" aria-hidden="true">#</a> 基于STM32F103单片机的时钟设计与实现</h1>
<blockquote>
<p><strong>摘要</strong></p>
<p>在如今这个高科技发展社会，数字电子时钟已成经为人们日常生活中必不可少的必要物品，广泛应用于个人家庭及车站，电影院，办公室等重要的公共场所，给人民的生活、学习、工作带来很大的方便，由于单片机具有体积小、功能强可靠性高、价格低廉等系列优点，用单片机制作数字时钟，更方便于人民，服务于社会，符合社会科学发展观的需要，且开发较为容易，所以受到人们的重视和关注，以其极高的性能价格比，适应了社会的发展需要。通过对它的学习、应用，我设计了一个简单的电子时钟，能够准确显示时间，调整时间，锻炼了软件设计能力。</p>
<p><strong>关键词</strong>：stm32、电子时钟</p>
</blockquote>
<h2 id="前言" tabindex="-1"><a class="header-anchor" href="#前言" aria-hidden="true">#</a> 前言</h2>
<h3 id="背景" tabindex="-1"><a class="header-anchor" href="#背景" aria-hidden="true">#</a> 背景</h3>
<p>随着社会发展的越来越快，单片机自20世纪70年代问世以来，由于其体积比较小，重量轻等多种有利优势，所以深受人们的热爱，由于开发较容易，灵活性好，也同时被很多设计者拿来应用到各种设备领域中;电子时钟是其中一个典型的例子，由于人们的生活节奏越来越快，时间观念在不断的增强，生活里很多时候离不开时钟，可以说时钟是现代人生活中是不可缺少的东西，现如今，时钟的款样和功能也越来越多，人们对钟表的精确度也越来越高。</p>
<h3 id="定义" tabindex="-1"><a class="header-anchor" href="#定义" aria-hidden="true">#</a> 定义</h3>
<p>电子时钟称数显钟，是一种用数字电路技术实现时，分，秒计时的装置，与机械时钟相比，直观性为其只要显著特点，且非机械驱动，具有更长的使用寿命。</p>
<h3 id="需求分析" tabindex="-1"><a class="header-anchor" href="#需求分析" aria-hidden="true">#</a> 需求分析</h3>
<p>传统的数字电子时钟采用了很多的分立元器件，不仅占用了很大的空间而且利用率比也很低，随着系统设计复杂度的不断提高，用传统时钟系统设计方法已经很难满足设计的需求，而单片机自20世纪末21世纪初问世以来，由于单片机具有体积小、功能强可靠性高、价格低廉等一系列优点，所以不仅已成为工业测控领域普遍采用的智能化控制工具，而且还已渗入到人们工作和和生活的各个角落，有力地推动了各个行业的技术改造。</p>
<p>电子时钟是采用数字电路实现对“时”、“分”、“秒”数字显示的计时装置，主要是利用电子技术将时钟数字化，电子化，让时钟更精确，精准。数字集成电路技术的发展采用了先进的石英技术，使数字钟具有走时准确、性能稳定、携带方便、体积小，界面美观、功能强、可靠性高。</p>
<h3 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h3>
<p>用单片机制作数字时钟，更方便于人民，服务于社会，符合社会科学发展观的需要，且开发较为容易，所以受到人们的重视和关注，以其极高的性能价格比，适应了社会的发展需要。随着单片机性价比的不断提高，新一代产品的应用也越来越广泛了，大的方面可以在工业工程方面做控制系统，小的方面可以用于家电控制，电子玩具等。</p>
<p>接下来阐述<strong>如何设计与实现基于STM32F103单片机的时钟</strong></p>
<h2 id="详细设计" tabindex="-1"><a class="header-anchor" href="#详细设计" aria-hidden="true">#</a> 详细设计</h2>
<h3 id="功能分析" tabindex="-1"><a class="header-anchor" href="#功能分析" aria-hidden="true">#</a> 功能分析</h3>
<ol>
<li>
<p>通过数码管显示数字，包括时分秒，具有时间校准的功能</p>
</li>
<li>
<p>整点报时可以通过声音或光两种情况报警。</p>
</li>
<li>
<p>时间校准由开发板上的按键统一完成。</p>
</li>
</ol>
<h3 id="工作原理" tabindex="-1"><a class="header-anchor" href="#工作原理" aria-hidden="true">#</a> 工作原理</h3>
<p>一个最基本的数字时钟系统主要由计时模块、译码显示模块，此外的时间校准模块属于附加功能。系统总体模块图如下：</p>
<Mermaid id="mermaid-382ee205" code="flowchart%20LR%0A%09subgraph%20A%5B%22%E8%AE%A1%E6%97%B6%E6%A8%A1%E5%9D%97%22%5D%0A%09direction%20TB%0A%20%20%20%20%20%20%20%20x1(%22some%20operations%22)%20--%3E%20%0A%20%20%20%20%20%20%20%20x2(%22...%22)%20--%3E%20%0A%20%20%20%20%20%20%20%20x3(%22%E8%AE%B0%E5%BD%95%E5%BD%93%E5%89%8D%E7%BB%8F%E8%BF%87%E7%9A%84%E6%80%BB%E7%A7%92%E6%95%B0time%22)%0A%09end%0A%09subgraph%20B%5B%22%E8%AF%91%E7%A0%81%E6%98%BE%E7%A4%BA%E6%A8%A1%E5%9D%97%22%5D%0A%09direction%20TB%0A%20%20%20%20%20%20%20%20y1(%22some%20operations%22)%20--%3E%20y2(%22...%22)%20--%3E%0A%20%20%20%20%20%20%20%20y3(%22%E8%B0%83%E7%94%A8HAL%E5%BA%93%E5%87%BD%E6%95%B0%E6%8E%A7%E5%88%B6%E6%95%B0%E7%A0%81%E7%AE%A1%E4%BA%AE%E7%81%AD%22)%20%20%20%20%0A%09end%0A%09subgraph%20C%5B%22%E6%97%B6%E9%97%B4%E6%A0%A1%E5%87%86%E6%A8%A1%E5%9D%97%22%5D%0A%09direction%20TB%0A%20%20%20%20%20%20%20%20Z1(%22some%20operations%22)%20--%3E%20%0A%20%20%20%20%20%20%20%20Z2(%22...%22)%20--%3E%20%20%0A%20%20%20%20%20%20%20%20z3(%22%E5%85%A8%E5%B1%80%E5%8F%98%E9%87%8Ftime%E8%A2%AB%E4%BF%AE%E6%94%B9%22)%0A%09end%0A%09%0A%09a1(%225%E7%A7%8D%E6%8C%89%E9%94%AE%22)%20--%3E%20C%0A%09time%20--%3E%20C%20--%3E%7Ctime%7C%20B%0A%09A%20--%3E%20time%20--%3E%20B%0A"></Mermaid><h4 id="计时模块" tabindex="-1"><a class="header-anchor" href="#计时模块" aria-hidden="true">#</a> 计时模块</h4>
<p>计时模块应包含一个秒信号发生器，它直接决定整个系统的精度，可通过配置单片机内部的定时器并在相应的中断服务函数中给秒变量赋值实现。</p>
<blockquote>
<p><strong>注意</strong></p>
<p>不能使用HAL库中的延时函数来给秒变量自增，因为不能保证相邻两次执行延时函数的时间间隔是1s。</p>
</blockquote>
<p>此模块的计时变量有两种实现方案：</p>
<ol>
<li>定义一个数组类型、长度为6的变量，前两位表示时、中间两位表示分、最后两位表示秒。秒信号控制最后一位自增，逢10进1，最后两位逢60进1，以此类推。然后遍历该数组去显示译码。</li>
<li>定义一个无符号长整型（uint32_t）变量，来记录当前的总秒数，在显示译码时再换算成时分秒。注意因为24h=24*3600s=86400s,而uint16_t表示的最大的数为2^16=65536&lt;86400，所以定义成uint32_t类型，避免数据溢出。</li>
</ol>
<p>优缺点对比：</p>
<ul>
<li>
<p>第一种方案的优点是数据类型占用存储空间小，缺点是在处理进位时有较多的逻辑判断，不是很直观。</p>
</li>
<li>
<p>第二种方案的优点是逻辑简单清晰，只需按如下方法计算即可得到时，分，秒：</p>
<div class="language-c ext-c line-numbers-mode"><pre v-pre class="language-c"><code><span class="token class-name">uint16_t</span> hour <span class="token operator">=</span> f_time <span class="token operator">/</span> <span class="token number">3600</span><span class="token punctuation">,</span> min <span class="token operator">=</span> f_time <span class="token operator">%</span> <span class="token number">3600</span> <span class="token operator">/</span> <span class="token number">60</span><span class="token punctuation">,</span> sec <span class="token operator">=</span> f_time <span class="token operator">%</span> <span class="token number">60</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
</ul>
<p>​	缺点也显而易见：占用存储空间较大。</p>
<p>对于设计者来说，在软硬件条件允许时，简单的逻辑显然更受欢迎。而对于该系统，即使定义一个uint32_t类型，也不会造成什么负担。所以我选择了方案二。</p>
<p>在CubeMX中，按如下步骤进行定时器1的相关配置：</p>
<p><img src="stm32.assets/image-20220615210549497.png" alt="image-20220615210549497" loading="lazy"></p>
<p>其中<strong>PSC</strong>处是配置分频系数，<strong>Counter Period</strong>处是配置定时器的计数上限值，当达到该上限值时执行中断服务函数。</p>
<p><img src="stm32.assets/image-20220615211242128.png" alt="image-20220615211242128" loading="lazy"></p>
<p>配置为定时器更新时触发中断。别忘了配置时钟源为内部时钟。</p>
<p>使能定时器相应的中断：</p>
<p><img src="stm32.assets/image-20220615211431885.png" alt="image-20220615211431885" loading="lazy"></p>
<p>最后在程序中执行函数<code v-pre>HAL_TIM_Base_Start_IT(&amp;htim1);</code>即可启动定时器1。定时器的中断服务函数如下：</p>
<div class="language-c ext-c line-numbers-mode"><pre v-pre class="language-c"><code><span class="token keyword">void</span> <span class="token function">HAL_TIM_PeriodElapsedCallback</span><span class="token punctuation">(</span>TIM_HandleTypeDef <span class="token operator">*</span>htim<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
  <span class="token keyword">if</span><span class="token punctuation">(</span>htim<span class="token operator">-></span>Instance <span class="token operator">==</span> TIM1<span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token comment">// 定时器1触发的中断</span>
    time <span class="token operator">++</span><span class="token punctuation">;</span><span class="token comment">//time是一个全局变量，记录总秒数</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span>time <span class="token operator">>=</span> <span class="token number">24</span> <span class="token operator">*</span> <span class="token number">3600</span><span class="token punctuation">)</span> time <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">else</span> <span class="token keyword">if</span><span class="token punctuation">(</span>htim<span class="token operator">-></span>Instance <span class="token operator">==</span> TIM3<span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token comment">// 定时器3触发的中断,用于调整时间时的闪烁</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span>isHide <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span> isHide <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token keyword">else</span> isHide <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>该函数传入的参数htim可用于判断是哪个定时器产生的中断。</p>
<p>正如前文所述，此处几乎没有逻辑判断，不用考虑进位问题。</p>
<h4 id="译码显示模块" tabindex="-1"><a class="header-anchor" href="#译码显示模块" aria-hidden="true">#</a> 译码显示模块</h4>
<p>该模块只需接收一个参数time，即可译码显示。</p>
<Mermaid id="mermaid-64a56f6c" code="flowchart%20LR%0A%09subgraph%20A%5B%22%E8%AF%91%E7%A0%81%E6%98%BE%E7%A4%BA%E6%A8%A1%E5%9D%97%22%5D%0A%09direction%20TB%0A%20%20%20%20%20%20%20%20x1(%22%E5%B0%86time%E6%8D%A2%E7%AE%97%E6%88%90%E4%B8%89%E4%B8%AA%E6%95%B0%EF%BC%9A%E6%97%B6%E5%88%86%E7%A7%92%22)%20--%3E%20%0A%20%20%20%20%20%20%20%20x2(%22hour%20%3D%20time%20%2F%203600%2C%20min%20%3D%20time%20%25%203600%20%2F%2060%2C%20sec%20%3D%20time%20%25%2060%3B%22)%20--%3E%20%0A%20%20%20%20%20%20%20%20x3(%22%E5%88%86%E5%88%AB%E8%AF%91%E7%A0%81%E6%98%BE%E7%A4%BAhour%2Cmin%2Csec%22)%20--%3E%0A%20%20%20%20%20%20%20%20x4(%22ShowNumber(hour%20%2F%2010%2C%200)%3B%0A%20%20%20%20%20%20%20%20ShowNumber(hour%20%25%2010%2C%201)%3B%0A%20%20%20%20%20%20%20%20ShowNumber(min%20%2F%2010%2C%202)%3B%0A%20%20%20%20%20%20%20%20ShowNumber(min%20%25%2010%2C%203)%3B%0A%20%20%20%20%20%20%20%20ShowNumber(sec%20%2F%2010%2C%204)%3B%0A%20%20%20%20%20%20%20%20ShowNumber(sec%20%25%2010%2C%205)%3B%22)%0A%09end%0A%09%0A%09time%20--%3E%20A%0A"></Mermaid><p>其中调用ShowNumber(num,pos)函数会实现：一个特定位置上（参数pos决定）的数码管显示一个十进制数（参数num决定）。同一时间只会亮起一个数码管，后一次调用的效果会覆盖前一次，所以需要动态扫描这6个数码管，在视觉上实现“<strong>同时亮</strong>”。</p>
<p>具体的代码如下：</p>
<div class="language-c ext-c line-numbers-mode"><pre v-pre class="language-c"><code><span class="token keyword">void</span> <span class="token function">showTime</span><span class="token punctuation">(</span><span class="token class-name">uint32_t</span> f_time<span class="token punctuation">)</span> 
<span class="token punctuation">{</span>
	<span class="token class-name">uint16_t</span> hour <span class="token operator">=</span> f_time <span class="token operator">/</span> <span class="token number">3600</span><span class="token punctuation">,</span> min <span class="token operator">=</span> f_time <span class="token operator">%</span> <span class="token number">3600</span> <span class="token operator">/</span> <span class="token number">60</span><span class="token punctuation">,</span> sec <span class="token operator">=</span> f_time <span class="token operator">%</span> <span class="token number">60</span><span class="token punctuation">;</span>
	<span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>i <span class="token operator">&lt;</span> <span class="token number">6</span><span class="token punctuation">;</span>i<span class="token operator">++</span><span class="token punctuation">)</span>
	<span class="token punctuation">{</span>
		<span class="token keyword">switch</span> <span class="token punctuation">(</span>i<span class="token punctuation">)</span>
		<span class="token punctuation">{</span>
			<span class="token keyword">case</span> <span class="token number">0</span><span class="token operator">:</span> <span class="token function">ShowNumber</span><span class="token punctuation">(</span>hour <span class="token operator">/</span> <span class="token number">10</span><span class="token punctuation">,</span> i<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token keyword">break</span><span class="token punctuation">;</span>
			<span class="token keyword">case</span> <span class="token number">1</span><span class="token operator">:</span> <span class="token function">ShowNumber</span><span class="token punctuation">(</span>hour <span class="token operator">%</span> <span class="token number">10</span><span class="token punctuation">,</span> i<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token keyword">break</span><span class="token punctuation">;</span>
			<span class="token keyword">case</span> <span class="token number">2</span><span class="token operator">:</span> <span class="token function">ShowNumber</span><span class="token punctuation">(</span>min <span class="token operator">/</span> <span class="token number">10</span><span class="token punctuation">,</span> i<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token keyword">break</span><span class="token punctuation">;</span>
			<span class="token keyword">case</span> <span class="token number">3</span><span class="token operator">:</span> <span class="token function">ShowNumber</span><span class="token punctuation">(</span>min <span class="token operator">%</span> <span class="token number">10</span><span class="token punctuation">,</span> i<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token keyword">break</span><span class="token punctuation">;</span>
			<span class="token keyword">case</span> <span class="token number">4</span><span class="token operator">:</span> <span class="token function">ShowNumber</span><span class="token punctuation">(</span>sec <span class="token operator">/</span> <span class="token number">10</span><span class="token punctuation">,</span> i<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token keyword">break</span><span class="token punctuation">;</span>
			<span class="token keyword">case</span> <span class="token number">5</span><span class="token operator">:</span> <span class="token function">ShowNumber</span><span class="token punctuation">(</span>sec <span class="token operator">%</span> <span class="token number">10</span><span class="token punctuation">,</span> i<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token keyword">break</span><span class="token punctuation">;</span>
			<span class="token keyword">default</span><span class="token operator">:</span>
				<span class="token keyword">break</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span>
		<span class="token function">HAL_Delay</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="时间校准模块" tabindex="-1"><a class="header-anchor" href="#时间校准模块" aria-hidden="true">#</a> 时间校准模块</h4>
<p>实验板上具有上下左右中五个按键，可这样设计：</p>
<ul>
<li><strong>中</strong>表示切换时间显示/调整模式，比如第一次按进入时间调整模式，再按一次正常显示时间。</li>
<li><strong>左右</strong>表示选择调整的位置，比如初始选择的是秒的个数位，按两次次<strong>左</strong>可选择分的个数位。且选中的位置以0.5s切换显示/隐藏。</li>
<li><strong>上</strong>表示增大当前值，<strong>下</strong>表示减小当前值，具体增大/减小的值还要视当前位置而定。</li>
</ul>
<p>当按下中间的按键进入时间校准模式时，数码管上的显示应该静止，而背后的计数值time不静止，所以显然需要另一个中间变量TimeTemp控制译码显示。</p>
<p>至于控制选择的位置以0.5s切换显示/隐藏，可以启用定时器3，每隔0.5s产生一次中断，产生中断时，执行如下代码：</p>
<div class="language-c ext-c line-numbers-mode"><pre v-pre class="language-c"><code>isHide <span class="token operator">=</span> <span class="token operator">!</span>isHide<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>再用变量isHide控制选择位置处的显示译码：</p>
<div class="language-c ext-c line-numbers-mode"><pre v-pre class="language-c"><code><span class="token keyword">void</span> <span class="token function">DisplaySegWithHide</span><span class="token punctuation">(</span><span class="token class-name">uint32_t</span> num<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
  <span class="token keyword">if</span><span class="token punctuation">(</span>isHide<span class="token punctuation">)</span> <span class="token function">ShowNumber</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">,</span> PosSelceted<span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//10不能被译码，导致该位置处的数码管不显示</span>
  <span class="token keyword">else</span> <span class="token function">ShowNumber</span><span class="token punctuation">(</span>num<span class="token punctuation">,</span> PosSelceted<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其中的PosSelected表示选择的位置，初始为5（即秒的个数位）。按下左右键时可增加或减小，如：</p>
<div class="language-c ext-c line-numbers-mode"><pre v-pre class="language-c"><code><span class="token comment">//该按钮实现调整位置向右移</span>
<span class="token keyword">if</span><span class="token punctuation">(</span>isManaging<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span>PosSelceted <span class="token operator">==</span> <span class="token number">5</span><span class="token punctuation">)</span> PosSelceted <span class="token operator">=</span> <span class="token number">5</span><span class="token punctuation">;</span>
    <span class="token keyword">else</span> PosSelceted <span class="token operator">++</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>增大、减小当前值还需判断当前选择位置，如选择了秒的个数位，增大即<code v-pre>time ++;</code>如选择了分的个数位，增大即<code v-pre>time += 60;</code>具体如下：</p>
<div class="language-c ext-c line-numbers-mode"><pre v-pre class="language-c"><code><span class="token keyword">switch</span> <span class="token punctuation">(</span>PosSelceted<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">case</span> <span class="token number">0</span><span class="token operator">:</span> <span class="token keyword">if</span><span class="token punctuation">(</span>isManaging <span class="token operator">&amp;&amp;</span> <span class="token function">CheckArithNum</span><span class="token punctuation">(</span><span class="token number">36000</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">)</span> TimeTemp <span class="token operator">+=</span> <span class="token number">36000</span><span class="token punctuation">;</span> <span class="token keyword">break</span><span class="token punctuation">;</span>
    <span class="token keyword">case</span> <span class="token number">1</span><span class="token operator">:</span> <span class="token keyword">if</span><span class="token punctuation">(</span>isManaging <span class="token operator">&amp;&amp;</span> <span class="token function">CheckArithNum</span><span class="token punctuation">(</span><span class="token number">3600</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">)</span> TimeTemp <span class="token operator">+=</span> <span class="token number">3600</span><span class="token punctuation">;</span> <span class="token keyword">break</span><span class="token punctuation">;</span>
    <span class="token keyword">case</span> <span class="token number">2</span><span class="token operator">:</span> <span class="token keyword">if</span><span class="token punctuation">(</span>isManaging <span class="token operator">&amp;&amp;</span> <span class="token function">CheckArithNum</span><span class="token punctuation">(</span><span class="token number">600</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">)</span> TimeTemp <span class="token operator">+=</span> <span class="token number">600</span><span class="token punctuation">;</span> <span class="token keyword">break</span><span class="token punctuation">;</span>
    <span class="token keyword">case</span> <span class="token number">3</span><span class="token operator">:</span> <span class="token keyword">if</span><span class="token punctuation">(</span>isManaging <span class="token operator">&amp;&amp;</span> <span class="token function">CheckArithNum</span><span class="token punctuation">(</span><span class="token number">60</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">)</span> TimeTemp <span class="token operator">+=</span> <span class="token number">60</span><span class="token punctuation">;</span> <span class="token keyword">break</span><span class="token punctuation">;</span>
    <span class="token keyword">case</span> <span class="token number">4</span><span class="token operator">:</span> <span class="token keyword">if</span><span class="token punctuation">(</span>isManaging <span class="token operator">&amp;&amp;</span> <span class="token function">CheckArithNum</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">)</span> TimeTemp <span class="token operator">+=</span> <span class="token number">10</span><span class="token punctuation">;</span> <span class="token keyword">break</span><span class="token punctuation">;</span>
    <span class="token keyword">case</span> <span class="token number">5</span><span class="token operator">:</span> <span class="token keyword">if</span><span class="token punctuation">(</span>isManaging <span class="token operator">&amp;&amp;</span> <span class="token function">CheckArithNum</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">)</span> TimeTemp <span class="token operator">+=</span> <span class="token number">1</span><span class="token punctuation">;</span> <span class="token keyword">break</span><span class="token punctuation">;</span>
    <span class="token keyword">default</span><span class="token operator">:</span>
        TimeTemp <span class="token operator">+=</span> <span class="token number">3</span><span class="token punctuation">;</span>
        PosSelceted <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span> 
        <span class="token keyword">break</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
time <span class="token operator">=</span> TimeTemp<span class="token punctuation">;</span> 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以看到，正如前文所述，由于定义的time是长整型，在增加或减小当前值时，亦不用考虑进位、借位，这就使逻辑变得很简单、清晰，大大简化了设计者相应的思路和算法。</p>
<h2 id="效果演示" tabindex="-1"><a class="header-anchor" href="#效果演示" aria-hidden="true">#</a> 效果演示</h2>
<video id="video" controls="" preload="true" poster="">
  <source id="mp4" src="https://gorilla.cdnja.co/v/jg/JGnvG.mp4?token=7zFZJevG3oJr-xB5D8QWIw&expires=1655305934" type="video/mp4">
</video>
<h1 id="完整代码附录" tabindex="-1"><a class="header-anchor" href="#完整代码附录" aria-hidden="true">#</a> 完整代码附录</h1>
<p>前文只给除了部分、关键的代码，下面给出<strong>main.c、seg7.c</strong>文件的代码。其他文件均为CubeMX自动生成。</p>
<h2 id="main-c" tabindex="-1"><a class="header-anchor" href="#main-c" aria-hidden="true">#</a> main.c：</h2>
<div class="language-c ext-c line-numbers-mode"><pre v-pre class="language-c"><code><span class="token comment">/* USER CODE BEGIN Header */</span>
<span class="token comment">/**
  ******************************************************************************
  * @file           : main.c
  * @brief          : Main program body
  ******************************************************************************
  * @attention
  *
  * Copyright (c) 2022 STMicroelectronics.
  * All rights reserved.
  *
  * This software is licensed under terms that can be found in the LICENSE file
  * in the root directory of this software component.
  * If no LICENSE file comes with this software, it is provided AS-IS.
  *
  ******************************************************************************
  */</span>
<span class="token comment">/* USER CODE END Header */</span>
<span class="token comment">/* Includes ------------------------------------------------------------------*/</span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">"main.h"</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">"tim.h"</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">"usart.h"</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">"usb_device.h"</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">"gpio.h"</span></span>

<span class="token comment">/* Private includes ----------------------------------------------------------*/</span>
<span class="token comment">/* USER CODE BEGIN Includes */</span>
<span class="token comment">// #include "seg7.h"</span>
  <span class="token class-name">uint32_t</span> time <span class="token operator">=</span> <span class="token number">72000</span><span class="token punctuation">;</span>
  <span class="token class-name">uint32_t</span> TimeTemp <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
  <span class="token class-name">uint16_t</span> isManaging <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span><span class="token comment">//表示正在调整的flag�????1表示调整模式�????0表示不是调整模式</span>
  <span class="token class-name">uint16_t</span> isHide <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span><span class="token comment">//表示某个数码管显示或隐藏</span>
  <span class="token class-name">uint16_t</span> PosSelceted <span class="token operator">=</span> <span class="token number">4</span><span class="token punctuation">;</span><span class="token comment">//调整选择的位�????</span>
<span class="token comment">/* USER CODE END Includes */</span>

<span class="token comment">/* Private typedef -----------------------------------------------------------*/</span>
<span class="token comment">/* USER CODE BEGIN PTD */</span>

<span class="token comment">/* USER CODE END PTD */</span>

<span class="token comment">/* Private define ------------------------------------------------------------*/</span>
<span class="token comment">/* USER CODE BEGIN PD */</span>
<span class="token comment">/* USER CODE END PD */</span>

<span class="token comment">/* Private macro -------------------------------------------------------------*/</span>
<span class="token comment">/* USER CODE BEGIN PM */</span>

<span class="token comment">/* USER CODE END PM */</span>

<span class="token comment">/* Private variables ---------------------------------------------------------*/</span>

<span class="token comment">/* USER CODE BEGIN PV */</span>

<span class="token comment">/* USER CODE END PV */</span>

<span class="token comment">/* Private function prototypes -----------------------------------------------*/</span>
<span class="token keyword">void</span> <span class="token function">SystemClock_Config</span><span class="token punctuation">(</span><span class="token keyword">void</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">MX_NVIC_Init</span><span class="token punctuation">(</span><span class="token keyword">void</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">/* USER CODE BEGIN PFP */</span>

<span class="token comment">/* USER CODE END PFP */</span>

<span class="token comment">/* Private user code ---------------------------------------------------------*/</span>
<span class="token comment">/* USER CODE BEGIN 0 */</span>

<span class="token comment">/* 
Num: 参与运算的数
Arithmetic: 0表示加法，1表示减法
返回值: 0表示不合法,1表示合法
 */</span>
<span class="token class-name">uint16_t</span> <span class="token function">CheckArithNum</span><span class="token punctuation">(</span><span class="token class-name">uint32_t</span> Num<span class="token punctuation">,</span> <span class="token class-name">uint16_t</span> Arithmetic<span class="token punctuation">)</span> 
<span class="token punctuation">{</span>
  <span class="token keyword">if</span><span class="token punctuation">(</span>Arithmetic <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token punctuation">(</span>TimeTemp <span class="token operator">+</span> Num<span class="token punctuation">)</span> <span class="token operator">></span> <span class="token number">24</span> <span class="token operator">*</span> <span class="token number">3600</span><span class="token punctuation">)</span> <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">else</span> <span class="token keyword">if</span><span class="token punctuation">(</span>Arithmetic <span class="token operator">==</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span>TimeTemp <span class="token operator">&lt;</span> Num<span class="token punctuation">)</span> <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> <span class="token number">1</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">void</span> <span class="token function">HAL_GPIO_EXTI_Callback</span><span class="token punctuation">(</span><span class="token class-name">uint16_t</span> GPIO_Pin<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
  <span class="token keyword">switch</span> <span class="token punctuation">(</span>GPIO_Pin<span class="token punctuation">)</span>
  <span class="token punctuation">{</span>
    <span class="token keyword">case</span> BTN_0_Pin<span class="token operator">:</span> <span class="token punctuation">{</span>
      TimeTemp <span class="token operator">=</span> time<span class="token punctuation">;</span>
      <span class="token keyword">if</span><span class="token punctuation">(</span>isManaging <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span> 
      <span class="token punctuation">{</span>
        isManaging <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
        <span class="token function">HAL_TIM_Base_Start_IT</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>htim3<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
      <span class="token keyword">else</span> 
      <span class="token punctuation">{</span>
        isManaging <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
        <span class="token function">HAL_TIM_Base_Stop_IT</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>htim3<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
      <span class="token keyword">break</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">case</span> BTN_1_Pin<span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span><span class="token punctuation">(</span>isManaging<span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token comment">//该按钮实现调整位置向左移�???? </span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>PosSelceted <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span> PosSelceted <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
        <span class="token keyword">else</span> PosSelceted <span class="token operator">--</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
      <span class="token keyword">break</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
      
    <span class="token keyword">case</span> BTN_3_Pin<span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token comment">//该按钮实现调整位置向右移</span>
      <span class="token keyword">if</span><span class="token punctuation">(</span>isManaging<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>PosSelceted <span class="token operator">==</span> <span class="token number">5</span><span class="token punctuation">)</span> PosSelceted <span class="token operator">=</span> <span class="token number">5</span><span class="token punctuation">;</span>
        <span class="token keyword">else</span> PosSelceted <span class="token operator">++</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
      <span class="token keyword">break</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">case</span> BTN_2_Pin<span class="token operator">:</span> <span class="token punctuation">{</span><span class="token comment">//该按钮实现加时</span>
      <span class="token keyword">switch</span> <span class="token punctuation">(</span>PosSelceted<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">case</span> <span class="token number">0</span><span class="token operator">:</span> <span class="token keyword">if</span><span class="token punctuation">(</span>isManaging <span class="token operator">&amp;&amp;</span> <span class="token function">CheckArithNum</span><span class="token punctuation">(</span><span class="token number">36000</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">)</span> TimeTemp <span class="token operator">+=</span> <span class="token number">36000</span><span class="token punctuation">;</span> <span class="token keyword">break</span><span class="token punctuation">;</span>
        <span class="token keyword">case</span> <span class="token number">1</span><span class="token operator">:</span> <span class="token keyword">if</span><span class="token punctuation">(</span>isManaging <span class="token operator">&amp;&amp;</span> <span class="token function">CheckArithNum</span><span class="token punctuation">(</span><span class="token number">3600</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">)</span> TimeTemp <span class="token operator">+=</span> <span class="token number">3600</span><span class="token punctuation">;</span> <span class="token keyword">break</span><span class="token punctuation">;</span>
        <span class="token keyword">case</span> <span class="token number">2</span><span class="token operator">:</span> <span class="token keyword">if</span><span class="token punctuation">(</span>isManaging <span class="token operator">&amp;&amp;</span> <span class="token function">CheckArithNum</span><span class="token punctuation">(</span><span class="token number">600</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">)</span> TimeTemp <span class="token operator">+=</span> <span class="token number">600</span><span class="token punctuation">;</span> <span class="token keyword">break</span><span class="token punctuation">;</span>
        <span class="token keyword">case</span> <span class="token number">3</span><span class="token operator">:</span> <span class="token keyword">if</span><span class="token punctuation">(</span>isManaging <span class="token operator">&amp;&amp;</span> <span class="token function">CheckArithNum</span><span class="token punctuation">(</span><span class="token number">60</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">)</span> TimeTemp <span class="token operator">+=</span> <span class="token number">60</span><span class="token punctuation">;</span> <span class="token keyword">break</span><span class="token punctuation">;</span>
        <span class="token keyword">case</span> <span class="token number">4</span><span class="token operator">:</span> <span class="token keyword">if</span><span class="token punctuation">(</span>isManaging <span class="token operator">&amp;&amp;</span> <span class="token function">CheckArithNum</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">)</span> TimeTemp <span class="token operator">+=</span> <span class="token number">10</span><span class="token punctuation">;</span> <span class="token keyword">break</span><span class="token punctuation">;</span>
        <span class="token keyword">case</span> <span class="token number">5</span><span class="token operator">:</span> <span class="token keyword">if</span><span class="token punctuation">(</span>isManaging <span class="token operator">&amp;&amp;</span> <span class="token function">CheckArithNum</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">)</span> TimeTemp <span class="token operator">+=</span> <span class="token number">1</span><span class="token punctuation">;</span> <span class="token keyword">break</span><span class="token punctuation">;</span>
        <span class="token keyword">default</span><span class="token operator">:</span>
          TimeTemp <span class="token operator">+=</span> <span class="token number">3</span><span class="token punctuation">;</span>
          PosSelceted <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span> 
          <span class="token keyword">break</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
      time <span class="token operator">=</span> TimeTemp<span class="token punctuation">;</span> <span class="token keyword">break</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">case</span> BTN_4_Pin<span class="token operator">:</span> <span class="token punctuation">{</span><span class="token comment">//该按钮实现减时</span>
      <span class="token keyword">switch</span> <span class="token punctuation">(</span>PosSelceted<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">case</span> <span class="token number">0</span><span class="token operator">:</span> <span class="token keyword">if</span><span class="token punctuation">(</span>isManaging <span class="token operator">&amp;&amp;</span> <span class="token function">CheckArithNum</span><span class="token punctuation">(</span><span class="token number">36000</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span> TimeTemp <span class="token operator">-=</span> <span class="token number">36000</span><span class="token punctuation">;</span> <span class="token keyword">break</span><span class="token punctuation">;</span>
        <span class="token keyword">case</span> <span class="token number">1</span><span class="token operator">:</span> <span class="token keyword">if</span><span class="token punctuation">(</span>isManaging <span class="token operator">&amp;&amp;</span> <span class="token function">CheckArithNum</span><span class="token punctuation">(</span><span class="token number">3600</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span> TimeTemp <span class="token operator">-=</span> <span class="token number">3600</span><span class="token punctuation">;</span> <span class="token keyword">break</span><span class="token punctuation">;</span>
        <span class="token keyword">case</span> <span class="token number">2</span><span class="token operator">:</span> <span class="token keyword">if</span><span class="token punctuation">(</span>isManaging <span class="token operator">&amp;&amp;</span> <span class="token function">CheckArithNum</span><span class="token punctuation">(</span><span class="token number">600</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span> TimeTemp <span class="token operator">-=</span> <span class="token number">600</span><span class="token punctuation">;</span> <span class="token keyword">break</span><span class="token punctuation">;</span>
        <span class="token keyword">case</span> <span class="token number">3</span><span class="token operator">:</span> <span class="token keyword">if</span><span class="token punctuation">(</span>isManaging <span class="token operator">&amp;&amp;</span> <span class="token function">CheckArithNum</span><span class="token punctuation">(</span><span class="token number">60</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span> TimeTemp <span class="token operator">-=</span> <span class="token number">60</span><span class="token punctuation">;</span> <span class="token keyword">break</span><span class="token punctuation">;</span>
        <span class="token keyword">case</span> <span class="token number">4</span><span class="token operator">:</span> <span class="token keyword">if</span><span class="token punctuation">(</span>isManaging <span class="token operator">&amp;&amp;</span> <span class="token function">CheckArithNum</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span> TimeTemp <span class="token operator">-=</span> <span class="token number">10</span><span class="token punctuation">;</span> <span class="token keyword">break</span><span class="token punctuation">;</span>
        <span class="token keyword">case</span> <span class="token number">5</span><span class="token operator">:</span> <span class="token keyword">if</span><span class="token punctuation">(</span>isManaging <span class="token operator">&amp;&amp;</span> <span class="token function">CheckArithNum</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span> TimeTemp <span class="token operator">-=</span> <span class="token number">1</span><span class="token punctuation">;</span> <span class="token keyword">break</span><span class="token punctuation">;</span>
        <span class="token keyword">default</span><span class="token operator">:</span>
          <span class="token keyword">break</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
      time <span class="token operator">=</span> TimeTemp<span class="token punctuation">;</span> <span class="token keyword">break</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">default</span><span class="token operator">:</span>
      <span class="token keyword">break</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

<span class="token punctuation">}</span>

<span class="token keyword">void</span> <span class="token function">HAL_TIM_PeriodElapsedCallback</span><span class="token punctuation">(</span>TIM_HandleTypeDef <span class="token operator">*</span>htim<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
  <span class="token keyword">if</span><span class="token punctuation">(</span>htim<span class="token operator">-></span>Instance <span class="token operator">==</span> TIM1<span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token comment">// 定时器1触发的中断</span>
    time <span class="token operator">++</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span>time <span class="token operator">>=</span> <span class="token number">24</span> <span class="token operator">*</span> <span class="token number">3600</span><span class="token punctuation">)</span> time <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">else</span> <span class="token keyword">if</span><span class="token punctuation">(</span>htim<span class="token operator">-></span>Instance <span class="token operator">==</span> TIM3<span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token comment">// 定时器3触发的中断</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span>isHide <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span> isHide <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token keyword">else</span> isHide <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">void</span> <span class="token function">DisplaySegWithHide</span><span class="token punctuation">(</span><span class="token class-name">uint32_t</span> num<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
  <span class="token keyword">if</span><span class="token punctuation">(</span>isHide<span class="token punctuation">)</span> <span class="token function">ShowNumber</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">,</span> PosSelceted<span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//10表示一个乱码数</span>
  <span class="token keyword">else</span> <span class="token function">ShowNumber</span><span class="token punctuation">(</span>num<span class="token punctuation">,</span> PosSelceted<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">void</span> <span class="token function">DrinklePos</span><span class="token punctuation">(</span><span class="token class-name">uint32_t</span> f_time<span class="token punctuation">,</span> <span class="token keyword">unsigned</span> <span class="token keyword">char</span> pos<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
	<span class="token class-name">uint16_t</span> hour <span class="token operator">=</span> f_time <span class="token operator">/</span> <span class="token number">3600</span><span class="token punctuation">,</span> min <span class="token operator">=</span> f_time <span class="token operator">%</span> <span class="token number">3600</span> <span class="token operator">/</span> <span class="token number">60</span><span class="token punctuation">,</span> sec <span class="token operator">=</span> f_time <span class="token operator">%</span> <span class="token number">60</span><span class="token punctuation">;</span>
	<span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>i <span class="token operator">&lt;</span> <span class="token number">6</span><span class="token punctuation">;</span>i <span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">switch</span> <span class="token punctuation">(</span>i<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">case</span> <span class="token number">0</span><span class="token operator">:</span> 
        <span class="token keyword">if</span><span class="token punctuation">(</span>i <span class="token operator">==</span> pos<span class="token punctuation">)</span> <span class="token function">DisplaySegWithHide</span><span class="token punctuation">(</span>hour <span class="token operator">/</span> <span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">else</span> <span class="token function">ShowNumber</span><span class="token punctuation">(</span>hour <span class="token operator">/</span> <span class="token number">10</span> <span class="token punctuation">,</span> i<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">break</span><span class="token punctuation">;</span>
      <span class="token keyword">case</span> <span class="token number">1</span><span class="token operator">:</span> 
        <span class="token keyword">if</span><span class="token punctuation">(</span>i <span class="token operator">==</span> pos<span class="token punctuation">)</span> <span class="token function">DisplaySegWithHide</span><span class="token punctuation">(</span>hour <span class="token operator">%</span> <span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">else</span> <span class="token function">ShowNumber</span><span class="token punctuation">(</span>hour <span class="token operator">%</span> <span class="token number">10</span> <span class="token punctuation">,</span> i<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">break</span><span class="token punctuation">;</span>
      <span class="token keyword">case</span> <span class="token number">2</span><span class="token operator">:</span> 
        <span class="token keyword">if</span><span class="token punctuation">(</span>i <span class="token operator">==</span> pos<span class="token punctuation">)</span> <span class="token function">DisplaySegWithHide</span><span class="token punctuation">(</span>min <span class="token operator">/</span> <span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">else</span> <span class="token function">ShowNumber</span><span class="token punctuation">(</span>min <span class="token operator">/</span> <span class="token number">10</span><span class="token punctuation">,</span> i<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">break</span><span class="token punctuation">;</span>
      <span class="token keyword">case</span> <span class="token number">3</span><span class="token operator">:</span> 
        <span class="token keyword">if</span><span class="token punctuation">(</span>i <span class="token operator">==</span> pos<span class="token punctuation">)</span> <span class="token function">DisplaySegWithHide</span><span class="token punctuation">(</span>min <span class="token operator">%</span> <span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">else</span> <span class="token function">ShowNumber</span><span class="token punctuation">(</span>min <span class="token operator">%</span> <span class="token number">10</span><span class="token punctuation">,</span> i<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">break</span><span class="token punctuation">;</span>
      <span class="token keyword">case</span> <span class="token number">4</span><span class="token operator">:</span> 
        <span class="token keyword">if</span><span class="token punctuation">(</span>i <span class="token operator">==</span> pos<span class="token punctuation">)</span> <span class="token function">DisplaySegWithHide</span><span class="token punctuation">(</span>sec <span class="token operator">/</span> <span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">else</span> <span class="token function">ShowNumber</span><span class="token punctuation">(</span>sec <span class="token operator">/</span> <span class="token number">10</span><span class="token punctuation">,</span> i<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">break</span><span class="token punctuation">;</span>
      <span class="token keyword">case</span> <span class="token number">5</span><span class="token operator">:</span> 
        <span class="token keyword">if</span><span class="token punctuation">(</span>i <span class="token operator">==</span> pos<span class="token punctuation">)</span> <span class="token function">DisplaySegWithHide</span><span class="token punctuation">(</span>sec <span class="token operator">%</span> <span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">else</span> <span class="token function">ShowNumber</span><span class="token punctuation">(</span>sec <span class="token operator">%</span> <span class="token number">10</span><span class="token punctuation">,</span> i<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">break</span><span class="token punctuation">;</span>
      <span class="token keyword">default</span><span class="token operator">:</span>
        <span class="token keyword">break</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span>
		<span class="token function">HAL_Delay</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">/* USER CODE END 0 */</span>

<span class="token comment">/**
  * @brief  The application entry point.
  * @retval int
  */</span>
<span class="token keyword">int</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token keyword">void</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
  <span class="token comment">/* USER CODE BEGIN 1 */</span>

  <span class="token comment">/* USER CODE END 1 */</span>

  <span class="token comment">/* MCU Configuration--------------------------------------------------------*/</span>

  <span class="token comment">/* Reset of all peripherals, Initializes the Flash interface and the Systick. */</span>
  <span class="token function">HAL_Init</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token comment">/* USER CODE BEGIN Init */</span>

  <span class="token comment">/* USER CODE END Init */</span>

  <span class="token comment">/* Configure the system clock */</span>
  <span class="token function">SystemClock_Config</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token comment">/* USER CODE BEGIN SysInit */</span>

  <span class="token comment">/* USER CODE END SysInit */</span>

  <span class="token comment">/* Initialize all configured peripherals */</span>
  <span class="token function">MX_GPIO_Init</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token function">MX_TIM2_Init</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token function">MX_USART1_UART_Init</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token function">MX_USB_DEVICE_Init</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token function">MX_TIM1_Init</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token function">MX_TIM3_Init</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token comment">/* Initialize interrupts */</span>
  <span class="token function">MX_NVIC_Init</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token comment">/* USER CODE BEGIN 2 */</span>
  <span class="token function">HAL_TIM_Base_Start_IT</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>htim1<span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//启动定时�????+启动定时器中�????</span>
  <span class="token comment">/* USER CODE END 2 */</span>

  <span class="token comment">/* Infinite loop */</span>
  <span class="token comment">/* USER CODE BEGIN WHILE */</span>
  <span class="token comment">// int num = 0;</span>
  <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
  <span class="token punctuation">{</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span>isManaging<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token function">DrinklePos</span><span class="token punctuation">(</span>TimeTemp<span class="token punctuation">,</span> PosSelceted<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token comment">// showTime(TimeTemp);</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">else</span> <span class="token function">showTime</span><span class="token punctuation">(</span>time<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token class-name">uint16_t</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>i <span class="token operator">&lt;</span> <span class="token number">2</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span> <span class="token function">ShowDot</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token keyword">else</span> <span class="token function">ShowDot</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token function">HAL_Delay</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// HAL_Delay(3);</span>
    <span class="token comment">/* USER CODE END WHILE */</span>

    <span class="token comment">/* USER CODE BEGIN 3 */</span>
  <span class="token punctuation">}</span>
  <span class="token comment">/* USER CODE END 3 */</span>
<span class="token punctuation">}</span>

<span class="token comment">/**
  * @brief System Clock Configuration
  * @retval None
  */</span>
<span class="token keyword">void</span> <span class="token function">SystemClock_Config</span><span class="token punctuation">(</span><span class="token keyword">void</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
  RCC_OscInitTypeDef RCC_OscInitStruct <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token number">0</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
  RCC_ClkInitTypeDef RCC_ClkInitStruct <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token number">0</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
  RCC_PeriphCLKInitTypeDef PeriphClkInit <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token number">0</span><span class="token punctuation">}</span><span class="token punctuation">;</span>

  <span class="token comment">/** Initializes the RCC Oscillators according to the specified parameters
  * in the RCC_OscInitTypeDef structure.
  */</span>
  RCC_OscInitStruct<span class="token punctuation">.</span>OscillatorType <span class="token operator">=</span> RCC_OSCILLATORTYPE_HSE<span class="token punctuation">;</span>
  RCC_OscInitStruct<span class="token punctuation">.</span>HSEState <span class="token operator">=</span> RCC_HSE_ON<span class="token punctuation">;</span>
  RCC_OscInitStruct<span class="token punctuation">.</span>HSEPredivValue <span class="token operator">=</span> RCC_HSE_PREDIV_DIV1<span class="token punctuation">;</span>
  RCC_OscInitStruct<span class="token punctuation">.</span>HSIState <span class="token operator">=</span> RCC_HSI_ON<span class="token punctuation">;</span>
  RCC_OscInitStruct<span class="token punctuation">.</span>PLL<span class="token punctuation">.</span>PLLState <span class="token operator">=</span> RCC_PLL_ON<span class="token punctuation">;</span>
  RCC_OscInitStruct<span class="token punctuation">.</span>PLL<span class="token punctuation">.</span>PLLSource <span class="token operator">=</span> RCC_PLLSOURCE_HSE<span class="token punctuation">;</span>
  RCC_OscInitStruct<span class="token punctuation">.</span>PLL<span class="token punctuation">.</span>PLLMUL <span class="token operator">=</span> RCC_PLL_MUL9<span class="token punctuation">;</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">HAL_RCC_OscConfig</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>RCC_OscInitStruct<span class="token punctuation">)</span> <span class="token operator">!=</span> HAL_OK<span class="token punctuation">)</span>
  <span class="token punctuation">{</span>
    <span class="token function">Error_Handler</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token comment">/** Initializes the CPU, AHB and APB buses clocks
  */</span>
  RCC_ClkInitStruct<span class="token punctuation">.</span>ClockType <span class="token operator">=</span> RCC_CLOCKTYPE_HCLK<span class="token operator">|</span>RCC_CLOCKTYPE_SYSCLK
                              <span class="token operator">|</span>RCC_CLOCKTYPE_PCLK1<span class="token operator">|</span>RCC_CLOCKTYPE_PCLK2<span class="token punctuation">;</span>
  RCC_ClkInitStruct<span class="token punctuation">.</span>SYSCLKSource <span class="token operator">=</span> RCC_SYSCLKSOURCE_PLLCLK<span class="token punctuation">;</span>
  RCC_ClkInitStruct<span class="token punctuation">.</span>AHBCLKDivider <span class="token operator">=</span> RCC_SYSCLK_DIV1<span class="token punctuation">;</span>
  RCC_ClkInitStruct<span class="token punctuation">.</span>APB1CLKDivider <span class="token operator">=</span> RCC_HCLK_DIV2<span class="token punctuation">;</span>
  RCC_ClkInitStruct<span class="token punctuation">.</span>APB2CLKDivider <span class="token operator">=</span> RCC_HCLK_DIV1<span class="token punctuation">;</span>

  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">HAL_RCC_ClockConfig</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>RCC_ClkInitStruct<span class="token punctuation">,</span> FLASH_LATENCY_2<span class="token punctuation">)</span> <span class="token operator">!=</span> HAL_OK<span class="token punctuation">)</span>
  <span class="token punctuation">{</span>
    <span class="token function">Error_Handler</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  PeriphClkInit<span class="token punctuation">.</span>PeriphClockSelection <span class="token operator">=</span> RCC_PERIPHCLK_USB<span class="token punctuation">;</span>
  PeriphClkInit<span class="token punctuation">.</span>UsbClockSelection <span class="token operator">=</span> RCC_USBCLKSOURCE_PLL_DIV1_5<span class="token punctuation">;</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">HAL_RCCEx_PeriphCLKConfig</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>PeriphClkInit<span class="token punctuation">)</span> <span class="token operator">!=</span> HAL_OK<span class="token punctuation">)</span>
  <span class="token punctuation">{</span>
    <span class="token function">Error_Handler</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">/**
  * @brief NVIC Configuration.
  * @retval None
  */</span>
<span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">MX_NVIC_Init</span><span class="token punctuation">(</span><span class="token keyword">void</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
  <span class="token comment">/* EXTI1_IRQn interrupt configuration */</span>
  <span class="token function">HAL_NVIC_SetPriority</span><span class="token punctuation">(</span>EXTI1_IRQn<span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token function">HAL_NVIC_EnableIRQ</span><span class="token punctuation">(</span>EXTI1_IRQn<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token comment">/* EXTI2_IRQn interrupt configuration */</span>
  <span class="token function">HAL_NVIC_SetPriority</span><span class="token punctuation">(</span>EXTI2_IRQn<span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token function">HAL_NVIC_EnableIRQ</span><span class="token punctuation">(</span>EXTI2_IRQn<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token comment">/* EXTI3_IRQn interrupt configuration */</span>
  <span class="token function">HAL_NVIC_SetPriority</span><span class="token punctuation">(</span>EXTI3_IRQn<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token function">HAL_NVIC_EnableIRQ</span><span class="token punctuation">(</span>EXTI3_IRQn<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token comment">/* USB_HP_CAN1_TX_IRQn interrupt configuration */</span>
  <span class="token function">HAL_NVIC_SetPriority</span><span class="token punctuation">(</span>USB_HP_CAN1_TX_IRQn<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token function">HAL_NVIC_EnableIRQ</span><span class="token punctuation">(</span>USB_HP_CAN1_TX_IRQn<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token comment">/* USB_LP_CAN1_RX0_IRQn interrupt configuration */</span>
  <span class="token function">HAL_NVIC_SetPriority</span><span class="token punctuation">(</span>USB_LP_CAN1_RX0_IRQn<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token function">HAL_NVIC_EnableIRQ</span><span class="token punctuation">(</span>USB_LP_CAN1_RX0_IRQn<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token comment">/* TIM1_UP_IRQn interrupt configuration */</span>
  <span class="token function">HAL_NVIC_SetPriority</span><span class="token punctuation">(</span>TIM1_UP_IRQn<span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token function">HAL_NVIC_EnableIRQ</span><span class="token punctuation">(</span>TIM1_UP_IRQn<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token comment">/* TIM2_IRQn interrupt configuration */</span>
  <span class="token function">HAL_NVIC_SetPriority</span><span class="token punctuation">(</span>TIM2_IRQn<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token function">HAL_NVIC_EnableIRQ</span><span class="token punctuation">(</span>TIM2_IRQn<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token comment">/* TIM3_IRQn interrupt configuration */</span>
  <span class="token function">HAL_NVIC_SetPriority</span><span class="token punctuation">(</span>TIM3_IRQn<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token function">HAL_NVIC_EnableIRQ</span><span class="token punctuation">(</span>TIM3_IRQn<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token comment">/* EXTI15_10_IRQn interrupt configuration */</span>
  <span class="token function">HAL_NVIC_SetPriority</span><span class="token punctuation">(</span>EXTI15_10_IRQn<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token function">HAL_NVIC_EnableIRQ</span><span class="token punctuation">(</span>EXTI15_10_IRQn<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">/* USER CODE BEGIN 4 */</span>

<span class="token comment">/* USER CODE END 4 */</span>

<span class="token comment">/**
  * @brief  This function is executed in case of error occurrence.
  * @retval None
  */</span>
<span class="token keyword">void</span> <span class="token function">Error_Handler</span><span class="token punctuation">(</span><span class="token keyword">void</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
  <span class="token comment">/* USER CODE BEGIN Error_Handler_Debug */</span>
  <span class="token comment">/* User can add his own implementation to report the HAL error return state */</span>
  <span class="token function">__disable_irq</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
  <span class="token punctuation">{</span>
  <span class="token punctuation">}</span>
  <span class="token comment">/* USER CODE END Error_Handler_Debug */</span>
<span class="token punctuation">}</span>

<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">ifdef</span>  <span class="token expression">USE_FULL_ASSERT</span></span>
<span class="token comment">/**
  * @brief  Reports the name of the source file and the source line number
  *         where the assert_param error has occurred.
  * @param  file: pointer to the source file name
  * @param  line: assert_param error line source number
  * @retval None
  */</span>
<span class="token keyword">void</span> <span class="token function">assert_failed</span><span class="token punctuation">(</span><span class="token class-name">uint8_t</span> <span class="token operator">*</span>file<span class="token punctuation">,</span> <span class="token class-name">uint32_t</span> line<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
  <span class="token comment">/* USER CODE BEGIN 6 */</span>
  <span class="token comment">/* User can add his own implementation to report the file name and line number,
     ex: printf("Wrong parameters value: file %s on line %d\r\n", file, line) */</span>
  <span class="token comment">/* USER CODE END 6 */</span>
<span class="token punctuation">}</span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">endif</span> <span class="token comment">/* USE_FULL_ASSERT */</span></span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="seg7-c" tabindex="-1"><a class="header-anchor" href="#seg7-c" aria-hidden="true">#</a> seg7.c:</h2>
<div class="language-c ext-c line-numbers-mode"><pre v-pre class="language-c"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;stdio.h></span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">"main.h"</span></span>

<span class="token keyword">void</span> <span class="token function">ShowNumber</span><span class="token punctuation">(</span> <span class="token keyword">unsigned</span> <span class="token keyword">char</span> num <span class="token punctuation">,</span> <span class="token keyword">unsigned</span> <span class="token keyword">char</span> pos <span class="token punctuation">)</span>
<span class="token punctuation">{</span>
	<span class="token keyword">switch</span><span class="token punctuation">(</span> num <span class="token punctuation">)</span>
	<span class="token punctuation">{</span>
		<span class="token keyword">case</span> <span class="token number">0</span> <span class="token operator">:</span>
			<span class="token function">HAL_GPIO_WritePin</span><span class="token punctuation">(</span> SEG_A_GPIO_Port<span class="token punctuation">,</span> SEG_A_Pin<span class="token punctuation">,</span> GPIO_PIN_RESET<span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token function">HAL_GPIO_WritePin</span><span class="token punctuation">(</span> SEG_B_GPIO_Port<span class="token punctuation">,</span> SEG_B_Pin<span class="token punctuation">,</span> GPIO_PIN_RESET<span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token function">HAL_GPIO_WritePin</span><span class="token punctuation">(</span> SEG_C_GPIO_Port<span class="token punctuation">,</span> SEG_C_Pin<span class="token punctuation">,</span> GPIO_PIN_RESET<span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token function">HAL_GPIO_WritePin</span><span class="token punctuation">(</span> SEG_D_GPIO_Port<span class="token punctuation">,</span> SEG_D_Pin<span class="token punctuation">,</span> GPIO_PIN_RESET<span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token function">HAL_GPIO_WritePin</span><span class="token punctuation">(</span> SEG_E_GPIO_Port<span class="token punctuation">,</span> SEG_E_Pin<span class="token punctuation">,</span> GPIO_PIN_RESET<span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token function">HAL_GPIO_WritePin</span><span class="token punctuation">(</span> SEG_F_GPIO_Port<span class="token punctuation">,</span> SEG_F_Pin<span class="token punctuation">,</span> GPIO_PIN_RESET<span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token function">HAL_GPIO_WritePin</span><span class="token punctuation">(</span> SEG_G_GPIO_Port<span class="token punctuation">,</span> SEG_G_Pin<span class="token punctuation">,</span> GPIO_PIN_SET<span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token keyword">break</span> <span class="token punctuation">;</span>
		<span class="token keyword">case</span> <span class="token number">1</span> <span class="token operator">:</span>
			<span class="token function">HAL_GPIO_WritePin</span><span class="token punctuation">(</span> SEG_A_GPIO_Port<span class="token punctuation">,</span> SEG_A_Pin<span class="token punctuation">,</span> GPIO_PIN_SET<span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token function">HAL_GPIO_WritePin</span><span class="token punctuation">(</span> SEG_B_GPIO_Port<span class="token punctuation">,</span> SEG_B_Pin<span class="token punctuation">,</span> GPIO_PIN_RESET<span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token function">HAL_GPIO_WritePin</span><span class="token punctuation">(</span> SEG_C_GPIO_Port<span class="token punctuation">,</span> SEG_C_Pin<span class="token punctuation">,</span> GPIO_PIN_RESET<span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token function">HAL_GPIO_WritePin</span><span class="token punctuation">(</span> SEG_D_GPIO_Port<span class="token punctuation">,</span> SEG_D_Pin<span class="token punctuation">,</span> GPIO_PIN_SET<span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token function">HAL_GPIO_WritePin</span><span class="token punctuation">(</span> SEG_E_GPIO_Port<span class="token punctuation">,</span> SEG_E_Pin<span class="token punctuation">,</span> GPIO_PIN_SET<span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token function">HAL_GPIO_WritePin</span><span class="token punctuation">(</span> SEG_F_GPIO_Port<span class="token punctuation">,</span> SEG_F_Pin<span class="token punctuation">,</span> GPIO_PIN_SET<span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token function">HAL_GPIO_WritePin</span><span class="token punctuation">(</span> SEG_G_GPIO_Port<span class="token punctuation">,</span> SEG_G_Pin<span class="token punctuation">,</span> GPIO_PIN_SET<span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token keyword">break</span> <span class="token punctuation">;</span>
		<span class="token keyword">case</span> <span class="token number">2</span> <span class="token operator">:</span>
			<span class="token function">HAL_GPIO_WritePin</span><span class="token punctuation">(</span> SEG_A_GPIO_Port<span class="token punctuation">,</span> SEG_A_Pin<span class="token punctuation">,</span> GPIO_PIN_RESET<span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token function">HAL_GPIO_WritePin</span><span class="token punctuation">(</span> SEG_B_GPIO_Port<span class="token punctuation">,</span> SEG_B_Pin<span class="token punctuation">,</span> GPIO_PIN_RESET<span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token function">HAL_GPIO_WritePin</span><span class="token punctuation">(</span> SEG_C_GPIO_Port<span class="token punctuation">,</span> SEG_C_Pin<span class="token punctuation">,</span> GPIO_PIN_SET<span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token function">HAL_GPIO_WritePin</span><span class="token punctuation">(</span> SEG_D_GPIO_Port<span class="token punctuation">,</span> SEG_D_Pin<span class="token punctuation">,</span> GPIO_PIN_RESET<span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token function">HAL_GPIO_WritePin</span><span class="token punctuation">(</span> SEG_E_GPIO_Port<span class="token punctuation">,</span> SEG_E_Pin<span class="token punctuation">,</span> GPIO_PIN_RESET<span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token function">HAL_GPIO_WritePin</span><span class="token punctuation">(</span> SEG_F_GPIO_Port<span class="token punctuation">,</span> SEG_F_Pin<span class="token punctuation">,</span> GPIO_PIN_SET<span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token function">HAL_GPIO_WritePin</span><span class="token punctuation">(</span> SEG_G_GPIO_Port<span class="token punctuation">,</span> SEG_G_Pin<span class="token punctuation">,</span> GPIO_PIN_RESET<span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token keyword">break</span> <span class="token punctuation">;</span>
		<span class="token keyword">case</span> <span class="token number">3</span> <span class="token operator">:</span>
			<span class="token function">HAL_GPIO_WritePin</span><span class="token punctuation">(</span> SEG_A_GPIO_Port<span class="token punctuation">,</span> SEG_A_Pin<span class="token punctuation">,</span> GPIO_PIN_RESET<span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token function">HAL_GPIO_WritePin</span><span class="token punctuation">(</span> SEG_B_GPIO_Port<span class="token punctuation">,</span> SEG_B_Pin<span class="token punctuation">,</span> GPIO_PIN_RESET<span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token function">HAL_GPIO_WritePin</span><span class="token punctuation">(</span> SEG_C_GPIO_Port<span class="token punctuation">,</span> SEG_C_Pin<span class="token punctuation">,</span> GPIO_PIN_RESET<span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token function">HAL_GPIO_WritePin</span><span class="token punctuation">(</span> SEG_D_GPIO_Port<span class="token punctuation">,</span> SEG_D_Pin<span class="token punctuation">,</span> GPIO_PIN_RESET<span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token function">HAL_GPIO_WritePin</span><span class="token punctuation">(</span> SEG_E_GPIO_Port<span class="token punctuation">,</span> SEG_E_Pin<span class="token punctuation">,</span> GPIO_PIN_SET<span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token function">HAL_GPIO_WritePin</span><span class="token punctuation">(</span> SEG_F_GPIO_Port<span class="token punctuation">,</span> SEG_F_Pin<span class="token punctuation">,</span> GPIO_PIN_SET<span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token function">HAL_GPIO_WritePin</span><span class="token punctuation">(</span> SEG_G_GPIO_Port<span class="token punctuation">,</span> SEG_G_Pin<span class="token punctuation">,</span> GPIO_PIN_RESET<span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token keyword">break</span> <span class="token punctuation">;</span>
		<span class="token keyword">case</span> <span class="token number">4</span> <span class="token operator">:</span>
			<span class="token function">HAL_GPIO_WritePin</span><span class="token punctuation">(</span> SEG_A_GPIO_Port<span class="token punctuation">,</span> SEG_A_Pin<span class="token punctuation">,</span> GPIO_PIN_SET<span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token function">HAL_GPIO_WritePin</span><span class="token punctuation">(</span> SEG_B_GPIO_Port<span class="token punctuation">,</span> SEG_B_Pin<span class="token punctuation">,</span> GPIO_PIN_RESET<span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token function">HAL_GPIO_WritePin</span><span class="token punctuation">(</span> SEG_C_GPIO_Port<span class="token punctuation">,</span> SEG_C_Pin<span class="token punctuation">,</span> GPIO_PIN_RESET<span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token function">HAL_GPIO_WritePin</span><span class="token punctuation">(</span> SEG_D_GPIO_Port<span class="token punctuation">,</span> SEG_D_Pin<span class="token punctuation">,</span> GPIO_PIN_SET<span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token function">HAL_GPIO_WritePin</span><span class="token punctuation">(</span> SEG_E_GPIO_Port<span class="token punctuation">,</span> SEG_E_Pin<span class="token punctuation">,</span> GPIO_PIN_SET<span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token function">HAL_GPIO_WritePin</span><span class="token punctuation">(</span> SEG_F_GPIO_Port<span class="token punctuation">,</span> SEG_F_Pin<span class="token punctuation">,</span> GPIO_PIN_RESET<span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token function">HAL_GPIO_WritePin</span><span class="token punctuation">(</span> SEG_G_GPIO_Port<span class="token punctuation">,</span> SEG_G_Pin<span class="token punctuation">,</span> GPIO_PIN_RESET<span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token keyword">break</span> <span class="token punctuation">;</span>
		<span class="token keyword">case</span> <span class="token number">5</span> <span class="token operator">:</span>
			<span class="token function">HAL_GPIO_WritePin</span><span class="token punctuation">(</span> SEG_A_GPIO_Port<span class="token punctuation">,</span> SEG_A_Pin<span class="token punctuation">,</span> GPIO_PIN_RESET<span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token function">HAL_GPIO_WritePin</span><span class="token punctuation">(</span> SEG_B_GPIO_Port<span class="token punctuation">,</span> SEG_B_Pin<span class="token punctuation">,</span> GPIO_PIN_SET<span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token function">HAL_GPIO_WritePin</span><span class="token punctuation">(</span> SEG_C_GPIO_Port<span class="token punctuation">,</span> SEG_C_Pin<span class="token punctuation">,</span> GPIO_PIN_RESET<span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token function">HAL_GPIO_WritePin</span><span class="token punctuation">(</span> SEG_D_GPIO_Port<span class="token punctuation">,</span> SEG_D_Pin<span class="token punctuation">,</span> GPIO_PIN_RESET<span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token function">HAL_GPIO_WritePin</span><span class="token punctuation">(</span> SEG_E_GPIO_Port<span class="token punctuation">,</span> SEG_E_Pin<span class="token punctuation">,</span> GPIO_PIN_SET<span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token function">HAL_GPIO_WritePin</span><span class="token punctuation">(</span> SEG_F_GPIO_Port<span class="token punctuation">,</span> SEG_F_Pin<span class="token punctuation">,</span> GPIO_PIN_RESET<span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token function">HAL_GPIO_WritePin</span><span class="token punctuation">(</span> SEG_G_GPIO_Port<span class="token punctuation">,</span> SEG_G_Pin<span class="token punctuation">,</span> GPIO_PIN_RESET<span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token keyword">break</span> <span class="token punctuation">;</span>
		<span class="token keyword">case</span> <span class="token number">6</span> <span class="token operator">:</span>
			<span class="token function">HAL_GPIO_WritePin</span><span class="token punctuation">(</span> SEG_A_GPIO_Port<span class="token punctuation">,</span> SEG_A_Pin<span class="token punctuation">,</span> GPIO_PIN_RESET<span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token function">HAL_GPIO_WritePin</span><span class="token punctuation">(</span> SEG_B_GPIO_Port<span class="token punctuation">,</span> SEG_B_Pin<span class="token punctuation">,</span> GPIO_PIN_SET<span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token function">HAL_GPIO_WritePin</span><span class="token punctuation">(</span> SEG_C_GPIO_Port<span class="token punctuation">,</span> SEG_C_Pin<span class="token punctuation">,</span> GPIO_PIN_RESET<span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token function">HAL_GPIO_WritePin</span><span class="token punctuation">(</span> SEG_D_GPIO_Port<span class="token punctuation">,</span> SEG_D_Pin<span class="token punctuation">,</span> GPIO_PIN_RESET<span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token function">HAL_GPIO_WritePin</span><span class="token punctuation">(</span> SEG_E_GPIO_Port<span class="token punctuation">,</span> SEG_E_Pin<span class="token punctuation">,</span> GPIO_PIN_RESET<span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token function">HAL_GPIO_WritePin</span><span class="token punctuation">(</span> SEG_F_GPIO_Port<span class="token punctuation">,</span> SEG_F_Pin<span class="token punctuation">,</span> GPIO_PIN_RESET<span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token function">HAL_GPIO_WritePin</span><span class="token punctuation">(</span> SEG_G_GPIO_Port<span class="token punctuation">,</span> SEG_G_Pin<span class="token punctuation">,</span> GPIO_PIN_RESET<span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token keyword">break</span> <span class="token punctuation">;</span>
		<span class="token keyword">case</span> <span class="token number">7</span> <span class="token operator">:</span>
			<span class="token function">HAL_GPIO_WritePin</span><span class="token punctuation">(</span> SEG_A_GPIO_Port<span class="token punctuation">,</span> SEG_A_Pin<span class="token punctuation">,</span> GPIO_PIN_RESET<span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token function">HAL_GPIO_WritePin</span><span class="token punctuation">(</span> SEG_B_GPIO_Port<span class="token punctuation">,</span> SEG_B_Pin<span class="token punctuation">,</span> GPIO_PIN_RESET<span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token function">HAL_GPIO_WritePin</span><span class="token punctuation">(</span> SEG_C_GPIO_Port<span class="token punctuation">,</span> SEG_C_Pin<span class="token punctuation">,</span> GPIO_PIN_RESET<span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token function">HAL_GPIO_WritePin</span><span class="token punctuation">(</span> SEG_D_GPIO_Port<span class="token punctuation">,</span> SEG_D_Pin<span class="token punctuation">,</span> GPIO_PIN_SET<span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token function">HAL_GPIO_WritePin</span><span class="token punctuation">(</span> SEG_E_GPIO_Port<span class="token punctuation">,</span> SEG_E_Pin<span class="token punctuation">,</span> GPIO_PIN_SET<span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token function">HAL_GPIO_WritePin</span><span class="token punctuation">(</span> SEG_F_GPIO_Port<span class="token punctuation">,</span> SEG_F_Pin<span class="token punctuation">,</span> GPIO_PIN_SET<span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token function">HAL_GPIO_WritePin</span><span class="token punctuation">(</span> SEG_G_GPIO_Port<span class="token punctuation">,</span> SEG_G_Pin<span class="token punctuation">,</span> GPIO_PIN_SET<span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token keyword">break</span> <span class="token punctuation">;</span>
		<span class="token keyword">case</span> <span class="token number">8</span> <span class="token operator">:</span>
			<span class="token function">HAL_GPIO_WritePin</span><span class="token punctuation">(</span> SEG_A_GPIO_Port<span class="token punctuation">,</span> SEG_A_Pin<span class="token punctuation">,</span> GPIO_PIN_RESET<span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token function">HAL_GPIO_WritePin</span><span class="token punctuation">(</span> SEG_B_GPIO_Port<span class="token punctuation">,</span> SEG_B_Pin<span class="token punctuation">,</span> GPIO_PIN_RESET<span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token function">HAL_GPIO_WritePin</span><span class="token punctuation">(</span> SEG_C_GPIO_Port<span class="token punctuation">,</span> SEG_C_Pin<span class="token punctuation">,</span> GPIO_PIN_RESET<span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token function">HAL_GPIO_WritePin</span><span class="token punctuation">(</span> SEG_D_GPIO_Port<span class="token punctuation">,</span> SEG_D_Pin<span class="token punctuation">,</span> GPIO_PIN_RESET<span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token function">HAL_GPIO_WritePin</span><span class="token punctuation">(</span> SEG_E_GPIO_Port<span class="token punctuation">,</span> SEG_E_Pin<span class="token punctuation">,</span> GPIO_PIN_RESET<span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token function">HAL_GPIO_WritePin</span><span class="token punctuation">(</span> SEG_F_GPIO_Port<span class="token punctuation">,</span> SEG_F_Pin<span class="token punctuation">,</span> GPIO_PIN_RESET<span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token function">HAL_GPIO_WritePin</span><span class="token punctuation">(</span> SEG_G_GPIO_Port<span class="token punctuation">,</span> SEG_G_Pin<span class="token punctuation">,</span> GPIO_PIN_RESET<span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token keyword">break</span> <span class="token punctuation">;</span>
		<span class="token keyword">case</span> <span class="token number">9</span> <span class="token operator">:</span>
			<span class="token function">HAL_GPIO_WritePin</span><span class="token punctuation">(</span> SEG_A_GPIO_Port<span class="token punctuation">,</span> SEG_A_Pin<span class="token punctuation">,</span> GPIO_PIN_RESET<span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token function">HAL_GPIO_WritePin</span><span class="token punctuation">(</span> SEG_B_GPIO_Port<span class="token punctuation">,</span> SEG_B_Pin<span class="token punctuation">,</span> GPIO_PIN_RESET<span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token function">HAL_GPIO_WritePin</span><span class="token punctuation">(</span> SEG_C_GPIO_Port<span class="token punctuation">,</span> SEG_C_Pin<span class="token punctuation">,</span> GPIO_PIN_RESET<span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token function">HAL_GPIO_WritePin</span><span class="token punctuation">(</span> SEG_D_GPIO_Port<span class="token punctuation">,</span> SEG_D_Pin<span class="token punctuation">,</span> GPIO_PIN_RESET<span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token function">HAL_GPIO_WritePin</span><span class="token punctuation">(</span> SEG_E_GPIO_Port<span class="token punctuation">,</span> SEG_E_Pin<span class="token punctuation">,</span> GPIO_PIN_SET<span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token function">HAL_GPIO_WritePin</span><span class="token punctuation">(</span> SEG_F_GPIO_Port<span class="token punctuation">,</span> SEG_F_Pin<span class="token punctuation">,</span> GPIO_PIN_RESET<span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token function">HAL_GPIO_WritePin</span><span class="token punctuation">(</span> SEG_G_GPIO_Port<span class="token punctuation">,</span> SEG_G_Pin<span class="token punctuation">,</span> GPIO_PIN_RESET<span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token keyword">break</span> <span class="token punctuation">;</span>
		<span class="token keyword">default</span> <span class="token operator">:</span>
			<span class="token function">HAL_GPIO_WritePin</span><span class="token punctuation">(</span> SEG_A_GPIO_Port<span class="token punctuation">,</span> SEG_A_Pin<span class="token punctuation">,</span> GPIO_PIN_SET<span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token function">HAL_GPIO_WritePin</span><span class="token punctuation">(</span> SEG_B_GPIO_Port<span class="token punctuation">,</span> SEG_B_Pin<span class="token punctuation">,</span> GPIO_PIN_SET<span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token function">HAL_GPIO_WritePin</span><span class="token punctuation">(</span> SEG_C_GPIO_Port<span class="token punctuation">,</span> SEG_C_Pin<span class="token punctuation">,</span> GPIO_PIN_SET<span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token function">HAL_GPIO_WritePin</span><span class="token punctuation">(</span> SEG_D_GPIO_Port<span class="token punctuation">,</span> SEG_D_Pin<span class="token punctuation">,</span> GPIO_PIN_SET<span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token function">HAL_GPIO_WritePin</span><span class="token punctuation">(</span> SEG_E_GPIO_Port<span class="token punctuation">,</span> SEG_E_Pin<span class="token punctuation">,</span> GPIO_PIN_SET<span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token function">HAL_GPIO_WritePin</span><span class="token punctuation">(</span> SEG_F_GPIO_Port<span class="token punctuation">,</span> SEG_F_Pin<span class="token punctuation">,</span> GPIO_PIN_SET<span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token function">HAL_GPIO_WritePin</span><span class="token punctuation">(</span> SEG_G_GPIO_Port<span class="token punctuation">,</span> SEG_G_Pin<span class="token punctuation">,</span> GPIO_PIN_SET<span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token keyword">break</span> <span class="token punctuation">;</span>		
	<span class="token punctuation">}</span>
	
	<span class="token function">HAL_GPIO_WritePin</span><span class="token punctuation">(</span> SEG_P_GPIO_Port<span class="token punctuation">,</span> SEG_P_Pin<span class="token punctuation">,</span> GPIO_PIN_SET<span class="token punctuation">)</span><span class="token punctuation">;</span>
	
	<span class="token keyword">switch</span><span class="token punctuation">(</span> pos <span class="token punctuation">)</span>
	<span class="token punctuation">{</span>
		<span class="token keyword">case</span> <span class="token number">0</span> <span class="token operator">:</span>
			<span class="token function">HAL_GPIO_WritePin</span><span class="token punctuation">(</span> EN0_GPIO_Port<span class="token punctuation">,</span> EN0_Pin<span class="token punctuation">,</span> GPIO_PIN_RESET<span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token function">HAL_GPIO_WritePin</span><span class="token punctuation">(</span> EN1_GPIO_Port<span class="token punctuation">,</span> EN1_Pin<span class="token punctuation">,</span> GPIO_PIN_SET<span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token function">HAL_GPIO_WritePin</span><span class="token punctuation">(</span> EN2_GPIO_Port<span class="token punctuation">,</span> EN2_Pin<span class="token punctuation">,</span> GPIO_PIN_SET<span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token function">HAL_GPIO_WritePin</span><span class="token punctuation">(</span> EN3_GPIO_Port<span class="token punctuation">,</span> EN3_Pin<span class="token punctuation">,</span> GPIO_PIN_SET<span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token function">HAL_GPIO_WritePin</span><span class="token punctuation">(</span> EN4_GPIO_Port<span class="token punctuation">,</span> EN4_Pin<span class="token punctuation">,</span> GPIO_PIN_SET<span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token function">HAL_GPIO_WritePin</span><span class="token punctuation">(</span> EN5_GPIO_Port<span class="token punctuation">,</span> EN5_Pin<span class="token punctuation">,</span> GPIO_PIN_SET<span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token keyword">break</span> <span class="token punctuation">;</span>
		<span class="token keyword">case</span> <span class="token number">1</span> <span class="token operator">:</span>
			<span class="token function">HAL_GPIO_WritePin</span><span class="token punctuation">(</span> EN0_GPIO_Port<span class="token punctuation">,</span> EN0_Pin<span class="token punctuation">,</span> GPIO_PIN_SET<span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token function">HAL_GPIO_WritePin</span><span class="token punctuation">(</span> EN1_GPIO_Port<span class="token punctuation">,</span> EN1_Pin<span class="token punctuation">,</span> GPIO_PIN_RESET<span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token function">HAL_GPIO_WritePin</span><span class="token punctuation">(</span> EN2_GPIO_Port<span class="token punctuation">,</span> EN2_Pin<span class="token punctuation">,</span> GPIO_PIN_SET<span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token function">HAL_GPIO_WritePin</span><span class="token punctuation">(</span> EN3_GPIO_Port<span class="token punctuation">,</span> EN3_Pin<span class="token punctuation">,</span> GPIO_PIN_SET<span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token function">HAL_GPIO_WritePin</span><span class="token punctuation">(</span> EN4_GPIO_Port<span class="token punctuation">,</span> EN4_Pin<span class="token punctuation">,</span> GPIO_PIN_SET<span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token function">HAL_GPIO_WritePin</span><span class="token punctuation">(</span> EN5_GPIO_Port<span class="token punctuation">,</span> EN5_Pin<span class="token punctuation">,</span> GPIO_PIN_SET<span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token keyword">break</span> <span class="token punctuation">;</span>
		<span class="token keyword">case</span> <span class="token number">2</span> <span class="token operator">:</span>
			<span class="token function">HAL_GPIO_WritePin</span><span class="token punctuation">(</span> EN0_GPIO_Port<span class="token punctuation">,</span> EN0_Pin<span class="token punctuation">,</span> GPIO_PIN_SET<span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token function">HAL_GPIO_WritePin</span><span class="token punctuation">(</span> EN1_GPIO_Port<span class="token punctuation">,</span> EN1_Pin<span class="token punctuation">,</span> GPIO_PIN_SET<span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token function">HAL_GPIO_WritePin</span><span class="token punctuation">(</span> EN2_GPIO_Port<span class="token punctuation">,</span> EN2_Pin<span class="token punctuation">,</span> GPIO_PIN_RESET<span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token function">HAL_GPIO_WritePin</span><span class="token punctuation">(</span> EN3_GPIO_Port<span class="token punctuation">,</span> EN3_Pin<span class="token punctuation">,</span> GPIO_PIN_SET<span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token function">HAL_GPIO_WritePin</span><span class="token punctuation">(</span> EN4_GPIO_Port<span class="token punctuation">,</span> EN4_Pin<span class="token punctuation">,</span> GPIO_PIN_SET<span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token function">HAL_GPIO_WritePin</span><span class="token punctuation">(</span> EN5_GPIO_Port<span class="token punctuation">,</span> EN5_Pin<span class="token punctuation">,</span> GPIO_PIN_SET<span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token keyword">break</span> <span class="token punctuation">;</span>
		<span class="token keyword">case</span> <span class="token number">3</span> <span class="token operator">:</span>
			<span class="token function">HAL_GPIO_WritePin</span><span class="token punctuation">(</span> EN0_GPIO_Port<span class="token punctuation">,</span> EN0_Pin<span class="token punctuation">,</span> GPIO_PIN_SET<span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token function">HAL_GPIO_WritePin</span><span class="token punctuation">(</span> EN1_GPIO_Port<span class="token punctuation">,</span> EN1_Pin<span class="token punctuation">,</span> GPIO_PIN_SET<span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token function">HAL_GPIO_WritePin</span><span class="token punctuation">(</span> EN2_GPIO_Port<span class="token punctuation">,</span> EN2_Pin<span class="token punctuation">,</span> GPIO_PIN_SET<span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token function">HAL_GPIO_WritePin</span><span class="token punctuation">(</span> EN3_GPIO_Port<span class="token punctuation">,</span> EN3_Pin<span class="token punctuation">,</span> GPIO_PIN_RESET<span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token function">HAL_GPIO_WritePin</span><span class="token punctuation">(</span> EN4_GPIO_Port<span class="token punctuation">,</span> EN4_Pin<span class="token punctuation">,</span> GPIO_PIN_SET<span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token function">HAL_GPIO_WritePin</span><span class="token punctuation">(</span> EN5_GPIO_Port<span class="token punctuation">,</span> EN5_Pin<span class="token punctuation">,</span> GPIO_PIN_SET<span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token keyword">break</span> <span class="token punctuation">;</span>
		<span class="token keyword">case</span> <span class="token number">4</span> <span class="token operator">:</span>
			<span class="token function">HAL_GPIO_WritePin</span><span class="token punctuation">(</span> EN0_GPIO_Port<span class="token punctuation">,</span> EN0_Pin<span class="token punctuation">,</span> GPIO_PIN_SET<span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token function">HAL_GPIO_WritePin</span><span class="token punctuation">(</span> EN1_GPIO_Port<span class="token punctuation">,</span> EN1_Pin<span class="token punctuation">,</span> GPIO_PIN_SET<span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token function">HAL_GPIO_WritePin</span><span class="token punctuation">(</span> EN2_GPIO_Port<span class="token punctuation">,</span> EN2_Pin<span class="token punctuation">,</span> GPIO_PIN_SET<span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token function">HAL_GPIO_WritePin</span><span class="token punctuation">(</span> EN3_GPIO_Port<span class="token punctuation">,</span> EN3_Pin<span class="token punctuation">,</span> GPIO_PIN_SET<span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token function">HAL_GPIO_WritePin</span><span class="token punctuation">(</span> EN4_GPIO_Port<span class="token punctuation">,</span> EN4_Pin<span class="token punctuation">,</span> GPIO_PIN_RESET<span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token function">HAL_GPIO_WritePin</span><span class="token punctuation">(</span> EN5_GPIO_Port<span class="token punctuation">,</span> EN5_Pin<span class="token punctuation">,</span> GPIO_PIN_SET<span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token keyword">break</span> <span class="token punctuation">;</span>
		<span class="token keyword">case</span> <span class="token number">5</span> <span class="token operator">:</span>
			<span class="token function">HAL_GPIO_WritePin</span><span class="token punctuation">(</span> EN0_GPIO_Port<span class="token punctuation">,</span> EN0_Pin<span class="token punctuation">,</span> GPIO_PIN_SET<span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token function">HAL_GPIO_WritePin</span><span class="token punctuation">(</span> EN1_GPIO_Port<span class="token punctuation">,</span> EN1_Pin<span class="token punctuation">,</span> GPIO_PIN_SET<span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token function">HAL_GPIO_WritePin</span><span class="token punctuation">(</span> EN2_GPIO_Port<span class="token punctuation">,</span> EN2_Pin<span class="token punctuation">,</span> GPIO_PIN_SET<span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token function">HAL_GPIO_WritePin</span><span class="token punctuation">(</span> EN3_GPIO_Port<span class="token punctuation">,</span> EN3_Pin<span class="token punctuation">,</span> GPIO_PIN_SET<span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token function">HAL_GPIO_WritePin</span><span class="token punctuation">(</span> EN4_GPIO_Port<span class="token punctuation">,</span> EN4_Pin<span class="token punctuation">,</span> GPIO_PIN_SET<span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token function">HAL_GPIO_WritePin</span><span class="token punctuation">(</span> EN5_GPIO_Port<span class="token punctuation">,</span> EN5_Pin<span class="token punctuation">,</span> GPIO_PIN_RESET<span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token keyword">break</span> <span class="token punctuation">;</span>
		<span class="token keyword">default</span> <span class="token operator">:</span>
			<span class="token function">HAL_GPIO_WritePin</span><span class="token punctuation">(</span> EN0_GPIO_Port<span class="token punctuation">,</span> EN0_Pin<span class="token punctuation">,</span> GPIO_PIN_SET<span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token function">HAL_GPIO_WritePin</span><span class="token punctuation">(</span> EN1_GPIO_Port<span class="token punctuation">,</span> EN1_Pin<span class="token punctuation">,</span> GPIO_PIN_SET<span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token function">HAL_GPIO_WritePin</span><span class="token punctuation">(</span> EN2_GPIO_Port<span class="token punctuation">,</span> EN2_Pin<span class="token punctuation">,</span> GPIO_PIN_SET<span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token function">HAL_GPIO_WritePin</span><span class="token punctuation">(</span> EN3_GPIO_Port<span class="token punctuation">,</span> EN3_Pin<span class="token punctuation">,</span> GPIO_PIN_SET<span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token function">HAL_GPIO_WritePin</span><span class="token punctuation">(</span> EN4_GPIO_Port<span class="token punctuation">,</span> EN4_Pin<span class="token punctuation">,</span> GPIO_PIN_SET<span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token function">HAL_GPIO_WritePin</span><span class="token punctuation">(</span> EN5_GPIO_Port<span class="token punctuation">,</span> EN5_Pin<span class="token punctuation">,</span> GPIO_PIN_SET<span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token keyword">break</span> <span class="token punctuation">;</span>		
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>


<span class="token comment">/* 
pos: 需要亮小数点的位置
 */</span>
<span class="token keyword">void</span> <span class="token function">ShowDot</span><span class="token punctuation">(</span><span class="token class-name">uint16_t</span> pos<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">switch</span> <span class="token punctuation">(</span>pos<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">case</span> <span class="token number">1</span><span class="token operator">:</span> <span class="token punctuation">{</span>
			<span class="token function">HAL_GPIO_WritePin</span><span class="token punctuation">(</span> EN0_GPIO_Port<span class="token punctuation">,</span> EN0_Pin<span class="token punctuation">,</span> GPIO_PIN_SET<span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token function">HAL_GPIO_WritePin</span><span class="token punctuation">(</span> EN1_GPIO_Port<span class="token punctuation">,</span> EN1_Pin<span class="token punctuation">,</span> GPIO_PIN_RESET<span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token function">HAL_GPIO_WritePin</span><span class="token punctuation">(</span> EN2_GPIO_Port<span class="token punctuation">,</span> EN2_Pin<span class="token punctuation">,</span> GPIO_PIN_SET<span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token function">HAL_GPIO_WritePin</span><span class="token punctuation">(</span> EN3_GPIO_Port<span class="token punctuation">,</span> EN3_Pin<span class="token punctuation">,</span> GPIO_PIN_SET<span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token function">HAL_GPIO_WritePin</span><span class="token punctuation">(</span> EN4_GPIO_Port<span class="token punctuation">,</span> EN4_Pin<span class="token punctuation">,</span> GPIO_PIN_SET<span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token function">HAL_GPIO_WritePin</span><span class="token punctuation">(</span> EN5_GPIO_Port<span class="token punctuation">,</span> EN5_Pin<span class="token punctuation">,</span> GPIO_PIN_SET<span class="token punctuation">)</span><span class="token punctuation">;</span>

			<span class="token function">HAL_GPIO_WritePin</span><span class="token punctuation">(</span> SEG_A_GPIO_Port<span class="token punctuation">,</span> SEG_A_Pin<span class="token punctuation">,</span> GPIO_PIN_SET<span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token function">HAL_GPIO_WritePin</span><span class="token punctuation">(</span> SEG_B_GPIO_Port<span class="token punctuation">,</span> SEG_B_Pin<span class="token punctuation">,</span> GPIO_PIN_SET<span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token function">HAL_GPIO_WritePin</span><span class="token punctuation">(</span> SEG_C_GPIO_Port<span class="token punctuation">,</span> SEG_C_Pin<span class="token punctuation">,</span> GPIO_PIN_SET<span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token function">HAL_GPIO_WritePin</span><span class="token punctuation">(</span> SEG_D_GPIO_Port<span class="token punctuation">,</span> SEG_D_Pin<span class="token punctuation">,</span> GPIO_PIN_SET<span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token function">HAL_GPIO_WritePin</span><span class="token punctuation">(</span> SEG_E_GPIO_Port<span class="token punctuation">,</span> SEG_E_Pin<span class="token punctuation">,</span> GPIO_PIN_SET<span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token function">HAL_GPIO_WritePin</span><span class="token punctuation">(</span> SEG_F_GPIO_Port<span class="token punctuation">,</span> SEG_F_Pin<span class="token punctuation">,</span> GPIO_PIN_SET<span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token function">HAL_GPIO_WritePin</span><span class="token punctuation">(</span> SEG_G_GPIO_Port<span class="token punctuation">,</span> SEG_G_Pin<span class="token punctuation">,</span> GPIO_PIN_SET<span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token function">HAL_GPIO_WritePin</span><span class="token punctuation">(</span> SEG_P_GPIO_Port<span class="token punctuation">,</span> SEG_P_Pin<span class="token punctuation">,</span> GPIO_PIN_RESET<span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token keyword">break</span> <span class="token punctuation">;</span>
		<span class="token punctuation">}</span>
		<span class="token keyword">case</span> <span class="token number">3</span><span class="token operator">:</span> <span class="token punctuation">{</span>
			<span class="token function">HAL_GPIO_WritePin</span><span class="token punctuation">(</span> EN0_GPIO_Port<span class="token punctuation">,</span> EN0_Pin<span class="token punctuation">,</span> GPIO_PIN_SET<span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token function">HAL_GPIO_WritePin</span><span class="token punctuation">(</span> EN1_GPIO_Port<span class="token punctuation">,</span> EN1_Pin<span class="token punctuation">,</span> GPIO_PIN_SET<span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token function">HAL_GPIO_WritePin</span><span class="token punctuation">(</span> EN2_GPIO_Port<span class="token punctuation">,</span> EN2_Pin<span class="token punctuation">,</span> GPIO_PIN_SET<span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token function">HAL_GPIO_WritePin</span><span class="token punctuation">(</span> EN3_GPIO_Port<span class="token punctuation">,</span> EN3_Pin<span class="token punctuation">,</span> GPIO_PIN_RESET<span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token function">HAL_GPIO_WritePin</span><span class="token punctuation">(</span> EN4_GPIO_Port<span class="token punctuation">,</span> EN4_Pin<span class="token punctuation">,</span> GPIO_PIN_SET<span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token function">HAL_GPIO_WritePin</span><span class="token punctuation">(</span> EN5_GPIO_Port<span class="token punctuation">,</span> EN5_Pin<span class="token punctuation">,</span> GPIO_PIN_SET<span class="token punctuation">)</span><span class="token punctuation">;</span>

			<span class="token function">HAL_GPIO_WritePin</span><span class="token punctuation">(</span> SEG_A_GPIO_Port<span class="token punctuation">,</span> SEG_A_Pin<span class="token punctuation">,</span> GPIO_PIN_SET<span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token function">HAL_GPIO_WritePin</span><span class="token punctuation">(</span> SEG_B_GPIO_Port<span class="token punctuation">,</span> SEG_B_Pin<span class="token punctuation">,</span> GPIO_PIN_SET<span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token function">HAL_GPIO_WritePin</span><span class="token punctuation">(</span> SEG_C_GPIO_Port<span class="token punctuation">,</span> SEG_C_Pin<span class="token punctuation">,</span> GPIO_PIN_SET<span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token function">HAL_GPIO_WritePin</span><span class="token punctuation">(</span> SEG_D_GPIO_Port<span class="token punctuation">,</span> SEG_D_Pin<span class="token punctuation">,</span> GPIO_PIN_SET<span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token function">HAL_GPIO_WritePin</span><span class="token punctuation">(</span> SEG_E_GPIO_Port<span class="token punctuation">,</span> SEG_E_Pin<span class="token punctuation">,</span> GPIO_PIN_SET<span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token function">HAL_GPIO_WritePin</span><span class="token punctuation">(</span> SEG_F_GPIO_Port<span class="token punctuation">,</span> SEG_F_Pin<span class="token punctuation">,</span> GPIO_PIN_SET<span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token function">HAL_GPIO_WritePin</span><span class="token punctuation">(</span> SEG_G_GPIO_Port<span class="token punctuation">,</span> SEG_G_Pin<span class="token punctuation">,</span> GPIO_PIN_SET<span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token function">HAL_GPIO_WritePin</span><span class="token punctuation">(</span> SEG_P_GPIO_Port<span class="token punctuation">,</span> SEG_P_Pin<span class="token punctuation">,</span> GPIO_PIN_RESET<span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token keyword">break</span> <span class="token punctuation">;</span>
		<span class="token punctuation">}</span>
		<span class="token keyword">default</span><span class="token operator">:</span>
		<span class="token keyword">break</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">void</span> <span class="token function">showTime</span><span class="token punctuation">(</span><span class="token class-name">uint32_t</span> f_time<span class="token punctuation">)</span> 
<span class="token punctuation">{</span>
	<span class="token class-name">uint16_t</span> hour <span class="token operator">=</span> f_time <span class="token operator">/</span> <span class="token number">3600</span><span class="token punctuation">,</span> min <span class="token operator">=</span> f_time <span class="token operator">%</span> <span class="token number">3600</span> <span class="token operator">/</span> <span class="token number">60</span><span class="token punctuation">,</span> sec <span class="token operator">=</span> f_time <span class="token operator">%</span> <span class="token number">60</span><span class="token punctuation">;</span>
	<span class="token comment">// if(hour > 24) hour = 0;</span>
	<span class="token comment">// else if(min >= 60) min = 0;</span>
	<span class="token comment">// if(sec >= 60) sec = 0;</span>
	<span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>i <span class="token operator">&lt;</span> <span class="token number">6</span><span class="token punctuation">;</span>i<span class="token operator">++</span><span class="token punctuation">)</span>
	<span class="token punctuation">{</span>
		<span class="token keyword">switch</span> <span class="token punctuation">(</span>i<span class="token punctuation">)</span>
		<span class="token punctuation">{</span>
			<span class="token keyword">case</span> <span class="token number">0</span><span class="token operator">:</span> <span class="token function">ShowNumber</span><span class="token punctuation">(</span>hour <span class="token operator">/</span> <span class="token number">10</span><span class="token punctuation">,</span> i<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token keyword">break</span><span class="token punctuation">;</span>
			<span class="token keyword">case</span> <span class="token number">1</span><span class="token operator">:</span> <span class="token function">ShowNumber</span><span class="token punctuation">(</span>hour <span class="token operator">%</span> <span class="token number">10</span><span class="token punctuation">,</span> i<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token keyword">break</span><span class="token punctuation">;</span>
			<span class="token keyword">case</span> <span class="token number">2</span><span class="token operator">:</span> <span class="token function">ShowNumber</span><span class="token punctuation">(</span>min <span class="token operator">/</span> <span class="token number">10</span><span class="token punctuation">,</span> i<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token keyword">break</span><span class="token punctuation">;</span>
			<span class="token keyword">case</span> <span class="token number">3</span><span class="token operator">:</span> <span class="token function">ShowNumber</span><span class="token punctuation">(</span>min <span class="token operator">%</span> <span class="token number">10</span><span class="token punctuation">,</span> i<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token keyword">break</span><span class="token punctuation">;</span>
			<span class="token keyword">case</span> <span class="token number">4</span><span class="token operator">:</span> <span class="token function">ShowNumber</span><span class="token punctuation">(</span>sec <span class="token operator">/</span> <span class="token number">10</span><span class="token punctuation">,</span> i<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token keyword">break</span><span class="token punctuation">;</span>
			<span class="token keyword">case</span> <span class="token number">5</span><span class="token operator">:</span> <span class="token function">ShowNumber</span><span class="token punctuation">(</span>sec <span class="token operator">%</span> <span class="token number">10</span><span class="token punctuation">,</span> i<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token keyword">break</span><span class="token punctuation">;</span>
			<span class="token keyword">default</span><span class="token operator">:</span>
				<span class="token keyword">break</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span>
		<span class="token function">HAL_Delay</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


