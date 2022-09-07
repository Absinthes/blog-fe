<template>
  <article class="content">
    <h1 class="tag-name">
      {{ title }}
    </h1>
    <div class="article-box">
      <div v-for="(it, key) in filterArticle" class="article-group-box">
        <p class="time">{{ key }}</p>
        <div class="article-box">
          <div v-for="article in it" class="article-item">
            <img
              :src="imgAddress + article.pic"
              @click="emits('articleClick', article)"
            />
            <div class="info">
              <p
                class="article-title"
                @click.stop="emits('articleClick', article)"
              >
                {{ article.title }}
              </p>
              <div class="tags">
                <span
                  class="tag"
                  v-for="tag in article.tags"
                  @click.stop="emits('tagClick', tag)"
                >
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
import { Article, Tag } from "../../types";

type ArticleListByTimeType = {
  [T in string]: Article[];
};

const props = withDefaults(
  defineProps<{
    title: string;
    articleList: Article[];
    imgAddress?: string;
  }>(),
  {
    imgAddress: import.meta.env.VITE_BASE_IMG_ADDRESS as string,
  }
);

const emits = defineEmits<{
  (e: "articleClick", article: Article): void;
  (e: "tagClick", tag: Tag): void;
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
});
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
        padding: 1rem;
        border-radius: var(--md-radius);
        cursor: pointer;
        transition: box-shadow 0.2s, transform 0.2s;
        &:hover {
          box-shadow: var(--card-shadow);
          transform: scale(1.02);
          .article-title {
            color: var(--theme);
          }
        }
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
        }
        .article-title {
          margin: 0;
          font-weight: 700;
          line-height: 2.5rem;
          font-size: 1.2rem;
          cursor: pointer;
          transition: color 0.3s;
        }
        .tags {
          display: flex;
          font-size: 0.9rem;
          height: 2.5rem;
          line-height: 2.5rem;
          color: #242424;
        }
        .tag {
          margin-right: 10px;
          padding: 0;
          cursor: pointer;
          &:hover {
            color: var(--theme);
            transition: color 0.3s;
          }
        }
        .sign {
          margin-right: 3px;
        }
      }
    }
  }
}
</style>
