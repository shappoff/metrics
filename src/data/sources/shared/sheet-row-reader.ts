import type { SheetRow } from "@/lib/google/types";

function readCellValue(row: SheetRow, key: string): string {
  return (row[key] ?? "").trim();
}

export function createPageReader() {
  let lastPage = "";

  return {
    pick(row: SheetRow, key: string): string {
      return readCellValue(row, key);
    },
    readPage(row: SheetRow): string {
      const currentPage = readCellValue(row, "page");

      if (currentPage) {
        lastPage = currentPage;
        return currentPage;
      }

      return lastPage || "—";
    },
  };
}
