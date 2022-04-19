<script lang="ts" setup>
import BaseBadge from "@/components/BaseBadge.vue";
import { ref } from "vue";

const text = ref(9);
const icon = ref("fa-solid fa-key");

function onButton1Click() {
  text.value++;
}
function onButton2Click() {
  icon.value = icon.value
    ? ""
    : "fa-solid fa-key";
}
</script>

<template>
  <div class="flex flex-col">
    <h2>
      base-badge
    </h2>
    <div class="flex gap-4">
      <base-badge
        :text="text">
        <dx-button
          text="Badge with Text"
          @click="onButton1Click()">
        </dx-button>
      </base-badge>

      <base-badge
        :icon="icon"
        color="var(--blue-2)">
        <dx-button
          text="Icon badge"
          @click="onButton2Click()">
        </dx-button>
      </base-badge>

      <base-badge
        icon="fa-solid fa-key"
        color="var(--orange-2)"
        x="left">
        <dx-button
          text="Badge on left">
        </dx-button>
      </base-badge>

      <base-badge
        icon="fa-solid fa-key"
        color="var(--green-2)"
        :bounce="true">
        <dx-button
          text="Bouncing ;)">
        </dx-button>
      </base-badge>
    </div>
  </div>
</template>

<style lang="less">

</style>