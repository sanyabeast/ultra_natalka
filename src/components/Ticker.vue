<template>
    <div
        class="ticker"
    >
        <div class="content">
            <div
                class="text_wrapper n_0">
                <p v-html="text"></p>
            </div>

            <div
                class="text_wrapper n_1">
                <p v-html="text"></p>
            </div>

            <div
                class="text_wrapper n_2">
                <p v-html="text"></p>
            </div>

            <div
                class="text_wrapper n_3">
                <p v-html="text"></p>
            </div>

            <div
                class="text_wrapper n_12">
                <p v-html="text"></p>
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
        }
    },
    props: {
        text: {
            type: String,
            default: ()=> "text"
        },
        animation_speed: {
            type: Number,
            default: ()=> 10
        }
    }
})
</script>


<style scoped lang="sass">
    @keyframes ticker-animation 
        0% 
            // left: -200%,
            transform: translateX(-200%)

        100% 
            // left: 200%,
            transform: translateX(200%)


    .ticker 
        position: absolute
        overflow: hidden
        z-index: 2
        
        .content 
            width: 100px
            height: 100% 
            display: flex
            flex-direction: row
            position: relative

            .text_wrapper 
                position: relative
                margin: 0 0%
                animation: ticker-animation 12s infinite linear      

                &.n_1 
                    animation-delay: 3s

                &.n_2 
                    animation-delay: 6s

                &.n_3 
                    animation-delay: 9s

                &.n_34
                    animation-delay: 12s

                p 
                    color: #202020
                    flex-shrink: 0
                    font-family: 'Montserrat', sans-serif
                    font-style: normal
                    font-weight: 900
                    font-size: 132px
                    font-variant: small-caps
                    text-shadow: -1px -1px 0 #70ffb5,  1px -1px 0 #70ffb5, -1px 1px 0 #70ffb5,  1px 1px 0 #70ffb5 
                    transform-origin: center center
                     

            
    
</style>