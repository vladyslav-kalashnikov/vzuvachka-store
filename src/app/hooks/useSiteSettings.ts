import * as React from "react";
import { fetchSiteSettings } from "../../lib/api/siteSettings";

export function useSiteSettings() {
    const [settings, setSettings] = React.useState<Record<string, string>>({});
    const [loading, setLoading] = React.useState(true);

    const reload = React.useCallback(async () => {
        try {
            setLoading(true);
            const data = await fetchSiteSettings();
            setSettings(data);
        } catch (error) {
            console.error("Failed to load site settings:", error);
        } finally {
            setLoading(false);
        }
    }, []);

    React.useEffect(() => {
        void reload();
    }, [reload]);

    return {
        settings,
        loading,
        reload,
    };
}