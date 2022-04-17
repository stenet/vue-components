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
    class="base-avatar">
    <img :src="props.image">
  </div>
</template>

<style lang="less">
.base-avatar {
@apply overflow-hidden rounded;

  height: v-bind("props.size");
  width: v-bind("props.size");

  img {
  @apply object-cover;
  }
}
</style>