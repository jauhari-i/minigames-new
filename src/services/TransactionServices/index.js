import AccTransaction from './AccTransaction'
import CheckoutTransaction from './CheckoutTransaction'
import DeleteTransaction from './DeleteTransaction'
import DetailTransaction from './DetailTransaction'
import ListTransactionAdmin from './ListTransactionAdmin'
import ListTransactionUser from './ListTransactionUser'
import RejectTransaction from './RejTransaction'
import UploadPayment from './UploadPayment'

const transactionServices = {
  AccTransaction,
  CheckoutTransaction,
  DeleteTransaction,
  DetailTransaction,
  ListTransactionAdmin,
  ListTransactionUser,
  RejectTransaction,
  UploadPayment,
}

export default transactionServices
