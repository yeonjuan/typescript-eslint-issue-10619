import { ESLintUtils} from "@typescript-eslint/utils";
import * as ts from "typescript";
import * as tsutils from 'ts-api-utils';
import { createRule } from "../utils.js";

function getTypeFlags(type: ts.Type): ts.TypeFlags {
  // @ts-expect-error Since typescript 5.0, this is invalid, but uses 0 as the default value of TypeFlags.
  let flags: ts.TypeFlags = 0;
  for (const t of tsutils.unionTypeParts(type)) {
    flags |= t.flags;
  }
  return flags;
}

export const rule = createRule({
  create(context) {
    const services = ESLintUtils.getParserServices(context);

    return {
      Identifier(node) {
        const type = services.getTypeAtLocation(node);
        const checker=  services.program.getTypeChecker();
        const typeName = checker.typeToString(type, undefined, ts.TypeFormatFlags.InTypeAlias)

        if (typeName === "{}") {
          context.report({
            messageId: "noImplicitEmptyObjectType",
            node: node,
          });
        }
      },
    };
  },
  meta: {
    docs: {
      description: "Find empty object types.",
      recommended: true,
      requiresTypeChecking: true,
    },
    messages: {
      noImplicitEmptyObjectType: "It's implicit empty object type",
    },
    type: "suggestion",
    schema: [],
  },
  name: "no-implicit-empty-object-type",
  defaultOptions: [],
});
