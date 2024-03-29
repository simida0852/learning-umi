import { defineConfig } from 'umi';
import defaultSettings from './defaultSettings';

export default defineConfig({
  define: {
    DOMAIN: 'http://127.0.0.1:7001',
  },
  hash: true,
  antd: {},
  dva: {
    hmr: true,
  },
  locale: {
    default: 'zh-CN',
    antd: true,
    baseNavigator: true,
  },
  dynamicImport: {
    loading: '@/components/PageLoading/index',
  },
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/docs/routing
  routes: [
    {
      path: '/user',
      component: '../layouts/UserLayout',
      routes: [
        {
          name: 'login',
          path: '/user/login',
          component: './user/login',
        },
      ],
    },
    {
      path: '/',
      component: '../layouts/SecurityLayout',
      routes: [
        {
          path: '/',
          component: '../layouts/BasicLayout',
          authority: ['admin', 'user'],
          routes: [
            {
              path: '/',
              redirect: '/welcome',
            },
            {
              path: '/welcome',
              name: 'welcome',
              icon: 'smile',
              component: './Welcome',
            },
            {
              name: '新闻管理',
              icon: 'profile',
              path: '/news-list',
              component: './News',
            },
            {
              name: '诗词管理',
              icon: 'user',
              path: '/poems-list',
              component: './Poems',
            },
            {
              name: '用户管理',
              icon: 'user',
              path: '/user-list',
              component: './system/User',
            },
            {
              name: '角色管理',
              icon: 'user-switch',
              path: '/role-list',
              component: './system/Role',
            },
          ],
        },
        {
          component: './404',
        },
      ],
    },
    {
      component: './404',
    },
  ],
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    // ...darkTheme,
    'primary-color': defaultSettings.primaryColor,
  },
  // @ts-ignore
  title: false,
  ignoreMomentLocale: true,
  manifest: {
    basePath: '/',
  },
});
