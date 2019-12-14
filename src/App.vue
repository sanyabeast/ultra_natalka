<template>
  <div 
    class="app-root"
    ref="root"
    v-on:mousewheel.prevent="on_mousewheel"
  >
    <ListPositionIndicator 
      :scale="1"
      :total_count="3"
    />

    <div
      class="pages_wrapper"
      ref="pages_wrapper"
    >
      <Page >
        <ImageViewGL
          :shader="{
            shader_diffus_map_url: 'pics/image 8.png', 
            shader_distortion_map_url: 'pics/distortion_nmap.jpg', 
            shader_distortion_move_speed: 4, 
            shader_distortion_power: 0.333,
            shader_tint_on_hover_color: '#ff00ff',
            shader_tint_on_hover_speed: 5
          }"
          :frame_skipping="2"
          :image_size_x="720"
          :image_size_y="426"
          distortion_map="pics/distortion_nmap.jpg"
          :passes="['increase_global_effect_power_on_hover', 'distortion', 'render', 'tint_on_hover']"
        />

        <ImageViewGL
          :shader="{
            shader_diffus_map_url: 'pics/image 8.png', 
            shader_distortion_map_url: 'pics/stone_nmap.jpg', 
            shader_distortion_move_speed: 4, 
            shader_distortion_power: 0.333,
            shader_tint_on_hover_color: '#ff0000',
            shader_tint_on_hover_speed: 5,
            shader_increase_global_effect_power_speed: 1
          }"
          :frame_skipping="2"
          :image_size_x="720"
          :image_size_y="426"
          distortion_map="pics/distortion_nmap.jpg"
          :passes="['increase_global_effect_power_on_hover', 'parabolic_global_effect_power_modifier', 'sinusal_distortion', 'render', 'tint_on_hover']"
        />

        <MeshViewGL
          :shader_settings="{
            shader_diffus_map_url: 'pics/image 8.png', 
            shader_distortion_map_url: 'pics/distortion_nmap.jpg', 
            shader_distortion_move_speed: 4, 
            shader_distortion_power: 0.333,
            shader_tint_on_hover_color: '#ff00ff',
            shader_tint_on_hover_speed: 5
          }"
          :frame_skipping="3"
          :image_size_x="720"
          :image_size_y="426"
          distortion_map="pics/distortion_nmap.jpg"
          :passes="['increase_global_effect_power_on_hover', 'distortion', 'render', 'tint_on_hover']"
        />
        

        <Ticker
          text="osobnyak"
          :animation_speed="22"
        
        />

        <Ticker
          class="kek"
          text="LOLKEK!"
          :animation_speed="44"
        
        />

        <Ticker
          class="kek"
          text="чебуречек!"
          :animation_speed="16"
        
        />

      </Page>
        
      <Page>
        <ImageViewGL
          :shader="{
            shader_diffus_map_url: 'pics/image 8.png', 
            shader_distortion_map_url: 'pics/distortion_nmap.jpg', 
            shader_distortion_move_speed: 4, 
            shader_distortion_power: 0.333,
            shader_tint_on_hover_color: '#ff00ff',
            shader_tint_on_hover_speed: 5
          }"
          :frame_skipping="3"
          :image_size_x="720"
          :image_size_y="426"
          distortion_map="pics/distortion_nmap.jpg"
          :passes="['increase_global_effect_power_on_hover', 'distortion', 'render', 'tint_on_hover']"
        />


        <Ticker
          class="kek"
          text="чебуречек!"
          :animation_speed="16"
        
        />
      </Page>
      <Page>
        
      </Page>
    </div>

  </div>
</template>



<script lang="ts">
import Vue from 'vue';
import ListPositionIndicator from "./components/Slider/ListPositionIndicator.vue"
import ImageViewGL from "./components/ImageViewGL/ImageViewGL.vue"
import Page from "./components/Page.vue"
import Ticker from "./components/Ticker.vue"
import { TweenMax } from "gsap"
import { throttle } from "lodash-es"

export default Vue.extend({
  name: 'App',

  components: {
    ListPositionIndicator,
    ImageViewGL,
    Page,
    Ticker
  },

  mounted () {
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

  data: () => ({
    active_page_index: 0
  }),

  watch: {
    active_page_index ( value ) {
      let pages = this.$refs.pages_wrapper.querySelectorAll(".page")
      let page = pages[value]

      if (this.scrooll_tween){
        this.scrooll_tween.kill()
        this.scrooll_tween = null
      }

      this.scrooll_tween = TweenMax.to(this.$refs.root, 1, {
        scrollLeft: page.offsetLeft,
        onComplete: ()=>{
          this.scroll_twee = null
        }
      })

      // this.$refs.root.scrollLeft = value* 1000

      console.log(value)
    }
  },

  methods: {
    on_mousewheel: function( evt ){
      let new_index = this.active_page_index
      if (evt.deltaY > 0){
        new_index++
      } else {
        new_index--
      }

      if (new_index >= this.total_pages_count){
        new_index = 0
        
      }

      if (new_index < 0){
        new_index = this.total_pages_count - 1
      }

      this.active_page_index = new_index
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
    overflow-x: scroll!important

    .pages_wrapper
      display: flex
      flex-direction: row

      .image_view_gl 
        width: 100%
        height: 100%

      .list_position_indicator
        position: absolute 

      .page 
        width: 100vw
        position: relative
        .ticker 
          top: 0
          left: 0
          transform: rotateZ(-90deg)
          transform-origin: left right
          height: 100vh

          .kek 
            transform: translateX(-60%)

  
      

</style>