<script setup lang="ts">
import BaseToastProvider from "@/components/BaseToastProvider.vue";
</script>

<template>
  <base-toast-provider x="right" y="top">
    <RouterView/>
  </base-toast-provider>
</template>

<style lang="less">

</style>
