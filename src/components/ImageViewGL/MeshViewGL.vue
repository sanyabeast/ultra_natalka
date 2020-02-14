<template>
    <div 
        class="image_view_gl"
        ref="root"
    >
        <canvas
            ref="canvas"
            @mousemove="on_mousemove"
            @mouseover="on_mouseover"
            @mouseout="on_mouseout"
            
        ></canvas>
    </div>
</template>


<script lang="ts">

import { WebGLRenderer, Scene, PerspectiveCamera, PlaneBufferGeometry, ShaderMaterial, Mesh, TextureLoader, Vector2, Color } from "three"
import Vue from 'vue'
import { merge } from "lodash-es"
import ImageRenderingShader from "./Shaders/ImageRenderingShader.ts"
import { TweenMax } from "gsap"
import shader_tool from "./Shaders/ShaderTool.ts"

export default Vue.extend({
  name: 'MeshViewGL',

  props: {
      image_size_x: {
          type: Number,
          default: ()=> 1
      },
      image_size_y: {
          type: Number,
          default: ()=> 1
      },
      renderer_size: {
          type: Vector2,
          default: ()=> new Vector2(1, 1)
      },
      shader_settings: {
          type: Object
      },
      passes: {
          type: Array
      },
      effect_duration: {
          type: Number,
          default: ()=> 1
      },
      frame_skipping: {
          type: Number,
          default: ()=>2
      }
  },


  components: {

  },

  mounted () {
    this.context2d = this.$refs.canvas.getContext("2d")

    let scene = new Scene();
    let camera = new PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

    this.scene = scene
    this.camera = camera

    let image_rendering_mesh = this.image_rendering_mesh = this.create_image_mesh()
    scene.add(image_rendering_mesh)

    this.update_renderer_size() 
    this.$store.state.game_loop.add(()=>{
        this.render()
    })

  },

  data: () => ({
    render_every_frame: true,
    active_tween: null,
    frame_index: 0,
  }),

  methods: {
      update_renderer_size () {
          let root_bound_rect = this.$refs.root.getBoundingClientRect()
          let device_pixel_ratio = window.devicePixelRatio
          this.renderer_size.set(root_bound_rect.width * device_pixel_ratio, root_bound_rect.height * device_pixel_ratio)

          this.image_rendering_mesh.material.uniforms.resolution.value.x = root_bound_rect.width * device_pixel_ratio
          this.image_rendering_mesh.material.uniforms.resolution.value.y = root_bound_rect.height * device_pixel_ratio

          this.$refs.canvas.width = root_bound_rect.width * device_pixel_ratio
          this.$refs.canvas.height = root_bound_rect.height * device_pixel_ratio

          this.render()
      },
      create_image_mesh () {
          var texture = new TextureLoader().load( this.image_url );

          let g = new PlaneBufferGeometry(1,1,1)

          let m = new ShaderMaterial(shader_tool.build(ImageRenderingShader, this.passes, this))

        window.m = m


          return new Mesh(g, m)
      },
      render () {
            this.frame_index++

            if(this.frame_index % this.frame_skipping != 0){
                return
            }

            this.image_rendering_mesh.material.uniforms.time.value = this.$store.state.shader_time

            this.$store.state.gl_renderer.setSize(this.renderer_size.x, this.renderer_size.y)
            this.$store.state.gl_renderer.render(this.scene, this.camera)

            this.context2d.drawImage(this.$store.state.gl_renderer.domElement, 0, 0)
      },
      on_mousemove (evt) {
        let root_b_rect = this.$refs.root.getBoundingClientRect(  )
        this.image_rendering_mesh.material.uniforms.cursor.value.set(
           evt.offsetX / this.$refs.canvas.width, 
          ((this.$refs.canvas.height - evt.offsetY) / this.$refs.canvas.height), 

        )
      },
      on_mouseover () {
        if (this.active_tween !== null){
            this.active_tween.kill()
            this.active_tween = null
        }

        this.image_rendering_mesh.material.uniforms.pointerout_time.value = -1
        this.active_tween = TweenMax.fromTo(this.image_rendering_mesh.material.uniforms.pointerover_time, this.effect_duration, {
            value: 0
        }, {
            value: 1
        })


      },
      on_mouseout () {
        if (this.active_tween !== null){
            this.active_tween.kill()
            this.active_tween = null
        }
        
        this.image_rendering_mesh.material.uniforms.pointerover_time.value = -1
        this.active_tween = TweenMax.fromTo(this.image_rendering_mesh.material.uniforms.pointerout_time, this.effect_duration, {
            value: 0
        }, {
            value: 1
        })
      },
  }
});
</script>


<style lang="sass">

    .image_view_gl 
        width: 100%
        height:  100%
        z-index: 1

        canvas 
            width: 100%
            height:  100%  

</style>