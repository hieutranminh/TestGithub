<template>
  <div id="app">
    <Header/>
    <hamburger-menu/>
    <transition
      :name="transitionName"
      mode="out-in"
      @beforeLeave="beforeLeave"
      @enter="enter">
      <keep-alive>
        <router-view/>
      </keep-alive>
    </transition>
    <Footer/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Reset from '@/assets/css/reset.css'
import Default from '@/assets/css/default.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import HamburgerMenu from '@/components/HamburgerMenu'

export default {
  name: 'App',
  components: {
    mapGetters,
    Reset,
    Default,
    Header,
    Footer,
    HamburgerMenu
  },
  data () {
    return {
      prevHeight: 0
    }
  },
  computed: {
    ...mapGetters(['transitionName'])
  },
  created () {
  },
  methods: {
    beforeLeave (element) {
      this.prevHeight = getComputedStyle(element).height
    },
    enter (element) {
      const { height } = getComputedStyle(element)

      element.style.height = this.prevHeight

      setTimeout(() => {
        element.style.height = height
      })
    },
    afterEnter (element) {
      element.style.height = 'auto'
    }
  }
}
</script>

<style>
  #app {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
  }
  .fade-enter-active {
    transition: all 1s 0s ease;
  }
  .fade-enter {
    opacity: 0.9;
  }
  .slide-left-enter-active,
  .slide-left-leave-active,
  .slide-right-enter-active,
  .slide-right-leave-active {
    transition-duration: 0.2s;
    transition-property: height, opacity, transform;
    transition-timing-function: cubic-bezier(0.55, 0, 0.1, 1);
    overflow: hidden;
  }

  .slide-left-enter,
  .slide-right-leave-active {
    opacity: 0.1;
    transform: translate(95%, 0);
  }

  .slide-left-leave-active,
  .slide-right-enter {
    opacity: 0.1;
    transform: translate(-95%, 0);
  }
</style>
