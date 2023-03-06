import { useEffect } from "react";

export function useLogEffect(msg, color = "green") {
  useEffect(() => {
    if (typeof msg === "string") {
      console.log("%c" + msg, `color:${color}`);
    } else {
      console.log(msg);
    }
  }, [msg]);

  return null;
}
