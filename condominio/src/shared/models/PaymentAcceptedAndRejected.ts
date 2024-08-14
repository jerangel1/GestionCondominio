import { Payment } from "./Payment";

export interface PaymentAcceptedAndRejected {
  pending: Payment[]
  rejected: Payment[]
}