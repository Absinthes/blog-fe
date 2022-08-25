import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core/index.js'
import { createApolloProvider } from '@vue/apollo-option'
import { createUploadLink } from "apollo-upload-client";

type Headers = {
  [key:string]: string;
};

const headers:Headers = {

}

const upLoadLink = createUploadLink({
  uri: "http://localhost:3000/graphql",
  headers
})

// // 与 API 的 HTTP 连接
// const httpLink = createHttpLink({
//   // 你需要在这里使用绝对路径
//   uri: 'http://localhost:3000/graphql',
//   headers
// })

// 缓存实现
const cache = new InMemoryCache()

// 创建 apollo 客户端
export const  apolloClient = new ApolloClient({
  link: upLoadLink,
  cache,
})

export const apolloProvider = createApolloProvider({
  defaultClient: apolloClient,
})


export function setAuthorization(authorization:string){
  setHeader('Authorization', `Bearer ${authorization}`)
}

export function setHeader(key: string, val: string) {
  headers[key] = val
}