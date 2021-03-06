<template>
    <div 
        class="page minor_page"
    >
        <Ticker 
                v-if="$store.getters.is_desktop"
                :text="ticker_text"
                @click="$emit('next_clicked')"
        />

        <div class="page_content" ref="page_content" @scroll="on_scroll">
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
                                        v-bind:style="{
                                              transform: `skew(${0}deg, ${scroll_speed * scroll_skew_power}deg)`
                                        }"
                                        :image_src="item.src"
                                />
                                <Ticker 
                                        v-if="!$store.getters.is_desktop"
                                        :text="ticker_text"
                                        @click="$emit('next_clicked')"
                                />

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

export default Vue.extend({
  name: 'MinorPage',
  mixins: [ Page ],
  components: {
          Ticker,
          ImageComponent,
  },
  mounted () {

          let prev_scroll_time = +new Date()
          let min_time = 1000 / 30

          this.$store.state.game_loop.add(()=>{
                  if (!this.$refs.page_content){
                        return
                  }

                  let now = +new Date()

                  if ( now - prev_scroll_time < min_time ){
                          return
                  }

                  prev_scroll_time = now

                  let scroll_top = this.$refs.page_content.scrollTop
                  let delta = scroll_top - this.scroll_pos
                  this.scroll_pos = scroll_top

                  if (delta < -100) delta = -100
                  if (delta > 100) delta = 100

                  this.scroll_speed = delta

          })
  },
  props: {
          page_index: {
                  type:Number,
                  default: () => 1
          },
          ticker_text: {
                  type: String,
                  default: ()=> "NEXT"
          },
          images: {
                  type: Array,
                  default: ()=> []
          },
          prime_caption_text: {
                  type: String,
                  default: ()=> ""
          },
          minor_caption_text: {
                  type: String,
                  default: ()=> ""
          },
  },
  data: () => ({
    scroll_pos: 0,
    scroll_speed: 0,
    scroll_skew_power: 0.025
  }),
  methods: {
        on_scroll () {
        },
        scroll_to ( scroll_pos ) {
              this.$refs.page_content.scrollTop = 0
        }
  }
});
</script>


<style lang="sass">
.minor_page 
        width: 100vw
        min-height: 100%
        display: flex
        position: relative
        flex-direction: row-reverse
        align-items: flex-start
        justify-content: center
        overflow: hidden
        
        .ticker 
                position: absolute
                top: -118px
                left: auto
                right: 220px
                width: 100vh
                transform: rotate(90deg) translateX(100%)
                transform-origin: bottom right
                cursor: pointer

        .page_content 
                overflow-x: hidden
                overflow-y: auto
                width: 100%
                height: 100%
        
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
                                width: 50vw

                                .prime_caption
                                        font-family: 'Montserrat', sans-serif
                                        font-style: normal
                                        font-weight: 900
                                        font-size: 96px
                                        font-variant: small-caps
                                        color: #47FFA7
                                        mix-blend-mode: normal
                                        box-sizing: border-box
                                        letter-spacing: 0.1em

                                .minor_caption
                                        font-family: 'Montserrat', sans-serif
                                        font-style: normal
                                        font-weight: normal
                                        font-size: 18px
                                        line-height: 28px
                                        color: #47FFA7

                        .images 
                                display: flex
                                flex-direction: column
                                flex-shrink: 0
                                align-items: center
                                width: 50vw


                                .image_component 
                                        margin: 72px 0
                                        transition: transform 0.444s ease-out
                                        width: 100%
                                        
                                       
                                        img 
                                                width: 100%
                                                height: auto


.app-root[data-desktop="0"]  
        .minor_page
                .page_content
                        .content
                                padding: 20px
                                margin-bottom: 80px
                                .captions
                                        margin-bottom: 90px
                                        width: 100%
                                        .prime_caption
                                                font-size: 40px

                                .images 
                                        width: 100%
                                        .image_component
                                                margin: 36px 0


                                .ticker
                                        position: relative
                                        top: 0
                                        left: 0
                                        right: 0
                                        width: 100vh
                                        transform: translateX(0%)
                                        transform-origin: top left
                                        cursor: pointer
                                                        

</style>