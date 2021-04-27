import Cart from '../../../models/Cart'
import { v4 as uuid } from 'uuid'
import Items from '../../../models/Items'
import Game from '../../../models/Game'
import MyGames from '../../../models/MyGames'
import { getTimeEnd, getTimeStart } from '../../../constants/timePlay'

const AddToCart = async (userId, data) => {
  const { gameId, playDate, members, time } = data

  try {
    if (members.length < 0) {
      throw {
        success: false,
        message: 'Members is invalid',
        statusCode: 400,
      }
    } else {
      const purcashed = await MyGames.findOne({
        userId: userId,
        gameId: gameId,
        isPlayed: false,
      })
      if (purcashed) {
        throw {
          success: false,
          statusCode: 400,
          message: 'Game already purchased',
        }
      } else {
        const game = await Game.findOne({ gameId: gameId })
        if (!game) {
          throw {
            success: false,
            statusCode: 404,
            message: 'Game not found',
          }
        } else {
          if (!game.gameReady) {
            throw {
              success: false,
              statusCode: 400,
              message: 'Game is under maintenance',
            }
          } else {
            const doc = {
              itemId: uuid(),
              gameId: game.gameId,
              datePlay: playDate,
              timeStart: getTimeStart(time),
              timeEnd: getTimeEnd(time, game.gameDuration),
              itemMembers: members,
              itemPrice: game.gamePriceAfterDiscount,
            }
            const newItem = await Items.create(doc)
            if (newItem) {
              const userCart = await Cart.findOne({ userId: userId })
              if (!userCart) {
                const newCart = await Cart.create({
                  cartId: uuid(),
                  items: [newItem.itemId],
                  total: newItem.itemPrice,
                  userId: userId,
                })
                if (!newCart) {
                  return {
                    success: false,
                    statusCode: 500,
                    message:
                      'Internal server error, failed to add item to cart',
                  }
                } else {
                  return {
                    success: true,
                    statusCode: 201,
                    message: 'Item added to cart',
                  }
                }
              } else {
                const oldItems = userCart.items
                if (oldItems.length > 0) {
                  const oldData = await Promise.all(
                    oldItems.map(async itemId => {
                      const itemData = await Items.findOne({ itemId: itemId })

                      return itemData
                    })
                  )

                  const duplicated = oldData.find(
                    g => g.gameId === newItem.gameId
                  )

                  if (duplicated) {
                    const deleteItems = await Items.deleteOne({
                      itemId: newItem.itemId,
                    })
                    if (deleteItems) {
                      throw {
                        success: false,
                        statusCode: 409,
                        message: 'Game already added to cart',
                      }
                    }
                  } else {
                    let allItems = oldItems
                    allItems.push(newItem.itemId)
                    const updateCart = await Cart.updateOne(
                      { cartId: userCart.cartId },
                      {
                        items: allItems,
                        total: userCart.total + newItem.itemPrice,
                      }
                    )

                    console.log(allItems)

                    if (!updateCart) {
                      throw {
                        success: false,
                        statusCode: 500,
                        message: 'Internal server error, failed to update cart',
                      }
                    } else {
                      return {
                        success: true,
                        statusCode: 201,
                        message: 'Item added to cart',
                      }
                    }
                  }
                } else {
                  const updateCart = await Cart.updateOne(
                    { cartId: userCart.cartId },
                    {
                      items: [newItem.itemId],
                      total: userCart.total + newItem.itemPrice,
                    }
                  )

                  if (!updateCart) {
                    throw {
                      success: false,
                      statusCode: 500,
                      message: 'Internal server error, failed to update cart',
                    }
                  } else {
                    return {
                      success: true,
                      statusCode: 201,
                      message: 'Item added to cart',
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  } catch (error) {
    return error
  }
}

export default AddToCart
