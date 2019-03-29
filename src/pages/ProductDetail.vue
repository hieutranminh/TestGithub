<template>
  <div class="main">
    <div class="productdetail">
      <div class="productdetail__contents"/>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import setting from '../setting.js'

export default {
  name: 'ProductDetail',
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

  .productdetail {
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
