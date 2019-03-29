import Vue from 'vue'
import Router from 'vue-router'
import Account from '@/pages/Account'
import Brand from '@/pages/Brand'
import Card from '@/pages/Card'
import Home from '@/pages/Home'
import NewsSetting from '@/pages/NewsSetting'
import Product from '@/pages/Product'
import ProductDetail from '@/pages/ProductDetail'
import Shop from '@/pages/Shop'
import ShopDetail from '@/pages/ShopDetail'
import ShopList from '@/pages/ShopList'
import Start from '@/pages/Start'
import Terms from '@/pages/Terms'
import Tutorial from '@/pages/Tutorial'

Vue.use(Router)

export default new Router({
  routes: [
    // ホーム
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: {
        transitionName: 'fade',
        priority: 0
      }
    },
    // アカウント設定
    {
      path: '/account',
      name: 'Account',
      component: Account,
      meta: {
        transitionName: 'fade',
        priority: 0
      }
    },
    // ストア検索
    {
      path: '/brand',
      name: 'Brand',
      component: Brand,
      meta: {
        transitionName: 'fade',
        priority: 0
      }
    },
    // BAKEカード
    {
      path: '/card',
      name: 'Card',
      component: Card,
      meta: {
        transitionName: 'fade',
        priority: 0
      }
    },
    // ニュースフィード設定
    {
      path: '/newsSetting',
      name: 'NewsSetting',
      component: NewsSetting,
      meta: {
        transitionName: 'fade',
        priority: 0
      }
    },
    // プロダクト
    {
      path: '/product',
      name: 'Product',
      component: Product,
      meta: {
        transitionName: 'fade',
        priority: 0
      }
    },
    // プロダクト詳細
    {
      path: '/productDetail/:id', // 0, 1, 2 ... n
      name: 'ProductDetail',
      component: ProductDetail,
      meta: {
        transitionName: 'fade',
        priority: 0
      }
    },
    // 都道府県一覧
    {
      path: '/shop/:id', // 0, 1, 2 ... n
      name: 'Shop',
      component: Shop,
      meta: {
        transitionName: 'fade',
        priority: 0
      }
    },
    // 店舗詳細
    {
      path: '/shopDetail/:id', // 0_0_0, 0_0_1, 0_0_2 ... 1_0_0 ... n_n_n
      name: 'ShopDetail',
      component: ShopDetail,
      meta: {
        transitionName: 'fade',
        priority: 0
      }
    },
    // 店舗一覧
    {
      path: '/shopList/:id', // 0_0, 0_1, 0_2 ... 1_0 ... n_n
      name: 'ShopList',
      component: ShopList,
      meta: {
        transitionName: 'fade',
        priority: 0
      }
    },
    // スタートアップ
    {
      path: '/start',
      name: 'Start',
      component: Start,
      meta: {
        transitionName: 'fade',
        priority: 0
      }
    },
    // 利用規約
    {
      path: '/terms',
      name: 'Terms',
      component: Terms,
      meta: {
        transitionName: 'fade',
        priority: 0
      }
    },
    // チュートリアル
    {
      path: '/tutorial',
      name: 'Tutorial',
      component: Tutorial,
      meta: {
        transitionName: 'fade',
        priority: 0
      }
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})
