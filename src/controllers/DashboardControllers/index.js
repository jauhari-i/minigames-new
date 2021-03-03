import services from '../../services'
import { handleError } from '../../helpers/error'

const {
  DashboardServices: { GetStatistic },
} = services

const controller = {
  getStatisticHandler: async (req, res) => {
    const { adminId, roles } = req
    const query = await GetStatistic(adminId, roles)
    if (query) {
      if (!query.success) {
        handleError(query, res)
      } else {
        res.status(query.statusCode).json(query)
      }
    } else {
      handleError({ statusCode: 500, message: 'Internal server error' }, res)
    }
  },
}

export { controller }
