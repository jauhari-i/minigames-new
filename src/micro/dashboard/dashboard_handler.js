import { OK } from 'http-status'
import { db } from '../../db/mysqlConnection'

export const getDashboard = async (req, res) => {
  const { roles } = req

  const adminCounts = await db
    .query('SELECT COUNT(*) AS total FROM tb_admin WHERE isSuper = 0')
    .then(a => {
      return a[0][0].total
    })
    .catch(() => {
      return 0
    })
  const userCount = await db
    .query('SELECT COUNT(*) AS total FROM tb_users')
    .then(a => {
      return a[0][0].total
    })
    .catch(() => {
      return 0
    })
  const gameCount = await db
    .query('SELECT COUNT(*) AS total FROM tb_game')
    .then(a => {
      return a[0][0].total
    })
    .catch(() => {
      return 0
    })
  const transCount = await db
    .query('SELECT COUNT(*) AS total FROM tb_transaction')
    .then(a => {
      return a[0][0].total
    })
    .catch(() => {
      return 0
    })
  const codeCount = await db
    .query('SELECT COUNT(*) AS total FROM tb_ucode')
    .then(a => {
      return a[0][0].total
    })
    .catch(() => {
      return 0
    })

  return res.status(OK).json({
    code: OK,
    message: 'Get dashboard success',
    data: {
      adminCounts: roles === 1 ? adminCounts : 0,
      userCount,
      gameCount,
      transCount,
      codeCount,
    },
  })
}
