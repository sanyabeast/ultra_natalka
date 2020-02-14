<template>
    <div class="three_object geometry">
        <slot></slot>
    </div>
</template>
<script lang="ts">
import Vue from "vue"

import ThreeObject3D from "./ThreeObject3D"
import { Geometry, SphereBufferGeometry, BoxBufferGeometry, ConeBufferGeometry, TorusBufferGeometry } from "three"

export default Vue.extend({
    props: {
        geometry_type: {
            type: String,
            default: ()=> "SphereBufferGeometry"
        },
        geometry_params: {
            type: Object,
            default: ()=> {
                return {
                    cone_radius: 0.25,
                    cone_height: 1,
                    cone_radial_segments: 32,
                    sphere_radius: 1,
                    sphere_segments_x: 32,
                    sphere_segments_y: 32,
                    torus_radius: 1,
                    torus_tube: 0.3,
                    torus_radial_segments: 16,
                    torus_tubular_segements: 100,
                    box_size_x: 1,
                    box_size_y: 1,
                    box_size_z: 1

                }
            }
        },
        box_size_x: {
            type: Number,
            default: ()=> 5
        },
        box_size_y: {
            type: Number,
            default: ()=> 5
        },
        box_size_z: {
            type: Number,
            default: ()=> 5
        },
    },
    data () {
        return {
            geometry: null
        }
    },
    mounted () {
        this.bind_to_dom_element()
        let GeometryClass = this.get_geometry_class(this.geometry_type)
        let geometry: Geometry

        switch (this.geometry_type){
            case "SphereBufferGeometry": geometry = new GeometryClass(this.geometry_params.sphere_radius, this.geometry_params.sphere_segments_x,  this.geometry_params.sphere_segments_y); break;
            case "BoxBufferGeometry": geometry = new GeometryClass(this.geometry_params.box_size_x, this.geometry_params.box_size_y, this.geometry_params.box_size_z); break;
            case "ConeBufferGeometry": geometry = new GeometryClass(this.geometry_params.cone_radius, this.geometry_params.cone_height, this.geometry_params.cone_radial_segments); break;
            case "TorusBufferGeometry": geometry = new GeometryClass(this.geometry_params.torus_radius, this.geometry_params.torus_tube, this.geometry_params.torus_radial_segments, this.geometry_params.torus_tubular_segements); break;
        }

        this.geometry = geometry
    },
    mixins: [ ThreeObject3D ],
    methods: {
        get_geometry_class(type: String) {
            let result

            switch (type) {
                case "SphereBufferGeometry": result = SphereBufferGeometry; break;
                case "BoxBufferGeometry": result = BoxBufferGeometry; break;
                case "ConeBufferGeometry": result = ConeBufferGeometry; break;
                case "TorusBufferGeometry": result = TorusBufferGeometry; break;
                default: result = SphereBufferGeometry;   break;
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