export interface Icourse {
  week: number,
  title: string,
  image: string,
  category: "backend" | "frontend" | "product-design" | "data-analysis" | "artificial-intelligence";
  type: "video" | "book"
  weeklyTask: string,
  Link: string,
};