export interface CashRegisteredOutFlowTransactionsReport {
  id: number
  transaction_date: string
  pay_mode: string
  description: string
  currency: string
  total: number
  status?: string
}
