import { Action, Select, Selector, State, StateContext } from '@ngxs/store';
import { Tram } from '../../models/tram.type';
import { Injectable } from '@angular/core';
import { AddTramToCart, ClearCart, DeleteTramFromCart } from './cart.actions';

export type TramInCart = {
  count: number;
  model: Tram;
};

export type CartStateModel = {
  trams: { [tramId: number]: TramInCart };
};

const defaultCartState: CartStateModel = {
  trams: []
};

@State<CartStateModel>({
  name: 'cart',
  defaults: defaultCartState
})
@Injectable()
export class CartState {
  constructor() {}

  @Action(AddTramToCart)
  addTramToCart(ctx: StateContext<CartStateModel>, { tram }: { tram: Tram }) {
    const state = ctx.getState();
    const tramId = tram.productId;
    console.log('tramId', tram);
    const tramCount = state.trams[tramId]?.count || 0;
    ctx.patchState({
      trams: {
        ...state.trams,
        [tramId]: {
          count: tramCount + 1,
          model: tram
        }
      }
    });
  }

  @Action(DeleteTramFromCart)
  removeTramFromCart(
    ctx: StateContext<CartStateModel>,
    { tram }: { tram: Tram }
  ) {
    const state = ctx.getState();
    const newTrams = { ...state.trams };
    delete newTrams[tram.productId];
    ctx.patchState({
      trams: newTrams
    });
  }

  @Action(ClearCart)
  clearCart(ctx: StateContext<CartStateModel>) {
    ctx.patchState(defaultCartState);
  }

  @Selector()
  static getCartTrams(state: CartStateModel) {
    return Object.values(state.trams);
  }

  @Selector()
  static getCartTramsCount(state: CartStateModel) {
    return Object.values(state.trams).reduce(
      (acc, tram) => acc + tram.count,
      0
    );
  }
}
