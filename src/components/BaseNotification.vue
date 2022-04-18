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
    class="base-notification flex gap-4 p-4 border rounded"
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
.base-notification--default {
  border-color: var(--blue-4);
  background-color: var(--blue-6);

  i {
    color: var(--blue-1);
  }
}

.base-notification--danger {
  border-color: var(--red-4);
  background-color: var(--red-6);

  i {
    color: var(--red-1);
  }
}

.base-notification--success {
  border-color: var(--green-4);
  background-color: var(--green-6);

  i {
    color: var(--green-1);
  }
}

.base-notification__icon {
  color: var(--gray-1);
}
</style>