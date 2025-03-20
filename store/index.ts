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
      ego: [96, 95],
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
  // 픽업 아이템 획득 횟수를 저장하는 객체 추가
  pickupCounts: {
    1: { identity: 0, ego: 0 },
    2: { identity: 0, ego: 0 },
    3: { identity: 0, ego: 0 },
  },
  // 획득한 고급 아이템 이력 저장 (신규 추가)
  rareItems: {
    1: [],
    2: [],
    3: [],
  },
});

// 뮤테이션(mutations) 정의
export const mutations = {
  // 기존 뮤테이션 유지
  increment(state: any, id: string) {
    if (state.idealValues[id] !== undefined) {
      state.idealValues[id]++;
      state.lastUpdated = Date.now();
    }
  },
  incrementTen(state: any, id: string) {
    if (state.idealValues[id] !== undefined) {
      state.idealValues[id] += 10;
      state.lastUpdated = Date.now();
    }
  },
  // 이 함수는 이제 사용하지 않음 - 하위 호환성을 위해 유지
  resetIdealById(state: any, id: string) {
    if (state.idealValues[id] !== undefined) {
      state.idealValues[id] = 0;
    }
  },
  resetIdeal(state: any) {
    Object.keys(state.idealValues).forEach((id) => {
      state.idealValues[id] = 0;
    });
    state.lastUpdated = 0;
  },

  // 픽업 아이템 획득 횟수 증가 뮤테이션
  incrementPickupCount(
    state: any,
    { id, type }: { id: string; type: "identity" | "ego" }
  ) {
    if (state.pickupCounts[id]) {
      state.pickupCounts[id][type]++;
    }
  },

  // 이 함수는 이제 사용하지 않음 - 하위 호환성을 위해 유지
  resetPickupCounts(state: any, id: string) {
    if (state.pickupCounts[id]) {
      state.pickupCounts[id].identity = 0;
      state.pickupCounts[id].ego = 0;
    }
  },

  // 고급 아이템 추가 뮤테이션 (신규 추가)
  addRareItem(state: any, { id, item }: { id: string; item: any }) {
    if (state.rareItems[id]) {
      state.rareItems[id].push({
        id: item.id,
        name: item.name,
        character: item.character || "",
        type: item.type,
        grade: item.grade,
      });
    }
  },

  // 새로운 통합 리셋 함수 추가
  resetStatsById(state: any, id: string) {
    // Ideal 초기화
    if (state.idealValues[id] !== undefined) {
      state.idealValues[id] = 0;
    }

    // Pickup Counts 초기화
    if (state.pickupCounts[id]) {
      state.pickupCounts[id].identity = 0;
      state.pickupCounts[id].ego = 0;
    }

    // 획득 이력 초기화 (신규 추가)
    if (state.rareItems[id]) {
      state.rareItems[id] = [];
    }
  },
};

// 액션 정의
export const actions = {
  checkExpiration({ commit, state }: { commit: Function; state: any }) {
    const now = Date.now();
    const oneHour = 60 * 60 * 1000; // 1시간을 밀리초로 표현

    if (state.lastUpdated > 0 && now - state.lastUpdated > oneHour) {
      commit("resetIdeal");
    }
  },
};
