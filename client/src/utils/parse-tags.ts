const parseTags = (text: string, taggedUsers: string[]) => {
  if (!text.includes("@")) {
    return text;
  }
  const textSplit = text.split("@");
  let parsedText = "";
  parsedText += textSplit[0];

  for (let i = 1; i < textSplit.length; i++) {
    const firstSpace = textSplit[i].indexOf(" ");
    const username = textSplit[i].substring(0, firstSpace);
    const leftText = textSplit[i].substring(firstSpace);

    if (taggedUsers.includes(username)) {
      parsedText += `<a class="bg-sky-500 cursor-pointer p-1 rounded-lg" href="/user/${username}">@${username}</a>`;
      parsedText += leftText;
    } else {
      parsedText += `@${username}`;
      parsedText += leftText;
    }
  }

  return parsedText;
};

export default parseTags;
