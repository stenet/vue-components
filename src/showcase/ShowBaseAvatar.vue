<script lang="ts" setup>
import BaseAvatar from "@/components/BaseAvatar.vue";
import Avatar from "@/assets/avatar.jpg";
</script>

<template>
  <div class="flex flex-col">
    <h2>
      base-avatar
    </h2>
    <div>
      <base-avatar
        :image="Avatar"></base-avatar>
    </div>
  </div>
</template>

<style lang="less">

</style>