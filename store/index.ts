// 상태(state) 정의: store/index.js 파일에서 애플리케이션의 상태를 정의합니다. 상태는 함수로 반환되어야 합니다.

export const state = () => ({
  lastUpdated: 0,
  // 픽업 ID 목록은 하드코딩
  pickupConfig: {
    1: {
      identity: [139, 138],
      ego: [],
    },
    2: {
      identity: [],
      ego: [96],
    },
    3: {
      identity: [],
      ego: [],
    },
  },
  // Ideal 값만 별도로 관리
  idealValues: {
    1: 0,
    2: 0,
    3: 0,
  },
});

// 뮤테이션(mutations) 정의: 상태를 변경하는 동기적 메서드를 정의합니다.
export const mutations = {
  // ID에 해당하는 Ideal 1 증가
  increment(state: any, id: string) {
    if (state.idealValues[id] !== undefined) {
      state.idealValues[id]++;
      state.lastUpdated = Date.now();
    }
  },

  // ID에 해당하는 Ideal 10 증가
  incrementTen(state: any, id: string) {
    if (state.idealValues[id] !== undefined) {
      state.idealValues[id] += 10;
      state.lastUpdated = Date.now();
    }
  },

  // 모든 ID의 Ideal 초기화
  resetIdeal(state: any) {
    Object.keys(state.idealValues).forEach((id) => {
      state.idealValues[id] = 0;
    });
    state.lastUpdated = 0;
  },

  // 특정 ID의 Ideal만 초기화
  resetIdealById(state: any, id: string) {
    if (state.idealValues[id] !== undefined) {
      state.idealValues[id] = 0;
    }
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
    const oneHour = 60 * 60 * 1000; // 60분을 밀리초로 표현

    if (state.lastUpdated > 0 && now - state.lastUpdated > oneHour) {
      commit("resetIdeal");
    }
  },
};
