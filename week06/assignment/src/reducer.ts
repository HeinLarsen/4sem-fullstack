// reducer.ts
export interface State {
  count: number;
}

export enum ActionTypes {
  INCREMENT = "INCREMENT",
  DECREMENT = "DECREMENT",
}

export type Action = { type: ActionTypes };

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case ActionTypes.INCREMENT:
      return { ...state, count: state.count + 1 };
    case ActionTypes.DECREMENT:
      return { ...state, count: Math.max(0, state.count - 1) };
    default:
      return state;
  }
}
