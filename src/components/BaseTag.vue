<script lang="ts" setup>
import { computed } from "vue";

const props = withDefaults(defineProps<{
  showRemoveButton?: boolean;
  type?: "gray" | "blue" | "green" | "red" | "orange";
}>(), {
  showRemoveButton: false,
  type: "gray"
});

const emits = defineEmits<{
  (e: "remove-click", v: null): void;
}>()

const typeClass = computed(() => {
  return `base-tag--${props.type}`;
});

function onRemoveClick() {
  emits("remove-click", null);
}
</script>

<template>
  <div
    class="base-tag flex items-center gap-2 font-semibold text-sm px-2 py-1 rounded"
    :class="typeClass">

    <slot></slot>

    <i
      v-if="props.showRemoveButton"
      class="fa-solid fa-times cursor-pointer"
      @click="onRemoveClick()"></i>
  </div>
</template>

<style lang="less">
.base-tag--gray {
  background-color: var(--gray-5);
  color: var(--gray-1);
  
  i:hover {
    color: var(--gray-0);
  }
}

.base-tag--blue {
  background-color: var(--blue-5);
  color: var(--blue-1);

  i:hover {
    color: var(--blue-0);
  }
}

.base-tag--green {
  background-color: var(--green-5);
  color: var(--green-1);

  i:hover {
    color: var(--green-0);
  }
}

.base-tag--red {
  background-color: var(--red-5);
  color: var(--red-1);

  i:hover {
    color: var(--red-0);
  }
}

.base-tag--orange {
  background-color: var(--orange-5);
  color: var(--orange-1);

  i:hover {
    color: var(--orange-0);
  }
}
</style>