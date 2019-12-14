<template>
    <div class="three_object group">
        <slot></slot>
    </div>
</template>
<script lang="ts">
import Vue from "vue"

import ThreeObject3D from "./ThreeObject3D"
import { Group } from "three"

export default Vue.extend({
    data () {
        return {
            group: null,
            object_type: "group"
        }
    },
    computed: {
        object3D () {
            return this.group
        }
    },
    mounted () {
        this.bind_to_dom_element()

        this.group = new Group()

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