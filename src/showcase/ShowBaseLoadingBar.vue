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
      <button
        v-if="!isLoading"
        @click="onStart()">Start loading
      </button>

      <button
        v-if="isLoading"
        @click="onFinish()">Finish
      </button>

      <button
        v-if="isLoading"
        @click="onError()">Error
      </button>
    </div>
  </div>
</template>

<style lang="less">

</style>
