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
  <div 
    class="base-card flex flex-col gap-6 bg-white rounded shadow p-4">
    <div
      v-if="showHeader"
      class="base-card__header flex gap-4">

      <div 
        class="base-card__titles flex-grow">
        
        <div
          v-if="props.title"
          class="base-card__title text-lg font-bold">
          {{ props.title }}
        </div>

        <div
          v-if="props.subtitle"
          class="base-card__subtitle">
          {{ props.subtitle }}
        </div>
      </div>
      
      <div class="base-card__toolbar button-group">
        <slot name="toolbar"></slot>
      </div>

    </div>

    <div
      class="base-card__content">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="less">
.base-card {
  
  button {
    background-color: var(--gray-6);
  
    &:hover {
      background-color: var(--gray-5);
    }
  }
}

.base-card__subtitle {
  color: var(--gray-2);
}
</style>