<template>
  <div class="musicWidget-box" :class="{ hide: isHide }">
    <header class="music-header">
      <i class="iconfont icon-gengduo" @click="isHide = !isHide"></i>
    </header>
    <article class="music-content">
      <img
        class="music-img"
        :src="wavesurfer.getCoverImg.value"
        alt=""
        :style="{
          animationPlayState: wavesurfer.isPlay.value ? 'running' : 'paused',
        }"
      />
      <div class="music-info">
        <h3 class="title">{{ wavesurfer.getTitle.value }}</h3>
        <p class="author">{{ wavesurfer.getAuthor.value }}</p>
        <p class="time">{{ wavesurfer.getCreateTime.value }}</p>
      </div>
      <div class="wave-box">
        <div class="music-time">
          <span class="music-current">{{
            getTime(wavesurfer.currentMusicLen.value)
          }}</span>
          <span class="music-End">{{
            getTime(wavesurfer.currentMusicTotalLen.value)
          }}</span>
        </div>
        <div class="waveform" ref="waveform"></div>
      </div>
    </article>
    <nav class="control-box" v-if="wavesurfer">
      <i
        class="iconfont weight"
        :class="setModeIconClass"
        style="font-size: 1.1rem"
        @click="wavesurfer.modeChange"
      ></i>
      <i
        class="iconfont icon-bofangqi-xiayiji reverse"
        @click="wavesurfer.prev"
      ></i>
      <i
        class="iconfont icon-bofangqi-bofang"
        v-if="!wavesurfer.isPlay.value"
        @click="wavesurfer.playPause"
      ></i>
      <i
        class="iconfont icon-bofangqi-zanting"
        v-else
        @click.stop="wavesurfer.playPause"
      ></i>
      <i class="iconfont icon-bofangqi-xiayiji" @click="wavesurfer.next"></i>
      <i
        ref="volumeRef"
        class="iconfont icon-yinliangdakai volumeControl-parent"
        :class="!silentMode ? 'icon-yinliangdakai' : 'icon-yinliangguanbi'"
        @click.stop="volumeClick"
      >
        <div class="volumeControl">
          <VProgress
            v-model:precent="wavesurfer.volumeNum.value"
            direction="vertical"
            :width="200"
            :height="5"
            :slider-width="10"
          />
        </div>
      </i>
    </nav>
  </div>
</template>

<script lang="ts" setup>
import { getMultimediaList } from "~~/api";
import { secTotime } from "~~/utils/tools";
import { MusicListItem, WaveSurferControll } from "~~/utils/WaveSurfer";

type MusicMode = "sidebar";
const isHide = ref(true);
const waveform = ref();
const precent = ref(50);
const silentMode = ref(false);
const wavesurfer = new WaveSurferControll("#b1bacd", "#4a5cc3", 3, 3, 70);
const volumeRef = ref();
const IMG_ADDRESS = import.meta.env.VITE_BASE_IMG_ADDRESS;
const queryParams = reactive({
  limit: 10,
  currentPage: 1,
});
const multimediaList = ref<MusicListItem[]>([]);

useAsyncData(`MusicWidget`, async () => {
  const { limit, currentPage } = queryParams;
  const { nodes, totalCount } = await getMultimediaList(
    limit,
    limit * (currentPage - 1),
    "Music"
  );
  return nodes.map((it) => ({
    title: it.title,
    author: it.author,
    url: IMG_ADDRESS + it.path,
    coverUrl: IMG_ADDRESS + it.cover,
    createTime: it.createTime,
  }));
}).then(({ data }) => {
  multimediaList.value = data.value;
  wavesurfer.addMusic(multimediaList.value);
});

const musicStart = () => {
  wavesurfer.start();
};

onMounted(async () => {
  await wavesurfer.init(waveform.value);
  musicStart();
});

// const getMusicList = async () => {
//   const { limit, currentPage } = queryParams;
//   const { nodes, totalCount } = await getMultimediaList(
//     limit,
//     limit * (currentPage - 1),
//     "Music"
//   );
//   multimediaList.value = nodes.map((it) => ({
//     title: it.title,
//     author: it.author,
//     url: IMG_ADDRESS + it.path,
//     coverUrl: IMG_ADDRESS + it.cover,
//     createTime: it.createTime,
//   }));
//   wavesurfer.addMusic(multimediaList.value);
//   musicStart();
// };

watch(precent, (newVal) => {
  wavesurfer.volumeSet(newVal / 100);
});

const getTime = computed(() => {
  return (s: number) => secTotime(s, 2);
});

const setModeIconClass = computed(() => {
  switch (wavesurfer.mode.value) {
    case "loop":
      return "icon-xunhuanbofang";
    case "singleLoop":
      return "icon-danquxunhuan";
    case "random":
      return "icon-suijibofang";
  }
});

const volumeClick = (e: Event) => {
  if (e.target === volumeRef.value) {
    silentMode.value = !silentMode.value;
    wavesurfer.toggleMute();
  }
};
</script>

<style lang="scss" scoped>
.musicWidget-box {
  position: fixed;
  left: 0;
  top: 5rem;
  padding: 1rem 1.5rem 1.5rem;
  width: 250px;
  height: 570px;
  border-radius: 10px;
  box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.3);
  background-color: var(--card-bg);
  overflow: hidden;
  transition: width 0.3s, padding 0.3s, transform 0.3s;
  z-index: 999;
  animation: initalAnimation 2s alternate;

  .music-content {
    overflow: hidden;
    text-align: center;
    .music-img {
      display: inline-block;
      width: 230px;
      height: 230px;
      margin-top: 1.5rem;
      object-fit: cover;
      border-radius: 50%;
      animation: imgAnimation 30s infinite alternate;
      box-shadow: 0px 0px 7px rgba(0, 0, 0, 0.4);
      transition: width 0.3s, height 0.3s;
    }
    .music-info {
      text-align: center;
      margin-top: 0.65rem;
      transition: transform 0.3s, width 0.3s, height 0.3s;
      h3,
      p {
        display: inline-block;
        width: 100%;
      }
      p {
        margin: 0;
      }
      .title {
        margin-bottom: 0.65rem;
        margin-top: 0;
      }
      .author {
        font-size: 0.9rem;
        font-weight: 500;
      }
      .time {
        margin-top: 0.5rem;
        font-size: 0.8rem;
        color: var(--font-thin-deep-color);
      }
    }
    .wave-box {
      margin-top: 1.5rem;
      height: 110px;
      .waveform {
        height: 70px;
      }
      .music-time {
        display: flex;
        justify-content: space-between;
        font-size: 0.9rem;
        margin-bottom: 1rem;
        color: var(--font-thin-deep-color);
      }
    }
  }
  .control-box {
    margin-top: 1.5rem;
    white-space: nowrap;
    .iconfont {
      display: inline-block;
      text-align: center;
      width: 50px;
      font-size: 1.3rem;
    }
    .reverse {
      transform: rotate(180deg);
    }
    .weight {
      font-weight: 600;
    }
    .volumeControl-parent {
      position: relative;
      display: inline-flex;
      justify-content: center;
      &:hover {
        .volumeControl {
          opacity: 1;
          pointer-events: auto;
        }
        &::after {
          display: block;
        }
      }
      &::after {
        content: "";
        display: none;
        position: absolute;
        top: -30px;
        width: 100%;
        height: 30px;
      }
    }
    .volumeControl {
      position: absolute;
      bottom: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 1rem;
      padding: 0.5rem 0;
      background-color: var(--card-bg);
      box-shadow: var(--card-shadow);
      border-radius: 10px;
      z-index: 999;
      opacity: 0;
      pointer-events: none;
      &:hover {
        opacity: 1;
        pointer-events: auto;
      }
    }
  }
}

.musicWidget-box.hide {
  width: 3rem;
  padding: 1rem 0.7rem;
  overflow: hidden;
  transform: translateX(-90%);
  &:hover {
    transform: translateX(0);
  }
  .music-header {
    text-align: center;
  }
  .music-content {
    .music-img {
      width: 2.5rem;
      height: 2.5rem;
    }
    .music-info {
      width: calc(200px + 1.3rem);
      height: 200px;
      white-space: nowrap;
      overflow: hidden;
      transform: rotate(-90deg);
      animation: opcityChange 0.3s;
      p,
      h3 {
        width: auto;
      }
      h3 {
        font-size: 0.8rem;
      }
      p {
        display: none;
        font-size: 0.7rem;
      }
      .time {
        display: none;
      }
      .author {
        display: inline-block;
        margin-left: 1rem;
      }
    }
    .wave-box {
      opacity: 0;
      height: 0;
      // overflow: hidden;
      margin-top: 0;
    }
  }

  .control-box {
    width: 3rem;
    white-space: initial;
    // transition: width 0.3s;
    .iconfont {
      height: 45px;
      line-height: 45px;
    }
  }
}

@keyframes opcityChange {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes opcityAndWidthChange {
  to {
    opacity: 0;
    height: 110px;
  }
  from {
    opacity: 1;
    height: 0;
  }
}

@keyframes imgAnimation {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes initalAnimation {
  0% {
    opacity: 0;
    transform: translateX(-90%);
  }
  50% {
    opacity: 1;
    transform: translateX(0);
  }

  100% {
    opacity: 1;
    transform: translateX(-90%);
  }
}
</style>
