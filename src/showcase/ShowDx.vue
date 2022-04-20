<script lang="ts" setup>
import { ref } from "vue";
import DxLoadPanel from "devextreme-vue/load-panel";

const dataSource = ref([{
  name: "AAA"
}, {
  name: "BBB"
}, {
  name: "CCC"
}]);

const date = ref(new Date());

const loadPanelVisible = ref(false);
function onShowLoadingClick() {
  loadPanelVisible.value = true;

  setTimeout(() => loadPanelVisible.value = false, 4000);
}
</script>

<template>
  <div class="flex flex-col relative">
    <h2>
      dx
    </h2>
    <div class="flex flex-col gap-4">
      <dx-date-box
        :display-format="$dtFP('d')"
        type="datetime"
        v-model="date">
      </dx-date-box>

      <dx-data-grid
        :data-source="dataSource">
        <dx-column caption="Name" data-field="name"></dx-column>
      </dx-data-grid>

      <div>
        <dx-button
          text="Show loading"
          @click="onShowLoadingClick()"></dx-button>

        <dx-load-panel
          :visible="loadPanelVisible"></dx-load-panel>
      </div>
    </div>
  </div>
</template>

<style lang="less">
</style>