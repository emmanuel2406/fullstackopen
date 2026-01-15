import { useState } from "react";
import { Text, TextInput, Pressable, View } from "react-native";
import {
  fireEvent,
  render,
  screen,
  within,
} from "@testing-library/react-native";
import { RepositoryListContainer } from "../../components/RepositoryList";

describe("RepositoryList", () => {
  describe("RepositoryListContainer", () => {
    it("renders repository information correctly", () => {
      const repositories = {
        totalCount: 8,
        pageInfo: {
          hasNextPage: true,
          endCursor:
            "WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==",
          startCursor: "WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd",
        },
        edges: [
          {
            node: {
              id: "jaredpalmer.formik",
              fullName: "jaredpalmer/formik",
              description: "Build forms in React, without the tears",
              language: "TypeScript",
              forksCount: 1619,
              stargazersCount: 21856,
              ratingAverage: 88,
              reviewCount: 3,
              ownerAvatarUrl:
                "https://avatars2.githubusercontent.com/u/4060187?v=4",
            },
            cursor: "WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd",
          },
          {
            node: {
              id: "async-library.react-async",
              fullName: "async-library/react-async",
              description: "Flexible promise-based React data loader",
              language: "JavaScript",
              forksCount: 69,
              stargazersCount: 1760,
              ratingAverage: 72,
              reviewCount: 3,
              ownerAvatarUrl:
                "https://avatars1.githubusercontent.com/u/54310907?v=4",
            },
            cursor:
              "WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==",
          },
        ],
      };

      render(<RepositoryListContainer repositories={repositories} />);

      const repositoryItems = screen.getAllByTestId("repositoryItem");
      const [firstRepositoryItem, secondRepositoryItem] = repositoryItems;

      const firstRepositoryItemName =
        within(firstRepositoryItem).getByTestId("repositoryFullName");
      expect(firstRepositoryItemName).toHaveTextContent("jaredpalmer/formik");
      const firstRepositoryItemDescription = within(
        firstRepositoryItem
      ).getByTestId("repositoryDescription");
      expect(firstRepositoryItemDescription).toHaveTextContent(
        "Build forms in React, without the tears"
      );
      const firstRepositoryItemLanguage =
        within(firstRepositoryItem).getByTestId("repositoryLanguage");
      expect(firstRepositoryItemLanguage).toHaveTextContent("TypeScript");
      const firstRepositoryItemStargazersCount = within(
        firstRepositoryItem
      ).getByTestId("repositoryStargazersCount");
      expect(firstRepositoryItemStargazersCount).toHaveTextContent("21.9k");
      const firstRepositoryItemForksCount = within(
        firstRepositoryItem
      ).getByTestId("repositoryForksCount");
      expect(firstRepositoryItemForksCount).toHaveTextContent("1.6k");
      const firstRepositoryItemReviewCount = within(
        firstRepositoryItem
      ).getByTestId("repositoryReviewCount");
      expect(firstRepositoryItemReviewCount).toHaveTextContent("3");
      const firstRepositoryItemRatingAverage = within(
        firstRepositoryItem
      ).getByTestId("repositoryRatingAverage");
      expect(firstRepositoryItemRatingAverage).toHaveTextContent("88");

      const secondRepositoryItemName =
        within(secondRepositoryItem).getByTestId("repositoryFullName");
      expect(secondRepositoryItemName).toHaveTextContent(
        "async-library/react-async"
      );
      const secondRepositoryItemDescription = within(
        secondRepositoryItem
      ).getByTestId("repositoryDescription");
      expect(secondRepositoryItemDescription).toHaveTextContent(
        "Flexible promise-based React data loader"
      );
      const secondRepositoryItemStargazersCount = within(
        secondRepositoryItem
      ).getByTestId("repositoryStargazersCount");
      expect(secondRepositoryItemStargazersCount).toHaveTextContent("1.8k");
      const secondRepositoryItemLanguage =
        within(secondRepositoryItem).getByTestId("repositoryLanguage");
      expect(secondRepositoryItemLanguage).toHaveTextContent("JavaScript");
      const secondRepositoryItemForksCount = within(
        secondRepositoryItem
      ).getByTestId("repositoryForksCount");
      expect(secondRepositoryItemForksCount).toHaveTextContent("69");
      const secondRepositoryItemReviewCount = within(
        secondRepositoryItem
      ).getByTestId("repositoryReviewCount");
      expect(secondRepositoryItemReviewCount).toHaveTextContent("3");
      const secondRepositoryItemRatingAverage = within(
        secondRepositoryItem
      ).getByTestId("repositoryRatingAverage");
      expect(secondRepositoryItemRatingAverage).toHaveTextContent("72");
    });
  });
});
