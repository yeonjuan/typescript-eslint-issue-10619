import { ESLintUtils} from "@typescript-eslint/utils";
import * as ts from "typescript";
import { createRule } from "../utils.js";

export const rule = createRule({
  create(context) {
    const services = ESLintUtils.getParserServices(context);

    return {
      TSTypeAliasDeclaration(node) {
        const type = services.getTypeAtLocation(node.id);
        const checker=  services.program.getTypeChecker();
        const typeName = checker.typeToString(type, undefined, ts.TypeFormatFlags.InTypeAlias)

        if (typeName === "{}") {
          context.report({
            messageId: "noImplicitEmptyObjectType",
            node: node.id,
          });
        }
      },
      TSTypeReference(node) {
        const type = services.getTypeAtLocation(node);
        const checker=  services.program.getTypeChecker();
        const typeName = checker.typeToString(type, undefined, ts.TypeFormatFlags.InTypeAlias)

        if (typeName === "{}") {
          context.report({
            messageId: "noImplicitEmptyObjectType",
            node: node,
          });
        }
      }
    }
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
