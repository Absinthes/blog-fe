import type {
  Pagination,
  StatusModel,
  Comment,
  CommentTypeEnum,
  EditForm,
} from "@/types";
import gql from "graphql-tag";
import { query, mutation } from "../request";
import { browserRedirect, getBrowser } from "~~/utils/tools";
import { createCommentInput } from "~~/types/dtos";

export const getCommnet = async (offset: number = 1, limit: number = 10) => {
  return await query<{ getCommentByRoot: Pagination<Comment> }>(
    gql`
      query ($input: PaginationQuerInput!) {
        getCommentByRoot(input: $input) {
          nodes {
            id
            name
            content
            email
            likes
            visible
            hasChildren
            createTime
            type
            article {
              id
              title
            }
            children: childComment {
              id
              name
              content
              email
              likes
              visible
              createTime
              type
              article {
                id
              }
              parentComment {
                id
              }
            }
          }
          totalCount
        }
      }
    `,
    {
      input: {
        offset,
        limit,
      },
    },
    {
      fetchPolicy: "cache-and-network",
    }
  );
};

export const switchCommentVisible = async (id: string, visible: boolean) => {
  return mutation<
    {
      updateComment: StatusModel;
    },
    {
      update: {
        id: string;
        visible: boolean;
      };
    }
  >(
    gql`
      mutation switchCommentVisible($update: updateCommentInput!) {
        updateComment(comment: $update) {
          code
          msg
        }
      }
    `,
    {
      update: {
        id,
        visible,
      },
    }
  );
};

export const deleteComment = async (id: string) => {
  return mutation<
    {
      deleteComment: StatusModel;
    },
    {
      deleteCommentId: string;
    }
  >(
    gql`
      mutation ($deleteCommentId: String!) {
        deleteComment(id: $deleteCommentId) {
          code
          msg
        }
      }
    `,
    {
      deleteCommentId: id,
    }
  );
};

export const getCommentByArticleId = async (id: string,page:number,limit:number = 10) => {
  const res = await query<{
    getCommentByArticleId: Pagination<Comment>;
  }>(
    gql`
      query getCommnetByArticleId($ariticleId: String!,$pagination: PaginationQuerInput!) {
        getCommentByArticleId(ariticleId: $ariticleId, pagination: $pagination) {
          nodes {
            id
            name
            content
            email
            createTime
            likes
            browser
            envirconment
            children: childComment {
              id
              name
              content
              email
              createTime
              likes
              browser
              envirconment
              parentComment {
                id
                name
                content
                email
                createTime
                likes
                browser
                envirconment
              }
            }
          }
          totalCount
        }
      }
    `,
    {
      ariticleId: id,
      pagination:{
        offset:(page - 1) * limit,
        limit
      }
    },
    {
      fetchPolicy:"network-only"
    }
  );
  return res.getCommentByArticleId;
};

export const addComment = async (
  type: CommentTypeEnum,
  form: EditForm,
  ariticleId?: string,
  rootComment?: string,
  parentComment?: string
) => {
  const browser = getBrowser()[0];
  const envirconment = browserRedirect();
  const { link, ...rest } = form;
  const res = await mutation<
    {
      addComment: StatusModel;
    },
    {
      comment: createCommentInput;
    }
  >(
    gql`
      mutation addComment($comment: createCommentInput!) {
        createComment(comment: $comment) {
          code
          msg
        }
      }
    `,
    {
      comment: {
        browser,
        envirconment,
        ...rest,
        type,
        article: ariticleId,
        rootComment,
        parentComment,
      },
    }
  );
};
