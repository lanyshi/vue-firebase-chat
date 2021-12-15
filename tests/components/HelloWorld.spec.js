import { render, screen } from '@testing-library/vue'
import HelloWorld from '@/components/HelloWorld.vue'

describe('HelloWorld.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'Welcome to Your Vue.js App'
    render(HelloWorld)
    expect(screen.queryByText(msg)).toBeTruthy()
  })
})