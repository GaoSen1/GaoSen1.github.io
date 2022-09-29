<template><div><div class="custom-container tip">
<p class="custom-container-title">摘要</p>
<p>这一节，程序将可以自动行棋。但仅仅是走了一步符合象棋规则的棋，电脑智商为0。</p>
</div>
<h2 id="走法生成" tabindex="-1"><a class="header-anchor" href="#走法生成" aria-hidden="true">#</a> 走法生成</h2>
<h3 id="将-帅" tabindex="-1"><a class="header-anchor" href="#将-帅" aria-hidden="true">#</a> 将（帅）</h3>
<p><img src="@source/课程实验/专业实验/05_chessx.assets/image-20220517193459830.png" alt="image-20220517193459830" loading="lazy"></p>
<p>使用一个辅助数组表示这四个方向：</p>
<p><code>let KING_DELTA = [-16, -1, 1, 16];</code></p>
<p>已知帅在一维棋局数组中的起点位置sqSrc。生成帅的走法，就是获取帅全部的合法终点sqDes。使用一个数组存储所有可能的走法，伪代码如下：</p>
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="仕" tabindex="-1"><a class="header-anchor" href="#仕" aria-hidden="true">#</a> 仕</h3>
<p><img src="@source/课程实验/专业实验/05_chessx.assets/image-20220519141003639.png" alt="image-20220519141003639" loading="lazy"></p>
<p>同样使用辅助数组表示仕的4个方向：</p>
<p><code>let ADVISOR_DELTA = [-17, -15, 15, 17];</code></p>
<p>生成仕的走法，伪代码如下：</p>
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="象" tabindex="-1"><a class="header-anchor" href="#象" aria-hidden="true">#</a> 象</h3>
<p><img src="@source/课程实验/专业实验/05_chessx.assets/image-20220519140908980.png" alt="image-20220519140908980" loading="lazy"></p>
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="马" tabindex="-1"><a class="header-anchor" href="#马" aria-hidden="true">#</a> 马</h3>
<p><img src="@source/课程实验/专业实验/05_chessx.assets/image-20220519141337953.png" alt="image-20220519141337953" loading="lazy"></p>
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="车" tabindex="-1"><a class="header-anchor" href="#车" aria-hidden="true">#</a> 车</h3>
<p><img src="@source/课程实验/专业实验/05_chessx.assets/image-20220519141533975.png" alt="image-20220519141533975" loading="lazy"></p>
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="炮" tabindex="-1"><a class="header-anchor" href="#炮" aria-hidden="true">#</a> 炮</h3>
<p><img src="@source/课程实验/专业实验/05_chessx.assets/image-20220519141616658.png" alt="image-20220519141616658" loading="lazy"></p>
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="兵" tabindex="-1"><a class="header-anchor" href="#兵" aria-hidden="true">#</a> 兵</h3>
<p><img src="@source/课程实验/专业实验/05_chessx.assets/image-20220519141658949.png" alt="image-20220519141658949" loading="lazy"></p>
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


