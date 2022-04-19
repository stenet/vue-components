<script setup lang="ts">
import BaseLoadingBar from "@/components/BaseLoadingBar.vue";
import { ref } from "vue";

const isLoading = ref(false);
const hasError = ref(false);

function onStart() {
  hasError.value = false;
  isLoading.value = true;
}
function onFinish() {
  isLoading.value = false;
}
function onError() {
  hasError.value = true;
  isLoading.value = false;
}
</script>

<template>
  <div class="flex flex-col">
    <h2>
      base-loading-bar
    </h2>
    <div>
      <base-loading-bar
        :is-loading="isLoading"
        :has-error="hasError"></base-loading-bar>
    </div>
    <div class="button-group mt-4">
      <dx-button
        v-if="!isLoading"
        text="Start loading"
        @click="onStart()">
      </dx-button>

      <dx-button
        v-if="isLoading"
        text="Finish"
        @click="onFinish()">
      </dx-button>

      <dx-button
        v-if="isLoading"
        text="Error"
        @click="onError()">
      </dx-button>
    </div>
  </div>
</template>

<style lang="less">

</style>
