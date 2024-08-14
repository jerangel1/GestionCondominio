export interface LotteryProductResponse {
  uuid: string
  name: string
  fee: number
  price: number
  lottery_id: number
  lottery_name: string
  status_uuid: string
  status_name: string
  pre_printed: boolean | null
}
