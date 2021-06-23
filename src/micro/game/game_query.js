import { db } from '../../db/mysqlConnection'
import { Uploader } from '../../middlewares/UploadImage'
import { v4 as uuid } from 'uuid'
import { CREATED, INTERNAL_SERVER_ERROR, OK } from 'http-status'

const findGame = async (page = 1, size = 10) => {
  return await db
    .query('SELECT count(*) as total FROM tb_game')
    .then(async result => {
      const gameRows = result[0][0].total
      const skip = (page - 1) * size
      const limit = skip + ',' + size
      return await db
        .query(
          'SELECT tb_game.*, tb_image.secure_url FROM tb_game INNER JOIN tb_image ON tb_game.imageId=tb_image.imageId ORDER BY tb_game.createdAt DESC LIMIT ' +
            limit
        )
        .then(res => {
          const row = res[0]

          const data = row.map(item => ({
            gameId: item.gameId,
            gameTitle: item.gameTitle,
            gameDescription: item.gameDescription,
            gamePrice: item.gamePrice,
            gameDiscount: item.gameDiscount,
            gamePriceAfterDisc: item.gamePriceAfterDisc,
            gameDifficulty: item.gameDiff,
            gameDuration: item.gameDuration,
            gameRating: item.gameRating,
            gameUrl: item.gameUrl,
            gameCapacity: item.gameCapacity,
            gameActive: item.gameActive === 0 ? false : true,
            gameGenre: JSON.parse(item.gameGenre),
            gameImage: item.secure_url,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
          }))

          const totalPage = Math.ceil(gameRows / size)

          const meta = {
            page: Number(page),
            size: Number(size),
            totalData: data.length,
            totalPage,
          }

          return {
            code: OK,
            message: 'Get game success',
            data: {
              data,
              meta,
            },
          }
        })
        .catch(() => {
          return {
            code: INTERNAL_SERVER_ERROR,
            message: 'Internal server error',
          }
        })
    })
    .catch(() => {
      return {
        code: INTERNAL_SERVER_ERROR,
        message: 'Internal server error',
      }
    })
}

// const findGameWeb = async userId => {}

const findGameById = async gameId => {}

const insertGame = async data => {
  const {
    title,
    price,
    image,
    rating,
    description,
    discount,
    difficulty,
    capacity,
    duration,
    ready,
    genre,
    url,
  } = data

  const { public_id, secure_url } = await Uploader(image)

  const gameId = uuid()

  const gameGenre = JSON.stringify(genre)

  let discountPrice
  if (discount > 0) {
    let disc = price * (discount / 100)
    discountPrice = price - disc
  } else {
    discountPrice = price
  }

  return await db
    .query('INSERT INTO tb_image (imageId, secure_url) VALUES (?,?)', [
      public_id,
      secure_url,
    ])
    .then(async () => {
      return await db
        .query(
          'INSERT INTO tb_game (gameId, gameTitle, imageId, gameDescription, gamePrice, gameDiscount, gamePriceAfterDisc, gameDiff, gameDuration, gameRating, gameUrl, gameCapacity, gameActive, gameGenre) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
          [
            gameId,
            title,
            public_id,
            description,
            price,
            discount ? discount : 0,
            discountPrice,
            difficulty,
            duration,
            rating,
            url,
            capacity,
            ready === true ? 1 : 0,
            gameGenre,
          ]
        )
        .then(async () => {
          return {
            code: CREATED,
            message: 'Game created',
            data: {
              gameId: gameId,
            },
          }
        })
        .catch(err => {
          return {
            code: INTERNAL_SERVER_ERROR,
            message: 'Internal server error',
            err,
          }
        })
    })
}
// const updateGame = async (gameId, data) => {}

// const deleteGame = async gameId => {}

export { findGame, findGameById, insertGame }
