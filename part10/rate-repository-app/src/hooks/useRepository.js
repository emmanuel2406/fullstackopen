import { useQuery } from "@apollo/client/react";

import { GET_REPOSITORY } from "../graphql/queries";

const useRepository = (id, first) => {
  const variables = { id, first };
  const { data, loading, fetchMore, ...result } = useQuery(GET_REPOSITORY, {
    fetchPolicy: "cache-and-network",
    variables,
  });

  const handleFetchMore = () => {
    const canFetchMore =
      !loading && data?.repository.reviews.pageInfo.hasNextPage;
    if (!canFetchMore) {
      return;
    }
    fetchMore({
      variables: {
        ...variables,
        after: data.repository.reviews.pageInfo.endCursor,
      },
    });
  };

  return {
    repository: data?.repository,
    fetchMore: handleFetchMore,
    ...result,
  };
};

export default useRepository;
