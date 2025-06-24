import React, { useState } from 'react';
import Login from './Components/Login/Login';
import Main from './Components/Main';
import './Components/style.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');

  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true');
  };
  
  return (
    <>
      {isLoggedIn ? <Main /> : <Login onLogin={handleLogin} /> }
    </>
  );
}

export default App;


// This is the main entry point of the React application.
// It imports the Main component and renders it, along with the necessary styles.
// The Main component is responsible for displaying the main content of the application,
// including the search functionality and book cards.
// The styles are imported from the 'style.css' file in the Components directory.
// The App component serves as the root component of the application,
// encapsulating the Main component and applying the styles globally.
// The application is structured to allow for easy expansion and modification,
// with the Main component handling the core functionality and the Card and Modal components