<template>
    <div 
        class="basic_component"
    >
        <slot></slot>
    </div>
</template>



<script lang="ts">

import Vue from 'vue';
import { mapState } from 'vuex'
import Include from "./Include"
import { TweenMax } from "gsap"


export default Vue.extend({
  name: 'BasicComponent',
  components: {

  },
  computed: mapState({
    normalized_mouse_pos_x: function( state, getters ){
      return getters.normalized_mouse_pos_x
    },
    normalized_mouse_pos_y: function( state, getters ){
      return getters.normalized_mouse_pos_y
    },
    ...{
      computed_rotation_prop () {
        return `
          rotate3d(${-(this.rotation_y - 0.5)}, ${(this.rotation_x - 0.5)}, 0, ${this.mouse_relative_perspective_rotation_power}deg)`
      }
    }
  }),
  watch: {
    normalized_mouse_pos_x ( new_value ) {
      if (this.use_mouse_relative_perspective_rotation3d){
        this.rotation_x = new_value
      }
    },
    normalized_mouse_pos_y ( new_value ) {
      if (this.use_mouse_relative_perspective_rotation3d){
        this.rotation_y = new_value
      }
    },
  },
  mounted () {
    this.$el.$component = this
    this.$el.style.visibility = this.initial_visibility
    this.$el.style.transform = `translate(${this.initial_translation.x}%, ${this.initial_translation.y}%)`
  },
  props: {
    initial_visibility: {
      type: String,
      default: ()=> "visible"
    },
    animations_enabled: {
      type: Boolean,
      default: ()=> true
    },
    initial_translation: {
      type: Object,
      default: ()=> {
        return { x: 0, y: 0 }
      }
    },
    appearing_animation_opacity: {
      type: Boolean,
      default: ()=> true
    },
    appearing_animation_duration: {
      type: Number,
      default: ()=> 0.5
    },
    appearing_animation_ease: {
      type: String,
      default: ()=> "Power3.easeInOut"
    },
    use_mouse_relative_perspective_rotation3d: {
      type: Boolean,
      default: ()=> false
    },
    mouse_relative_perspective_rotation_power: {
      type: Number,
      default: ()=> 0
    }
  },

  data: () => ({
    rotation_x: 0,
    rotation_y: 0,
    is_animating: false,
    current_transform: { x: 0, y: 0, opacity: 0 },
    active_tween: null
  }),

  methods: {
    update_styles () {
      if (this.appearing_animation_opacity) {
        this.$el.style.opacity = this.current_transform.opacity
      } else {
        this.$el.style.opacity = "1"
      }
      this.$el.style.transform = `translate(${this.current_transform.x}%, ${this.current_transform.y}%)`
    },
    scroll_to ( scroll_pos ) {

    },
    appear_from ( dir: Include.Direction, animation_enabled: Boolean = true, on_complete: Function = function(){} ) {

      console.log(`appearing: ${this.page_id}`)

      let $el = this.$el

      if (this.active_tween){
              this.active_tween.kill()
              this.active_tween = null
      }

      switch ( dir ) {
        case Include.Direction.Up:
          this.active_tween = TweenMax.fromTo( this.current_transform, (this.animations_enabled && animation_enabled) ? this.appearing_animation_duration : 0, {
            opacity: 0,
            y: -100,
            x:0,
          }, {
            opacity: 1,
            y: 0,
            x:0,
            onStart: ()=> { this.is_animating = true; this.$el.style.visibility="visible"; },
            onComplete: ()=> {this.is_animating = false; this.active_tween = null; on_complete(); },
            onUpdate: ()=> this.update_styles(),
            ease: this.appearing_animation_ease
          } )
        break;

        case Include.Direction.Down:
          this.active_tween = TweenMax.fromTo( this.current_transform, (this.animations_enabled && animation_enabled) ? this.appearing_animation_duration : 0, {
            opacity: 0,
            y: 100,
            x:0
          }, {
            opacity: 1,
            y: 0,
            x:0,
            onStart: ()=> {this.is_animating = true; this.$el.style.visibility="visible"; },
            onComplete: ()=> {this.is_animating = false; this.active_tween = null; on_complete(); },
            onUpdate: ()=> this.update_styles(),
            ease: this.appearing_animation_ease
          } )
        break;

        case Include.Direction.Left:
          this.active_tween = TweenMax.fromTo( this.current_transform, (this.animations_enabled && animation_enabled) ? this.appearing_animation_duration : 0, {
            opacity: 0,
            x: -100
          }, {
            opacity: 1,
            x: 0,
            onStart: ()=> {this.is_animating = true; this.$el.style.visibility="visible"; },
            onComplete: ()=> {this.is_animating = false; this.active_tween = null; on_complete(); },
            onUpdate: ()=> this.update_styles(),
            ease: this.appearing_animation_ease
          } )
        break;

        case Include.Direction.Right:
          this.active_tween = TweenMax.fromTo( this.current_transform, (this.animations_enabled && animation_enabled) ? this.appearing_animation_duration : 0, {
            opacity: 0,
            x: 100
          }, {
            opacity: 1,
            x: 0,
            onStart: ()=> {this.is_animating = true; this.$el.style.visibility="visible"; },
            onComplete: ()=> {this.is_animating = false; this.active_tween = null; on_complete(); },
            onUpdate: ()=> this.update_styles(),
            ease: this.appearing_animation_ease
          } )
        break;
      }

    },
    disappear_to ( dir: Include.Direction, animation_enabled = true, on_complete = function(){} ) {
      let $el = this.$el
        
      if (this.active_tween){
              this.active_tween.kill()
              this.active_tween = null
      }

      switch ( dir ) {
        case Include.Direction.Up:
          this.active_tween = TweenMax.fromTo( this.current_transform, (this.animations_enabled && animation_enabled) ? this.appearing_animation_duration : 0, {
            opacity: 1,
            y: 0,
            x:0,
          }, {
            opacity: 0,
            y: -100,
            x:0,
            onStart: ()=> {this.is_animating = true},
            onComplete: ()=> {this.is_animating = false; this.$el.style.visibility="hidden"; this.active_tween = null; on_complete(); },
            onUpdate: ()=> this.update_styles(),
            ease: this.appearing_animation_ease
          } )
        break;

        case Include.Direction.Down:
          this.active_tween = TweenMax.fromTo( this.current_transform, (this.animations_enabled && animation_enabled) ? this.appearing_animation_duration : 0, {
            opacity: 1,
            y: 0,
            x: 0,
          }, {
            opacity: 0,
            y: 100,
            x:0,
            onStart: ()=> {this.is_animating = true},
            onComplete: ()=> {this.is_animating = false; this.$el.style.visibility="hidden"; this.active_tween = null; on_complete(); },
            onUpdate: ()=> this.update_styles(),
            ease: this.appearing_animation_ease
          } )
        break;

        case Include.Direction.Left:
          console.log((this.animations_enabled && animation_enabled))
          this.active_tween = TweenMax.fromTo( this.current_transform, (this.animations_enabled && animation_enabled) ? this.appearing_animation_duration : 0, {
            opacity: 1,
            x: 0
          }, {
            opacity: 0,
            x: -100,
            onStart: ()=> {this.is_animating = true},
            onComplete: ()=> {this.is_animating = false; this.$el.style.visibility="hidden"; this.active_tween = null; on_complete(); },
            onUpdate: ()=> this.update_styles(),
            ease: this.appearing_animation_ease
          } )
        break;

        case Include.Direction.Right:
          this.active_tween = TweenMax.fromTo( this.current_transform, (this.animations_enabled && animation_enabled) ? this.appearing_animation_duration : 0, {
            opacity: 1,
            x: 0
          }, {
            opacity: 0,
            x: 100,
            onStart: ()=> {this.is_animating = true},
            onComplete: ()=> {this.is_animating = false; this.$el.style.visibility="hidden"; this.active_tween = null; on_complete(); },
            onUpdate: ()=> this.update_styles(),
            ease: this.appearing_animation_ease
          } )
        break;
      }
    }
  }
});
</script>


<style scoped lang="sass">

</style>