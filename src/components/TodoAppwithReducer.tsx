import { useReducer, useState } from 'react';

// 투두 항목의 타입 정의
type Todo = {
  id: number;
  text: string;
  done: boolean;
};

// 전체 상태는 투두 항목들의 배열
type State = Todo[];

// 액션 타입 정의
type Action =
  // 여러 줄로 유니언 타입을 쓸 때 가독성을 위해 앞에 | 붙임
  | { type: 'ADD'; payload: string } // 새로운 투두를 추가할 때, payload는 투두 내용
  | { type: 'TOGGLE'; payload: number } // 완료 상태를 토글할 때, payload는 투두 아이디
  | { type: 'DELETE'; payload: number }; // 특정 투두를 삭제할 때, payload는 투두 아이디

// 상태를 변경하는 리듀서 함수
function reducer(state: Todo[], action: Action): State {
  switch (action.type) {
    case 'ADD':
      return [
        ...state,
        {
          id: Date.now(), // 고유 ID 생성 (타임스탬프 사용)
          text: action.payload, // 입력한 내용
          done: false, // 기본 상태는 미완료
        },
      ];
    case 'TOGGLE':
      return state.map(
        (todo) =>
          todo.id === action.payload ? { ...todo, done: !todo.done } : todo // id 일치 시 done 반전
      );
    case 'DELETE':
      return state.filter((todo) => todo.id !== action.payload); // 해당 ID 제외
  }
  // 모든 case를 처리했는지 타입으로 검증
  const _exhaustive: never = action; // 모든 case를 처리 안했다면 이 코드를 실행하게 되고 action이 값이 있을거임
  throw new Error(`처리되지 않은 액션 타입: ${JSON.stringify(action)}`);
}

export default function TodoAppWithReducer() {
  const initialState: State = [];
  const [state, dispatch] = useReducer(reducer, initialState);
  const [input, setInput] = useState('');

  const handleAdd = () => {
    if (!input.trim()) {
      alert('내용을 입력해주세요');
      return;
    }
    dispatch({ type: 'ADD', payload: input });
    setInput('');
  };

  return (
    <div style={{ padding: '1rem', maxWidth: '400px', margin: 'auto' }}>
      <h2>📝 useReducer로 만든 투두</h2>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="할 일을 입력하세요"
      />
      <button onClick={handleAdd}>추가</button>

      <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
        {state.map((todo) => (
          <li key={todo.id} style={{ marginTop: '8px' }}>
            <label
              style={{
                textDecoration: todo.done ? 'line-through' : 'none',
                cursor: 'pointer',
              }}
              onClick={() => dispatch({ type: 'TOGGLE', payload: todo.id })}
            >
              ✅ {todo.text}
            </label>
            <button
              style={{ marginLeft: '1rem' }}
              onClick={() => dispatch({ type: 'DELETE', payload: todo.id })}
            >
              ❌
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
