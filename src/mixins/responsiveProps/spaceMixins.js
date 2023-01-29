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

const mt = ({ mt }) =>
  responsiveProp({
    func: (x) =>
      css`
        margin-top: ${x};
      `,
    val: mt,
    interpolation: "rem",
  });

const mr = ({ mr }) =>
  responsiveProp({
    func: (x) =>
      css`
        margin-right: ${x};
      `,
    val: mr,
    interpolation: "rem",
  });

const mb = ({ mb }) =>
  responsiveProp({
    func: (x) =>
      css`
        margin-bottom: ${x};
      `,
    val: mb,
    interpolation: "rem",
  });

const ml = ({ ml }) =>
  responsiveProp({
    func: (x) =>
      css`
        margin-left: ${x};
      `,
    val: ml,
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

const pt = ({ pt }) =>
  responsiveProp({
    func: (x) =>
      css`
        padding-top: ${x};
      `,
    val: pt,
    interpolation: "rem",
  });

const pr = ({ pr }) =>
  responsiveProp({
    func: (x) =>
      css`
        padding-right: ${x};
      `,
    val: pr,
    interpolation: "rem",
  });

const pb = ({ pb }) =>
  responsiveProp({
    func: (x) =>
      css`
        padding-bottom: ${x};
      `,
    val: pb,
    interpolation: "rem",
  });

const pl = ({ pl }) =>
  responsiveProp({
    func: (x) =>
      css`
        padding-left: ${x};
      `,
    val: pl,
    interpolation: "rem",
  });

export default [m, mx, my, mt, mr, mb, ml, p, px, py, pt, pr, pb, pl];
