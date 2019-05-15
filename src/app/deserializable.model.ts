export interface Deserializable {
  deserialize(input: object): this;
}
