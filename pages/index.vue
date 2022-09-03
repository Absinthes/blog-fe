<template>
  <NuxtLayout name="list-layout">
    <template #aside>
      <div class="aside">
        <TagNav />
      </div>
    </template>
    <template #default>
      <div class="default">
        <div class="contetn-bar">
          <card hover-border-color="var(--theme)">
            <ContentBar
              :items="contentNavData"
              @on-more-click="handleMoreClick"
            />
          </card>
        </div>
        <div class="post-items">
          <!-- <div class="post-item new" v-for="article in articleData"> -->
            <!-- <post-item ></post-item> -->
          <!-- </div> -->
          <div class="post-item" v-for="article in articleData">
            <post-item :article="article"> </post-item>
          </div>
        </div>
        <nav id="pagination">
          <Pagination v-bind="paginationProps" />
        </nav>
      </div>
    </template>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { RouteLocationRaw } from "vue-router";
import ContentBar from "~~/components/contentBar.vue";
import TagNav from "~~/components/home/tagNav.vue";
import postItem from "~~/components/home/postItem.vue";
import { getAllTag_hone, getArticleList } from "~~/api";
import { Article } from "~~/types";
const paginationProps = reactive({
  pageSize: 10,
  currentPage: 1,
  total:10,
});
const contentNavData = ref<
  {
    name: string;
    to?: RouteLocationRaw;
  }[]
>([
  {
    name: "首页",
  },
  {
    name: "我的项目",
  },
  {
    name: "经验分享",
  },
  {
    name: "生活日常",
  },
  {
    name: "生活日常",
  },
  {
    name: "生活日常",
  },
  {
    name: "生活日常",
  },
  {
    name: "生活日常",
  },
  {
    name: "生活日常",
  },
  {
    name: "生活日常",
  },
  {
    name: "生活日常",
  },
  {
    name: "生活日常",
  },
  {
    name: "生活日常",
  },
  {
    name: "生活日常",
  },
  {
    name: "生活日常",
  },
  {
    name: "生活日常",
  },
  {
    name: "生活日常",
  },
  {
    name: "生活日常",
  },
  {
    name: "生活日常",
  },
]);
const articleData = ref<Article[]>([])

const handleMoreClick = () => {
  console.log("更多");
};

const getArticle = async () => {
  //获取文章列表
  const { data: articleList } = await useAsyncData("articleList", () =>
    getArticleList(paginationProps.pageSize, paginationProps.currentPage)
  );
  articleData.value = articleList.value.nodes
  console.log(articleData.value)
  paginationProps.total = articleList.value.totalCount
}

const getData = async () => {
  getArticle()
};



getData()
</script>

<style scoped lang="scss">
.default {
  padding-right: 0.5rem;
  .content-bar {
    width: 100%;
    display: flex;
  }
  .post-items {
    display: grid;
    grid-template-columns: 50% 50%;
    margin-top: 0.5rem;
    grid-column-gap: 0.5rem;
    .new {
      grid-column-start: 1;
      grid-column-end: 3;
    }
    .post-item {
      height: 12rem;
      margin-bottom: 0.5rem;
    }
  }
}

.aside {
  width: 100%;
  height: 100%;
  padding-left: 0.5rem;
}
</style>
