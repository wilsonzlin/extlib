import AssertionError from "./AssertionError";

export default <
  T extends
    | "string"
    | "number"
    | "boolean"
    | "bigint"
    | "undefined"
    | "function"
    | "object"
>(
  val: unknown,
  type: T,
  msg?: string
): T extends "string"
  ? string
  : T extends "number"
  ? number
  : T extends "bigint"
  ? bigint
  : T extends "undefined"
  ? undefined
  : T extends "function"
  ? Function
  : T extends "object"
  ? null | object
  : never => {
  if (typeof val != type) {
    throw new AssertionError(msg ?? "Value is not of the correct type");
  }
  return val as any;
};
