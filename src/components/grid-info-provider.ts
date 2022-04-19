export class GridInfoProvider {
  cols?: number;
  size?: GridSize;
}

export function getGridDescriptionInfo(size: GridSize, description: string) {
  const order = getSizeOrder(size);
  const items = <{order: number, info: string}[]>[];

  const tokens = description.split(" ");
  for (const token of tokens) {
    let x = token.split(":");
    if (x.length === 1) {
      x = ["xs", x[0]];
    }
    
    const o = getSizeOrder(x[0] as GridSize);
    if (o < order) {
      continue;
    }
    
    items.push({
      order: o,
      info: x[1]
    });
  }
  
  if (items.length === 0) {
    return null;
  }
  
  return items.sort((a, b) => a.order - b.order)[0].info;
}
function getSizeOrder(size: GridSize) {
  switch (size) {
    case "xl": {
      return 0;
    }
    case "l": {
      return 1;
    }
    case "m": {
      return 2;
    }
    case "s": {
      return 3;
    }
    default: {
      return 4;
    }
  }
}

export type GridSize = "xs" | "s" | "m" | "l" | "xl";