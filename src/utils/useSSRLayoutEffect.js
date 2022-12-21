import { useLayoutEffect } from "react";

const useSSRLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : () => {};

export default useSSRLayoutEffect;
