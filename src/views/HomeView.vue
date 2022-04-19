<script setup lang="ts">
import ShowBaseLoadingBar from "@/showcase/ShowBaseLoadingBar.vue";
import ShowBaseShadowBox from "@/showcase/ShowBaseShadowBox.vue";
import ShowBaseAvatar from "@/showcase/ShowBaseAvatar.vue";
import ShowBaseNotification from "@/showcase/ShowBaseNotification.vue";
import ShowBaseBadge from "@/showcase/ShowBaseBadge.vue";
import ShowBaseOverlay from "@/showcase/ShowBaseOverlay.vue";
import ShowBaseSidebar from "@/showcase/ShowBaseSidebar.vue";
import ShowToast from "@/showcase/ShowToast.vue";
import ShowDialog from "@/showcase/ShowDialog.vue";
import ShowDx from "@/showcase/ShowDx.vue";
</script>

<template>
  <div class="flex flex-col p-4 gap-8">
    <show-base-loading-bar></show-base-loading-bar>
    <show-base-shadow-box></show-base-shadow-box>
    <show-base-avatar></show-base-avatar>
    <show-base-notification></show-base-notification>
    <show-base-badge></show-base-badge>
    <show-base-overlay></show-base-overlay>
    <show-base-sidebar></show-base-sidebar>
    <show-toast></show-toast>
    <show-dialog></show-dialog>
    <show-dx></show-dx>
  </div>
</template>

<style lang="less">
.home-view {
}
</style>
