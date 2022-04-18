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
      showToast
    </h2>
    <div class="flex flex-col gap-4">
      <div class="button-group">
        <button
          @click="onShowClick()">Show default toast
        </button>

        <button
          @click="onShowClick('info')">Show info toast
        </button>

        <button
          @click="onShowClick('danger')">Show danger toast
        </button>

        <button
          @click="onShowClick('success')">Show success toast
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="less">

</style>