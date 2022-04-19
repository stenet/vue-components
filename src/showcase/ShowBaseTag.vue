<script lang="ts" setup>
import BaseTag from "@/components/BaseTag.vue";
</script>

<template>
  <div class="flex flex-col">
    <h2>
      base-tag
    </h2>
    <div class="flex gap-2">
      <base-tag>gray</base-tag>
      <base-tag type="blue">blue</base-tag>
      <base-tag type="green">green</base-tag>
      <base-tag type="red">red</base-tag>
      <base-tag type="orange">orange</base-tag>
    </div>
  </div>
</template>

<style lang="less">

</style>