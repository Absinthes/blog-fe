import { Pagination, StatusModel, Type } from "@/types";
import gql from "graphql-tag";
import { query, mutation } from "../request";

export const getType = async (offset?: number, limit?: number) => {
  let res = await query<{
    getTypeByRoot: Pagination<Type>;
  }>(
    gql`
      query getType($getTypeByRootInput2: PaginationQuerInput!) {
        getTypeByRoot(input: $getTypeByRootInput2) {
          nodes {
            id
            name
            createTime
            rootType {
              id
              name
            }
            parentType {
              id
              name
            }
            children: childType {
              ...typeFields
            }
            hasChildren
          }
          totalCount
        }
      }

      fragment typeFields on Type {
        id
        name
        createTime
        rootType {
          id
          name
        }
        parentType {
          id
          name
        }
        children: childType {
          id
          name
          createTime
          rootType {
            id
            name
          }
          parentType {
            id
            name
          }
        }
      }
    `,
    {
      getTypeByRootInput2: {
        limit,
        offset,
      },
    },
    {
      fetchPolicy: "cache-and-network",
    }
  );
  return res.getTypeByRoot;
};

export const deleteType = async (id: string) => {
  return mutation<
    {
      deleteType: StatusModel;
    },
    {
      deleteTypeId: string;
    }
  >(
    gql`
      mutation deleteType($deleteTypeId: String!) {
        deleteType(id: $deleteTypeId) {
          code
          msg
        }
      }
    `,
    {
      deleteTypeId: id,
    }
  );
};

export const createType = async ({ name, parentType, rootType }: Type) => {
  return await mutation<{
    createType: StatusModel;
  }>(
    gql`
      mutation createType($input: createTypeInput!) {
        createType(input: $input) {
          code
          msg
        }
      }
    `,
    {
      input: {
        name,
        parentType: parentType?.id ?? null,
        rootType: rootType?.id ?? null,
      },
    }
  );
};

export const updateType = async ({ name, id }: Type) => {
  return await mutation<{
    updateType: StatusModel;
  }>(
    gql`
      mutation updateType($input: updateTypeInput!) {
        updateType(input: $input) {
          code
          msg
        }
      }
    `,
    {
      input: {
        name,
        id,
      },
    }
  );
};

export const getTypeByName = async (name: string) => {
  const res = await query<{
    getTypeByNameAndRoot: Type;
  }>(
    gql`
      query GetTypeByNameAndRoot($name: String!) {
        getTypeByNameAndRoot(name: $name) {
          id
          name
          nameEn
          describe
          createTime
          childType {
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
      name,
    },
    {
      fetchPolicy: "cache-and-network",
    }
  );
  return res.getTypeByNameAndRoot
};
