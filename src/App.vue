<script setup lang="ts">
import BaseLoadingBarProvider from "@/components/BaseLoadingBarProvider.vue";
import BaseToastProvider from "@/components/BaseToastProvider.vue";
import BaseDialogProvider from "@/components/BaseDialogProvider.vue";
</script>

<template>
  <base-loading-bar-provider>
    <base-dialog-provider>
      <base-toast-provider x="center" y="bottom">
        <RouterView/>
      </base-toast-provider>
    </base-dialog-provider>
  </base-loading-bar-provider>
</template>

<style lang="less">

</style>
