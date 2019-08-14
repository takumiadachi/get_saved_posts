# Get Saved Posts

get_saved_posts is an api that lets you get posts you've saved or posts online in an easy to digest format with alot of uneeded meta-data trimmed.

## Develop

```
npm install
npm run dev
```

## Run as Web API

```
npm run dev
# visit http://localhost:4201/reddit/getPost/evsqjhn
```

## Tests

```
npm run test
```

<!--
## Run as code

Find the id of a comment in a reddit URL like this: https://www.reddit.com/r/bestof/comments/cl210q/the_truth_about_medicare_for_all/evsqjhn?utm_source=share&utm_medium=web2x

_cl210q_ is the comment id wwe want.

in [index.ts](index.ts) file, uncomment some of the code and place the id in one of the functions. Look for this code:

```
const content = await getPostByIdExpanded("ev0azy2", 0); // Replace ev0azy2 with another comment id
const json = JSON.stringify(content);
fs.writeFile("reddit_me.json", json, (err, result) => {
  if (err) console.log("error", err);
});
```

Then run

```
npx ts-node src/index.ts
// Outputs reddit_me.json
```
-->

## Example JSON Output

[example.json](example.json)

```
{
  "created": "26-07-2019 10:57:06",
  "ups": score hidden,
  "body": "Think of it like a Buzzfeed quiz. You answer a bunch of multiple-choice input questions about seemingly random topics ('What's your favourite breakfast cereal?', 'What's your favourite classic movie?', 'What did you want to be when you grew up?', and so on), and you get a response back at the end: usually which Hogwarts house you belong in.\n\nBut shock, horror: after answering twenty questions honestly, Buzzfeed informs you that you are a Hufflepuff, when you *know* that you're actually (obviously) a Ravenclaw. So you take the test again. You change one answer, and boom! Now Buzzfeed tells you that you're the Ravenclaw you always knew you were meant to be.\n\nBut you start to wonder: just how many of the input questions could you change in order to change the output? Some of them won't make a difference to the result; ...
  "replies": [{
    "created": "26-07-2019 12:05:32",
    "ups": score hidden,
    "body": "Assuming you know what you’re talking about (and it sure sounds like you do) this is one of the best ELI5s I’ve read here.\n\n(I’m not doubting you, it’s just that some people can write really beautiful explanations despite being completely wrong, especially on this sub...)",
    "replies": [{
      "created": "26-07-2019 12:15:47",
      "ups": score hidden,
      "body": "I had a *vague* idea before I started looking into it specifically to answer this, but I'll be the first to admit that it's not exactly my field. If anyone wants to pick me up on factual errors (not how basic it is, but on the actual facts; I did try and make it as simple as possible on purpose, because it's a pretty esoteric topic as it is), I'll happily edit to fix any mistakes I might have made.\n\nThere's a longer and more in-depth explanation [here](https://www.quantamagazine.org/mathematician-solves-computer-science-conjecture-in-two-pages-20190725/) that makes for pretty good reading.",
      "replies": [{
        "created": "26-07-2019 12:40:31",
        "ups": score hidden,
        "body": "You sir are the true spirit of ELI5. I was 5 when I started reading that and now I’m definitely 6 at least.",
        "replies": [{..More Replies}]
      }]
    }]
    ...
  }
```

## Terminology

https://www.reddit.com/r/AskReddit/comments/cq6xft/what_do_you_like_most_about_yourself/ewuczoy

**Posts**: All submissions and comments are posts.

**Submissions**: A _Submission_ has _Comments_. It has the main topic where everyone posts comments discussing the topic. 'cq6xft' is a unique submission id.

**Comments**: This has the main body of text the reddit poster makes. 'ewuczoy' is a unique comment id.
