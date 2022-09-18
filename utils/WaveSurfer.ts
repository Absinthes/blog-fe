import _ from "lodash";
import { Ref } from "nuxt/dist/app/compat/capi";
import dayjs from "dayjs";

export type MusicListItem = {
  title: string;
  author: string;
  url: string;
  coverUrl: string;
  createTime: string;
};

export class WaveSurferControll {
  WaveSurfer: any;
  musicAddressList: Ref<MusicListItem[]>;
  instantiation: any;
  volumeNum: Ref<number>;
  currentMusicTotalLen: Ref<number>;
  currentMusicLen: Ref<number>;
  currentMusicIndex: Ref<number>;
  isPlay: Ref<boolean>;
  curryInit;
  mode: Ref<"loop" | "singleLoop" | "random">;
  nextPlay: Ref<boolean>;
  static modeList: ("loop" | "singleLoop" | "random")[] = [
    "loop",
    "singleLoop",
    "random",
  ];

  constructor(
    waveColor: string,
    progressColor: string,
    barWidth: number,
    barGap: number,
    height: number
  ) {
    this.curryInit = _.curry(this._init, 6);
    this.curryInit = this.curryInit(
      _,
      waveColor,
      progressColor,
      barWidth,
      barGap,
      height
    );
    this.musicAddressList = ref<MusicListItem[]>([]);
    this.volumeNum = ref(50);
    this.currentMusicTotalLen = ref(0);
    this.currentMusicLen = ref(0);
    this.currentMusicIndex = ref(0);
    this.isPlay = ref(false);
    this.mode = ref("loop");
    this.nextPlay = ref(false);
  }

  private async _init(
    container: Element | string,
    waveColor: string,
    progressColor: string,
    barWidth: number,
    barGap: number,
    height: number
  ) {
    if (!this.WaveSurfer) {
      this.WaveSurfer = (await (() => import("wavesurfer.js"))()).default;
    }
    this.instantiation = await this.WaveSurfer.create({
      container,
      waveColor,
      progressColor,
      barWidth,
      barGap,
      height,
      fillParent: false,
      scrollParent: true,
      normalize: true,
    });
    this.addListener();
  }

  async init(container: Element | string) {
    return this.curryInit(container);
  }

  start() {
    this.load(0);
  }

  async addMusic(address: MusicListItem | MusicListItem[]) {
    if (Array.isArray(address)) {
      this.musicAddressList.value = address;
    } else {
      this.musicAddressList.value.push(address);
    }
    if (
      this.musicAddressList.value.length > 0 &&
      this.currentMusicIndex.value < 0
    ) {
      this.currentMusicIndex.value = 0;
    }
  }

  next() {
    if(!this.instantiation) return
    const prevIndex = this.currentMusicIndex.value;
    this.currentMusicIndex.value =
      (this.currentMusicIndex.value + 1) % this.musicAddressList.value.length;
    if (prevIndex !== this.currentMusicIndex.value) {
      this.load(this.currentMusicIndex.value);
      this.nextPlay.value = true;
    } else {
      this.processSet(0);
    }
  }

  prev() {
    if(!this.instantiation) return
    const prevIndex = this.currentMusicIndex.value;
    this.currentMusicIndex.value =
      (this.currentMusicIndex.value - 1 + this.musicAddressList.value.length) %
      this.musicAddressList.value.length;
    if (prevIndex !== this.currentMusicIndex.value) {
      this.load(this.currentMusicIndex.value);
      this.nextPlay.value = true;
    } else {
      this.processSet(0);
    }
  }

  repetition() {
    this.instantiation.stop();
    this.instantiation.play();
    this.isPlay.value = true;
  }

  playPause() {
    if(!this.instantiation) return
    this.instantiation.playPause();
    this.isPlay.value = !this.isPlay.value;
  }

  play() {
    if(!this.instantiation) return
    this.instantiation.play();
    this.isPlay.value = true;
  }

  volumeSet(n: number) {
    if(!this.instantiation) return
    this.volumeNum.value = n;
    this.instantiation.setVolume(this.volumeNum.value / 100);
  }

  processSet(n: number, mode: "number" | "percentage" = "number") {
    if (mode === "number") {
      this.instantiation.play(n);
    } else if (mode == "percentage") {
      this.instantiation.play((this.currentMusicTotalLen.value * n) / 100);
    }
    this.isPlay.value = true;
  }

  toggleMute() {
    this.instantiation.toggleMute();
  }

  load(i: number) {
    if (!this.instantiation) return;
    this.instantiation.load(this.musicAddressList.value[i].url);
  }

  addListener() {
    this.instantiation.on("ready", () => {
      this.currentMusicTotalLen.value = Math.ceil(
        this.instantiation.getDuration()
      );
      if(this.nextPlay.value){
        this.play()
        this.nextPlay.value = false
      }
    });
    this.instantiation.on("audioprocess", this.processChange.bind(this));
    this.instantiation.on("finish", () => {
      this.isPlay.value = !this.isPlay.value;
      switch (this.mode.value) {
        case "loop":
          this.next();
          break;
        case "random":
          break;
        case "singleLoop":
          this.repetition();
          break;
      }
    });
    watch(this.volumeNum, (newVal) => {
      this.volumeSet(newVal);
    });
  }

  modeChange() {
    if(!this.instantiation) return
    const currentIndex = WaveSurferControll.modeList.findIndex(
      (it) => it === this.mode.value
    );
    const nextIndex = (currentIndex + 1) % WaveSurferControll.modeList.length;
    this.mode.value = WaveSurferControll.modeList[nextIndex];
    console.log(this.mode.value);
  }

  processChange() {
    this.currentMusicLen.value = Math.floor(
      this.instantiation.getCurrentTime()
    );
  }

  destroy() {
    this.instantiation.destroy();
  }

  getCoverImg = computed(() => {
    if (this.musicAddressList.value.length == 0) {
      return "";
    }
    return this.musicAddressList.value[this.currentMusicIndex.value].coverUrl;
  });

  getTitle = computed(() => {
    if (this.musicAddressList.value.length == 0) {
      return "";
    }
    return this.musicAddressList.value[this.currentMusicIndex.value].title;
  });

  getAuthor = computed(() => {
    if (this.musicAddressList.value.length == 0) {
      return "";
    }
    return this.musicAddressList.value[this.currentMusicIndex.value].author;
  });

  getCreateTime = computed(() => {
    if (this.musicAddressList.value.length == 0) {
      return "";
    }
    return dayjs(
      +this.musicAddressList.value[this.currentMusicIndex.value].createTime
    ).format("YYYY/MM/DD");
  });
}
