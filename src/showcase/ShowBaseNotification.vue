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
        Everything is working as expected
      </base-notification>

      <base-notification
        type="danger">
        Oooops, an error has occured!
      </base-notification>

      <base-notification
        type="success">
        Well done, all data saved.
      </base-notification>
    </div>
  </div>
</template>

<style lang="less">

</style>