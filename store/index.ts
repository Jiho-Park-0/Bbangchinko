// 상태(state) 정의: store/index.js 파일에서 애플리케이션의 상태를 정의합니다. 상태는 함수로 반환되어야 합니다.

export const state = () => ({
  drawCount: 0,
  lastUpdated: 0, // 마지막 업데이트 시간 저장용 타임스탬프
});

// 뮤테이션(mutations) 정의: 상태를 변경하는 동기적 메서드를 정의합니다.
export const mutations = {
  increment(state: { drawCount: number; lastUpdated: number }) {
    state.drawCount++;
    state.lastUpdated = Date.now(); // 현재 시간 저장
  },
  incrementTen(state: { drawCount: number; lastUpdated: number }) {
    state.drawCount += 10;
    state.lastUpdated = Date.now(); // 현재 시간 저장
  },
  resetDrawCount(state: { drawCount: number; lastUpdated: number }) {
    state.drawCount = 0;
    state.lastUpdated = 0;
  },
};

// 액션(actions) 정의: 비동기 로직이나 복잡한 로직을 처리하며, 뮤테이션을 커밋(commit)하여 상태를 변경합니다.
export const actions = {
  checkExpiration({
    commit,
    state,
  }: {
    commit: Function;
    state: { lastUpdated: number };
  }) {
    const now = Date.now();
    const oneMinute = 60 * 1000; // 1분을 밀리초로 표현

    // 마지막 업데이트 이후 1분이 지났는지 확인
    if (state.lastUpdated > 0 && now - state.lastUpdated > oneMinute) {
      commit("resetDrawCount");
    }
  },
};
