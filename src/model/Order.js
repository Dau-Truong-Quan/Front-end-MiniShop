export class Order {
  constructor(orderId, date, address, totalPrice, statusId, user_id) {
    this.orderId = orderId;
    this.date = date;
    this.address = address;
    this.totalPrice = totalPrice;
    this.statusId = statusId;
    this.user_id = user_id;
  }
}
