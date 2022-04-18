<script setup lang="ts">
import BaseToastProvider from "@/components/BaseToastProvider.vue";
import BaseDialogProvider from "@/components/BaseDialogProvider.vue";
</script>

<template>
  <base-dialog-provider>
    <base-toast-provider x="right" y="top">
      <RouterView/>
    </base-toast-provider>
  </base-dialog-provider>
</template>

<style lang="less">

</style>
