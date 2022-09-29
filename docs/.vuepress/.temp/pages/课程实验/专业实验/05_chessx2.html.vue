<template><div><div class="custom-container tip">
<p class="custom-container-title">摘要</p>
<p>这一节介绍棋子的搜索算法</p>
</div>
<h2 id="局面评估" tabindex="-1"><a class="header-anchor" href="#局面评估" aria-hidden="true">#</a> 局面评估</h2>
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
<div class="custom-container tip">
<p class="custom-container-title">提示</p>
<p>但是棋子价值是跟位置有关系的，比如兵在过河前价值很小，过河后价值大涨。在我的程序中，就不考虑这个了。</p>
</div>
<h2 id="搜索算法" tabindex="-1"><a class="header-anchor" href="#搜索算法" aria-hidden="true">#</a> 搜索算法</h2>
<p>思路：轮到电脑方执棋时:</p>
<ol>
<li>电脑先计算求出所有红方可能走的棋子，选出对红方最有利的走法。</li>
<li>然后电脑得知了红方下一步最有可能怎么走。</li>
<li>电脑计算求出所有它可以走的棋子，找出能阻断破坏上述对红方最有利的走法、或对自己黑方最有利的走法。</li>
<li>比如红方将军，轮到电脑执棋时，电脑会检索到红方将军这一步走法，然后尝试阻断这一将军；而在没有将军时，电脑也会尝试去吃掉红方价值最大的棋子。</li>
</ol>
<Mermaid id="mermaid-64a570e6" code="flowchart%20TD%0A%20%20%20%20A%5B%22%E5%BC%80%E5%A7%8B%22%5D%0A%20%20%20%20B(%5B%22%E5%85%88%E5%AE%9A%E4%B9%89%E4%B8%80%E4%B8%AA%E5%8F%98%E9%87%8FmaxVal%EF%BC%8C%0A%20%20%20%20%E7%84%B6%E5%90%8E%E9%81%8D%E5%8E%86%E7%BA%A2%E6%96%B9%E6%A3%8B%E5%AD%90%0A%20%20%20%20(%E6%AF%8F%E6%AC%A1%E9%81%8D%E5%8E%86%E7%9A%84%E5%85%83%E7%B4%A0%EF%BC%9A%E7%BA%A2%E6%A3%8Bitem1)%22%5D)%0A%20%20%20%20C(%5B%22%E4%BD%BF%E7%94%A8machine_getExactStep(item1)%0A%20%20%20%20%E5%87%BD%E6%95%B0%E5%BE%97%E5%88%B0item1%E7%9A%84%E6%9C%80%E4%BD%B3%E8%B5%B0%E6%B3%95%5BsqSrc%2CsqDst%5D%22%5D)%0A%20%20%20%20C1(%5B%22%E4%BD%BF%E7%94%A8machine_evaluate(arr)%E5%87%BD%E6%95%B0%0A%20%20%20%20%E6%B1%82%E5%87%BA%E5%BD%93%E5%89%8D%E6%A3%8B%E7%9B%98%E7%9A%84%E4%BB%B7%E5%80%BC%EF%BC%8C%E5%85%B6%E4%B8%AD%E5%8F%82%E6%95%B0arr%E4%B8%BA%E5%BD%93%E5%89%8D%0A%20%20%20%20%E6%A3%8B%E7%9B%98%E6%95%B0%E7%BB%84%EF%BC%9B%E7%BB%93%E6%9E%9C%E4%BF%9D%E5%AD%98%E5%9C%A8val1%22%5D)%0A%09D%7Bval1%20%3E%20maxVal%3F%7D%0A%20%20%20%20E(%5B%22%E8%AE%B0%E5%BD%95%E5%BD%93%E5%89%8D%E6%9C%80%E5%A4%A7%E8%AF%84%E4%BC%B0%E5%80%BC%3A%20maxVal%3Dval1%3B%0A%20%20%20%20%E8%AE%B0%E5%BD%95%E6%AD%A4%E6%97%B6%E7%9A%84%E8%B5%B7%E7%82%B9%3A%20sqSrc_w%20%3D%20sqSrc%22%5D)%0A%20%20%20%20F%7B%22%E6%98%AF%E5%90%A6%E9%81%8D%E5%8E%86%E5%AE%8C%E7%BA%A2%E6%A3%8B%EF%BC%9F%22%7D%0A%20%20%20%20G%5B(%22%E6%AD%A4%E6%97%B6%E7%94%B5%E8%84%91%E5%B7%B2%E8%AE%A1%E7%AE%97%E5%87%BA%E7%BA%A2%E6%96%B9%0A%20%20%20%20%E6%9C%80%E6%9C%89%E5%8F%AF%E8%83%BD%E8%B5%B0%E7%9A%84%E6%A3%8B%E5%AD%90%EF%BC%8C%E5%8D%B3sqSrc_w%22)%5D%0A%20%20%20%20%0A%20%20%20%20J(%5B%22%E5%88%9D%E5%A7%8B%E5%8C%96%E4%B8%80%E4%B8%AA%E5%8F%98%E9%87%8FminVal%20%3D%20maxVal%2C%0A%20%20%20%20%E9%81%8D%E5%8E%86%E9%BB%91%E6%A3%8B%EF%BC%88item2%EF%BC%89%22%5D)%0A%20%20%20%20K(%5B%22%E9%81%8D%E5%8E%86%E9%BB%91%E6%A3%8Bitem2%E7%9A%84%E6%89%80%E6%9C%89%E8%B5%B0%E6%B3%95(item3)%22%5D)%0A%20%20%20%20L(%5B%22%E7%94%B5%E8%84%91%E5%86%85%E9%83%A8%E6%A8%A1%E6%8B%9F%E9%BB%91%E6%A3%8B%E4%BD%BF%0A%20%20%20%20%E7%94%A8%E4%BA%86%E8%B5%B0%E6%B3%95item3(%5BsqSrc%2CsqDst%5D)%22%5D)%0A%20%20%20%20M(%5B%22%E9%87%8D%E6%96%B0%E4%BD%BF%E7%94%A8machine_getExactStep(item3)%0A%20%20%20%20%E5%87%BD%E6%95%B0%E5%BE%97%E5%88%B0%E7%BA%A2%E6%A3%8BsqSrc_w%E7%9A%84%E6%9C%80%E4%BD%B3%E8%B5%B0%E6%B3%95%5BsqSrc_w%2CsqDst%5D%22%5D)%0A%20%20%20%20N(%5B%22%E7%94%B5%E8%84%91%E5%86%85%E9%83%A8%E6%A8%A1%E6%8B%9F%E8%AF%A5%E7%BA%A2%E6%A3%8B%E6%8C%89%E6%9C%80%E4%BD%B3%E8%B5%B0%E6%B3%95%E8%90%BD%E5%AD%90%22%5D)%0A%20%20%20%20O(%5B%22%E8%B0%83%E7%94%A8machine_evaluate(arr)%0A%20%20%20%20%E5%87%BD%E6%95%B0%E8%AE%A1%E7%AE%97%E6%AD%A4%E6%97%B6%E5%86%85%E9%83%A8%E6%A8%A1%E6%8B%9F%E6%A3%8B%E7%9B%98%E7%9A%84%E4%BB%B7%E5%80%BC%EF%BC%8C%0A%20%20%20%20%E5%85%B6%E4%B8%AD%E5%8F%82%E6%95%B0arr%E4%B8%BA%E6%A8%A1%E6%8B%9F%E6%A3%8B%E7%9B%98%E6%95%B0%E7%BB%84%3B%E7%BB%93%E6%9E%9C%E4%BF%9D%E5%AD%98%E5%9C%A8val2%E4%B8%AD%22%5D)%0A%20%20%20%20P%7Bval2%20%3C%20minVal%3F%7D%0A%20%20%20%20Q(%5B%22%E8%AE%B0%E5%BD%95%E5%BD%93%E5%89%8D%E6%9C%80%E5%B0%8F%E8%AF%84%E4%BC%B0%E5%80%BC%3A%20maxVal%3Dval1%3B%0A%20%20%20%20%E8%AE%B0%E5%BD%95%E6%AD%A4%E6%97%B6%E7%9A%84%E8%B5%B7%E7%82%B9%3A%20sqSrc_b%20%3D%20sqSrc%0A%20%20%20%20%E8%AE%B0%E5%BD%95%E6%AD%A4%E6%97%B6%E7%9A%84%E7%BB%88%E7%82%B9sqDst_b%20%3D%20sqDst%22%5D)%0A%20%20%20%20R%7B%22%E6%98%AF%E5%90%A6%E9%81%8D%E5%8E%86%E5%AE%8C%E8%AF%A5%E9%BB%91%E6%A3%8B%E7%9A%84%E8%B5%B0%E6%B3%95%EF%BC%9F%22%7D%0A%20%20%20%20S%7B%22%E6%98%AF%E5%90%A6%E9%81%8D%E5%8E%86%E5%AE%8C%E6%89%80%E6%9C%89%E9%BB%91%E6%A3%8B%EF%BC%9F%22%7D%0A%20%20%20%20T%5B(%22%E6%AD%A4%E6%97%B6%E7%94%B5%E8%84%91%E8%AE%A1%E7%AE%97%0A%20%20%20%20%E5%87%BA%E5%AF%B9%E5%AE%83%E6%9C%80%E6%9C%89%E5%88%A9%E7%9A%84%E8%B5%B0%E6%B3%95%5BsqSrc_b%2CsqDst_b%5D%22)%5D%0A%20%20%20%20%0A%20%20%20%20A%20--%3E%20B%20--%3E%20C%20--%3E%20C1%20--%3E%20D%0A%20%20%20%20D%20----%3E%7Cno%7C%20B%0A%20%20%20%20D%20--%3E%7Cyes%7C%20E%20--%3E%20F%0A%09F%20--%3E%7Cno%7C%20B%0A%09F%20--%3E%7Cyes%7CG%0A%09G%20--%3E%20J%20--%3E%20K%20--%3E%20L%20--%3E%20M%20--%3E%20N%20--%3E%20O%20--%3E%20P%0A%09P%20--%3E%7Cno%7CL%20%0A%09P%20--%3E%7Cyes%7C%20Q%20--%3E%20R%0A%09R%20--%3E%7Cno%7CK%0A%09R%20--%3E%7Cyes%7CS%0A%09S%20--%3E%7Cno%7CJ%0A%09S%20--%3E%7Cyes%7CT%0A"></Mermaid></div></template>


