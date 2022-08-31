<template>
  <NuxtLayout>
    <div class="container">
      <Card style="margin-right: 1rem">
        <div class="tag">
          <aside class="tags-box">
            <div
              class="tags-item"
              v-for="it in tagList"
              @click="tagClick(it)"
              :class="{ active: currentTag.name == it.name }"
            >
              <span class="label">#</span>
              <span class="title">{{ it.name }}</span>
              <span class="num">{{ it.articles.length }}</span>
            </div>
          </aside>
          <!-- <article class="content">
            <h1 class="tag-name">{{ currentTag.name }}</h1>
            <div class="article-box">
              <div v-for="(it, key) in articleList" class="article-group-box">
                <p class="time">{{ key }}</p>
                <div class="article-box">
                  <div v-for="ele in it" class="article-item">
                    <img
                      :src="IMG_ADDRESS + ele.pic"
                      :alt="IMG_ADDRESS + ele.pic"
                    />
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
          </article> -->
          <ArticleList
            :title="currentTag.name"
            :articleList="articleList"
            :imgAddress="IMG_ADDRESS"
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
import { Tag } from "~~/types";
import TagNav from "~~/components/home/tagNav.vue";

definePageMeta({
  keepalive: false,
});

const route = useRoute();
const router = useRouter();
const queryParams = reactive({
  pageSize: 10,
  currentPage: 1,
  pageNumber: 0,
  total: 0,
});

const IMG_ADDRESS = import.meta.env.VITE_BASE_IMG_ADDRESS as string;

const { data: tagList } = await useAsyncData(() => getAllTag(1));
const currentTag = ref<Tag>(
  tagList.value.find((it) => it?.name === route.params.name)
);

const { data: articleList, refresh: articleRefresh } = await useAsyncData(
  "article",
  async () => {
    let { nodes, totalCount } = await getArticleByTagId(currentTag.value.id);
    queryParams.total = totalCount;
    queryParams.pageNumber = Math.ceil(totalCount / queryParams.pageSize);
    return nodes;
  }
);

const tagClick = async (tag: Tag) => {
  currentTag.value = tag;
  await articleRefresh();
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
  color: var(--font-color);
  .tags-item {
    padding: 5px 10px;
    border: 1px solid var(--card-border);
    border-radius: var(--normal-radius);
    margin-right: 7px;
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
