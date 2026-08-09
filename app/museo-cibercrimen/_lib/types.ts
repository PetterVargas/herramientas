export interface GalleryPhoto {
  id: string;
  width: number;
  height: number;
  alt: string;
  credit: { name: string; profileUrl: string };
  unsplashUrl: string;
}
