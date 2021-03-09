import './App.css';
import Toolbar from './components/Toolbar/Toolbar';
import Donors from './components/Donors/Donors';

function App() {
  return (
    <>
      <Toolbar />
      <div className="content">
        <Donors />
      </div>
    </>
  );
}

export default App;