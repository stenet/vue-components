<script lang="ts" setup>
import { computed } from "vue";

const props = withDefaults(defineProps<{
  type?: "default" | "danger" | "success";
  icon?: string;
}>(), {
  type: "default",
  icon: "fa-solid fa-circle-info fa-fw"
});

const typeClass = computed(() => {
  return `base-notification--${props.type}`;
});
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
@apply border-sky-200 bg-sky-100;

  i {
  @apply text-sky-800;
  }
}

.base-notification--danger {
@apply border-red-200 bg-red-100;

  i {
  @apply text-red-800;
  }
}

.base-notification--success {
@apply border-emerald-200 bg-emerald-100;

  i {
  @apply text-emerald-800;
  }
}

.base-notification__icon {
@apply text-gray-600;
}
</style>