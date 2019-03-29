import Vue from 'vue'
import Vuex from 'vuex'
// vuex-persistedstateをsimplestorage使うための記述
import createPersistedState from '@/service'
// import createPersistedState from 'vuex-persistedstate'
// applicanのhttpメソッドではなくaxiosを使う場合
import axios from 'axios'
console.log(axios)
const baseurl = 'http://xxx.xxx.xxx/api'

Vue.use(Vuex)

const state = {
  transitionName: 'fade',
  navigation: {
    state: false
  },
  deviceToken: null,
  hogeApiTestData: null
}

const actions = {
  // applicanのhttpメソッドではなくaxiosを使う場合のサンプルコード
  hogeApiTest ({state, commit}) {
    return new Promise((resolve, reject) => {
      axios.get(
        baseurl + '/hoge',
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      ).then((res) => {
        console.log(res)
        commit('hogeApiTest', res)
        resolve(res)
      }).catch((err) => {
        console.log(err)
        reject(err)
      })
    })
  },
  changeTransitionName ({ state, commit }, { name }) {
    commit('changeTransitionName', name)
  },
  // ナビゲーション
  changeNavigationState ({ state, commit }) {
    commit('changeNavigationState')
  },
  closeNavigation ({ state, commit }) {
    commit('closeNavigation')
  }
}

const mutations = {
  hogeApiTest (state, payload) {
    state.hogeApiTestData = Object.assign({}, state.hogeApiTestData, payload)
  },
  changeTransitionName (state, payload) {
    state.transitionName = payload
  },
  // ナビゲーション
  changeNavigationState (state, payload) {
    state.navigation.state = !state.navigation.state
  },
  closeNavigation (state, payload) {
    state.navigation.state = false
  }
}

const getters = {
  transitionName: state => state.transitionName,
  navigation: state => state.navigation,
  deviceToken: state => state.deviceToken
}

export default new Vuex.Store({
  state,
  actions,
  mutations,
  getters,
  plugins: [createPersistedState(
    {
      key: 'bake_app',
      // 明示的にsimplestorage/localstorageに保存するものを記載する
      reducer: state => ({
        deviceToken: state.deviceToken
      })
    }
  )]
})
