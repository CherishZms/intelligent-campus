# 智慧园区管理平台（intelligent-campus）

> 基于 React 19 + TypeScript 构建的产业园区综合管理后台，覆盖租户、物业、财务、报修、招商、运营、能源等 10+ 业务模块，内置完整的 RBAC 动态路由与按钮级权限体系，以及 ECharts 数据可视化大屏。

![login](D:\Desktop\myProjects\项目整理\登录页面\login.png)


---

## 目录

- [项目简介](#项目简介)
- [功能模块](#功能模块)
- [页面预览](#页面预览)
- [技术栈](#技术栈)
- [核心设计与亮点](#核心设计与亮点)
- [项目结构](#项目结构)
- [快速开始](#快速开始)
- [演示账号](#演示账号)
- [后续计划](#后续计划)

---

## 项目简介

「朋远智慧园区」是一套面向产业园区的中后台管理系统，为园区运营方提供租户、楼宇、车辆、财务、报修、招商、能源等全场景的一站式管理能力。

项目采用 **React 19 + TypeScript** 技术栈，前端全部数据由本地 Mock 服务模拟，可完全离线运行，便于演示与二次开发。系统内置 **后端菜单驱动的动态路由** 与 **页面级 / 按钮级两级权限控制**，并通过泛型表格组件、数据列表 Hook、列配置驱动的导出能力等通用沉淀，大幅降低业务模块的开发成本。

| 指标 | 数据 |
| --- | --- |
| 业务模块 | 10+ |
| 源码规模 | 约 9,400 行 / 100 个源文件 |
| 演示账号 | 3 种角色（超级管理员 / 管理员 / 普通用户） |
| 数据来源 | 本地 Mock 服务（可完全离线运行） |

---

## 功能模块

| 模块 | 说明 |
| --- | --- |
| 工作台 | 园区数据可视化大屏：能源消耗堆叠折线图、企业资质柱状图、租赁情况玫瑰图、充电桩进度环、实时车辆动态 |
| 租户管理 | 租户列表的新增 / 编辑 / 批量删除 / 多条件检索，企业工商信息展示 |
| 物业管理 | 楼宇管理、房间管理（房源图 / 装修类型 / 单价）、车辆信息（车牌识别结果展示、充电记录） |
| 财务管理 | 合同管理、退租管理、账单管理，支持账单明细导出 Excel / PDF |
| 报修管理 | 报修工单的创建、指派、状态流转 |
| 招商管理 | 招商项目信息维护 |
| 运营管理 | 运营总览、文章发布 |
| 设备管理 | 园区设备台账与状态管理 |
| 能源消耗 | 当日 / 年度能源消耗分析、电力消耗占比、企业能耗排行 |
| 系统设置 | 系统账号管理、角色与权限分配 |
| 个人中心 | 当前登录用户信息维护 |

---

## 页面预览

| 登录 | 工作台 |
| --- | --- |
| ![login](D:\Desktop\myProjects\项目整理\登录页面\login.png) | ![dashboard](D:\Desktop\myProjects\项目整理\工作台\dashboard.png) |
| **租户列表** | **车辆信息** |
| ![userList](D:\Desktop\myProjects\项目整理\租户管理\userList.png) | ![estate-car](D:\Desktop\myProjects\项目整理\物业管理\estate-car.png) |
| **房间管理** | **报修管理** |
| ![estate-room](D:\Desktop\myProjects\项目整理\物业管理\estate-room.png) | ![repair](D:\Desktop\myProjects\项目整理\报修管理\repair.png) |
| **账单管理** | **合同管理** |
| ![bill](D:\Desktop\myProjects\项目整理\财务管理\bill.png) | ![contract](D:\Desktop\myProjects\项目整理\财务管理\contract.png) |
| **能源消耗** | **设备管理** |
| ![energy](D:\Desktop\myProjects\项目整理\能源消耗\energy.png) | ![equimemt](D:\Desktop\myProjects\项目整理\设备管理\equimemt.png) |
| **系统设置** | **个人中心** |
| ![settings](D:\Desktop\myProjects\项目整理\系统设置\settings.png) | ![personal](D:\Desktop\myProjects\项目整理\个人中心\personal.png) |

---

## 技术栈

| 分类 | 选型 |
| --- | --- |
| 核心框架 | React 19、TypeScript 4.9 |
| 路由 | React Router 7（`createBrowserRouter` + 动态路由） |
| 状态管理 | Redux Toolkit + Redux-Persist（按需持久化） |
| UI 组件 | Ant Design 6、SCSS（CSS Modules） |
| 数据可视化 | ECharts 6（`echarts-for-react`） |
| 网络请求 | Axios（二次封装拦截器） |
| 数据导出 | xlsx、html2canvas + jsPDF |
| 工程化 | Create React App + CRACO（自定义 webpack）、ESLint / Prettier |
| 数据模拟 | Mock.js |

---

## 核心设计与亮点

### 1. RBAC 动态路由与两级权限体系

采用**后端菜单驱动**方案，登录后按角色下发菜单树与权限码：

```
登录成功
  ├─ 写入 token / permissions / 菜单树 → Redux（authSlice 持久化）
  ├─ generateRouter() 递归将菜单树映射为 React Router 路由表
  ├─ GlobalGuard 路由守卫：isAllow / isLogin 双布尔量比对，双向拦截
  └─ AuthButton 按钮级权限：hasPermission(code)，支持 hide / disable 两种降级
```

- 路由实例通过 `useMemo` 缓存，并以 `key` 强制重置，规避了 `createBrowserRouter` 仅在 mount 时创建一次、后续不响应路由变化的问题。
- 侧边栏菜单与路由表由同一份菜单数据递归生成，天然保证菜单与可访问路由一致。
- 不同角色登录后看到的菜单、页面、按钮均不同，可用演示账号 `admin` 与 `user` 对比验证。

### 2. Axios 二次封装

- 请求拦截器自动从 Store 注入 `Bearer Token`（而非直接读 localStorage，保证单一数据源）。
- 响应拦截器统一校验业务状态码、规范化错误抛出。
- 对外仅暴露 `get / post / put / del` 四个统一签名方法与泛型响应结构，业务层零样板代码。

### 3. 通用组件与 Hooks 沉淀

| 名称 | 能力 |
| --- | --- |
| `BaseTable` | 泛型表格组件，自动生成序号列 / 操作列、列宽兜底、分页与空状态统一配置，`useMemo` 缓存列配置 |
| `useDataList` | 数据列表 Hook，统一管理分页、查询条件、loading 与请求生命周期 |
| `useExport` / `useExportPDF` | **列配置驱动**的导出方案：一份列配置同时支撑 Excel（xlsx）与 PDF（html2canvas 截图 + jsPDF 自动 A4 分页） |

### 4. 工程化配置

- CRACO 覆写 webpack 配置，配置 `@` 路径别名并同步 TypeScript `paths`。
- 拆分 `development` / `test` / `production` 三套环境变量。
- Mock 服务本地模拟全部接口，前后端可并行开发，项目可完全离线运行。

---

## 项目结构

```
intelligent-campus/
├── craco.config.js              # CRACO 配置（@ 别名）
├── .env.development|test|production
└── src/
    ├── api/                     # 接口定义（按业务域拆分）
    ├── assets/                  # 静态资源
    ├── components/              # 通用组件
    │   ├── BaseTable/           #   泛型表格
    │   ├── AuthButton/          #   按钮级权限
    │   ├── ExportButton/        #   Excel 导出
    │   ├── ExportPDFButton/     #   PDF 导出
    │   └── myHeader / mySlider / myBreadCrumb ...
    ├── hooks/                   # 自定义 Hooks
    │   ├── useDataList.tsx      #   列表数据流
    │   ├── usePermission.ts     #   权限判断
    │   ├── useExport.tsx        #   Excel 导出
    │   └── useExportPDF.tsx     #   PDF 导出
    ├── mock/                    # Mock 数据服务
    ├── pages/                   # 业务页面（11 个模块）
    ├── router/                  # 路由映射 / 动态路由生成 / 默认路由
    ├── store/                   # Redux Toolkit（含持久化）
    ├── types/                   # 全局类型
    └── utils/                   # 请求封装 / 工具函数
```

---

## 快速开始

```bash
# 1. 进入项目目录
cd intelligent-campus

# 2. 安装依赖
npm install

# 3. 启动开发服务器
npm start
```

启动后访问 <http://localhost:3000>，使用下方演示账号登录即可。

```bash
# 构建生产包
npm run build
```

> 环境要求：Node.js 16+（推荐 18+）。首次启动 webpack 编译约需 1-2 分钟。

---

## 演示账号

系统内置三种角色，登录后可见菜单与按钮权限均不同，可直接对比验证 RBAC 效果：

| 账号 | 密码 | 角色 | 权限说明 |
| --- | --- | --- | --- |
| `admin` | `123456` | 管理员 | 管理员菜单 + 增 / 改权限 |
| `user` | `123456` | 普通用户 | 精简菜单，仅 `user:add` 权限（按钮级权限演示） |

---

## 后续计划

- [ ] 引入 Vite 替换 CRA，提升开发与构建效率
- [ ] 打通真实后端服务，替换 Mock 数据
- [ ] 补充单元测试（React Testing Library）
- [ ] 图表数据全部改为接口驱动
- [ ] 新增移动端适配

---

<div align="center">
  <sub>Intelligent Campus © 2026 Created by <b>Mindy</b></sub>
</div>
