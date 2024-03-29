import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import TreeMainComponent from './TreeMainComponent';
import { Provider } from 'react-redux';
import store from './store'
import reportWebVitals from './reportWebVitals';

const App = () => {
 return(
   <div>
  <div style={{ flex: "1 1 0%", minHeight: "100vh" }} >
    <TreeMainComponent itemSize={30}/>
    </div>
    </div>
 )
}

export default App;



ReactDOM.render(
  <Provider store={store}>
  <React.StrictMode>
   <App />
  </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
