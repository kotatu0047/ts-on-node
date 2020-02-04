import { hello } from './index'

describe('test hello', () => {
  test('echo "Hello, foo!"', () => {
    expect(hello('foo')).toBe('Hello, foo!')
  })
})
