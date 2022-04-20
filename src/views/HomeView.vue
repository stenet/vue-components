<script setup lang="ts">
import ShowBaseLoadingBar from "@/showcase/ShowBaseLoadingBar.vue";
import ShowBaseCard from "@/showcase/ShowBaseCard.vue";
import ShowBaseAvatar from "@/showcase/ShowBaseAvatar.vue";
import ShowBaseNotification from "@/showcase/ShowBaseNotification.vue";
import ShowBaseTag from "@/showcase/ShowBaseTag.vue";
import ShowBaseBadge from "@/showcase/ShowBaseBadge.vue";
import ShowBaseTooltip from "@/showcase/ShowBaseTooltip.vue";
import ShowBaseOverlay from "@/showcase/ShowBaseOverlay.vue";
import ShowBaseSidebar from "@/showcase/ShowBaseSidebar.vue";
import ShowBaseGrid from "@/showcase/ShowBaseGrid.vue";
import ShowToast from "@/showcase/ShowToast.vue";
import ShowBaseDialog from "@/showcase/ShowBaseDialog.vue";
import ShowDx from "@/showcase/ShowDx.vue";
</script>

<template>
  <div class="flex flex-col p-4 gap-8">
    <show-base-loading-bar></show-base-loading-bar>
    <show-base-card></show-base-card>
    <show-base-avatar></show-base-avatar>
    <show-base-notification></show-base-notification>
    <show-base-tag></show-base-tag>
    <show-base-badge></show-base-badge>
    <show-base-tooltip></show-base-tooltip>
    <show-base-overlay></show-base-overlay>
    <show-base-sidebar></show-base-sidebar>
    <show-base-grid></show-base-grid>
    <show-toast></show-toast>
    <show-base-dialog></show-base-dialog>
    <show-dx></show-dx>
  </div>
</template>

<style lang="less">
.home-view {
}
</style>
