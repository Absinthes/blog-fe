<template>
  <card hover-border-color="var(--theme)">
    <div class="post">
      <div class="left" @click="emits('articleClick', data)">
        <img :src="imgAddress + data.pic" alt="" />
      </div>
      <div class="right">
        <div class="title" @click="emits('articleClick', data)">
          <h3>{{ data.title }}</h3>
        </div>
        <p class="ellipsis-2 summary">{{ data.summary }}</p>
        <div class="meta">
          <div class="tags" ref="tagsRef" @wheel.prevent="handleWheel">
            <div
              class="tag"
              v-for="tag in data.tags"
              @click.stop="emits('tagClick', tag)"
            >
              <span>#</span>{{ tag.name }}
            </div>
          </div>
          <div class="time">
            <span v-if="dateMode === 'time'">
              <i class="iconfont icon-icon"></i>
              {{ dayjs(+data.createTime).format("YYYY/MM/DD") }}
            </span>
            <span v-else>
              {{
                dayjs(+data.createTime)
                  .fromNow()
                  .replace(/\s/g, "")
              }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </card>
</template>

<script setup lang="ts">
import { Article, Tag } from "~~/types";
import relativeTime from "dayjs/plugin/relativeTime.js";
import zhCN from "dayjs/locale/zh-cn.js";
import dayjs from "dayjs";
dayjs.locale(zhCN);
dayjs.extend(relativeTime);

type DateMode = "time" | "text";

const props = withDefaults(
  defineProps<{
    data: Article;
    imgAddress?: string;
    dateMode?: DateMode;
  }>(),
  {
    imgAddress: import.meta.env.VITE_BASE_IMG_ADDRESS as string,
    dateMode: "time",
  }
);
const emits = defineEmits<{
  (e: "articleClick", article: Article);
  (e: "tagClick", tag: Tag);
}>();
const tagsRef = ref();
const handleWheel = (event) => {
  tagsRef.value.scrollLeft += event.deltaY;
};
</script>

<style scoped lang="scss">
.post {
  display: flex;
  height: 100%;
  width: 100%;
  border-radius: 12px;
  overflow: hidden;
  &:hover {
    .left {
      cursor: pointer;
      img {
        transform: scale(1.1);
      }
    }
  }
  .left {
    height: 100%;
    width: 45%;
    overflow: hidden;
    box-sizing: border-box;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s;
    }
  }
  .right {
    width: 55%;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0 5%;
    .title {
      cursor: pointer;
      h3 {
        margin-top: 0;
        font-family: var(--font-title), MiSans, PingFang SC, Microsoft YaHei,
          sans-serif;
      }
    }
    .summary {
      margin-top: 0;
      margin-bottom: 10px;
      height: 3rem;
      line-height: 1.5rem;
      font-size: 0.8rem;
      color: var(--font-thin-color);
    }
    .meta {
      display: flex;
      justify-content: space-between;
      font-size: 0.9rem;
      .tags {
        max-width: 75%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        .tag {
          display: inline-block;
          margin-right: 0.5rem;
          color: var(--font-thin-color);
          cursor: pointer;
          &:hover {
            color: var(--theme);
          }
          span {
            color: currentColor;
          }
        }
      }
      .time {
        opacity: 0.4;
        cursor: default;
      }
    }
  }
}
</style>
