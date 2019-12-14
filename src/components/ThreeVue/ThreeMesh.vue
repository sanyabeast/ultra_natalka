<template>
    <div class="three_object mesh">
        <slot></slot>
    </div>
</template>
<script lang="ts">
import Vue from "vue"

import ThreeObject3D from "./ThreeObject3D"
import { Mesh } from "three"

export default Vue.extend({
    data () {
        return {
            mesh: null,
            object_type: "mesh"
        }
    },
    computed: {
        object3D () {
            return this.mesh
        }
    },
    mounted () {
        this.bind_to_dom_element()
        let mesh
        
        console.log(this.$el)

        let geometry_component = this.get_subcomponents("geometry")[0]
        let material_component = this.get_subcomponents("material")[0]

        mesh = new Mesh(geometry_component.geometry, material_component.material)

        this.mesh = mesh
        

        this.init_transform_props()
        this.add_to_parent()
    },
    mixins: [ ThreeObject3D ],
    methods: {
      
    }
})
</script>
<style scoped lang="sass">
    .three_object 
        display: none
</style>