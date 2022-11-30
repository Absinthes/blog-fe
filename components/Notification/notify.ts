import {
  ComponentPublicInstance,
  createVNode,
  render,
  VNode,
} from "nuxt/dist/app/compat/capi";
import { useZIndex } from "~~/utils/hook/useIndex";
import { isElement } from "~~/utils/tools";
import NotificationConstructor from "./index.vue";

export type PositionType =
  | "top-right"
  | "top-left"
  | "bottom-right"
  | "bottom-left";

export enum IconEnum {
  success = "icon-chenggong",
  error = "icon-shibai",
  warning = "icon-tanhao",
  info = "icon-shuju",
}

export type IconType = "success" | "error" | "warning" | "info" | "";

export type NotificationConstructorProps = {
  id?: string;
  title?: string;
  message?: string;
  type?: IconType;
  duration?: number;
  offset?: number;
  position?: PositionType;
  zIndex: number;
  onClick?: Function;
  onClose: Function;
};

export type NotificationsOptions = {
  id?: string;
  title?: string;
  message?: string;
  type?: IconType;
  duration?: number;
  offset?: number;
  onClick?: Function;
  position?: PositionType;
  appendTo: HTMLElement | string;
};

const notifications: Record<PositionType, VNode[]> = {
  "top-left": [],
  "top-right": [],
  "bottom-left": [],
  "bottom-right": [],
};

const GAP_SIZE = 16;
let seed = 1;

const notify = (options: NotificationsOptions) => {
  const id = `notification_${seed++}`;
  const position = options.position || "top-right";
  let appendTo = document.body;
  if (!isElement(options.appendTo)) {
    appendTo = document.querySelector(options.appendTo);
  } else {
    appendTo = options.appendTo;
  }
  let verticalOffset = options.offset || 0;
  notifications[position].forEach((it) => {
    verticalOffset += (vm.el?.offsetHeight || 0) + GAP_SIZE;
  });
  const container = document.createElement("div");
  const { nextZIndex } = useZIndex();
  const props: NotificationConstructorProps = {
    zIndex: nextZIndex(),
    offset: verticalOffset,
    ...options,
    id,
    onClose: () => {
      close(id, position);
    },
  };
  const vm = createVNode(NotificationConstructor, props);
  render(vm, container);
  notifications[position].push(vm);
  appendTo.appendChild(container.firstElementChild);

  return {
    close: () => {
      (
        vm.component.proxy as ComponentPublicInstance<{ visible: boolean }>
      ).visible = false;
    },
  };
};

export function close(id: string, position: PositionType) {
   
}

export function closeAll() {
  
}

notify.closeAll = closeAll

export default notify;
