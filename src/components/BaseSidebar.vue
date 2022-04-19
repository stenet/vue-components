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

const translateX = computed(() => {
  if (props.x == "right") {
    return props.width;
  } else {
    return `-${props.width}`;
  }
})
const sidebarStyle = computed(() => {
  const r: Record<string, boolean> = {};
  r["base-sidebar--" + props.x] = true;

  return r;
});

watch(() => props.modelValue, (v) => {
  overlayVisible.value = v;
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
    class="base-overlay-from-sidebar"
    :content-x="props.x"
    :delay="0"
    :full-screen="true"
    :shader="props.shader"
    :visible="overlayVisible"
    @click="onOverlayClick($event)">

    <div
      class="base-sidebar flex flex-col h-full transition-transform duration-300"
      :class="sidebarStyle">
      
      <div
        v-if="props.showCloseButton"
        class="base-sidebar__close-button flex justify-end p-4">
        <i 
          class="fa-solid fa-times cursor-pointer"
          @click="onCloseClick()"></i>
      </div>

      <slot></slot>

    </div>

  </base-overlay>
</template>

<style lang="less">
.base-sidebar {
  border-color: var(--gray-5);
  background-color: white;
  width: v-bind("props.width");
}
.base-overlay.base-overlay-from-sidebar {
  --anim-translate-x: v-bind("translateX");
}

.base-sidebar--left {
@apply border-r;
}

.base-sidebar--right {
@apply border-l;
}
</style>