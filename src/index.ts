import { parser } from "./syntax.grammar";
import { LRLanguage, LanguageSupport } from "@codemirror/language";
import { styleTags, tags as t } from "@lezer/highlight";

export const TelLanguage = LRLanguage.define({
  name: "tel",
  parser: parser.configure({
    props: [
      styleTags({
        MultilineString: t.special(t.string),
        MultilineStringTag: t.meta,
        BooleanLiteral: t.bool,
        null: t.null,
        VariableName: t.variableName,
        "CallExpression/VariableName": t.function(t.variableName),
        PropertyName: t.propertyName,
        "CallExpression/MemberExpression/PropertyName": t.function(
          t.propertyName
        ),
        LineComment: t.lineComment,
        BlockComment: t.blockComment,
        Number: t.number,
        String: t.string,
        Escape: t.escape,
        ArithOp: t.arithmeticOperator,
        LogicOp: t.logicOperator,
        BitOp: t.bitwiseOperator,
        CompareOp: t.compareOperator,
        Equals: t.definitionOperator,
        Arrow: t.function(t.punctuation),
        Identifier: t.variableName,
        Environment: t.special(t.variableName),
        "( )": t.paren,
        "[ ]": t.squareBracket,
        "{ }": t.brace,
        ".": t.derefOperator,
        ", ;": t.separator,
      }),
    ],
  }),
  languageData: {
    commentTokens: { line: "//", block: { open: "/*", close: "*/" } },
  },
});

export function TEL() {
  return new LanguageSupport(TelLanguage);
}
