# git-ts style guide

To begin hacking git-ts, you must first follow the style guide.

## Functions

Avoid redundant functions like the ones in the `console` object.

Bad:

```typescript
console.log("Hello!");
```

Good:

```typescript
process.stdout.write("Hello!\n");
```

An exception to this is `console.clear()`.

## Typing

This project's tsconfig.json is very strict.

## Strings

Avoid using `'`.

## Libraries

NEVER add any libraries other than TypeScript and required libraries. Don't be lazy, write the code yourself!

Sources: [https://thehackernews.com/2025/11/second-sha1-hulud-wave-affects-25000.html](https://thehackernews.com/2025/11/second-sha1-hulud-wave-affects-25000.html), [https://en.wikipedia.org/wiki/Npm_left-pad_incident](https://en.wikipedia.org/wiki/Npm_left-pad_incident)
