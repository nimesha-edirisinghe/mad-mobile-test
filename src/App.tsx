import { UserService } from './services/userService';
import Home from './pages/Home/Home';

function App() {
  const userService = new UserService();
  return (
    <>
      <Home userService={userService} />
    </>
  );
}

export default App;
