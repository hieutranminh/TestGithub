import setting from '../setting.js'

export default class AppDevice {
  configure (config = {}) {
    this.options = config.app || {}
    this.device = null
    this.deviceAvailable = false
  }
  static install = (Vue, options) => {
    Object.defineProperty(Vue.prototype, '$appDevice', {
      get () { return this.$root._appDevice }
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
        if (this.$options.appDevice) {
          this._appDevice = this.$options.appDevice
          this._appDevice.configure(options)
        }
      },
      created () {
        if (this._appDevice) {
          this._appDevice.init()
        }
      }
    })
  }

  // init
  init () {
    console.log('device init')
    let tmpData = {}
    if (process.env.NODE_ENV === 'development') {
      tmpData = {
        name: 'E5823', // window.applican.device.name
        version: '7.1.1', // window.applican.device.version
        platform: 'Android', // window.applican.device.platform
        uuid: 'xxxxxxxxxxxxxxxxxx', // window.applican.device.uuid
        applican: '2.2.8', // window.applican.device.applican
        applican_type: 'development', // window.applican.device.applican_type
        package_name: 'jp.co.newphoria.debug.ca4la' // window.applican.device.package_name
      }
    }
    this.device = 'device' in this.options ? this.options.device : tmpData
    console.log('device init this.device:', this.device)
    this.deviceAvailable = this.device !== null ? Object.keys(this.device).length > 0 : false
  }

  // deviceGetPushToken
  deviceGetPushToken () {
    return new Promise((resolve, reject) => {
      console.log('deviceGetPushToken applican', window.applican)
      console.log('deviceGetPushToken this.device', this.device)
      console.log('DefinePlugin2:', process.env.NODE_ENV)
      if (window.applican && setting.develop === false) {
        this.device.getPushToken(
          (res) => {
            console.log('device getPushToken success: ', res)
            resolve(res)
          },
          (error) => {
            console.log('device getPushToken error: ', error)
            reject(error)
          }
        )
      } else {
        let tmpRes = {}
        if (process.env.NODE_ENV === 'development') {
          tmpRes = {
            pushToken: 'xxxxxxxxxxxxxxxxxxxxxx'
          }
        }
        console.log('device getPushToken not applican: ', tmpRes)
        resolve(tmpRes)
      }
    })
  }

  // deviceGetBacklightLevel
  deviceGetBacklightLevel () {
    return new Promise((resolve, reject) => {
      console.log('getScreenBacklightLevel applican', window.applican)
      console.log('getScreenBacklightLevel this.device', this.device)
      console.log('DefinePlugin2:', process.env.NODE_ENV)
      if (window.applican && setting.develop === false) {
        this.device.getScreenBacklightLevel(
          (res) => {
            console.log('device getScreenBacklightLevel success: ', res)
            resolve(res)
          },
          (error) => {
            console.log('device getScreenBacklightLevel error: ', error)
            reject(error)
          }
        )
      } else {
        let tmpRes = {}
        if (process.env.NODE_ENV === 'development') {
          tmpRes = {
            Level: 50
          }
        }
        console.log('device getScreenBacklightLevel not applican: ', tmpRes)
        resolve(tmpRes)
      }
    })
  }

  // SetBacklightLevel
  deviceSetBacklightLevel (num) {
    return new Promise((resolve, reject) => {
      console.log('deviceSetBacklightLevel applican', window.applican)
      console.log('deviceSetBacklightLevel this.device', this.device)
      console.log('DefinePlugin2:', process.env.NODE_ENV)
      console.log(num)
      if (window.applican && setting.develop === false) {
        this.device.setScreenBacklightLevel(
          num,
          (res) => {
            console.log('device setScreenBacklightLevel success: ', res)
            resolve(res)
          },
          (error) => {
            console.log('device setScreenBacklightLevel error: ', error)
            reject(error)
          }
        )
      } else {
        let tmpRes = {}
        if (process.env.NODE_ENV === 'development') {
          tmpRes = {
            Level: 80
          }
        }
        console.log('device setScreenBacklightLevel not applican: ', tmpRes)
        resolve(tmpRes)
      }
    })
  }
}
