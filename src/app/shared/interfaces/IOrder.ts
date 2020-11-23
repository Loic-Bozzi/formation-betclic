export interface IOrder {
  tjmHt: Number;
  nbJours: Number;
  tva: Number;
  state: string;
  typePresta: string;
  client: string;
  comment: string;
  id: Number;

  totalHt(): Number;
  totalTtc(): Number;
}
