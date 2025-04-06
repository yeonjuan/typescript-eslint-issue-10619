import path from "node:path";
import tseslint from "typescript-eslint";
import { RuleTester } from "@typescript-eslint/rule-tester";
import * as vitest from "vitest";

import { rule } from "./no-implicit-empty-object.js";

RuleTester.afterAll = vitest.afterAll;
RuleTester.it = vitest.it;
RuleTester.itOnly = vitest.it.only;
RuleTester.describe = vitest.describe;

const ruleTester = new RuleTester({
  languageOptions: {
    parser: tseslint.parser,
    parserOptions: {
      projectService: {
        allowDefaultProject: ["*.ts*"],
        defaultProject: "tsconfig.json",
      },
      tsconfigRootDir: path.join(__dirname, "../.."),
    },
  },
});

ruleTester.run("no-loop-over-enum", rule, {
  valid: [

  ],
  invalid: [
    {
      code: `
       type NullableData = null | { name: string;  num: number };
      type ITS_EMPTY_OBJECT_TYPE = Omit<NullableData, 'name'>; // '{}'
      `,
      errors: [
        {
          messageId: "noImplicitEmptyObjectType",
        },
      ],
    },
  ],
});
