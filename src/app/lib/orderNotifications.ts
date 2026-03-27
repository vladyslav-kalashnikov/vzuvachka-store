import { formatPrice } from "../data/products";
import type { CartItem } from "../store/useShop";

const FALLBACK_WEB3FORMS_ACCESS_KEY = "aa478348-6fdd-4916-851f-f94b44e6228d";

export type CheckoutNotificationCustomer = {
    name: string;
    email: string;
    phone: string;
    city: string;
    branch: string;
};

type OrderNotificationPayload = {
    orderNumber: string;
    customer: CheckoutNotificationCustomer;
    items: CartItem[];
    totalPrice: number;
    totalPacks: number;
    totalUnits: number;
};

function humanizeSlug(slug: string) {
    return slug
        .split("-")
        .filter(Boolean)
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(" ");
}

function getSiteBaseUrl() {
    const envSiteUrl = String(import.meta.env.VITE_SITE_URL ?? "")
        .trim()
        .replace(/\/+$/, "");

    if (envSiteUrl) {
        return envSiteUrl;
    }

    if (typeof window !== "undefined") {
        return window.location.href.split("#")[0].replace(/\/+$/, "");
    }

    return "";
}

function getProductUrl(slug: string) {
    const siteBaseUrl = getSiteBaseUrl();
    const hashPath = `#product/${encodeURIComponent(slug)}`;

    return siteBaseUrl ? `${siteBaseUrl}/${hashPath}` : hashPath;
}

function escapeHtml(value: string) {
    return value
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#39;");
}

function buildItemsSummary(items: CartItem[]) {
    return items
        .map((item, index) => {
            const parts = [
                humanizeSlug(item.slug),
                item.packLabel,
                item.packSizeLabel,
                item.color ? `Колір: ${item.color}` : null,
                `${item.quantity} уп.`,
                formatPrice(item.packPrice * item.quantity),
            ];

            return `${index + 1}. ${parts.filter(Boolean).join(" • ")}`;
        })
        .join("\n");
}

export async function sendWeb3FormsOrderNotification(
    payload: OrderNotificationPayload
) {
    const accessKey =
        import.meta.env.VITE_WEB3FORMS_ACCESS_KEY ||
        FALLBACK_WEB3FORMS_ACCESS_KEY;
    const customerEmail = payload.customer.email.trim().toLowerCase();
    const itemsSummary = buildItemsSummary(payload.items);
    const message = [
        `Нове замовлення ${payload.orderNumber}`,
        `Дата: ${new Date().toLocaleString("uk-UA")}`,
        "",
        `Клієнт: ${payload.customer.name}`,
        `Телефон: ${payload.customer.phone}`,
        `Email клієнта: ${customerEmail || "не вказано"}`,
        `Місто: ${payload.customer.city}`,
        `Відділення: ${payload.customer.branch}`,
        "",
        "Позиції:",
        itemsSummary,
        "",
        `Упаковок: ${payload.totalPacks}`,
        `Пар: ${payload.totalUnits}`,
        `Сума: ${formatPrice(payload.totalPrice)}`,
    ].join("\n");
    const optionalEmailFields = customerEmail
        ? {
            email: customerEmail,
            replyto: customerEmail,
        }
        : {};

    const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: JSON.stringify({
            access_key: accessKey,
            subject: `Нове замовлення Vzuvachka B2B: ${payload.orderNumber}`,
            from_name: "Vzuvachka B2B Checkout",
            name: payload.customer.name,
            customer_name: payload.customer.name,
            phone: payload.customer.phone,
            city: payload.customer.city,
            branch: payload.customer.branch,
            total_packs: String(payload.totalPacks),
            total_units: String(payload.totalUnits),
            total: formatPrice(payload.totalPrice),
            items: itemsSummary,
            message,
            botcheck: "",
            ...optionalEmailFields,
        }),
    });

    const result = await response.json().catch(() => null);

    if (!response.ok || result?.success === false) {
        throw new Error(
            result?.message || `Web3Forms request failed: ${response.status}`
        );
    }
}

export async function sendTelegramOrderNotification(
    payload: OrderNotificationPayload
) {
    const botToken = import.meta.env.VITE_TG_BOT_TOKEN;
    const chatId = import.meta.env.VITE_TG_CHAT_ID;

    if (!botToken || !chatId) {
        return;
    }

    const itemsMarkup = payload.items
        .map((item) => {
            const productUrl = getProductUrl(item.slug);
            const parts = [
                `<a href="${escapeHtml(productUrl)}">${escapeHtml(humanizeSlug(item.slug))}</a>`,
                item.packLabel,
                item.packSizeLabel,
                item.color ? `Колір: ${escapeHtml(item.color)}` : null,
                `${item.quantity} уп.`,
            ];

            return `• ${parts.filter(Boolean).join(" / ")}\n  🔗 <a href="${escapeHtml(productUrl)}">Відкрити товар</a>`;
        })
        .join("\n");

    const lines = [
        `🔥 <b>НОВЕ ЗАМОВЛЕННЯ (ОПТ) #${escapeHtml(payload.orderNumber)}</b>`,
        "",
        `👤 <b>Клієнт:</b> ${escapeHtml(payload.customer.name)}`,
        `📞 <b>Телефон:</b> ${escapeHtml(payload.customer.phone)}`,
        `📧 <b>Email:</b> ${escapeHtml(payload.customer.email || "не вказано")}`,
        `🏙 <b>Місто:</b> ${escapeHtml(payload.customer.city)}`,
        `📮 <b>Відділення:</b> ${escapeHtml(payload.customer.branch)}`,
        "",
        "🛒 <b>Товари:</b>",
        itemsMarkup,
        "",
        `📦 <b>Упаковок:</b> ${payload.totalPacks}`,
        `👟 <b>Пар:</b> ${payload.totalUnits}`,
        `💰 <b>Сума:</b> ${escapeHtml(formatPrice(payload.totalPrice))}`,
    ];

    const response = await fetch(
        `https://api.telegram.org/bot${botToken}/sendMessage`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                chat_id: chatId,
                text: lines.join("\n"),
                parse_mode: "HTML",
            }),
        }
    );

    if (!response.ok) {
        throw new Error(`Telegram request failed: ${response.status}`);
    }
}
