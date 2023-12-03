# 项目概述

- vite + react 项目。
- 由于 pnpm 的幽灵依赖会导致 `@umijs/fabric` 中的部分包依赖失败，若强制安装，则无法使用 `pnpm` 的特性。故推荐使用 `yarn` 或者 `npm` 初始化项目

```shell
yarn install # npm install
yarn add xxx # npm install xxx
yarn remove xxx # npm uninstall xxx
```

## 功能预览

![整体界面](https://cdn.jsdelivr.net/gh/json-q/picture-bed@main/2023/12202312031540183.png)

![本地化设置](https://cdn.jsdelivr.net/gh/json-q/picture-bed@main/2023/12202312031541594.png)

## 项目启动

该项目初始化使用 node 作为本地服务器，若要正常启动前台项目，需要对 `mock` 文件夹下的项目做初始化和运行

- 后台服务

```bash
cd mock
npm install
npm run start
```

- 前台服务

```bash
npm install # yarn install
npm run dev # yarn dev
```

此时若前台项目若依赖已经安装完成，则可以正常使用项目

## 注意事项

- 不支持 less 文件，若书写 css，可以采用 `antd-style` 来替代 less 或者使用 react 原生支持的 css module。
- 行内样式推荐使用 `tailwindcss` 书写，利于代码整洁和维护。
- antd 的 `message | modal | notification` 的静态方式无法消费 context 上下文，因此统一封装在 `@/hooks/useAppStatic` 文件中，来**替代由 antd 的导出**，由此导出的组件可消费上下文，否则需使用官方推荐的 hooks 形式。

## 特性

### Dep

- UI 库
  - `AntDesign` [国内镜像](https://ant-design.antgroup.com/)
  - `ProComponents` [国内镜像](components.antdigital.dev)
- 常用工具库
  - `dayjs` antd 内置时间库
  - `ahooks` react hooks 工具库。常用如 useRequest，类 class 的 setState 等等。[ahooks 官网](https://ahooks.js.org/zh-CN)
  - `qs` 请求参数序列化
  - `axios` 网络请求
- 状态管理
  - `zustand` 极简的状态管理库。[文档地址](https://docs.pmnd.rs/zustand/getting-started/introduction)
    - immer：实现不可变数据状态
    - devtools（内置）：可视化开发调试工具。需安装 chrome 插件。
    - persist（内置）：状态缓存
- 组件/页面缓存
  - `keepalive-for-react` 类 vue 的 keep-alive 实现。类似库：`react-activation`
  - 具体实现方式和使用可参考 [掘金文章](https://juejin.cn/post/7273434821807636515)
- 本地数据存储加密

### Dev

- css
  - `tailwindcss` 原子化 css 样式，减少 css 代码量。[文档地址](https://tailwindcss.com/)
  - `antd-style` css in js 写法。与 antd 高度融合，定制化主题，更简易消费主题 token。[文档地址](https://ant-design.github.io/antd-style/)
  - 由于 `antd-style` 与 `styled-component` 类似，本身就支持 less 写法, **但不会识别 less 文件**。故不再安装 `less` 以及对应 loader
- 代码规范
  - `@umijs/fabric` 集成了 eslint + prettier + stylelint 的代码书写规范。
  - `husky + commitlint + lint-stage` 代码检查及提交规范
- 数据
  - mock 文件夹下有自带的本地服务，安装依赖启动即可。

## 项目相关 Vscode 重要插件

- `ESLint`： 代码校验
- `Prettier - Code formatter`： 代码格式化
- `Tailwind CSS IntelliSense`： `tailwindcss` 语法提示。`ctrl + i` 快速弹出语法提示
- `vscode-styled-components`：识别 `antd-style` 的 css in js 写法，与 css 写法相同，否则只会识别为字符串，无任何提示
- 其它常用插件自行扩展。

> Eslint 和 Prettier 为**必装插件**，可以有效避免写法规则错误却无法检测识别
