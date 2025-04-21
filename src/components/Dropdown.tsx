// Dropdown으로 버블링 전파 이해하기: useRef로 외부감지 및 버블링 중단
import { useEffect, useRef, useState } from 'react';

export default function () {
  const dropdownRef = useRef<HTMLDivElement>(null); // 드롭다운 대상 요소 참조
  const [isMenuClicked, setMenuClicked] = useState(false); // 메뉴 클릭 여부

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current && // 드롭다운 참조 요소가 있고
        !dropdownRef.current.contains(e.target as Node) // 드롭다운 참조 요소 내의 이벤트가 아니면
      ) {
        setMenuClicked(false);
      }
    };

    // 버블링 이용해서 외부 감지
    document.addEventListener('mousedown', handleClickOutside); // 돔 내의 전체 객체

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      <div
        onClick={() => alert('카드 전체')}
        style={{ backgroundColor: 'yellowgreen', width: 150 }}
      >
        {/* 외부 클릭 시 닫히게 하려면 드롭다운 버튼과 드롭다운 메뉴 전체를 포함한 상위 요소에 ref={dropdownRef}를 지정 */}
        <div ref={dropdownRef}>
          <button
            onClick={(e) => {
              // 버블링 막아서 자식의 onClick만 실행되게 함
              e.stopPropagation();
              setMenuClicked((prev) => !prev);
            }}
          >
            메뉴
          </button>
          {isMenuClicked && (
            <ul
              onClick={() => {
                alert('메뉴 전체');
              }}
              style={{
                margin: 1,
                padding: 10,
                listStyle: 'none',
                backgroundColor: 'grey',
              }}
            >
              <li
                style={{
                  backgroundColor: 'pink',
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  alert('1번');
                }}
              >
                1번
              </li>
              <li onClick={() => alert('2번')}>2번</li>
              <li onClick={() => alert('3번')}>3번</li>
            </ul>
          )}
        </div>
      </div>
    </>
  );
}
