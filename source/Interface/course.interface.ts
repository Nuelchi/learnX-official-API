export interface Icourse {
  week: Number,
  title: string,
  image: string,
  category: "backend" | "frontend" | "product-design" | "data-analysis" | "artificial-intelligence";
  type: "video" | "book"
  weeklyTask: String,
  Link: string,
};