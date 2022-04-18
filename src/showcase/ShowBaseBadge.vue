<script lang="ts" setup>
import BaseBadge from "@/components/BaseBadge.vue";
</script>

<template>
  <div class="flex flex-col">
    <h2>
      base-badge
    </h2>
    <div class="flex gap-2">
      <base-badge>gray</base-badge>
      <base-badge type="blue">blue</base-badge>
      <base-badge type="green">green</base-badge>
      <base-badge type="red">red</base-badge>
      <base-badge type="orange">orange</base-badge>
    </div>
  </div>
</template>

<style lang="less">

</style>