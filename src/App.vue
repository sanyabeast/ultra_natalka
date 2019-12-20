<template>
  <div 
    class="app-root"
    ref="root"
    v-on:mousewheel.prevent="on_mousewheel"
  >

    <SplashScreen
      :enabled="true"
      @before_disappearing="on_splashscreen_before_disappearing"
    />

    <div
      class="pages_wrapper"
      ref="pages_wrapper"
    >
      <PrimePage
        page_id="osobnyak"
        :page_index="0"
        ticker_text="osobnyak"
        page_image_src="pics/osobnyak_image.png"
        class="main_page"
        photo_caption_text="Osobnyak"
      />
        
      <PrimePage
        page_id="leverpresso"
        :page_index="1"
        ticker_text="leverpresso"
        page_image_src="pics/lp_image.png"
        photo_caption_text="Leverpresso"
      />

      <PrimePage
        page_id="kyivcorner"
        :page_index="2"
        ticker_text="kyivcorner"
        page_image_src="pics/kc_image.png"
        photo_caption_text="Kyivcorner"
      />
    </div>

  </div>
</template>



<script lang="ts">
import Vue from 'vue';
import PrimePage from "./components/Pages/PrimePage.vue"
import { TweenMax, TimelineMax } from "gsap"
import { throttle } from "lodash-es"

import SplashScreen from "./components/SplashScreen.vue"

export default Vue.extend({
  name: 'App',

  components: {
    PrimePage,
    SplashScreen
  },

  mounted () {
    this.setup_animations()
    let prev_time = +new Date()

    setInterval(()=>{
      let now = +new Date()
      this.$store.state.shader_time += (now - prev_time) / 1000000
      prev_time = now
      this.$store.state.shader_time = this.$store.state.shader_time % 10000000
    }, 1000/60)
  },

  computed: {
    total_pages_count () {
      let pages = this.$refs.pages_wrapper.querySelectorAll(".page")
      return pages.length
    }
  },
  

  data: () => {
    let appearing_animation = new TimelineMax()
    appearing_animation.pause()

    return {
      prev_page_index: 0,
      active_page_index: 0,
      last_scroll_direction: 1,
      scroll_tween_duration: 0.777,
      scroll_tween_easing: "Power4.easeInOut",
      scroll_tween_a: null,
      scroll_tween_b: null,
      appearing_animation
    }
  },

  watch: {
    active_page_index ( value ) {
      let pages = this.$refs.pages_wrapper.querySelectorAll(".page")
      let page = pages[value]
      let prev_page = pages[this.prev_page_index]

      if (this.scroll_tween_a !== null){
        this.scroll_tween_a.kill()
        this.scroll_tween_a = null
      }

      if (this.scroll_tween_b !== null){
        this.scroll_tween_b.kill()
        this.scroll_tween_b = null
      }

      switch ( this.last_scroll_direction ) {
        case 1:

          this.scroll_tween_a = TweenMax.fromTo( page, this.scroll_tween_duration, {
            xPercent: 100,
            opacity: 0
          }, {
            xPercent: 0,
            opacity: 1,
            ease: this.scroll_tween_easing,
            onComplete: ()=>{
              this.scroll_tween_a = null
            }
          } )

          this.scroll_tween_b =TweenMax.fromTo( prev_page, this.scroll_tween_duration, {
            xPercent: 0,
            opacity: 1,
          }, {
            xPercent: -100,
            opacity: 0,
            ease: this.scroll_tween_easing,
            onComplete: ()=>{
              this.scroll_tween_b = null
            }
          } )
          
        break;
        case -1:
          this.scroll_tween_a = TweenMax.fromTo( page, this.scroll_tween_duration, {
            xPercent: -100,
            opacity: 0,
          }, {
            xPercent: 0,
            opacity: 1,
            ease: this.scroll_tween_easing,
            onComplete: ()=>{
              this.scroll_tween_a = null
            }
          } )

          this.scroll_tween_b = TweenMax.fromTo( prev_page, this.scroll_tween_duration, {
            xPercent: 0,
            opacity: 1
          }, {
            xPercent: 100,
            opacity: 0,
            ease: this.scroll_tween_easing,
            onComplete: ()=>{
              this.scroll_tween_b = null
            }
          } )
        break;
      }

      // this.$refs.root.scrollLeft = value* 1000

      console.log(value)
    }
  },

  methods: {
    on_mousewheel: function( evt ){
      if (this.scroll_tween_a !== null && this.scroll_tween_b !== null) {
        return
      }

      let new_index = this.active_page_index
      if (evt.deltaY > 0){
        new_index++
        this.last_scroll_direction = 1
      } else {
        new_index--
        this.last_scroll_direction = -1
      }

      if (new_index >= this.total_pages_count){
        new_index = 0
        
      }

      if (new_index < 0){
        new_index = this.total_pages_count - 1
      }

      this.prev_page_index = this.active_page_index
      this.active_page_index = new_index
    },
    setup_animations () {
      this.appearing_animation.fromTo(this.$refs.pages_wrapper, 1, {
        yPercent: 0
      }, {
        yPercent: 0   
      })
    },
    on_splashscreen_before_disappearing () {
      // this.appearing_animation.resume()
    }
  }
});
</script>


<style lang="sass">
  html, body 
    width: 100%
    height: 100%
    margin: 0
    position: relative

  .app-root 
    background: #202020
    width: 100%
    height: 100%
    display: flex
    flex-direction: row
    width: 100vw

    .pages_wrapper
      width: 100%
      height: 100%
      display: flex
      flex-direction: row
      overflow: hidden


      .page 
        flex-shrink: 0
        width: 100vw
        position: absolute
        top: 0
        left: 0
        opacity: 0

        &.main_page 
          opacity: 1
        
        

</style>