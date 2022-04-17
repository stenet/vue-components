<script lang="ts" setup>
import { computed } from "vue";

const props = withDefaults(defineProps<{
  type?: "gray" | "blue" | "green" | "red" | "yellow" | "orange" | "purple";
}>(), {
  type: "gray"
});

const typeClass = computed(() => {
  return `base-badge--${props.type}`;
});
</script>

<template>
  <div
    class="base-badge"
    :class="typeClass">

    <slot></slot>

  </div>
</template>

<style lang="less">
.base-badge {
@apply font-semibold text-xs px-2 py-1 rounded;
}

.base-badge--gray {
@apply bg-gray-200 text-gray-800;
}

.base-badge--blue {
@apply bg-blue-100 text-blue-800;
}

.base-badge--green {
@apply bg-green-100 text-green-800;
}

.base-badge--red {
@apply bg-red-100 text-red-800;
}

.base-badge--yellow {
@apply bg-yellow-100 text-yellow-800;
}

.base-badge--orange {
@apply bg-orange-100 text-orange-800;
}

.base-badge--purple {
@apply bg-purple-100 text-purple-800;
}
</style>