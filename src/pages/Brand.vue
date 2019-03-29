<template>
  <div class="main">
    <div class="brand">
      <div class="brand__contents">
        shop
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import setting from '../setting.js'

export default {
  name: 'Brand',
  components: {
    setting,
    mapGetters
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

  .brand {
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
