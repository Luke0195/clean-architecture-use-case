import type { Config } from 'jest'

const config: Config = {
  roots: ['<rootDir>/src'],
  preset: '@shelf/jest-mongodb',
  collectCoverageFrom: ['<rootDir>/src/**/*.ts', '!<rootDir>/src/main/*.ts'],
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  transform: {
    '.+\\.ts$': 'ts-jest'
  }
}

export default config
