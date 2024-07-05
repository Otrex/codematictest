import { Router } from "express";
import NodeCache from 'node-cache'
import Comment from "../database/models/Comment";
import { getFilms } from "../services/films";
import { IFilm } from "../dtos";
import { pickFields } from "../utils";



const router = Router();
const cache = new NodeCache({
  checkperiod: 120,
  stdTTL: 100,
});


router.get("/films", async (req, res, next) => {
  try {
    const cachedFilms = cache.get<IFilm[]>("films");

    if (cachedFilms == undefined) {
      const films = await getFilms();
      cache.set("films", films, 2000);
    }

    const films = cache.get<IFilm[]>("films")!

    return res.status(200).json({
      films: pickFields(films, ["id", "title", "releaseDate", "commentCount"]),
    });
  } catch (error) {
    next(error)
  }
});

router.get("/films/:id", async (req, res, next) => {
  try {
    const filmId = +req.params.id
    let cachedFilms = cache.get<IFilm[]>("films")

    if (cachedFilms == undefined) {
      const films = await getFilms();
      cache.set("films", films, 2000);
    }

    const films = cache.get<IFilm[]>("films")!
    const film = films.find(film => film.id === filmId)

    if (!film) {
      return res.status(404).json({ error: "Film not found" })
    }

    const comments = await Comment.findAll({ where: { filmId } })

    return res.status(200).json({
      film, comments
    })
  } catch (error) {
    next(error)
  }
})


router.post('/films/:id/comments', async (req, res, next) => {
  try {
    const filmId = +req.params.id
    const comment = req.body.comment

    if (!comment || comment.length > 500) {
      return res.status(400).json({ error: 'Invalid comment' })
    }

    await Comment.create({ comment, filmId })

    return res.status(201).json({ message: 'Comment added' })
  } catch (error) {
    next(error)
  }
})


router.get('/films/:id/comments', async (req, res, next) => {
  try {
    const comments = await Comment.findAll({
      where: { filmId: +req.params.id },
      order: [['createdAt', 'ASC']]
    });
    return res.json({ comments })
  } catch (error) {
    next(error)
  }
})

router.delete('/films/:filmId/comments/:commentId', async (req, res, next) => {
  try {
    const filmId = +req.params.filmId
    const commentId = +req.params.commentId

    const comment = await Comment.findOne({ where: { id: commentId, filmId } })

    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' })
    }

    await comment.destroy()

    return res.status(200).json({ message: 'Comment deleted' })
  } catch (error) {
    next(error)
  }
})


export default router;