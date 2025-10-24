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
      <div className="min-h-screen bg-gray-100">
        <Header />
        <h1 className="text-3xl font-bold text-center py-8">
          Welcome to PicShare
        </h1>
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/signup" component={SignUpPage} />
          <Route path="/upload" component={UploadPage} />
          <Route path="/images/:id" component={ImageDetails} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;