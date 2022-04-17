<script lang="ts" setup>
import BaseOverlay from "@/components/BaseOverlay.vue";
import { ref } from "vue";

const fullScreen = ref(false);
const shader = ref(false);
const visible = ref(false);
function onShowClick(showShader: boolean, showFullScreen = true) {
  fullScreen.value = showFullScreen;
  shader.value = showShader;
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
      </div>
      
      <base-overlay
        :fullScreen="fullScreen"
        :shader="shader"
        :visible="visible">
        
        <div class="flex flex-col items-center gap-4 p-4 border rounded bg-blue-200 border-blue-400 text-blue-900">
          <div class="text-4xl">
            <i class="fa-solid fa-user"></i>
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