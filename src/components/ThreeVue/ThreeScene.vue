<template>
    <div class="three_object scene" ref="root">
        <canvas
            ref="canvas2d"
            
        ></canvas>
        <ThreeCamera
            :camera_type="camera_type"
            :perspective_camera_fov="perspective_camera_fov"
            :orthographic_camera_width="orthographic_camera_width"
        >
            <animation
                animation_name="camera_shaking"
                :animation_target="camera_component"
                :animation_auto_play="true"
                :animation_duration="10"
                animation_easing="Power1.easeInOut"
                :props="{
                    rotation_x: [ -0.1, 0.1 ],

                }"
                :animation_loop="-1"
                :animation_yoyo="true"
            />
        </ThreeCamera>

        <animation
            animation_name="camera_appearing"
            :animation_target="self"
            :animation_auto_play="true"
            :animation_duration="10"
            animation_easing="Back.easeOut"
            :props="{
                camera_position_z: [ 300, 100 ],
                camera_position_y: [ 300, 0 ],
            }"
            :animation_loop="0"
        />

        
    
        <slot></slot>
    </div>
</template>
<script lang="ts">
import Vue from "vue"
import ThreeObject3D from "./ThreeObject3D.vue"
import ThreeCamera from "./ThreeCamera.vue"
import { Scene, PerspectiveCamera, Vector2, Object3D } from "three"
import { TweenMax } from "gsap"
import Animation from "./Core/Animation.vue"

export default Vue.extend({
    props: {
        frame_skip: {
            type: Number,
            default: ()=> 1
        },
        non_interactive_frame_skip: {
            type: Number,
            default: ()=> 1
        },
        interactive_frame_skip: {
            type: Number,
            default: ()=> 1
        },
        camera_position_x: {
            type: Number,
            default: ()=> {
                return  0
            }
        },
        camera_position_y: {
            type: Number,
            default: ()=> {
                return  0
            }
        },
        camera_position_z: {
            type: Number,
            default: ()=> {
                return  10
            }
        },
        perspective_camera_fov: {
            type: Number,
            default: ()=> 45
        },
        camera_type: {
            type: String,
            default: ()=> "PerspectiveCamera"
        },
        orthographic_camera_width: {
            type: Number,
            default: ()=> 1000
        },
    },
    data () {
        return {
            frame_index: 0,
            context2d: null,
            scene: new Scene(),
            camera: null,
            camera_component: null,
            renderer_size: new Vector2(1, 1),
            object_type: "scene"
        }
    },
    watch: {
        camera_position_x (new_value) {
            this.camera.position.x = new_value
        },
        camera_position_y (new_value) {
            this.camera.position.y = new_value
        },
        camera_position_z (new_value) {
            this.camera.position.z = new_value
        },
    },
    mixins: [ThreeObject3D],
    mounted () {
        this.bind_to_dom_element()
        this.context2d = this.$refs.canvas2d.getContext("2d")
        this.$store.state.game_loop.add(()=>{
            if (this.frame_index % this.frame_skip === 0) {
                this.render()
            }
            
            this.frame_index++
        }) 

        window.tscene = this
        this.camera.position.z = 100
        this.scene.add(this.camera)
        this.update_size()

        let cpz = this.camera_position_z
    },
    computed: {
        object3D () {
            return this.scene
        }
    },
    name: "ThreeScene",
    methods: {
        update_size () {
            let root_bound_rect = this.$refs.root.getBoundingClientRect()
            let device_pixel_ratio = window.devicePixelRatio
            this.renderer_size.set(root_bound_rect.width * device_pixel_ratio, root_bound_rect.height * device_pixel_ratio)

            this.$refs.canvas2d.width = root_bound_rect.width * device_pixel_ratio
            this.$refs.canvas2d.height = root_bound_rect.height * device_pixel_ratio

            this.camera_component.update_camera(this.$refs.canvas2d.width, this.$refs.canvas2d.height)
            
        },  
        render () {
            this.$store.state.gl_renderer.setSize(this.renderer_size.x, this.renderer_size.y)
            this.$store.state.gl_renderer.render(this.scene, this.camera)

            this.context2d.clearRect(0, 0, this.renderer_size.x, this.renderer_size.y)
            this.context2d.drawImage(this.$store.state.gl_renderer.domElement, 0, 0)
        }
    },
    components: {ThreeCamera, Animation}
})
</script>
<style scoped lang="sass">
    .three_object.scene
        display: flex
</style>