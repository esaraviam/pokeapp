import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from "./Layout.tsx";
import PokemonDetail from "./components/PokemonDetail.tsx";

const App: React.FC = () => {
  return (
    <Router>
       <Routes>
          <Route
            path="/"
            element={
              <>
                <Layout />
              </>
            }
          />
          <Route path="/pokemon/:name" element={<PokemonDetail />} />
        </Routes>
      </Router>
  );
};

export default App;