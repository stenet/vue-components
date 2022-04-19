<script lang="ts" setup>
import { ref } from "vue";

const dataSource = ref([{
  name: "AAA"
}, {
  name: "BBB"
}, {
  name: "CCC"
}]);

</script>

<template>
  <div class="flex flex-col relative">
    <h2>
      dx
    </h2>
    <div class="flex flex-col gap-4">
      <dx-date-box
        type="datetime">
      </dx-date-box>
      
      <dx-data-grid
        :data-source="dataSource">
        <dx-column caption="Name" data-field="name"></dx-column>
      </dx-data-grid>
    </div>
  </div>
</template>

<style lang="less">
</style>