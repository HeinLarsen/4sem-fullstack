// Counter.tsx
import React, { useReducer } from "react";
import { reducer, State, ActionTypes } from "../reducer";
import { useAuth } from "./AuthContext";

const initialState: State = { count: 0 };

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { user, login, logout } = useAuth();

  const handleLogin = () => {
    login("exampleUser", "examplePassword");
  };

  const handleLogout = () => {
    logout();
  };
  const handleIncrement = () => {
    dispatch({ type: ActionTypes.INCREMENT });
  };

  const handleDecrement = () => {
    dispatch({ type: ActionTypes.DECREMENT });
  };

  return (
    <div>
      {user ? (
        <>
          <h1>Counter: {state.count}</h1>
          <button onClick={handleIncrement}>Increment</button>
          <button onClick={handleDecrement} disabled={state.count === 0}>
            Decrement
          </button>{" "}
          <button onClick={handleLogout}>logout</button>
        </>
      ) : (
        <>
          <p>Please login</p>
          <button onClick={handleLogin}>Login</button>
        </>
      )}
    </div>
  );
}

export default Counter;
