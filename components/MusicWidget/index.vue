<template>
  <div class="musicWidget-box" :class="{ hide: isHide }">
    <header class="music-header">
      <i class="iconfont icon-gengduo" @click="isHide = !isHide"></i>
    </header>
    <article class="music-content">
      <img class="music-img" src="/public/微信图片_20220908160732.jpg" alt="" />
      <div class="music-info">
        <h3 class="title">黄龄,HOYO-MiX - TruE</h3>
        <p class="author">Podcast</p>
        <p class="time">5 month ago</p>
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
      <i class="iconfont icon-bofangqi-xiayiji reverse"></i>
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
import { secTotime } from "~~/utils/tools";
import { WaveSurferControll } from "~~/utils/WaveSurfer";

type MusicMode = "sidebar";
const isHide = ref(true);
const waveform = ref();
const precent = ref(50);
const silentMode = ref(false);
const wavesurfer = new WaveSurferControll("#b1bacd", "#4a5cc3", 3, 3, 70);
const volumeRef = ref();

onMounted(() => {
  wavesurfer.init(waveform.value);
});

const getMusicList = async () => {
  wavesurfer.addMusic("/public/黄龄,HOYO-MiX - TruE.mp3");
  wavesurfer.start();
};

const isHideWatch = watch(isHide, (newVal) => {
  if (!newVal) {
    getMusicList();
  }
  isHideWatch();
});

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
  box-shadow: var(--card-shadow);
  border-radius: 10px;
  background-color: var(--card-bg);
  overflow: hidden;
  transition: width 0.3s, padding 0.3s;
  z-index: 999;

  .music-content {
    margin-top: 1.5rem;
    overflow: hidden;
    .music-img {
      width: 250px;
      height: 250px;
      object-fit: cover;
      border-radius: 10px;
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
        font-weight: 500;
      }
      .time {
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
  padding: 1rem;
  overflow: hidden;
  .music-header {
    text-align: center;
  }
  .music-content {
    .music-img {
      width: 3rem;
      height: 3rem;
      transition: all 0.3s;
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
    }
    .wave-box {
      opacity: 0;
      height: 0;
      overflow: hidden;
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
</style>
