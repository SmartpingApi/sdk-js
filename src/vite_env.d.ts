/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_SMARTPING_APP_ID: string;
	readonly VITE_SMARTPING_APP_KEY: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
