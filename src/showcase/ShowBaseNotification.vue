<script lang="ts" setup>
import BaseNotification from "@/components/BaseNotification.vue";
</script>

<template>
  <div class="flex flex-col">
    <h2>
      base-notification
    </h2>
    <div class="flex flex-col gap-4">
      <base-notification>
        Alles normal
      </base-notification>
      
      <base-notification
        type="danger">
        Fehler!!!
      </base-notification>

      <base-notification
        type="success">
        Daten gespeichert
      </base-notification>
    </div>
  </div>
</template>

<style lang="less">

</style>