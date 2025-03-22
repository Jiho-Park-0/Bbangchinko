export const state = () => ({
  lastUpdated: 0,
  // 픽업 ID 목록은 하드코딩
  pickupConfig: {
    1: {
      identity: [141],
      ego: [],
      // 픽업별 제외/포함 목록 추가
      identityExcludedIds: [
        13, 34, 83, 84, 103, 119, 120, 131, 132, 116, 117, 110, 111, 80, 53, 41,
        74, 90, 17, 65, 140, 133,
      ],
      egoIncludedIds: [
        79, 61, 58, 90, 96, 8, 3, 47, 95, 30, 21, 17, 91, 92, 25, 43, 52, 56, 6,
        60, 46, 63, 80, 83, 35, 11, 65,
      ],
    },
    2: {
      identity: [110, 85],
      ego: [63, 22],
      // 픽업 2번에서는 110, 85를 제외 목록에서 빼고, 63, 22는 포함 목록에서 유지
      identityExcludedIds: [
        13, 34, 83, 84, 103, 119, 120, 131, 132, 116, 117, 111, 80, 53, 41, 74,
        90, 17, 65, 140, 133,
      ],
      egoIncludedIds: [
        79, 61, 58, 90, 96, 8, 3, 47, 95, 30, 21, 17, 91, 92, 25, 43, 52, 56, 6,
        60, 46, 63, 80, 83, 35, 11, 65,
      ],
    },
    3: {
      identity: [],
      ego: [],
      identityExcludedIds: [
        13, 34, 83, 84, 103, 119, 120, 131, 132, 116, 117, 110, 111, 80, 53, 41,
        74, 90, 17, 65, 140, 133,
      ],
      egoIncludedIds: [
        79, 61, 58, 90, 96, 8, 3, 47, 95, 30, 21, 17, 91, 92, 25, 43, 52, 56, 6,
        60, 46, 63, 80, 83, 35, 11, 65,
      ],
    },
    4: {
      identity: [13, 34, 83, 84, 103, 119, 120, 131, 132],
      ego: [33, 62, 64, 94],
      identityExcludedIds: [
        116, 117, 110, 111, 80, 53, 41, 74, 90, 17, 65, 140, 133,
      ],
      egoIncludedIds: [
        79, 61, 58, 90, 96, 8, 3, 47, 95, 30, 21, 17, 91, 92, 25, 43, 52, 56, 6,
        60, 46, 63, 80, 83, 35, 11, 65,
      ],
    },
  },
  // Ideal 값만 별도로 관리
  idealValues: {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
  },
  // 픽업 아이템 획득 횟수를 저장하는 객체 추가
  pickupCounts: {
    1: { identity: 0, ego: 0 },
    2: { identity: 0, ego: 0 },
    3: { identity: 0, ego: 0 },
    4: { identity: 0, ego: 0 },
  },
  // 획득한 고급 아이템 이력 저장 (신규 추가)
  rareItems: {
    1: [],
    2: [],
    3: [],
    4: [],
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
