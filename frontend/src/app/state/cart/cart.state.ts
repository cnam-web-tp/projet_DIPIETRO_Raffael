import { Action, Select, Selector, State, StateContext } from '@ngxs/store';
import { Tramway } from '../../models/tramway.type';
import { Injectable } from '@angular/core';
import {
  AddTramToCart,
  ClearCart,
  DeleteTramFromCart,
  DecreaseTramCount,
  IncreaseTramCount
} from './cart.actions';

export type TramInCart = {
  count: number;
  model: Tramway;
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
  addTramToCart(
    ctx: StateContext<CartStateModel>,
    { tram }: { tram: Tramway }
  ) {
    const state = ctx.getState();
    const tramCount = state.trams[tram.productId]?.count || 0;
    ctx.patchState({
      trams: {
        ...state.trams,
        [tram.productId]: {
          count: tramCount >= 1 ? tramCount : 1,
          model: tram
        }
      }
    });
  }

  @Action(IncreaseTramCount)
  increaseTramCount(
    ctx: StateContext<CartStateModel>,
    { tram }: { tram: Tramway }
  ) {
    const state = ctx.getState();
    const tramId = tram.productId;

    if (!state.trams[tramId]) return;

    const tramCount = state.trams[tramId]?.count || 0;
    ctx.patchState({
      trams: {
        ...state.trams,
        [tramId]: {
          ...state.trams[tramId],
          count: tramCount + 1
        }
      }
    });
  }

  @Action(DecreaseTramCount)
  decreaseTramCount(
    ctx: StateContext<CartStateModel>,
    { tram }: { tram: Tramway }
  ) {
    const state = ctx.getState();
    const tramId = tram.productId;

    if (!state.trams[tramId]) return;

    const tramCount = state.trams[tramId]?.count || 0;
    if (tramCount > 1) {
      ctx.patchState({
        trams: {
          ...state.trams,
          [tramId]: {
            ...state.trams[tramId],
            count: tramCount - 1
          }
        }
      });
    } else {
      this.removeTramFromCart(ctx, { tram });
    }
  }

  @Action(DeleteTramFromCart)
  removeTramFromCart(
    ctx: StateContext<CartStateModel>,
    { tram }: { tram: Tramway }
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
    return Object.values(state.trams).length;
  }
}
