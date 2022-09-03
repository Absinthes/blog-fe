<template>
  <div class="tag-nav">
    <card class="tag-nav-wrapper">
      <div class="top">
        <div class="tag" v-for="tag in tags">
          {{ tag.name }}
          <span>5</span>
        </div>
      </div>
      <hr />
      <div class="center">
        <div class="year-statistics">
          <div class="year">2022</div>
          <div class="number">76<span>篇</span></div>
        </div>
        <div class="year-statistics">
          <div class="year">2022</div>
          <div class="number">76<span>篇</span></div>
        </div>
        <div class="year-statistics">
          <div class="year">2022</div>
          <div class="number">76<span>篇</span></div>
        </div>
        <div class="year-statistics">
          <div class="year">2022</div>
          <div class="number">76<span>篇</span></div>
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
  </div>
</template>

<script setup lang="ts">
import { getAllTag_hone } from "~~/api";
import { Tag } from "~~/types";
const tags = ref<Tag[]>([]);

const getTags = async () => {
  const { data } = await useAsyncData("all_tags", () => getAllTag_hone());
  tags.value = data.value;
};

const getData = async () => {
  getTags();
};

getData()
</script>

<style lang="scss" scoped>
.tag-nav {
  position: sticky;
  top: 70px;
  .tag-nav-wrapper {
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
      justify-content: space-around;
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
}
</style>
