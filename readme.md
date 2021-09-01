## Alkemy Challenge Backend - Nodejs

### API endpoints documentation
* [Postman](https://documenter.getpostman.com/view/16728392/U16dSpHs)

## Endpoints

### Authentication
 * POST auth/login
 * POST /auth/register

### Characters
* GET /api/characters 
  * GET/api/characters?limit
  * GET/api/usuarios?since
* POST api/characters                                 required authentication
* PUT /api/characters/:id                             required authentication
* PUT /api/characters/:id/:movieId                    required authentication
* DELETE /api/characters/:id/:movieId                 required authentication
* DELETE /api/characters/:id                          required authentication

### Movies
* GET /api/movies 
  * GET/api/movies ?limit
  * GET/api/movies ?since
* POST api/movies                                     required authentication
* PUT /api/movies/:id                                 required authentication
* PUT /api/movies/:id/characterId                     required authentication                
* DELETE /api/movies/:id/characterId                  required authentication
* DELETE /api/movies/:id                              required authentication

### Genre
* GET /api/genres
  * GET/api/genres?limit
  * GET/api/genres?since
* POST api/genre                                      required authentication
* PUT /api/movies/:id                                 required authentication
* PUT /api/movies/:id/movieId                         required authentication
* DELETE /api/movies/:id/movieId                      required authentication




