import { lazy, Suspense } from 'react';
import { UserService } from './services/userService';
const Home = lazy(() => import('./pages/Home/Home'));

function App() {
  const userService = new UserService();
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Home userService={userService} />
      </Suspense>
    </>
  );
}

export default App;
