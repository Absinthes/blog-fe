<template>
  <NuxtLayout>
    <div class="container">
      <header>
        <h2>文章归档</h2>
        <p>和时间交手，也和时间交朋友</p>
      </header>
      <article>
        <template v-for="item in data">
          <h5>
            <a :href="`#${item.year}`">{{ item.year }}</a>
          </h5>
          <ul>
            <li class="wrapper" v-for="i in item.data">
              <h5>
                {{ `${item.year}${i.month > 10 ? i.month : "0" + i.month}` }}
              </h5>
              <PostItems
                :data="i.data"
                :style="{ height: '12rem' }"
                :size="3"
                :duration="1"
                @article-click="handleArticleClick"
                @tag-click="handleTagClick"
              ></PostItems>
            </li>
          </ul>
        </template>
      </article>
    </div>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import { statisticsArticleByMonth } from "~~/api/statistics";
import { Article, StatisticsArticleByMonth, Tag } from "~~/types";
import PostItems from "~~/components/PostItems/index.vue";

const data = ref<StatisticsArticleByMonth[]>([]);
const router = useRouter();

useAsyncData(() => statisticsArticleByMonth()).then(({ data: d }) => {
  data.value = d.value;
});

const handleArticleClick = (articlle: Article) => {
  router.push(`/article/${articlle.id}`);
};

const handleTagClick = (tag: Tag) => {
  router.push(`/tags/${tag.name}`);
};
</script>

<style lang="scss" scoped>
.container {
  header {
    animation: opacity-transition 1.5s forwards, translate-left 1.5s forwards;
    transition: opacity 1.5s, transform 1.5s;
    h2 {
      font-family: "阿里妈妈数黑体",Microsoft YaHei;
    }
  }
  article {
    h5,
    ul li h5 {
      height: 2rem;
      width: 4rem;
      background: linear-gradient(135deg, rgb(238 77 80), rgb(251 145 104));
      border-radius: 10px;
      color: white;
      text-align: center;
      line-height: 2rem;
      padding: 0.5rem;
      box-shadow: var(--card-shadow);
    }
    h5 {
      position: sticky;
      top: 5rem;
      animation: opacity-transition 1.5s forwards, translate-left 1.5s forwards;
      transition: opacity 1.5s, transform 1.5s;
    }
    ul {
      list-style: none;
      padding-left: 0;
      li.wrapper {
        display: flex;
        position: relative;
        &::before {
          content: "";
          height: 100%;
          background: rgb(238 77 80);
          position: absolute;
          left: 2.5rem;
          top: 0;
          width: 2px;
          animation: opacity-transition 1.5s forwards,
            translate-left 1.5s forwards;
          transition: opacity 1.5s, transform 1.5s;
          z-index: -1;
        }
        &:last-of-type {
          &::before {
            display: none;
          }
        }
        h5 {
          position: sticky;
          top: 9rem;
          flex: 0 0 4rem;
          margin-right: 1rem;
          margin-top: 0rem;
          animation: opacity-transition 1s forwards,
            translate-left 1.5s forwards;
          transition: opacity 1s, transform 1.5s;
        }
      }
    }
  }
}
</style>
