import {
  LiveShared,
  LiveSharedCreateInput,
  LiveSharedUpdateInput,
} from "@/types";
import { Pagination, StatusModel } from "@/types/common";
import gql from "graphql-tag";
import { mutation, query } from "../request";

export async function getLiveSharedList(
  limit: number = 10,
  offset: number = 0
) {
  const res = await query<{
    getLiveSharedList: Pagination<LiveShared>;
  }>(
    gql`
      query GetLiveSharedList($paginationQuery: PaginationQuerInput!) {
        getLiveSharedList(paginationQuery: $paginationQuery) {
          totalCount
          nodes {
            id
            content
            address
            emotion
            illustration
            weight
            createTime
            updateTime
            tags {
              id
              name
            }
          }
        }
      }
    `,
    {
      paginationQuery: {
        limit,
        offset,
      },
    },
    {
      fetchPolicy: "network-only",
    }
  );

  return res.getLiveSharedList;
}

export async function getLiveSharedById(id: string) {
  const res = await query<{
    getLiveSharedById: LiveShared;
  }>(
    gql`
      query ($id: String!) {
        getLiveSharedById(id: $id) {
          id
          content
          address
          emotion
          illustration
          weight
          tags {
            id
            name
          }
        }
      }
    `,
    {
      id
    },
    {
      fetchPolicy: "network-only",
    }
  );

  return res.getLiveSharedById;
}

export async function createLiveShared(input: LiveSharedCreateInput) {
  const res = await mutation<
    {
      createLiveShared: StatusModel;
    },
    {
      input: LiveSharedCreateInput;
    }
  >(
    gql`
      mutation ($input: CreateLiveSharedInput!) {
        createLiveShared(createLiveShared: $input) {
          code
          msg
        }
      }
    `,
    {
      input,
    }
  );
  return res?.createLiveShared;
}

export async function updateLiveShared(input: LiveSharedUpdateInput) {
  const res = await mutation<
    {
      updateLiveShared: StatusModel;
    },
    {
      input: LiveSharedUpdateInput;
    }
  >(
    gql`
      mutation ($input: UpdateLiveSharedInput!) {
        updateLiveShared(updateLiveShared: $input) {
          code
          msg
        }
      }
    `,
    {
      input,
    }
  );
  return res?.updateLiveShared;
}

export async function deleteLiveShared(id: string) {
  const res = await mutation<
    {
      deleteLiveShared: StatusModel;
    },
    {
      deleteLiveSharedId: string;
    }
  >(
    gql`
      mutation ($deleteLiveSharedId: String!) {
        deleteLiveShared(id: $deleteLiveSharedId) {
          code
          msg
        }
      }
    `,
    {
      deleteLiveSharedId: id,
    }
  );
  return res?.deleteLiveShared;
}
