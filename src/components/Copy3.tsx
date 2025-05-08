import { useImmer } from 'use-immer';

export default function ShallowVsDeepCopyDemoWithImmer() {
  const [user, updateUser] = useImmer({
    name: '홍길동',
    info: {
      age: 30,
    },
  });

  const updateAge40 = () => {
    updateUser((draft) => {
      draft.info.age = 40;
    });
  };

  const updateAge50 = () => {
    updateUser((draft) => {
      draft.info.age = 50;
    });
  };

  return (
    <div style={{ border: '1px solid black', padding: '1rem' }}>
      <h2>useImmer 예제</h2>
      <p>
        <strong>이름:</strong> {user.name}
      </p>
      <p>
        <strong>나이:</strong> {user.info.age}
      </p>
      <button onClick={updateAge40}>나이 40으로 변경</button>
      <button onClick={updateAge50}>나이 50으로 변경</button>
    </div>
  );
}

// ✅ 사용하면 좋은 경우
// 중첩된 객체/배열 상태를 자주 수정해야 할 때:	깊은 복사 없이 코드가 깔끔하고 직관적
// useState로 복잡한 구조 업데이트가 반복될 때:	상태 구조가 커질수록 유지보수성이 올라감
// 기존 로직이 직접 수정하는 방식처럼 보일 때: 	기존 코드 스타일과 잘 어울림 (class → React 전환 시 유용)

// ❌ 피하는 게 좋은 경우
// 상태가 단순하고 1~2단계 객체만 있는 경우:	useState로도 충분히 명확함
// Immer의 자동 추적 동작이 오히려 예측하기 어려운 경우:	불변성 명확하게 관리하려면 useReducer가 더 나음
// 성능이 매우 중요한 경우:	Immer는 내부적으로 Proxy를 사용 → 미세한 오버헤드 있음 (거의 문제 되진 않음)
