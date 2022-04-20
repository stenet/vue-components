<script setup lang="ts">
import { useLoadingBar } from "@/composables/use-loading-bar";

const loadingBarProvider = useLoadingBar();

function onLoadDataClick() {
  loadingBarProvider.beginLoading();
  
  setTimeout(() => {
    loadingBarProvider.endLoading();
  }, 1000);
}

function onLoadDataErrorClick() {
  loadingBarProvider.beginLoading();

  setTimeout(() => {
    loadingBarProvider.errorOccured();
    loadingBarProvider.endLoading();
  }, 1000);
}
</script>

<template>
  <div class="flex flex-col">
    <h2>
      base-loading-bar-provider
    </h2>
    <div class="flex gap-2">
      <dx-button
        text="Load some data"
        @click="onLoadDataClick()"></dx-button>

      <dx-button
        text="Load some data with error"
        @click="onLoadDataErrorClick()"></dx-button>
    </div>
  </div>
</template>

<style lang="less">

</style>
