import { FriendsChain, FriendsChianType } from "@/types";
import { Pagination, StatusModel } from "@/types/common";
import gql from "graphql-tag";
import { query, mutation } from "../request";

export const getFriendsChainList = async (limit: number, page: number = 1) => {
  return await query<{
    getFriendsChainList: Pagination<FriendsChain>;
  }>(
    gql`
      query getFriendsChain($getFriendsChainListInput: PaginationQuerInput!) {
        getFriendsChainList(input: $getFriendsChainListInput) {
          nodes {
            id
            name
            link
            imgSrc
          }
          totalCount
        }
      }
    `,
    {
      getFriendsChainListInput: {
        limit,
        offset: (page - 1) * limit,
      },
    },
    {
      fetchPolicy: "cache-and-network",
    }
  );
};

export const deleteFriendsChain = async (id: string) => {
  return await mutation<
    {
      deleteFriendsChain: StatusModel;
    },
    {
      id: string;
    }
  >(
    gql`
      mutation deleteFriendsChain($id: String!) {
        deleteFriendsChain(id: $id) {
          code
          msg
        }
      }
    `,
    {
      id,
    }
  );
};

export const getFirendsTypeList = async () => {
  const res =  await query<{
    getAllType: [FriendsChianType];
  }>(
    gql`
      query getAllTypeList {
        getAllType {
          id
          name
          friendsChains {
            id
            name
            link
            imgSrc
            Introduction
          }
        }
      }
    `,
    {}
  );
  return res.getAllType
};
