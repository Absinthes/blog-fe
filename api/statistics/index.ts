import gql from "graphql-tag";
import type {
  Article,
  StatisticsArticle,
  StatisticsArticleByMonth,
} from "~~/types";
import { query, mutation } from "../request";

export const statisticsArticleByYear = async () => {
  const res = await query<{
    statisArticleByYear: StatisticsArticle[];
  }>(
    gql`
      query statisArticleByYear {
        statisArticleByYear {
          year
          length
        }
      }
    `,
    {}
  );
  return res.statisArticleByYear;
};

export const statisticsArticleByMonth = async () => {
  const res = await query<{
    statisArticleByMonth: StatisticsArticleByMonth[];
  }>(
    gql`
      query StatisticsArticleByMonth {
        statisArticleByMonth {
          year
          data {
            month
            data {
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
      }
    `,
    {}
  );
  return res.statisArticleByMonth;
};
