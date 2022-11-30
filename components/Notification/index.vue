<template>
  <Transition>
    <div v-show="visible" class="custom">
      <!-- <i class="iconfont icon" :class="getIconComputed"></i> -->
      <Svg :name="getIconComputed"></Svg>
      <div class="message-box">
        <h2 v-if="title">{{ title }}</h2>
        <p>{{ message }}</p>
      </div>
      <Svg name="close"></Svg>
      <!-- <i class="iconfont icon-guanbi"></i> -->
    </div>
  </Transition>
</template>

<script lang="ts" setup>
import { IconType, IconEnum } from "./notify";
import "./SVG"
import Svg from "./svg.vue"

type PositionType = "top-right" | "top-left" | "bottom-right" | "bottom-left";
const props = withDefaults(
  defineProps<{
    id?: string;
    title?: string;
    message?: string;
    type?: IconType;
    duration?: number;
    offset?: number;
    position?: PositionType;
    zIndex: number
    onClick?: Function;
    onClose: Function;
  }>(),
  {
    id: "",
    title: "",
    message: "",
    type: "",
    duration: 4500,
    offset: 0,
    onClick: () => undefined,
    position: "top-right",
  }
);
const visible = ref(false);

const getIconComputed = computed(() => {
  if (props.type.length === 0) return "";
  return IconEnum[props.type];
});
</script>

<style lang="scss" scoped>
.custom {
}
</style>
