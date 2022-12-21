# Section

Looks in theme to automatically add x-padding and background color

Required in theme:

```
theme = {
  bp: ["0rem", "36rem", "62rem", "75rem"],
  section: {
    maxWidth: "62rem",
    xPadding: ["1rem", "2rem"],
  },
  palette: {
    background: "black"
  }
}
```

Usage:

```
<Section>
    ...
</Section>

// With background color
<Section backgroundColor="red">
    ...
</Section>
```

### Props

`dev` true | false

`backgroundColor` string (overrides background color from theme)

### TODO

⬜️ Build pad override via props
