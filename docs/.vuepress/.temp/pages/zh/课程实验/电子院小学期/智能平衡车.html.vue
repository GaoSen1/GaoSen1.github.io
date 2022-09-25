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
<mjx-container class="MathJax" jax="SVG" display="true"><svg style="vertical-align: -1.948ex;" xmlns="http://www.w3.org/2000/svg" width="49.144ex" height="5.251ex" role="img" focusable="false" viewBox="0 -1460 21721.8 2321"><g stroke="currentColor" fill="currentColor" stroke-width="0" transform="scale(1,-1)"><g data-mml-node="math"><g data-mml-node="mi"><path data-c="1D448" d="M107 637Q73 637 71 641Q70 643 70 649Q70 673 81 682Q83 683 98 683Q139 681 234 681Q268 681 297 681T342 682T362 682Q378 682 378 672Q378 670 376 658Q371 641 366 638H364Q362 638 359 638T352 638T343 637T334 637Q295 636 284 634T266 623Q265 621 238 518T184 302T154 169Q152 155 152 140Q152 86 183 55T269 24Q336 24 403 69T501 205L552 406Q599 598 599 606Q599 633 535 637Q511 637 511 648Q511 650 513 660Q517 676 519 679T529 683Q532 683 561 682T645 680Q696 680 723 681T752 682Q767 682 767 672Q767 650 759 642Q756 637 737 637Q666 633 648 597Q646 592 598 404Q557 235 548 205Q515 105 433 42T263 -22Q171 -22 116 34T60 167V183Q60 201 115 421Q164 622 164 628Q164 635 107 637Z"></path></g><g data-mml-node="mo" transform="translate(767,0)"><path data-c="28" d="M94 250Q94 319 104 381T127 488T164 576T202 643T244 695T277 729T302 750H315H319Q333 750 333 741Q333 738 316 720T275 667T226 581T184 443T167 250T184 58T225 -81T274 -167T316 -220T333 -241Q333 -250 318 -250H315H302L274 -226Q180 -141 137 -14T94 250Z"></path></g><g data-mml-node="mi" transform="translate(1156,0)"><path data-c="1D461" d="M26 385Q19 392 19 395Q19 399 22 411T27 425Q29 430 36 430T87 431H140L159 511Q162 522 166 540T173 566T179 586T187 603T197 615T211 624T229 626Q247 625 254 615T261 596Q261 589 252 549T232 470L222 433Q222 431 272 431H323Q330 424 330 420Q330 398 317 385H210L174 240Q135 80 135 68Q135 26 162 26Q197 26 230 60T283 144Q285 150 288 151T303 153H307Q322 153 322 145Q322 142 319 133Q314 117 301 95T267 48T216 6T155 -11Q125 -11 98 4T59 56Q57 64 57 83V101L92 241Q127 382 128 383Q128 385 77 385H26Z"></path></g><g data-mml-node="mo" transform="translate(1517,0)"><path data-c="29" d="M60 749L64 750Q69 750 74 750H86L114 726Q208 641 251 514T294 250Q294 182 284 119T261 12T224 -76T186 -143T145 -194T113 -227T90 -246Q87 -249 86 -250H74Q66 -250 63 -250T58 -247T55 -238Q56 -237 66 -225Q221 -64 221 250T66 725Q56 737 55 738Q55 746 60 749Z"></path></g><g data-mml-node="mo" transform="translate(2183.8,0)"><path data-c="3D" d="M56 347Q56 360 70 367H707Q722 359 722 347Q722 336 708 328L390 327H72Q56 332 56 347ZM56 153Q56 168 72 173H708Q722 163 722 153Q722 140 707 133H70Q56 140 56 153Z"></path></g><g data-mml-node="msub" transform="translate(3239.6,0)"><g data-mml-node="mi"><path data-c="1D458" d="M121 647Q121 657 125 670T137 683Q138 683 209 688T282 694Q294 694 294 686Q294 679 244 477Q194 279 194 272Q213 282 223 291Q247 309 292 354T362 415Q402 442 438 442Q468 442 485 423T503 369Q503 344 496 327T477 302T456 291T438 288Q418 288 406 299T394 328Q394 353 410 369T442 390L458 393Q446 405 434 405H430Q398 402 367 380T294 316T228 255Q230 254 243 252T267 246T293 238T320 224T342 206T359 180T365 147Q365 130 360 106T354 66Q354 26 381 26Q429 26 459 145Q461 153 479 153H483Q499 153 499 144Q499 139 496 130Q455 -11 378 -11Q333 -11 305 15T277 90Q277 108 280 121T283 145Q283 167 269 183T234 206T200 217T182 220H180Q168 178 159 139T145 81T136 44T129 20T122 7T111 -2Q98 -11 83 -11Q66 -11 57 -1T48 16Q48 26 85 176T158 471L195 616Q196 629 188 632T149 637H144Q134 637 131 637T124 640T121 647Z"></path></g><g data-mml-node="mi" transform="translate(554,-150) scale(0.707)"><path data-c="1D45D" d="M23 287Q24 290 25 295T30 317T40 348T55 381T75 411T101 433T134 442Q209 442 230 378L240 387Q302 442 358 442Q423 442 460 395T497 281Q497 173 421 82T249 -10Q227 -10 210 -4Q199 1 187 11T168 28L161 36Q160 35 139 -51T118 -138Q118 -144 126 -145T163 -148H188Q194 -155 194 -157T191 -175Q188 -187 185 -190T172 -194Q170 -194 161 -194T127 -193T65 -192Q-5 -192 -24 -194H-32Q-39 -187 -39 -183Q-37 -156 -26 -148H-6Q28 -147 33 -136Q36 -130 94 103T155 350Q156 355 156 364Q156 405 131 405Q109 405 94 377T71 316T59 280Q57 278 43 278H29Q23 284 23 287ZM178 102Q200 26 252 26Q282 26 310 49T356 107Q374 141 392 215T411 325V331Q411 405 350 405Q339 405 328 402T306 393T286 380T269 365T254 350T243 336T235 326L232 322Q232 321 229 308T218 264T204 212Q178 106 178 102Z"></path></g></g><g data-mml-node="mo" transform="translate(4199.2,0)"><path data-c="7B" d="M434 -231Q434 -244 428 -250H410Q281 -250 230 -184Q225 -177 222 -172T217 -161T213 -148T211 -133T210 -111T209 -84T209 -47T209 0Q209 21 209 53Q208 142 204 153Q203 154 203 155Q189 191 153 211T82 231Q71 231 68 234T65 250T68 266T82 269Q116 269 152 289T203 345Q208 356 208 377T209 529V579Q209 634 215 656T244 698Q270 724 324 740Q361 748 377 749Q379 749 390 749T408 750H428Q434 744 434 732Q434 719 431 716Q429 713 415 713Q362 710 332 689T296 647Q291 634 291 499V417Q291 370 288 353T271 314Q240 271 184 255L170 250L184 245Q202 239 220 230T262 196T290 137Q291 131 291 1Q291 -134 296 -147Q306 -174 339 -192T415 -213Q429 -213 431 -216Q434 -219 434 -231Z"></path></g><g data-mml-node="mi" transform="translate(4699.2,0)"><path data-c="1D452" d="M39 168Q39 225 58 272T107 350T174 402T244 433T307 442H310Q355 442 388 420T421 355Q421 265 310 237Q261 224 176 223Q139 223 138 221Q138 219 132 186T125 128Q125 81 146 54T209 26T302 45T394 111Q403 121 406 121Q410 121 419 112T429 98T420 82T390 55T344 24T281 -1T205 -11Q126 -11 83 42T39 168ZM373 353Q367 405 305 405Q272 405 244 391T199 357T170 316T154 280T149 261Q149 260 169 260Q282 260 327 284T373 353Z"></path></g><g data-mml-node="mi" transform="translate(5165.2,0)"><path data-c="1D45F" d="M21 287Q22 290 23 295T28 317T38 348T53 381T73 411T99 433T132 442Q161 442 183 430T214 408T225 388Q227 382 228 382T236 389Q284 441 347 441H350Q398 441 422 400Q430 381 430 363Q430 333 417 315T391 292T366 288Q346 288 334 299T322 328Q322 376 378 392Q356 405 342 405Q286 405 239 331Q229 315 224 298T190 165Q156 25 151 16Q138 -11 108 -11Q95 -11 87 -5T76 7T74 17Q74 30 114 189T154 366Q154 405 128 405Q107 405 92 377T68 316T57 280Q55 278 41 278H27Q21 284 21 287Z"></path></g><g data-mml-node="mi" transform="translate(5616.2,0)"><path data-c="1D45F" d="M21 287Q22 290 23 295T28 317T38 348T53 381T73 411T99 433T132 442Q161 442 183 430T214 408T225 388Q227 382 228 382T236 389Q284 441 347 441H350Q398 441 422 400Q430 381 430 363Q430 333 417 315T391 292T366 288Q346 288 334 299T322 328Q322 376 378 392Q356 405 342 405Q286 405 239 331Q229 315 224 298T190 165Q156 25 151 16Q138 -11 108 -11Q95 -11 87 -5T76 7T74 17Q74 30 114 189T154 366Q154 405 128 405Q107 405 92 377T68 316T57 280Q55 278 41 278H27Q21 284 21 287Z"></path></g><g data-mml-node="mo" transform="translate(6067.2,0)"><path data-c="28" d="M94 250Q94 319 104 381T127 488T164 576T202 643T244 695T277 729T302 750H315H319Q333 750 333 741Q333 738 316 720T275 667T226 581T184 443T167 250T184 58T225 -81T274 -167T316 -220T333 -241Q333 -250 318 -250H315H302L274 -226Q180 -141 137 -14T94 250Z"></path></g><g data-mml-node="mi" transform="translate(6456.2,0)"><path data-c="1D461" d="M26 385Q19 392 19 395Q19 399 22 411T27 425Q29 430 36 430T87 431H140L159 511Q162 522 166 540T173 566T179 586T187 603T197 615T211 624T229 626Q247 625 254 615T261 596Q261 589 252 549T232 470L222 433Q222 431 272 431H323Q330 424 330 420Q330 398 317 385H210L174 240Q135 80 135 68Q135 26 162 26Q197 26 230 60T283 144Q285 150 288 151T303 153H307Q322 153 322 145Q322 142 319 133Q314 117 301 95T267 48T216 6T155 -11Q125 -11 98 4T59 56Q57 64 57 83V101L92 241Q127 382 128 383Q128 385 77 385H26Z"></path></g><g data-mml-node="mo" transform="translate(6817.2,0)"><path data-c="29" d="M60 749L64 750Q69 750 74 750H86L114 726Q208 641 251 514T294 250Q294 182 284 119T261 12T224 -76T186 -143T145 -194T113 -227T90 -246Q87 -249 86 -250H74Q66 -250 63 -250T58 -247T55 -238Q56 -237 66 -225Q221 -64 221 250T66 725Q56 737 55 738Q55 746 60 749Z"></path></g><g data-mml-node="mo" transform="translate(7428.5,0)"><path data-c="2B" d="M56 237T56 250T70 270H369V420L370 570Q380 583 389 583Q402 583 409 568V270H707Q722 262 722 250T707 230H409V-68Q401 -82 391 -82H389H387Q375 -82 369 -68V230H70Q56 237 56 250Z"></path></g><g data-mml-node="mfrac" transform="translate(8428.7,0)"><g data-mml-node="mn" transform="translate(481.7,676)"><path data-c="31" d="M213 578L200 573Q186 568 160 563T102 556H83V602H102Q149 604 189 617T245 641T273 663Q275 666 285 666Q294 666 302 660V361L303 61Q310 54 315 52T339 48T401 46H427V0H416Q395 3 257 3Q121 3 100 0H88V46H114Q136 46 152 46T177 47T193 50T201 52T207 57T213 61V578Z"></path></g><g data-mml-node="msub" transform="translate(220,-686)"><g data-mml-node="mi"><path data-c="1D447" d="M40 437Q21 437 21 445Q21 450 37 501T71 602L88 651Q93 669 101 677H569H659Q691 677 697 676T704 667Q704 661 687 553T668 444Q668 437 649 437Q640 437 637 437T631 442L629 445Q629 451 635 490T641 551Q641 586 628 604T573 629Q568 630 515 631Q469 631 457 630T439 622Q438 621 368 343T298 60Q298 48 386 46Q418 46 427 45T436 36Q436 31 433 22Q429 4 424 1L422 0Q419 0 415 0Q410 0 363 1T228 2Q99 2 64 0H49Q43 6 43 9T45 27Q49 40 55 46H83H94Q174 46 189 55Q190 56 191 56Q196 59 201 76T241 233Q258 301 269 344Q339 619 339 625Q339 630 310 630H279Q212 630 191 624Q146 614 121 583T67 467Q60 445 57 441T43 437H40Z"></path></g><g data-mml-node="mi" transform="translate(617,-150) scale(0.707)"><path data-c="1D43C" d="M43 1Q26 1 26 10Q26 12 29 24Q34 43 39 45Q42 46 54 46H60Q120 46 136 53Q137 53 138 54Q143 56 149 77T198 273Q210 318 216 344Q286 624 286 626Q284 630 284 631Q274 637 213 637H193Q184 643 189 662Q193 677 195 680T209 683H213Q285 681 359 681Q481 681 487 683H497Q504 676 504 672T501 655T494 639Q491 637 471 637Q440 637 407 634Q393 631 388 623Q381 609 337 432Q326 385 315 341Q245 65 245 59Q245 52 255 50T307 46H339Q345 38 345 37T342 19Q338 6 332 0H316Q279 2 179 2Q143 2 113 2T65 2T43 1Z"></path></g></g><rect width="1223.4" height="60" x="120" y="220"></rect></g><g data-mml-node="mo" transform="translate(10058.7,0) translate(0 1)"><path data-c="222B" d="M114 -798Q132 -824 165 -824H167Q195 -824 223 -764T275 -600T320 -391T362 -164Q365 -143 367 -133Q439 292 523 655T645 1127Q651 1145 655 1157T672 1201T699 1257T733 1306T777 1346T828 1360Q884 1360 912 1325T944 1245Q944 1220 932 1205T909 1186T887 1183Q866 1183 849 1198T832 1239Q832 1287 885 1296L882 1300Q879 1303 874 1307T866 1313Q851 1323 833 1323Q819 1323 807 1311T775 1255T736 1139T689 936T633 628Q574 293 510 -5T410 -437T355 -629Q278 -862 165 -862Q125 -862 92 -831T55 -746Q55 -711 74 -698T112 -685Q133 -685 150 -700T167 -741Q167 -789 114 -798Z"></path></g><g data-mml-node="TeXAtom" data-mjx-texclass="ORD" transform="translate(11169.4,0)"><g data-mml-node="mi"><path data-c="1D452" d="M39 168Q39 225 58 272T107 350T174 402T244 433T307 442H310Q355 442 388 420T421 355Q421 265 310 237Q261 224 176 223Q139 223 138 221Q138 219 132 186T125 128Q125 81 146 54T209 26T302 45T394 111Q403 121 406 121Q410 121 419 112T429 98T420 82T390 55T344 24T281 -1T205 -11Q126 -11 83 42T39 168ZM373 353Q367 405 305 405Q272 405 244 391T199 357T170 316T154 280T149 261Q149 260 169 260Q282 260 327 284T373 353Z"></path></g><g data-mml-node="mi" transform="translate(466,0)"><path data-c="1D45F" d="M21 287Q22 290 23 295T28 317T38 348T53 381T73 411T99 433T132 442Q161 442 183 430T214 408T225 388Q227 382 228 382T236 389Q284 441 347 441H350Q398 441 422 400Q430 381 430 363Q430 333 417 315T391 292T366 288Q346 288 334 299T322 328Q322 376 378 392Q356 405 342 405Q286 405 239 331Q229 315 224 298T190 165Q156 25 151 16Q138 -11 108 -11Q95 -11 87 -5T76 7T74 17Q74 30 114 189T154 366Q154 405 128 405Q107 405 92 377T68 316T57 280Q55 278 41 278H27Q21 284 21 287Z"></path></g><g data-mml-node="mi" transform="translate(917,0)"><path data-c="1D45F" d="M21 287Q22 290 23 295T28 317T38 348T53 381T73 411T99 433T132 442Q161 442 183 430T214 408T225 388Q227 382 228 382T236 389Q284 441 347 441H350Q398 441 422 400Q430 381 430 363Q430 333 417 315T391 292T366 288Q346 288 334 299T322 328Q322 376 378 392Q356 405 342 405Q286 405 239 331Q229 315 224 298T190 165Q156 25 151 16Q138 -11 108 -11Q95 -11 87 -5T76 7T74 17Q74 30 114 189T154 366Q154 405 128 405Q107 405 92 377T68 316T57 280Q55 278 41 278H27Q21 284 21 287Z"></path></g><g data-mml-node="mo" transform="translate(1368,0)"><path data-c="28" d="M94 250Q94 319 104 381T127 488T164 576T202 643T244 695T277 729T302 750H315H319Q333 750 333 741Q333 738 316 720T275 667T226 581T184 443T167 250T184 58T225 -81T274 -167T316 -220T333 -241Q333 -250 318 -250H315H302L274 -226Q180 -141 137 -14T94 250Z"></path></g><g data-mml-node="mi" transform="translate(1757,0)"><path data-c="1D461" d="M26 385Q19 392 19 395Q19 399 22 411T27 425Q29 430 36 430T87 431H140L159 511Q162 522 166 540T173 566T179 586T187 603T197 615T211 624T229 626Q247 625 254 615T261 596Q261 589 252 549T232 470L222 433Q222 431 272 431H323Q330 424 330 420Q330 398 317 385H210L174 240Q135 80 135 68Q135 26 162 26Q197 26 230 60T283 144Q285 150 288 151T303 153H307Q322 153 322 145Q322 142 319 133Q314 117 301 95T267 48T216 6T155 -11Q125 -11 98 4T59 56Q57 64 57 83V101L92 241Q127 382 128 383Q128 385 77 385H26Z"></path></g><g data-mml-node="mo" transform="translate(2118,0)"><path data-c="29" d="M60 749L64 750Q69 750 74 750H86L114 726Q208 641 251 514T294 250Q294 182 284 119T261 12T224 -76T186 -143T145 -194T113 -227T90 -246Q87 -249 86 -250H74Q66 -250 63 -250T58 -247T55 -238Q56 -237 66 -225Q221 -64 221 250T66 725Q56 737 55 738Q55 746 60 749Z"></path></g><g data-mml-node="mi" transform="translate(2507,0)"><path data-c="1D451" d="M366 683Q367 683 438 688T511 694Q523 694 523 686Q523 679 450 384T375 83T374 68Q374 26 402 26Q411 27 422 35Q443 55 463 131Q469 151 473 152Q475 153 483 153H487H491Q506 153 506 145Q506 140 503 129Q490 79 473 48T445 8T417 -8Q409 -10 393 -10Q359 -10 336 5T306 36L300 51Q299 52 296 50Q294 48 292 46Q233 -10 172 -10Q117 -10 75 30T33 157Q33 205 53 255T101 341Q148 398 195 420T280 442Q336 442 364 400Q369 394 369 396Q370 400 396 505T424 616Q424 629 417 632T378 637H357Q351 643 351 645T353 664Q358 683 366 683ZM352 326Q329 405 277 405Q242 405 210 374T160 293Q131 214 119 129Q119 126 119 118T118 106Q118 61 136 44T179 26Q233 26 290 98L298 109L352 326Z"></path></g><g data-mml-node="mi" transform="translate(3027,0)"><path data-c="1D461" d="M26 385Q19 392 19 395Q19 399 22 411T27 425Q29 430 36 430T87 431H140L159 511Q162 522 166 540T173 566T179 586T187 603T197 615T211 624T229 626Q247 625 254 615T261 596Q261 589 252 549T232 470L222 433Q222 431 272 431H323Q330 424 330 420Q330 398 317 385H210L174 240Q135 80 135 68Q135 26 162 26Q197 26 230 60T283 144Q285 150 288 151T303 153H307Q322 153 322 145Q322 142 319 133Q314 117 301 95T267 48T216 6T155 -11Q125 -11 98 4T59 56Q57 64 57 83V101L92 241Q127 382 128 383Q128 385 77 385H26Z"></path></g></g><g data-mml-node="mo" transform="translate(14779.6,0)"><path data-c="2B" d="M56 237T56 250T70 270H369V420L370 570Q380 583 389 583Q402 583 409 568V270H707Q722 262 722 250T707 230H409V-68Q401 -82 391 -82H389H387Q375 -82 369 -68V230H70Q56 237 56 250Z"></path></g><g data-mml-node="mfrac" transform="translate(15779.8,0)"><g data-mml-node="mrow" transform="translate(220,710)"><g data-mml-node="msub"><g data-mml-node="mi"><path data-c="1D447" d="M40 437Q21 437 21 445Q21 450 37 501T71 602L88 651Q93 669 101 677H569H659Q691 677 697 676T704 667Q704 661 687 553T668 444Q668 437 649 437Q640 437 637 437T631 442L629 445Q629 451 635 490T641 551Q641 586 628 604T573 629Q568 630 515 631Q469 631 457 630T439 622Q438 621 368 343T298 60Q298 48 386 46Q418 46 427 45T436 36Q436 31 433 22Q429 4 424 1L422 0Q419 0 415 0Q410 0 363 1T228 2Q99 2 64 0H49Q43 6 43 9T45 27Q49 40 55 46H83H94Q174 46 189 55Q190 56 191 56Q196 59 201 76T241 233Q258 301 269 344Q339 619 339 625Q339 630 310 630H279Q212 630 191 624Q146 614 121 583T67 467Q60 445 57 441T43 437H40Z"></path></g><g data-mml-node="mi" transform="translate(617,-150) scale(0.707)"><path data-c="1D437" d="M287 628Q287 635 230 637Q207 637 200 638T193 647Q193 655 197 667T204 682Q206 683 403 683Q570 682 590 682T630 676Q702 659 752 597T803 431Q803 275 696 151T444 3L430 1L236 0H125H72Q48 0 41 2T33 11Q33 13 36 25Q40 41 44 43T67 46Q94 46 127 49Q141 52 146 61Q149 65 218 339T287 628ZM703 469Q703 507 692 537T666 584T629 613T590 629T555 636Q553 636 541 636T512 636T479 637H436Q392 637 386 627Q384 623 313 339T242 52Q242 48 253 48T330 47Q335 47 349 47T373 46Q499 46 581 128Q617 164 640 212T683 339T703 469Z"></path></g></g><g data-mml-node="mo" transform="translate(1474.7,0)"><path data-c="B7" d="M78 250Q78 274 95 292T138 310Q162 310 180 294T199 251Q199 226 182 208T139 190T96 207T78 250Z"></path></g><g data-mml-node="mi" transform="translate(1974.9,0)"><path data-c="1D451" d="M366 683Q367 683 438 688T511 694Q523 694 523 686Q523 679 450 384T375 83T374 68Q374 26 402 26Q411 27 422 35Q443 55 463 131Q469 151 473 152Q475 153 483 153H487H491Q506 153 506 145Q506 140 503 129Q490 79 473 48T445 8T417 -8Q409 -10 393 -10Q359 -10 336 5T306 36L300 51Q299 52 296 50Q294 48 292 46Q233 -10 172 -10Q117 -10 75 30T33 157Q33 205 53 255T101 341Q148 398 195 420T280 442Q336 442 364 400Q369 394 369 396Q370 400 396 505T424 616Q424 629 417 632T378 637H357Q351 643 351 645T353 664Q358 683 366 683ZM352 326Q329 405 277 405Q242 405 210 374T160 293Q131 214 119 129Q119 126 119 118T118 106Q118 61 136 44T179 26Q233 26 290 98L298 109L352 326Z"></path></g><g data-mml-node="mi" transform="translate(2494.9,0)"><path data-c="1D452" d="M39 168Q39 225 58 272T107 350T174 402T244 433T307 442H310Q355 442 388 420T421 355Q421 265 310 237Q261 224 176 223Q139 223 138 221Q138 219 132 186T125 128Q125 81 146 54T209 26T302 45T394 111Q403 121 406 121Q410 121 419 112T429 98T420 82T390 55T344 24T281 -1T205 -11Q126 -11 83 42T39 168ZM373 353Q367 405 305 405Q272 405 244 391T199 357T170 316T154 280T149 261Q149 260 169 260Q282 260 327 284T373 353Z"></path></g><g data-mml-node="mi" transform="translate(2960.9,0)"><path data-c="1D45F" d="M21 287Q22 290 23 295T28 317T38 348T53 381T73 411T99 433T132 442Q161 442 183 430T214 408T225 388Q227 382 228 382T236 389Q284 441 347 441H350Q398 441 422 400Q430 381 430 363Q430 333 417 315T391 292T366 288Q346 288 334 299T322 328Q322 376 378 392Q356 405 342 405Q286 405 239 331Q229 315 224 298T190 165Q156 25 151 16Q138 -11 108 -11Q95 -11 87 -5T76 7T74 17Q74 30 114 189T154 366Q154 405 128 405Q107 405 92 377T68 316T57 280Q55 278 41 278H27Q21 284 21 287Z"></path></g><g data-mml-node="mi" transform="translate(3411.9,0)"><path data-c="1D45F" d="M21 287Q22 290 23 295T28 317T38 348T53 381T73 411T99 433T132 442Q161 442 183 430T214 408T225 388Q227 382 228 382T236 389Q284 441 347 441H350Q398 441 422 400Q430 381 430 363Q430 333 417 315T391 292T366 288Q346 288 334 299T322 328Q322 376 378 392Q356 405 342 405Q286 405 239 331Q229 315 224 298T190 165Q156 25 151 16Q138 -11 108 -11Q95 -11 87 -5T76 7T74 17Q74 30 114 189T154 366Q154 405 128 405Q107 405 92 377T68 316T57 280Q55 278 41 278H27Q21 284 21 287Z"></path></g><g data-mml-node="mo" transform="translate(3862.9,0)"><path data-c="28" d="M94 250Q94 319 104 381T127 488T164 576T202 643T244 695T277 729T302 750H315H319Q333 750 333 741Q333 738 316 720T275 667T226 581T184 443T167 250T184 58T225 -81T274 -167T316 -220T333 -241Q333 -250 318 -250H315H302L274 -226Q180 -141 137 -14T94 250Z"></path></g><g data-mml-node="mi" transform="translate(4251.9,0)"><path data-c="1D461" d="M26 385Q19 392 19 395Q19 399 22 411T27 425Q29 430 36 430T87 431H140L159 511Q162 522 166 540T173 566T179 586T187 603T197 615T211 624T229 626Q247 625 254 615T261 596Q261 589 252 549T232 470L222 433Q222 431 272 431H323Q330 424 330 420Q330 398 317 385H210L174 240Q135 80 135 68Q135 26 162 26Q197 26 230 60T283 144Q285 150 288 151T303 153H307Q322 153 322 145Q322 142 319 133Q314 117 301 95T267 48T216 6T155 -11Q125 -11 98 4T59 56Q57 64 57 83V101L92 241Q127 382 128 383Q128 385 77 385H26Z"></path></g><g data-mml-node="mo" transform="translate(4612.9,0)"><path data-c="29" d="M60 749L64 750Q69 750 74 750H86L114 726Q208 641 251 514T294 250Q294 182 284 119T261 12T224 -76T186 -143T145 -194T113 -227T90 -246Q87 -249 86 -250H74Q66 -250 63 -250T58 -247T55 -238Q56 -237 66 -225Q221 -64 221 250T66 725Q56 737 55 738Q55 746 60 749Z"></path></g></g><g data-mml-node="mrow" transform="translate(2280.5,-686)"><g data-mml-node="mi"><path data-c="1D451" d="M366 683Q367 683 438 688T511 694Q523 694 523 686Q523 679 450 384T375 83T374 68Q374 26 402 26Q411 27 422 35Q443 55 463 131Q469 151 473 152Q475 153 483 153H487H491Q506 153 506 145Q506 140 503 129Q490 79 473 48T445 8T417 -8Q409 -10 393 -10Q359 -10 336 5T306 36L300 51Q299 52 296 50Q294 48 292 46Q233 -10 172 -10Q117 -10 75 30T33 157Q33 205 53 255T101 341Q148 398 195 420T280 442Q336 442 364 400Q369 394 369 396Q370 400 396 505T424 616Q424 629 417 632T378 637H357Q351 643 351 645T353 664Q358 683 366 683ZM352 326Q329 405 277 405Q242 405 210 374T160 293Q131 214 119 129Q119 126 119 118T118 106Q118 61 136 44T179 26Q233 26 290 98L298 109L352 326Z"></path></g><g data-mml-node="mi" transform="translate(520,0)"><path data-c="1D461" d="M26 385Q19 392 19 395Q19 399 22 411T27 425Q29 430 36 430T87 431H140L159 511Q162 522 166 540T173 566T179 586T187 603T197 615T211 624T229 626Q247 625 254 615T261 596Q261 589 252 549T232 470L222 433Q222 431 272 431H323Q330 424 330 420Q330 398 317 385H210L174 240Q135 80 135 68Q135 26 162 26Q197 26 230 60T283 144Q285 150 288 151T303 153H307Q322 153 322 145Q322 142 319 133Q314 117 301 95T267 48T216 6T155 -11Q125 -11 98 4T59 56Q57 64 57 83V101L92 241Q127 382 128 383Q128 385 77 385H26Z"></path></g></g><rect width="5201.9" height="60" x="120" y="220"></rect></g><g data-mml-node="mo" transform="translate(21221.8,0)"><path data-c="7D" d="M65 731Q65 745 68 747T88 750Q171 750 216 725T279 670Q288 649 289 635T291 501Q292 362 293 357Q306 312 345 291T417 269Q428 269 431 266T434 250T431 234T417 231Q380 231 345 210T298 157Q293 143 292 121T291 -28V-79Q291 -134 285 -156T256 -198Q202 -250 89 -250Q71 -250 68 -247T65 -230Q65 -224 65 -223T66 -218T69 -214T77 -213Q91 -213 108 -210T146 -200T183 -177T207 -139Q208 -134 209 3L210 139Q223 196 280 230Q315 247 330 250Q305 257 280 270Q225 304 212 352L210 362L209 498Q208 635 207 640Q195 680 154 696T77 713Q68 713 67 716T65 731Z"></path></g></g></g></svg></mjx-container><p>其中 <strong>err(t)</strong> 是当前值和目标值的误差，PID的公式就是<strong>对这个误差分别进行比例、积分、微分处理后叠加输出</strong>.</p>
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


