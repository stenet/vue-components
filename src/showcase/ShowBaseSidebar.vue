<script lang="ts" setup>
import BaseSidebar from "@/components/BaseSidebar.vue";
import { ref } from "vue";

const x = ref<any>("right");
const visible = ref(false);

function onShowClick(xV: any) {
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
      <div class="flex flex-wrap gap-1">
        <dx-button
          text="Show sidebar right"
          @click="onShowClick('right')">          
        </dx-button>
        
        <dx-button
          text="Show sidebar left"
          @click="onShowClick('left')">          
        </dx-button>
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