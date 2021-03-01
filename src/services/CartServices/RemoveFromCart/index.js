import Cart from '../../../models/Cart'
import Items from '../../../models/Items'

const RemoveFromCart = async (itemId, userId) => {
  try {
    const userCart = await Cart.findOne({ userId: userId })
    const { items } = userCart

    const newItems = items.filter(i => i !== itemId)
    const updateCart = await Cart.updateOne(
      { cartId: userCart.cartId },
      {
        items: newItems,
      }
    )
    if (updateCart) {
      const deleteItems = await Items.findOneAndDelete({ itemId: itemId })
      if (deleteItems) {
        const updateTotal = await Cart.updateOne(
          { cartId: userCart.cartId },
          {
            total: userCart.total - deleteItems.itemPrice,
          }
        )

        if (updateTotal) {
          return {
            success: true,
            message: 'Game removed from cart',
            statusCode: 200,
          }
        } else {
          throw {
            success: false,
            message: 'Internal server error',
            statusCode: 500,
          }
        }
      } else {
        throw {
          success: false,
          message: 'Internal server error',
          statusCode: 500,
        }
      }
    } else {
      throw {
        success: false,
        statusCode: 500,
        message: 'Failed to update cart, internal server error',
      }
    }
  } catch (error) {
    return error
  }
}

export default RemoveFromCart
