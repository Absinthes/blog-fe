import { Article, ArticleUpdateInput } from "@/types";
import { Pagination, StatusModel } from "@/types/common";
import gql from "graphql-tag";
import _ from "lodash";
import { query, mutation } from "../request";

export async function getArticleList(limit: number = 10, offset: number = 0) {
  let res = await query<{ getArticleList: Pagination<Article> }>(
    gql`
      query getArticleList($limit: Int!, $offset: Int!) {
        getArticleList(limit: $limit, offset: $offset) {
          totalCount
          nodes {
            id
            title
            viewNum
            summary
            content
            contentNum
            likes
            weight
            isPublic
            createTime
            updateTime
            tags {
              id
              name
            }
            groups {
              id
              name
            }
          }
        }
      }
    `,
    {
      limit,
      offset,
    },
    {
      fetchPolicy: "cache-and-network",
    }
  );
  return res.getArticleList;
}

export async function getArticleById(id: string) {
  let res = await query<{
    getArticleById: Article;
  }>(
    gql`
      query GetArticleById($ArticleId: String!) {
        getArticleById(id: $ArticleId) {
          id
          title
          summary
          content
          weight
          isPublic
          tags {
            id
            name
          }
          groups {
            id
            name
          }
        }
      }
    `,
    {
      ArticleId: id,
    },
    {
      fetchPolicy: "network-only",
    }
  );
  return res.getArticleById;
}

export async function updateArticle(article: ArticleUpdateInput) {
  try {
    let res = await mutation<
      {
        updateArticle: StatusModel;
      },
      {
        input: ArticleUpdateInput;
      }
    >(
      gql`
        mutation UpdateArticle($input: ArticleUpdateInput!) {
          updateArticle(input: $input) {
            code
            msg
          }
        }
      `,
      {
        input: article,
      }
    );
    return res?.updateArticle;
  } catch (error) {}
}

export async function deleteArticle(id: string) {
  try {
    let res = await mutation<
      {
        deleteArticle: StatusModel;
      },
      {
        deleteArticleId: string;
      }
    >(
      gql`
        mutation ($deleteArticleId: String!) {
          deleteArticle(id: $deleteArticleId) {
            code
            msg
          }
        }
      `,
      {
        deleteArticleId: id,
      }
    );
    return res?.deleteArticle;
  } catch (error) {}
}
