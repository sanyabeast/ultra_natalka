<template>
    <div 
        class="page"
    >
        <slot></slot>
    </div>
</template>



<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Page',

  components: {

  },

  data: () => ({
    //
  }),
});
</script>


<style scoped lang="sass">
    .page 
        width: 100%
        min-height: 100%
        display: grid
        grid-template-columns: 1fr 1fr 1fr
        grid-template-rows: 1fr 1fr

</style>