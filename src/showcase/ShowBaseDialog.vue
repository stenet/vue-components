<script lang="ts" setup>

import { useDialog } from "@/composables/use-dialog";
import { useToast } from "@/composables/use-toast";

const dialog = useDialog();
const toast = useToast();

function onShowClick(type?: "info" | "danger" | "success") {
  dialog.showYesNo({
    type: type,
    innerHtml: `This is a confirm dialog<br>Alright?`
  });
}

function onShowOkClick() {
  dialog.showOk({
    innerHtml: "Your order has been proceeded"
  });
}

function onShowWithPromiseClick() {
  dialog.show({
    type: "danger",
    innerHtml: "Are you sure you want to ignore the changes?",
    buttons: [{
      text: "Yes",
      onClick: () => {
      }
    }, {
      text: "Save",
      onClick: () => {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(true);
            toast.show({
              type: "success",
              innerHtml: "Data have been saved successfully :)"
            });
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
      <div class="flex flex-wrap gap-1">
        <dx-button
          text="Show default dialog"
          @click="onShowClick()">
        </dx-button>

        <dx-button
          text="Show info dialog"
          @click="onShowClick('info')">
        </dx-button>

        <dx-button
          text="Show danger dialog"
          @click="onShowClick('danger')">
        </dx-button>

        <dx-button
          text="Show success dialog"
          @click="onShowClick('success')">
        </dx-button>

        <dx-button
          text="Show OK"
          @click="onShowOkClick()">
        </dx-button>

        <dx-button
          text="Show with promise dialog"
          @click="onShowWithPromiseClick()">
        </dx-button>
      </div>
    </div>
  </div>
</template>

<style lang="less">

</style>