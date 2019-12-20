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

        <three-scene
          :frame_skip="1"
          :perspective_camera_fov="45"
          :camera_position_z="100"
        >
          <TestThreeVueActor
            :position_x="-40"
            :rotation_duration="6"
            :mesh_scale="10"
            :meshes="[0, 1, 2, 3, 4, 5]"
          />
        
        </three-scene>

        <three-scene
          :frame_skip="1"
          :perspective_camera_fov="45"
          :camera_position_z="100"
        >
          <three-mesh>
            <three-material></three-material>
            <three-geometry
              geometry_type="OBJLoader"
              geometry_file_url="obj/pistol.obj"></three-geometry>
          </three-mesh>
        
        </three-scene>

      </Page>
        
      <Page>

        
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
import MeshViewGL from "./components/ImageViewGL/MeshViewGL.vue"
import Page from "./components/Page.vue"
import Ticker from "./components/Ticker.vue"
import { TweenMax } from "gsap"
import { throttle } from "lodash-es"
import ThreeScene from "./components/ThreeVue/ThreeScene.vue"
import ThreeMesh from "./components/ThreeVue/ThreeMesh.vue"
import ThreeMaterial from "./components/ThreeVue/ThreeMaterial.vue"
import ThreeGeometry from "./components/ThreeVue/ThreeGeometry.vue"
import ThreeLight from "./components/ThreeVue/ThreeLight.vue"
import TestThreeVueActor from "./components/ThreeVue/Actors/TestThreeVueActor.vue"

export default Vue.extend({
  name: 'Beast',

  components: {
    ListPositionIndicator,
    // ImageViewGL,
    Page,
    Ticker,
    // MeshViewGL,
    ThreeScene,
    ThreeMesh,
    ThreeMaterial,
    ThreeGeometry,

    TestThreeVueActor
    // ThreeLight
  },

  mounted () {
    this.$store.state.game_loop.add((delta: Number)=>{
      let now: Number = +new Date()
      this.$store.state.shader_time += (delta) / 1000
      this.$store.state.shader_time = this.$store.state.shader_time % 1000000
      
    })
  },

  computed: {
    total_pages_count () {
      let pages = this.$refs.pages_wrapper.querySelectorAll(".page")
      return pages.length
    }
  },

  data: () => ({
    active_page_index: 0,
    scrooll_tween: null
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
          this.scroll_tween = null
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