import { Deserializable } from './deserializable.model'

export class Room implements Deserializable {
  _id: string;
  number: string;
  createdAt: Date;

  deserialize(input: any) {
    Object.assign(this, input)
    return this
  }
  
}
