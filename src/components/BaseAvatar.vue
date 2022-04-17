<script lang="ts" setup>
import Avatar from "@/assets/avatar.jpg";

const props = withDefaults(defineProps<{
  image?: string;
  size?: string
}>(), {
  image: Avatar,
  size: "50px"
});
</script>

<template>
  <div 
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