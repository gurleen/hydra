import { z } from "zod";

export interface SchemaField {
  name: string;
  type: string;
  defaultValue: any;
}

export function extractSchemaFields(schema: z.ZodObject<any>): SchemaField[] {
  const fields: SchemaField[] = [];
  const shape = schema.shape;

  for (const [name, zodType] of Object.entries(shape)) {
    const def = (zodType as any)._def;
    const typeName = def.innerType.type;

    let type: string;
    let defaultValue: any;

    switch (typeName) {
      case "ZodString":
        type = "string";
        defaultValue = "";
        break;
      case "ZodNumber":
        type = "number";
        defaultValue = 0;
        break;
      case "ZodBoolean":
        type = "boolean";
        defaultValue = false;
        break;
      case "ZodArray":
        type = "array";
        defaultValue = [];
        break;
      case "ZodObject":
        type = "object";
        defaultValue = {};
        break;
      case "ZodDate":
        type = "date";
        defaultValue = new Date();
        break;
      case "ZodNull":
        type = "null";
        defaultValue = null;
        break;
      case "ZodUndefined":
        type = "undefined";
        defaultValue = undefined;
        break;
      case "ZodLiteral":
        type = "literal";
        defaultValue = def.value;
        break;
      case "ZodEnum":
        type = "enum";
        defaultValue = def.values[0];
        break;
      case "ZodDefault":
        const innerType = def.innerType._def.typeName;
        type = innerType.replace("Zod", "").toLowerCase();
        defaultValue = def.defaultValue();
        break;
      case "ZodOptional":
        const optionalInnerType = def.innerType._def.typeName;
        type = `${optionalInnerType.replace("Zod", "").toLowerCase()}?`;
        defaultValue = undefined;
        break;
      default:
        type = "unknown";
        defaultValue = undefined;
    }

    fields.push({ name, type, defaultValue });
  }

  return fields;
}