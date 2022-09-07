<template>
  <aside class="directory reset">
    <div class="title">
      <i class="iconfont icon-mulu"></i>
      <span>文章目录</span>
    </div>
    <div class="directory-border">
      <div
        class="directory-item-box"
        ref="directoryItemBox"
        @wheel.prevent="handleWheel"
      >
        <div class="directory-item" v-for="(it, i) in props.directory">
          <a
            class="counter"
            :class="{ active: props.activeId == it.id }"
            :href="`#${it.id}`"
            :alt="it.id"
            @click="emit('hrefClick', $event, it)"
          >
            {{ it.title.trim() }}
          </a>
          <div class="reset children">
            <a
              v-for="(ele, index) in it.children"
              :href="`#${ele.id}`"
              :alt="ele.title"
              class="counter"
              :class="{ active: props.activeId == ele.id }"
              @click="emit('hrefClick', $event, ele)"
            >
              {{ ele.title.trim() }}
            </a>
          </div>
        </div>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { mdDirectory } from "~~/utils/hook/useMarkdown";
import { scrollHideShowControl } from "~~/utils/scrollHideShowControl";

const directoryItemBox = ref<Element>();

const props = defineProps<{
  directory: mdDirectory[];
  activeId?: string;
}>();

const emit = defineEmits<{
  (e: "hrefClick", event: Event, ele: mdDirectory): void;
  (e: "getDirectoryDom", directoryDom: Element): void;
}>();

onMounted(() => {
  emit("getDirectoryDom", directoryItemBox.value);
  scrollHideShowControl(directoryItemBox.value);
});

const handleWheel = (e) => {
  directoryItemBox.value.scrollTop += e.deltaY;
};
</script>

<style lang="scss" scoped>
.directory {
  color: var(--font-thin-color);
  a {
    max-width: 100%;
    color: currentColor;
    text-decoration: none;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    background: linear-gradient(var(--color-pink) 0 0) no-repeat;
    background-position: 0% 90%;
    background-size: var(--p, 0%) 3%;
    transition: 0.4s;
    &:hover {
      --p: 100%;
      color: var(--color-pink);
    }
  }
  .title {
    margin-bottom: 1rem;
    .iconfont {
      margin-right: 0.5rem;
    }
  }
  .directory-border {
    padding: 10px 0 10px 1rem;
    border-left: 1px solid rgba($color: #000000, $alpha: 0.1);
    max-width: 100%;
  }
  .directory-item-box {
    height: 600px;
    overflow-y: scroll;
    max-width: 100%;
    transition: background 0.3s;
    &[scroll]::-webkit-scrollbar-thumb {
      background-color: rgba(0, 0, 0, 0.5);
      transition: 0s;
    }
  }
  .directory-item {
    max-width: 100%;

    .children {
      margin-left: 1rem;
    }
  }
}

.reset {
  display: flex;

  flex-direction: column;
  align-items: flex-start;
  counter-reset: directory;
}
.counter {
  padding: 5px 0px 5px 0px;
  transition: background-color 0.2s;
  &::before {
    content: counters(directory, ".");
    counter-increment: directory;
    margin-right: 10px;
  }
}
</style>
