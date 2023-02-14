import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Stack, Typography as T, useResponsive } from "@oskarengstrom/sage-ui";
import sortArrayByName from "@/utils/sortArrayByName";
import styled from "@emotion/styled";
import IconMenuLeftAlt from "./icons/IconMenuLeftAlt";

export default function NavBar({ data }) {
  const { breakpoint } = useResponsive();
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    console.log(breakpoint);
    breakpoint === "sm" ? setShowMenu(false) : setShowMenu(true);
  }, [breakpoint]);

  return (
    <Stack gap={2} as="nav">
      <Stack
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Link href={`/`}>
          <T fontWeight="800">SAGE-UI 🎨</T>
        </Link>
        {breakpoint === "sm" && (
          <IconMenuLeftAlt
            onClick={() => setShowMenu((s) => !s)}
            style={{ cursor: "pointer" }}
          />
        )}
      </Stack>

      <StackStyled gap={2} showMenu={showMenu}>
        <Stack>
          <T variant="caption">Components</T>
          {sortArrayByName(data.components).map((component) => (
            <T variant="component" key={component.data.name}>
              <Link href={`/components/${component.uid}`}>
                {component.data.name}
              </Link>
            </T>
          ))}
        </Stack>
        <Stack>
          <T variant="caption">Utilities</T>
          {sortArrayByName(data.utilities).map((util) => (
            <T variant="mixin" key={util.data.name}>
              <Link href={`/utilities/${util.uid}`}>{util.data.name}</Link>
            </T>
          ))}
        </Stack>
        <Stack>
          <T variant="caption">Mixin groups</T>
          {sortArrayByName(data.mixinGroups).map((prop) => (
            <T variant="mixin" key={prop.data.name}>
              <Link href={`/mixins/${prop.uid}`}>{prop.data.name}</Link>
            </T>
          ))}
        </Stack>
      </StackStyled>
    </Stack>
  );
}

const StackStyled = styled(Stack)`
  display: ${({ showMenu }) => (showMenu ? "flex" : "none")};
`;
