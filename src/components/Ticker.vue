<template>
    <div
        class="ticker"
        v-bind:class="{
            active: this.computed_active
        }"
        @mouseover="hovered = true"
        @mouseout="hovered = false"
        @click="$emit(`click`)"
    >
        <div 
            class="content"
        >
            <div class="chunk n_0">
                <div
                    class="text_wrapper n_0">
                    <p v-html="text"></p>
                </div>

                <div
                    class="text_wrapper n_1">
                    <p v-html="text"></p>
                </div>     
            </div>   

            <div class="chunk n_1">
                <div
                    class="text_wrapper n_0">
                    <p v-html="text"></p>
                </div>

                <div
                    class="text_wrapper n_1">
                    <p v-html="text"></p>
                </div>     
            </div>         
        </div>
    </div>
</template>

<script>
import Vue from "vue"
export default Vue.extend({
    name: "Ticker",
    computed: {
        animation_speed_formatted () {
            return `${this.animation_speed}s`
        },
        computed_active () {
            return this.active || this.hovered
        }
    },
    props: {
        active: {
            type: Boolean,
            default: ()=> false
        },
        text: {
            type: String,
            default: ()=> "text"
        },
    },
    data () {
        return {
            hovered: false
        }
    }
})
</script>


<style scoped lang="sass">
    @keyframes ticker_animation
        0% 
            transform: translateX(-100%)

        100% 
            transform: translateX(0%)


    .ticker 
        position: absolute
        overflow: hidden
        z-index: 2
        
        &.active 
            .content .chunk .text_wrapper p   
                color: #70ffb5

        .content 
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
                        text-shadow: -1px -1px 0 #70ffb5,  1px -1px 0 #70ffb5, -1px 1px 0 #70ffb5,  1px 1px 0 #70ffb5 
                        transform-origin: center center
                     
        

            
    
</style>