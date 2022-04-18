<script lang="ts" setup>

import { useDialog } from "@/composables/useDialog";

const dialog = useDialog();

function onShowClick(type?: "info" | "danger" | "success") {
  dialog.showYesNo({
    type: type,
    innerHtml: `This is a confirm dialog<br>Alright?`
  });
}

function onShowWithPromiseClick() {
  dialog.show({
    innerHtml: "Are you sure you want to ignore the changes?",
    buttons: [{
      text: "Yes",
      onClick: () => {}
    }, {
      text: "Save",
      onClick: () => {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(true);
          }, 2000);
        });
      }
    }]
  });
}
</script>

<template>
  <div class="flex flex-col relative">
    <h2>
      useDialog.show
    </h2>
    <div class="flex flex-col gap-4">
      <div class="button-group">
        <button
          @click="onShowClick()">Show default dialog
        </button>

        <button
          @click="onShowClick('info')">Show info dialog
        </button>

        <button
          @click="onShowClick('danger')">Show danger dialog
        </button>

        <button
          @click="onShowClick('success')">Show success dialog
        </button>

        <button
          @click="onShowWithPromiseClick()">Show with promise dialog
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="less">

</style>