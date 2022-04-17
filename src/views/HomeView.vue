<script setup lang="ts">
import ShowBaseLoadingBar from "@/showcase/ShowBaseLoadingBar.vue";
import ShowBaseShadowBox from "@/showcase/ShowBaseShadowBox.vue";
import ShowBaseAvatar from "@/showcase/ShowBaseAvatar.vue";
import ShowBaseNotification from "@/showcase/ShowBaseNotification.vue";
import ShowBaseBadge from "@/showcase/ShowBaseBadge.vue";
</script>

<template>
  <div class="flex flex-col p-4 gap-8">
    <show-base-loading-bar></show-base-loading-bar>
    <show-base-shadow-box></show-base-shadow-box>
    <show-base-avatar></show-base-avatar>
    <show-base-notification></show-base-notification>
    <show-base-badge></show-base-badge>
  </div>
</template>

<style lang="less">
.home-view {
}
</style>
