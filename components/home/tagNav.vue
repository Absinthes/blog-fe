<template>
  <div class="tag-nav">
    <card class="tag-nav-wrapper card">
      <div class="top">
        <div class="tag" v-for="tag in tags">
          <NuxtLink :to="`/tags/${tag.name}`">
            {{ tag.name }}
          </NuxtLink>
          <span>5</span>
        </div>
      </div>
      <hr />
      <div class="center">
        <div class="year-statistics" v-for="item in statisYearData">
          <NuxtLink
            :to="{
              path: `/archives`,
              hash: `#${item.year}`,
            }"
          >
            <div class="year">{{ item.year }}</div>
            <div class="number">{{ item.length }}<span>篇</span></div>
          </NuxtLink>
        </div>
      </div>
      <hr />
      <div class="bottom">
        <div class="column article">
          <span>
            <i class="iconfont icon-icon_article" />
            文章总数 :
          </span>
          <span class="data"> 636 </span>
        </div>
        <div class="column day">
          <span>
            <i class="iconfont icon-shijian" />
            建站天数 :
          </span>
          <span class="data"> 1037天 </span>
        </div>
        <div class="column bytes">
          <span>
            <i class="iconfont icon-ziti" />
            全站字数 :
          </span>
          <span class="data">598.2k</span>
        </div>
      </div>
    </card>
    <card class="latest-article card">
      <div class="icon">
        <i class="iconfont icon-lishijilu_huaban"></i>
        <span>最新文章</span>
      </div>
      <div class="item" v-for="article in latestArticle" :key="article.id">
        <div class="pic">
          <img :src="IMG_ADDRESS + article.pic" alt="" />
        </div>
        <div class="information">
          <div class="title">
            <NuxtLink :to="`/article/${article.id}`" class="link">
              {{ article.title }}
            </NuxtLink>
          </div>
          <div class="time">
            {{ dayjs(+article.createTime).format("YYYY-MM-DD") }}
          </div>
        </div>
      </div>
    </card>
  </div>
</template>

<script setup lang="ts">
import { getAllTag_hone, getArticleList } from "~~/api";
import { statisticsArticleByYear } from "~~/api/statistics";
import type { Article, StatisticsArticle, Tag } from "~~/types";
import dayjs from "dayjs";
const tags = ref<Tag[]>([]);
const statisYearData = ref<StatisticsArticle[]>([]);
const latestArticle = ref<Article[]>([]);
const IMG_ADDRESS = import.meta.env.VITE_BASE_IMG_ADDRESS;

useAsyncData(() => getAllTag_hone()).then(({ data }) => {
  tags.value = data.value;
});

useAsyncData(() => statisticsArticleByYear()).then(({ data }) => {
  statisYearData.value = data.value;
});

useAsyncData(() => getArticleList(5, 1)).then(({ data }) => {
  latestArticle.value = data.value.nodes;
});
</script>

<style lang="scss" scoped>
.tag-nav {
  position: sticky;
  top: 70px;
  .card {
    margin-bottom: 1rem;
  }
  .tag-nav-wrapper {
    animation: opacity-transition 2s forwards,translate-right 2s forwards;
    transition: opacity 2s,transform 2s;
    opacity: 0;
    padding: 1rem;
    .top {
      display: flex;
      flex-wrap: wrap;
      .tag {
        position: relative;
        cursor: pointer;
        padding: 0.5rem;
        border-radius: 5px;
        transition: transform 0.3s;
        span {
          position: relative;
          top: -0.5rem;
          // right: 0;
          // top: 0;
          font-size: 60%;
          color: rgba(54, 54, 54, 0.4);
        }
        &:hover {
          background: var(--theme);
          color: white;
          transform: scale(1.03);
          span {
            color: rgba($color: #fff, $alpha: 0.4);
          }
        }
      }
    }
    hr {
      margin: 1rem 0.5rem;
      border: 1px dashed #4259ef23;
    }
    .center {
      display: flex;
      flex-wrap: wrap;
      .year-statistics {
        cursor: pointer;
        border: 1px solid var(--border-color);
        border-radius: 5px;
        padding: 0.5rem;
        width: 45%;
        margin-bottom: 0.5rem;
        box-sizing: border-box;
        transition: transform 0.3s;
        .year {
          color: rgba(54, 54, 54, 0.4);
          margin-bottom: 0.5rem;
        }
        .number {
          font-size: 1.5rem;
          font-weight: 700;
          span {
            font-size: 1rem;
          }
        }
        &:hover {
          background-color: var(--theme);
          transform: scale(1.03);
          color: #fff;
          .year {
            color: rgba($color: #fff, $alpha: 0.4);
          }
        }
      }
    }

    .bottom {
      .column {
        display: flex;
        justify-content: space-around;
        align-items: center;
        color: rgb(76, 73, 72);
        margin: 1rem 0;
        span {
          display: block;
          width: 45%;
          &.data {
            text-align: right;
          }
        }
      }
    }
  }
  .latest-article {
    position: relative;
    padding: 1rem;
    animation: opacity-transition 2s 0.5s forwards,translate-right 2s 0.5s forwards;
    transition: opacity 2s,transform 2s;
    opacity: 0;
    .icon {
      display: flex;
      align-items: flex-end;
      margin-bottom: 1rem;
      .icon-lishijilu_huaban {
        font-size: 1.5rem;
      }
      span {
        font-size: 1.3rem;
        font-family: "阿里妈妈数黑体";
      }
    }
    .item {
      margin: 0.7rem 0;
      display: flex;
      .pic {
        width: 4.2rem;
        height: 4.2rem;
        border-radius: 10px;
        overflow: hidden;
        flex: 0 0 25%;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s;
        }
      }
      .information {
        margin-left: 0.5rem;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        box-sizing: border-box;
        padding-bottom: 0.5rem;
        width: 75%;
        .title {
          flex: 1;
          .link {
            overflow-wrap: break-word;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }
          &:hover {
            color: var(--theme);
          }
        }
        .time {
          font-size: 0.8rem;
          color: rgba($color: #000, $alpha: 0.4);
        }
      }

      &:hover {
        .pic {
          img {
            transform: scale(1.1);
          }
        }
      }
    }
  }

  @keyframes translate-right {
    0% {
      transform: translateX(30px);
    }
    100% {
      transform: translateX(0);
    }
  }
}
</style>
