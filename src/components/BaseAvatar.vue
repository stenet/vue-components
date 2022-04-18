<script lang="ts" setup>
const props = withDefaults(defineProps<{
  image?: string;
  size?: string
}>(), {
  size: "50px"
});
</script>

<template>
  <div
    v-if="props.image"
    class="base-avatar overflow-hidden rounded">

    <img
      class="object-cover"
      :src="props.image">

  </div>
</template>

<style lang="less">
.base-avatar {
  height: v-bind("props.size");
  width: v-bind("props.size");
}
</style>