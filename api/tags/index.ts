import { Tag, TagsCreateInput, TagType } from "@/types";
import { Pagination, StatusModel } from "@/types/common";
import gql from "graphql-tag";
import { mutation, query } from "../request";

export async function getAllTag(type: TagType) {
  const res = await query<{
    getAllTag: Tag[];
  }>(
    gql`
      query GetAllTag($type: Float!) {
        getAllTag(type: $type) {
          id
          name
          createTime
          articles {
            id
          }
        }
      }
    `,
    {
      type,
    },
    {
      fetchPolicy: "network-only",
    }
  );
  return res.getAllTag;
}

export async function getTagList(
  limit: number = 10,
  offset: number = 0,
  type?: TagType | null,
  tagName?: string
) {
  const res = await query<{
    getTagsList: Pagination<Tag>;
  }>(
    gql`
      query GetTagsList(
        $paginationQuery: PaginationQuerInput!
        $type: Int
        $tagName: String
      ) {
        getTagsList(
          paginationQuery: $paginationQuery
          type: $type
          name: $tagName
        ) {
          totalCount
          nodes {
            id
            type
            name
            nameEn
            weight
            createTime
          }
        }
      }
    `,
    {
      paginationQuery: {
        limit,
        offset,
      },
      type,
      tagName,
    },
    {
      fetchPolicy: "network-only",
    }
  );
  return res.getTagsList;
}

export async function createTag(input: TagsCreateInput) {
  try {
    const res = await mutation<
      {
        createTag: StatusModel;
      },
      {
        input: TagsCreateInput;
      }
    >(
      gql`
        mutation CreateTag($input: TagsCreateInput!) {
          createTag(input: $input) {
            code
            msg
          }
        }
      `,
      {
        input,
      }
    );
    return res?.createTag;
  } catch (error) {}
}

export async function deleteTag(id: string) {
  const res = await mutation<
    {
      deleteTag: StatusModel;
    },
    {
      deleteTagId: string;
    }
  >(
    gql`
      mutation ($deleteTagId: String!) {
        deleteTag(id: $deleteTagId) {
          code
          msg
        }
      }
    `,
    {
      deleteTagId: id,
    }
  );

  return res?.deleteTag;
}

export async function updateTag(tag: Tag) {
  try {
    const res = await mutation<
      {
        updateTag: StatusModel;
      },
      {
        updateTagInput: Tag;
      }
    >(
      gql`
        mutation ($updateTagInput: TagsUpdateInput!) {
          updateTag(input: $updateTagInput) {
            code
            msg
          }
        }
      `,
      {
        updateTagInput: tag,
      }
    );

    return res?.updateTag;
  } catch (error) {}
}

export async function getTagByNameVague(name: string) {
  return await query<{
    getTagByVagueName: Tag[];
  }>(
    gql`
      query getTagByVo($name: String!) {
        getTagByVagueName(name: $name) {
          id
          value: name
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
}
