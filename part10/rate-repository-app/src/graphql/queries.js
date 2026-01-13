import { gql } from "@apollo/client";

export const GET_REPOSITORIES = gql`
  query GetRepositories {
    repositories {
      edges {
        node {
          id
          fullName
          language
          name
          ownerAvatarUrl
          ratingAverage
          reviewCount
          stargazersCount
          url
          description
          forksCount
        }
      }
    }
  }
`;
