export default function ObjectCopyDemo() {
  const original = {
    name: '홍길동',
    info: {
      age: 30,
    },
  };

  // 얕은 복사 (shallow copy)
  const shallowCopy = { ...original };

  // 2단계까지 복사 (부분적인 깊은 복사)
  const deepCopy = {
    ...original,
    info: {
      ...original.info,
    },
  };

  // 원본 변경
  shallowCopy.info.age = 50;
  deepCopy.info.age = 70;

  console.log('원본(초기값 30):', original.info.age); // ❗️50
  console.log('얕은복사:', shallowCopy.info.age); // 50
  console.log('부분적인 깊은 복사:', deepCopy.info.age); // 70

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        border: '1px solid black',
        padding: 5,
      }}
    >
      <h2>깊은복사, 얕은복사</h2>
      <p>원본(초기값 30): {original.info.age}</p>
      <p>얕은복사: {shallowCopy.info.age}</p>
      <p>부분적인 깊은 복사: {deepCopy.info.age}</p>
    </div>
  );
}
