<template>
  <div 
    class="app-root"
    ref="root"
    >

    <SplashScreen
      :enabled="true"
      @before_disappearing="on_splashscreen_before_disappearing"
    />

    <div
        class="prime_pages_wrapper"
        ref="prime_pages_wrapper"
        v-on:mousewheel.prevent="on_prime_pages_wrapper_mousewheel"
      >
      <PrimePage
        page_id="osobnyak"
        :page_index="0"
        ticker_text="osobnyak"
        page_image_src="pics/osobnyak_image.png"
        class="main_page"
        photo_caption_text="Osobnyak"
        @image_click="open_minor_page(0)"
      />
        
      <PrimePage
        page_id="leverpresso"
        :page_index="1"
        ticker_text="leverpresso"
        page_image_src="pics/lp_image.png"
        photo_caption_text="Leverpresso"
        @image_click="open_minor_page(1)"
      />

      <PrimePage
        page_id="kyivcorner"
        :page_index="2"
        ticker_text="kyivcorner"
        page_image_src="pics/kc_image.png"
        photo_caption_text="Kyivcorner"
        @image_click="open_minor_page(2)"
      />
    </div>

    <div
      class="minor_pages_wrapper"
      ref="minor_pages_wrapper">
      <MinorPage
        prime_caption_text="OSOBNYAK"
        minor_caption_text="The house of Ukrainian brands. Shopping center with friendly-services."
        :animate_opacity="false"
        @next_clicked="on_minor_page_next_clicked(0)"
        :images="[
          { src: 'pics/osobnyak/os (1).png' },
          { src: 'pics/osobnyak/os (2).png' },
          { src: 'pics/osobnyak/os (3).png' },
          { src: 'pics/osobnyak/os (4).png' },
        ]"
      />

      <MinorPage
        prime_caption_text="LEVERPRESSO"
        minor_caption_text="Landing page for Kickstarters` project. Eco-friendly espresso maker."
        :animate_opacity="false"
        @next_clicked="on_minor_page_next_clicked(1)"
        :images="[
          { src: 'pics/lp/lp (1).jpg' },
          { src: 'pics/lp/lp (2).jpg' },
          { src: 'pics/lp/lp (3).jpg' },
          { src: 'pics/lp/lp (4).jpg' },
        ]"
      />

      <MinorPage
        prime_caption_text="KYIVCORNER"
        minor_caption_text="The house of Ukrainian brands. Shopping center with friendly-services."
        :animate_opacity="false"
        @next_clicked="on_minor_page_next_clicked(2)"
        :images="[
          { src: 'pics/kc/kc (1).png' },
          { src: 'pics/kc/kc (2).png' },
          { src: 'pics/kc/kc (3).png' },
          { src: 'pics/kc/kc (4).png' },
        ]"
      />
    </div>

    <div class="logo" @click="on_logo_click">
      <div class="content">N.P.</div>
    </div>

    <div class="arrow_separator">
      <div class="body"></div>
      <div class="arrow">
        <div class="a"></div>
        <div class="b"></div>
      </div>
    </div>

    <div class="about" @click="on_about_me_click">
      <div class="content">About Me</div>
    </div>

    <Page 
      class="about_page"
      ref="about_page"
    >

      <ticker
        text="natasha.pnsnk@gmail.com"
      />
      <div class="content">
        <div class="head">
          <div class="text">Hello!</div>
          <div class="text">My name is Natalya Panasenko. I am web designer from Kyiv.</div>
        </div>

        <div class="foot">
          <div class="text">contact me at</div>
        </div>
      </div>
    </Page>

  </div>
</template>



<script lang="ts">
import Vue from 'vue';
import Include from "./components/Include"
import PrimePage from "./components/Pages/PrimePage.vue"
import Page from "./components/Page.vue"
import MinorPage from "./components/Pages/MinorPage.vue"
import Ticker from "./components/Ticker.vue"
import { TweenMax, TimelineMax } from "gsap"
import { throttle, forEach } from "lodash-es"

import SplashScreen from "./components/SplashScreen.vue"

export default Vue.extend({
  name: 'App',

  components: {
    Page,
    PrimePage,
    MinorPage,
    Ticker,
    SplashScreen
  },

  mounted () {
    this.setup_animations()
    let prev_time = +new Date()
   
  },

  computed: {
    total_prime_pages_count () {
      let pages = this.$refs.prime_pages_wrapper.querySelectorAll(".page")
      return pages.length
    },
    total_minor_pages_count () {
      let pages = this.$refs.minor_pages_wrapper.querySelectorAll(".page")
      return pages.length
    }
  },
  

  data: () => {
    let appearing_animation = new TimelineMax()
    let minor_page_appearing_animation = new TimelineMax()
    let minor_page_disappearing_animation = new TimelineMax()

    appearing_animation.pause()
    minor_page_appearing_animation.pause()
    minor_page_disappearing_animation.pause()

    return {
      about_page_visible: false,
      prev_prime_page_index: 0,
      active_prime_page_index: 0,
      prev_minor_page_index: 0,
      active_minor_page_index: 0,
      last_scroll_direction: 1,
      scroll_tween_duration: 0.777,
      scroll_tween_easing: "Power3.easeInOut",
      minor_page_animation_duration: 0.555,
      minor_page_animation_easing: "Power3.easeInOut",
      minor_page_shown: false,
      active_minor_page: "",
      scroll_tween_a: null,
      scroll_tween_b: null,
      appearing_animation,
      minor_page_appearing_animation,
      minor_page_disappearing_animation
    }
  },

  watch: {
    about_page_visible ( new_value ) {
        console.log(new_value, this)
        switch (new_value) {
          case true:
              this.$refs.about_page.$component.appear_from(Include.Direction.Left)
            break;

          case false:
              this.$refs.about_page.$component.disappear_to(Include.Direction.Left)
            break;
        }
    },
    active_prime_page_index ( value ) {
      let prime_pages = this.$refs.prime_pages_wrapper.querySelectorAll(".page")
      let page = prime_pages[value]
      let prev_page = prime_pages[this.prev_prime_page_index]


      switch ( this.last_scroll_direction ) {

        case 1:
          page.$component.appear_from(Include.Direction.Right)
          prev_page.$component.disappear_to(Include.Direction.Left)
        break;
        case -1:
          page.$component.appear_from(Include.Direction.Left)
          prev_page.$component.disappear_to(Include.Direction.Right)
        break;
      }
    },
    active_minor_page_index ( value ) {
      let minor_pages = this.$refs.minor_pages_wrapper.querySelectorAll(".page")
      let page = minor_pages[value]
      let prev_page = minor_pages[this.prev_minor_page_index]

      switch ( this.last_scroll_direction ) {
        case 1:

          page.$component.appear_from(Include.Direction.Right)
          prev_page.$component.disappear_to(Include.Direction.Left)
          
        break;
        case -1:
          page.$component.appear_from(Include.Direction.Left)
          prev_page.$component.disappear_to(Include.Direction.Right)
        break;
      }
    },
    minor_page_shown ( new_value ) {
      let minor_pages = this.$refs.minor_pages_wrapper.querySelectorAll(".page")
      let active_page = minor_pages[ this.active_minor_page_index ]

      console.log(active_page, new_value)

      switch ( new_value ) {
        case true:
            active_page.$component.appear_from(Include.Direction.Down)
          break;

        case false:
            active_page.$component.disappear_to(Include.Direction.Down)
          break;
      } 
    }
  },

  methods: {
    rotate_index(increase: Boolean, current: Number, max: Number): Number {
      let result = current
      if (increase) {
        result++
      } else {
        result--
      }

      if (result>=max) result = 0
      if (result<0) result = max - 1
      
      return result

    },
    on_prime_pages_wrapper_mousewheel: function( evt ){
      this.last_scroll_direction = evt.deltaY > 0 ? 1 : -1
      let new_index = this.rotate_index(evt.deltaY > 0, this.active_prime_page_index, this.total_prime_pages_count)

      this.prev_prime_page_index = this.active_prime_page_index
      this.active_prime_page_index = new_index
    },
    setup_animations () {
      this.appearing_animation.fromTo(this.$refs.prime_pages_wrapper, 1, {
        yPercent: 0
      }, {
        yPercent: 0   
      })
    },
    on_splashscreen_before_disappearing () {
      // this.appearing_animation.resume()
    },
    on_logo_click () {
      this.about_page_visible = false
      this.minor_page_shown = false
      console.log(1)
    },
    on_about_me_click () {
      this.about_page_visible = true
    },
    open_minor_page (page_index: String){
      this.set_active_minor_page(page_index)
      this.minor_page_shown = true
      // this.active_minor_page = page_id
    },
    close_minor_page () {
      this.minor_page_shown = false
    },
    set_active_minor_page( index ) {
      let minor_pages = this.$refs.minor_pages_wrapper.querySelectorAll(".page")

      forEach(minor_pages, (page_el, _index)=>{
        if (index !== _index){
          page_el.style.opacity = 0
          page_el.style.transform = "translateX(-100%)"
        } else {
          page_el.style.opacity = 1
          page_el.style.transform = "translateX(0%)"
        }
      })


    },
    on_minor_page_next_clicked ( page_index ){
      this.prev_minor_page_index = page_index
      let new_index = this.rotate_index(true, page_index, 3)
      this.last_scroll_direction = 1
      this.active_minor_page_index = new_index
    }
  }
});
</script>


<style lang="sass">

  ::-webkit-scrollbar 
    width: 2px
    height: 2px
  
  ::-webkit-scrollbar-button 
    width: 0px
    height: 0px
  
  ::-webkit-scrollbar-thumb 
    background: #e1e1e1
    border: 0px none #ffffff
    border-radius: 50px
  
  ::-webkit-scrollbar-thumb:hover 
    background: #ffffff
  
  ::-webkit-scrollbar-thumb:active 
    background: #000000
  
  ::-webkit-scrollbar-track 
    background: #666666
    border: 0px none #ffffff
    border-radius: 50px
  
  ::-webkit-scrollbar-track:hover 
    background: #666666
  
  ::-webkit-scrollbar-track:active 
    background: #333333
  
  ::-webkit-scrollbar-corner 
    background: transparent
  

  html, body 
    width: 100%
    height: 100%
    margin: 0
    position: relative
    overflow: hidden!important

  .app-root 
    background: #202020
    width: 100%
    height: 100%
    display: flex
    flex-direction: row
    width: 100vw

    * 
      user-select: none

    .arrow_separator 
      position: fixed
      left: 120px
      top: 50%
      transform: translateY(-50%)
      z-index: 1
      .body 
        background-color: #47FFBD
        width: 50px
        height: 2px

    .logo, .about
      left: 120px
      position: fixed
      top: 48px
      cursor: pointer
      z-index: 1

      .content 
        font-family: 'Montserrat', sand-serif
        font-style: normal
        font-weight: 800
        font-size: 18px
        line-height: 22px
        text-transform: uppercase
        color: #ffffff

    .about 
      bottom: 48px
      top: auto

    .about_page
      position: absolute
      top: 0
      left: 0
      width: 100vw
      height: 100vh
      background: #202020
      display: flex
      flex-direction: column
      align-items: center
      justify-content: center
      visibility: hidden

      .ticker 
        position: absolute
        left: auto
        width: 100vw
        transform-origin: bottom right
        cursor: pointer
        top: 50%
        transform: translateY(27%)

        .chunk
          animation-duration: 30s

      > .content 
        display: flex
        flex-direction: column

        .head 
          margin-bottom: 92px

        .text
          font-family: 'Montserrat', sans-serif
          font-style: normal
          font-weight: normal
          font-size: 18px
          color: #FFFFFF

    .prime_pages_wrapper
      flex-shrink: 0
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


    .minor_pages_wrapper 
      width: 100%0
      display: flex
      flex-direction: row
      top: 0
      left: 0
      background: #202020
      flex-shrink: 0
      position: absolute

      .page 
        position: absolute
        flex-shrink: 0
        width: 100vw
        height: 100vh
        overflow-y: auto
        position: absolute
        top: 0
        left: 0
        background: #202020
        visibility: hidden
        

</style>