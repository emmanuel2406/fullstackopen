/**
 * Helper function for exhaustive type checking
 * never is assignable to all types, but no types is assignable to never --> exhaustive type checking
 */
export const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};
