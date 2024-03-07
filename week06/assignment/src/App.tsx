import "./App.css";
import Counter from "./components/Counter";
import { AuthProvider } from "./components/AuthContext";

function App() {
  return (
    <AuthProvider>
      <div>
        <h1>Welcome to My App</h1>
        <Counter />
      </div>
    </AuthProvider>
  );
}

export default App;
