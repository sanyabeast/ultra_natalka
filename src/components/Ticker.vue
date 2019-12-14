<template>
    <div
        class="ticker"
    >
        <div class="content"
                v-bind:style="{animationDuration: this.animation_speed_formatted}"
            >
            <div class="text_wrapper"
                v-for="n in count + 2"
                v-bind:style="{ transform: `translateX(${n * 200 - 400}%)` }"
                v-bind:key="n"
            >
                <p
                    v-html="text"
                    
                ></p>
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
        count: {
            type: Number,
            default: ()=> 1
        },
        text: {
            type: String,
            default: ()=> "text"
        },
        animation_speed: {
            type: Number,
            default: ()=> 1
        }
    }
})
</script>


<style scoped lang="sass">
    @keyframes ticker-animation 
        0% 
            transform: translateX(-100%)

        100% 
            transform: translateX(100%)


    .ticker 
        position: absolute
        overflow: hidden
        z-index: 2
        
        .content 
            width: 100%
            height: 100% 
            animation: ticker-animation 1s infinite linear
            display: flex
            flex-direction: row
            flex-wrap: nowrap
            position: relative

            .text_wrapper 
                position: relative
                transform-origin: left top
                left: 0
                top: 0
                margin: 0 0%

                p 
                    flex-shrink: 0
                    font-family: Montserrat
                    font-style: normal
                    font-weight: 900
                    font-size: 96px
                    font-variant: small-caps
                    text-shadow: -1px -1px 0 #47FFBD,  1px -1px 0 #47FFBD, -1px 1px 0 #47FFBD,  1px 1px 0 #47FFBD 

            
    
</style>