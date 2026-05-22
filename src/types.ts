export interface ProjectTimelineItem {
  date: string;
  titlePersian: string;
  titleEnglish: string;
}

export interface ProjectImages {
  hero: string;
  interior: string;
  sketch: string;
  construction: string;
}

export interface MapCoords {
  x: number;
  y: number;
}

export interface Project {
  id: string;
  slug: string;
  titlePersian: string;
  titleEnglish: string;
  locationPersian: string;
  locationEnglish: string;
  architectPersian: string;
  architectEnglish: string;
  area: string;
  floors: string;
  statusPersian: string;
  statusEnglish: string;
  progressPercent?: number;
  descriptionPersian: string;
  descriptionEnglish: string;
  mapCoords: MapCoords;
  isMajor: boolean;
  hasSketches?: boolean;
  images?: ProjectImages;
  timeline?: ProjectTimelineItem[];
}
