import './App.css';

import Dropdown from './components/Dropdown';
import LetStateRef from './components/Let_State_Ref';

import ObjectCopyDemo from './components/Copy';
import ShallowVsDeepCopyDemo from './components/Copy2';
import ShallowVsDeepCopyDemoWithImmer from './components/Copy3';
import TodoAppWithReducer from './components/TodoAppwithReducer';
import TodoAppWithState from './components/TodoAppWithState';
import TodoAppWithImmerReducer from './components/TodoAppWithImmerReducer';

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
      <TodoAppWithState />
      <TodoAppWithReducer />
      <TodoAppWithImmerReducer />
    </div>
  );
}

export default App;
