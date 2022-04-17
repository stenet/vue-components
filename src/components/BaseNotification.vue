<script lang="ts" setup>
import { computed } from "vue";

const props = withDefaults(defineProps<{
  type?: "default" | "danger" | "success";
  icon?: string;
}>(), {
  type: "default",
  icon: "fa-solid fa-info-circle fa-fw"
});

const typeClass = computed(() =>
{
  return `base-notification--${props.type}`;
})
</script>

<template>
  <div
    class="base-notification"
    :class="typeClass">

    <div class="base-notification__icon">
      <i :class="props.icon"></i>
    </div>

    <div class="base-notification__content">
      <slot></slot>
    </div>

  </div>
</template>

<style lang="less">
.base-notification {
  @apply p-4 border rounded flex gap-4;
}
.base-notification--default {
  @apply border-blue-400 bg-blue-100;
}
.base-notification--danger {
  @apply border-red-400 bg-red-100;
}
.base-notification--success {
  @apply border-green-400 bg-green-100;
}

.base-notification__icon {
  @apply text-gray-600;
}
</style>