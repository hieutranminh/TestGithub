<template>
  <div class="header"/>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Header',
  components: {
    mapGetters
  },
  data () {
    return {
    }
  },
  methods: {
    motion: function () {
      this.$store.dispatch('changeNavigationState')
    },
    goBack: function () {
      this.$router.push('/')
    }
  },
  computed: {
    ...mapGetters(['navigation'])
  },
  created () {
  }
}
</script>

<style lang="postcss" scoped>
  .header {
    position: absolute;
    width: 100%;
    height: 40px;
    top: 0;
    left: 0;
    background: #ffffff;
    text-align: center;
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
