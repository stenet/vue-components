<script lang="ts" setup>
import BaseGrid from "@/components/BaseGrid.vue";
import BaseGridCol from "@/components/BaseGridCol.vue";
</script>

<template>
  <div class="flex flex-col relative">
    <h2>
      base-grid
    </h2>
    <div class="flex flex-col gap-4">
      <base-grid class="show-base-grid__grid-1" cols="d6" gap="0.5rem">
        <base-grid-col span="xl:2">
          Div 1
        </base-grid-col>
        <base-grid-col>
          Div 2
        </base-grid-col>
        <base-grid-col>
          Div 3
        </base-grid-col>
        <base-grid-col>
          Div 4
        </base-grid-col>
        <base-grid-col>
          Div 5
        </base-grid-col>
        <base-grid-col>
          Div 6
        </base-grid-col>
      </base-grid>

      <base-grid class="show-base-grid__grid-2" cols="d4" gap="0.5rem">
        <base-grid-col span="xl:2">
          Div 1
        </base-grid-col>
        <base-grid-col>
          Div 2
        </base-grid-col>
        <base-grid-col>
          Div 3
        </base-grid-col>
        <base-grid-col>
          Div 4
        </base-grid-col>
        <base-grid-col>
          Div 5
        </base-grid-col>
        <base-grid-col>
          Div 6
        </base-grid-col>
      </base-grid>

      <base-grid class="show-base-grid__grid-3" cols="d2" gap="0.5rem">
        <base-grid-col span="xl:2">
          Div 1
        </base-grid-col>
        <base-grid-col>
          Div 2
        </base-grid-col>
        <base-grid-col>
          Div 3
        </base-grid-col>
        <base-grid-col>
          Div 4
        </base-grid-col>
        <base-grid-col>
          Div 5
        </base-grid-col>
        <base-grid-col>
          Div 6
        </base-grid-col>
      </base-grid>
    </div>
  </div>
</template>

<style lang="less">
.show-base-grid__grid-1 > div {
@apply p-2;
  background-color: var(--green-5);
}

.show-base-grid__grid-2 > div {
@apply p-2;
  background-color: var(--blue-5);
}

.show-base-grid__grid-3 > div {
@apply p-2;
  background-color: var(--red-5);
}
</style>