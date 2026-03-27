import * as React from "react";
import { fetchSiteSettings } from "../../lib/api/siteSettings";

let cachedSettings: Record<string, string> | null = null;
let pendingSettingsRequest: Promise<Record<string, string>> | null = null;
let siteSettingsErrorLogged = false;

async function loadSharedSiteSettings() {
    if (cachedSettings) {
        return cachedSettings;
    }

    if (!pendingSettingsRequest) {
        pendingSettingsRequest = fetchSiteSettings()
            .then((data) => {
                cachedSettings = data;
                return data;
            })
            .finally(() => {
                pendingSettingsRequest = null;
            });
    }

    return pendingSettingsRequest;
}

export function useSiteSettings() {
    const [settings, setSettings] = React.useState<Record<string, string>>({});
    const [loading, setLoading] = React.useState(true);

    const reload = React.useCallback(async () => {
        try {
            setLoading(true);
            cachedSettings = null;
            const data = await loadSharedSiteSettings();
            setSettings(data);
        } catch (error) {
            if (!siteSettingsErrorLogged) {
                console.error("Failed to load site settings:", error);
                siteSettingsErrorLogged = true;
            }
            setSettings({});
        } finally {
            setLoading(false);
        }
    }, []);

    React.useEffect(() => {
        let mounted = true;

        const load = async () => {
            try {
                setLoading(true);
                const data = await loadSharedSiteSettings();
                if (!mounted) return;
                setSettings(data);
            } catch (error) {
                if (!mounted) return;
                if (!siteSettingsErrorLogged) {
                    console.error("Failed to load site settings:", error);
                    siteSettingsErrorLogged = true;
                }
                setSettings({});
            } finally {
                if (!mounted) return;
                setLoading(false);
            }
        };

        void load();

        return () => {
            mounted = false;
        };
    }, []);

    return {
        settings,
        loading,
        reload,
    };
}
