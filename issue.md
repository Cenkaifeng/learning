## [Typescript: IDE reports TS2307: Cannot find module error for Vue components imports](https://github.com/vuejs/vue-cli/issues/1198)
### 描述
Webstorm 提示 `TS2307: Cannot find module '../views/Home.vue' or its corresponding type declarations.` ![TS2307.png](http://ww1.sinaimg.cn/large/68307314gy1githl662mbj20fw01xwec.jpg)

### 解决
首先 `shims-vue.d.ts` 保持如下配置
```js
declare module '*.vue' {
    import Vue from 'vue'
    export default Vue
    }
```
其次 `tsconfig.json` 配置 `"moduleResolution": "Node"`
最后，在 `src/@types/` 目录下 编写 `.d.ts` 声明文件
```js
declare module 'vue/types/vue' {
    interface Vue {
        $dialog: Dialog
        $toast: Toast
    }
}
```

### 参考
  - [DefinitelyTyped/DefinitelyTyped#24788 (comment)](https://github.com/DefinitelyTyped/DefinitelyTyped/issues/24788#issuecomment-516981522)
  - [由 shims-vue.d.ts 引发的思考](https://juejin.im/post/6844903882309500942)


## dayjs 在 Vue Typescript 项目中的声明
### 描述
在 `main.ts` 把 `dayjs` 挂载到 `Vue.prototype` 提供全局使用 
```js
import Vue from 'vue';
import dayjs from 'dayjs';

Vue.prototype.$dayjs = dayjs;
```
结果报错提示 `Property '$dayjs' does not exist on type`

### 解决
在 `src/@types/` 目录下，`index.d.ts` 声明
```js
declare module 'vue/types/vue' {
  // Declare augmentation for Vue
  interface Vue {
    $dayjs(date?: dayjs.ConfigType, option?: dayjs.OptionType, locale?: string): dayjs.Dayjs;
  }
}
```

### 参考
- [Some documentation/guidance to Typescript and using dayjs as a Vue.js plugin](https://github.com/iamkun/dayjs/issues/611)