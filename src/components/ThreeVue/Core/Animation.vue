<template>
    <div class="three_object animation">
        
        <slot></slot>
    </div>
</template>
<script lang="ts">

import Vue from "vue"
import { CombinedVueInstance } from 'vue/types/vue'
import { forEach, get, set } from "lodash-es"
import { Object3D } from "three"
import { TweenMax } from "gsap"
import ThreeObject3D from "../ThreeObject3D"

export default Vue.extend({
    props: {
        animation_target: {
            type: Object,
            default: ()=> null
        },
        animation_name: {
            type: String,
            default: ()=> "animation"
        },
        animation_easing: {
            default: ()=> "none"
        },
        animation_duration: {
            type: Number,
            default: ()=> 1
        },
        animation_loop: {
            type: Number,
            default: ()=>1
        },
        animation_yoyo: {
            type: Boolean,
            default: ()=> false
        },
        props: {
            type: Object,
            default: ()=> {}
        },
        animation_auto_play: {
            type: Boolean,
            default: ()=> false 
        }
    },
    mixins: [ThreeObject3D],
    mounted () {
        if (this.$parent){
            this.$parent.animations[this.animation_name] = this

            if (this.animation_auto_play){
                this.$parent.play_animation(this.animation_name)
            }
        }

    },
    data () {
        return {
            progress: 0
        }  
    },
    name: "ThreeVueAnimetion",
    methods: {
        play (context: Object) {

            if (!context && this.$parent){
                context = this.$parent
            }

            TweenMax.fromTo(this, this.animation_duration, {
                progress: 0
            }, {
                progress: 1,
                repeat: this.animation_loop,
                yoyo: this.animation_yoyo,
                onUpdate: ()=> this.update(context),
                ease: this.animation_easing
            })
        },
        update (context: Object) {
            forEach(this.props, (prop_data: Object, prop_path: String)=>{
                this.set_prop(context, prop_path, this.lerp(prop_data[0], prop_data[1], this.progress))
            })
        }
    }
})
</script>
<style scoped lang="sass">
    .three_animation 
        display: none
</style>