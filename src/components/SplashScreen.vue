<template>
    <div 
        v-bind:style="{ display: this.style_display_value }"
        class="splash-screen"
        ref="root"
    >
        <div class="content">
                <div class="large_caption" ref="large_caption">
                        <div>NATALYA</div>
                        <div>PANASENKO</div>
                </div>
                <div class="small_caption" ref="small_caption">
                        <div>web-designer</div>
                </div>
        </div>
    </div>
</template>



<script lang="ts">
import Vue from 'vue'
import { TweenMax, TimelineMax } from "gsap"

export default Vue.extend({
  name: 'SplashScreen',

  components: {

  },

  props: {
          enabled: {
                  type: Boolean,
                  default: ()=> true
          }
  },

  computed: {
          style_display_value () {
                  return (this.visible && this.enabled) ? "flex" : "none"
          }
  },    
  data () {

        let animation_timeline =  new TimelineMax()
        animation_timeline.pause()

        return {
              animation_timeline,
              visible: true
        }
  },
  mounted () {
          this.setup_appearing_animation()
          console.log(this.animation_timeline)
          this.animation_timeline.resume()
  },
  methods: {
        appear () {
                
        },
        setup_appearing_animation () {

                if ( this.$store.getters.is_desktop ) {
                         this.animation_timeline.fromTo( this.$refs.large_caption, 1, {
                                y: -100,
                                opacity: 0
                        }, {
                                y: 0,
                                opacity: 1
                        } )

                        this.animation_timeline.fromTo( this.$refs.small_caption, 1, {
                                y: -100,
                                opacity: 0
                        }, {
                                delay: 0.5,
                                y: 0,
                                opacity: 1
                        } )
                } else {
                         this.animation_timeline.fromTo( this.$refs.large_caption, 1, {
                                y: -100,
                                opacity: 0
                        }, {
                                y: 0,
                                opacity: 1
                        } )

                        this.animation_timeline.fromTo( this.$refs.small_caption, 1, {
                                y: 100,
                                opacity: 0
                        }, {
                                delay: 0.5,
                                y: 0,
                                opacity: 1
                        } )
                }
                

               

                this.animation_timeline.fromTo( this.$refs.root, 1, {
                        yPercent: 0,
                }, {
                        delay: 1,
                        yPercent: 100,
                        onStart: ()=>{
                                this.$emit("before_disappearing")
                        },
                        onComplete: ()=>{
                                this.$emit("disappeared")
                                this.visible = false
                        }
                } )
        }
  }
});
</script>


<style scoped lang="sass">

.splash-screen 
        position: fixed
        top: 0
        left: 0
        width: 100%
        height: 100%
        z-index: 3
        background-color: #3a1242
        display: flex
        flex-direction: column
        justify-content: center
        padding: 32px

        .content
                width: 100%
                display: flex
                flex-direction: row
                justify-content: space-between
                align-items: flex-end
                
                .large_caption
                        display: flex
                        flex-direction: column
                                                
                        div
                                color: #ffffff
                                font-size: 100px
                                font-family: 'Montserrat', sans-serif
                                line-height: 1.1
                                font-weight: 700
                                letter-spacing: 2.5px
                                background-position: center center
                                border-color: transparent
                                border-style: solid

                .small_caption

                        div
                                color: #ffffff
                                font-size: 32px
                                font-family: 'Montserrat', sans-serif
                                line-height: 1.1
                                font-weight: 500
                                background-position: center center
                                border-color: transparent
                                border-style: solid

.app-root[data-desktop="0"] 
        .splash-screen
                .content

                        flex-direction: column

                        
                        .large_caption
                                width: 100%
                                div
                                        
                                        font-size: 40px


                        .small_caption
                                width: 100%
                                margin-top: 1.5em
                                div

                                        font-size: 32px
                                        



</style>