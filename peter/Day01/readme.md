# Vue 3 Homework for Peter

## Day01

* 請將新建立的 Vue 3 專案上傳到各自目錄

	* 筆記
		1. 安裝軟體 生成專案 1ST_VUE_0127
		2. 執行 **npm run dev** 後 http://localhost:5173/ 會有網頁， **q+ ENTER** 將停止 web 看不到網頁
		3. **執行 npm run dev 期間**，html, vue, js上修改的程式與錯誤**將即時反映在瀏覽器上**
		4. 嘗試新增main2.js 以及新增 main2.js 和 id=app2 在 index.html，排版還搞不清楚，也許要再看看html怎麼寫??
		5. 如果同時存在 main.js 和 main2.js用 App.vue去生成，只要其中之一有套用 css就會互相影響，這樣的話要怎麼切換不同風格頁面?
		6. 嘗試將計數器程式碼加入App.vue，看起來\<template> 只能存在一個，有兩個會報錯
		7. 在\<template>中應該是html格式，**註解只能用 \<!-- -->**
		8. 在\<scrpit>就可以用 **//** 或 **/* */** 的註解
		9. count 的 button 的 style 好像與影片同，不知是Mac和Windows差異還是甚麼?