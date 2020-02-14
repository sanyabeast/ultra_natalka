
<template>
    <div class="three_object camera">
        <slot></slot>
    </div>
</template>
<script lang="ts">
import Vue from "vue"

import ThreeObject3D from "./ThreeObject3D"
import { PerspectiveCamera, OrthographicCamera } from "three"

export default Vue.extend({
    data () {
        return {
            camera: null,
            perspective_camera_aspect: 1,
            object_type: "camera"
        }
    },
    props: {
        camera_type: {
            type: String,
            default: ()=> "PerspectiveCamera"
        },
        perspective_camera_fov: {
            type: Number,
            default: ()=> 60
        },
        camera_far_clip: {
            type: Number,
            default: ()=> 10000
        },
        camera_near_clip: {
            type: Number,
            default: ()=> 0.1
        },
        orthographic_camera_width: {
            type: Number,
            default: ()=> 1000
        },
    },
    watch: {
        perspective_camera_fov(new_value){
            this.camera.fov = new_value
            this.camera.updateProjectionMatrix()
        },
        perspective_camera_aspect (new_value){
            console.log(new_value)
            this.camera.aspect = new_value
            this.camera.updateProjectionMatrix()
        }
    },
    computed: {
        object3D(){
            return this.camera
        }
    },
    mounted () {
        this.bind_to_dom_element()
        
        if (this.camera_type == "PerspectiveCamera") {
            this.camera = new PerspectiveCamera(
                this.perspective_camera_fov, 
                this.perspective_camera_aspect,
                this.camera_near_clip, 
                this.camera_far_clip
            )
        } else if (this.camera_type == "OrthographicCamera") {
            this.camera = new OrthographicCamera(
                -this.orthographic_camera_width/2,
                -(this.orthographic_camera_width / this.perspective_camera_aspect) / 2,
                +(this.orthographic_camera_width / this.perspective_camera_aspect) / 2,
                this.orthographic_camera_width / 2,
                this.camera_near_clip,
                this.camera_far_clip
            )
        }

        if (this.$parent){
            this.$parent.camera = this.camera
            this.$parent.camera_component = this
            this.$parent.add_child_object_3d(this.camera)
        }

        this.init_transform_props()
        this.add_to_parent()
    },
    mixins: [ ThreeObject3D ],
    methods: {
        update_camera ( width: Number, height: Number ) {
            this.perspective_camera_aspect = width / height
            
            if (this.camera_type === "OrthographicCamera"){
                this.camera.left = -this.orthographic_camera_width/2
                this.camera.top = -(this.orthographic_camera_width / this.perspective_camera_aspect) / 2
                this.camera.bottom = +(this.orthographic_camera_width / this.perspective_camera_aspect) / 2
                this.camera.rught = this.orthographic_camera_width / 2
            }

        }
    }
})
</script>
<style scoped lang="sass">
    .three_object 
        display: none
</style>