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

`dev` true | false

`base` number[]

`gap` number[] (rem) | css value[]

`gapx`number[] (rem) | css value[]

`gapy`number[] (rem) | css value[]

`placeItems` string[], ex: "center center" (css grid shorthand)

## Grid.Item

Not required, but handy to do spanning, alignment and col placement.

`span` number[]

`placeSelf` string[], ex: "start center" (css grid shorthand)
