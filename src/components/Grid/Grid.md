# Grid

```
<Grid base={12} dev>
    <Grid.Item span={10}>...</Grid.Item>
    <Grid.Item>...</Grid.Item>
    <Grid.Item>...</Grid.Item>
</Grid>
```

## Grid

### Props

`base` number[]

`gap` number[] (rem) | css value[]

`gapx`number[] (rem) | css value[]

`gapy`number[] (rem) | css value[]

`placeItems` string[], ex: "center center" (css grid shorthand)

{sizeMixins}

{spaceMixins}

## Grid.Item

Not required, but handy to do spanning, alignment and col placement.

### Props

`span` number[]

`gridColumn` string[]

`order` number[]

`placeSelf` string[], ex: "start center" (css grid shorthand)

`dev` bool

`as` element

{sizeMixins}

{spaceMixins}
