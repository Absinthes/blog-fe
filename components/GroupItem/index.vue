<template>
  <Card class="group-item">
    <div class="group-info-box">
      <div class="group-img-box">
        <img :src="imgPrefix + group.pic" alt="" />
        <div class="heat-box">
          <i class="iconfont icon-icon1"></i>
          <span>5348</span>
        </div>
      </div>
      <div class="describe-box">
        <h3 class="title">{{ group.name }}</h3>
        <div class="describe ellipsis-2">{{ group.describe }}</div>
        <div class="bottom">
          <div class="number-box">
            <i class="iconfont icon-wenzhang1"></i>
            <span>{{ group.articles.length }}篇文章</span>
          </div>
          <button class="moreArticle">
            <i class="iconfont icon-xiangyou"></i>
            <span>更多文章</span>
          </button>
        </div>
      </div>
    </div>
    <div class="article-list">
      <div v-for="article in group.articles" class="article-list-item">
        <NuxtLink :to="`/article/${article.id}`" class="title">{{
          article.title
        }}</NuxtLink>
        <div class="time">
          <i class="iconfont icon-shijian2"></i>
          <span>{{
            dayjs(+article.createTime)
              .fromNow()
              .replace(/\s/g, "")
          }}</span>
        </div>
      </div>
    </div>
  </Card>
</template>

<script lang="ts" setup>
import { Group } from "~~/types";
import relativeTime from "dayjs/plugin/relativeTime.js";
import zhCN from "dayjs/locale/zh-cn.js";
import dayjs from "dayjs";
dayjs.locale(zhCN);
dayjs.extend(relativeTime);

const props = withDefaults(
  defineProps<{
    group: Group;
    imgPrefix?: string;
  }>(),
  {
    imgPrefix: import.meta.env.VITE_BASE_IMG_ADDRESS as string,
  }
);
</script>

<style lang="scss" scoped>
.group-item {
  padding: 1rem;
  box-sizing: border-box;
  color: var(--font-color);
  .group-info-box {
    display: flex;
    .group-img-box {
      position: relative;
      width: 10rem;
      height: 6rem;
      margin-right: 0.5rem;
      border-radius: 1rem;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      .heat-box {
        position: absolute;
        top: 0.5em;
        right: 0;
        padding: 2px 5px;
        font-size: 0.8rem;
        color: var(--white);
        background-color: var(--color-pink);
        border-top-left-radius: 1rem;
        border-bottom-left-radius: 1rem;
        .iconfont {
          color: inherit;
          margin-right: 2px;
        }
      }
    }
    .describe-box {
      display: flex;
      flex: 1;
      flex-direction: column;
      justify-content: space-between;
      .title {
        margin: 0;
      }
      .describe {
        font-size: 0.8rem;
        height: 2rem;
        line-height: 1rem;
      }
      .bottom {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        font-size: 0.8rem;
        .number-box {
          color: var(--font-thin-deep-color);
          .iconfont {
            font-size: 0.9rem;
          }
        }
        .moreArticle {
          border: 0;
          color: var(--theme);
          padding: 2px 10px;
          background-color: rgb(var(--themeRgb) / 40%);
          border-radius: 5px;
          text-align: center;
          cursor: pointer;
          .iconfont {
            display: inline-block;
            width: 0px;
            opacity: 0;
            transform: translate(-10px);
            transition: width 0.3s, margin-left 0.3s, transform 0.7s,
              opacity 0.7s 0.1s;
          }
          span {
            font-weight: 600;
          }
          &:hover {
            .iconfont {
              opacity: 1;
              width: 1rem;
              margin-left: -5px;
              transform: translate(0);
            }
          }
        }
      }
    }
  }

  .article-list {
    margin-top: 1rem;
    .article-list-item {
      display: flex;
      justify-content: space-between;
      padding: 3px 0;
      font-size: 0.9rem;
      transition: color 0.3s, background 0.3s;
      .title {
        display: flex;
        align-items: center;
        color: var(--font-color);
        background: linear-gradient(180deg, #bf242a 90%, #bf242a 0) no-repeat;
        background-size: var(--p, 0%);
        transition: background-size 0.3s, padding 0.3s, font-weight 0.3s;
        padding: 5px 15px 5px 0;
        &:hover {
          --p: 100%;
          font-weight: 600;
          color: white !important;
          text-decoration: none;
          padding-left: 5px;
        }
        &::before {
          content: "";
          display: inline-block;
          margin-right: 5px;
          width: 7px;
          height: 7px;
          border-radius: 50%;
          border: 1px solid var(--color-pink);
        }
      }
      .time {
        color: var(--font-thin-color);
        font-weight: 500;
        .iconfont {
          font-weight: 500;
          margin-right: 2px;
          font-size: 0.9rem;
        }
      }
    }
  }
}
</style>
