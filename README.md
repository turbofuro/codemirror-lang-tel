# TEL support for CodeMirror 6
This is a simple extension for CodeMirror 6 that adds support for the Turbofuro Expression Language.

## Usage
Use as any other extension for CodeMirror 6. For example:

```javascript
import { basicSetup, EditorView } from "codemirror"
import { tel } from "@turbofuro/codemirror-lang-tel";

new EditorView({
  doc: "\"Hello, World!\" + $TEST",
  extensions: [basicSetup, tel()],
  parent: document.body
})
```

## Mixed parsing
Like Markdown TEL supports multiline strings with tags using 3 backticks:
~~~
```html
<div>
  <p>Some text</p>
</div>
```
~~~

To add support for mixed parsing, you can use the `parseMixed` function. For example, to add support for SQL in multiline strings, you can use the following code:
```js
// import { sql, StandardSQL } from '@codemirror/lang-sql'; 

const wrap = parseMixed((nodeRef, input) => {
  if (nodeRef.name === 'MultilineStringContent') {
    const tag = nodeRef.node.parent?.getChild('MultilineStringTag');
    if (tag) {
      const tagValue = input.read(tag.from, tag.to);
      if (tagValue === 'sql') {
        return {
          parser: StandardSQL.language.parser, 
        };
      }
    }
  }

  return null;
});
```
For more information on mixed parsing, see [the official example](https://codemirror.net/examples/mixed-language/)

## License and contributions
This project is licensed under the Apache 2.0 License. Contributions are welcome 💛
Most the grammar is based on official examples and the CodeMirror JavaScript support package.