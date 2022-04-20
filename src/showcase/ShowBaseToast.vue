<script lang="ts" setup>
import { useToast } from "@/composables/use-toast";

const toast = useToast();

function onShowClick(type?: "info" | "danger" | "success", icon?: string) {
  toast.show({
    icon: icon,
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
      <div class="flex flex-wrap gap-1">
        <dx-button
          text="Show default toast"
          @click="onShowClick(undefined, 'fa-solid fa-key')">
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