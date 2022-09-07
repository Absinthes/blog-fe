<template>
  <card hover-border-color="var(--theme)">
    <div class="post">
      <div class="left" @click="emits('articleClick', article)">
        <img :src="imgAddress + article.pic" alt="" />
      </div>
      <div class="right">
        <div class="title">
          <h3>{{ article.title }}</h3>
        </div>
        <p class="ellipsis-2 summary">{{article.summary}}</p>
        <div class="meta">
          <div class="tags" ref="tagsRef" @wheel.prevent="handleWheel">
            <div
              class="tag"
              v-for="tag in article.tags"
              @click="emits('tagClick', tag)"
            >
              <span>#</span>{{ tag.name }}
            </div>
          </div>
          <div class="time">
            {{ dayjs(+article.createTime).format("YYYY/MM/DD") }}
          </div>
        </div>
      </div>
    </div>
  </card>
</template>

<script setup lang="ts">
import { Article, Tag } from "~~/types";
import dayjs from "dayjs";

const { article } = withDefaults(
  defineProps<{
    article: Article;
    imgAddress?: string;
  }>(),
  {
    imgAddress: import.meta.env.VITE_BASE_IMG_ADDRESS as string,
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
      h3{
        margin-top: 0;
      }
    }
    .summary{
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
        text-overflow:ellipsis;
        white-space: nowrap;
        .tag {
          display: inline-block;
          margin-right: 0.5rem;
          cursor: pointer;
          &:hover {
            color: var(--theme);
          }
          span {
            color: var(--font-thin-deep-color);
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
