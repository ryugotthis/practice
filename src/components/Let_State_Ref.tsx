import { useEffect, useRef, useState } from 'react';

export default function LetStateRef() {
  let letA = 0;
  const [stateA, setStateA] = useState(0);
  const refA = useRef(0);

  useEffect(() => {
    console.log('let', letA);

    console.log('useState', stateA);
    console.log('useRef', refA);
    // setStateA((prev) => prev + 1); // 상태가 계속 바뀌어서 무한 렌더링됨
    refA.current = stateA;
    letA = stateA;

    return () => {
      console.log(
        'cleanup let',
        letA,
        'cleanup state',
        stateA,
        'cleanup ref',
        refA
      );
    };
  }, [stateA]);

  const handleButton = () => {
    console.log('클릭');
    setStateA((prev) => prev + 1);
    refA.current += 1;
    letA += 1;
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        border: '1px solid black',
        padding: 5,
      }}
    >
      <h2>let,state,useRef 변수 비교</h2>
      <button onClick={handleButton}>useEffect 버튼</button>
      <div>{`letA:${letA}`}</div>
      <div>{`stateA:${stateA}`}</div>
      <div>{`refA:${refA.current}`}</div>

      <button
        onClick={() => {
          letA += 1;
          console.log(`let:${letA} state:${stateA} ref:${refA.current}`);
        }}
      >{`let버튼: ${letA}`}</button>
      <button
        onClick={() => {
          setStateA((prev) => prev + 1);
          console.log(`let:${letA} state:${stateA} ref:${refA.current}`); // 이거 먼저 찍고 상태 반영함!
        }}
      >{`state버튼: ${stateA}`}</button>
      <button
        onClick={() => {
          refA.current += 1;
          console.log(`let:${letA} state:${stateA} ref:${refA.current}`);
        }}
      >{`ref버튼: ${refA.current}`}</button>
    </div>
  );
}
