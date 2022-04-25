export enum AssetsViewMode {OVERVIEW, TECHNICAL, PERFORMANCE}

export function assetsViewModes(): string[] {
  return Object.keys(AssetsViewMode)
    .map(key => AssetsViewMode[key])
    .filter(value => typeof value === 'string') as string[];
}
