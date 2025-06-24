import React from 'react';
import Login from './Components/Login/Login';
import './Components/style.css';
import Main from './Components/Main';
function App() {
  return (
    <>
      <Login />
      <Main/>
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