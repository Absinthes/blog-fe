<template>
  <article class="content">
    <h1 class="tag-name">{{ title }}</h1>
    <div class="article-box">
      <div v-for="(it, key) in filterArticle" class="article-group-box">
        <p class="time">{{ key }}</p>
        <div class="article-box">
          <div v-for="ele in it" class="article-item">
            <img :src="imgAddress + ele.pic" :alt="imgAddress + ele.pic" />
            <div class="info">
              <p class="article-title">{{ ele.title }}</p>
              <div v-for="tag in ele.tags" class="tags">
                <span class="tag">
                  <span class="sign">#</span>
                  <span>{{ tag.name }}</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </article>
</template>

<script lang="ts" setup>
import { computed } from "@vue/reactivity";
import { Article } from "../../types";

type ArticleListByTimeType = {
  [T in string]: Article[];
};

const props = defineProps<{
  title: string;
  articleList: Article[];
  imgAddress: string;
}>();

const filterArticle = computed(() => {
  let res: ArticleListByTimeType = {};
  props.articleList.forEach((it) => {
    const year = new Date(+it.createTime).getFullYear();
    if (year in res) {
      res[year].push(it);
    } else {
      res[year] = [it];
    }
  });
  return res;
})

</script>

<style lang="scss" scoped>
.content {
  .article-box {
    .article-group-box {
      margin: 5px 0;
      .time {
        color: #c3c3c3;
      }
      .article-item {
        display: flex;
        img {
          width: 150px;
          height: 90px;
          object-fit: cover;
          border-radius: var(--xl-radius);
          cursor: pointer;
        }
        .info {
          display: flex;
          flex-direction: column;
          justify-content: center;
          margin-left: 1rem;
          cursor: pointer;
        }
        .article-title {
          margin: 0;
          font-weight: 700;
          line-height: 2.5rem;
          font-size: 1.2rem;
        }
        .tags {
          display: flex;
          font-size: 0.9rem;
          line-height: 2.5rem;
          color: #242424;
        }
        .tag {
          margin-right: 10px;
          padding: 0;
          cursor: pointer;
        }
        .sign {
          margin-right: 3px;
        }
      }
    }
  }
}
</style>
