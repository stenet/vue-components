<script lang="ts" setup>
import { computed, provide, ref } from "vue";
import { ToastProvider } from "@/components/toast-provider";
import type { ToastOptions } from "@/components/toast-provider";

const props = withDefaults(defineProps<{
  x?: "left" | "center" | "right";
  y?: "top" | "bottom";
}>(), {
  x: "center",
  y: "bottom"
});

provide(ToastProvider.name, new ToastProvider(show, clearAll));

const transitionGroupName = computed(() => {
  return `toast-${props.y}`;
});
const containerClass = computed(() => {
  const r: Record<string, boolean> = {};
  r[`base-toast-provider__container--${props.y}`] = true;

  return r;
});

interface Item {
  key: number;
  icon?: string | null;
  class: string;
  innerHtml: string;
}

const items = ref<Item[]>([]);

let toastIndex = 0;
function show(options: ToastOptions) {
  const item: Item = {
    key: toastIndex++,
    icon: getIcon(options),
    class: `base-toast-provider__item--${props.x} base-toast-provider__item--${options.type || "default"}`,
    innerHtml: options.innerHtml
  };

  if (props.y == "top") {
    items.value.push(item);
  } else {
    items.value.unshift(item);
  }

  setTimeout(() => {
    const indexOf = items.value.findIndex(i => i.key == item.key);
    if (indexOf >= 0) {
      items.value.splice(indexOf, 1);
    }
  }, options.timeout || 3000);
}
function clearAll() {
  items.value.splice(0, items.value.length);
}
function getIcon(options: ToastOptions) {
  if (options.icon) {
    return options.icon;
  }

  if (options.type) {
    switch (options.type) {
      case "info": {
        return "fa-solid fa-circle-info";
      }
      case "danger": {
        return "fa-solid fa-circle-exclamation";
      }
      case "success": {
        return "fa-solid fa-circle-check";
      }
    }
  }

  return null;
}
</script>

<template>
  <slot></slot>

  <div
    class="base-toast-provider__container flex flex-col gap-4 fixed w-full pointer-events-none"
    :class="containerClass">

    <transition-group :name="transitionGroupName">
      <div
        v-for="item in items"
        class="base-toast-provider__item flex gap-4 items-center rounded border border-l-4 p-4 mx-4 shadow-xl max-w-4xl"
        :key="item.key"
        :class="item.class">

        <i
          v-if="item.icon"
          class="text-2xl"
          :class="item.icon"></i>

        <div
          v-html="item.innerHtml"
          class="base-toast-provider__content">
        </div>
      </div>
    </transition-group>

  </div>
</template>

<style lang="less">
.base-toast-provider__container--top {
@apply mt-4 top-0;
}

.base-toast-provider__container--bottom {
@apply mb-4 bottom-0;
}

.base-toast-provider__item--left {
@apply self-start;
}

.base-toast-provider__item--center {
@apply self-center;
}

.base-toast-provider__item--right {
@apply self-end;
}

.base-toast-provider__item {
  border-color: var(--gray-5);
  background-color: white;
}

.base-toast-provider__item--info {
  border-left-color: var(--blue-0);
  background-color: var(--blue-7);
  color: var(--blue-0);
}

.base-toast-provider__item--danger {
  border-left-color: var(--red-0);
  background-color: var(--red-7);
  color: var(--red-0);
}

.base-toast-provider__item--success {
  border-left-color: var(--green-0);
  background-color: var(--green-7);
  color: var(--green-0);
}

.toast-top-move,
.toast-top-enter-active,
.toast-top-leave-active {
@apply transition;
}

.toast-top-enter-from,
.toast-top-leave-to {
  opacity: 0;
  transform: translateY(-3rem) scale(.7);
}

.toast-bottom-move,
.toast-bottom-enter-active,
.toast-bottom-leave-active {
@apply transition;
}

.toast-bottom-enter-from,
.toast-bottom-leave-to {
  opacity: 0;
  transform: translateY(3rem) scale(.7);
}

.toast-top-leave-active, .toast-bottom-leave-active {
  position: absolute;
}
</style>