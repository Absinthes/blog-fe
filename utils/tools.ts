export const getPictureUrl = computed(() => {
  return (url: string) => {
    if(!url) return 
    if (url.startsWith("http://") || url.startsWith("https://")) return url;
    return import.meta.env.VITE_BASE_IMG_ADDRESS + url;
  };
});
