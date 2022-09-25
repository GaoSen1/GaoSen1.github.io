<template><div><div class="custom-container tip">
<p class="custom-container-title">提示</p>
<p>该实验报告分为两部分：</p>
<ul>
<li>
<p>①组合逻辑电路</p>
<ul>
<li>
<p><strong>四选一数据选择器</strong>的VHDL设计、编译、仿真</p>
<p>功能要求：根据地址端的不同取值选择不同的数据端数据到输出端。</p>
</li>
<li>
<p>数码管显示译码器的VHDL设计、编译、仿真</p>
<p>功能要求：在实验板上的一个数码管上实现&quot;0~F&quot;的译码显示。</p>
</li>
</ul>
</li>
<li>
<p>②时序逻辑电路</p>
<ul>
<li>
<p>分频器的VHDL设计、编译、仿真</p>
<p>功能要求：分频系数为10,分频输出信号占空比为50%</p>
</li>
<li>
<p>加计数器的VHDL设计、编译、仿真</p>
<p>功能要求：带有异步复位功能,进行8421码十进制循环加计数。</p>
</li>
<li>
<p>利用已有的设计,用元件例化的方式或多个进程的方式,完成一个秒计时器的设计、编译、仿真</p>
<p>功能要求:在实验板上的一个数码管上实现“0”-“9”的自动循环显示,每秒切换一个显示数字;显示可以手动复位为“0”；</p>
<p>给定条件:实验板输入时钟为10Hz</p>
</li>
</ul>
</li>
</ul>
</div>
<h1 id="组合逻辑电路" tabindex="-1"><a class="header-anchor" href="#组合逻辑电路" aria-hidden="true">#</a> 组合逻辑电路</h1>
<h2 id="_1-四选一数据选择器" tabindex="-1"><a class="header-anchor" href="#_1-四选一数据选择器" aria-hidden="true">#</a> 1. 四选一数据选择器</h2>
<ul>
<li>
<h3 id="真值表" tabindex="-1"><a class="header-anchor" href="#真值表" aria-hidden="true">#</a> 真值表：</h3>
<table>
<thead>
<tr>
<th style="text-align:center">d(3)~d(0)</th>
<th style="text-align:center">sel(1)</th>
<th style="text-align:center">sel(0)</th>
<th style="text-align:center">y</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">x</td>
<td style="text-align:center">0</td>
<td style="text-align:center">0</td>
<td style="text-align:center">d(0)</td>
</tr>
<tr>
<td style="text-align:center">x</td>
<td style="text-align:center">0</td>
<td style="text-align:center">1</td>
<td style="text-align:center">d(1)</td>
</tr>
<tr>
<td style="text-align:center">x</td>
<td style="text-align:center">1</td>
<td style="text-align:center">0</td>
<td style="text-align:center">d(2)</td>
</tr>
<tr>
<td style="text-align:center">x</td>
<td style="text-align:center">1</td>
<td style="text-align:center">1</td>
<td style="text-align:center">d(3)</td>
</tr>
</tbody>
</table>
</li>
<li>
<h3 id="外观图" tabindex="-1"><a class="header-anchor" href="#外观图" aria-hidden="true">#</a> 外观图：</h3>
</li>
</ul>
<p><img src="@source/zh/课程实验/数电实验/assets/select.png" alt="img" loading="lazy"></p>
<ul>
<li>
<h3 id="vhdl代码" tabindex="-1"><a class="header-anchor" href="#vhdl代码" aria-hidden="true">#</a> vhdl代码：</h3>
</li>
</ul>
<div class="language-vhdl ext-vhdl line-numbers-mode"><pre v-pre class="language-vhdl"><code><span class="token keyword">LIBRARY</span> ieee<span class="token punctuation">;</span>
<span class="token keyword">USE</span> ieee<span class="token punctuation">.</span>std_logic_1164<span class="token punctuation">.</span><span class="token keyword">ALL</span><span class="token punctuation">;</span>

<span class="token keyword">ENTITY</span> D201GS10_DATASELECTOR <span class="token keyword">IS</span>
<span class="token keyword">PORT</span><span class="token punctuation">(</span>
	d<span class="token punctuation">:</span><span class="token keyword">IN</span> <span class="token function">STD_LOGIC_VECTOR</span><span class="token punctuation">(</span><span class="token number">3</span> <span class="token keyword">DOWNTO</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	sel<span class="token punctuation">:</span><span class="token keyword">IN</span> <span class="token function">STD_LOGIC_VECTOR</span><span class="token punctuation">(</span><span class="token number">1</span> <span class="token keyword">DOWNTO</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	y<span class="token punctuation">:</span><span class="token keyword">OUT</span> STD_LOGIC
	<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">END</span> <span class="token keyword">ENTITY</span> D201GS10_DATASELECTOR<span class="token punctuation">;</span>	

<span class="token keyword">ARCHITECTURE</span> a <span class="token keyword">OF</span> D201GS10_DATASELECTOR <span class="token keyword">IS</span>
<span class="token keyword">BEGIN</span>
	<span class="token keyword">process</span><span class="token punctuation">(</span>d<span class="token punctuation">,</span>sel<span class="token punctuation">)</span>
	<span class="token keyword">begin</span>
		<span class="token keyword">if</span> sel<span class="token operator">=</span><span class="token vhdl-vectors number">"00"</span> <span class="token keyword">then</span> y<span class="token operator">&lt;=</span><span class="token function">d</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token keyword">elsif</span> sel<span class="token operator">=</span><span class="token vhdl-vectors number">"01"</span> <span class="token keyword">then</span> y<span class="token operator">&lt;=</span><span class="token function">d</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token keyword">elsif</span> sel<span class="token operator">=</span><span class="token vhdl-vectors number">"10"</span> <span class="token keyword">then</span> y<span class="token operator">&lt;=</span><span class="token function">d</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token keyword">elsif</span> sel<span class="token operator">=</span><span class="token vhdl-vectors number">"11"</span> <span class="token keyword">then</span> y<span class="token operator">&lt;=</span><span class="token function">d</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token keyword">else</span> y<span class="token operator">&lt;=</span><span class="token number">'Z'</span><span class="token punctuation">;</span>
		<span class="token keyword">end</span> <span class="token keyword">if</span><span class="token punctuation">;</span>
	<span class="token keyword">end</span> <span class="token keyword">process</span><span class="token punctuation">;</span>
<span class="token keyword">END</span> a<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>
<h3 id="一些工程文件截图" tabindex="-1"><a class="header-anchor" href="#一些工程文件截图" aria-hidden="true">#</a> 一些工程文件截图：</h3>
</li>
</ul>
<p><img src="@source/zh/课程实验/数电实验/时序电路的设计与实现.assets/image-20220512214226037.png" alt="image-20220512214226037" loading="lazy"></p>
<p><img src="@source/zh/课程实验/数电实验/时序电路的设计与实现.assets/image-20220512214259757.png" alt="image-20220512214259757" loading="lazy"></p>
<p><img src="@source/zh/课程实验/数电实验/时序电路的设计与实现.assets/image-20220512214340140.png" alt="image-20220512214340140" loading="lazy"></p>
<p><img src="@source/zh/课程实验/数电实验/时序电路的设计与实现.assets/image-20220512214350690.png" alt="image-20220512214350690" loading="lazy"></p>
<ul>
<li>
<h3 id="结果分析" tabindex="-1"><a class="header-anchor" href="#结果分析" aria-hidden="true">#</a> 结果分析：</h3>
<p>根据仿真波形，地址端sel=00时，输出y=d(0)；sel=01时，y=d(1)；sel=10时，y=d(2)；sel=11时，y=d(3).与真值表符合，实现了四选一数据选择。</p>
</li>
</ul>
<h2 id="_2-数码管显示译码器" tabindex="-1"><a class="header-anchor" href="#_2-数码管显示译码器" aria-hidden="true">#</a> 2. 数码管显示译码器</h2>
<ul>
<li>
<h3 id="真值表-1" tabindex="-1"><a class="header-anchor" href="#真值表-1" aria-hidden="true">#</a> 真值表：</h3>
</li>
</ul>
<p><img src="@source/zh/课程实验/数电实验/时序电路的设计与实现.assets/image-20220512200422669.png" alt="image-20220512200422669" loading="lazy"></p>
<ul>
<li>
<h3 id="外观图-1" tabindex="-1"><a class="header-anchor" href="#外观图-1" aria-hidden="true">#</a> 外观图:</h3>
</li>
</ul>
<p><img src="@source/zh/课程实验/数电实验/assets/seg.png" alt="seg" loading="lazy"></p>
<ul>
<li>
<h3 id="vhdl代码-1" tabindex="-1"><a class="header-anchor" href="#vhdl代码-1" aria-hidden="true">#</a> vhdl代码：</h3>
</li>
</ul>
<div class="language-vhdl ext-vhdl line-numbers-mode"><pre v-pre class="language-vhdl"><code><span class="token keyword">LIBRARY</span> ieee<span class="token punctuation">;</span>
<span class="token keyword">USE</span> ieee<span class="token punctuation">.</span>std_logic_1164<span class="token punctuation">.</span><span class="token keyword">ALL</span><span class="token punctuation">;</span>

<span class="token keyword">ENTITY</span> D201GS10_7SEG <span class="token keyword">IS</span>
<span class="token keyword">PORT</span><span class="token punctuation">(</span>
	d<span class="token punctuation">:</span><span class="token keyword">IN</span> <span class="token function">STD_LOGIC_VECTOR</span><span class="token punctuation">(</span><span class="token number">3</span> <span class="token keyword">DOWNTO</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	cat<span class="token punctuation">:</span><span class="token keyword">OUT</span> <span class="token function">STD_LOGIC_VECTOR</span><span class="token punctuation">(</span><span class="token number">7</span> <span class="token keyword">DOWNTO</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	seg<span class="token punctuation">:</span><span class="token keyword">OUT</span> <span class="token function">STD_LOGIC_VECTOR</span><span class="token punctuation">(</span><span class="token number">7</span> <span class="token keyword">DOWNTO</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">END</span> <span class="token keyword">ENTITY</span> D201GS10_7SEG<span class="token punctuation">;</span>	

<span class="token keyword">ARCHITECTURE</span> seg7_1_arch <span class="token keyword">OF</span> D201GS10_7SEG <span class="token keyword">IS</span>
<span class="token keyword">BEGIN</span>
	cat<span class="token operator">&lt;=</span><span class="token vhdl-vectors number">"11111110"</span><span class="token punctuation">;</span>
	<span class="token keyword">PROCESS</span><span class="token punctuation">(</span>d<span class="token punctuation">)</span>
	<span class="token keyword">BEGIN</span>
		<span class="token keyword">CASE</span> d <span class="token keyword">IS</span>
			<span class="token keyword">WHEN</span> <span class="token vhdl-vectors number">"0000"</span><span class="token operator">=</span><span class="token operator">></span> seg <span class="token operator">&lt;=</span><span class="token vhdl-vectors number">"11111100"</span><span class="token punctuation">;</span><span class="token comment">--0</span>
			<span class="token keyword">WHEN</span> <span class="token vhdl-vectors number">"0001"</span><span class="token operator">=</span><span class="token operator">></span> seg <span class="token operator">&lt;=</span><span class="token vhdl-vectors number">"01100000"</span><span class="token punctuation">;</span><span class="token comment">--1</span>
			<span class="token keyword">WHEN</span> <span class="token vhdl-vectors number">"0010"</span><span class="token operator">=</span><span class="token operator">></span> seg <span class="token operator">&lt;=</span><span class="token vhdl-vectors number">"11011010"</span><span class="token punctuation">;</span><span class="token comment">--2</span>
			<span class="token keyword">WHEN</span> <span class="token vhdl-vectors number">"0011"</span><span class="token operator">=</span><span class="token operator">></span> seg <span class="token operator">&lt;=</span><span class="token vhdl-vectors number">"11110010"</span><span class="token punctuation">;</span><span class="token comment">--3</span>
			<span class="token keyword">WHEN</span> <span class="token vhdl-vectors number">"0100"</span><span class="token operator">=</span><span class="token operator">></span> seg <span class="token operator">&lt;=</span><span class="token vhdl-vectors number">"01100110"</span><span class="token punctuation">;</span><span class="token comment">--4</span>
			<span class="token keyword">WHEN</span> <span class="token vhdl-vectors number">"0101"</span><span class="token operator">=</span><span class="token operator">></span> seg <span class="token operator">&lt;=</span><span class="token vhdl-vectors number">"10110110"</span><span class="token punctuation">;</span><span class="token comment">--5</span>
			<span class="token keyword">WHEN</span> <span class="token vhdl-vectors number">"0110"</span><span class="token operator">=</span><span class="token operator">></span> seg <span class="token operator">&lt;=</span><span class="token vhdl-vectors number">"10111110"</span><span class="token punctuation">;</span><span class="token comment">--6</span>
			<span class="token keyword">WHEN</span> <span class="token vhdl-vectors number">"0111"</span><span class="token operator">=</span><span class="token operator">></span> seg <span class="token operator">&lt;=</span><span class="token vhdl-vectors number">"11100000"</span><span class="token punctuation">;</span><span class="token comment">--7</span>
			<span class="token keyword">WHEN</span> <span class="token vhdl-vectors number">"1000"</span><span class="token operator">=</span><span class="token operator">></span> seg <span class="token operator">&lt;=</span><span class="token vhdl-vectors number">"11111110"</span><span class="token punctuation">;</span><span class="token comment">--8</span>
			<span class="token keyword">WHEN</span> <span class="token vhdl-vectors number">"1001"</span><span class="token operator">=</span><span class="token operator">></span> seg <span class="token operator">&lt;=</span><span class="token vhdl-vectors number">"11110110"</span><span class="token punctuation">;</span><span class="token comment">--9</span>
			<span class="token keyword">WHEN</span> <span class="token keyword">OTHERS</span><span class="token operator">=</span><span class="token operator">></span> seg <span class="token operator">&lt;=</span><span class="token vhdl-vectors number">"00000000"</span><span class="token punctuation">;</span>
		<span class="token keyword">END</span> <span class="token keyword">CASE</span><span class="token punctuation">;</span>
	<span class="token keyword">END</span> <span class="token keyword">PROCESS</span><span class="token punctuation">;</span>
<span class="token keyword">END</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>
<h3 id="一些工程文件截图-1" tabindex="-1"><a class="header-anchor" href="#一些工程文件截图-1" aria-hidden="true">#</a> 一些工程文件截图：</h3>
</li>
</ul>
<p>vhdl：<img src="@source/zh/课程实验/数电实验/assets/SEG_vhdl.png" alt="vhdl" loading="lazy"></p>
<p>vhdl编译成功：<img src="@source/zh/课程实验/数电实验/assets/SEG_vhdl编译成功.png" alt="vhdl compile" loading="lazy"></p>
<p>波形仿真成功：<img src="@source/zh/课程实验/数电实验/assets/SEG_波形仿真成功.png" alt="img" loading="lazy"></p>
<p>仿真波形：<img src="@source/zh/课程实验/数电实验/时序电路的设计与实现.assets/SEG_波形仿真.png" alt="img" loading="lazy"></p>
<ul>
<li>
<h3 id="结果分析-1" tabindex="-1"><a class="header-anchor" href="#结果分析-1" aria-hidden="true">#</a> 结果分析：</h3>
<p>根据仿真波形，输入d=0时，输出段码seg=11111100，此时数码管显示“0”；d=1时，seg=01100000，此时数码管显示“1”.......忽略延迟，结果与真值表符合，实现了十进制数0~9译码到数码管显示的功能。</p>
</li>
</ul>
<h1 id="时序逻辑电路" tabindex="-1"><a class="header-anchor" href="#时序逻辑电路" aria-hidden="true">#</a> 时序逻辑电路</h1>
<h2 id="_3-分频器" tabindex="-1"><a class="header-anchor" href="#_3-分频器" aria-hidden="true">#</a> 3. 分频器</h2>
<ul>
<li>
<h3 id="外观图-2" tabindex="-1"><a class="header-anchor" href="#外观图-2" aria-hidden="true">#</a> 外观图：</h3>
</li>
</ul>
<p><img src="@source/zh/课程实验/数电实验/assets/分频器.png" alt="分频器" loading="lazy"></p>
<ul>
<li>
<h3 id="vhdl代码-2" tabindex="-1"><a class="header-anchor" href="#vhdl代码-2" aria-hidden="true">#</a> vhdl代码:</h3>
</li>
</ul>
<div class="language-vhdl ext-vhdl line-numbers-mode"><pre v-pre class="language-vhdl"><code><span class="token keyword">library</span> ieee<span class="token punctuation">;</span>
<span class="token keyword">use</span> ieee<span class="token punctuation">.</span>std_logic_1164<span class="token punctuation">.</span><span class="token keyword">all</span><span class="token punctuation">;</span>
<span class="token keyword">use</span> ieee<span class="token punctuation">.</span>std_logic_unsigned<span class="token punctuation">.</span><span class="token keyword">all</span><span class="token punctuation">;</span>

<span class="token keyword">entity</span> D201GS10_DIVIDER <span class="token keyword">is</span>
	<span class="token keyword">port</span><span class="token punctuation">(</span>
		clk_10k<span class="token punctuation">:</span> <span class="token keyword">IN</span> std_logic<span class="token punctuation">;</span>
		clear<span class="token punctuation">:</span> <span class="token keyword">IN</span> std_logic<span class="token punctuation">;</span>
		clk_1k<span class="token punctuation">:</span> <span class="token keyword">OUT</span> std_logic<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">end</span> D201GS10_DIVIDER<span class="token punctuation">;</span>

<span class="token keyword">architecture</span> a <span class="token keyword">of</span> D201GS10_DIVIDER <span class="token keyword">is</span>
	<span class="token keyword">signal</span> tmp<span class="token punctuation">:</span> integer <span class="token keyword">range</span> <span class="token number">0</span> <span class="token keyword">to</span> <span class="token number">4</span><span class="token punctuation">;</span>
	<span class="token keyword">signal</span> clktmp<span class="token punctuation">:</span> std_logic<span class="token punctuation">;</span>
	<span class="token keyword">begin</span>
		<span class="token keyword">process</span><span class="token punctuation">(</span>clear<span class="token punctuation">,</span> clk_10k<span class="token punctuation">)</span>
		<span class="token keyword">begin</span>
			<span class="token keyword">if</span> clear<span class="token operator">=</span><span class="token number">'0'</span> <span class="token keyword">then</span> tmp <span class="token operator">&lt;=</span> <span class="token number">0</span><span class="token punctuation">;</span>clktmp <span class="token operator">&lt;=</span> <span class="token number">'0'</span><span class="token punctuation">;</span>
			<span class="token keyword">elsif</span> clk_10k<span class="token attribute attr-name">'event</span> <span class="token operator">and</span> clk_10k<span class="token operator">=</span><span class="token number">'1'</span> <span class="token keyword">then</span>
				<span class="token keyword">if</span> tmp <span class="token operator">=</span> <span class="token number">4</span> <span class="token keyword">then</span>
					tmp <span class="token operator">&lt;=</span> <span class="token number">0</span><span class="token punctuation">;</span>clktmp <span class="token operator">&lt;=</span> <span class="token operator">not</span> clktmp<span class="token punctuation">;</span>
				<span class="token keyword">else</span>
					tmp <span class="token operator">&lt;=</span> tmp<span class="token operator">+</span><span class="token number">1</span><span class="token punctuation">;</span>
				<span class="token keyword">end</span> <span class="token keyword">if</span><span class="token punctuation">;</span>
			<span class="token keyword">end</span> <span class="token keyword">if</span><span class="token punctuation">;</span>
		<span class="token keyword">end</span> <span class="token keyword">process</span><span class="token punctuation">;</span>
		clk_1k <span class="token operator">&lt;=</span> clktmp<span class="token punctuation">;</span>
	<span class="token keyword">end</span> a<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>
<h3 id="一些工程文件截图-2" tabindex="-1"><a class="header-anchor" href="#一些工程文件截图-2" aria-hidden="true">#</a> 一些工程文件截图：</h3>
</li>
</ul>
<p>vhdl:</p>
<p><img src="@source/zh/课程实验/数电实验/时序电路的设计与实现.assets/image-20220513213807421.png" alt="image-20220513213807421" loading="lazy"></p>
<p>vhdl编译成功：</p>
<p><img src="@source/zh/课程实验/数电实验/时序电路的设计与实现.assets/image-20220513213852662.png" alt="image-20220513213852662" loading="lazy"></p>
<p>波形仿真成功：</p>
<p><img src="@source/zh/课程实验/数电实验/时序电路的设计与实现.assets/image-20220513214029524.png" alt="image-20220513214029524" loading="lazy"></p>
<p>仿真波形：</p>
<p><img src="@source/zh/课程实验/数电实验/时序电路的设计与实现.assets/image-20220513214053420.png" alt="image-20220513214053420" loading="lazy"></p>
<ul>
<li>
<h3 id="结果分析-2" tabindex="-1"><a class="header-anchor" href="#结果分析-2" aria-hidden="true">#</a> 结果分析</h3>
<p>根据仿真波形，clear=1时，输入信号clk_10k的周期约为100ns，输出clk_1k的周期约为+1460ns - (+460ns) = 1000ns，输出信号的频率是输入信号的1/10。clear=0时，输出恒为0。实现了一个带有异步清零功能的、分频系数为10的分频器。</p>
</li>
</ul>
<h2 id="_4-加计数器" tabindex="-1"><a class="header-anchor" href="#_4-加计数器" aria-hidden="true">#</a> 4. 加计数器</h2>
<ul>
<li>
<h3 id="外观图-3" tabindex="-1"><a class="header-anchor" href="#外观图-3" aria-hidden="true">#</a> 外观图：</h3>
</li>
</ul>
<p><img src="@source/zh/课程实验/数电实验/assets/计数器.png" alt="img" loading="lazy"></p>
<ul>
<li>
<h3 id="vhdl代码-3" tabindex="-1"><a class="header-anchor" href="#vhdl代码-3" aria-hidden="true">#</a> vhdl代码：</h3>
<div class="language-vhdl ext-vhdl line-numbers-mode"><pre v-pre class="language-vhdl"><code><span class="token keyword">library</span> ieee<span class="token punctuation">;</span>
<span class="token keyword">use</span> ieee<span class="token punctuation">.</span>std_logic_1164<span class="token punctuation">.</span><span class="token keyword">all</span><span class="token punctuation">;</span>
<span class="token keyword">use</span> ieee<span class="token punctuation">.</span>std_logic_unsigned<span class="token punctuation">.</span><span class="token keyword">all</span><span class="token punctuation">;</span>

<span class="token keyword">entity</span> D201GS10_COUNT10 <span class="token keyword">is</span>
	<span class="token keyword">port</span><span class="token punctuation">(</span>
	clk<span class="token punctuation">,</span>clear<span class="token punctuation">:</span> <span class="token keyword">IN</span> std_logic<span class="token punctuation">;</span>
	q<span class="token punctuation">:</span> <span class="token keyword">OUT</span> <span class="token function">std_logic_vector</span><span class="token punctuation">(</span><span class="token number">3</span> <span class="token keyword">downto</span> <span class="token number">0</span><span class="token punctuation">)</span>
	<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">end</span> D201GS10_COUNT10<span class="token punctuation">;</span>

<span class="token keyword">architecture</span> a <span class="token keyword">of</span> D201GS10_COUNT10 <span class="token keyword">is</span>
	<span class="token keyword">signal</span> q_temp<span class="token punctuation">:</span> <span class="token function">std_logic_vector</span><span class="token punctuation">(</span><span class="token number">3</span> <span class="token keyword">downto</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token keyword">begin</span> <span class="token keyword">process</span><span class="token punctuation">(</span>clk<span class="token punctuation">)</span>
	<span class="token keyword">begin</span>
		<span class="token keyword">if</span> clear<span class="token operator">=</span><span class="token number">'0'</span> <span class="token keyword">then</span>
			q_temp <span class="token operator">&lt;=</span> <span class="token vhdl-vectors number">"0000"</span><span class="token punctuation">;</span>
		<span class="token keyword">elsif</span><span class="token punctuation">(</span>clk<span class="token attribute attr-name">'event</span> <span class="token operator">and</span> clk<span class="token operator">=</span><span class="token number">'1'</span><span class="token punctuation">)</span> <span class="token keyword">then</span>
			<span class="token keyword">if</span> q_temp<span class="token operator">=</span><span class="token vhdl-vectors number">"1010"</span> <span class="token keyword">then</span> q_temp <span class="token operator">&lt;=</span> <span class="token vhdl-vectors number">"0000"</span><span class="token punctuation">;</span>
			<span class="token keyword">else</span> 
				q_temp <span class="token operator">&lt;=</span> q_temp<span class="token operator">+</span><span class="token number">1</span><span class="token punctuation">;</span>
			<span class="token keyword">end</span> <span class="token keyword">if</span><span class="token punctuation">;</span>
		<span class="token keyword">end</span> <span class="token keyword">if</span><span class="token punctuation">;</span>
	<span class="token keyword">end</span> <span class="token keyword">process</span><span class="token punctuation">;</span>
	q <span class="token operator">&lt;=</span> q_temp<span class="token punctuation">;</span>
	<span class="token keyword">end</span> a<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>
<h3 id="一些工程文件截图-3" tabindex="-1"><a class="header-anchor" href="#一些工程文件截图-3" aria-hidden="true">#</a> 一些工程文件截图：</h3>
<p>vhdl代码：</p>
</li>
</ul>
</li>
</ul>
<p><img src="@source/zh/课程实验/数电实验/时序电路的设计与实现.assets/image-20220513222820929.png" alt="image-20220513222820929" loading="lazy"></p>
<p>​			vhdl编译成功：</p>
<p><img src="@source/zh/课程实验/数电实验/时序电路的设计与实现.assets/image-20220513223001693.png" alt="image-20220513223001693" loading="lazy"></p>
<p>​		波形仿真成功：</p>
<p><img src="@source/zh/课程实验/数电实验/时序电路的设计与实现.assets/image-20220513223103300.png" alt="image-20220513223103300" loading="lazy"></p>
<p>​		仿真波形：</p>
<p><img src="@source/zh/课程实验/数电实验/时序电路的设计与实现.assets/image-20220513223233435.png" alt="image-20220513223233435" loading="lazy"></p>
<ul>
<li>
<p>结果分析：</p>
<p>根据仿真波形，clear=1时，计数状态q从“0000~1010”连续循环变化；clear=0时，q恒为0，实现了带有异步清零功能的、技术状态从“0000~1010”连续变化的加计数器。</p>
</li>
</ul>
<h2 id="_5-秒计时器" tabindex="-1"><a class="header-anchor" href="#_5-秒计时器" aria-hidden="true">#</a> 5. 秒计时器</h2>
<ul>
<li>
<h3 id="外观图-4" tabindex="-1"><a class="header-anchor" href="#外观图-4" aria-hidden="true">#</a> 外观图：</h3>
<p><img src="@source/zh/课程实验/数电实验/assets/计时器.png" alt="img" loading="lazy"></p>
<ul>
<li>
<h3 id="vhdl代码-4" tabindex="-1"><a class="header-anchor" href="#vhdl代码-4" aria-hidden="true">#</a> vhdl代码：</h3>
<div class="language-vhdl ext-vhdl line-numbers-mode"><pre v-pre class="language-vhdl"><code><span class="token keyword">library</span> ieee<span class="token punctuation">;</span>
<span class="token keyword">use</span> ieee<span class="token punctuation">.</span>std_logic_1164<span class="token punctuation">.</span><span class="token keyword">all</span><span class="token punctuation">;</span>
<span class="token keyword">use</span> ieee<span class="token punctuation">.</span>std_logic_unsigned<span class="token punctuation">.</span><span class="token keyword">all</span><span class="token punctuation">;</span>
<span class="token keyword">entity</span> D201GS10_TIMER <span class="token keyword">is</span>
	<span class="token keyword">port</span><span class="token punctuation">(</span>
	clk<span class="token punctuation">,</span>clear<span class="token punctuation">:</span> <span class="token keyword">IN</span> std_logic<span class="token punctuation">;</span>
	cat<span class="token punctuation">:</span><span class="token keyword">OUT</span> <span class="token function">STD_LOGIC_VECTOR</span><span class="token punctuation">(</span><span class="token number">7</span> <span class="token keyword">DOWNTO</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	seg<span class="token punctuation">:</span><span class="token keyword">OUT</span> <span class="token function">STD_LOGIC_VECTOR</span><span class="token punctuation">(</span><span class="token number">7</span> <span class="token keyword">DOWNTO</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">end</span> D201GS10_TIMER<span class="token punctuation">;</span>

<span class="token keyword">architecture</span> a <span class="token keyword">of</span> D201GS10_TIMER <span class="token keyword">is</span>
	<span class="token keyword">signal</span> q_temp<span class="token punctuation">:</span> <span class="token function">std_logic_vector</span><span class="token punctuation">(</span><span class="token number">3</span> <span class="token keyword">downto</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token keyword">signal</span> seg_temp<span class="token punctuation">:</span> <span class="token function">std_logic_vector</span><span class="token punctuation">(</span><span class="token number">7</span> <span class="token keyword">downto</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token keyword">begin</span> 
		count<span class="token punctuation">:</span><span class="token keyword">process</span><span class="token punctuation">(</span>clk<span class="token punctuation">)</span>
		<span class="token keyword">begin</span>
			<span class="token keyword">if</span> clear<span class="token operator">=</span><span class="token number">'0'</span> <span class="token keyword">then</span>
				q_temp <span class="token operator">&lt;=</span> <span class="token vhdl-vectors number">"0000"</span><span class="token punctuation">;</span>
			<span class="token keyword">elsif</span><span class="token punctuation">(</span>clk<span class="token attribute attr-name">'event</span> <span class="token operator">and</span> clk<span class="token operator">=</span><span class="token number">'1'</span><span class="token punctuation">)</span> <span class="token keyword">then</span>
				<span class="token keyword">if</span> q_temp<span class="token operator">=</span><span class="token vhdl-vectors number">"1010"</span> <span class="token keyword">then</span> q_temp <span class="token operator">&lt;=</span> <span class="token vhdl-vectors number">"0000"</span><span class="token punctuation">;</span>
				<span class="token keyword">else</span> 
					q_temp <span class="token operator">&lt;=</span> q_temp<span class="token operator">+</span><span class="token number">1</span><span class="token punctuation">;</span>
				<span class="token keyword">end</span> <span class="token keyword">if</span><span class="token punctuation">;</span>
			<span class="token keyword">end</span> <span class="token keyword">if</span><span class="token punctuation">;</span>
		<span class="token keyword">end</span> <span class="token keyword">process</span><span class="token punctuation">;</span>
		
		MYSEG<span class="token punctuation">:</span><span class="token keyword">process</span><span class="token punctuation">(</span>q_temp<span class="token punctuation">)</span>
		<span class="token keyword">begin</span>
			<span class="token keyword">CASE</span> q_temp <span class="token keyword">IS</span>
				<span class="token keyword">WHEN</span> <span class="token vhdl-vectors number">"0000"</span><span class="token operator">=</span><span class="token operator">></span> seg_temp <span class="token operator">&lt;=</span><span class="token vhdl-vectors number">"11111100"</span><span class="token punctuation">;</span><span class="token comment">--0</span>
				<span class="token keyword">WHEN</span> <span class="token vhdl-vectors number">"0001"</span><span class="token operator">=</span><span class="token operator">></span> seg_temp <span class="token operator">&lt;=</span><span class="token vhdl-vectors number">"01100000"</span><span class="token punctuation">;</span><span class="token comment">--1</span>
				<span class="token keyword">WHEN</span> <span class="token vhdl-vectors number">"0010"</span><span class="token operator">=</span><span class="token operator">></span> seg_temp <span class="token operator">&lt;=</span><span class="token vhdl-vectors number">"11011010"</span><span class="token punctuation">;</span><span class="token comment">--2</span>
				<span class="token keyword">WHEN</span> <span class="token vhdl-vectors number">"0011"</span><span class="token operator">=</span><span class="token operator">></span> seg_temp <span class="token operator">&lt;=</span><span class="token vhdl-vectors number">"11110010"</span><span class="token punctuation">;</span><span class="token comment">--3</span>
				<span class="token keyword">WHEN</span> <span class="token vhdl-vectors number">"0100"</span><span class="token operator">=</span><span class="token operator">></span> seg_temp <span class="token operator">&lt;=</span><span class="token vhdl-vectors number">"01100110"</span><span class="token punctuation">;</span><span class="token comment">--4</span>
				<span class="token keyword">WHEN</span> <span class="token vhdl-vectors number">"0101"</span><span class="token operator">=</span><span class="token operator">></span> seg_temp <span class="token operator">&lt;=</span><span class="token vhdl-vectors number">"10110110"</span><span class="token punctuation">;</span><span class="token comment">--5</span>
				<span class="token keyword">WHEN</span> <span class="token vhdl-vectors number">"0110"</span><span class="token operator">=</span><span class="token operator">></span> seg_temp <span class="token operator">&lt;=</span><span class="token vhdl-vectors number">"10111110"</span><span class="token punctuation">;</span><span class="token comment">--6</span>
				<span class="token keyword">WHEN</span> <span class="token vhdl-vectors number">"0111"</span><span class="token operator">=</span><span class="token operator">></span> seg_temp <span class="token operator">&lt;=</span><span class="token vhdl-vectors number">"11100000"</span><span class="token punctuation">;</span><span class="token comment">--7</span>
				<span class="token keyword">WHEN</span> <span class="token vhdl-vectors number">"1000"</span><span class="token operator">=</span><span class="token operator">></span> seg_temp <span class="token operator">&lt;=</span><span class="token vhdl-vectors number">"11111110"</span><span class="token punctuation">;</span><span class="token comment">--8</span>
				<span class="token keyword">WHEN</span> <span class="token vhdl-vectors number">"1001"</span><span class="token operator">=</span><span class="token operator">></span> seg_temp <span class="token operator">&lt;=</span><span class="token vhdl-vectors number">"11110110"</span><span class="token punctuation">;</span><span class="token comment">--9</span>
				<span class="token keyword">WHEN</span> <span class="token keyword">OTHERS</span><span class="token operator">=</span><span class="token operator">></span> seg_temp <span class="token operator">&lt;=</span><span class="token vhdl-vectors number">"00000000"</span><span class="token punctuation">;</span>
			<span class="token keyword">END</span> <span class="token keyword">CASE</span><span class="token punctuation">;</span>
		<span class="token keyword">END</span> <span class="token keyword">PROCESS</span> MYSEG<span class="token punctuation">;</span>
		cat <span class="token operator">&lt;=</span> <span class="token vhdl-vectors number">"11111110"</span><span class="token punctuation">;</span>
		seg <span class="token operator">&lt;=</span> seg_temp<span class="token punctuation">;</span>
<span class="token keyword">end</span> a<span class="token punctuation">;</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<h3 id="一些工程文件截图-4" tabindex="-1"><a class="header-anchor" href="#一些工程文件截图-4" aria-hidden="true">#</a> 一些工程文件截图</h3>
<p>vhdl代码：</p>
<p><img src="@source/zh/课程实验/数电实验/时序电路的设计与实现.assets/image-20220513234059091.png" alt="image-20220513234059091" loading="lazy"></p>
<p>vhdl编译成功：</p>
<p><img src="@source/zh/课程实验/数电实验/时序电路的设计与实现.assets/image-20220513234131938.png" alt="image-20220513234131938" loading="lazy"></p>
<p>波形仿真成功：</p>
<p><img src="@source/zh/课程实验/数电实验/时序电路的设计与实现.assets/image-20220513234154946.png" alt="image-20220513234154946" loading="lazy"></p>
<p>仿真波形：</p>
<p><img src="@source/zh/课程实验/数电实验/时序电路的设计与实现.assets/image-20220513234510604.png" alt="image-20220513234510604" loading="lazy"></p>
</li>
<li>
<h3 id="结果分析-3" tabindex="-1"><a class="header-anchor" href="#结果分析-3" aria-hidden="true">#</a> 结果分析：</h3>
<p>根据仿真波形，clear=1时，输出seg对应的数字从0递增至9；clear=0时，输出seg对应的数字恒为0，实现了带有异步清零（即手动复位）功能、数码管上“0”~“9”自动循环显示、每秒切换一个数字的功能。</p>
</li>
</ul>
</li>
</ul>
</div></template>


