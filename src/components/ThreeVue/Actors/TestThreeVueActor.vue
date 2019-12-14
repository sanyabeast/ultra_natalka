<template>
    <ThreeGroup
        ref="root"
    >
        <three-mesh
            v-for="(data, index) in meshes"
            :key="index"
            :rotation_y="box_rotation"
            :rotation_x="box_rotation"
            :position_z="position_z"
            :position_x="mesh_pos_x(index)"
            :position_y="mesh_pos_y(index)"
            :scale_x="mesh_scale"
            :scale_y="mesh_scale"
            :scale_z="mesh_scale"
            
        >
            <three-material
                material_type="MeshNormalMaterial"
                color="#ffffff"
                :material_metalness="0.4"
            ></three-material>
            
            <three-geometry
                :geometry_type="mesh_geometry_type"
                :box_size_x="1"
                :box_size_y="1"
                :box_size_z="1"
            ></three-geometry>

            <animation
                :animation_target="self"
                :animation_auto_play="true"
                :animation_duration="60"
                :props="{
                    box_rotation: [0, 2* 3.14]
                }"
                :animation_loop="-1"
            />
            
        </three-mesh>   
    </ThreeGroup> 

</template>
<script lang="ts">
import Vue from "vue"

import ThreeObject3D from "../ThreeObject3D"
// import { PerspectiveCamera, OrthographicCamera } from "three"
import ThreeMesh from "../ThreeMesh.vue"
import ThreeMaterial from "../ThreeMaterial.vue"
import ThreeGeometry from "../ThreeGeometry.vue"
import ThreeLight from "../ThreeLight.vue"
import Animation from "../Core/Animation.vue"
import ThreeGroup from "../ThreeGroup.vue"
import { TweenMax } from "gsap"

export default Vue.extend({
    components: {
        ThreeMesh,
        ThreeMaterial,
        ThreeGeometry,
        // ThreeLight,
        Animation,
        ThreeGroup
    },
    data () {
        return {
           box_rotation: 0
        }
    },
    props: {
        mesh_geometry_type: {
            type: String,
            default: "BoxBufferGeometry"
        },
        rotation_duration: {
            type: Number,
            default: ()=> 1
        },
        mesh_spacing: {
            type: Number,
            default: ()=> 2
        },
        mesh_scale: {
            type: Number,
            default: ()=> 1
        },
        meshes: {
            type: Array,
            default: ()=> [0, 1, 2, 3]
        }
    },
    watch: {

    },
    computed: {
        object3D () {
            return this.$refs.root.object3D
        }
    },
    mounted () {
        this.bind_to_dom_element()
        this.add_to_parent()
    },
    mixins: [ ThreeObject3D ],
    methods: {
        mesh_pos_x(index){
            let rows_count = Math.ceil(Math.sqrt(this.meshes.length))
            let loc_step =  (this.mesh_scale *this.mesh_spacing )
            let out = (index % rows_count ) *loc_step

            out -= (rows_count * loc_step / 2) - loc_step / 2

            return out
        },
        mesh_pos_y(index){
            let rows_count = Math.ceil(Math.sqrt(this.meshes.length))
            let loc_step =  (this.mesh_scale *this.mesh_spacing )
            let cols_count = Math.floor(this.meshes.length / rows_count)
            let out = Math.floor(index / rows_count ) * loc_step

            out -= (cols_count * loc_step / 2) - loc_step / 2

            return out
        }
    }
})
</script>
<style scoped lang="sass">
    .three_object_3d 
        display: none
</style>