import {
  BrowserRouter as Router,
  Route,
  Navigate,
  Routes,
} from 'react-router-dom';
import { RouteComponent } from '../interfaces';
import { routes } from './routes';

export const NavigationContainer = () => {
  const _renderItem = ({ path, component }: RouteComponent, index: number) => (
    <Route path={path} element={component} key={index} />
  );

  return (
    <Router>
      <Routes>
        {routes.map(_renderItem)}
        <Route path='/*' element={<Navigate replace to='/GameScreen' />} />
      </Routes>
    </Router>
  );
};
