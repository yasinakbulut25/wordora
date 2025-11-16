export const handleSpeak = (text?: string, lang: string = "en-US") => {
  if (!text) return;
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang;
  speechSynthesis.speak(utterance);
};
