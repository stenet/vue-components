<script lang="ts" setup>
import BaseOverlay from "@/components/BaseOverlay.vue";
import { ref } from "vue";

const contentX = ref<any>("center");
const contentY = ref<any>("center");
const delay = ref(200);
const fullScreen = ref(false);
const shader = ref(false);
const visible = ref(false);
function onShowClick(shaderV: boolean, fullscreenV = true, delayV = 200, contentXV: any = "center", contentYV: any = "center") {
  contentX.value = contentXV;
  contentY.value = contentYV;
  delay.value = delayV;
  fullScreen.value = fullscreenV;
  shader.value = shaderV;
  visible.value = true;
  
  setTimeout(() => {
    visible.value = false;
  }, 2000);
}
</script>

<template>
  <div class="flex flex-col relative">
    <h2>
      base-overlay
    </h2>
    <div>
      <div class="button-group">
        <button
          @click="onShowClick(true)">Show overlay with shader</button>

        <button
          @click="onShowClick(false)">Show overlay without shader</button>
        
        <button
          @click="onShowClick(true, false)">Show overlay inline</button>

        <button
          @click="onShowClick(true, true, 0, 'center', 'bottom')">Show overlay without delay bottom</button>
      </div>
      
      <base-overlay
        :content-x="contentX"
        :content-y="contentY"
        :delay="delay"
        :fullScreen="fullScreen"
        :shader="shader"
        :visible="visible">
        
        <div class="flex flex-col items-center gap-4 p-4 border rounded shadow-xl bg-gray-200 border-gray-300 text-gray-900">
          <div class="text-4xl">
            <i class="fa-solid fa-spinner fa-spin"></i>
          </div>
          <div>
            Overlay closes in a few seconds
          </div>
        </div>
        
      </base-overlay>
    </div>
  </div>
</template>

<style lang="less">

</style>