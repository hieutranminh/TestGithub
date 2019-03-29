<template>
  <div class="main">
    <div class="home">
      <div class="home__contents">
        home
        <button @click="$appNotification.notificationAlert('アプリカン機能テスト', '成功', 'OK')">Test Notification</button>
      </div>
      <fab/>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import setting from '../setting.js'
import Fab from '../components/Fab'

export default {
  name: 'Home',
  components: {
    setting,
    mapGetters,
    Fab
  },
  computed: {
    ...mapGetters(['navigation'])
  },
  data () {
    return {
      setting,
      publicPath: process.env
    }
  },
  mounted () {
  },
  created () {
  },
  beforeUpdate () {
  },
  updated () {
  },
  activated () {
  },
  methods: {
  }
}
</script>
<style lang="postcss" scoped>
  @import '../assets/css/mixins.css';
  @import '../assets/css/variables.css';

  .home {
    width: 100%;
    height: var(--main-height);
    position: relative;
    z-index: 10;
    background-color: #ffffff;
    &__contents {
      padding: 0 78px;
      margin-top: 40px;
      &:after {
        content: '';
        display: block;
        clear: both;
      }
    }
  }
</style>
