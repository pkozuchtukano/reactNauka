export function uuidv4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export interface ILoginLetters {
  first: string;
  second: string;
}

export function getUserLoginLetters(text: string | null): ILoginLetters {
  if (!text || !text.length) {
    return {
      first: "",
      second: "",
    };
  }

  if (text.length === 1) {
    return {
      first: text[0],
      second: text[0],
    };
  }

  return {
    first: text[0],
    second: text[1],
  };
}
