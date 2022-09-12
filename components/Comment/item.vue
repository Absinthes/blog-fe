<template>
  <div class="wrapper" :class="{ children: isChildren }">
    <footer>
      <div class="left">
        <img
          :src="imgSrc"
          alt=""
        />
        <span class="name">{{ props.data.name }}</span>
        <span class="time">{{ props.data.createTime }}</span>
      </div>
      <div class="right">
        <i
          class="iconfont icon-dianzan1"
          v-if="!isDianZan"
          @click="handleDianzan(true)"
        ></i>
        <i
          class="iconfont icon-dianzan-tianchong"
          v-else
          @click="handleDianzan(false)"
        ></i>
        <span>{{ data.likes || 0 }}</span>
      </div>
    </footer>
    <div class="comment-content">
      <p>
        <span v-if="props.data.parentComment">@{{ props.data.parentComment.name }}</span>
        {{ props.data.content }}
      </p>
      <div class="reply" @click="switchEditHide(!editHide)">
        <i class="iconfont icon-zhifeiji"></i>
      </div>
    </div>
    <div class="bottom">
      <div class="envirconment">
        <i class="iconfont icon-windows"></i>
        <span>Windows 10</span>
      </div>
      <div class="browser">
        <i class="iconfont icon-chrome-fill"></i>
        <span>Chrome 92.0.4515.131</span>
      </div>
    </div>
    <div class="edit">
      <Edit
        :data="data"
        :hide="editHide"
        :cancel="true"
        @cancel="switchEditHide(true)"
        @confirm="handleEditConfirm"
      />
    </div>
  </div>
  <template v-if="props.data.children && props.data.children.length">
    <CommentItem
      v-for="item in props.data.children"
      :data="item"
      :is-children="true"
      @confirm="handleChildrenConfirm"
    />
  </template>
</template>

<script setup lang="ts">
import { Comment, EditForm } from "~~/types";
import CommentItem from "./item.vue";
import "github-markdown-css";
import "highlight.js/styles/atom-one-light.css";
import Edit from "./edit.vue";
import { getAvatar } from "~~/utils/tools";

const isDianZan = ref(false);
const props = withDefaults(
  defineProps<{
    data?: Comment;
    isChildren?: boolean;
  }>(),
  {
    data: {},
    isChildren: false,
  }
);
const imgSrc = ref(getAvatar(props.data.email))
const emit = defineEmits<{
  (e: "handleDianZan", b: boolean, data: Comment): void;
  (
    e: "confirm",
    form: EditForm,
    reset: () => void,
    rootComment: Comment,
    parentComment?: Comment
  ): void;
}>();

const handleDianzan = (b: boolean) => {
  isDianZan.value = b;
  emit("handleDianZan", b, props.data);
};

const handleEditConfirm = (form: EditForm, reset: () => void) => {
  let newReset = () => {
    switchEditHide(true)
    reset()
  }
  emit("confirm", form, newReset, props.data, props.data);
};

const handleChildrenConfirm = (
  form: EditForm,
  reset: () => void,
  parentComment: Comment,
) => {
  emit("confirm",form,reset,props.data,parentComment)
};

const editHide = ref(true);

const switchEditHide = (b: boolean) => {
  editHide.value = b;
};
</script>

<style scoped lang="scss">
.wrapper {
  margin: 0.7rem;
  footer {
    display: flex;
    justify-content: space-between;
    .left {
      img {
        width: 2.5rem;
        width: 2.5rem;
        border-radius: 10px;
        vertical-align: middle;
      }
      span {
        margin-left: 1rem;
        &.name {
          font-weight: 500;
        }
        &.time {
          font-size: 0.6rem;
          color: rgba($color: #000000, $alpha: 0.4);
        }
      }
    }
    .right {
      display: flex;
      align-items: center;
      i {
        cursor: pointer;
        font-size: 1.1rem;
        color: var(--theme);
      }
      span {
        margin-left: 0.2rem;
        font-size: 0.8rem;
      }
    }
  }
  .comment-content {
    display: inline-flex;
    border-radius: 10px;
    margin: 0.5rem 0 0.5rem 3rem;
    align-items: center;
    padding: 0 0.7rem;
    background: rgba($color: #000000, $alpha: 0.03);
    p {
      span {
        font-weight: 500;
      }
    }
    .reply {
      cursor: pointer;
      margin-left: 1.5rem;
    }
  }

  .bottom {
    display: flex;
    margin-left: 2.5rem;
    font-size: 0.6rem;
    color: var(--theme);
    opacity: 0.7;
    padding-top: 0.5rem;
    margin-bottom: 1rem;
    div {
      margin-right: 1rem;
      i {
        margin-right: 0.3rem;
      }
    }
  }
  .edit {
    margin-left: 2.5rem;
  }
}

.children {
  margin-left: 3rem;
}
</style>
