interface anyObj {
  [key: string]: any
}

export declare function useRouteQuery(
  name: string
): Ref<null | string | string[]>
export declare function useRouteQuery<
  T extends null | undefined | string | string[] = null | string | string[]
>(name: string, defaultValue?: T, options?: ReactiveRouteOptions): Ref<T>
