import { Group, GroupCreateInput, GroupUpdateInput } from "@/types";
import { Pagination, StatusModel } from "@/types/common";
import gql from "graphql-tag";
import _ from "lodash";
import { query, mutation } from "../request";

export async function getGroupList(limit: number = 10, offset: number = 0) {
  let res = await query<{ getGroupList: Pagination<Group> }>(
    gql`
      query GetGroupList($input: PaginationQuerInput!) {
        getGroupList(input: $input) {
          totalCount
          nodes {
            id
            name
            nameEn
            createTime
            articles {
              id
              title
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
      fetchPolicy: "cache-and-network",
    }
  );
  return res.getGroupList;
}

export async function createGroup(input: GroupCreateInput) {
  try {
    let res = await mutation<
      {
        createGroup: StatusModel;
      },
      {
        input: GroupCreateInput;
      }
    >(
      gql`
        mutation ($input: GroupCreateInput!) {
          createGroup(input: $input) {
            code
            msg
          }
        }
      `,
      {
        input,
      }
    );
    return res?.createGroup;
  } catch (error) {}
}

export async function updateGroup(input: GroupUpdateInput) {
  try {
    let res = await mutation<
      {
        updateGroup: StatusModel;
      },
      {
        input: GroupCreateInput;
      }
    >(
      gql`
        mutation ($input: GroupUpdateInput!) {
          updateGroup(input: $input) {
            code
            msg
          }
        }
      `,
      {
        input,
      }
    );
    return res?.updateGroup;
  } catch (error) {}
}

export async function deteleGroup(id: number) {
  try {
    let res = await mutation<
      {
        deleteGroup: StatusModel;
      },
      {
        deleteGroupId: number;
      }
    >(
      gql`
        mutation ($deleteGroupId: ID!) {
          deleteGroup(id: $deleteGroupId) {
            code
            msg
          }
        }
      `,
      {
        deleteGroupId: id,
      }
    );
    return res?.deleteGroup;
  } catch (error) {}
}
