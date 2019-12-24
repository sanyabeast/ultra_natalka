<template>
        <svg 
                xmlns="http://www.w3.org/2000/svg" class="svg_filter"
                @mouseover="on_mouseover"
        >
                <defs>
                        <filter v-bind:id="filter_id">
                                <feMerge result="NOISED">  <feMergeNode in="NOISE"/> <feMergeNode in="SourceGraphics"/> </feMerge> -->
                                <feComponentTransfer in="OFFSETTED" result="COLORIZED">
                                        <feFuncR type="linear" slope="0" />
                                        <feFuncG type="linear" slope="0" />
                                        <feFuncB type="linear" slope="1" />
                                </feComponentTransfer>
                                <feDisplacementMap 
                                        result="DISPLACEMENT" 
                                        in="SourceGraphic" 
                                        in2="COLORIZED" 
                                        :scale="displacement_scale" 
                                        xChannelSelector="B" 
                                        yChannelSelector="R">
                                
                                </feDisplacementMap>
                                <feOffset 
                                        in="DISPLACEMENT" 
                                        :dx="(-displacement_scale / 2) + fx_offset_x" 
                                        :dy="(-displacement_scale / 2) + fx_offset_y" 
                                        result="OFFSETTED" 
                                >
                                </feOffset>
                                <feMerge>  <feMergeNode in="SourceGraphic"/> <feMergeNode in="OFFSETTED"/> </feMerge>
                        </filter>
                </defs>
        </svg>
</template>
<script lang="ts">
import Vue from "vue"
import { TweenMax, TimelineMax } from "gsap"

let filters_count = 0

export default Vue.extend({
        name: "SVGFilter",
        mounted () {
                this.$el.component = this
                filters_count++
                this.setup_animations()
        },
        props: {
                filter_id: {
                        type: String, 
                        default: ()=> "filter"
                }
        },
        data () {
                return {
                        animation_hover: null,
                        displacement_scale: 20,
                        noise_freq_y: 0,
                        fx_offset_x: 0,
                        fx_offset_y: -100,
                }
        },
        methods: {
                setup_animations () {
                        let animation_hover = new TimelineMax()
                        animation_hover.pause()


                        animation_hover.fromTo(this, 1, {
                                displacement_scale: 200,
                                fx_offset_x: 0,
                                fx_offset_y: 50
                        }, {
                                displacement_scale: -200,
                                ease: "Power4.easeIn",
                                fx_offset_y: 50,
                                fx_offset_x: 100
                        })

                        animation_hover.fromTo(this, 1, {
                                displacement_scale: 200,
                                fx_offset_x: -100,
                                fx_offset_y: 50
                        }, {
                                displacement_scale: 0,
                                ease: "Power4.easeOut",
                                fx_offset_y: 50,
                                fx_offset_x: 0
                        })

                        this.animation_hover = animation_hover
                },
                run_animation () {
                        this.animation_hover.restart()
                },
                on_mouseover () {
                        console.log(12)
                }
        }
})

</script>
<style lang="sass">
        .svg_filter
                position: absolute
                visibility: hidden
                opacity: 0
                width: 100%
                height: 100%
</style>