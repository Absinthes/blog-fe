<template>
  <div class="comment">
    <Card class="card" v-for="item in data" :key="item.id">
      <div class="main">
        <CommentItem
          :data="item"
          @handle-dian-zan="handleDianzan"
          @confirm="handleEditConfirm"
        />
      </div>
      <div class="aside">
        <p>COMMENT</p>
        <p>{{ item.id }}</p>
      </div>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { Comment, EditForm } from "~~/types";
import CommentItem from "./item.vue";

const props = withDefaults(
  defineProps<{
    data: Comment[];
  }>(),
  {
    data: [],
  }
);

const emit = defineEmits<{
  (e: "handleDianZan", b: boolean, data: Comment): void;
  (e: "confirm", form: EditForm, reset: () => void, rootComment: Comment,parentComment:Comment): void;
}>();

const handleDianzan = (b: boolean, data: Comment) => {
  emit("handleDianZan", b, data);
};

const handleEditConfirm = (
  form: EditForm,
  reset: () => void,
  rootComment: Comment,
  parentComment:Comment
) => {
  emit("confirm", form, reset, rootComment,parentComment);
};
</script>

<style scoped lang="scss">
.comment {
  margin-top: 2rem;
  .card {
    display: flex;
    justify-content: space-between;
    background: rgba($color: #000000, $alpha: 0.025);
    margin-bottom: 1rem;
    transition: background 0.3s;
    border: none;
    box-shadow: var(--card-shadow);
    padding: 1rem 1.5rem;
    box-sizing: border-box;
    &:hover {
      background: white;
      ::v-deep .wrapper {
        .comment-content {
          background: rgba($color: #000000, $alpha: 0.015);
        }
      }
    }
    .main {
      width: 100%;
      padding-right: 2rem;
      box-sizing: border-box;
    }
    .aside {
      writing-mode: tb-rl;
      color: rgba($color: #000000, $alpha: 0.2);
      font-size: 0.8rem;
      line-height: 0.8rem;
      height: 6rem;
      p {
        overflow: hidden;
        white-space: nowrap;
      }
    }
  }
}
</style>
