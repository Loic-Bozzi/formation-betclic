import { IClient } from '../interfaces/IClient';

export class Client implements IClient{
  id: number;
  state: string;
  name: string;
  ca: number;
  comment: string;

  constructor(obj?: Partial<Client>) {
    if(obj) {
      Object.assign(this, obj);
    }
  }
}

