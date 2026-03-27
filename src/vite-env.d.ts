/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_SUPABASE_URL: string;
    readonly VITE_SUPABASE_ANON_KEY: string;
    readonly VITE_SITE_URL?: string;
    readonly VITE_TG_BOT_TOKEN?: string;
    readonly VITE_TG_CHAT_ID?: string;
    readonly VITE_WEB3FORMS_ACCESS_KEY?: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
