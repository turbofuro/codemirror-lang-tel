import { parser } from "./syntax.grammar";
import {
  LRLanguage,
  LanguageSupport,
  indentNodeProp,
  foldNodeProp,
  foldInside,
  delimitedIndent,
} from "@codemirror/language";
import { styleTags, tags as t } from "@lezer/highlight";

export const TelLanguage = LRLanguage.define({
  name: "tel",
  parser: parser.configure({
    props: [
      // TODO: Remove all non-existing keys
      styleTags({
        "get set async static": t.modifier,
        "for while do if else switch try catch finally return throw break continue default case":
          t.controlKeyword,
        "in of await yield void typeof delete instanceof": t.operatorKeyword,
        "let var const using function class extends": t.definitionKeyword,
        "import export from": t.moduleKeyword,
        "with debugger as new": t.keyword,
        TemplateString: t.special(t.string),
        MultilineString: t.special(t.string),
        MultilineStringTag: t.meta,
        super: t.atom,
        BooleanLiteral: t.bool,
        this: t.self,
        null: t.null,
        Star: t.modifier,
        VariableName: t.variableName,
        "CallExpression/VariableName TaggedTemplateExpression/VariableName":
          t.function(t.variableName),
        VariableDefinition: t.definition(t.variableName),
        Label: t.labelName,
        PropertyName: t.propertyName,
        PrivatePropertyName: t.special(t.propertyName),
        "CallExpression/MemberExpression/PropertyName": t.function(
          t.propertyName
        ),
        "FunctionDeclaration/VariableDefinition": t.function(
          t.definition(t.variableName)
        ),
        "ClassDeclaration/VariableDefinition": t.definition(t.className),
        PropertyDefinition: t.definition(t.propertyName),
        PrivatePropertyDefinition: t.definition(t.special(t.propertyName)),
        UpdateOp: t.updateOperator,
        "LineComment Hashbang": t.lineComment,
        BlockComment: t.blockComment,
        Number: t.number,
        String: t.string,
        Escape: t.escape,
        ArithOp: t.arithmeticOperator,
        LogicOp: t.logicOperator,
        BitOp: t.bitwiseOperator,
        CompareOp: t.compareOperator,
        RegExp: t.regexp,
        Equals: t.definitionOperator,
        Arrow: t.function(t.punctuation),
        ": Spread": t.punctuation,
        "( )": t.paren,
        "[ ]": t.squareBracket,
        "{ }": t.brace,
        "InterpolationStart InterpolationEnd": t.special(t.brace),
        ".": t.derefOperator,
        ", ;": t.separator,
        "@": t.meta,
        TypeName: t.typeName,
        TypeDefinition: t.definition(t.typeName),
        "type enum interface implements namespace module declare":
          t.definitionKeyword,
        "abstract global Privacy readonly override": t.modifier,
        "is keyof unique infer": t.operatorKeyword,
        JSXAttributeValue: t.attributeValue,
        JSXText: t.content,
        "JSXStartTag JSXStartCloseTag JSXSelfCloseEndTag JSXEndTag":
          t.angleBracket,
        "JSXIdentifier JSXNameSpacedName": t.tagName,
        "JSXAttribute/JSXIdentifier JSXAttribute/JSXNameSpacedName":
          t.attributeName,
        "JSXBuiltin/JSXIdentifier": t.standard(t.tagName),
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
