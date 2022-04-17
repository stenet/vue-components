<script lang="ts" setup>
import BaseSidebar from "@/components/BaseSidebar.vue";
import { ref } from "vue";

const x = ref("right");
const visible = ref(false);

function onShowClick(xV: string) {
  x.value = xV;
  visible.value = true;
}
</script>

<template>
  <div class="flex flex-col relative">
    <h2>
      base-sidebar
    </h2>
    <div>
      <div class="button-group">
        <button
          @click="onShowClick('right')">Show sidebar right</button>
        
        <button
          @click="onShowClick('left')">Show sidebar left</button>
      </div>
      
      <base-sidebar
        :x="x"
        v-model="visible">
        
        <div class="flex flex-col gap-4 p-4">
          <div>
            Row 1
          </div>
          <div>
            Row 2
          </div>
        </div>
      </base-sidebar>
    </div>
  </div>
</template>

<style lang="less">

</style>