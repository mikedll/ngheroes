import { Deserializable } from './deserializable.model'
import { Customer } from './customer'
import { Room } from './room'

export class Reservation implements Deserializable {
  _id: string;
  startAt: string;
  endAt: string;
  customer: string;
  room: string;
  createdAt: Date;

  deserialize(input: any) {
    Object.assign(this, input)
    return this
  }
  
}

export class DeepReservation implements Deserializable {
  _id: string;
  startAt: string;
  endAt: string;
  customer: Customer;
  room: Room;
  createdAt: Date;
  
  deserialize(input: any) {
    Object.assign(this, input)

    this.customer = new Customer().deserialize(input.customer)
    this.room = new Room().deserialize(input.room)
    return this
  }
 
}
