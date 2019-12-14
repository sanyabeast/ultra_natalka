
<template>
    <div 
        class="slider-dot"

        v-bind:class="{ active: active }"
        v-on:click="on_click"
        v-bind:data-index="index"
    >
        
    </div>
</template>



<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'SliderDot',

  props: {
      index: {
          type: Number,
          default: ()=> 0
      },
      active: {
          type: Boolean,
          default: ()=> { return false }
      }
  },

  components: {

  },

  data: () => ({
    //
  }),

  methods: {
      on_click: function(){
          this.$emit("clicked", {
              key: this.index
          })
      }
  }
});
</script>



<style lang="sass">

    .slider-dot 
        width: 100px
        height: 100px
        background: red


</style>