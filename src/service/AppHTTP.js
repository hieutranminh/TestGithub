import setting from '../setting.js'
import axios from 'axios'
console.log(axios)

export default class AppHTTP {
  configure (config = {}) {
    this.options = config.app || {}
    this.http = null
    this.httpAvailable = false
  }
  static install = (Vue, options) => {
    Object.defineProperty(Vue.prototype, '$appHTTP', {
      get () { return this.$root._appHTTP }
    })

    Vue.mixin({
      components: {
      },
      data () {
        return {
        }
      },
      computed: {
      },
      beforeCreate () {
        if (this.$options.appHTTP) {
          this._appHTTP = this.$options.appHTTP
          this._appHTTP.configure(options)
        }
      },
      created () {
        if (this._appHTTP) {
          this._appHTTP.init()
        }
      }
    })
  }

  // init
  init () {
    this.http = 'http' in this.options ? this.options.http : axios
    this.httpAvailable = Object.keys(this.http).length > 0
    console.log(this.http)
  }

  // httpGet
  httpGet (url, options) {
    return new Promise((resolve, reject) => {
      console.log('applican', window.applican)
      if (window.applican && setting.develop === false) {
        this.http.get(
          url,
          options,
          (res) => {
            console.log('httpGet success: ', res)
            resolve(res)
          },
          (error) => {
            console.log('httpGet error: ', error)
            reject(error)
          }
        )
      } else {
        axios.get(
          url,
          {
            headers: options.headers
          }
        ).then((res) => {
          console.log(res)
          resolve(res)
        }).catch((err) => {
          console.log(err)
          reject(err)
        })
      }
    })
  }
  // httpPost
  httpPost (url, options) {
    return new Promise((resolve, reject) => {
      console.log('applican', window.applican)
      if (window.applican && setting.develop === false) {
        console.log('1')
        this.http.post(
          url,
          options,
          (res) => {
            console.log('httpPost success: ', res)
            resolve(res)
          },
          (error) => {
            console.log('httpPost error: ', error)
            reject(error)
          }
        )
      } else {
        console.log('2')
        let params = new URLSearchParams()
        Object.keys(options.post).forEach(function (key, index) {
          params.append(key, options.post[key])
        })
        axios.post(
          url,
          params,
          {
            headers: options.headers
          }
        ).then((res) => {
          console.log(res)
          resolve(res)
        }).catch((err) => {
          console.log(err)
          reject(err)
        })
      }
    })
  }
}
