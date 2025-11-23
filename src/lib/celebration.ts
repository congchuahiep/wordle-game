"use client";

import confetti from "canvas-confetti";

const unicorn = confetti.shapeFromText({ text: "🦄", scalar: 5 });
const laugh1 = confetti.shapeFromText({ text: "🤪", scalar: 5 });
const laugh2 = confetti.shapeFromText({ text: "😁", scalar: 5 });
const laugh3 = confetti.shapeFromText({ text: "😆", scalar: 5 });
const laugh4 = confetti.shapeFromText({ text: "🤣", scalar: 5 });
const confettiEmoji = confetti.shapeFromText({ text: "🎊", scalar: 5 });
const nooo = confetti.shapeFromText({ text: "😵", scalar: 5 });
const dizzy = confetti.shapeFromText({ text: "😵‍💫", scalar: 5 });
const haiz = confetti.shapeFromText({ text: "😤", scalar: 5 });
const angry = confetti.shapeFromText({ text: "😡", scalar: 5 });
const spam = confetti.shapeFromText({ text: "🤬", scalar: 5 });
const cry = confetti.shapeFromText({ text: "😭", scalar: 5 });
const sad = confetti.shapeFromText({ text: "🥹", scalar: 5 });
const nohope = confetti.shapeFromText({ text: "🥲", scalar: 5 });
const nause = confetti.shapeFromText({ text: "🤢", scalar: 5 });
const vomit = confetti.shapeFromText({ text: "🤮", scalar: 5 });

const nahShapes = [
  nooo,
  dizzy,
  haiz,
  laugh2,
  laugh3,
  sad,
  nohope,
  nause,
  vomit,
];

const goodShapes = [unicorn, laugh1, laugh2, laugh3, laugh4, confettiEmoji];

const badShapes = [
  nooo,
  dizzy,
  haiz,
  angry,
  spam,
  cry,
  sad,
  nohope,
  nause,
  vomit,
];

const nahSoundFiles = [
  "/sound-effect/guess_1.mp3",
  "/sound-effect/guess_2.mp3",
  "/sound-effect/guess_3.mp3",
  "/sound-effect/guess_4.mp3",
  "/sound-effect/guess_5.mp3",
];

export const celebration = (mode: "good" | "bad" | "nah" = "nah") => {
  const randomIndex = Math.floor(Math.random() * nahSoundFiles.length);
  const audio = new Audio(
    mode === "good"
      ? "/sound-effect/congratulation.mp3"
      : mode === "bad"
        ? "/sound-effect/lose.mp3"
        : nahSoundFiles[randomIndex],
  );
  audio.play();

  confetti({
    particleCount: 40,
    angle: 60,
    spread: 150,
    startVelocity: 60,
    origin: { x: 0, y: 0.5 },
    shapes:
      mode === "good" ? goodShapes : mode === "bad" ? badShapes : nahShapes,
    scalar: 10,
  });
  confetti({
    particleCount: 40,
    angle: 120,
    spread: 150,
    startVelocity: 60,
    origin: { x: 1, y: 0.5 },
    shapes:
      mode === "good" ? goodShapes : mode === "bad" ? badShapes : nahShapes,
    scalar: 10,
  });
};
