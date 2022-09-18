<template>
  <NuxtLayout>
    <header class="header-box">
      <div class="header">
        <div class="hint-box">
          <h1 class="hint-title">DisCover Nice Articles Here</h1>
          <p class="hint-detail">
            All The Articles And Contents Of The Site Have Been
            <b>Updated Today</b> And You Can Find Your
            <b>Articles And Contents</b> Quickly And Without Any Problems.
          </p>
          <div class="link"></div>
        </div>
        <div class="searchAndMenu">
          <div class="search-box">
            <i class="iconfont icon-sousuo1"></i>
            <input type="text" placeholder="Search..." />
          </div>
          <div class="menu-box" @wheel.prevent="handleWheel" ref="menuBox">
            <div
              class="menu-item"
              v-for="menu in menuList"
              :class="{ active: currentClassify === menu.name }"
              @click="menuClick(menu)"
            >
              {{ menu.name }}
            </div>
          </div>
        </div>
      </div>
    </header>
    <nav class="nav-box">
      <swiper
        class="swiper"
        :modules="modules"
        :speed="600"
        :autoplay="{
          delay: 2500,
          disableOnInteraction: false,
        }"
        :pagination="{
          clickable: true,
        }"
        :space-between="20"
        loop
      >
        <swiper-slide v-for="it in bannerArticleList">
          <div class="swiper-item">
            <img class="swiper-bg" :src="IMG_ADDRESS + it.pic" alt="" />
            <article class="swiper-item-content">
              <div class="author-box">
                <img
                  src="/public/崩坏星穹铁道 黑塔 - QuAn_的插画small.jpg"
                  alt=""
                />
                <span>Absinthe.</span>
              </div>
              <h1>{{ it.title }}</h1>
              <p>
                <span class="detail">
                  {{ it.summary }}
                  <span v-if="it.summary?.length > 30">...</span></span
                >
                <NuxtLink :to="`/article/${it.id}`" class="readMore"
                  >Read More</NuxtLink
                >
              </p>
            </article>
          </div>
        </swiper-slide>
      </swiper>
    </nav>
    <article class="content">
      <ClassifyList :article-list="articleList" @article-click="articleClick" />
    </article>
    <nav class="pagination">
      <!-- <Pagination v-bind="queryParams" @page-change="pageChange" /> -->
      <div
        class="loadMore"
        :class="{
          hide:
            queryParams.pageSize * queryParams.currentPage >= queryParams.total,
        }"
        @click="handlePageChange"
      >
        More
      </div>
    </nav>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import { Navigation, Pagination as SwiperPagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import {
  getArticleByTypeName,
  getArticleList,
  getArticleTop,
  getType,
  getTypeByName,
} from "~~/api";
import type { Article, Pagination, Type } from "~~/types";

const route = useRoute();
const router = useRouter();
const currentClassify = ref(route.params.name);
const modules = [Navigation, SwiperPagination];
const IMG_ADDRESS = import.meta.env.VITE_BASE_IMG_ADDRESS;

const queryParams = reactive({
  pageSize: 12,
  currentPage: 1,
  pageNumber: 0,
  total: 0,
});
const menuBox = ref();
const menuList = ref<Type[]>();
const bannerArticleList = ref<Article[]>([]);

useAsyncData(async () => {
  let nodes = await getTypeByName("Article");
  nodes.childType.unshift({
    name: "All",
  });
  return nodes.childType;
}).then(({ data }) => {
  menuList.value = data.value;
});

useAsyncData("articleBanner", () => getArticleTop()).then(({ data }) => {
  bannerArticleList.value = data.value;
});

const articleList = ref<Article[]>([]);
let articleListRefresh;
// useAsyncData(`article.type.${route.params.name as string}`, async () => {
//   const { pageSize: limit, currentPage } = queryParams;
//   if (currentClassify.value === "All") {
//     return await getArticleList(limit, currentPage);
//   }
//   return await getArticleByTypeName(route.params.name as string, true);
// }).then(({ data, refresh }) => {
//   const { pageSize: limit, currentPage } = queryParams;
//   queryParams.total = data.value.totalCount;
//   queryParams.pageNumber = Math.ceil(data.value.totalCount / limit);
//   articleList.value = data.value.nodes;
//   articleListRefresh = refresh;
// });

onMounted(() => {
  watchEffect(async () => {
    const { pageSize: limit, currentPage } = queryParams;
    let data: Pagination<Article>;
    if (currentClassify.value === "All") {
      data = await getArticleList(limit, currentPage);
    } else {
      data = await getArticleByTypeName(route.params.name as string, true);
    }
    queryParams.total = data.totalCount;
    queryParams.pageNumber = Math.ceil(data.totalCount / limit);
    articleList.value.push(...data.nodes)
  });
});

const handleWheel = (event) => {
  menuBox.value.scrollLeft += event.deltaY;
};
const menuClick = (menu: Type) => {
  router.push(`/classify/${menu.name}`);
};
const articleClick = (article: Article) => {
  router.push(`/article/${article.id}`);
};
const handlePageChange = () => {
  queryParams.currentPage = queryParams.currentPage + 1;
};
</script>

<style lang="scss" scoped>
.header-box {
  position: relative;
  margin-top: 20px;
  color: var(--font-color);
  border-top: 2px solid var(--border-color);
  border-bottom: 2px solid var(--border-color);
  animation: translateY-top 1s;
  &::after {
    content: "Articles";
    position: absolute;
    bottom: -1ex;
    left: 50%;
    transform: translateX(-50%);
    display: block;
    padding: 0px 3rem;
    text-align: center;
    color: var(--font-color);
    font-weight: 700;
    font-size: 1.4rem;
    background-color: var(--bg-color);
  }
  .header {
    border: 2px solid var(--border-color);
    padding: 3rem 3rem;
    clip-path: inset(2.3rem 0);
  }
}
.hint-box {
  .hint-title {
    margin-top: 0;
    font-size: 2.2rem;
  }
  .hint-detail {
    width: 55%;
    line-height: 2rem;
    color: var(--font-thin-color);
    b {
      color: #12153d;
    }
  }
}
.searchAndMenu {
  display: flex;
  align-items: center;
  margin-top: 2rem;
  .search-box {
    display: flex;
    flex: 3;
    padding: 13px 15px;
    border-radius: 2rem;
    background-color: #eff0f8;
    .iconfont {
      margin-right: 0.75rem;
      color: var(--font-color);
      font-size: 1.2rem;
      font-weight: 700;
    }
    input {
      width: 100%;
      display: block;
      outline: none;
      border: none;
      background-color: transparent;
    }
  }
  .menu-box {
    flex: 7;
    max-width: 70%;
    margin-left: 2rem;
    white-space: nowrap;
    overflow: hidden;
    .menu-item {
      display: inline-block;
      padding: 13px 1rem;
      margin: 0 10px;
      border-radius: 2rem;
      cursor: pointer;
      transition: color 0.3s, background-color 0.3s;
      &.active {
        color: white;
        background-color: var(--font-color);
      }
    }
  }
}
.nav-box {
  margin-top: 40px;
  width: 100%;
  height: 400px;
  overflow: hidden;
  border-radius: 2.5rem;
  animation: translateX-left 1s;
  .swiper {
    position: relative;
    height: 100%;
    color: var(--font-color);
    &:deep(.swiper-pagination-bullet) {
      border: 1px solid var(--font-color);
      background-color: transparent;
      opacity: 1;
      transition: transform 0.3s;
    }
    &:deep(.swiper-pagination-bullet-active) {
      transform: scale(1.3);
      background-color: var(--font-color);
    }
    .swiper-item {
      cursor: grab;
      .swiper-bg {
        position: absolute;
        width: 100%;
        height: 100%;
        opacity: 0.8;
        object-fit: cover;
      }
      .swiper-item-content {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 70%;
        text-align: center;
        transform: translate(-50%, -50%);
        .author-box {
          display: inline-flex;
          align-items: center;
          padding: 10px 15px;
          margin-top: 4rem;
          background-color: var(--card-bg);
          border-radius: 2rem;
          box-shadow: var(--card-shadow);
          img {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            margin-right: 10px;
          }
          span {
            color: var(--font-color);
            font-weight: 600;
            opacity: 0.7;
          }
        }
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
}
.content {
  margin-top: 2rem;
}
.pagination {
  margin-top: 2rem;
}
.loadMore {
  padding: 1rem 0;
  text-align: center;
  border: 1px solid var(--card-border);
  box-shadow: var(--card-shadow);
  border-radius: 10px;
  background: linear-gradient(var(--theme) 0 0) no-repeat;
  background-size: var(--p, 0%);
  background-position: calc(100% - var(--p, 0%));
  transition: 0.4s, background-position 0s;
  cursor: pointer;
  &:hover {
    --p: 100%;
    color: var(--white);
    border-color: var(--theme);
  }
  &.hide {
    opacity: 0;
    cursor: initial;
    pointer-events: none;
  }
}
</style>
