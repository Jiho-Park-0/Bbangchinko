import { DataItem } from "@/types/index";
import { drawSingle, drawTen } from "./gachaLogic";

export default class GachaHandler {
  allData: DataItem[];
  identityExcludedIds: number[];
  egoIncludedIds: number[];
  identityPickups: number[];
  egoPickups: number[];

  constructor(
    allData: DataItem[],
    identityExcludedIds: number[],
    egoIncludedIds: number[],
    identityPickups: number[],
    egoPickups: number[]
  ) {
    this.allData = allData;
    this.identityExcludedIds = identityExcludedIds;
    this.egoIncludedIds = egoIncludedIds;
    this.identityPickups = identityPickups;
    this.egoPickups = egoPickups;
  }

  getFilteredData(): DataItem[] {
    return this.allData.filter((item: DataItem) => {
      if (
        item.type === "identity" &&
        this.identityExcludedIds.includes(item.id)
      ) {
        return false;
      }
      if (item.type === "ego" && !this.egoIncludedIds.includes(item.id)) {
        return false;
      }
      return true;
    });
  }

  drawSingle(): DataItem {
    const filteredData = this.getFilteredData();
    return drawSingle(
      filteredData,
      false,
      this.identityPickups,
      this.egoPickups
    );
  }

  drawTen(): DataItem[] {
    const filteredData = this.getFilteredData();
    return drawTen(filteredData, this.identityPickups, this.egoPickups);
  }
}
