<template>
    <div class="three_object">
        <slot></slot>
    </div>
</template>
<script lang="ts">
import Vue from "vue"
import { CombinedVueInstance } from 'vue/types/vue'
import { forEach, castPath, isObject, isIndex, toKey } from "lodash-es"
import { Object3D } from "three"

import lerp from "lerp"


export default Vue.extend({
    mounted () {
        this.bind_to_dom_element()
        window.k = this
    },
    props: {
        _position_x: { type: Number, default: ()=> 0 },
        _position_y: { type: Number, default: ()=> 0 },
        _position_z: { type: Number, default: ()=> 0 },
        _scale_x   : { type: Number, default: ()=> 1 },
        _scale_y   : { type: Number, default: ()=> 1 },
        _scale_z   : { type: Number, default: ()=> 1 },
        _rotation_x: { type: Number, default: ()=> 0 },
        _rotation_y: { type: Number, default: ()=> 0 },
        _rotation_z: { type: Number, default: ()=> 0 },
    },
    data () {
        return {
            animations: {},
            object_type: "object",
            position_x: 0,
            position_y: 0,
            position_z: 0,
            scale_x   : 1,
            scale_y   : 1,
            scale_z   : 1,
            rotation_x: 0,
            rotation_y: 0,
            rotation_z: 0,
        }  
    },
    name: "ThreeObject3D",
    watch: {
        position_x (new_value) { this.object3D.position.x = new_value },
        position_y (new_value) { this.object3D.position.y = new_value },
        position_z (new_value) { this.object3D.position.z = new_value },
        scale_x    (new_value) { this.object3D.scale.x    = new_value },
        scale_y    (new_value) { this.object3D.scale.y    = new_value },
        scale_z    (new_value) { this.object3D.scale.z    = new_value },
        rotation_x (new_value) { this.object3D.rotation.x = new_value },
        rotation_y (new_value) { this.object3D.rotation.y = new_value },
        rotation_z (new_value) { this.object3D.rotation.z = new_value },

        _position_x (new_value) { this.position_x = new_value },
        _position_y (new_value) { this.position_y = new_value },
        _position_z (new_value) { this.position_z = new_value },
        _scale_x    (new_value) { this.scale_x    = new_value },
        _scale_y    (new_value) { this.scale_y    = new_value },
        _scale_z    (new_value) { this.scale_z    = new_value },
        _rotation_x (new_value) { this.rotation_x = new_value },
        _rotation_y (new_value) { this.rotation_y = new_value },
        _rotation_z (new_value) { this.rotation_z = new_value },
    },
    computed: {
        object3D () {
            return null
        },
        self () {
            return this
        }
    },
    methods: {
        
        bind_to_dom_element (): void {
            this.component = this.$el.component = this
        },
        init_transform_props () {
            this.position_x = this._position_x
            this.position_y = this._position_y
            this.position_z = this._position_z
            this.scale_x    = this._scale_x   
            this.scale_y    = this._scale_y   
            this.scale_z    = this._scale_z   
            this.rotation_x = this._rotation_x
            this.rotation_y = this._rotation_y
            this.rotation_z = this._rotation_z

            this.object3D.position.x = this.position_x
            this.object3D.position.y = this.position_y
            this.object3D.position.z = this.position_z

            this.object3D.scale.x = this.scale_x
            this.object3D.scale.y = this.scale_y
            this.object3D.scale.z = this.scale_z

            this.object3D.rotation.x = this.rotation_x
            this.object3D.rotation.y = this.rotation_y
            this.object3D.rotation.z = this.rotation_z
        },
        get_subcomponents( type: String = "*" ): Array<Object> {
            let nodes: NodeListOf<Element>
            let result: Array<Object> = []

            if (type==="*"){
                nodes = this.$el.querySelectorAll(`.three_object`)
            } else {
                nodes = this.$el.querySelectorAll(`.three_object .${type}`)
            }

            forEach(nodes, (node: Element)=>{
                result.push(node.component)
            })

            return result

        },
        hex_str_to_hex_num (hex_string: String = "#ffff00"): Number{
            return parseInt(hex_string.substring(1, 10), 16);
        },
        add_to_parent() {
            if (this.$parent){
                this.$nextTick(()=>{
                    console.log(`Adding to parent: ${this.object_type}`)
                    this.$parent.add_child_object_3d(this.object3D)
                })
            } 
        },
        add_child_object_3d(child: Object3D){
            if (!this.object3D){
                console.warn(new Error("No Object3D"), this.object_type, this)
                return
            }

            this.object3D.add(child)
        },
        lerp (value_from: Number, value_to: Number, alpha: Number) {
            return lerp(value_from, value_to, alpha)
        },
        play_animation (animation_name: String){
            
            if(this.animations[animation_name]){

                if (this.animations[animation_name].animation_target){
                    this.animations[animation_name].play(
                        this.animations[animation_name].animation_target
                    )
                } else {
                    this.animations[animation_name].play()
                }                
            }
        },
        set_prop(object: Object, path: String, value: any) {
            let path_array: Array<String> = path.split(".").reverse()
            let target: Object = object

            while(path_array.length > 0){
                let prop_name: String = path_array.pop()
                if (typeof target[prop_name] === "object"){
                    target = target[prop_name]
                } else {
                    target[prop_name] = value
                    // console.log(target, prop_name, value)
                    break
                }
            }

            return object

        } 
    }
})
</script>
<style scoped lang="sass">
    .three_object 
        display: none
</style>