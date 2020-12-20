export interface GoogleTagManagerConfig {
  id: string | null;
  gtm_auth?: string;
  gtm_preview?: string;
  [key: string]: string | null | undefined;
}

declare global {
  interface Window {
    dataLayer: any[] | null;
  }
}
