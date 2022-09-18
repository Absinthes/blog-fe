import { CreateOrUpdatePhotoInput, PhotoWall } from "@/types";
import { Pagination, StatusModel } from "@/types/common";
import gql from "graphql-tag";
import { mutation, query } from "../request";

export async function getPhotoWallList(limit: number = 10, offset: number = 0) {
  let res = await query<{
    getPhotoWallList: Pagination<PhotoWall>;
  }>(
    gql`
      query GetPhotoWallList($input: PaginationQuerInput!) {
        getPhotoWallList(input: $input) {
          totalCount
          nodes {
            id
            name
            path
            originUrl
            author
            createTime
            tags {
              id
              name
            }
            type {
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
        offset,
      },
    },
    {
      fetchPolicy: "network-only",
    }
  );
  return res.getPhotoWallList;
}

export async function addPhotoWall(input: CreateOrUpdatePhotoInput) {
  return await mutation<{
    addPhotoToWall: StatusModel;
  }>(
    gql`
      mutation addPhoto($createPhotoInput: CreatePhotoInput!) {
        addPhotoToWall(createPhotoInput: $createPhotoInput) {
          code
          msg
        }
      }
    `,
    {
      createPhotoInput: input,
    }
  );
}

export async function updatePhotoWall(input: CreateOrUpdatePhotoInput) {
  return await mutation<{
    updatePhotoWall: StatusModel;
  }>(
    gql`
      mutation updatePhoto($input: UpdatePhotoWallInput!) {
        updatePhotoWall(updateInput: $input) {
          code
          msg
        }
      }
    `,
    {
      input,
    }
  );
}

export async function deletePhotoWall(id: string) {
  return await mutation<{
    deletePhoto:StatusModel
  }>(
    gql`
      mutation deletePhoto($deletePhotoWallId: String!) {
        deletePhotoWall(id: $deletePhotoWallId) {
          code
          msg
        }
      }
    `,
    {
      deletePhotoWallId:id
    }
  );
}
