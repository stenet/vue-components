<script lang="ts" setup>
import { onMounted, ref, watch } from "vue";

const props = withDefaults(defineProps<{
  color?: string;
  isLoading?: boolean;
  hasError?: boolean;
}>(), {
  color: "var(--blue-2)"
});

const loader = ref<HTMLElement>();
let loadingAnimation: Animation | undefined;
let finishAnimation: Animation | undefined;

function createLoadingAnimation() {
  return new Animation(
    new KeyframeEffect(
      loader.value!,
      [
        {
          backgroundColor: "var(--gray-2)",
          width: "0"
        },
        {
          backgroundColor: "var(--gray-2)",
          width: "100%"
        }
      ],
      {
        duration: 15000,
        easing: "cubic-bezier(0,1.17,.72,.88)",
        fill: "forwards"
      })
  );
}
function createFinishAnimation() {
  return new Animation(
    new KeyframeEffect(
      loader.value!,
      [
        {
          backgroundColor: "var(--finish-background-color)"
        }
      ],
      {
        duration: 300,
        fill: "forwards"
      }
    )
  );
}
function start() {
  loadingAnimation?.cancel();
  finishAnimation?.cancel();

  loadingAnimation?.updatePlaybackRate(1);
  loadingAnimation?.play();
}
function finish() {
  loader.value!.style.setProperty("--finish-background-color", getColor());

  loadingAnimation?.updatePlaybackRate(50);
  finishAnimation?.play();
}
function getColor() {
  return props.hasError ? "var(--red-2)" : props.color;
}

onMounted(() => {
  loadingAnimation = createLoadingAnimation();
  finishAnimation = createFinishAnimation();

  if (props.isLoading) {
    start();
  } else {
    loader.value!.style.width = "100%";
    finish();
  }
});

let timeout: number | null;
watch(() => props.isLoading, (v) => {
  if (timeout) {
    clearTimeout(timeout);
    timeout = null;
  }

  timeout = setTimeout(() => {
    if (v) {
      start();
    } else {
      finish();
    }
  }, 100);

});
watch(() => props.hasError, (v) => {
  if (v) {
    finish();
  }
});

</script>

<template>
  <div class="base-loading-bar">
    <div
      class="base-loading-bar__progress h-1 w-0"
      ref="loader"></div>
  </div>
</template>

<style lang="less">
</style>