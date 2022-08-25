import { Pagination, StatusModel } from "@/types";
import gql from "graphql-tag";
import { query, mutation } from "../request";

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
