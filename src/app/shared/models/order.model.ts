import { IOrder } from '../interfaces/IOrder';

export class Order implements IOrder {
  tjmHt = 500;
  nbJours = 1;
  tva = 20;
  state: string;
  typePresta: string;
  client: string;
  comment: string;
  id: Number;

  constructor(obj?: Partial<Order>) {
    if(obj) {
      Object.assign(this, obj);
    }
  }
  public totalHt(): Number {
    return this.tjmHt * this.nbJours;
  }
  public totalTtc(): Number {
    return this.tjmHt * (1 + this.tva) / 100;
  }
}
