import { Deserializable } from './deserializable.model'

export class Customer implements Deserializable {
  _id: string;
  firstName: string;
  lastName: string;
  createdAt: Date;

  displayName(): string {
    return `${this.firstName} ${this.lastName}`
  }

  deserialize(input: any) {
    Object.assign(this, input)
    return this
  }
  
}
