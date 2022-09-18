import { query, mutation } from "../request";
import gql from "graphql-tag";
import { Multimedia, Pagination, StatusModel } from "@/types";
import {
  MultimediaCreateInput,
  MultimediaUpdateInput,
} from "@/types/input/multimedia";

export async function getMultimediaList(
  limit: number = 10,
  offset: number = 0,
  typeName?: string
) {
  let res = await query<{ getMultimediaList: Pagination<Multimedia> }>(
    gql`
      query GetMultimediaList($input: PaginationQuerInput, $typeName: String) {
        getMultimediaList(input: $input, typeName: $typeName) {
          totalCount
          nodes {
            id
            title
            author
            path
            cover
            format
            outerLink
            weight
            createTime
            updateTime
            tags {
              id
              name
              createTime
            }
            type {
              id
              name
              nameEn
            }
          }
        }
      }
    `,
    {
      input: {
        limit,
        offset,
      },
      typeName
    },
    {
      fetchPolicy: "network-only",
    }
  );
  return res.getMultimediaList;
}

export async function getMultimediaById(id: string) {
  let res = await query<{ getMultimediaById: Multimedia }>(
    gql`
      query GetMultimediaById($id: String!) {
        getMultimediaById(id: $id) {
          id
          title
          author
          path
          cover
          format
          outerLink
          weight
          createTime
          updateTime
          tags {
            id
            name
            createTime
          }
          type {
            id
            name
            nameEn
            describe
            createTime
          }
        }
      }
    `,
    {
      id,
    },
    {
      fetchPolicy: "network-only",
    }
  );
  return res.getMultimediaById;
}

export async function createMultimedia(input: MultimediaCreateInput) {
  try {
    let res = await mutation<
      {
        createMultimedia: StatusModel;
      },
      {
        input: MultimediaCreateInput;
      }
    >(
      gql`
        mutation CreateMultimedia($input: MultimediaCreateInput!) {
          createMultimedia(input: $input) {
            code
            msg
          }
        }
      `,
      {
        input,
      }
    );
    return res?.createMultimedia;
  } catch (error) {}
}

export async function updateMultimedia(input: MultimediaUpdateInput) {
  try {
    let res = await mutation<
      {
        updateMultimedia: StatusModel;
      },
      {
        input: MultimediaUpdateInput;
      }
    >(
      gql`
        mutation UpdateMultimedia($input: MultimediaUpdateInput!) {
          updateMultimedia(input: $input) {
            code
            msg
          }
        }
      `,
      {
        input,
      }
    );
    return res?.updateMultimedia;
  } catch (error) {}
}

export async function deleteMultimedia(id: string) {
  try {
    let res = await mutation<
      {
        deleteMultimedia: StatusModel;
      },
      {
        id: string;
      }
    >(
      gql`
        mutation DeleteMultimedia($id: String!) {
          deleteMultimedia(id: $id) {
            code
            msg
          }
        }
      `,
      {
        id,
      }
    );
    return res?.deleteMultimedia;
  } catch (error) {}
}
