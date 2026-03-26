import * as React from "react";
import { MessageCircle } from "lucide-react";

export function FloatingMessengers() {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <div className="fixed bottom-20 right-4 z-50 md:bottom-8 md:right-8">
            {isOpen && (
                <div className="mb-4 flex flex-col gap-3">
                    {/* Viber */}
                    <a href="viber://chat?number=+380000000000" target="_blank" rel="noreferrer" className="flex h-12 w-12 items-center justify-center rounded-full bg-[#7360f2] text-white shadow-[0_10px_25px_rgba(115,96,242,0.3)] transition-transform hover:scale-110">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M20.613 16.516c-1.396-1.144-2.825-1.077-4.004-.265-1.066.736-1.503.626-2.91-.782-1.408-1.408-1.518-1.844-.782-2.91.812-1.18.879-2.608-.265-4.004-1.378-1.678-2.61-1.657-3.354-.913-.804.813-.836 2.096-.282 3.666.621 1.758 2.016 3.627 4.29 5.617 2.274 2.273 4.143 3.668 5.901 4.289 1.57.554 2.853.522 3.666-.282.744-.744.765-1.976-.913-3.354z" /></svg>
                    </a>
                    {/* Telegram */}
                    <a href="https://t.me/your_telegram_bot" target="_blank" rel="noreferrer" className="flex h-12 w-12 items-center justify-center rounded-full bg-[#229ED9] text-white shadow-[0_10px_25px_rgba(34,158,217,0.3)] transition-transform hover:scale-110">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.64-.35-1 .21-1.58.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.19-.08-.05-.19-.02-.27 0-.12.03-1.97 1.25-5.56 3.67-.53.37-1.01.55-1.44.54-.48-.01-1.39-.27-2.07-.49-.83-.27-1.49-.41-1.43-.87.03-.24.36-.49.99-.75 3.88-1.69 6.47-2.8 7.76-3.34 3.68-1.53 4.45-1.8 4.93-1.81.11 0 .35.03.5.15.13.1.17.24.18.35.01.1-.01.24-.03.34z"/></svg>
                    </a>
                </div>
            )}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex h-14 w-14 items-center justify-center rounded-full bg-red-600 text-white shadow-[0_10px_30px_rgba(220,38,38,0.4)] transition-transform hover:scale-105"
            >
                <MessageCircle className="h-6 w-6" />
            </button>
        </div>
    );
}