/*
 * vuex-persistedstateをapplican simplestorage使うための記述
 */
import merge from 'deepmerge'
import * as shvl from 'shvl'

export default function (options, storage, key) {
  options = options || {}
  storage = window.localStorage
  key = options.key || 'vuex'
  let deviceFlg = false
  if (location.href.indexOf('localhost') !== -1) {
    deviceFlg = true
  }
  let tmpStore = null
  if (location.href.indexOf('localhost') === 0) {
    document.addEventListener('deviceready', () => {
      storage = window.applican.simpleStorage
      deviceFlg = true
      window.setTimeout(() => {
        getState(key, storage).then(res => {
          let savedState1 = shvl.get(options, 'getState', res)
          if (typeof savedState1 === 'object' && savedState1 !== null) {
            tmpStore.replaceState(merge(tmpStore.state, savedState1, {
              arrayMerge: options.arrayMerger || function (store, saved) { return saved },
              clone: false
            }))
          }
          (options.subscriber || subscriber)(tmpStore)(function (mutation, state) {
            if ((options.filter || filter)(mutation)) {
              (options.setState || setState)(
                key,
                (options.reducer || reducer)(state, options.paths || []),
                storage
              )
            }
          })
        }, err => {
          console.log(err)
        })
      }, 200)
    }, false)
  }

  function canWriteStorage (storage) {
    try {
      if (window.applican && location.href.indexOf('localhost') === 0) {
        storage.set('@@', 1, function () {})
        storage.remove('@@', function () {})
      } else {
        storage.setItem('@@', 1)
        storage.removeItem('@@')
      }
      return true
    } catch (e) {}

    return false
  }

  function getState (key, storage, value) {
    console.log('getState')
    return new Promise((resolve, reject) => {
      try {
        console.log('getState try')
        if (window.applican && location.href.indexOf('localhost') === 0) {
          console.log('applican')
          return (value = storage.get(key, (result) => {
            resolve(JSON.parse(result))
          })) && typeof value !== 'undefined'
            ? JSON.parse(value)
            : undefined
        } else {
          console.log('localstorage:', storage.getItem(key))
          return resolve(JSON.parse(storage.getItem(key)))
        }
      } catch (err) {
        console.log('getState catch:', err)
        reject(err)
      }
      resolve(undefined)
    })
  }

  function filter () {
    return true
  }

  function setState (key, state, storage) {
    if (window.applican) {
      return storage.set(key, JSON.stringify(state), function () {
        storage.get(key, (res) => {
          console.log('set & get', res)
        })
      })
    } else {
      storage.setItem(key, JSON.stringify(state))
      return storage.getItem(key)
    }
  }

  function reducer (state, paths) {
    return paths.length === 0
      ? state
      : paths.reduce(function (substate, path) {
        return shvl.set(substate, path, shvl.get(state, path))
      }, {})
  }

  function subscriber (store) {
    return function (handler) {
      return store.subscribe(handler)
    }
  }

  if (storage !== null && !canWriteStorage(storage)) {
    throw new Error('Invalid storage instance given')
  }

  return function (store) {
    tmpStore = store
    if (deviceFlg) {
      getState(key, storage).then(res => {
        let savedState2 = shvl.get(options, 'getState', res)

        if (typeof savedState2 === 'object' && savedState2 !== null) {
          store.replaceState(merge(store.state, savedState2, {
            arrayMerge: options.arrayMerger || function (store, saved) { return saved },
            clone: false
          }))
        }

        (options.subscriber || subscriber)(store)(function (mutation, state) {
          if ((options.filter || filter)(mutation)) {
            (options.setState || setState)(
              key,
              (options.reducer || reducer)(state, options.paths || []),
              storage
            )
          }
        })
      }, err => {
        console.log(err)
      })
    }
  }
}
