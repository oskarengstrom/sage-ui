import { useEffect, useState } from "react";

// exchanging all chars to spaces so that it doesn't load with the sentence
const createSpaces = (sentence) => {
  const result = [];
  sentence.split(" ").forEach((word) => {
    let output = "";

    for (let index = 0; index < word.length; index++) {
      output += " ";
    }

    result.push(output);
  });
  return result.join(" ");
};

// the hook
const useScramble = ({
  sentence = "Test sentence",
  speed = 50,
  loops = 15,
  startEmpty = false,
}) => {
  const [generatedScramble, setGeneratedScramble] = useState(
    startEmpty ? createSpaces(sentence) : sentence
  );
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  const genNewScramble = (sentence) => {
    const result = [];
    sentence.split(" ").forEach((word) => {
      let output = "";
      const charactersLength = characters.length;
      for (let i = 0; i < word.length; i++) {
        output += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        );
      }
      result.push(output);
    });
    return result.join(" ");
  };

  const runScramble = (customLoops) => {
    const timer = (ms) => new Promise((res) => setTimeout(res, ms));
    async function load() {
      for (var i = 0; i < (customLoops ? customLoops : loops); i++) {
        if (i < (customLoops ? customLoops : loops) - 1) {
          setGeneratedScramble(genNewScramble(sentence));
        } else {
          setGeneratedScramble(sentence);
        }
        await timer(speed);
      }
    }
    load();
  };

  return { generatedScramble, runScramble };
};

export default useScramble;
