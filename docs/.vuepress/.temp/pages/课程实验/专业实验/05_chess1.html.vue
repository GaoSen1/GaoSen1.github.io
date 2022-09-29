<template><div><div class="custom-container tip">
<p class="custom-container-title">摘要</p>
<p>这一节我们介绍设计图形界面，以及一些约定。</p>
</div>
<h2 id="题目" tabindex="-1"><a class="header-anchor" href="#题目" aria-hidden="true">#</a> 题目</h2>
<p>自己设计一款类似围棋的棋类对战软件，不能用五子棋等已有规则。
要求：（1）可人人对战
（2）规则判断（提子、判断打劫）
（3）人机对战
（4）可点目（数子）判断胜负
（5）网络对战（选作）</p>
<blockquote>
<p>写在前面：该象棋的设计借鉴了<a href="https://www.cnblogs.com/royhoo/p/6424395.html" target="_blank" rel="noopener noreferrer">这篇博客<ExternalLinkIcon/></a>,但是该博主是用纯js实现的，而我在vue框架下实现，不少地方作出了改变，具体请往下看：</p>
</blockquote>
<h2 id="棋盘表示" tabindex="-1"><a class="header-anchor" href="#棋盘表示" aria-hidden="true">#</a> 棋盘表示</h2>
<p>中国象棋有10行9列，很自然地想到可以用10×9矩阵表示棋盘。事实上，我们使用16×16矩阵来表示一个扩充了的虚拟棋盘。</p>
<p><img src="@source/课程实验/专业实验/04_chess1.assets/image-20220408134722320.png" alt="image-20220408134722320" loading="lazy"></p>
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="棋子表示" tabindex="-1"><a class="header-anchor" href="#棋子表示" aria-hidden="true">#</a> 棋子表示</h2>
<p>使用整数表示棋子</p>
<p><img src="@source/课程实验/专业实验/04_chess1.assets/image-20220408131211570.png" alt="image-20220408131211570" loading="lazy"></p>
<p>这样可以快速判断某棋子属于红方还是黑方，如下表所示：</p>
<p><img src="@source/课程实验/专业实验/04_chess1.assets/image-20220408131248221.png" alt="image-20220408131248221" loading="lazy"></p>
<p>可以看出：</p>
<p>红方棋子 &amp; 8 = 1</p>
<p>黑方棋子 &amp; 16 = 1</p>
<h2 id="字符串表示局面" tabindex="-1"><a class="header-anchor" href="#字符串表示局面" aria-hidden="true">#</a> 字符串表示局面</h2>
<p>我们可以用一行字符串表示一个局面，这就是FEN格式串，一种使用ASCII码字符描述国际象棋局面的标准，当然也可应用于中国象棋。中国象棋的初始局面可表示为：</p>
<p>rnbakabnr/9/1c5c1/p1p1p1p1p/9/9/P1P1P1P1P/1C5C1/9/RNBAKABNR w - - 0 1</p>
<p><img src="@source/课程实验/专业实验/04_chess1.assets/image-20220408131454681.png" alt="image-20220408131454681" loading="lazy"></p>
<p>中国象棋共有十行，每行都用一个字符串表示，行间使用正斜杠分割。</p>
<p>例如：</p>
<ul>
<li>
<p>rnbakabnr表示<img src="@source/课程实验/专业实验/04_chess1.assets/image-20220408132905553.png" alt="image-20220408132905553" loading="lazy"></p>
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
<ol start="4">
<li>
<p>棋盘界面设计</p>
<p><img src="@source/课程实验/专业实验/04_chess1.assets/image-20220408133925789.png" alt="image-20220408133925789" loading="lazy"></p>
<p>由于棋盘有90个交叉点，我们把棋盘划分为的90个小正方形区域，交叉点是小正方形的中心。每个区域都会定义一个img标签。</p>
<p>这些img标签有两个作用：</p>
<ul>
<li>
<p>显示棋子图片</p>
<p>如果某个区域存在棋子，就会显示相应的棋子图片；否则，显示一张透明图片</p>
</li>
<li>
<p>响应点击事件</p>
<p>每个img标签都会绑定onmousedown事件。点击不同的img标签时，会传递不同的参数给响应函数，这样就知道点击的具体是哪个区域了。</p>
</li>
</ul>
<h2 id="棋盘相关的html、css" tabindex="-1"><a class="header-anchor" href="#棋盘相关的html、css" aria-hidden="true">#</a> 棋盘相关的html、css</h2>
<p>在网上找到一副象棋的图片，在photoshop中抠图、导出为png格式；全部导出后全选右键重命名（这样可以批量重命名），利用模板字符串+v-for语法可以在html中快捷方便地列出所有象棋，如:</p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>imgBox myImgBox<span class="token punctuation">"</span></span> <span class="token attr-name">v-for</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>(item,index) in 90<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>img</span> <span class="token attr-name">:src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>$withBase(`/img/chess/K_.png`)<span class="token punctuation">"</span></span>
             <span class="token attr-name">:id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>`pos${index}`<span class="token punctuation">"</span></span> <span class="token attr-name">alt</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>一个棋子<span class="token punctuation">"</span></span>
             <span class="token attr-name">:key</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>index<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>棋盘的css设计，这里我取了个巧，只要设置每个象棋的位置（包括暂时没有棋子的地方）的背景图为如下：</p>
<p><img src="@source/课程实验/专业实验/05_chess1.assets/image-20220525214814456.png" alt="image-20220525214814456" loading="lazy"></p>
<p>这样就能组合成一张宫格很多的图，且棋子都在格子的顶点处。然后在楚河汉界处设置<code v-pre>background: none</code>即可</p>
</li>
</ol>
</div></template>


