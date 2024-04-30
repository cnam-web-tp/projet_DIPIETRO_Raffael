import { Tram } from '../../models/tram.type';

export class AddTramToCart {
  static readonly type = '[Cart] Add tram to cart';
  constructor(public tram: Tram) {}
}

export class DeleteTramFromCart {
  static readonly type = '[Cart] Delete tram from cart';
  constructor(public tram: Tram) {}
}

export class ClearCart {
  static readonly type = '[Cart] Clear cart';
}
