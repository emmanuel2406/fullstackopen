import { useQuery } from "@apollo/client/react";

import BookTable from "./BookTable";

import { ALL_BOOKS_BY_GENRE, ME } from "../queries";

const Recommendations = ({ show }) => {
  const meResult = useQuery(ME);
  const booksResult = useQuery(ALL_BOOKS_BY_GENRE, {
    variables: { genre: meResult.data?.me?.favoriteGenre },
    skip: !meResult.data?.me?.favoriteGenre,
  });

  if (!show) {
    return null;
  }

  if (booksResult.loading || meResult.loading) {
    return <div>loading...</div>;
  }
  const books = booksResult.data.allBooks;
  const favoriteGenre = meResult.data.me.favoriteGenre;
  return (
    <div>
      <h2>recommendations</h2>
      <p>
        books in your favorite genre <b>{favoriteGenre}</b>
      </p>
      <BookTable books={books} />
    </div>
  );
};

export default Recommendations;
