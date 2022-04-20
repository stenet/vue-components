<script lang="ts" setup>
import type { ContentReadyEvent } from "devextreme/ui/button";
import { provide, ref } from "vue";
import { DialogProvider } from "@/components/dialog-provider";
import type { DialogButton, DialogFullOptions } from "@/components/dialog-provider";
import BaseOverlay from "@/components/BaseOverlay.vue";
import BaseLoadingBar from "@/components/BaseLoadingBar.vue";

provide(DialogProvider.name, new DialogProvider(show));

interface Item extends DialogFullOptions {
  key: number;
  class: string;
  disabled: boolean;
  isLoading: boolean;
  visible: boolean;
  focused: boolean;
}

const items = ref<Item[]>([]);

let dialogIndex = 0;
function show(options: DialogFullOptions) {  
  const item: Item = {
    key: dialogIndex++,
    disabled: false,
    isLoading: false,
    icon: getIcon(options),
    visible: true,
    focused: false,
    class: `base-dialog-provider__item--${options.type || "default"}`,
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
    try {
      item.disabled = true;
      item.isLoading = true;
      await r;
    } catch (ex) {
      item.disabled = false;
      throw ex;
    } finally {
      item.isLoading = false;
    }
  }

  item.visible = false;
}
function onButtonReady(item: Item, button: DialogButton, ev: ContentReadyEvent) {
  if (item.focused) {
    return;
  }
  
  if (item.buttons[0] != button) {
    return;
  }
  
  item.focused = true;
  setTimeout(() => {
    ev.component.focus();
  });
}
function onOverlayHidden(item: Item) {
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
    :visible="item.visible"
    @overlay-hidden="onOverlayHidden(item)">

    <div
      class="base-dialog-provider__item relative flex flex-col border rounded max-w-4xl shadow-2xl overflow-hidden"
      :class="item.class">
      
      <base-loading-bar 
        class="absolute top-0 w-full"
        v-if="item.isLoading"
        :is-loading="true">
      </base-loading-bar>

      <div class="flex gap-6 items-center p-8">
        <i
          v-if="item.icon"
          class="text-4xl"
          :class="item.icon"></i>

        <div
          v-html="item.innerHtml"
          class="base-dialog-provider__content flex-grow">
        </div>
      </div>

      <div class="base-dialog-provider__buttons flex flex-row gap-1 self-end p-4 pt-0">
        <template v-for="btn in item.buttons" :key="btn.text">
          <dx-button
            :disabled="item.disabled"
            :icon="btn.icon"
            :type="btn.type"
            :text="btn.text"
            @content-ready="onButtonReady(item, btn, $event)"
            @click="onButtonClick(item, btn)">
          </dx-button>
        </template>
      </div>

    </div>
  </base-overlay>
</template>

<style lang="less">
.base-overlay-from-dialog-provider {
  --anim-translate-y: 3rem;
  --anim-scale: .7;
}

.base-dialog-provider__item {
  min-width: 25rem;
  background-color: white;
  border-color: var(--gray-5);
}

.base-dialog-provider__item--info {
  i {
    color: var(--blue-0);
  }
}

.base-dialog-provider__item--danger {
  i {
    color: var(--red-0);
  }
}

.base-dialog-provider__item--success {
  i {
    color: var(--green-0);
  }
}
</style>