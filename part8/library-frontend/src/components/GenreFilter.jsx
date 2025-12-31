const GenreFilter = ({ setFilteredGenre, genres }) => {
  return (
    <>
      {genres.map((genre) => (
        <button key={genre} onClick={() => setFilteredGenre(genre)}>
          {genre}
        </button>
      ))}
      <button onClick={() => setFilteredGenre(null)}>all genres</button>
    </>
  );
};

export default GenreFilter;
