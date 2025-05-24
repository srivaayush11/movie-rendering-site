const getMovies = async (category, pageNumber = 1, limit = 20) => {
  try {
    const startIndex = (pageNumber - 1) * limit;
    const endIndex = pageNumber * limit;
    const result = await import(`../../data/api${category}.js`);
    const paginatedItems = result.movie.slice(startIndex, endIndex);
    console.info("paginatedItems", {
      data: paginatedItems,
      total: result.length,
      page: pageNumber,
      limit: limit,
    });
    return {
      data: paginatedItems,
      total: result.length,
      page: pageNumber,
      limit: limit,
    };
  } catch (err) {
    console.log(err);
  }
};

const getSingleMovie = async (id, category) => {
  try {
    const movieId = parseInt(id);
    const response = await import(`../../data/api${category}.js`);
    const result = response.movie.find((movieList) => movieList.id === movieId);
    return result;
  } catch (err) {
    console.log(err);
  }
};

export { getMovies, getSingleMovie };
