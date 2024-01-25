// When we need to ensure some interface implements type/interface (strict mode, no property can miss or overstay)
// TS has no support for "interface implements interface" yet, so we need to use this helper
declare type Implements<
    T,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    R extends T & keyof R extends keyof T ? (keyof T extends keyof R ? any : never) : never,
> = R;

/**
 * Avoid optional parameters from interface/type
 *
 * @example
 * ExcludeOptional<{ a: string; b?: string }> => { a: string }
 */
declare type ExcludeOptional<T> = {
    [P in keyof Required<T>]: Pick<T, P> extends Required<Pick<T, P>> ? T[P] : never;
};

/** `key: value[] | undefined` to `key: value | undefined` */
declare type UnwrapArray<T> = T extends (infer U)[] ? U : T;

/** Trims undefined from tuple.
 *
 * @example
 * [string, undefined] => [string, undefined] | [string]
 * [string, string | undefined] => [string, string | undefined] | [string]
 * [string, string | undefined, string | undefined] => [string, string | undefined, string | undefined] | [string, string | undefined] | [string]
 * [string, string | undefined, string] => [string, string | undefined, string]
 **/
declare type TrimUndefinedFromRight<T extends unknown[]> = T extends [...infer R, infer H]
    ? undefined extends H
        ? TrimUndefinedFromRight<R> | [...R, H]
        : [...R, H]
    : T;

/**
 * Converts any type to array.
 *
 * @example
 * string => [string];
 * string[] => string[]
 **/
declare type Arrayify<T> = T extends [...infer R] ? [...R] : [T];
