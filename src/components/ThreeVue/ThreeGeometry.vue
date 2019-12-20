<template>
    <div class="three_object geometry">
        <slot></slot>
    </div>
</template>
<script lang="ts">
import Vue from "vue"

import ThreeObject3D from "./ThreeObject3D"
import { Geometry, BufferGeometry, SphereBufferGeometry, BoxBufferGeometry, ConeBufferGeometry, TorusBufferGeometry } from "three"
import OBJLoader from "./Loaders/OBJLoader.js"
import { forEach } from "lodash-es"

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
        geometry_file_url: {
            type: String,
            default: ()=> ""
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
        let geometry: Geometry
        let loader

        switch (this.geometry_type){
            case "SphereBufferGeometry": geometry = new SphereBufferGeometry(this.geometry_params.sphere_radius, this.geometry_params.sphere_segments_x,  this.geometry_params.sphere_segments_y); break;
            case "BoxBufferGeometry": geometry = new BoxBufferGeometry(this.geometry_params.box_size_x, this.geometry_params.box_size_y, this.geometry_params.box_size_z); break;
            case "ConeBufferGeometry": geometry = new ConeBufferGeometry(this.geometry_params.cone_radius, this.geometry_params.cone_height, this.geometry_params.cone_radial_segments); break;
            case "TorusBufferGeometry": geometry = new TorusBufferGeometry(this.geometry_params.torus_radius, this.geometry_params.torus_tube, this.geometry_params.torus_radial_segments, this.geometry_params.torus_tubular_segements); break;
            case "OBJLoader":

                geometry = new BufferGeometry()
                loader = new OBJLoader();
                console.log(11, loader)

                loader.load(
                    this.geometry_file_url,
                    function ( object ) {
                        let inited = false

                        forEach(object.children, (mesh)=>{

                            if (!inited){
                                inited = true
                                
                                forEach(mesh.geometry.attributes, (attribute, name)=>{
                                    // geometry.addAttribute(name)
                                    // console.log(geometry)
                                })

                            } else {
                                console.log(mesh.matrix)
                                forEach(mesh.geometry.attributes)
                                geometry.merge(mesh.geometry, mesh.matrix)

                            }

                        })

                        geometry.needsUpdate = true
                    },
                    // called when loading is in progresses
                    function ( xhr ) {

                        console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

                    },
                    // called when loading has errors
                    function ( error ) {

                        console.log( 'An error happened' );

                    }
                );

            break
        }
    console.log(geometry)
        this.geometry = geometry
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