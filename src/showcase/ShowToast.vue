<script lang="ts" setup>
import { useToast } from "@/composables/useToast";

const toast = useToast();

function onShowClick(type?: "info" | "danger" | "success") {
  toast.show({
    type: type,
    innerHtml: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum."
  });
}
</script>

<template>
  <div class="flex flex-col relative">
    <h2>
      useToast.show
    </h2>
    <div class="flex flex-col gap-4">
      <div class="button-group">
        <dx-button
          text="Show default toast"
          @click="onShowClick()">
        </dx-button>

        <dx-button
          text="Show info toast"
          @click="onShowClick('info')">
        </dx-button>

        <dx-button
          text="Show danger toast"
          @click="onShowClick('danger')">
        </dx-button>

        <dx-button
          text="Show success toast"
          @click="onShowClick('success')">
        </dx-button>
      </div>
    </div>
  </div>
</template>

<style lang="less">

</style>