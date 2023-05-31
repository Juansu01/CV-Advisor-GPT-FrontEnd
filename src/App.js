import './App.css';

import Layout from './Layout/Layout';
import MainSection from './MainSection/MainSection';
import { SessionContextProvider } from './context/session-context';

function App() {
  return (
    <SessionContextProvider>
      <Layout>
        <MainSection />
      </Layout>
    </SessionContextProvider>
  );
}

export default App;
