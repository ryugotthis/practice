//  useImmerReducer는 immer의 불변성 유지 로직을 자동으로 처리해주는 useReducer 대체 훅
import { useImmerReducer } from 'use-immer';
import { useState } from 'react';

// 하나의 투두 아이템 타입 정의
type Todo = {
  id: number;
  text: string;
  done: boolean;
};

// 액션 타입 정의 (세 가지 액션: 추가, 토글, 삭제)
type Action =
  | { type: 'ADD'; payload: string } // 할 일 추가
  | { type: 'TOGGLE'; payload: number } // 특정 아이디의 완료 상태 토글
  | { type: 'DELETE'; payload: number }; // 특정 아이디의 투두 삭제

// immer 기반 리듀서 함수 (draft는 원본처럼 보이지만 내부적으로 불변성 유지됨)
function reducer(draft: Todo[], action: Action): void {
  switch (action.type) {
    case 'ADD':
      // 새 투두를 draft에 직접 추가 (immer가 불변성 유지함)
      draft.push({
        id: Date.now(), // 고유 ID 생성
        text: action.payload,
        done: false,
      });
      break;

    case 'TOGGLE': {
      // 해당 아이디의 todo 찾아서 done 상태 반전
      const todo = draft.find((t) => t.id === action.payload); // draft[index]을 가리킴
      if (todo) todo.done = !todo.done;
      break;
    }

    case 'DELETE': {
      // 해당 아이디의 todo를 배열에서 제거
      const index = draft.findIndex((t) => t.id === action.payload);
      // 조건에 맞는 요소가 없을 경우 -1 반환
      if (index !== -1) draft.splice(index, 1);
      break;
    }

    // 모든 액션을 처리했는지 타입으로 검증 (확장 시 실수 방지)
    default:
      const _exhaustive: never = action;
      throw new Error(`처리되지 않은 액션 타입: ${JSON.stringify(action)}`);
  }
}

//  컴포넌트 시작
export default function TodoAppWithImmerReducer() {
  const initialState: Todo[] = [];
  // 상태를 관리할 useImmerReducer 훅 사용
  const [state, dispatch] = useImmerReducer(reducer, initialState);

  // 입력창 텍스트 상태
  const [input, setInput] = useState('');

  // 입력값이 유효하면 ADD 액션 디스패치
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
      <h2>🍀 useImmerReducer로 만든 투두</h2>

      {/* ✅ 입력창과 추가 버튼 */}
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="할 일을 입력하세요"
      />
      <button onClick={handleAdd}>추가</button>

      {/* ✅ 투두 리스트 출력 */}
      <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
        {state.map((todo) => (
          <li key={todo.id} style={{ marginTop: '8px' }}>
            {/* ✅ 클릭 시 완료 상태 토글 */}
            <label
              style={{
                textDecoration: todo.done ? 'line-through' : 'none',
                cursor: 'pointer',
              }}
              onClick={() => dispatch({ type: 'TOGGLE', payload: todo.id })}
            >
              ✅ {todo.text}
            </label>

            {/* ✅ 삭제 버튼 */}
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
