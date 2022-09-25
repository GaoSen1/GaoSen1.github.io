<template><div><h2 id="概念" tabindex="-1"><a class="header-anchor" href="#概念" aria-hidden="true">#</a> 概念</h2>
<p>锁相的意义是相位同步的自动控制，能够完成两个电信号相位同步的自动控制闭环系统叫做锁相环，简称PLL。</p>
<p>锁相环主要由相位比较器（PC）、压控振荡器（VCO）、低通滤波器三部分组成。</p>
<ul>
<li>压控振荡器指输出频率与输入控制电压有对应关系的振荡电路(VCO)</li>
<li>从相位比较输出的正、负脉冲的宽度均等于两个输入脉冲上升沿之间的相位差。</li>
</ul>
<p><img src="@source/zh/电子电路/常用芯片/CD4046.assets/clip_image001.gif" alt="img" loading="lazy"></p>
<h2 id="封装" tabindex="-1"><a class="header-anchor" href="#封装" aria-hidden="true">#</a> 封装</h2>
<img src="@source/zh/电子电路/常用芯片/CD4046.assets/image-20220914165040240.png" alt="image-20220914165040240" style="zoom:50%;" />
<ul>
<li>1脚相位输出端，环路人锁时为高电平，环路失锁时为低电平。</li>
<li>2脚相位比较器Ⅰ的输出端。</li>
<li>3脚比较信号输入端。</li>
<li>4脚压控振荡器输出端。</li>
<li>5脚禁止端，高电平时禁止，低电平时允许压控振荡器工作。</li>
<li>6、7脚外接振荡电容。</li>
<li>8、16脚电源的负端和正端。</li>
<li>9脚压控振荡器的控制端。</li>
<li>10脚解调输出端，用于FM解调。</li>
</ul>
<ul>
<li>
<p>11、12脚外接振荡电阻。</p>
</li>
<li>
<p>13脚相位比较器Ⅱ的输出端。</p>
</li>
<li>
<p>14脚信号输入端。</p>
</li>
<li>
<p>15脚内部独立的齐纳稳压管负极。</p>
</li>
</ul>
<img src="@source/zh/电子电路/常用芯片/CD4046.assets/image-20220914165333978.png" alt="image-20220914165333978"  />
<h2 id="工作原理" tabindex="-1"><a class="header-anchor" href="#工作原理" aria-hidden="true">#</a> 工作原理</h2>
<p><img src="@source/zh/电子电路/常用芯片/CD4046.assets/image-20220914165552713.png" alt="image-20220914165552713" loading="lazy"></p>
<p>输入信号 Ui从14脚输入后，经放大器A1进行放大、整形后加到相位比较器Ⅰ、Ⅱ的输入端，图3开关K拨至2脚，则比较器Ⅰ将从3脚输入的比较信号Uo与输入信号Ui作相位比较，从相位比较器输出的误差电压UΨ则反映出两者的相位差。UΨ经R3、R4及C2滤波后得到一控制电压Ud加至压控振荡器VCO的输入端9脚，调整VCO的振荡频率f2，使f2迅速逼近信号频率f1。VCO的输出又经除法器再进入相位比较器Ⅰ，继续与Ui进行相位比较，最后使得f2＝f1，两者的相位差为一定值，实现了相位锁定。若开关K拨至13脚，则相位比较器Ⅱ工作，过程与上述相同，不再赘述。</p>
<h2 id="应用" tabindex="-1"><a class="header-anchor" href="#应用" aria-hidden="true">#</a> 应用</h2>
<h3 id="方波发生器" tabindex="-1"><a class="header-anchor" href="#方波发生器" aria-hidden="true">#</a> 方波发生器</h3>
<p><img src="@source/zh/电子电路/常用芯片/CD4046.assets/clip_image001-16631458563902.gif" alt="img" loading="lazy"></p>
<p>用CD4046的VCO组成的方波发生器，当其9脚输入端固定接电源时，电路即起基本方波振荡器的作用。振荡器的充、放电电容C1接在6脚与7脚之间，调节电阻R1阻值即可调整振荡器振荡频率，振荡方波信号从4脚输出。按图示数值，振荡频率变化范围在20Hz至2kHz。</p>
</div></template>


