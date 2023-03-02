import React from "react";
import { Stack, Typography as T } from "@oskarengstrom/sage-ui";
import Link from "next/link";

export default function InputItem({ input, responsive, ...restProps }) {
  if (!input) return null;

  return (
    <T key={input.uid} variant="prop" {...restProps}>
      <Link href={`/inputs/${input.uid}`}>
        {input.data.name}
        {responsive && "[]"}
      </Link>
    </T>
  );
}
