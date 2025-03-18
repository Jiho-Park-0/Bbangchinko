import createPersistedState from "vuex-persistedstate";
import { Store } from "vuex";

export default ({ store }: { store: Store<any> }) => {
  createPersistedState({
    key: "bbangchinko-state",
    paths: ["drawCount", "lastUpdated"], // lastUpdated도 함께 저장
    storage: window.localStorage,
  })(store);

  // 페이지 로드 시 만료 여부 확인
  store.dispatch("checkExpiration");

  // 1분마다 만료 체크 (선택 사항)
  setInterval(() => {
    store.dispatch("checkExpiration");
  }, 10000); // 10초마다 체크 (빈번한 체크를 원하지 않으면 조정)
};
