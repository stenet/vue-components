<script lang="ts" setup>
import BaseTooltip from "@/components/BaseTooltip.vue";
</script>

<template>
  <div class="flex flex-col">
    <h2>
      base-tooltip
    </h2>
    <div class="flex gap-4">
      <base-tooltip
        text="I'm a tooltip">
        <dx-button
          text="Button with tooltip">
        </dx-button>
      </base-tooltip>
    </div>
  </div>
</template>

<style lang="less">

</style>