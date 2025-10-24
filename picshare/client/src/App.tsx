import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import UploadPage from './pages/UploadPage';
import ImageDetails from './pages/ImageDetails';
import Header from './components/common/Header';

const App: React.FC = () => {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/signup" component={SignUpPage} />
        <Route path="/upload" component={UploadPage} />
        <Route path="/images/:id" component={ImageDetails} />
      </Switch>
    </Router>
  );
};

export default App;