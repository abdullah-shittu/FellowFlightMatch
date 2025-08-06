import { useEffect } from "react";
import { useRouter } from "next/navigation"; // or react-router

function useAuthGuard() {
  const router = useRouter();

  useEffect(() => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("fellowflight_access_token="))
      ?.split("=")[1];

    const formComplete = document.cookie
      .split("; ")
      .find((row) => row.startsWith("fellowflight_form_complete="))
      ?.split("=")[1];

    const currentPath = window.location.pathname;

    if (!token) {
      if (currentPath !== "/") {
        router.replace("/");
      }
    } else {
      if (formComplete !== "true" && currentPath !== "/form") {
        router.replace("/form");
      } else if (formComplete === "true" && currentPath !== "/matches") {
        router.replace("/matches");
      }
    }
  }, [router]);
}

export default useAuthGuard;