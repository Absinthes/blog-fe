<template>
  <NuxtLayout name="list-layout">
    <template #aside>
      <div class="aside">
        <TagNav />
      </div>
    </template>
    <template #default>
      <nav class="swiper-box">
        <swiper
          class="swiper"
          :modules="modules"
          :effect="'cards'"
          :speed="600"
          :autoplay="true"
          :pagination="{
            clickable: true,
          }"
          :navigation="true"
          :space-between="20"
          loop
        >
          <swiper-slide v-for="it in bannerArticleList">
            <div class="swiper-item">
              <img class="swiper-bg" :src="IMG_ADDRESS + it.pic" alt="" />
              <article class="swiper-item-content">
                <h1 @click="router.push(`/article/${it.id}`)">{{ it.title }}</h1>
                <p>
                  <span class="detail" @click="router.push(`/article/${it.id}`)">
                    {{ it.summary }}
                  </span>
                </p>
              </article>
            </div>
          </swiper-slide>
        </swiper>
      </nav>
      <div class="groupList-box">
        <GroupItem v-for="group in groupList" :group="group" :len="5" />
      </div>
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
            <post-item
              :article="article"
              @article-click="router.push(`/article/${$event.id}`)"
              @tag-click="router.push(`/tags/${$event.name}`)"
            >
            </post-item>
          </div>
        </div>
        <nav id="pagination">
          <Pagination
            v-bind="paginationProps"
            :page-number="
              Math.ceil(paginationProps.total / paginationProps.pageSize)
            "
            @page-change="handlePageChange"
          />
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
import { getArticleList, getArticleTop, getGroupList } from "~~/api";
import { Article, Group } from "~~/types";
import {
  Navigation,
  Pagination as SwiperPagination,
  EffectCards,
} from "swiper";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-cards";

definePageMeta({
  keepalive: true
})

const route = useRoute();
const router = useRouter();
const paginationProps = reactive({
  pageSize: +route.query.limit! || 10,
  currentPage: +route.query.page! || 1,
  total: 0,
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
const articleData = ref<Article[]>([]);
const IMG_ADDRESS = import.meta.env.VITE_BASE_IMG_ADDRESS;

const handleMoreClick = () => {
  console.log("更多");
};

let articleRefe;

useAsyncData("articleList", async () => {
  let articleList = await getArticleList(
    paginationProps.pageSize,
    paginationProps.currentPage
  );
  articleData.value = articleList.nodes;
  return articleList;
}).then(({ data, refresh }) => {
  articleRefe = refresh;
  articleData.value = data.value.nodes;
  paginationProps.total = data.value.totalCount;
});

const unWatch = watch(
  () => [paginationProps.pageSize, paginationProps.currentPage],
  async ([limit, page]) => {
    articleRefe && (await articleRefe());
    router.push({
      query: {
        limit: limit,
        page: page,
      },
    });
  }
);

watch(route, () => {
  console.log(route);
  console.log(paginationProps);
});

const handlePageChange = (val: number) => {
  paginationProps.currentPage = val;
};

const modules = [Navigation, SwiperPagination, EffectCards];
const bannerArticleList = ref<Article[]>([]);
useAsyncData("articleBanner", () => getArticleTop()).then(({ data }) => {
  bannerArticleList.value = data.value;
});

const groupList = ref<Group[]>([]);
useAsyncData("groupList-2", () => getGroupList(2, 0)).then(({ data }) => {
  groupList.value = data.value.nodes;
});
</script>

<style scoped lang="scss">
.default {
  .content-bar {
    width: 100%;
    display: flex;
  }
  .post-items {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    margin-top: 0.5rem;
    grid-column-gap: 1rem;
    .new {
      grid-column-start: 1;
      grid-column-end: 3;
    }
    .post-item {
      height: 12rem;
      margin-bottom: 1rem;
    }
  }
}

.swiper-box {
  margin-bottom: 1rem;
  & :deep(.swiper-button-prev){
    color: inherit;
  }

  & :deep(.swiper-button-next){
    color: inherit;
  }
}

.swiper {
  position: relative;
  height: 500px;
  border-radius: 1rem;
  color: rgb(255, 255, 255);
  overflow: hidden;
  &:deep(.swiper-pagination-bullet) {
    border-color: transparent;
    background-color: rgba($color: #fff, $alpha: 0.7);
    transition: transform 0.3s, background 0.3s;
    box-shadow: 0 0 7px 0 rgba($color: #fff, $alpha: 0.7);
  }
  &:deep(.swiper-pagination-bullet-active) {
    transform: scale(1.3);
    background-color: rgba($color: #fff, $alpha: 1);
  }
  .swiper-item {
    .swiper-bg {
      position: absolute;
      left: 0;
      right: 0;
      margin: 0 auto;
      width: 100%;
      height: 100%;
      border-radius: 1rem;
      object-fit: cover;
      z-index: 1;
      filter: brightness(0.8);
    }
    .swiper-item-content {
      position: absolute;
      bottom: 0;
      left: 50%;
      width: 70%;
      text-align: center;
      transform: translate(-50%, -50%);
      z-index: 3;
      h1 {
        cursor: pointer;
      }
      .detail {
        line-height: 2rem;
        font-weight: 700;
        opacity: 0.6;
        cursor: pointer;
      }
      .readMore {
        margin-left: 5px;
        border-bottom: 2px solid var(--font-color);
        font-weight: 700;
        cursor: pointer;
      }
    }
  }
}
.aside {
  width: 100%;
  height: 100%;
  padding-left: 0.5rem;
}
#pagination {
  margin-top: 1rem;
}

.groupList-box {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin-bottom: 1rem;
  grid-column-gap: 1rem;
}
</style>
