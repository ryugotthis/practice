import './App.css';
import Copy2 from './components/Copy2';
import Dropdown from './components/Dropdown';
import LetStateRef from './components/Let_State_Ref';
import TodoListState from './components/Copy';
import ObjectCopyDemo from './components/Copy';
import ShallowVsDeepCopyDemo from './components/Copy2';
import ShallowVsDeepCopyDemoWithImmer from './components/Copy3';

function App() {
  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        border: ' 2px solid black ',
        padding: '2rem',
        gap: '20px',
      }}
    >
      <Dropdown />

      <LetStateRef />
      <ObjectCopyDemo />
      <ShallowVsDeepCopyDemo />
      <ShallowVsDeepCopyDemoWithImmer />
    </div>
  );
}

export default App;
