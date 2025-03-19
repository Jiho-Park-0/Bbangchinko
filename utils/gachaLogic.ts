import { DataItem } from "@/types/index";

function getRandomItem(items: DataItem[]): DataItem {
  return items[Math.floor(Math.random() * items.length)];
}

/**
 * 단일 뽑기 로직
 * @param allData 전체 아이템 목록 (필터링된 데이터)
 * @param guaranteedTen 10회 뽑기 마지막 보장 여부
 * @param identityPickupIds identity 픽업 id 배열
 * @param egoPickupIds ego 픽업 id 배열
 */
export function drawSingle(
  allData: DataItem[],
  guaranteedTen = false,
  identityPickupIds: number[] = [],
  egoPickupIds: number[] = []
): DataItem {
  const roll = Math.random() * 100;

  if (guaranteedTen) {
    if (roll < 1.3) {
      return getEgoItem(allData, egoPickupIds);
    } else {
      const pickupRoll = Math.random() * 100;
      if (identityPickupIds.length > 0 && pickupRoll < (1.45 / 98.7) * 100) {
        const pickups = allData.filter(
          (item) =>
            item.type === "identity" && identityPickupIds.includes(item.id)
        );
        if (pickups.length) return getRandomItem(pickups);
      }
      const gradeRoll = Math.random() * 100;
      return getIdentityItem(allData, gradeRoll, true);
    }
  } else {
    if (roll < 1.3) {
      return getEgoItem(allData, egoPickupIds);
    } else {
      const pickupRoll = Math.random() * 100;
      if (identityPickupIds.length > 0 && pickupRoll < (1.45 / 98.7) * 100) {
        const pickups = allData.filter(
          (item) =>
            item.type === "identity" && identityPickupIds.includes(item.id)
        );
        if (pickups.length) return getRandomItem(pickups);
      }
      const gradeRoll = Math.random() * 100;
      return getIdentityItem(allData, gradeRoll, false);
    }
  }
}

function getEgoItem(allData: DataItem[], egoPickupIds: number[]): DataItem {
  const egoItems = allData.filter((item) => item.type === "ego");
  const pickupEgo = egoItems.filter((item) => egoPickupIds.includes(item.id));
  if (egoPickupIds.length > 0 && Math.random() < 0.5 && pickupEgo.length > 0) {
    return getRandomItem(pickupEgo);
  }
  return getRandomItem(egoItems);
}

/**
 * identity 뽑기: 단일 뽑기 시 3성 2.9%, 2성 12.8%, 1성 83%
 * 10회 뽑기 보장 시 3성 2.9%, 2성 95.8%
 */
function getIdentityItem(
  allData: DataItem[],
  gradeRoll: number,
  guaranteedTen: boolean
): DataItem {
  if (guaranteedTen) {
    if (gradeRoll < 2.9) {
      return getIdentityByGrade(allData, 3);
    } else {
      return getIdentityByGrade(allData, 2);
    }
  } else {
    if (gradeRoll < 2.9) {
      return getIdentityByGrade(allData, 3);
    } else if (gradeRoll < 2.9 + 12.8) {
      return getIdentityByGrade(allData, 2);
    } else {
      return getIdentityByGrade(allData, 1);
    }
  }
}

function getIdentityByGrade(allData: DataItem[], grade: number): DataItem {
  const identityItems = allData.filter(
    (item) => item.type === "identity" && Number(item.grade) === grade
  );
  return getRandomItem(identityItems);
}

/**
 * 10회 뽑기 로직: 첫 9회는 단일 뽑기, 10번째는 보장 뽑기
 */
export function drawTen(
  allData: DataItem[],
  identityPickupIds: number[] = [],
  egoPickupIds: number[] = []
): DataItem[] {
  const results: DataItem[] = [];
  for (let i = 0; i < 9; i++) {
    results.push(drawSingle(allData, false, identityPickupIds, egoPickupIds));
  }
  results.push(drawSingle(allData, true, identityPickupIds, egoPickupIds));
  return results;
}
