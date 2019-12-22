<template>
    <div 
        class="page prime-page"
    >
        <Ticker 
                :text="ticker_text"
                :animation_speed="ticker_animation_speed"
                ref="ticker"
                @click="on_image_click"
                :enabled="ticker_active"

        />

        <div class="content">
                <ImageComponent
                        ref="image"
                        :image_src="page_image_src"
                        @click="on_image_click"
                        @pointerover="ticker_active = true"
                        @pointerout="ticker_active = false"
                />

                <div class="foot">
                                <ListPositionIndicator 
                                :scale="1"
                                :value="page_index"
                                :total_count="3"
                        />

                        <div 
                                class="photo_caption"
                                v-html="photo_caption_text"
                        >

                        </div>
                </div>
                
        </div>

    </div>
</template>



<script lang="ts">
import Vue from 'vue';
import Page from "../Page.vue"
import Ticker from "../Ticker.vue"
import ImageComponent from "../ImageComponent.vue"
import ListPositionIndicator from "../Slider/ListPositionIndicator.vue"

export default Vue.extend({
  name: 'PrimePage',
  mixins: [ Page ],
  components: {
          Ticker,
          ImageComponent,
          ListPositionIndicator
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
          ticker_animation_speed: {
                  type: Number,
                  default: () => 5
          },
          page_image_src: {
                  type: String,
                  default: ()=> ""
          },
          photo_caption_text: {
                  type: String,
                  default: ()=> "KEKEK"
          }
  },
  data: () => ({
    ticker_active: false
  }),
  methods: {
          on_image_click () {
                  this.$emit("image_click", {
                          component: this
                  })
          }
  }
});
</script>


<style scoped lang="sass">
    .prime-page 
        width: 100vw
        min-height: 100%
        display: flex
        position: relative
        flex-direction: row-reverse
        align-items: center
        justify-content: center

        .ticker 
                position: absolute
                top: -160px
                left: auto
                right: 264px
                width: 100vh
                transform: rotate(90deg) translateX(100%)
                transform-origin: bottom right
                cursor: pointer

        .content 
                display: flex
                flex-direction: column

                .image_component 
                        height: 400px   
                        margin-right: 64px
                        display: flex
                        cursor: pointer
                
                .foot 
                        display: flex
                        flex-direction: row
                        align-items: flex-end
                        margin-top: 32px

                        .list_position_indicator 
                                margin-right: 24px

                        .photo_caption
                                font-family: 'Montserrat', sans-serif
                                font-style: normal
                                font-weight: normal
                                font-size: 18px
                                line-height: 22px
                                text-transform: capitalize
                                color: #FFFFFF

</style>