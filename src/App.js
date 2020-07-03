import React from 'react';
import Layout from './hoc/Layout/Layout';
import Weather from './containers/Weather/Weather';
function App() {
  return (
    <div>
      <Layout>
        <Weather />
      </Layout>
    </div>
  );
}

export default App;
