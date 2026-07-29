function enc(segment: string): string {
  return encodeURIComponent(segment);
}

export function normalizePageRouteSegment(segment: string): string {
  return segment.replace(/\s+/g, "").replace(/[оО][бБ]/g, "b");
}

export function fundPath(fund: string): string {
  return `/${enc(fund)}/`;
}

export function inventoryPath(fund: string, inventory: string): string {
  return `/${enc(fund)}/${enc(inventory)}/`;
}

export function casePath(
  fund: string,
  inventory: string,
  caseNumber: string,
): string {
  return `/${enc(fund)}/${enc(inventory)}/${enc(caseNumber)}/`;
}

export function pagePath(
  fund: string,
  inventory: string,
  caseNumber: string,
  pageNum: string,
): string {
  const normalizedPage = normalizePageRouteSegment(pageNum);
  return `/${enc(fund)}/${enc(inventory)}/${enc(caseNumber)}/${enc(normalizedPage)}/`;
}
