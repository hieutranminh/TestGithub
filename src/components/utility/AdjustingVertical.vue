<script>
export default {
  components: {
  },
  data () {
    return {
    }
  },
  computed: {
  },
  created () {
  },
  activated () {
    // iOS12にてinput、selectでキーボードが表示されると背景の位置がずれるバグの対応
    const selectElement = document.getElementsByTagName('select')
    // console.log('selectElement:', selectElement)
    for (let i = 0; i < selectElement.length; i++) {
      selectElement[i].addEventListener('blur', function (e) {
        // console.log('mounted1:', e)
        const id = window.setTimeout(() => {
          clearTimeout(id)
          if (document.activeElement.tagName === 'BODY') {
            document.getElementById('app').scrollIntoView({behavior: 'smooth', block: 'end'})
          }
        }, 10)
      }, false)
    }
    const inputElement = document.getElementsByTagName('input')
    console.log('inputElement:', inputElement)
    for (let i = 0; i < inputElement.length; i++) {
      inputElement[i].addEventListener('blur', function (e) {
        console.log('mounted2:', e)
        const id = window.setTimeout(() => {
          clearTimeout(id)
          if (document.activeElement.tagName === 'BODY') {
            document.getElementById('app').scrollIntoView({behavior: 'smooth', block: 'end'})
          }
        }, 10)
      }, false)
    }
  },
  beforeDestroy () {
    // iOS12にてinput、selectでキーボードが表示されると背景の位置がずれるバグの対応
    const selectElement = document.getElementsByTagName('select')
    // console.log('selectElement:', selectElement)
    for (let i = 0; i < selectElement.length; i++) {
      selectElement[i].removeEventListener('blur')
    }
    const inputElement = document.getElementsByTagName('input')
    console.log('inputElement:', inputElement)
    for (let i = 0; i < inputElement.length; i++) {
      inputElement[i].removeEventListener('blur')
    }
  },
  methods: {
  }
}
</script>
