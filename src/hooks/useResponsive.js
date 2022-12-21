import { ThemeContext, useTheme } from "@emotion/react";
import { remToPx, stripUnit } from "polished";
import React, { useEffect, useState } from "react";

// USAGE:
// const { isMobile, breakpoint } = useResponsive()
//
// isMobile = Is the device an actual phone,
// breakpoint = shows the current screen width in sm/md/lr/xl,

export const useResponsive = () => {
  let { bp } = useTheme(ThemeContext);

  // fallback if theme is not present
  bp = bp ? bp : ["0rem", "36rem", "62rem", "75rem"];

  const [isMobile, setMobile] = useState(false);
  const [breakpoint, setBreakpoint] = useState(false);
  const [breakpointIndex, setBreakpointIndex] = useState(false);

  const calcBreakpoint = () => {
    const width = window.innerWidth > 0 ? window.innerWidth : screen.width;
    if (width > stripUnit(remToPx(bp[3]))) {
      setBreakpoint("xl");
      setBreakpointIndex(3);
    } else if (width > stripUnit(remToPx(bp[2]))) {
      setBreakpoint("lr");
      setBreakpointIndex(2);
    } else if (width > stripUnit(remToPx(bp[1]))) {
      setBreakpoint("md");
      setBreakpointIndex(1);
    } else {
      setBreakpoint("sm");
      setBreakpointIndex(0);
    }
  };

  useEffect(() => {
    calcBreakpoint();
    window.addEventListener("resize", calcBreakpoint);
    return () => window.removeEventListener("resize", calcBreakpoint);
  }, []);

  useEffect(() => {
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
