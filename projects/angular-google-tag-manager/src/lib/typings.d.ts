export {};

declare global {
  interface Window {
    dataLayer: any[] | null;
  }
}
