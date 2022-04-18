<script lang="ts" setup>
import { computed } from "vue";

const props = withDefaults(defineProps<{
  type?: "gray" | "blue" | "green" | "red" | "orange";
}>(), {
  type: "gray"
});

const typeClass = computed(() => {
  return `base-badge--${props.type}`;
});
</script>

<template>
  <div
    class="base-badge font-semibold text-xs px-2 py-1 rounded"
    :class="typeClass">

    <slot></slot>

  </div>
</template>

<style lang="less">
.base-badge--gray {
  background-color: var(--gray-5);
  color: var(--gray-1);
}

.base-badge--blue {
  background-color: var(--blue-5);
  color: var(--blue-1);
}

.base-badge--green {
  background-color: var(--green-5);
  color: var(--green-1);
}

.base-badge--red {
  background-color: var(--red-5);
  color: var(--red-1);
}

.base-badge--orange {
  background-color: var(--orange-5);
  color: var(--orange-1);
}
</style>