 # express基础
 $ nodemon app.js
 
 ### 说明
 express的本质就是
 1. 创建服务器
  - server = express()
 2. 添加对 get、post的处理
  - server.get()
 3. 或者使用router模块化添加逻辑
  - server.use()
 4. 最终创建服务器
  - sever.listen()
  
  
