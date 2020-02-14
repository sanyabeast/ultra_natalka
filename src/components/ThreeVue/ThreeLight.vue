
<template>
    <div class="three_object light">
        <slot></slot>
    </div>
</template>
<script lang="ts">
import Vue from "vue"

import ThreeObject3D from "./ThreeObject3D"
import { AmbientLight, PointLight, SpotLight, DirectionalLight, HemisphereLight, RectAreaLight } from "three"

export default Vue.extend({
    props: {
        light_type: {
            type: String,
            default: ()=> "AmbientLight"
        },
        light_intensity: {
            type: Number,
            default: ()=> 1
        },
        light_color: {
            type: String,
            default: ()=> "#00ff00"
        },
        light_distance: {
            type: Number,
            default: ()=>100
        }
    },
    data () {
        return {
            light: null,
            object_type: "light"
        }
    },
    computed: {
        object3D () {
            return this.light
        }
    },
    
    mounted () {
        this.bind_to_dom_element()

        switch (this.light_type){
            case "AmbientLight": this.light = new AmbientLight(this.hex_str_to_hex_num(this.light_color)); break;
            case "PointLight": this.light = new PointLight(this.hex_str_to_hex_num(this.light_color), this.light_intensity, this.light_distance); break;
            case "SpotLight": this.light = new SpotLight(this.hex_str_to_hex_num(this.light_color), this.light_intensity, this.light_distance); break;
            case "DirectionalLight": this.light = new DirectionalLight(this.hex_str_to_hex_num(this.light_color), this.light_intensity, this.light_distance); break;
            case "HemisphereLight": this.light = new HemisphereLight(this.hex_str_to_hex_num(this.light_color), this.light_intensity, this.light_distance); break;
            case "RectAreaLight": this.light = new RectAreaLight(this.hex_str_to_hex_num(this.light_color), this.light_intensity, this.light_distance); break;
            default: this.light = new AmbientLight(this.hex_str_to_hex_num(this.light_color)); break;
        }

        this.light.intensity = this.light_intensity

        this.init_transform_props()
        this.add_to_parent()
    },
    mixins: [ ThreeObject3D ]
})
</script>
<style scoped lang="sass">
    .three_object 
        display: none
</style>