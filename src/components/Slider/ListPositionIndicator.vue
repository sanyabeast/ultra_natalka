<template>
    <div 
        class="list_position_indicator"

    >
        <p
            v-html="value_formatted"
            v-bind:style="{ fontSize: `${36 * this.scale }px` }"
        ></p>
        <p
            v-html="separator_symbol"
            v-bind:style="{ fontSize: `${36 * this.scale }px` }"
        ></p>
        <p
            class="total_count"
            v-html="`0${total_count}`"
            v-bind:style="{ fontSize: `${36 * this.scale }px` }"
        ></p>
    </div>
</template>

<script lang="ts">
import Vue from "vue"
import BasicComponent from "../BasicComponent.vue"

export default Vue.extend({
    mixins: [BasicComponent],
    computed: {
       value_formatted: function(){
            return `0${this.value + 1}`
        }
    },
    props: {
        scale: {
            type: Number,
            default: ()=> 1  
        },
        total_count: {
            type: Number,
            default: ()=> 1  
        },
        value: {
            type: Number,
            default: ()=> 0
        },
        separator_symbol: {
            type: String,
            default: ()=> "/"
        }
    },
    name: "ListPositionIndicator"
})
</script>

<style lang="sass">
    .list_position_indicator 
        display: flex
        flex-direction: row

        p 
            margin: 0
            font-family: 'Montserrat', sans-serif
            font-weight: 800
            font-size: 36px
            line-height: 44px
            letter-spacing: 0.08em
            text-transform: capitalize
            color: #47FFBD
            
            &.total_count
                color: #3a1242 
                -webkit-text-stroke: 2px #47ffa7
                // text-shadow: -1px -1px 0 #47FFBD,  1px -1px 0 #47FFBD, -1px 1px 0 #47FFBD,  1px 1px 0 #47FFBD  

</style>