import { useState } from "react";
import { useQuery } from "@apollo/client/react";

import GenreFilter from "./GenreFilter";
import BookTable from "./BookTable";

import { ALL_BOOKS, ALL_BOOKS_BY_GENRE } from "../queries";

const Books = (props) => {
  const [filteredGenre, setFilteredGenre] = useState(null);

  const fullResult = useQuery(ALL_BOOKS);

  const filteredResult = useQuery(ALL_BOOKS_BY_GENRE, {
    variables: { genre: filteredGenre },
    skip: !filteredGenre,
  });

  if (!props.show) {
    return null;
  }

  if (fullResult.loading || filteredResult.loading) {
    return <div>loading...</div>;
  }

  const allBooks = fullResult.data.allBooks;
  const possibleGenres = [...new Set(allBooks.flatMap((b) => b.genres))];

  const filteredBooks = filteredGenre ? filteredResult.data.allBooks : allBooks;

  return (
    <div>
      <h2>books</h2>

      {filteredGenre && (
        <p>
          in genre <b>{filteredGenre}</b>
        </p>
      )}

      <BookTable books={filteredBooks} />

      <GenreFilter
        setFilteredGenre={setFilteredGenre}
        genres={possibleGenres}
      />
    </div>
  );
};

export default Books;
