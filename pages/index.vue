<template>
  <NuxtLayout name="list-layout">
    <template #header>
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
                <h1 @click="router.push(`/article/${it.id}`)">
                  {{ it.title }}
                </h1>
                <p>
                  <span
                    class="detail"
                    @click="router.push(`/article/${it.id}`)"
                  >
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
    </template>
    <template #default>
      <div class="default" style="">
        <div class="contetn-bar">
          <card hover-border-color="var(--theme)">
            <ContentBar
              v-model:activeMenu="activeMenu"
              :items="menuList"
              @on-more-click="handleMoreClick"
            />
          </card>
        </div>
        <PostItems
          :data="articleData"
          :style="{ height: '12rem' }"
          @article-click="handleArticleClick"
          @tag-click="handleTagClick"
        ></PostItems>
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
import ContentBar from "~~/components/contentBar.vue";
import {
  getArticleByTypeName,
  getArticleList,
  getArticleTop,
  getGroupList,
  getTypeByName,
} from "~~/api";
import type { Article, Group, Type, Pagination, Tag } from "~~/types";
import {
  Navigation,
  Pagination as SwiperPagination,
  EffectCards,
  Autoplay,
} from "swiper";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-cards";
import PostItems from "~~/components/PostItems/index.vue";

definePageMeta({
  keepalive: true,
});

const route = useRoute();
const router = useRouter();
const paginationProps = reactive({
  pageSize: +route.query.limit! || 10,
  currentPage: +route.query.page! || 1,
  total: 0,
});
const articleData = ref<Article[]>([]);
const IMG_ADDRESS = import.meta.env.VITE_BASE_IMG_ADDRESS;

const handleMoreClick = () => {
  console.log("更多");
};

const menuList = ref<Type[]>([]);
const activeMenu = ref<string>("All");

useAsyncData(async () => {
  let nodes = await getTypeByName("Article");
  nodes.childType.unshift({
    name: "All",
    nameEn: "All",
  });
  return nodes.childType;
}).then(({ data }) => {
  menuList.value = data.value;
});

onMounted(() => {
  watchEffect(async () => {
    const { pageSize: limit, currentPage } = paginationProps;
    let data: Pagination<Article>;
    if (activeMenu.value === "All") {
      data = await getArticleList(limit, currentPage);
    } else {
      data = await getArticleByTypeName(activeMenu.value, true);
    }
    paginationProps.total = data.totalCount;
    articleData.value = data.nodes;
  });
});

const unWatch = watch(
  () => [paginationProps.pageSize, paginationProps.currentPage],
  async ([limit, page]) => {
    router.push({
      query: {
        limit: limit,
        page: page,
      },
    });
  }
);

const handlePageChange = (val: number) => {
  paginationProps.currentPage = val;
};

const modules = [Navigation, SwiperPagination, EffectCards, Autoplay];
const bannerArticleList = ref<Article[]>([]);
useAsyncData("articleBanner", () => getArticleTop()).then(({ data }) => {
  bannerArticleList.value = data.value;
});

const groupList = ref<Group[]>([]);
useAsyncData("groupList-2", () => getGroupList(2, 0)).then(({ data }) => {
  groupList.value = data.value.nodes;
});

const handleArticleClick = (articlle:Article) => {
  router.push(`/article/${articlle.id}`)
}

const handleTagClick = (tag:Tag) => {
  router.push(`/tags/${tag.name}`)
}
</script>

<style scoped lang="scss">
.default {
  .content-bar {
    width: 100%;
    display: flex;
  }
}

.swiper-box {
  margin-bottom: 1rem;
  & :deep(.swiper-button-prev) {
    color: inherit;
  }

  & :deep(.swiper-button-next) {
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
