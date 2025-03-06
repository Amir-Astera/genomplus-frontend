// src/global.d.ts
import { RecaptchaVerifier } from 'firebase/auth';

declare global {
  interface Window {
    myRecaptchaVerifier?: RecaptchaVerifier;
  }
}

export {};