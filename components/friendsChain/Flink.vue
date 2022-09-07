<template>
  <div class="wrapper" :class="{ apply: status == 'apply' }">
    <card class="card front">
      <div class="title">
        <div class="small">友情链接</div>
        <div class="bigger">与博主们一起进步</div>
      </div>
      <div class="buttons">
        <div class="btn access">
          <i></i>
          <span>随机访问</span>
        </div>
        <div class="btn apply" @click="switchStatus('apply')">
          <i></i>
          <span>申请友链</span>
        </div>
      </div>
      <div class="group">
        <div class="group-wrapper">
          <div class="group-pair" v-for="i in Math.floor(data.length / 2)">
            <div class="group-item">
              <img :src="data[(i - 1) * 2].imgSrc" alt="" />
            </div>
            <div class="group-item">
              <img :src="data[(i - 1) * 2 + 1].imgSrc" alt="" />
            </div>
          </div>
          <div class="group-pair" v-for="i in Math.floor(data.length / 2)">
            <div class="group-item">
              <img :src="IMG_ADDRESS + data[(i - 1) * 2].imgSrc" alt="" />
            </div>
            <div class="group-item">
              <img :src="IMG_ADDRESS + data[(i - 1) * 2 + 1].imgSrc" alt="" />
            </div>
          </div>
        </div>
      </div>
    </card>
    <card class="card back">
      <div class="meta">
        <div class="return" @click="switchStatus('default')">
          <i class="iconfont icon-xiangzuo"></i>
        </div>
        <div class="title">
          <h3>申请友链</h3>
        </div>
      </div>
      <div class="content">
        
      </div>
    </card>
  </div>
</template>

<script setup lang="ts">
import { FriendsChain } from "~~/types";

const { data } = withDefaults(
  defineProps<{
    data?: FriendsChain[];
  }>(),
  {
    data: [],
  }
);

const IMG_ADDRESS = import.meta.env.VITE_BASE_IMG_ADDRESS

const form = ref<FriendsChain>({});
const status = ref<"default" | "apply">("default");

const switchStatus = (s: "default" | "apply") => {
  status.value = s;
};
</script>

<style scoped lang="scss">
.wrapper {
  position: relative;
  transform-style: preserve-3d;
  perspective: 3000px;
  overflow: hidden;
  // height: 450px;
  .card {
    height: 28rem;
  }
  .front {
    position: relative;
    transition: 0.8s ease;
    .title {
      position: absolute;
      left: 1.5rem;
      top: 1.5rem;
      cursor: default;
      .small {
        font-size: 0.8rem;
        color: var(--font-color);
        opacity: 0.7;
      }
      .bigger {
        font-size: 1.8rem;
        font-weight: 700;
      }
    }
    .buttons {
      position: absolute;
      right: 1.5rem;
      top: 1.5rem;
      display: flex;
      font-size: 1.1rem;
      .btn {
        margin-left: 1rem;
        padding: 0.8rem;
        border-radius: 10px;
        transition: background 0.5s;
        cursor: pointer;
        &.access {
          background: #f1f3f8;
          color: var(--theme);
        }
        &.apply {
          background: var(--font-color);
          color: aliceblue;
        }
        &:hover {
          background: var(--theme);
          color: aliceblue;
        }
      }
    }

    .group {
      .group-wrapper {
        height: 20rem;
        padding-top: 7rem;
        animation: rowup 5s linear infinite normal;
        white-space: nowrap;
        // transform: translate(-50%);
        .group-pair {
          display: inline-block;
          width: 8.5rem;
          height: 8.5rem;
          white-space: initial;
          margin: 0 1rem;
          .group-item {
            overflow: hidden;
            border-radius: 50%;
            display: inline-block;
            box-shadow: 0 2px 16px -3px rgba(0, 0, 0, 0.15);
            &:last-child {
              transform: translate(-50%);
            }
            img {
              height: 100%;
              width: 100%;
              object-fit: cover;
            }
          }
        }
      }
    }
  }
  .back {
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
    /* 默认位置下移并沿Y轴旋转-90度 */
    transform: translateY(110px) rotateX(-90deg);
    /* 设置过渡 */
    transition: transform 0.8s ease;
    padding: 0.8rem 1rem;
    box-sizing: border-box;
    .meta {
      display: flex;
      position: relative;
      align-items: center;
      .return {
        position: relative;
        border-radius: 10px;
        // background: var(--theme);
        border: 1px solid #e3e8f7;
        cursor: pointer;
        padding: 0.2rem 0.8rem;
        transition: background 0.5s;
        margin-right: 1rem;
        &:hover {
          background: var(--theme);
          i {
            color: #e3e8f7;
            opacity: 1;
          }
        }
        i {
          font-size: 2rem;
          color: var(--font-color);
          opacity: 0.7;
          transition: color 0.3s, opacity 0.3s;
        }
      }
    }
  }

  &.apply {
    .front {
      opacity: 0;
      transform: translateY(-110px) rotateX(90deg);
    }
    .back {
      opacity: 1;
      transform: translateY(0) rotateX(0);
    }
  }

  @keyframes rowup {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-50%);
    }
  }
}
</style>
