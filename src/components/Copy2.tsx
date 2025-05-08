import { useState } from 'react';

export default function ShallowVsDeepCopyDemo() {
  const [user, setUser] = useState({
    name: '홍길동',
    info: {
      age: 30,
    },
  });

  const updateAgeWrong = () => {
    const shallowCopy = { ...user };
    shallowCopy.info.age = 40; // 원본을 바꾸게 됨
    setUser(shallowCopy); // ❗️주소가 동일 → 버그가 생기기 쉬운 구조, user도 같이 변해서 불변성 깨짐
  };

  const updateAgeRight = () => {
    const deepCopy = {
      ...user,
      info: {
        ...user.info,
        age: 50,
      },
    };
    setUser(deepCopy); // ✅ 완전히 새 객체 → 리렌더링 됨
  };

  const forceRerender = () => {
    // 강제로 리렌더링 확인용 (사용 안 해도 됨)
    setUser({ ...user });
  };

  console.log('렌더링됨! 현재 나이:', user.info.age);

  return (
    <div style={{ border: '1px solid black', padding: '1rem' }}>
      <h2>React에서 얕은 복사 vs 깊은 복사</h2>
      <p>
        <strong>이름:</strong> {user.name}
      </p>
      <p>
        <strong>나이:</strong> {user.info.age}
      </p>

      <button onClick={updateAgeWrong}>❌ 얕은 복사로 나이 40으로 변경</button>
      <button onClick={updateAgeRight}>✅ 깊은 복사로 나이 50으로 변경</button>
      <button onClick={forceRerender}>🔁 강제 리렌더링</button>
    </div>
  );
}
