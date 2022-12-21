import { defaultTheme } from "../theming/defaultTheme";

const fallback = defaultTheme.bp;

const mq = {
  only: {
    sm: ({ theme }) =>
      `@media (max-width: calc(${theme.bp ? theme.bp[1] : fallback[1]} - 1px))`,
    md: ({ theme }) =>
      `@media (min-width: ${
        theme.bp ? theme.bp[1] : fallback[1]
      }) and (max-width: calc(${theme.bp ? theme.bp[2] : fallback[2]} - 1px))`,
    lr: ({ theme }) =>
      `@media (min-width: ${
        theme.bp ? theme.bp[2] : fallback[2]
      }) and (max-width: calc(${theme.bp ? theme.bp[3] : fallback[3]} - 1px))`,
    xl: ({ theme }) =>
      `@media (min-width: ${theme.bp ? theme.bp[3] : fallback[3]})`,
    computer: `@media (hover: hover) and (pointer: fine)`,
    touchDevice: `@media (hover: none) and (pointer: coarse)`,
    stylus: `@media (hover: none) and (pointer: fine)`,
    retina: `@media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi)`,
  },
  up: {
    md: ({ theme }) =>
      `@media (min-width: ${theme.bp ? theme.bp[1] : fallback[1]})`,
    lr: ({ theme }) =>
      `@media (min-width: ${theme.bp ? theme.bp[2] : fallback[2]})`,
    xl: ({ theme }) =>
      `@media (min-width: ${theme.bp ? theme.bp[3] : fallback[3]})`,
  },
  down: {
    sm: ({ theme }) =>
      `@media (max-width: calc(${theme.bp ? theme.bp[1] : fallback[1]} - 1px))`,
    md: ({ theme }) =>
      `@media (max-width: calc(${theme.bp ? theme.bp[2] : fallback[2]} - 1px))`,
    lr: ({ theme }) =>
      `@media (max-width: calc(${theme.bp ? theme.bp[3] : fallback[3]} - 1px))`,
  },
  supports: {
    hover: `@media (hover: hover)`,
  },
};

export default mq;
