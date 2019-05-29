# vue-base

## 命令

### 项目启动
1. [node安装10.0.0+](https://nodejs.org/zh-cn/)

2. [yarn安装](https://yarn.bootcss.com/docs/install/#windows-stable)

3. 更换yarn源(可选操作项，如可翻墙，无需此步骤)
```
yarn config set registry 'https://registry.npm.taobao.org'
```

4. 安装依赖，项目目录下执行
```
yarn
```

5. 启动项目
```
npm start
```

5.浏览器访问：  http://localhost:8080 

### 辅助工具安装

1. chrome安装插件 vue,vue performance


### 编译开发环境代码，开启热替换服务器
```
npm start
```

### 编译正式环境代码
```
npm run build
```

### 运行接口mock
```
npm run mock
```

### 运行代码自动修复
```
npm run lint
```

### 运行单元测试
```
npm run test
```

```
src
├─assets  // 资源文件
│  ├─font
│  ├─images
│  ├─js
│  └─style
├─components // 共用组件
│  ├─business
│  └─common
├─http // 请求相关
├─mock // mock后端数据
├─pages
│  ├─about
│  │  └─components
│  └─home
├─store // 状态管理
│  └─modules
└─utils // 工具类
```
