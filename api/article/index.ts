import { Article, ArticleUpdateInput } from "@/types";
import { Pagination, StatusModel } from "@/types/common";
import gql from "graphql-tag";
import _ from "lodash";
import { query, mutation } from "../request";

export async function getArticleList(limit: number = 10, page: number = 0) {
  let res = await query<{ getArticleList: Pagination<Article> }>(
    gql`
      query getArticleList($limit: Int!, $offset: Int!) {
        getArticleList(limit: $limit, offset: $offset) {
          totalCount
          nodes {
            id
            title
            viewNum
            pic
            summary
            content
            contentNum
            likes
            weight
            isPublic
            createTime
            tags {
              id
              name
            }
          }
        }
      }
    `,
    {
      limit,
      offset:(page - 1) * limit,
    },
    {
      fetchPolicy: "network-only",
    }
  );
  return res.getArticleList;
}

export async function getArticleSticky(limit: number = 10, offset: number = 0) {
  let res = await query<{ getArticleSticky: Pagination<Article> }>(
    gql`
      query GetArticleSticky($input: PaginationQuerInput!) {
        getArticleSticky(input: $input) {
          totalCount
          nodes {
            id
            title
            pic
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
      input: {
        limit,
        offset
      }
    },
    {
      fetchPolicy: "network-only",
    }
  );
  return res.getArticleSticky;
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
          viewNum
          pic
          summary
          content
          contentNum
          likes
          createTime
          updateTime
          tags {
            id
            name
          }
          groups {
            id
            name
            articles {
              id
              title
              pic
              summary
              createTime
            }
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

export async function getArticleByTagId(
  id: string,
  limit: number = 10,
  offset: number = 0
) {
  let res = await query<{ getArticleByTagId: Pagination<Article> }>(
    gql`
      query GetArticleByTagId($id: String!, $pagination: PaginationQuerInput) {
        getArticleByTagId(id: $id, pagination: $pagination) {
          totalCount
          nodes {
            id
            title
            viewNum
            pic
            summary
            likes
            weight
            isPublic
            createTime
            tags {
              id
              name
            }
          }
        }
      }
    `,
    {
      id,
      pagination: {
        limit,
        offset,
      },
    },
    {
      fetchPolicy: "network-only",
    }
  );
  return res.getArticleByTagId;
}
