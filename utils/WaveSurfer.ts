import _ from "lodash";
import { Ref } from "nuxt/dist/app/compat/capi";

export class WaveSurferControll {
  WaveSurfer: any;
  musicAddressList;
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
    this.musicAddressList = reactive<string[]>([]);
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
    this.instantiation = this.WaveSurfer.create({
      container,
      waveColor,
      progressColor,
      barWidth,
      barGap,
      height,
    });
    this.addListener();
  }

  init(container: Element | string) {
    this.curryInit(container);
  }

  start() {
    this.load(0);
  }

  async addMusic(address: string | string[]) {
    if (Array.isArray(address)) {
      this.musicAddressList = address;
      return;
    }
    this.musicAddressList.push(address);
  }

  next() {
    const prevIndex = this.currentMusicIndex.value;
    this.currentMusicIndex.value =
      (this.currentMusicIndex.value + 1) % this.musicAddressList.length;
    if (prevIndex !== this.currentMusicIndex.value) {
      this.load(this.currentMusicIndex.value);
      this.nextPlay.value = true;
    } else {
      this.processSet(0);
    }
  }

  prev() {
    this.currentMusicIndex.value =
      (this.currentMusicIndex.value - 1) % this.musicAddressList.length;
    this.load(this.currentMusicIndex.value);
  }

  repetition() {
    this.instantiation.stop();
    this.instantiation.play();
    this.isPlay.value = true
  }

  playPause() {
    this.instantiation.playPause();
    this.isPlay.value = !this.isPlay.value;
  }

  play(){
    this.instantiation.play()
    this.isPlay.value = true
  }

  volumeSet(n: number) {
    this.volumeNum.value = n;
    this.instantiation.setVolume(this.volumeNum.value / 100);
  }

  processSet(n: number, mode: "number" | "percentage" = "number") {
    if (mode === "number") {
      this.instantiation.play(n);
    } else if (mode == "percentage") {
      this.instantiation.play((this.currentMusicTotalLen.value * n) / 100);
    }
    this.isPlay.value = true
  }

  toggleMute() {
    this.instantiation.toggleMute();
  }

  load(i: number) {
    if (!this.instantiation) return;
    this.instantiation.load(this.musicAddressList[i]);
  }

  addListener() {
    this.instantiation.on("ready", () => {
      this.currentMusicTotalLen.value = Math.ceil(
        this.instantiation.getDuration()
      );
      this.nextPlay.value && this.play();
      console.log(this);
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
          this.repetition()
          break;
      }
    });
    watch(this.volumeNum, (newVal) => {
      this.volumeSet(newVal);
    });
  }

  modeChange() {
    const currentIndex = WaveSurferControll.modeList.findIndex(
      (it) => it === this.mode.value
    );
    const nextIndex = (currentIndex + 1) % WaveSurferControll.modeList.length;
    this.mode.value = WaveSurferControll.modeList[nextIndex];
    console.log(this.mode.value)
  }

  processChange() {
    this.currentMusicLen.value = Math.floor(
      this.instantiation.getCurrentTime()
    );
  }

  destroy() {
    this.instantiation.destroy();
  }
}
