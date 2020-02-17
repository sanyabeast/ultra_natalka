<template>
  <div 
      class="app-root"
      ref="root"
      :data-desktop="$store.getters.is_desktop"
      @mousemove="on_mousemove"
    >

    <SplashScreen
      :enabled="true"
      @before_disappearing="on_splashscreen_before_disappearing"
    />

    <div
        class="prime_pages_wrapper"
        ref="prime_pages_wrapper"
        v-on:mousewheel="on_prime_pages_wrapper_mousewheel"
        v-on:touchmove="on_prime_pages_scroll"
        v-on:touchstart="prime_pages_touch_captured = true"
        v-on:touchend="prime_pages_touch_captured = false; on_prime_pages_scroll()"
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
        initial_visibility="hidden"
        :initial_translation="{ x: 100, y: 0 }"
      />

      <PrimePage
        page_id="kyivcorner"
        :page_index="2"
        ticker_text="kyivcorner"
        page_image_src="pics/kc_image.png"
        photo_caption_text="Kyivcorner"
        @image_click="open_minor_page(2)"
        initial_visibility="hidden"
        :initial_translation="{ x: 100, y: 0 }"
      />
    </div>

    <BasicComponent
      class="minor_pages_wrapper"
      ref="minor_pages_wrapper"
      :initial_translation="{ x: 0, y: 100 }">
      <MinorPage
        page_id="osobnyak_details"
        prime_caption_text="OSOBNYAK"
        minor_caption_text="The house of Ukrainian brands. Shopping center with friendly-services."
        :appearing_animation_opacity="false"
        @next_clicked="on_minor_page_next_clicked(0)"
        :animations_enabled="minor_pages_animations_enabled"
        :images="[
          { src: 'pics/osobnyak/3 1.jpg' },
          { src: 'pics/osobnyak/3 2.jpg' },
          { src: 'pics/osobnyak/3 4.jpg' },
          { src: 'pics/osobnyak/3 5.jpg' },
          { src: 'pics/osobnyak/3 6.jpg' },
        ]"
      />

      <MinorPage
        page_id="leverpresso_details"
        prime_caption_text="LEVERPRESSO"
        minor_caption_text="Landing page for Kickstarters` project. Eco-friendly espresso maker."
        :appearing_animation_opacity="false"
        @next_clicked="on_minor_page_next_clicked(1)"
        :animations_enabled="minor_pages_animations_enabled"
        :images="[
          { src: 'pics/lp/MacBook Pro 3 1.jpg' },
          { src: 'pics/lp/MacBook Pro 3 2.jpg' },
          { src: 'pics/lp/MacBook Pro 3 3 1.jpg' },
          { src: 'pics/lp/MacBook Pro 3 4.jpg' },
          { src: 'pics/lp/MacBook Pro 3 5.jpg' },
        ]"

        initial_visibility="hidden"
        :initial_translation="{ x: 100, y: 0 }"
      />

      <MinorPage
        page_id="kyivcorner_details"
        prime_caption_text="KYIVCORNER"
        minor_caption_text="The house of Ukrainian brands. Shopping center with friendly-services."
        :appearing_animation_opacity="false"
        @next_clicked="on_minor_page_next_clicked(2)"
        :animations_enabled="minor_pages_animations_enabled"
        :images="[
          { src: 'pics/kc/kc (1).png' },
          { src: 'pics/kc/kc (2).png' },
          { src: 'pics/kc/kc (3).png' },
          { src: 'pics/kc/kc (4).png' },
        ]"

        initial_visibility="hidden"
        :initial_translation="{ x: 100, y: 0 }"
      />
    </BasicComponent>

    <div class="logo" @click="on_logo_click">
      <div class="content">N.P.</div>
    </div>

    <Arrow
      :enabled="minor_pages_shown"
      @click="on_minor_page_prev_clicked"
      arrow_caption="back"
    />

    <div class="about" @click="on_about_me_click">
      <div class="content">About Me</div>
    </div>

    <Page 
      class="about_page"
      ref="about_page"
      :appearing_animation_opacity="false"
      initial_visibility="hidden"
    >

      <div class="content">
        <div class="head">
          <div class="texts">
            <div class="text">Hello!</div>
            <div class="text">My name is <span @mouseover="on_about_name_over" @mouseout="on_about_name_out">Natalya Panasenko</span>. I am web designer from <span @mouseover="on_about_city_over" @mouseout="on_about_city_out">Kyiv</span>.</div>
            <div class="text">Some UI, some UX, some JS included.</div>
          </div>
          <div class="images">
            <img ref="about_page_image_city" src="pics/kyiv.png"/>
            <img ref="about_page_image_me" src="pics/me.png"/>
          </div>
        </div>

        <div class="foot">
          <div class="text">contact me at</div>
        </div>
        <div class="email">
          <div class="content">
            natasha.pnsnk@gmail.com
          </div>
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
import BasicComponent from "./components/BasicComponent.vue"
import Arrow from "./components/Arrow.vue"
import Ticker from "./components/Ticker.vue"
import { TweenMax, TimelineMax } from "gsap"
import { debounce, forEach } from "lodash-es"

import SplashScreen from "./components/SplashScreen.vue"


export default Vue.extend({
  name: 'App',

  components: {
    Page,
    PrimePage,
    MinorPage,
    Arrow,
    // Ticker,
    SplashScreen,
    BasicComponent
  },

  mounted () {
    this.setup_animations()
    let prev_time = +new Date()
    window.app = this
   
  },

  computed: {
    total_prime_pages_count () {
      let pages = this.$refs.prime_pages_wrapper.querySelectorAll(".page")
      return pages.length
    },
    total_minor_pages_count () {
      let pages = this.$refs.minor_pages_wrapper.$el.querySelectorAll(".page")
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
      prime_pages_touch_captured: false,
      prev_mousemove_time: +new Date(),
      mousemove_min_delay: 1000 / 10,
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
      minor_pages_shown: false,
      minor_pages_animations_enabled: false,
      scroll_tween_a: null,
      scroll_tween_b: null,
      appearing_animation,
      minor_page_appearing_animation,
      minor_page_disappearing_animation
    }
  },

  watch: {
    about_page_visible ( new_value ) {
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

      if (!page){
        return
      }

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
      let minor_pages = this.$refs.minor_pages_wrapper.$el.querySelectorAll(".page")
      let page = minor_pages[value]

      if (!page){
        console.log(`no such page: ${value}`)
        return
      }

      if ( value === this.prev_minor_page_index ) {
        console.log(`prev and current are equal: ${value}`)
      }

      let prev_page = minor_pages[this.prev_minor_page_index]

      switch ( this.last_scroll_direction ) {
        case 1:
          page.$component.scroll_to(0)

          if (value !== this.prev_minor_page_index){
            prev_page.$component.disappear_to(Include.Direction.Left)
          }

          page.$component.appear_from(Include.Direction.Right)
          
        break;
        case -1:
          page.$component.scroll_to(0)

          if (value !== this.prev_minor_page_index){
            prev_page.$component.disappear_to(Include.Direction.Right)
          }
          
          page.$component.appear_from(Include.Direction.Left)
        break;
      }
    },
    minor_pages_shown ( new_value ) {
      let minor_pages = this.$refs.minor_pages_wrapper.$el.querySelectorAll(".page")
              
      switch ( new_value ) {
        case true:
            this.$refs.minor_pages_wrapper.appear_from(Include.Direction.Down)
          break;

        case false:
            
            this.active_minor_page_index = -1

            this.$refs.minor_pages_wrapper.disappear_to(Include.Direction.Down, true, ()=>{
              forEach(minor_pages, ( page_el )=>{
                page_el.$component.disappear_to(Include.Direction.Left, false )
              })
            })
          break;
      } 
    }
  },

  methods: {
    on_about_city_over () {
      this.$refs.about_page_image_city.classList.add("shown")
    },
    on_about_city_out () {
      this.$refs.about_page_image_city.classList.remove("shown")
    },
    on_about_name_over () {
      this.$refs.about_page_image_me.classList.add("shown")
    },
    on_about_name_out () {
      this.$refs.about_page_image_me.classList.remove("shown")
    },

    on_mousemove ( evt ) {
      let now = +new Date()

      if (now - this.prev_mousemove_time < this.mousemove_min_delay){
        return
      }

      this.prev_mousemove_time = now

      this.$store.state.mouse_position_x = evt.pageX
      this.$store.state.mouse_position_y = evt.pageY
    },
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
    on_prime_pages_wrapper_next_clicked () {
      let prime_pages = this.$refs.prime_pages_wrapper.querySelectorAll(".page")
      let active_prime_page = prime_pages[ this.active_prime_page_index ]

      if (active_prime_page.$component.is_animating){
        return
      }

      this.last_scroll_direction = 1
      let new_index = this.rotate_index(true, this.active_prime_page_index, this.total_prime_pages_count)

      this.prev_prime_page_index = this.active_prime_page_index
      this.active_prime_page_index = new_index
    },
    on_prime_pages_wrapper_prev_clicked () {
      let prime_pages = this.$refs.prime_pages_wrapper.querySelectorAll(".page")
      let active_prime_page = prime_pages[ this.active_prime_page_index ]

      if (active_prime_page.$component.is_animating){
        return
      }

      this.last_scroll_direction = -1
      let new_index = this.rotate_index(false, this.active_prime_page_index, this.total_prime_pages_count)

      this.prev_prime_page_index = this.active_prime_page_index
      this.active_prime_page_index = new_index
    },
    on_prime_pages_wrapper_mousewheel: function( evt ){
      if ( this.$store.getters.is_desktop ) {
        evt.preventDefault()
        let prime_pages = this.$refs.prime_pages_wrapper.querySelectorAll(".page")
        let active_prime_page = prime_pages[ this.active_prime_page_index ]

        if (active_prime_page.$component.is_animating){
          return
        }

        this.last_scroll_direction = evt.deltaY > 0 ? 1 : -1
        let new_index = this.rotate_index(evt.deltaY > 0, this.active_prime_page_index, this.total_prime_pages_count)

        this.prev_prime_page_index = this.active_prime_page_index
        this.active_prime_page_index = new_index
      }
      
    },
    on_prime_pages_scroll: function ( evt ) {
      if ( !this.$store.getters.is_desktop ) {
        
        if (this.auto_scroll_tween){
          this.auto_scroll_tween.kill()
          this.auto_scroll_tween = null
        }

        if (!this.prime_pages_touch_captured){

          this.on_prime_pages_scroll_debounced( evt )
        }
        
      }
    }, 
    on_prime_pages_scroll_debounced: debounce(function( evt ){
      let pages = this.$refs.prime_pages_wrapper.querySelectorAll(".page")
      let scroll_position = this.$refs.prime_pages_wrapper.scrollTop
      
      let page_index = Math.round( scroll_position / window.innerHeight )

      this.auto_scroll_tween = TweenMax.to( this.$refs.prime_pages_wrapper, 0.333, {
        scrollTop: page_index * window.innerHeight,
        ease: "Power4.easeInOut",
        onComplete: ()=>{
          this.auto_scroll_tween = null
        }
      } )
    }, 1000),  
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
      this.minor_pages_animations_enabled = false
      this.minor_pages_shown = false

      this.$store.dispatch( "analyticsEvent", {
				cat: "main_page",
				action: "logo_clicked",
				label: `logo_clicked`
			} )
    },
    on_about_me_click () {
      this.minor_pages_animations_enabled = false
      this.minor_pages_shown = false
      this.about_page_visible = true

      this.$store.dispatch( "analyticsEvent", {
				cat: "about_page",
				action: "opened",
				label: `opened`
			} )
    },
    open_minor_page (page_index: String){
      this.active_minor_page_index = page_index
      this.minor_pages_shown = true
      this.minor_pages_animations_enabled = true

      this.$store.dispatch( "analyticsEvent", {
				cat: "project_page",
				action: "opened",
				label: `project_${this.active_minor_page_index}`
			} )
    },
    on_minor_page_next_clicked ( page_index: Number ){
      let new_index = this.rotate_index(true, page_index, 3)
      
      this.prev_minor_page_index = page_index
      this.last_scroll_direction = 1
      this.active_minor_page_index = new_index

      this.$store.dispatch( "analyticsEvent", {
				cat: "project_page",
				action: "next_button_clicked",
				label: `project_${this.active_minor_page_index}`
			} )

    },  
    on_minor_page_prev_clicked (){
      let page_index = this.active_minor_page_index
      let new_index = this.rotate_index(false, page_index, 3)

      this.prev_minor_page_index = page_index
      this.last_scroll_direction = -1
      this.active_minor_page_index = new_index

      this.$store.dispatch( "analyticsEvent", {
				cat: "project_page",
				action: "button_button_clicked",
				label: `project_${this.active_minor_page_index}`
			} )
    }
  }
});
</script>


<style lang="sass">

  ::-webkit-scrollbar 
    width: 4px
    height: 4px
  
  ::-webkit-scrollbar-button 
    width: 0px
    height: 0px
  
  ::-webkit-scrollbar-thumb 
    background: #47ffbd
    border: 0px none #ffffff
    border-radius: 50px
  
  ::-webkit-scrollbar-thumb:hover 
    background: #47ffbd
  
  ::-webkit-scrollbar-thumb:active 
    background: #47ffbd
  
  ::-webkit-scrollbar-track 
    background: #3a1242
    border: 0px none #3a1242
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
    background: #3a1242
    width: 100%
    height: 100%
    display: flex
    flex-direction: row
    width: 100vw

    * 
      user-select: none
      perspective: 500px

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
        color: #47FFA7

    .about 
      bottom: 48px
      top: auto
      .content  
        text-transform: capitalize

    .about_page
      position: absolute
      top: 0
      left: 0
      width: 100vw
      height: 100vh
      background: #3a1242
      display: flex
      flex-direction: column
      align-items: center
      justify-content: center
      visibility: hidden

      .email 
        color: #3a1242
        transition: color 0.5s ease-in-out, text-shadow 0.5s ease-in-out
        flex-shrink: 0
        font-family: 'Montserrat', sans-serif
        font-style: normal
        font-weight: 900
        font-size: 62px
        font-variant: small-caps
        -webkit-text-stroke: 2px #47ffa7
        // text-shadow: -1px -1px 0 #47FFBD,  1px -1px 0 #47FFBD, -1px 1px 0 #47FFBD,  1px 1px 0 #47FFBD 
        cursor: pointer
        letter-spacing: 0.1em

        &:hover 
          color: #47FFBD
          // -webkit-text-stroke: 2px transparent
          // text-shadow: -1px -1px 0 transparent,  1px -1px 0 transparent, -1px 1px 0 transparent,  1px 1px 0 transparent 

      .ticker 
        position: absolute
        left: auto
        width: 100vw
        transform-origin: bottom right
        cursor: pointer
        top: 55%
        transform: translateY(27%)

        .chunk
          animation-duration: 30s

          .text_wrapper 
            .p_node 
              font-size: 62px

      > .content 
        display: flex
        flex-direction: column

        .head 
          margin-bottom: 92px
          display: flex
          flex-direction: row
          align-items: flex-end

          .texts
            display: flex
            flex-direction: column

          .images
            position: relative
            width: 260px
            height: 170px
            overflow: hidden
            margin-left: 96px
            border: 2px solid #47ffbd

            img 
              
              opacity: 0
              position: absolute
              width: 100%
              transition: opacity 0.15s ease-in-out

              &.shown
                opacity: 1

        .text
          font-family: 'Montserrat', sans-serif
          font-style: normal
          font-weight: normal
          font-size: 18px
          color: #47FFA7
          line-height: 28px

          span 
            text-decoration: underline

            &:hover 
              color: #fff

          
          

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
          transform: translate(0)


    .minor_pages_wrapper 
      width: 100%
      height: 100%
      display: flex
      flex-direction: row
      top: 0
      left: 0
      background: #3a1242
      flex-shrink: 0
      position: absolute
      visibility: hidden
      transform: translateY(100%)

      .page 
        position: absolute
        flex-shrink: 0
        width: 100vw
        height: 100vh
        position: absolute
        top: 0
        left: 0
        background: #3a1242
        visibility: hidden

  .app-root[data-desktop="0"]

    .about_page 
      .content 
        width: 100%
        padding: 20px
        .head
          margin-bottom: 40px
          flex-direction: column-reverse
          align-items: flex-start

          span 
            text-decoration: none

            &:hover 
              color: auto

          .images
            display: none
            img 
              margin-left: 0
              margin-bottom: 48px
              display: none

        .email  
          letter-spacing: 0.02em
          .content
            padding: 0
            font-size: 24px


    .prime_pages_wrapper
      height: auto
      overflow-y: auto
      display: flex
      flex-direction: column

      .prime-page 
        position: relative
        transform: none!important
        opacity: 1!important
        visibility: visible!important

        .content 
          display: flex
          align-items: center
          justify-content: center
          padding: 20px

          .image_component
            width: calc(100vw - 40px)
            height: calc(100vw - 40px)
            transform: none!important
            img
              height: 100%
              width: auto


          .foot
            align-self: flex-start


        .ticker
          display: none
    .about
      bottom: auto
      left: auto
      top: 20px
      right: 20px
      .content
        color: #47FFA7

    .logo 
      bottom: auto
      left: 20px
      top: 20px
      right: auto
      .content
        color: #47FFA7

    .arrow_button
      display: none!important
    
        

</style>