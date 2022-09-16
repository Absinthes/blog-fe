<template>
  <div class="c-progress" :class="direction">
    <div
      class="c-progress-outer"
      :class="direction"
      :style="setProgressBgStyle"
      ref="progress"
    >
      <div
        class="c-progress-inner"
        ref="progressInner"
        :style="setProgressStyle"
      ></div>
      <div
        v-if="showSlider"
        class="c-progress-slider"
        ref="slider"
        :style="setSliderStyle"
      ></div>
    </div>
    <span class="perText" v-if="showPerText">{{ tempPercent }}%</span>
  </div>
</template>

<script setup lang="ts">
const colorTable = {
  success: "#13ce66",
  fail: "#ff4949",
  warning: "#e6a23c",
  default: "#409EFF",
};
const props = withDefaults(
  defineProps<{
    precent?: number;
    showSlider?: boolean;
    showPerText?: boolean;
    width?: number;
    height?: number;
    bgColor?: string;
    progressColor?: string;
    sliderWidth?: number;
    type?: string;
    direction?: "across" | "vertical";
  }>(),
  {
    precent: 60,
    showSlider: true,
    showPerText: true,
    width: 300,
    height: 10,
    bgColor: "#ebeef5",
    progressColor: "#409EFF",
    sliderWidth: 20,
    type: "#409EFF",
    direction: "across",
  }
);
const emits = defineEmits<{
  (e: "update:precent", n: number): void;
}>();
const {
  precent,
  showSlider,
  showPerText,
  width,
  height,
  bgColor,
  progressColor,
  sliderWidth,
  type,
  direction,
} = toRefs(props);
const sliderLeft = ref(0);
const progressWidth = ref(0);
const tempPercent = ref(precent.value);
const progress = ref();
const slider = ref();
const progressInner = ref();

const setProgressBgStyle = computed(() => {
  if (direction.value === "vertical") {
    return {
      height: `${width.value + sliderWidth.value}px`,
      width: `${height.value}px`,
    };
  }
  return {
    width: `${width.value + sliderWidth.value}px`,
    height: `${height.value}px`,
  };
});
const setProgressStyle = computed(() => {
  const color = colorTable[type.value] || progressColor.value;
  if (direction.value === "vertical") {
    return {
      height: `${progressWidth.value}px`,
      width: `${height.value}px`,
      background: color,
    };
  }
  return {
    width: `${progressWidth.value}px`,
    height: `${height.value}px`,
    background: color,
  };
});
const setSliderStyle = computed(() => {
  const color = colorTable[type.value] || progressColor.value;
  if (direction.value === "vertical") {
    return {
      border: `1px soild ${color}`,
      width: `${sliderWidth.value}px`,
      height: `${sliderWidth.value}px`,
      bottom: `${sliderLeft.value}px`,
    };
  }
  return {
    border: `1px soild ${color}`,
    width: `${sliderWidth.value}px`,
    height: `${sliderWidth.value}px`,
    left: `${sliderLeft.value}px`,
  };
});
const addListener = () => {
  const sliderDom = slider.value;
  const progressDom = progress.value;
  const progressInnerDom = progressInner.value;
  let isClickSlider = false;
  let distance = 0; // 滑块与点击坐标的绝对距离
  progressDom.onclick = (e: Event) => {
    // 阻止事件冒泡
    e.stopPropagation();
    if (e.target == sliderDom) {
      return;
    }
    // console.log(e.offsetY);
    if (direction.value === "across") {
      let curX = progressDom.offsetLeft;
      sliderLeft.value = e.offsetX - curX;
    } else {
      if (e.target === progressDom) {
        sliderLeft.value = width.value - e.offsetY;
      } else {
        const innerHeight = progressInnerDom.offsetHeight;
        sliderLeft.value = innerHeight - e.offsetY;
      }
    }
    if (sliderLeft.value <= 0) {
      sliderLeft.value = 0;
    }
    if (sliderLeft.value >= width.value) {
      sliderLeft.value = width.value;
    }

    _countCurPercent();
  };
  sliderDom.onmousedown = (e: any) => {
    e.stopPropagation();
    isClickSlider = true;
    let curX = sliderDom.offsetLeft;
    if (direction.value === "across") {
      distance = e.pageX - curX; // 得出绝对距离
    } else {
      distance = e.pageY - sliderDom.offsetTop;
    }
  };
  progressDom.onmousemove = (e: any) => {
    e.stopPropagation();
    if (isClickSlider) {
      // 判断是否已经超出进度条的长度
      if (
        direction.value === "across" &&
        e.pageX - distance >= 0 &&
        e.pageX - distance <= width.value - 0
      ) {
        sliderLeft.value = e.pageX - distance;
        _countCurPercent();
      } else if (
        e.pageY - distance >= 0 &&
        e.pageY - distance <= width.value - 0
      ) {
        sliderLeft.value = width.value - (e.pageY - distance);
        _countCurPercent();
      }
    }
  };
  progressDom.onmouseup = () => {
    isClickSlider = false;
  };
};

const _countCurPercent = () => {
  tempPercent.value = Math.ceil((sliderLeft.value / width.value) * 100);
  progressWidth.value = sliderLeft.value + sliderWidth.value;
  // 取整的时候宽度可能不为0，所以在0和100的时候也将宽度取整
  if (tempPercent.value <= 0) {
    progressWidth.value = 0;
    sliderLeft.value = 0;
  }
  if (tempPercent.value >= 100) {
    progressWidth.value = width.value + sliderWidth.value;
    sliderLeft.value = width.value;
  }
  emits("update:precent", tempPercent.value);
};
onMounted(() => {
  sliderLeft.value = (width.value / 100) * precent.value;
  progressWidth.value = sliderLeft.value + sliderWidth.value;
  addListener();
});
</script>

<style scoped lang="scss">
.c-progress {
  $width: 300px;
  $radius: 5px;
  display: flex;
  align-items: center;
  &.vertical {
    flex-direction: column;
    .c-progress-inner {
      position: absolute;
      bottom: 0;
    }
    .c-progress-slider {
      left: 3px !important;
      transform: translateX(-50%);
    }
    .perText{
      margin-top: 5px;
    }
  }

  .perText {
    text-align: center;
    margin-left: 5px;
    font-size: 14px;
    color: #666;
    width: 2rem;
  }

  .c-progress-outer {
    position: relative;
    display: flex;
    align-items: center;
    width: $width;
    height: 10px;
    // text-align: center;
    border-radius: $radius;
    background: #ebeef5;

    .c-progress-inner {
      width: 100px;
      height: 10px;
      background: #409eff;
      border-radius: $radius;
    }

    .c-progress-slider {
      position: absolute;
      left: 10px;
      display: inline-block;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: #fff;
      border: 1px solid #409eff;
      z-index: 10;
    }
  }
}
</style>
