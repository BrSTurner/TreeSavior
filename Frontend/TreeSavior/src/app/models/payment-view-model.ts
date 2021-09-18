export interface PaymentViewModel{
  name: string;
  cpf: string;
  value: number;
  quantity: number;

  cardNumber: number;
  cardHolder: string;
  cardExpirationDate: string;
  cardSecurityCode: number;
  cardParcels: number;
  totalAmount: number;
}
