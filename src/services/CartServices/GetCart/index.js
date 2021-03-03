import Cart from '../../../models/Cart'
import { v4 as uuid } from 'uuid'
import Items from '../../../models/Items'
import Game from '../../../models/Game'
import User from '../../../models/Users'

const GetCart = async userId => {
  try {
    const userCart = await Cart.findOne({ userId })
    if (!userCart) {
      const newCart = await Cart.create({
        cartId: uuid(),
        items: [],
        total: 0,
        userId,
      })
      if (newCart) {
        return {
          statusCode: 200,
          message: 'Get Cart success',
          data: {
            cartId: newCart.cartId,
            items: newCart.items,
            total: newCart.total,
            userId: newCart.userId,
          },
          success: true,
        }
      } else {
        throw {
          success: false,
          statusCode: 500,
          message: 'Internal server error',
        }
      }
    } else {
      const { items } = userCart
      if (items.length) {
        const itemsData = await Promise.all(
          items.map(async itemId => {
            const item = await Items.findOne({ itemId: itemId })
            const game = await Game.findOne({ gameId: item.gameId })

            const members = item.itemMembers

            const member = await User.find({ userId: { $in: members } })

            const memberData = member.map(item => ({
              userId: item.userId,
              username: item.username,
              name: item.name,
              email: item.email,
              image: item.userImage.secure_url,
            }))

            if (!game) {
              return null
            } else {
              return {
                itemId: item.itemId,
                gameId: game.gameId,
                playingDate: item.datePlay,
                timeStart: item.timeStart,
                timeEnd: item.timeEnd,
                itemPrice: item.itemPrice,
                members: memberData,
              }
            }
          })
        )
        if (itemsData.length) {
          const data = itemsData.filter(el => {
            return el != null
          })

          const total = data
            .map(item => item.itemPrice)
            .reduce((p, c) => p + c, 0)

          const updateTotal = await Cart.updateOne(
            { cartId: userCart.cartId },
            { total: total }
          )
          if (updateTotal) {
            return {
              success: true,
              statusCode: 200,
              message: 'Get cart success',
              data: {
                cartId: userCart.cartId,
                items: data,
                total: total,
                userId: userCart.userId,
              },
            }
          } else {
            return {
              success: true,
              statusCode: 200,
              message: 'Get cart success',
              data: {
                cartId: userCart.cartId,
                items: data,
                total: userCart.total,
                userId: userCart.userId,
              },
            }
          }
        } else {
          return {
            success: true,
            statusCode: 200,
            message: 'Get cart success',
            data: {
              cartId: userCart.cartId,
              items: [],
              total: 0,
              userId: userCart.userId,
            },
          }
        }
      } else {
        return {
          success: true,
          statusCode: 200,
          message: 'Get cart success',
          data: {
            cartId: userCart.cartId,
            items: [],
            total: 0,
            userId: userCart.userId,
          },
        }
      }
    }
  } catch (error) {
    return error
  }
}

export default GetCart
