import { useCallback } from "react";

export function useReCaptcha() {
  const executeReCaptcha = useCallback(async (action: string) => {
    return new Promise((resolve) => {
      window.grecaptcha.ready(() => {
        window.grecaptcha
          .execute(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!, {
            action,
          })
          .then((token: string) => {
            resolve(token);
          });
      });
    });
  }, []);

  return { executeReCaptcha };
}