import { asyncPipe } from './function'

describe('Functional utils', () => {
  test('asyncPipe functions', () => {
    const fn1 = async () => `fn1()`
    const fn2 = (val: string) => `fn2(${val})`
    const piped = asyncPipe(fn1, fn2)

    return piped().then(result => {
      expect(result).toStrictEqual('fn2(fn1())')
    })
  })

  test('asyncPipe functions with first function param', () => {
    const fn1 = async (val: string) => `fn1(${val})`
    const fn2 = (val: string) => `fn2(${val})`
    const piped = asyncPipe(fn1, fn2)

    return piped('inner').then(result => {
      expect(result).toStrictEqual('fn2(fn1(inner))')
    })
  })

  test('asyncPipe 3 functions', () => {
    const fn1 = (val: string, num: number) => `fn1(${val}+${num})`
    const fn2 = (val: string) => !!val
    const fn3 = (val: boolean) => `fn3(${val})`
    const piped = asyncPipe(fn1, fn2, fn3)

    return piped('inner', 3).then(result => {
      expect(result).toStrictEqual('fn3(true)')
    })
  })

  test('composes 5 functions', () => {
    const fn1 = async (val: number) => val + 1
    const fn2 = (val: number) => val + 1
    const fn3 = (val: number) => val + 1
    const fn4 = async (val: number) => val + 1
    const fn5 = (val: number) => val + 1
    const piped = asyncPipe(fn1, fn2, fn3, fn4, fn5)

    return piped(1).then(result => {
      expect(result).toStrictEqual(6)
    })
  })

  test('asyncPipe make composed 5 functions', () => {
    const fn1 = async (val: number) => val + 1
    const fn2 = (val: number) => `${val}`
    const fn3 = (val: string) => !!val
    const fn4 = async (val: boolean) => () => Number(val)
    const fn5 = (val: () => number) => val() + 1
    const piped = asyncPipe(fn1, fn2, fn3, fn4, fn5)

    return piped(1).then(result => {
      expect(result).toStrictEqual(2)
    })
  })
})
