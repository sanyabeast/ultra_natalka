<template>
    <div 
        class="slider-dots"
    >
        <SliderDot 
            v-for="n in count" 
            v-bind:key="n"
            v-bind:index="n"
            v-on:clicked="on_dot_clicked"
        />
    </div>
</template>



<script lang="ts">
import Vue from 'vue';  
import SliderDot from "./Dot.vue"

export default Vue.extend({
    name: 'SliderDots',

    props: {
        count: {
            type: Number,
            default: ()=>{ return 101 }
        }
    },

    components: {
        SliderDot
    },

    mounted: function () {
    //   console.log(this.count)
    },

    data: () => ({
    //
    }),

    methods: {
        on_dot_clicked: function( payload: any ){
            alert(payload.key)
        }
    }

});
</script>



<style lang="sass">

    .slider-dots 
        display: flex
        flex-direction: row


</style>