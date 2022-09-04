<template>
  <div
    class="classifyList-box"
    :style="{
      gridTemplateColumns: getCardWidth,
    }"
  >
    <transition-group name="classify-item">
      <article
        class="classify-item"
        v-for="article in articleList"
        :key="article.id"
      >
        <div class="img-box">
          <img class="bg-img" :src="imgAddress + article.pic" alt="" />
          <div class="float-box">
            <div class="author-box pointer">
              <img
                class="author-img"
                src="/public/崩坏星穹铁道 黑塔 - QuAn_的插画small.jpg"
                alt=""
              />
              <span>Absinthe.</span>
            </div>
            <div class="tags">
              <p class="tag pointer" v-for="tag in article.tags">
                <span class="sign">#</span>
                <span class="tag-title">{{ tag.name }}</span>
              </p>
            </div>
          </div>
        </div>
        <div class="info-container">
          <h3 class="title pointer" @click="articleClick(article)">
            {{ article.title }}
          </h3>
          <p class="summary pointer" @click="articleClick(article)">
            {{ article.summary }}
          </p>
          <hr />
          <div class="info-box">
            <div class="info-left">
              <span class="transverseLine"></span>
              <i class="iconfont icon-icon"></i>
              <span>{{ dayjs(+article.createTime).format("YYYY/MM/DD") }}</span>
            </div>
            <div class="info-right">
              <i class="iconfont icon-yanjing"></i>
              <span>{{ article.viewNum }}</span>
              <span class="viewers">Viewers</span>
            </div>
          </div>
          <button class="readMore" @click="articleClick(article)">
            Read More
          </button>
        </div>
      </article>
    </transition-group>
  </div>
</template>

<script lang="ts" setup>
import { Article } from "~~/types";
import dayjs from "dayjs";

const props = withDefaults(
  defineProps<{
    articleList?: Article[];
    colLen?: number;
    imgAddress?: string;
  }>(),
  {
    colLen: 3,
    // @ts-ignore
    articleList: [],
    imgAddress: import.meta.env.VITE_BASE_IMG_ADDRESS as string,
  }
);

const emits = defineEmits<{
  (e: "articleClick", article: Article);
  (e: "authorClick");
}>();

const getCardWidth = computed(() => {
  return `repeat(${props.colLen}, calc(${100 / props.colLen}% - ${
    (2.5 * (props.colLen - 1)) / props.colLen
  }rem))`;
});

const articleClick = (article: Article) => {
  emits("articleClick", article);
};
</script>

<style lang="scss" scoped>
.classifyList-box {
  display: grid;
  grid-column-gap: 2.5rem;
  grid-row-gap: 2.5rem;
  color: var(--font-color, #fff);
  .classify-item {
    .img-box {
      position: relative;
      padding: 60% 0;
      border-radius: 2rem;
      overflow: hidden;
      .bg-img {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    .float-box {
      position: absolute;
      left: 50%;
      bottom: 1.5rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
      transform: translate(-50%);
      .tags {
        width: 100%;
        color: var(--white);
        text-align: center;
        white-space: nowrap;
        mix-blend-mode: difference;
        .tag {
          display: inline-block;
          margin-right: 10px;
        }
        .sign {
          margin-right: 5px;
        }
      }
      .author-box {
        display: inline-flex;
        align-items: center;
        padding: 5px 15px 5px 5px;
        background-color: var(--card-bg);
        border-radius: 2rem;
        box-shadow: var(--card-shadow);
        .author-img {
          width: 50px;
          height: 50px;
          object-fit: cover;
          margin-right: 10px;
          border-radius: 50%;
        }
        span {
          color: var(--font-color);
          font-weight: 600;
          opacity: 0.6;
        }
      }
    }

    .info-container {
      padding: 0 1rem;
      .title {
        line-height: 2rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        margin-bottom: 1rem;
      }
      .summary {
        width: 100%;
        font-size: 0.9rem;
        line-height: 1.5rem;
        height: 3rem;
        color: var(--font-thin-color);
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
      }
      hr {
        margin: 1rem 0 0;
        border-color: var(--font-thin-color);
        opacity: 0.2;
      }
    }

    .info-box {
      position: relative;
      display: flex;
      font-size: 0.9rem;
      margin: 1rem 0;
      &::after {
        content: "";
        position: absolute;
        left: 50%;
        width: 1px;
        height: 100%;
        background-color: var(--font-thin-color);
        opacity: 0.6;
      }
      .iconfont {
        font-size: 1.3rem;
        margin: 0 0.5rem 0 5px;
      }
      .info-left {
        display: flex;
        align-items: center;
        flex: 1;
      }
      .info-left::before {
        content: "";
        display: inline-block;
        margin-right: 0.5rem;
        width: 1.3rem;
        border: 1px solid var(--font-color);
        border-radius: 2rem;
        opacity: 0.5;
      }
      .info-right {
        display: flex;
        align-items: center;
        flex: 1;
        padding-left: 10px;
        .viewers {
          margin-left: 5px;
          font-size: 0.8rem;
        }
      }
    }

    .readMore {
      padding: 1rem 0;
      width: 100%;
      color: var(--font-color);
      font-weight: 700;
      border: 2px solid var(--font-thin-color);
      border-radius: 3rem;
      opacity: 0.6;
      overflow: hidden;
      cursor: pointer;
      background: linear-gradient(var(--theme) 0 0) no-repeat;
      transition: 0.4s, background-position 0s;
      background-size: var(--p, 0%);
      background-position: calc(100% - var(--p, 0%));
      &:hover {
        --p: 100%;
        color: var(--white);
        border-color: var(--theme);
        opacity: 1;
      }
    }
  }

  .classify-item-enter-active,
  .classify-item-leave-active {
    transition: all 0.5s ease;
  }
  .classify-item-enter-from,
  .classify-item-leave-to {
    opacity: 0;
    animation: one-in 1s reverse;
  }
  .classify-item-enter-to {
    animation: one-in 1s;
  }

  @keyframes one-in {
    from {
      height: 0%;
      transform: translateY(100px);
    }
    to {
      height: 100%;
    }
  }
}
</style>
