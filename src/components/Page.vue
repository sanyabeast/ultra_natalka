<template>
    <div 
        class="page"
        v-bind:data-page-id="page_id"
    >
        <slot></slot>
    </div>
</template>



<script lang="ts">

import Vue from 'vue';
import BasicComponent from "./BasicComponent.vue"
import Include from "./Include"
import { TweenMax } from "gsap"


export default Vue.extend({
  name: 'Page',
  mixins: [ BasicComponent ], 
  mounted () {
    this.$component = this
  },
  props: {
    page_id: {
      type: String,
      default: ()=> "page"
    },
  }
});
</script>


<style scoped lang="sass">
    .page 
        width: 100%
        min-height: 100%


</style>