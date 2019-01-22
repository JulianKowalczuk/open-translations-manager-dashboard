import { indigo, lightBlue, red } from '@material-ui/core/colors';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from 'app/modules/app/App';
import registerServiceWorker from './registerServiceWorker';
import store from './store';

const theme = createMuiTheme({
  palette: {
    error: red,
    primary: indigo,
    secondary: lightBlue
  },
  typography: {
    useNextVariants: true
  }
});

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <Provider store={store}>
      <App />
    </Provider>
  </MuiThemeProvider>,
  document.getElementById('root') as HTMLElement
);

registerServiceWorker();
