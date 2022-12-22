import { ThemeContext, css, useTheme } from "@emotion/react";
import { defaultTheme } from "../components/SageProvider/defaultTheme";

export const interpolatedProp = (v, interpolation) => {
  if (typeof v === "number") {
    return v + interpolation;
  } else {
    return v;
  }
};

export const responsiveProp = ({ func, val, interpolation = false }) => {
  const { bp } = useTheme(ThemeContext);
  const bpFb = defaultTheme.bp;

  if (val === undefined || val === null) return;

  if (interpolation) {
    if (typeof val === "number") val = interpolatedProp(val, interpolation);
    if (Array.isArray(val))
      val.forEach((x, index) => {
        if (typeof x === "number")
          val[index] = interpolatedProp(x, interpolation);
      });
  }

  val = Array.isArray(val) ? val : [val];

  return css`
    ${func(val[0])}

    @media screen and (min-width: ${bp?.[1] || bpFb[1]}) {
      ${val[1] && func(val[1])}
    }

    @media screen and (min-width: ${bp?.[2] || bpFb[2]}) {
      ${val[2] && func(val[2])}
    }

    @media screen and (min-width: ${bp?.[3] || bpFb[3]}) {
      ${val[3] && func(val[3])}
    }
  `;
};
