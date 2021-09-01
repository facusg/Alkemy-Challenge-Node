## Alkemy Challenge Backend - Nodejs

### API endpoint documentation
* [Postman](https://documenter.getpostman.com/view/16728392/U16dSpHs)

## Endpoints

### Authentication
 * POST auth/login
 * POST /auth/register

### Characters
* GET /api/characters 
  * GET/api/characters?limit
  * GET/api/usuarios?since
* POST api/characters
* PUT /api/characters/:id
* PUT /api/characters/:id/:movieId
* DELETE /api/characters/:id/:movieId
* DELETE /api/characters/:id

### Movies
* GET /api/movies 
  * GET/api/movies ?limit
  * GET/api/movies ?since
* POST api/movies 
* PUT /api/movies/:id
* PUT /api/movies/:id/characterId
* DELETE /api/movies/:id/characterId
* DELETE /api/movies/:id

### Genre
* GET /api/genres
  * GET/api/genres?limit
  * GET/api/genres?since
* POST api/genre 
* PUT /api/movies/:id
* PUT /api/movies/:id/movieId
* DELETE /api/movies/:id/movieId




