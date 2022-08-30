<template>
  <div class="wrapper" :class="{ hide: isHide }">
    <div class="inner">
      <div class="top" @click="handleTop">顶</div>
      <div class="theme">
        <i class="iconfont icon-yueliang" />
      </div>
      <div class="bottom" @click="handleBottom">底</div>
      <div class="ball">
        <div>{{ percent }}%</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import _ from "lodash";
const percent = ref(0);
const percentStyle = computed(() => {
  return `translate(-50%,${37 - percent.value * 0.7}%)`;
});
const isHide = computed(() => {
  return percent.value < 10;
});

let totalH ;
// 可视高
let clientH ;
console.log(totalH, clientH);

const handleTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

const handleBottom = () => {
  window.scrollTo({
    top: totalH - clientH,
    behavior:"smooth"
  });
};

let computedPercent: any;
onMounted(() => {
  totalH = document.body.scrollHeight || document.documentElement.scrollHeight;
  clientH = window.innerHeight || document.documentElement.clientHeight;
  let computedPercent = () => {
    var validH = totalH - clientH;
    // 滚动条卷去高度
    var scrollH = document.body.scrollTop || document.documentElement.scrollTop;
    // 百分比
    var result = Math.floor((scrollH / validH) * 100);
    percent.value = result > 100 ? 100 : result;
  };
  window.addEventListener("scroll", computedPercent);
});

onUnmounted(() => {
  window.removeEventListener("scroll", computedPercent);
});
</script>

<style scoped lang="scss">
.wrapper {
  position: fixed;
  right: 2rem;
  bottom: 2rem;
  cursor: pointer;
  transition: opacity 0.8s,transform .8s;
  .inner {
    position: relative;
    .top,
    .bottom,
    .theme {
      display: flex;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      justify-content: center;
      align-items: center;
      width: 2rem;
      height: 2rem;
      background-color: #006e90;
      color: white;
      border-radius: 50%;
      padding: 0.5rem;
      transition: transform 0.5s, background-color 0.3s;

      &:hover {
        background-color: #f18f01;
      }
    }

    .top {
      transform: translate(-50%, -220%);
    }

    .theme {
      transform: translate(-180%, -170%);
    }

    .bottom {
      transform: translate(-220%, -40%);
    }

    .ball {
      position: relative;
      width: 5rem;
      height: 5rem;
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
  }
}

.hide {
  opacity: 0;
  transform: translate(20px,20px);
  .inner {
    .top,
    .bottom,
    .theme {
      transform: translate(-50%, -50%);
    }
  }
}

@keyframes swing {
  100% {
    transform: v-bind(percentStyle) rotate(360deg);
  }
}
</style>
