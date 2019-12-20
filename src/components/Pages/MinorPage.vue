<template>
    <div 
        class="page minor_page"
    >
        <Ticker 
                :text="ticker_text"
                :animation_speed="ticker_animation_speed"
        />

        <div class="content">
                <div class="captions">
                        <div 
                                class="prime_caption"
                                v-html="prime_caption_text"></div>
                        
                        <div 
                                class="minor_caption"
                                v-html="minor_caption_text"></div>
                </div>

                <div class="images">
                        <image-component
                                v-for="(item, index) in images"
                                v-bind:key="index"
                                :image_src="item.src"
                        />
                </div>
        </div>

    </div>
</template>



<script lang="ts">
import Vue from 'vue';
import Page from "../Page.vue"
import Ticker from "../Ticker.vue"
import ImageComponent from "../ImageComponent.vue"

export default Vue.extend({
  name: 'MinorPage',
  mixins: [ Page ],
  components: {
          Ticker,
          ImageComponent,
  },
  props: {
          page_index: {
                  type:Number,
                  default: () => 1
          },
          ticker_text: {
                  type: String,
                  default: ()=> "TEXT"
          },
          images: {
                  type: Array,
                  default: ()=> []
          },
          prime_caption_text: {
                  type: String,
                  default: ()=> "KEKEK"
          },
          minor_caption_text: {
                  type: String,
                  default: ()=> "KEKEK"
          },
  },
  data: () => ({
    //
  }),
});
</script>


<style scoped lang="sass">
    .minor_page 
        width: 100vw
        min-height: 100%
        display: flex
        position: relative
        flex-direction: row-reverse
        align-items: flex-start
        justify-content: center
        overflow-x: hidden
        overflow-y: auto
        
        .ticker 
          position: absolute
          top: 0
          width: 100vh  

        .content 
                display: flex
                flex-direction: column
                align-items: center

                .captions       
                        display: flex
                        flex-direction: column
                        align-items: flex-start
                        flex-shrink: 0
                        margin-top: 20vh

                        .prime_caption
                                font-family: 'Montserrat', sans-serif
                                font-style: normal
                                font-weight: 900
                                font-size: 96px
                                font-variant: small-caps
                                color: #FFFFFF
                                mix-blend-mode: normal
                                box-sizing: border-box

                        .minor_caption
                                font-family: 'Montserrat', sans-serif
                                font-style: normal
                                font-weight: normal
                                font-size: 18px
                                line-height: 28px
                                color: #FFFFFF

                .images 
                        display: flex
                        flex-direction: column
                        flex-shrink: 0


                        .image_component 
                                margin: 72px 0

</style>