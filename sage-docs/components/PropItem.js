import React from "react";
import { Stack, Typography as T } from "@oskarengstrom/sage-ui";
import Link from "next/link";

export default function PropItem({ prop, ...restProps }) {
  if (!prop) return null;

  return (
    <T key={prop.uid} variant="prop" {...restProps}>
      <Link href={`/props/${prop.uid}`}>{prop.data.name}</Link>
    </T>
  );
}
