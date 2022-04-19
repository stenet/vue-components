<script lang="ts" setup>
import { computed } from "vue";

const props = withDefaults(defineProps<{
  text?: string | number;
  icon?: string
  color?: string;
  x?: "left" | "right",
  bounce?: boolean
}>(), {
  color: "var(--red-2)",
  x: "right",
  bounce: false
});

const badgeClass = computed(() => {
  const r = [`base-badge__item--${props.x}`];
  
  if (props.bounce) {
    r.push("base-badge__item--bounce");
  }
  return r;
});

const hasContent = computed(() => {
  return !!props.icon || !!props.text;
});
</script>

<template>
  <div
    class="base-badge inline relative">
    <transition name="badge">
      <div
        v-if="hasContent"
        class="base-badge__item absolute flex justify-center items-center rounded-xl px-1 py-0.5 -top-1.5 text-white text-xs transition"
        :class="badgeClass">
        <div v-if="props.text">
          {{ text }}
        </div>
        <div v-if="props.icon">
          <i :class="props.icon"></i>
        </div>
      </div>
    </transition>
    <slot></slot>
  </div>
</template>

<style lang="less">
.base-badge__item {
  min-width: 1.25rem;
  background-color: v-bind("props.color");
}

.base-badge__item--bounce {
@apply animate-bounce;
}

.base-badge__item--left {
@apply ~ "-left-1.5";
}

.base-badge__item--right {
@apply ~ "-right-1.5";
}

.badge-enter-active,
.badge-leave-active {
@apply transition;
}

.badge-enter-from,
.badge-leave-to {
  opacity: 0;
  transform: scale(.7);
}
</style>