<template>
        <div 
                class="arrow_button" 
                @click="enabled && $emit('click')"
                v-bind:class="{ enabled: enabled }">
                <div class="body"></div>
                <div class="arrow">
                        <div class="item_a"></div>
                        <div class="item_b"></div>
                </div>
                <div class="arrow_caption" v-html="arrow_caption"></div>
                <div class="hitbox"></div>
        </div>
</template>
<script lang="ts">
import Vue from "vue"

export default Vue.extend({
        name: "Arrow",
        props: {
                enabled: {
                        type: Boolean,
                        default: ()=> true
                },
                arrow_caption: {
                        type: String,
                        default: "Back"
                }
        }
})


</script>
<style lang="sass">
        .arrow_button 
                position: absolute
                left: 120px
                top: 50%
                transform: translateY(-50%)
                z-index: 1

                .hitbox
                        position: absolute
                        top: 50%
                        height: 50%
                        transform: translate(-50%, -50%)
                        width: 100px
                        height: 300px

                .body 
                        background-color: #47FFBD
                        width: 50px
                        height: 2px
                        position: absolute
                        left: 0
                        top: 0

                .arrow_caption
                        position: absolute
                        opacity: 0
                        z-index: -1
                        font-family: Montserrat
                        font-style: normal
                        font-weight: 800
                        font-size: 18px
                        line-height: 22px
                        letter-spacing: 0.02em
                        color: #47FFA7
                        right: -32px
                        transform: translate(200%, -50%)
                        text-transform: capitalize
                        transition: opacity 0.15s ease-in-out

                .arrow
                        position: absolute
                        left: 0
                        top: 0
                        opacity: 0
                        transition: opacity 0.5s ease-in-out

                        .item_a, .item_b 
                                background-color: #47FFBD
                                position: absolute
                                top: 0
                                left: 0
                                height: 2px
                                width: 12px
                                transform: rotate(0)
                                transition: transform 0.5s ease-in-out
                                transform-origin: left center

                        

                &.enabled 
                        cursor: pointer

                        .arrow
                                opacity: 1

                                .item_a 
                                        transform: rotate(45deg)

                                .item_b 
                                        transform: rotate(-45deg)

                        .arrow_caption
                                opacity: 1
        
</style>