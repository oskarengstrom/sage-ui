import { css } from "@emotion/react";
import { responsiveProp } from "../../utils/responsiveProp";

const m = ({ m }) =>
  responsiveProp({
    func: (x) =>
      css`
        margin: ${x};
      `,
    val: m,
    interpolation: "rem",
  });

const mx = ({ mx }) =>
  responsiveProp({
    func: (x) =>
      css`
        margin-left: ${x};
        margin-right: ${x};
      `,
    val: mx,
    interpolation: "rem",
  });

const my = ({ my }) =>
  responsiveProp({
    func: (x) =>
      css`
        margin-top: ${x};
        margin-bottom: ${x};
      `,
    val: my,
    interpolation: "rem",
  });

const p = ({ p }) =>
  responsiveProp({
    func: (x) =>
      css`
        padding: ${x};
      `,
    val: p,
    interpolation: "rem",
  });

const px = ({ px }) =>
  responsiveProp({
    func: (x) =>
      css`
        padding-left: ${x};
        padding-right: ${x};
      `,
    val: px,
    interpolation: "rem",
  });

const py = ({ py }) =>
  responsiveProp({
    func: (x) =>
      css`
        padding-top: ${x};
        padding-bottom: ${x};
      `,
    val: py,
    interpolation: "rem",
  });

export default [m, mx, my, my, p, px, py, py];
