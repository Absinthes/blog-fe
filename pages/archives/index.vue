<template>
  <NuxtLayout>
    <div class="container">
      <Card style="margin-right: 1rem">
        <div class="article-list-box">
          <ArticleList
            :title="`文章 - ${queryParams.total}`"
            :article-list="articleList"
            @tag-click="router.push(`/tags/${$event.name}`)"
          />
          <nav class="pagination">
            <Pagination v-bind="queryParams" />
          </nav>
        </div>
      </Card>
      <div class="aside-box">
        <TagNav />
      </div>
    </div>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import { getArticleList } from "~~/api";
import TagNav from "~~/components/home/tagNav.vue";

const router = useRouter();

const queryParams = ref({
  pageSize: 20,
  currentPage: 1,
  pageNumber: 0,
  total: 0,
});

const { data: articleList, refresh: refreshArticleList } = await useAsyncData(
  async () => {
    const { pageSize: limit, currentPage } = queryParams.value;
    const { nodes, totalCount } = await getArticleList(
      limit,
      limit * (currentPage - 1)
    );
    queryParams.value.total = totalCount;
    queryParams.value.pageNumber = Math.ceil(totalCount / limit)
    return nodes;
  }
);
</script>

<style lang="scss" scoped>
.container {
  display: flex;
}
.article-list-box {
  padding: 1.5rem 1.5rem;
}
.pagination {
  margin-top: 1rem;
}
.aside-box {
  position: sticky;
  top: 0;
  width: 300px;
}
</style>
