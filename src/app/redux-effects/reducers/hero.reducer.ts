import { GlobalState } from './index';
import { HeroState } from "./hero.store";
import { HeroAction } from "./hero.actions";

export const initialHeroState: HeroState = {
  items: [],
  lastId: 20
};

export function heroreducer(state = initialHeroState, action: HeroAction): HeroState {
  let newstate = {...state};
  switch (action.type) {
    case '[HERO]_Load_OK':
      newstate.items = action.payload;
    break;
    case '[HERO]_Add':
      newstate.items.push(action.payload);
      newstate.lastId = newstate.lastId +1;
    break;
    case '[HERO]_Delete':
      let hero = action.payload;
      newstate.items = newstate.items.filter(function(el) { return el.id != hero.id; });
    break;
    default:
      return state;
  }
  return newstate;
}

export const initialGlobalState: GlobalState = {
  username: '',
  isLogged: false
};

export function globalreducer(state: GlobalState = initialGlobalState, action: any): GlobalState {
  let newstate = {...state};
  //...
  return newstate;
}
