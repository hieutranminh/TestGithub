import setting from '../setting.js'

export default class AppNotification {
  configure (config = {}) {
    this.options = config.app || {}
    this.notification = null
    this.notificationAvailable = false
    this.setting = setting
  }
  static install = (Vue, options) => {
    Object.defineProperty(Vue.prototype, '$appNotification', {
      get () { return this.$root._appNotification }
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
        if (this.$options.appNotification) {
          this._appNotification = this.$options.appNotification
          this._appNotification.configure(options)
        }
      },
      created () {
        if (this._appNotification) {
          this._appNotification.init()
        }
      }
    })
  }

  // init
  init () {
    this.notification = 'notification' in this.options ? this.options.notification : {}
    this.notificationAvailable = this.notification !== null ? Object.keys(this.notification).length > 0 : false
  }

  // notificationAlert
  notificationAlert (message, title, button) {
    return new Promise((resolve, reject) => {
      console.log('applican', window.applican)
      if (window.applican && setting.develop === false) {
        this.notification.alert(
          message,
          () => {
            resolve()
          },
          title,
          button
        )
      } else {
        console.log('title : ', title)
        console.log('message : ', message)
        resolve()
      }
    })
  }
  // 通常メッセージ用
  notificationNormal (msgCode, ttlCode) {
    let msg = this.setting.dialogMessage[msgCode]
    let ttl = this.setting.dialogTitle[ttlCode]
    this.notificationAlert(
      msg,
      ttl
    )
  }
  // エラーメッセージ用
  notificationErrorAlert (errCode, type, statusCode) {
    let msg = this.setting.errorMessage[errCode]
    msg += '\nErrorCode : ' + String(errCode) + String(type)
    if (statusCode) {
      msg += '\nStatusCode : ' + statusCode
    }
    this.notificationAlert(
      msg,
      this.setting.errorTitle
    )
  }
  // notificationConfirm
  notificationConfirm (message, title, button) {
    return new Promise((resolve, reject) => {
      console.log('applican', window.applican)
      if (window.applican && setting.develop === false) {
        this.notification.alert(
          message,
          (res) => {
            resolve(res)
          },
          title,
          button
        )
      } else {
        console.log('title : ', title)
        console.log('message : ', message)
        resolve()
      }
    })
  }
}
