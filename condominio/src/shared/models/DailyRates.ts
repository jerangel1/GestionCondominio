export interface DailyRates{
  datetime:{
    date: string
  },
  monitors:{
    usd:{
      price: number
    },
    eur:{
      price: number
    },
    rub:{
      price: number
    }
  }
}