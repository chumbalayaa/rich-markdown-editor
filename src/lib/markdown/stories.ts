import customFence from "markdown-it-container";

export default function story(md): void {
  return customFence(md, "story", {
    marker: "%",
    validate: () => true,
  });
}
