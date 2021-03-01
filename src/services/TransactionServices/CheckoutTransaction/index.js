import Cart from '../../../models/Cart'
import { v4 as uuid } from 'uuid'
import Items from '../../../models/Items'
import Game from '../../../models/Game'
import Transaction from '../../../models/Transaction'
import jwt from 'jsonwebtoken'

const CheckoutTransaction = async (data, userId) => {
  const { cartId } = data
  try {
    const userCart = await Cart.findOne({ cartId: cartId, userId: userId })
    if (!userCart) {
      throw {
        success: false,
        statusCode: 404,
        message: 'Cart not found',
      }
    } else {
      const { items } = userCart
      if (items.length) {
        const transactionItems = await Promise.all(
          items.map(async itemId => {
            const itemData = await Items.findOne({ itemId: itemId })

            const game = await Game.findOne({ gameId: itemData.gameId })

            const members = itemData.itemMembers

            return {
              itemId: itemData.itemId,
              gameId: game.gameId,
              playingDate: itemData.datePlay,
              timeStart: itemData.timeStart,
              timeEnd: itemData.timeEnd,
              itemPrice: itemData.itemPrice,
              members: members,
            }
          })
        )

        const newTransaction = await Transaction.create({
          transactionId: uuid(),
          transactionItems: transactionItems,
          transactionTotal: userCart.total,
          userId: userId,
        })

        if (!newTransaction) {
          throw {
            success: false,
            statusCode: 500,
            message: 'Internal server error, failed to checkout cart',
          }
        } else {
          const paymentToken = await jwt.sign(
            {
              transactionId: newTransaction.transactionId,
              sub: userId,
            },
            'minigames-payment-token',
            { expiresIn: '48h' }
          )

          const updatePaymentToken = await Transaction.updateOne(
            { transactionId: newTransaction.transactionId },
            {
              paymentToken: paymentToken,
            }
          )

          if (updatePaymentToken) {
            const updateCart = await Cart.updateOne(
              { cartId: userCart.cartId },
              {
                items: [],
                total: 0,
              }
            )
            if (!updateCart) {
              await Transaction.deleteOne({
                transactionId: newTransaction.transactionId,
              })
              throw {
                success: false,
                statusCode: 500,
                message: 'Failed to empty cart, Internal server error',
              }
            } else {
              const deleteItems = await Promise.all(
                items.map(async itemId => {
                  const query = await Items.deleteOne({ itemId })
                  return query
                })
              )
              if (!deleteItems) {
                await Transaction.deleteOne({
                  transactionId: newTransaction.transactionId,
                })
                throw {
                  success: false,
                  statusCode: 500,
                  message: 'Failed to clear, Internal server error',
                }
              } else {
                return {
                  success: true,
                  statusCode: 201,
                  message: 'Transaction Success',
                  data: {
                    transactionId: newTransaction.transactionId,
                    paymentToken: paymentToken,
                  },
                }
              }
            }
          } else {
            await Transaction.deleteOne({
              transactionId: newTransaction.transactionId,
            })
            throw {
              success: false,
              statusCode: 500,
              message:
                'Failed to generate payment token, Internal server error',
            }
          }
        }
      } else {
        throw {
          success: false,
          message: 'Cart is empty',
          statusCode: 400,
        }
      }
    }
  } catch (error) {
    return error
  }
}

export default CheckoutTransaction
