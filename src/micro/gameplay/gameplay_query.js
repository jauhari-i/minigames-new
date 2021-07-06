import {
  BAD_REQUEST,
  CREATED,
  INTERNAL_SERVER_ERROR,
  NOT_FOUND,
  OK,
} from 'http-status'
import { db } from '../../db/mysqlConnection'
import { v4 as uuid } from 'uuid'
import moment from 'moment'

var mysqlTimestamp = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')

export const joinQuery = async (userId, uCode) => {
  if (uCode === 'InFinite') {
    return {
      code: OK,
      message: 'Join game success',
      data: {
        codeId: uuid(),
        gameId: uuid(),
        userId,
        members: [],
        playingDate: mysqlTimestamp,
        uniqueCode: uCode,
        owner: {},
      },
    }
  } else {
    return await db
      .query('SELECT * FROM tb_code WHERE uniqueCode = ?', [uCode])
      .then(async codes => {
        const codeRow = codes[0]

        if (!codeRow.length) {
          return {
            code: NOT_FOUND,
            message: 'Code not found',
          }
        } else {
          return await db
            .query(
              'SELECT * FROM tb_transaction_item INNER JOIN tb_game ON tb_transaction_item.gameId = tb_game.gameId WHERE trItemId = ?',
              [codeRow[0].trItemId]
            )
            .then(async trItem => {
              const trItems = trItem[0]

              const main = await db
                .query(
                  'SELECT tb_members.*, tb_users.name, tb_users.email, tb_users.username FROM tb_members INNER JOIN tb_users ON tb_members.userId=tb_users.userId WHERE itemId = ?',
                  [trItems[0].itemId]
                )
                .then(res => {
                  const memRow = res[0]
                  const usersId = memRow.map(m => m.userId)
                  const member = memRow.map(m => ({
                    memberId: m.memberId,
                    userId: m.userId,
                    name: m.name,
                    email: m.email,
                    username: m.username,
                  }))
                  return { usersId, member }
                })
                .catch(() => {
                  return { usersId: [], member: [] }
                })

              const { member, usersId } = main

              if (usersId.includes(userId)) {
                const myGame = await db
                  .query(
                    'SELECT tb_user_game.*, tb_users.name, tb_users.email, tb_users.username FROM tb_user_game INNER JOIN tb_users ON tb_user_game.userId=tb_users.userId WHERE codeId = ?',
                    [codeRow[0].codeId]
                  )
                  .then(mg => {
                    return mg[0]
                  })
                  .catch(() => {
                    return []
                  })

                if (myGame[0].isExpired === 1) {
                  return {
                    code: BAD_REQUEST,
                    message: 'Code is expired',
                  }
                } else if (myGame[0].isPlayed === 1) {
                  return {
                    coed: BAD_REQUEST,
                    message: 'Code is played',
                  }
                } else {
                  const itemsDetail = await db
                    .query(
                      'SELECT timeStart, timeEnd FROM tb_items WHERE itemId = ?',
                      [trItems[0].itemId]
                    )
                    .then(i => {
                      return i[0][0]
                    })
                    .catch(() => {
                      return {}
                    })

                  const today = new Date()

                  const date = today.getDate()
                  const h = today.getHours() * 60

                  const playDt = new Date(myGame[0].playingDate)

                  const pDate = playDt.getDate()
                  const pStart = itemsDetail.timeStart * 60
                  const pEnd = itemsDetail.timeEnd * 60

                  if (date !== pDate) {
                    return {
                      code: BAD_REQUEST,
                      message: `Code only can be played at ${moment(
                        playDt
                      ).format('ll')}`,
                    }
                  } else {
                    const canPlay = pStart <= h && h <= pEnd

                    if (canPlay) {
                      await db.query(
                        'UPDATE tb_user_game SET ? WHERE mgId = ?',
                        [{ isPlayed: 1 }, myGame[0].mgId]
                      )
                      const data = {
                        codeId: codeRow[0].codeId,
                        gameId: trItems[0].gameId,
                        userId,
                        members: member,
                        playingDate: myGame[0].playingDate,
                        uniqueCode: uCode,
                        owner: {
                          userId: myGame[0].userId,
                          name: myGame[0].name,
                          email: myGame[0].email,
                          username: myGame[0].username,
                        },
                      }
                      return {
                        code: OK,
                        message: 'Join game success',
                        data: data,
                      }
                    } else {
                      return {
                        code: BAD_REQUEST,
                        message: `Code only can be played at ${
                          pStart / 60 === 9 ? '09' : pStart / 60
                        }.00 - ${pEnd / 60}.00`,
                      }
                    }
                  }
                }
              } else {
                return {
                  code: BAD_REQUEST,
                  message: 'You are not the members of this code',
                }
              }
            })
            .catch(err => {
              console.log(err)
              return {
                code: INTERNAL_SERVER_ERROR,
                message: 'Internal server error',
              }
            })
        }
      })
      .catch(err => {
        console.log(err)
        return {
          code: INTERNAL_SERVER_ERROR,
          message: 'Internal server error',
        }
      })
  }
}
export const saveQuery = async (userId, data) => {
  if (data.uniqueCode === 'InFinite') {
    return {
      code: CREATED,
      message: 'Game progress saved',
    }
  } else {
    return await db
      .query('SELECT * FROM tb_code WHERE uniqueCode = ?', [data.uniqueCode])
      .then(async c => {
        const codes = c[0]
        if (!codes[0].length) {
          return {
            code: NOT_FOUND,
            message: 'Code not found',
          }
        } else {
          return await db
            .query('SELECT * FROM tb_user_game WHERE codeId = ?', [
              codes[0].codeId,
            ])
            .then(async uGame => {
              const userGame = uGame[0]

              const leaderboardId = uuid()

              return await db
                .query(
                  'INSERT INTO tb_leaderboard (leaderboardId, mgId, teamName, teamIcon, score, userId) VALUES (?,?,?,?,?,?)',
                  [
                    leaderboardId,
                    userGame[0].mgId,
                    data.teamName,
                    data.teamIcon,
                    data.time,
                    userId,
                  ]
                )
                .then(() => {
                  return {
                    code: CREATED,
                    message: 'Save game success',
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
      })
      .catch(() => {
        return {
          code: INTERNAL_SERVER_ERROR,
          message: 'Internal server error',
        }
      })
  }
}
