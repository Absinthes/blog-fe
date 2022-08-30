<template>
  <div class="ball">
    <div>{{ percent }}%</div>
  </div>
</template>

<script setup lang="ts">
import _ from "lodash";
const percent = ref(0);
const percentStyle = computed(() => {
  return `translate(-50%,${37 - percent.value * 0.7}%)`;
});

let computedPercent: any;
onMounted(() => {
  let computedPercent = (() => {
    var totalH =
      document.body.scrollHeight || document.documentElement.scrollHeight;
    // 可视高
    var clientH = window.innerHeight || document.documentElement.clientHeight;
    return () => {
      var validH = totalH - clientH;
      // 滚动条卷去高度
      var scrollH =
        document.body.scrollTop || document.documentElement.scrollTop;
      // 百分比
      var result = Math.floor((scrollH / validH) * 100);
      percent.value = result > 100 ? 100 : result;
    };
  })();
  window.addEventListener("scroll", computedPercent);
});

onUnmounted(() => {
  window.removeEventListener("scroll",computedPercent)
})
</script>

<style scoped lang="scss">
.ball {
  position: fixed;
  right: 0;
  bottom: 0;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  text-align: center;
  background-color: #006e90;
  overflow: hidden;
  &::before {
    content: "";
    display: block;
    width: 150%;
    height: 150%;
    background-color: #f18f01;
    border-radius: 40%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: v-bind(percentStyle);
    // transform: v-bind(percentStyle);
    animation: swing 5s linear infinite;
  }
  div {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    color: #fff;
  }
}

@keyframes swing {
  100% {
    transform: v-bind(percentStyle) rotate(360deg);
  }
}
</style>
