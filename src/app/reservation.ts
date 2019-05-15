import { Deserializable } from './deserializable.model'
import { Customer } from './customer'
import { Room } from './room'

export class Reservation implements Deserializable {
  _id: string;
  startAt: string;
  endAt: string;
  customer: string | Customer;
  room: string | Room;
  createdAt: Date;

  deserialize(input: any) {
    Object.assign(this, input)
    if(typeof(input.customer) !== 'string') {
      this.customer = new Customer().deserialize(input.customer)
    }
    if(typeof(input.room) !== 'string') {
      this.room = new Room().deserialize(input.room)
    }
    return this
  }
  
}
