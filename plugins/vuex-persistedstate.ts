import createPersistedState from "vuex-persistedstate";
import { Store } from "vuex";

export default ({ store }: { store: Store<any> }) => {
  createPersistedState({
    key: "bbangchinko-state",
    paths: ["lastUpdated", "idealValues", "pickupCounts"], // pickupCounts 추가
    storage: window.localStorage,
  })(store);

  // 페이지 로드 시 만료 여부 확인
  store.dispatch("checkExpiration");

  // 주기적으로 만료 체크
  setInterval(() => {
    store.dispatch("checkExpiration");
  }, 10000);
};
