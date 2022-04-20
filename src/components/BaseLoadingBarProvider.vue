<script lang="ts" setup>
import BaseLoadingBar from "@/components/BaseLoadingBar.vue";
import { useLoadingBar } from "@/composables/use-loading-bar";
import { computed, ref, watchEffect } from "vue";

const props = withDefaults(defineProps<{
  topLevel?: boolean;
  showAlways?: boolean;
}>(), {
  topLevel: true,
  showAlways: false
});

const loadingBarProvider = useLoadingBar();

const loadingBarClass = computed(() => {
  if (props.topLevel) {
    return "base-loading-bar-provider__loading-bar--top-level";
  } else {
    return "base-loading-bar-provider__loading-bar--absolute";
  }
});

const visible = ref(false);

watchEffect(() => {
  if (shouldLoadingBeVisible()) {
    visible.value = true;
  }
});

function shouldLoadingBeVisible() {
  return props.showAlways || loadingBarProvider.isWorking() || loadingBarProvider.hasError;
}

function onLoadingFinished() {
  if (!loadingBarProvider.hasError) {
    setTimeout(() => {
      if (!shouldLoadingBeVisible()) {
        visible.value = false;
      }
    }, 200);
  }
}
</script>

<template>
  <div
    class="base-loading-bar-provider inline-block relative">
    <base-loading-bar
      v-if="visible"
      class="top-0 w-full"
      :class="loadingBarClass"
      :is-loading="loadingBarProvider.isWorking()"
      :has-error="loadingBarProvider.hasError"
      @finished="onLoadingFinished()">
    </base-loading-bar>

    <slot></slot>
  </div>
</template>

<style lang="less">
.base-loading-bar-provider__loading-bar--top-level {
@apply fixed;
}

.base-loading-bar-provider__loading-bar--absolute {
@apply absolute;
}
</style>