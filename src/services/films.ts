import Swapi from "../lib/Swapi";
import { extractIdFromUrl as getId } from "../utils";
import Comment from "../database/models/Comment";
import { IFilm } from "../dtos";

const swapi = new Swapi();

export const getFilms = async () => {
  const response: IFilm[] = [];

  const films = await swapi.getFilms();

  for (const film of films.results) {
    const filmId = getId(film.url);

    response.push({
      ...film,
      id: filmId!,
      title: film.title,
      releaseDate: film.release_date,
      commentCount: await Comment.count({
        where: { filmId }
      }),
    });
  }

  response.sort((a, b) => {
    return new Date(a.releaseDate).getTime() - new Date(b.releaseDate).getTime()
  });

  return response;
}

export const getFilmById = async (id: number) => {
  const film = await swapi.getFilm(id);
}
