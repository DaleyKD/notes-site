export interface ChapterLink {
  id: string;
  label: string;
  href: string;
  note?: string;
}

export const chapters: ChapterLink[] = [
  { id: "origins", label: "Origins: Hall C", href: "/career/origins" },
  { id: "act-i", label: "Act I: An Unexpected Fork", href: "/career/act-i" },
  { id: "act-ii", label: "Act II: Building an Engineer", href: "/career/act-ii" },
  { id: "act-iii", label: "Act III", href: "/career/act-iii", note: "(title TBD)" },
];
