import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import layout from '@/layout/index.vue'
/**
 * 私有路由表
 */
const privateRoutes = [
    {
        path: '/user',
        component: layout,
        redirect: '/user/manage',
        meta: {
            title: 'user',
            icon: 'personnel'
        },
        children: [
            {
                path: '/user/manage',
                component: () => import('@/views/user-manage/index.vue'),
                meta: {
                    title: 'userManage',
                    icon: 'personnel-manage'
                }
            },
            {
                path: '/user/role',
                component: () => import('@/views/role-list/index.vue'),
                meta: {
                    title: 'roleList',
                    icon: 'role'
                }
            },
            {
                path: '/user/permission',
                component: () => import('@/views/permission-list/index.vue'),
                meta: {
                    title: 'permissionList',
                    icon: 'permission'
                }
            },
            {
                path: '/user/info/:id',
                name: 'userInfo',
                component: () => import('@/views/user-info/index.vue'),
                meta: {
                    title: 'userInfo'
                }
            },
            {
                path: '/user/import',
                name: 'import',
                component: () => import('@/views/import/index.vue'),
                meta: {
                    title: 'excelImport'
                }
            }
        ]
    },
    {
        path: '/article',
        component: layout,
        redirect: '/article/ranking',
        meta: {
            title: 'article',
            icon: 'article'
        },
        children: [
            {
                path: '/article/ranking',
                component: () => import('@/views/article-ranking/index.vue'),
                meta: {
                    title: 'articleRanking',
                    icon: 'article-ranking'
                }
            },
            {
                path: '/article/:id',
                component: () => import('@/views/article-detail/index.vue'),
                meta: {
                    title: 'articleDetail'
                }
            },
            {
                path: '/article/create',
                component: () => import('@/views/article-create/index.vue'),
                meta: {
                    title: 'articleCreate',
                    icon: 'article-create'
                }
            },
            {
                path: '/article/editor/:id',
                component: () => import('@/views/article-create/index.vue'),
                meta: {
                    title: 'articleEditor'
                }
            }
        ]
    },
      {
        path: '/chart',
        component: layout,
        redirect: '/chart/network',
        meta: {
            title: 'chart',
            icon: 'example'
        },
        children: [
            {
                path: '/chart/network',
                component: () => import('@/views/network/index.vue'),
                meta: {
                    title: 'network',
                    icon: 'picture'
                }
            },
            {
                path: '/chart/tree',
                component: () => import('@/views/cmp-tree/index.vue'),
                meta: {
                    title: 'cmpTree',
                    icon: 'picture'
                }
            }
        ]
    },
      {
        path: '/form',
        component: layout,
        redirect: '/form/basicForm',
        meta: {
            title: 'form',
            icon: 'example'
        },
        children: [
            {
                path: '/form/basicForm',
                component: () => import('@/views/form/index.vue'),
                meta: {
                    title: 'basicForm',
                    icon: 'picture'
                }
            },
            {
                path: '/form/dynamicForm',
                component: () => import('@/views/form/dynamicForm.vue'),
                meta: {
                    title: 'dynamicForm',
                    icon: 'picture'
                }
            },
        ]
    },
]

/**
 * 公开路由表
 */
const publicRoutes: RouteRecordRaw[] = [
  {
    name: 'login',
    path: '/login',
    component: () => import('@/views/login/index.vue'),
  },
  {
    name:'home',
    path: '/',
    // 注意：带有路径“/”的记录中的组件“默认”是一个不返回 Promise 的函数
    // component: () => import('@/layout/index.vue'),
    component: layout,
    redirect: '/profile',
    children: [
      {
        path: '/profile',
        name: 'profile',
        component: () => import('@/views/profile/index.vue'),
        meta: {
          title: 'profile',
          icon: 'el-icon-user',
        },
      },
      {
        path: '/404',
        name: '404',
        component: () => import('@/views/error-page/404.vue'),
      },
      {
        path: '/401',
        name: '401',
        component: () => import('@/views/error-page/401.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: [...publicRoutes, ...privateRoutes],
})

export default router
