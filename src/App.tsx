import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';
import ObjectDetailPage from './components/ObjectDetails'; // Importa la nueva página

<Route exact path="/object-detail">
  <ObjectDetailPage />
</Route>

import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import '@ionic/react/css/display.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';

import './theme/variables.css';
import Pokedex from './components/Pokedex';
import { MenuPokedexProvider } from './contexts/MenuPokedexProvider';
import { PokedexMenu } from './components/Menu/PokedexMenu';
import PokedexPage from './pages/PokedexPage';
import PackPage from './pages/PackPage';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <MenuPokedexProvider>
          <Pokedex>
            <Route exact path="/home">
              <PokedexMenu />
            </Route>
            <Route exact path="/pokedex">
              <PokedexPage />
            </Route>
            <Route exact path="/pack">
              <PackPage />
            </Route>
            <Route exact path="/exit">
              {/* futura acción de salida */}
            </Route>
            <Route exact path="/">
              <Redirect to="/home" />
            </Route>
          </Pokedex>
        </MenuPokedexProvider>
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
