/// <reference types="vite/client" />

export interface IElectronAPI {
  sendNotification: (message: string) => void;
}

declare global {
  interface Window {
    api: IElectronAPI;
  }
}
