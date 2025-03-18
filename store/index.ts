// 상태(state) 정의: store/index.js 파일에서 애플리케이션의 상태를 정의합니다. 상태는 함수로 반환되어야 합니다.

export const state = () => ({
  drawCount: 0,
  lastUpdated: 0,
  pickupIds: {
    1: {
      identity: [138, 139],
      ego: [],
      abnormality: 0, // 추가된 abnormality 변수
    },
    2: {
      identity: [],
      ego: [96],
      abnormality: 0, // 추가된 abnormality 변수
    },
    3: {
      identity: [],
      ego: [],
      abnormality: 0, // 추가된 abnormality 변수
    },
  },
});

// 뮤테이션(mutations) 정의: 상태를 변경하는 동기적 메서드를 정의합니다.
export const mutations = {
  // ID에 해당하는 abnormality 1 증가
  increment(state: any, id: string) {
    if (state.pickupIds[id]) {
      state.pickupIds[id].abnormality++;
      state.lastUpdated = Date.now();
    }
  },

  // ID에 해당하는 abnormality 10 증가
  incrementTen(state: any, id: string) {
    if (state.pickupIds[id]) {
      state.pickupIds[id].abnormality += 10;
      state.lastUpdated = Date.now();
    }
  },

  // 모든 ID의 abnormality 초기화
  resetAbnormality(state: any) {
    Object.keys(state.pickupIds).forEach((id) => {
      state.pickupIds[id].abnormality = 0;
    });
    state.lastUpdated = 0;
  },

  // 특정 ID의 abnormality만 초기화
  resetAbnormalityById(state: any, id: string) {
    if (state.pickupIds[id]) {
      state.pickupIds[id].abnormality = 0;
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
    const oneMinute = 60 * 100000; // 100분을 밀리초로 표현

    // 마지막 업데이트 이후 1분이 지났는지 확인
    if (state.lastUpdated > 0 && now - state.lastUpdated > oneMinute) {
      commit("resetAbnormality");
    }
  },
};
