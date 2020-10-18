# 餐廳收藏清單

一個使用 Node.js + Express 打造的餐廳美食網站，此網站提供使用者瀏覽、搜尋餐廳功能，並可點擊各家餐廳以查看餐點類型、地址、地圖等詳細資訊。

### 功能列表

---

- 在首頁快速瀏覽所有餐廳清單
- 點擊餐廳圖片或餐廳名稱可進入查看詳細資訊，例如餐點類別、地址、電話、餐廳描述，並可點擊定位圖示連結至 Google 地圖
- 提供搜尋功能，使用者可輸入餐廳名稱關鍵字，以獲取符合內容的餐廳列表
- 在獲取搜尋結果後，可再次輸入關鍵字，縮小搜尋範圍，以查找最符合需求的餐廳
- 可點擊『新增餐廳』新增想加入的餐廳資訊
- 點擊餐廳圖卡上的"edit"按鈕，可編輯餐廳資訊
- 點擊餐廳圖卡上的"delete"按鈕，可將此餐廳從清單中刪除

### 環境建置需求

---

- Node.js: v10.15.0
- npm: 6.4.1
- nodemon: 2.0.4
- express: 4.17.1
- express-handlebars: 5.1.0
- body-parser: 1.19.0
- mongoDB: 4.2.9
- robo 3T: 1.4.1
- mongoose: 5.10.9

### 安裝

---

1. 開啟終端機 (Terminal)，clone 此專案至本機電腦
<p><code>git clone https://github.com/yunhsuanchin/Restaurant_List_2.git</code></p>

2. 進入專案資料夾
<p><code>cd Restaurant_List</p></code>

3. 透過 robo 3T 操作 mongoDB，與本機 localhost: 27017 建立連線，並建立名稱為 restaurant-list 的資料夾

4. 在終端機輸入 npm run seed，透過 nodemon 執行 restaurantSeeder.js，建立種子資料
<p><code>npm run seed</p></code>

5. 在終端機輸入 npm run dev，透過 nodemon 執行 app.js，建立資料庫連線，並啟動 local server 監聽

6. 當 terminal 出現以下字樣，表示伺服器已連結成功
<p><code>App is running on http://localhost/3000</p></code>
