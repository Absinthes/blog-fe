<template>
  <div class="editComment-wrapper" ref="targetRef">
    <div class="editComment" :class="{ hide: hide, preViewShow: preViewShow }">
      <div class="edit-wrapper">
        <div class="avatar">
          <img :src="editImg ? editImg : defaultImage" alt="" />
        </div>
        <div class="col">
          <div class="row input">
            <Iinput name="昵称" v-model:inputValue="editForm.name" />
            <Iinput
              name="邮箱"
              @blur="hanleEmailBlur"
              v-model:inputValue="editForm.email"
            />
            <Iinput name="网址" v-model:inputValue="editForm.link" />
          </div>
          <div class="row textarea">
            <textarea maxlength="500" v-model="editForm.content"></textarea>
            <div class="wordCount">
              <span>{{ editForm.content.length }}</span
              >/<span>500</span>
            </div>
          </div>
          <div class="row actions">
            <div class="emoji">
              <Emoji @emoji-click="handleEmoji"
                ><i class="iconfont icon-shu-smiling-face"
              /></Emoji>
            </div>
            <div class="buttons">
              <button @click="handleCancel" v-if="cancel">取消</button>
              <button @click="switchPreView(!preViewShow)">预览</button>
              <button @click="handleConfirm"  v-bind="{'disabled':confirmDisable}">发送</button>
            </div>
          </div>
          <div
            class="row preView markdown-body"
            ref="mdRef"
            v-html="preViewContent"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getMarkdownIt } from "~~/utils/hook/useMarkdown";
import Iinput from "./Iinput.vue";
import Emoji from "../emoji/index.vue";
import { EditForm } from "~~/types";
import { validate } from "class-validator";
import { CommentVaildator } from "~~/utils/vaildator";
import { getAvatar } from "~~/utils/tools";

const { hide,cancel } = defineProps<{
  hide: boolean;
  cancel:boolean
}>();

const md = getMarkdownIt();
const preViewShow = ref(false);
const defaultImage =
  "https://upload-bbs.mihoyo.com/upload/2021/08/22/274927479/a95c5e1a2a1e63c3726f5baff45f349b_4982851866622051149.jpg?x-oss-process=image//resize,s_600/quality,q_80/auto-orient,0/interlace,1/format,jpg";
const editForm = ref<EditForm>({
  email: "",
  link: "",
  name: "",
  content: "",
});
const editImg = ref<string>("");
const preViewContent = ref<any>();
const mdRef = ref();
const emit = defineEmits<{
  (e: "confirm", form: EditForm,reset:()=>void): void;
  (e: "cancel"): void;
}>();
const confirmDisable = computed(() => {
  editForm
})

const switchPreView = (b: boolean) => {
  preViewShow.value = b;
};

const handleCancel = () => {
  emit("cancel");
  preViewShow.value = false
  editForm.value = {
    email: "",
    link: "",
    name: "",
    content: "",
  };
};

const targetRef = ref();

const hanleEmailBlur = () => {
  editImg.value = getAvatar(editForm.value.email)
}

const handleEmoji = (emoji: string) => {
  editForm.value.content += emoji;
};

const handleConfirm = () => {
  const commnet = new CommentVaildator()
  commnet.email = editForm.value.email
  commnet.name = editForm.value.name
  editForm.value.link && (commnet.link = editForm.value.link)
  commnet.content = editForm.value.content
  validate(commnet,{ skipMissingProperties: true }).then((errors) => {
    console.log(errors)
  })
  emit("confirm", editForm.value,handleCancel);
};

const unWatch = watch(
  () => editForm.value.content,
  async (val) => {
    preViewContent.value = md.render(val);
    await nextTick();
    mdRef.value.scrollTo({
      top: mdRef.value.scrollHeight,
      behavior: "smooth",
    });
  }
);

onUnmounted(() => {
  unWatch();
});
</script>

<style scoped lang="scss">
.editComment {
  height: 17.5rem;
  display: flex;
  flex-direction: column;
  transition: height 0.5s, opacity 0.3s;
  &.hide {
    height: 0rem;
    opacity: 0;
    overflow: hidden;
  }
  &.preViewShow {
    height: 38.5rem;
    .edit-wrapper {
      .col {
        .row {
          &.preView {
            height: 20rem !important;
            margin: 1rem 0;
            border: 1px solid rgba($color: #000000, $alpha: 0.1);
            opacity: 1;
          }
        }
      }
    }
  }
  .edit-wrapper {
    margin-top: 0.5rem;
    display: flex;
    transition: height .5s;
    .avatar {
      padding-right: 0.5rem;
      img {
        width: 2.5rem;
        height: 2.5rem;
        object-fit: cover;
        border-radius: 10px;
      }
    }
    .col {
      flex: 1;
      .row {
        display: grid;
        &.input {
          grid-template-columns: 1fr 1fr 1fr;
          grid-column-gap: 0.5rem;
          margin-bottom: 0.5rem;
        }
        &.textarea {
          position: relative;
          width: 100%;
          box-sizing: border-box;
          transition: height .5s;
          .wordCount {
            font-size: 0.8rem;
            position: absolute;
            right: 1.2rem;
            bottom: 0.6rem;
          }
          textarea {
            width: 100%;
            outline: none;
            height: 10rem;
            border: 1px solid rgba($color: #000000, $alpha: 0.1);
            border-radius: 5px;
            box-sizing: border-box;
            padding: 1rem;
            transition: border 0.3s;
            &:focus {
              border-color: #409eff;
            }
          }
        }
        &.actions {
          margin-top: 0.5rem;
          display: flex;
          justify-content: space-between;
          .emoji {
            cursor: pointer;
            padding: 0 0.5rem 0.5rem 0.5rem;
            i {
              font-size: 1.2rem;
            }
          }
          .buttons {
            display: flex;
            button {
              padding: 0.3rem 0.7rem;
              background: rgba($color: #000000, $alpha: 0.05);
              cursor: pointer;
              border-radius: 5px;
              border: 1px solid #dcdfe6;
              transition: color 0.3s, border 0.3s;
              margin-left: 0.5rem;
              &:hover {
                color: #409eff;
                border-color: #409eff;
              }
            }
          }
        }
        &.preView {
          height: 0;
          overflow-y: scroll;
          border-radius: 5px;
          transition: height 0.5s, opacity 0.3s, border 0.5s;
          border: 1px solid rgba($color: #000000, $alpha: 0);
          opacity: 0;
        }
      }
    }
  }
}
</style>
