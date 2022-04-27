import GameScreen from '../screens/GameScreen';
import Home from '../screens/Home';
import { RouteComponent } from '../interfaces';

export const routes: RouteComponent[] = [
  {
    path: '/GameScreen',
    component: <GameScreen />,
  },
  {
    path: '/home',
    component: <Home />
  }
];
