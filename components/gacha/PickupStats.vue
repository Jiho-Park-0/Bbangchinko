<template>
  <div class="pickup-stats">
    <!-- 토글 가능한 헤더 추가 -->
    <div class="stats-header" @click="toggleHistory">
      <h3>픽업 획득 통계</h3>
    </div>

    <!-- 기본 통계 -->
    <div class="pickup-grid">
      <div class="pickup-item">
        <span class="pickup-label">인격 픽업 획득:</span>
        <span class="pickup-count">{{ identityCount }}회</span>
      </div>
      <div class="pickup-item">
        <span class="pickup-label">EGO 픽업 획득:</span>
        <span class="pickup-count">{{ egoCount }}회</span>
      </div>
    </div>

    <!-- 획득 이력 목록 - 토글로 표시/숨김 -->
    <div class="history-section">
      <div class="history-header">
        <h4>3성 / EGO 획득 이력</h4>
        <button class="toggle-button" @click="toggleHistory">
          {{ isHistoryOpen ? "접기" : "펼치기" }}
        </button>
      </div>

      <div v-if="isHistoryOpen" class="history-content">
        <div v-if="rareItemsHistory.length > 0" class="history-grid">
          <div
            v-for="(item, index) in rareItemsHistory"
            :key="index"
            class="history-item"
            :class="getItemClass(item)"
          >
            <div class="item-type">
              {{ item.type === "identity" ? "인격" : "EGO" }}
            </div>
            <div class="item-name">{{ item.name }}</div>
            <div v-if="item.character" class="item-character">
              {{ item.character }}
            </div>
          </div>
        </div>

        <div v-else class="empty-history">
          아직 고급 아이템을 획득하지 않았습니다
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "PickupStats",
  props: {
    id: {
      type: String,
      required: true,
    },
    identityCount: {
      type: Number,
      default: 0,
    },
    egoCount: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      isHistoryOpen: false, // 토글 상태 (초기값: 접힘)
    };
  },
  computed: {
    // mapState 대신 직접 computed 속성 정의
    rareItemsHistory(): any[] {
      return this.$store.state.rareItems[this.id] || [];
    },
  },
  methods: {
    toggleHistory() {
      this.isHistoryOpen = !this.isHistoryOpen;
    },
    getItemClass(item: any) {
      if (item.type === "identity") {
        return "identity-item";
      } else {
        return "ego-item";
      }
    },
  },
});
</script>

<style scoped>
.pickup-stats {
  margin: 20px 0;
  padding: 15px;
  background-color: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.stats-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  margin-bottom: 10px;
}

.stats-header h3 {
  margin: 0;
  color: #333;
}

.toggle-icon {
  color: #666;
  font-size: 18px;
}

.pickup-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-bottom: 15px;
}

.pickup-item {
  display: flex;
  justify-content: space-between;
  padding: 8px;
  background-color: white;
  border-radius: 4px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

/* 이력 관련 스타일 */
.history-section {
  border-top: 1px solid #ddd;
  padding-top: 15px;
  margin-top: 10px;
}

/* 히스토리 헤더 스타일 */
.history-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.history-header h4 {
  margin: 0;
  color: #444;
}

.toggle-button {
  background-color: #f1f1f1;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 4px 10px;
  color: #666;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.toggle-button:hover {
  background-color: #e0e0e0;
}

/* 히스토리 콘텐츠 영역 */
.history-content {
  border-top: 1px solid #eee;
  padding-top: 15px;
}

.history-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 10px;
  max-height: 300px;
  overflow-y: auto;
}

.history-item {
  padding: 10px;
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
}

.history-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.15);
}

.identity-item {
  background-color: #e3f2fd;
  border-left: 4px solid #1565c0;
}

.ego-item {
  background-color: #fbe9e7;
  border-left: 4px solid #d84315;
}

.item-type {
  display: inline-block;
  padding: 2px 6px;
  border-radius: 3px;
  margin-bottom: 5px;
  font-size: 12px;
  font-weight: bold;
  background-color: rgba(255, 255, 255, 0.6);
}

.item-name {
  font-weight: bold;
  margin-bottom: 4px;
}

.item-character {
  color: #666;
  font-size: 14px;
}

.empty-history {
  padding: 20px;
  text-align: center;
  color: #999;
  background-color: white;
  border-radius: 4px;
}
</style>
