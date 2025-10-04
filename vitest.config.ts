import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true, // 👈 enables global describe/it/expect
    environment: 'node', // or 'jsdom' if you’re testing browser code
  },
})
