import { Environment } from 'vitest'

export default <Environment>{
    name: 'prisma',
    setup: async () => ({
        teardown() {},
    }),
    transformMode: 'ssr',
}
