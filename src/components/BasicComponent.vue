<template>
    <div 
        class="basic_component"
    >
        <slot></slot>
    </div>
</template>



<script lang="ts">

import Vue from 'vue';
import Include from "./Include"
import { TweenMax } from "gsap"


export default Vue.extend({
  name: 'BasicComponent',
  components: {

  },
  mounted () {
    this.$el.$component = this
  },
  props: {
    appearing_animation_opacity: {
      type: Boolean,
      default: ()=> true
    },
    appearing_animation_duration: {
      type: Number,
      default: ()=> 0.5
    }
  },

  data: () => ({
    is_animating: false,
    current_transform: { x: 0, y: 0 }
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
    appear_from ( dir: Include.Direction, el: Element ) {

      let $el = el || this.$el

      switch ( dir ) {
        case Include.Direction.Up:
          return TweenMax.fromTo( this.current_transform, this.appearing_animation_duration, {
            opacity: 0,
            y: -100,
            x:0,
          }, {
            opacity: 1,
            y: 0,
            x:0,
            onStart: ()=> { this.is_animating = true; this.$el.style.visibility="visible"},
            onComplete: ()=> this.is_animating = false,
            onUpdate: ()=> this.update_styles()
          } )

        case Include.Direction.Down:
          return TweenMax.fromTo( this.current_transform, this.appearing_animation_duration, {
            opacity: 0,
            y: 100,
            x:0
          }, {
            opacity: 1,
            y: 0,
            x:0,
            onStart: ()=> {this.is_animating = true; this.$el.style.visibility="visible"},
            onComplete: ()=> this.is_animating = false,
            onUpdate: ()=> this.update_styles()
          } )

        case Include.Direction.Left:
          return TweenMax.fromTo( this.current_transform, this.appearing_animation_duration, {
            opacity: 0,
            x: -100
          }, {
            opacity: 1,
            x: 0,
            onStart: ()=> {this.is_animating = true; this.$el.style.visibility="visible"},
            onComplete: ()=> this.is_animating = false,
            onUpdate: ()=> this.update_styles()
          } )

        case Include.Direction.Right:
          return TweenMax.fromTo( this.current_transform, this.appearing_animation_duration, {
            opacity: 0,
            x: 100
          }, {
            opacity: 1,
            x: 0,
            onStart: ()=> {this.is_animating = true; this.$el.style.visibility="visible"},
            onComplete: ()=> this.is_animating = false,
            onUpdate: ()=> this.update_styles()
          } )
      }

    },
    disappear_to ( dir: Include.Direction, el: Element  ) {
      let $el = el || this.$el
        
      switch ( dir ) {
        case Include.Direction.Up:
          return TweenMax.fromTo( this.current_transform, this.appearing_animation_duration, {
            opacity: 1,
            y: 0,
            x:0,
          }, {
            opacity: 0,
            y: -100,
            x:0,
            onStart: ()=> {this.is_animating = true},
            onComplete: ()=> {this.is_animating = false; this.$el.style.visibility="hidden"},
            onUpdate: ()=> this.update_styles()
          } )

        case Include.Direction.Down:
          return TweenMax.fromTo( this.current_transform, this.appearing_animation_duration, {
            opacity: 1,
            y: 0,
            x: 0,
          }, {
            opacity: 0,
            y: 100,
            x:0,
            onStart: ()=> {this.is_animating = true},
            onComplete: ()=> {this.is_animating = false; this.$el.style.visibility="hidden"},
            onUpdate: ()=> this.update_styles()
          } )

        case Include.Direction.Left:
          return TweenMax.fromTo( this.current_transform, this.appearing_animation_duration, {
            opacity: 1,
            x: 0
          }, {
            opacity: 0,
            x: -100,
            onStart: ()=> {this.is_animating = true},
            onComplete: ()=> {this.is_animating = false; this.$el.style.visibility="hidden"},
            onUpdate: ()=> this.update_styles()
          } )

        case Include.Direction.Right:
          return TweenMax.fromTo( this.current_transform, this.appearing_animation_duration, {
            opacity: 1,
            x: 0
          }, {
            opacity: 0,
            x: 100,
            onStart: ()=> {this.is_animating = true},
            onComplete: ()=> {this.is_animating = false; this.$el.style.visibility="hidden"},
            onUpdate: ()=> this.update_styles()
          } )
      }
    }
  }
});
</script>


<style scoped lang="sass">

</style>