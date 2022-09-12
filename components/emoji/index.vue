<template>
  <div class="mask" :class="{ hide: !hide }" @click="switchHide(false)"></div>
  <div class="emoji" :class="{ hide: !hide }">
    <div @click="switchHide(!hide)">
      <slot />
    </div>
    <div class="emoji-wrapper">
      <div class="emoji-content">
        <ul>
          <li
            v-for="item in emoJson[curName].data"
            :key="item.value"
            @click="handleEmojiClick(item.value)"
          >
            {{ item.value }}
          </li>
        </ul>
      </div>
      <div class="emoji-list">
        <div
          class="emoji-name"
          @click="swithName(name)"
          v-for="name in emojiNames"
          :class="{ active: curName == name }"
        >
          {{ emoJson[name].name }}
        </div>
      </div>
    </div>
  </div>
  
</template>

<script setup lang="ts">
import emojiJson from "@/assets/emoji.json";
import { Emoji } from "~~/types";
const emoJson = ref<Emoji>(emojiJson);
const emojiNames = Object.keys(emojiJson);
const curName = ref<string>(emojiNames[0]);
const swithName = (name: string) => {
  curName.value = name;
};
const hide = ref(false);
const switchHide = (b: boolean) => {
  hide.value = b;
};
const emit = defineEmits<{
  (e: "emojiClick", val: string): void;
}>();
const handleEmojiClick = (val:string) => {
  emit("emojiClick",val)
  switchHide(false)
}
</script>

<style scoped lang="scss">
.emoji {
  position: relative;
  z-index: 100;
  &.hide {
    .emoji-wrapper {
      opacity: 0;
      .emoji-content{
        height: 0;
        opacity: 0;
      }
      .emoji-list{
        height: 0;
        opacity: 0;
      }
    }
  }
  .emoji-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    background: white;
    transform: translateY(2rem);
    box-shadow: var(--card-shadow);
    overflow: hidden;
    border-radius: 10px;
    transition:opacity .5s;
    .emoji-content {
      height: 12rem;
      transition: height .5s,opacity .5s;
      overflow-y: scroll;
      ul {
        display: flex;
        justify-content: space-between;
        width: 500px;
        list-style: none;
        flex-wrap: wrap;
        padding: 1rem;
        margin: 0;
        li {
          padding: 0.5rem;
          border-radius: 10px;
          transition: background 0.3s;
          &:hover {
            background: rgba($color: #000000, $alpha: 0.1);
          }
        }
      }
    }
    .emoji-list {
      box-shadow: 0px 0px 4px rgb(0 0 0 / 12%);
      display: flex;
      transition: height .5s .2s,opacity .5s .2s;
      .emoji-name {
        padding: 1rem 0.5rem;
        &.active {
          background: rgba($color: #000000, $alpha: 0.05);
        }
        &:hover {
          background: rgba($color: #000000, $alpha: 0.05);
        }
      }
    }
  }
}
.mask{
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  z-index: 99;
  &.hide{
    position:initial;
  }
}
</style>
