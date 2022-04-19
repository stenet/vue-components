<script lang="ts" setup>
import BaseShadowBox from "@/components/BaseShadowBox.vue";
</script>

<template>
  <div class="flex flex-col">
    <h2>
      base-shadow-box
    </h2>
    <div class="flex flex-col gap-4">
      <base-shadow-box>
        <div class="flex flex-col">
          <div>
            Row 1
          </div>
          <div>
            Row 2
          </div>
          <div>
            Row 3
          </div>
        </div>
      </base-shadow-box>

      <base-shadow-box
        title="Title"
        subtitle="Subtitle">
        <div class="flex flex-col">
          <div>
            Row 1
          </div>
          <div>
            Row 2
          </div>
          <div>
            Row 3
          </div>
        </div>
      </base-shadow-box>

      <base-shadow-box
        title="Title"
        subtitle="Subtitle">
        <template #toolbar>
          <dx-button
            icon="fa-solid fa-plus"
            text="Toolbar">
          </dx-button>
          <dx-button
            icon="fa-solid fa-key">
          </dx-button>
        </template>
        <div class="flex flex-col">
          <div>
            Row 1
          </div>
          <div>
            Row 2
          </div>
          <div>
            Row 3
          </div>
        </div>
      </base-shadow-box>
    </div>
  </div>
</template>

<style lang="less">
</style>