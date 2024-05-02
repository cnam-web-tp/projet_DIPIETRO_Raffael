import { Tramway } from '../../models/tramway.type';

export class AddTramToCart {
  static readonly type = '[Cart] Add tram to cart';
  constructor(public tram: Tramway) {}
}

export class IncreaseTramCount {
  static readonly type = '[Cart] Increase tram count';
  constructor(public tram: Tramway) {}
}

export class DecreaseTramCount {
  static readonly type = '[Cart] Decrease tram count';
  constructor(public tram: Tramway) {}
}

export class DeleteTramFromCart {
  static readonly type = '[Cart] Delete tram from cart';
  constructor(public tram: Tramway) {}
}

export class ClearCart {
  static readonly type = '[Cart] Clear cart';
}
