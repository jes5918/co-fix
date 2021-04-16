// 러분들의 이해를 돕기 위해 예시로 만들어 놓은 count 폴더입니다.
// 보시고 이해를 해보시기 바랍니다.

// 초깃값 세팅
export const initialState = 0; // 처음 state값으로 count 0을 주었다. state값은 객체, 배열로도 사용할 수 있다.

// type을 정해준다
export const COUNT_PLUS = "COUNT_PLUS"; // count 1을 증가시킬 액션 타입이다.
export const COUNT_MINUS = "COUNT_MINUS"; // count 1을 감소시킬 액션 타입이다.

// action 생성 함수
export const countPlusAction = () => ({
	type: COUNT_PLUS,
});

export const countMinusAction = () => ({
	type: COUNT_MINUS,
});

// reducer 사용
const reducer = (action, state = initialState) => {
	switch (
		action.type // 액션의 type이 COUNT_PLUS일땐 state에 + 1 COUNT_MINUS 일 땐 state에 -1
	) {
		case COUNT_PLUS:
			return state + 1;
		case COUNT_MINUS:
			return state - 1;
		default:
			return state;
	}
};

export default reducer;
