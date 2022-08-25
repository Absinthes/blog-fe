import { defineNuxtPlugin } from "#app";
import { apolloProvider } from "~~/utils/apolloClient";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(apolloProvider);
});