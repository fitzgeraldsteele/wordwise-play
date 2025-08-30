export interface WordData {
  word: string;
  onset: string;
  rime: string;
}

export interface WordFamily {
  id: string;
  displayName: string;
  rime: string;
  words: WordData[];
}

export const wordFamilies: Record<string, WordFamily> = {
  "ad": {
    id: "ad",
    displayName: "-ad family",
    rime: "ad",
    words: [
      { word: "bad", onset: "b", rime: "ad" },
      { word: "dad", onset: "d", rime: "ad" },
      { word: "had", onset: "h", rime: "ad" },
      { word: "sad", onset: "s", rime: "ad" },
      { word: "mad", onset: "m", rime: "ad" },
      { word: "pad", onset: "p", rime: "ad" },
      { word: "lad", onset: "l", rime: "ad" },
      { word: "glad", onset: "gl", rime: "ad" },
      { word: "rad", onset: "r", rime: "ad" }
    ]
  },
  "at": {
    id: "at",
    displayName: "-at family",
    rime: "at",
    words: [
      { word: "cat", onset: "c", rime: "at" },
      { word: "bat", onset: "b", rime: "at" },
      { word: "hat", onset: "h", rime: "at" },
      { word: "sat", onset: "s", rime: "at" },
      { word: "mat", onset: "m", rime: "at" },
      { word: "rat", onset: "r", rime: "at" },
      { word: "fat", onset: "f", rime: "at" },
      { word: "flat", onset: "fl", rime: "at" },
      { word: "chat", onset: "ch", rime: "at" }
    ]
  },
  "an": {
    id: "an",
    displayName: "-an family",
    rime: "an",
    words: [
      { word: "man", onset: "m", rime: "an" },
      { word: "pan", onset: "p", rime: "an" },
      { word: "can", onset: "c", rime: "an" },
      { word: "ran", onset: "r", rime: "an" },
      { word: "fan", onset: "f", rime: "an" },
      { word: "tan", onset: "t", rime: "an" },
      { word: "plan", onset: "pl", rime: "an" },
      { word: "scan", onset: "sc", rime: "an" },
      { word: "than", onset: "th", rime: "an" }
    ]
  },
  "in": {
    id: "in",
    displayName: "-in family",
    rime: "in",
    words: [
      { word: "bin", onset: "b", rime: "in" },
      { word: "fin", onset: "f", rime: "in" },
      { word: "pin", onset: "p", rime: "in" },
      { word: "win", onset: "w", rime: "in" },
      { word: "tin", onset: "t", rime: "in" },
      { word: "chin", onset: "ch", rime: "in" },
      { word: "spin", onset: "sp", rime: "in" },
      { word: "twin", onset: "tw", rime: "in" },
      { word: "thin", onset: "th", rime: "in" }
    ]
  },
  "og": {
    id: "og",
    displayName: "-og family",
    rime: "og",
    words: [
      { word: "dog", onset: "d", rime: "og" },
      { word: "log", onset: "l", rime: "og" },
      { word: "fog", onset: "f", rime: "og" },
      { word: "hog", onset: "h", rime: "og" },
      { word: "jog", onset: "j", rime: "og" },
      { word: "clog", onset: "cl", rime: "og" },
      { word: "frog", onset: "fr", rime: "og" },
      { word: "smog", onset: "sm", rime: "og" }
    ]
  },
  "am": {
    id: "am",
    displayName: "-am family",
    rime: "am",
    words: [
      { word: "ham", onset: "h", rime: "am" },
      { word: "jam", onset: "j", rime: "am" },
      { word: "ram", onset: "r", rime: "am" },
      { word: "yam", onset: "y", rime: "am" },
      { word: "cam", onset: "c", rime: "am" },
      { word: "clam", onset: "cl", rime: "am" },
      { word: "tram", onset: "tr", rime: "am" },
      { word: "slam", onset: "sl", rime: "am" },
      { word: "cram", onset: "cr", rime: "am" }
    ]
  },
  "ug": {
    id: "ug",
    displayName: "-ug family",
    rime: "ug",
    words: [
      { word: "bug", onset: "b", rime: "ug" },
      { word: "hug", onset: "h", rime: "ug" },
      { word: "mug", onset: "m", rime: "ug" },
      { word: "rug", onset: "r", rime: "ug" },
      { word: "jug", onset: "j", rime: "ug" },
      { word: "drug", onset: "dr", rime: "ug" },
      { word: "plug", onset: "pl", rime: "ug" },
      { word: "snug", onset: "sn", rime: "ug" }
    ]
  },
  "op": {
    id: "op",
    displayName: "-op family",
    rime: "op",
    words: [
      { word: "hop", onset: "h", rime: "op" },
      { word: "pop", onset: "p", rime: "op" },
      { word: "top", onset: "t", rime: "op" },
      { word: "mop", onset: "m", rime: "op" },
      { word: "cop", onset: "c", rime: "op" },
      { word: "chop", onset: "ch", rime: "op" },
      { word: "drop", onset: "dr", rime: "op" },
      { word: "stop", onset: "st", rime: "op" },
      { word: "shop", onset: "sh", rime: "op" }
    ]
  },
  "ight": {
    id: "ight",
    displayName: "-ight family",
    rime: "ight",
    words: [
      { word: "light", onset: "l", rime: "ight" },
      { word: "sight", onset: "s", rime: "ight" },
      { word: "right", onset: "r", rime: "ight" },
      { word: "night", onset: "n", rime: "ight" },
      { word: "fight", onset: "f", rime: "ight" },
      { word: "might", onset: "m", rime: "ight" },
      { word: "tight", onset: "t", rime: "ight" },
      { word: "bright", onset: "br", rime: "ight" },
      { word: "flight", onset: "fl", rime: "ight" }
    ]
  },
  "ack": {
    id: "ack",
    displayName: "-ack family",
    rime: "ack",
    words: [
      { word: "back", onset: "b", rime: "ack" },
      { word: "pack", onset: "p", rime: "ack" },
      { word: "sack", onset: "s", rime: "ack" },
      { word: "rack", onset: "r", rime: "ack" },
      { word: "jack", onset: "j", rime: "ack" },
      { word: "lack", onset: "l", rime: "ack" },
      { word: "track", onset: "tr", rime: "ack" },
      { word: "crack", onset: "cr", rime: "ack" },
      { word: "black", onset: "bl", rime: "ack" }
    ]
  },
  "ail": {
    id: "ail",
    displayName: "-ail family",
    rime: "ail",
    words: [
      { word: "mail", onset: "m", rime: "ail" },
      { word: "sail", onset: "s", rime: "ail" },
      { word: "rail", onset: "r", rime: "ail" },
      { word: "tail", onset: "t", rime: "ail" },
      { word: "nail", onset: "n", rime: "ail" },
      { word: "fail", onset: "f", rime: "ail" },
      { word: "hail", onset: "h", rime: "ail" },
      { word: "pail", onset: "p", rime: "ail" },
      { word: "trail", onset: "tr", rime: "ail" }
    ]
  }
};

export const wordFamilyList = Object.values(wordFamilies);

// Utility functions
export function shuffleWords(words: WordData[]): WordData[] {
  const shuffled = [...words];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function getTotalWordsCount(familyIds: string[]): number {
  return familyIds.reduce((total, id) => {
    return total + (wordFamilies[id]?.words.length || 0);
  }, 0);
}