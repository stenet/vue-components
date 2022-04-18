<script lang="ts" setup>
import { provide, ref } from "vue";
import { DialogProvider } from "@/components/DialogProvider";
import type { DialogButton, DialogFullOptions } from "@/components/DialogProvider";
import BaseOverlay from "@/components/BaseOverlay.vue";

provide(DialogProvider.name, new DialogProvider(show));

interface Item extends DialogFullOptions {
  key: number;
  class: string;
  disabled: boolean;
}

const items = ref<Item[]>([]);

let dialogIndex = 0;
function show(options: DialogFullOptions) {
  const item: Item = {
    key: dialogIndex++,
    disabled: false,
    icon: getIcon(options),
    class: `base-dialog__item--${options.type || "default"}`,
    ...options
  };

  items.value.push(item);
}
function getIcon(options: DialogFullOptions) {
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

async function onButtonClick(item: Item, button: DialogButton) {
  const r = button.onClick();
  if (r?.then) {
    item.disabled = true;
    await r;
  }

  const indexOf = items.value.findIndex(i => i.key == item.key);
  items.value.splice(indexOf, 1);
}
</script>

<template>
  <slot></slot>

  <base-overlay
    v-for="item in items"
    class="base-overlay-from-dialog-provider"
    :key="item.key"
    :delay="0"
    :visible="true">

    <div
      class="base-dialog__item flex flex-col gap-4 border p-4 rounded max-w-4xl shadow-2xl"
      :class="item.class">

      <div class="flex gap-4 items-center">
        <i
          v-if="item.icon"
          class="text-4xl"
          :class="item.icon"></i>

        <div
          v-html="item.innerHtml"
          class="base-dialog__content flex-grow">
        </div>
      </div>

      <div class="base-dialog__buttons button-group self-end">
        <button
          v-for="btn in item.buttons"
          :key="btn.text"
          :disabled="item.disabled"
          @click="onButtonClick(item, btn)">
          {{ btn.text }}
        </button>
      </div>

    </div>
  </base-overlay>
</template>

<style lang="less">
.base-dialog__item {
  background-color: var(--gray-6);
  border-color: var(--gray-5);
}

.base-overlay-from-dialog-provider {
  --anim-translate-x: 30px;
  --anim-translate-y: 30px;
  --anim-scale: .8;
}

.base-dialog__item--info {
  i {
    color: var(--blue-0);
  }
}

.base-dialog__item--danger {
  i {
    color: var(--red-0);
  }
}

.base-dialog__item--success {
  i {
    color: var(--green-0);
  }
}
</style>