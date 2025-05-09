import { useState } from 'react';

type Todo = {
  id: number;
  text: string;
  done: boolean;
};

export default function TodoAppWithState() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState('');

  const handleAdd = () => {
    if (!input.trim()) {
      alert('내용을 입력해주세요');
      return; // 빈 값이면 바로 반환
    }
    const newTodo: Todo = {
      id: Date.now(),
      text: input,
      done: false,
    };
    setTodos([...todos, newTodo]);
    setInput(''); // 입력값 비워두기
  };

  const handleToggle = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    );
  };

  const handleDelete = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div style={{ padding: '1rem', maxWidth: '400px', margin: 'auto' }}>
      <h2>📝 useState로 만든 투두</h2>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="할 일을 입력하세요"
      />
      <button onClick={handleAdd}>추가</button>

      <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
        {todos.map((todo) => (
          <li key={todo.id} style={{ marginTop: '8px' }}>
            <label
              style={{
                textDecoration: todo.done ? 'line-through' : 'none',
                cursor: 'pointer',
              }}
              onClick={() => handleToggle(todo.id)}
            >
              ✅ {todo.text}
            </label>
            <button
              style={{ marginLeft: '1rem' }}
              onClick={() => handleDelete(todo.id)}
            >
              ❌
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
