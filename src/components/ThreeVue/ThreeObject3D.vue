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
        position_x: { type: Number, default: ()=> 0 },
        position_y: { type: Number, default: ()=> 0 },
        position_z: { type: Number, default: ()=> 0 },
        scale_x: { type: Number, default: ()=> 1 },
        scale_y: { type: Number, default: ()=> 1 },
        scale_z: { type: Number, default: ()=> 1 },
        rotation_x: { type: Number, default: ()=> 0 },
        rotation_y: { type: Number, default: ()=> 0 },
        rotation_z: { type: Number, default: ()=> 0 },
    },
    data () {
        return {
            animations: {},
            object_type: "object"
        }  
    },
    name: "ThreeObject3D",
    watch: {
        position_x (new_value) { this.object3D.position.x = new_value },
        position_y (new_value) { this.object3D.position.y = new_value },
        position_z (new_value) { this.object3D.position.z = new_value },
        scale_x (new_value) { this.object3D.scale.x = new_value },
        scale_y (new_value) { this.object3D.scale.y = new_value },
        scale_z (new_value) { this.object3D.scale.z = new_value },
        rotation_x (new_value) { this.object3D.rotation.x = new_value },
        rotation_y (new_value) { this.object3D.rotation.y = new_value },
        rotation_z (new_value) { this.object3D.rotation.z = new_value },
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