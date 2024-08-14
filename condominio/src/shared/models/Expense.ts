export interface Amounts {
    expenseAmount:  string
    expenseCount: number
    expenseName: string
    expenseTotal: string
}

export interface Expense {
    id: number
    creationDate: Date
    paymentMethodId: string
    accountId: string
    amount: number
    description: string
    number?: string
    reference?: string
    typeCurrency?: string
    dateAward?: string
    type?: string
    cashPay?: string
    numberTicket?: string
    serialTicket?: string
    system?: string
    valueAward?: string
    expenses: Amounts[]
    mobilePay?: string
    cardDebitPay? : string
    totalPay: string
    expenseOperative?: string
    nationality?: string,
    document_client?: string,
    name?: string,
    origin_bank?: string,
    codePhone?: string
    phone: string
    images?: string[]
}