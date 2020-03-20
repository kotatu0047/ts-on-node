export function asyncPipe<T extends any[], R>(
  fn1: (...arg: T) => Promise<R> | R,
  fns1: (a: R) => Promise<R> | R,
): (...b: T) => Promise<R>

export function asyncPipe<T extends any[], R, R1>(
  fn1: (...arg: T) => Promise<R> | R,
  fns1: (a: R) => Promise<R1> | R1,
): (...b: T) => Promise<R1>

export function asyncPipe<T extends any[], R, R1, R2>(
  fn1: (...arg: T) => Promise<R> | R,
  fns1: (a: R) => Promise<R1> | R1,
  fns2: (a: R1) => Promise<R2> | R2,
): (...b: T) => Promise<R2>

export function asyncPipe<T extends any[], R, R1, R2, R3>(
  fn1: (...arg: T) => Promise<R> | R,
  fns1: (a: R) => Promise<R1> | R1,
  fns2: (a: R1) => Promise<R2> | R2,
  fns3: (a: R2) => Promise<R3> | R3,
): (...b: T) => Promise<R3>

export function asyncPipe<T extends any[], R, R1, R2, R3, R4>(
  fn1: (...arg: T) => Promise<R> | R,
  fns1: (a: R) => Promise<R1> | R1,
  fns2: (a: R1) => Promise<R2> | R2,
  fns3: (a: R2) => Promise<R3> | R3,
  fns4: (a: R3) => Promise<R4> | R4,
): (...b: T) => Promise<R4>

export function asyncPipe<T extends any[], R>(
  fn1: (...b: T) => Promise<R> | R,
  ...fns: Array<(a: R) => Promise<R> | R>
) {
  const piped = fns.reduce(
    (prevFn, nextFn) => async (value: R) => nextFn(await prevFn(value)),
    async id => id,
  )

  return async (...args: T) => piped(await fn1(...args))
}
