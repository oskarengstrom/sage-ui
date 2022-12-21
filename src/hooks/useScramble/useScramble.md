# useScramble

```
const { generatedScramble, runScramble } = useScramble({
    sentence: "My text",
})

return (
    <div onMouseEnter={() => runScramble(10)}>
       {generatedScramble}
    </div>
)
```

## Args

`sentence` string  
 default: "Test sentence"  
 The original string.

`speed` number  
 default: 50  
 Speed of scramble.

`loops` number  
 default: 15  
 Amount of loops before settling on the original string.

`startEmpty` bool  
 default: false  
 Choose if the original string should be visible on load.
