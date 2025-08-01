/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string
  readonly VITE_ANOTHER_VAR?: string // Add more as needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}