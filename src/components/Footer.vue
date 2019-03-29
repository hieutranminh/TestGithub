<template>
  <div class="footer">
    <button @click="$router.push('/')">Home</button>
    <button @click="$router.push('/card')">Card</button>
    <button @click="$router.push('/product')">Product</button>
    <button @click="$router.push('/shop')">Shop</button>
    <button @click="$router.push('/terms')">Terms</button>
    <button @click="$router.push('/tutorial')">Tutorial</button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Footer',
  components: {
    mapGetters
  },
  data () {
    return {
    }
  },
  methods: {
  },
  computed: {
    ...mapGetters(['navigation'])
  },
  created () {
  }
}
</script>

<style lang="postcss" scoped>
  .footer {
    position: absolute;
    width: 100%;
    height: 50px;
    bottom: 0;
    left: 0;
    background: #ffffff;
    text-align: center;
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: center;  }
</style>
