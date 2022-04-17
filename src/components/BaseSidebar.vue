<script lang="ts" setup>
import BaseOverlay from "./BaseOverlay.vue";
import { computed, ref, unref, watch } from "vue";

const props = withDefaults(defineProps<{
  x?: "left" | "right";
  shader?: boolean;
  showCloseButton?: boolean;
  width?: string;
  modelValue?: boolean
}>(), {
  x: "right",
  shader: true,
  showCloseButton: true,
  width: "300px",
  modelValue: false
});

const emits = defineEmits<{
  (e: "update:modelValue", v: boolean): void
}>();

const overlayVisible = ref(props.modelValue);
const sidebarVisible = ref(props.modelValue);

const sidebarStyle = computed(() => {
  const r: Record<string, boolean> = {};
  r["base-sidebar--" + props.x] = true;
  r["base-sidebar--visible"] = unref(sidebarVisible);

  return r;
});

let timeout: number | null;
watch(() => props.modelValue, (v) => {
  if (timeout) {
    clearTimeout(timeout);
  }

  if (v) {
    overlayVisible.value = true;

    setTimeout(() => {
      sidebarVisible.value = v;
    }, 0);
  } else {
    sidebarVisible.value = false;
    
    setTimeout(() => {
      overlayVisible.value = v;
    }, 300);
  }
});

function onOverlayClick(ev: Event) {
  const target = ev.target as any as HTMLElement | null;
  
  const isInSidebar = target
    && (target.matches(".base-sidebar") || target.closest(".base-sidebar"));
  
  if (isInSidebar) {
    return;
  }
  
  emits("update:modelValue", false);
}
function onCloseClick() {
  emits("update:modelValue", false);
}
</script>

<template>
  <base-overlay
    :content-x="props.x"
    :delay="0"
    :full-screen="true"
    :shader="props.shader"
    :visible="overlayVisible"
    @click="onOverlayClick($event)">

    <div
      class="base-sidebar"
      :class="sidebarStyle">
      
      <div
        v-if="props.showCloseButton"
        class="base-sidebar__close-button">
        <i 
          class="fa-solid fa-times"
          @click="onCloseClick()"></i>
      </div>

      <slot></slot>

    </div>

  </base-overlay>
</template>

<style lang="less">
.base-sidebar {
@apply flex flex-col h-full bg-gray-50 transition-transform duration-300;
  width: v-bind("props.width");
}

.base-sidebar--left {
@apply border-r border-gray-200;
  transform: translateX(calc(-1 * v-bind("props.width")));
}

.base-sidebar--right {
@apply border-l border-gray-200;
  transform: translateX(v-bind("props.width"));
}

.base-sidebar--visible {
  transform: translateX(0);
}

.base-sidebar__close-button {
  @apply flex justify-end p-4;
  
  i {
    @apply cursor-pointer;
  }
}
</style>