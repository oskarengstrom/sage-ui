import { ThemeContext, useTheme } from "@emotion/react";
import { remToPx, stripUnit } from "polished";
import React, { useEffect, useState } from "react";
import { defaultTheme } from "../../components/SageProvider/defaultTheme";
import useSSRLayoutEffect from "../../utils/useSSRLayoutEffect";

export const useResponsive = () => {
  let { bp } = useTheme(ThemeContext);

  // fallback if theme is not present
  bp = bp ? bp : defaultTheme.bp;

  const [isMobile, setMobile] = useState(false);
  const [breakpoint, setBreakpoint] = useState(false);
  const [breakpointIndex, setBreakpointIndex] = useState(false);

  const calcBreakpoint = () => {
    const width = window.innerWidth > 0 ? window.innerWidth : screen.width;
    if (width > stripUnit(remToPx(bp[3]))) {
      setBreakpoint("wide");
      setBreakpointIndex(4);
    } else if (width > stripUnit(remToPx(bp[2]))) {
      setBreakpoint("xl");
      setBreakpointIndex(3);
    } else if (width > stripUnit(remToPx(bp[1]))) {
      setBreakpoint("lr");
      setBreakpointIndex(2);
    } else if (width > stripUnit(remToPx(bp[0]))) {
      setBreakpoint("md");
      setBreakpointIndex(1);
    } else {
      setBreakpoint("sm");
      setBreakpointIndex(0);
    }
  };

  useSSRLayoutEffect(() => {
    calcBreakpoint();
    window.addEventListener("resize", calcBreakpoint);
    return () => window.removeEventListener("resize", calcBreakpoint);
  }, []);

  useSSRLayoutEffect(() => {
    const userAgent =
      typeof window.navigator === "undefined" ? "" : navigator.userAgent;
    const mobile = Boolean(
      userAgent.match(
        /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
      )
    );
    setMobile(mobile);
  }, []);

  return { isMobile, breakpoint, breakpointIndex };
};
