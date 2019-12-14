<template>
    <div class="three_object material">
        <slot></slot>
    </div>
</template>
<script lang="ts">
import Vue from "vue"

import ThreeObject3D from "./ThreeObject3D"
import { Material, MeshBasicMaterial, MeshPhongMaterial, MeshNormalMaterial,MeshStandardMaterial } from "three"

export default Vue.extend({
    props: {
        material_type: {
            type: String,
            default: ()=> "MeshNormalMaterial"
        },
        material_metalness: {
            type: Number,
            default: ()=> 0.5
        },
        material_roughness: {
            type: Number,
            default: ()=> 0.5
        },
    },
    data () {
        return {
            material: null,
            object_type: "material"
        }
    },
    mounted () {
        this.bind_to_dom_element()
        let MaterialClass = this.get_material_class(this.material_type)
        this.material = new MaterialClass({
            color: 0xFFFFFF,
            metalness: this.material_metalness,
            roughness: this.material_roughness
        })
    },
    mixins: [ ThreeObject3D ],
    methods: {
        get_material_class(type: String){
            let result: Material

            switch (type){
                case "MeshBasicMaterial": result = MeshBasicMaterial; break;
                case "MeshPhongMaterial": result = MeshPhongMaterial; break;
                case "MeshNormalMaterial": result = MeshNormalMaterial; break;
                case "MeshStandardMaterial": result = MeshStandardMaterial; break;
                default: result = MeshBasicMaterial; break;
            }

            return result
        }
    }
})
</script>
<style scoped lang="sass">
    .three_object 
        display: none
</style>