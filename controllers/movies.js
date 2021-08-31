const moviesList = async (req, res = response) => {
  res.json({ msg: "Movies list" });
};

const movieDetails = async (req, res = response) => {
  res.json({ msg: "Movie details" });
};

const createMovie = async (req, res = response) => {
  res.json({ msg: "Create Movie" });
};

const updateMovie = async (req, res = response) => {
  res.json({ msg: "Update Movie" });
};

const deleteMovie = async (req, res = response) => {
  res.json({ msg: "Delete Movie" });
};
