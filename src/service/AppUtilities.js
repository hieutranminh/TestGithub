import setting from '../setting.js'

export default class AppUtilities {
  configure (config = {}) {
    this.options = config.app || {}
    this.Store = config.store || null
    this.utilities = null
    this.utilitiesAvailable = false
    this.stopDownload = false
    this.percentage = 0
    this.downloadedFile = null
  }
  static install = (Vue, options) => {
    Object.defineProperty(Vue.prototype, '$appUtilities', {
      get () { return this.$root._appUtilities }
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
        if (this.$options.appUtilities) {
          this._appUtilities = this.$options.appUtilities
          this._appUtilities.configure(options)
        }
      },
      created () {
        if (this._appUtilities) {
          this._appUtilities.init(this)
        }
      }
    })
  }

  // init
  init (elem) {
    this.utilities = 'utilities' in this.options ? this.options.utilities : null
    this.utilitiesAvailable = this.utilities !== null ? Object.keys(this.utilities).length > 0 : false
    console.log('utilities init', this)
    console.log(this.utilities)
  }

  // ダウンロード
  download (settings) {
    let options = {
      url: settings.url,
      timeout: settings.timeout || 180,
      destination: 'cache'
    }
    this.Store.dispatch('resetDownloadPercentage')
    return new Promise((resolve, reject) => {
      if (window.applican && setting.develop === false) {
        this.utilities.download(
          options,
          // progress
          percentage => {
            console.log('percentage', percentage)
            if (this.stopDownload) {
              let isCancelComplete = false
              this.cancel(isCancelComplete)
            } else {
              this.Store.dispatch('updateDownloadPercentage', {
                percentage: percentage
              })
            }
          },
          // success
          result => {
            this.downloadedFile = result.fullPath
            resolve(this.downloadedFile)
          },
          // error
          error => {
            reject(error)
          }
        )
      }
    })
  }
  // キャンセル
  cancel () {
    this.stopDownload = true
  }
  // unzip
  unzip (settings) {
    let options = {
      source: settings.source,
      target: settings.target
    }
    return new Promise((resolve, reject) => {
      this.utilities.unzip(
        options,
        path => {
          console.log('unzip', path)
          resolve(path)
        },
        error => {
          reject(error)
        }
      )
    })
  }
}
