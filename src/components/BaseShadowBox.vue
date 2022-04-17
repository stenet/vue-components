<script lang="ts" setup>
import { computed, useSlots } from "vue";

const props = defineProps<{
  title?: string;
  subtitle?: string;
}>();

const slots = useSlots();
const showHeader = computed(() => {
  return slots.toolbar
    || props.title;
});
</script>

<template>
  <div class="base-shadow-box">
    <div
      v-if="showHeader"
      class="base-shadow-box__header">
      
      <div class="base-shadow-box__titles">
        <div
          v-if="props.title"
          class="base-shadow-box__title">
          {{ props.title }}
        </div>

        <div
          v-if="props.subtitle"
          class="base-shadow-box__subtitle">
          {{ props.subtitle }}
        </div>
      </div>
      <div class="base-shadow-box__toolbar button-group">
        <slot name="toolbar"></slot>
      </div>
      
    </div>
    
    <div
      class="base-shadow-box__content">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="less">
.base-shadow-box {
  @apply flex flex-col gap-6 bg-white rounded shadow p-4;
  
  button {
    @apply bg-gray-100;
    
    &:hover {
      @apply bg-gray-300;
    }
  }
}
.base-shadow-box__header {
  @apply flex gap-4;
}
.base-shadow-box__titles {
  @apply flex-grow;
}
.base-shadow-box__title {
  @apply text-lg font-bold;

  + .base-shadow-box__subtitle {
    @apply mt-1;
  }
}
.base-shadow-box__subtitle {
  @apply text-gray-600 text-sm;
}
</style>