<template>
  <NuxtLayout>
    <div class="container">
      <Card style="margin-right: 1rem">
        <div class="tag">
          <aside class="tags-box">
            <div
              class="tags-item"
              v-for="(it, i) in tagList" 
              :key="it.id"
              @click="tagClick(it)"
              :class="{ active: currentTag?.name == it?.name }"
            >
              <span class="label">#</span>
              <span class="title">{{ it?.name }}</span>
              <span class="num">{{ it.articles.length }}</span>
            </div>
          </aside>
          <ArticleList
            v-if="articleList"
            :title="currentTag?.name"
            :articleList="articleList"
            :imgAddress="IMG_ADDRESS"
            @tagClick="tagClick"
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
import { getAllTag, getArticleByTagId } from "~~/api";
import { Article, Tag } from "~~/types";
import TagNav from "~~/components/home/tagNav.vue";

definePageMeta({
  keepalive: false,
});

const duration = 0.3
const route = useRoute();
const router = useRouter();
const queryParams = reactive({
  pageSize: 10,
  currentPage: 1,
  pageNumber: 0,
  total: 0,
});

const IMG_ADDRESS = import.meta.env.VITE_BASE_IMG_ADDRESS as string;
const tagList = ref<Tag[]>([]);
const articleList = ref<Article[]>();
const currentTag = ref<Tag>();

useAsyncData(() => getAllTag("Article"))
  .then(({ data }) => {
    tagList.value = data.value;
    currentTag.value = tagList.value.find((it) => {
      const res = it.name.trim() == (route.params.name as string).trim();
      return res;
    });
    return useAsyncData(`articleList.${currentTag.value.name}`, async () => {
      const { pageSize: limit, currentPage } = queryParams;
      let { nodes, totalCount } = await getArticleByTagId(
        currentTag.value.id,
        limit,
        limit * (currentPage - 1)
      );
      queryParams.total = totalCount;
      queryParams.pageNumber = Math.ceil(totalCount / queryParams.pageSize);
      return nodes;
    });
  })
  .then(({ data }) => {
    articleList.value = data.value;
  });

const tagClick = async (tag: Tag) => {
  currentTag.value = tag;
  router.push(`/tags/${tag.name}`);
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
}
.tag {
  padding: 1.5rem 1.5rem;
  color: var(--font-color);
}
.tags-box {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  color: var(--font-color);
  .tags-item {
    padding: 5px 10px;
    border: 1px solid var(--card-border);
    border-radius: var(--normal-radius);
    margin-right: 15px;
    margin-bottom: 10px;
    cursor: pointer;
    transition: border-color 0.3s, background-color 0.3s, color 0.3s,
      transform 0.3s;
    &.active {
      border-color: var(--theme);
      background-color: var(--theme);
      color: var(--white);
      & .num {
        background-color: var(--card-bg);
        color: var(--theme);
      }
    }

    &:hover {
      border-color: var(--theme);
      background-color: var(--theme);
      color: var(--white);
      transform: scale(1.1);
      & .num {
        background-color: var(--card-bg);
        color: var(--theme);
      }
    }
    .label {
      opacity: 0.4;
    }
    .title {
      margin-right: 4px;
    }
    .num {
      display: inline-block;
      padding: 1px 0px;
      text-align: center;
      min-width: 22px;
      font-size: 0.9rem;
      background-color: var(--secondbg);
      border-radius: 4px;
      transition: background-color 0.3s, color 0.3s;
    }
  }
}

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
        }
        .sign {
          margin-right: 3px;
        }
      }
    }
  }
}

.aside-box {
  position: sticky;
  top: 0;
  width: 300px;
}

.pagination {
  margin-top: 1rem;
}
</style>
