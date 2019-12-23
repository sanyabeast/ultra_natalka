<template>
    <div
        class="ticker"
        v-bind:class="{
            enabled: hovered
        }"
        @mouseover="hovered = true"
        @mouseout="hovered = false"
        @click="$emit(`click`)"
    >
        <div 
            class="ticker_content"
        >
            <div class="chunk n_0">
                <div
                    class="text_wrapper n_0">
                    <p class="p_node" v-html="text"></p>
                </div>

                <div
                    class="text_wrapper n_1">
                    <p class="p_node"  v-html="text"></p>
                </div>     
            </div>   

            <div class="chunk n_1">
                <div
                    class="text_wrapper n_0">
                    <p class="p_node"  v-html="text"></p>
                </div>

                <div
                    class="text_wrapper n_1">
                    <p class="p_node"  v-html="text"></p>
                </div>     
            </div>         
        </div>
    </div>
</template>

<script>
import Vue from "vue"
export default Vue.extend({
    name: "Ticker",
    props: {
        enabled: {
            type: Boolean,
            default: ()=> false
        },
        text: {
            type: String,
            default: ()=> "text"
        },
    },
    watch: {
        enabled ( new_value ) {
            this.hovered = new_value           
        }
    },
    data () {
        return {
            hovered: false
        }
    }
})
</script>


<style lang="sass">
    @keyframes ticker_animation
        0% 
            transform: translateX(-100%)

        100% 
            transform: translateX(0%)


    .ticker 
        position: absolute
        overflow: hidden
        z-index: 2
        
        &.enabled 
            .ticker_content .chunk .text_wrapper p   
                color: #47FFBD

        .ticker_content 
            width: 100px
            height: 100% 
            display: flex
            flex-direction: row
            position: relative

            .chunk 
                display: flex
                flex-direction: row
                animation: ticker_animation 10s infinite linear
                

                .text_wrapper 
                    position: relative
                    margin: 0 0%
                    animation: ticker-animation 12s infinite linear      

                    p 
                        margin: 0 0.5em
                        color: #202020
                        transition: color 0.5s ease-in-out
                        flex-shrink: 0
                        font-family: 'Montserrat', sans-serif
                        font-style: normal
                        font-weight: 900
                        font-size: 132px
                        font-variant: small-caps
                        text-shadow: -1px -1px 0 #47FFBD,  1px -1px 0 #47FFBD, -1px 1px 0 #47FFBD,  1px 1px 0 #47FFBD 
                        transform-origin: center center
                     
        

            
    
</style>