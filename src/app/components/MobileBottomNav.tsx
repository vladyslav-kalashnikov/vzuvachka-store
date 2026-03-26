import * as React from "react";
import { Home, Grid, ShoppingBag, MessageSquare } from "lucide-react";
import { useShop } from "../store/useShop";

export function MobileBottomNav() {
    const { cartCount } = useShop();

    return (
        <div className="fixed bottom-0 left-0 right-0 z-40 flex h-16 items-center justify-around border-t border-white/10 bg-[#0a0a0a]/90 backdrop-blur-xl md:hidden pb-safe">
            <a href="#home" className="flex flex-col items-center gap-1 p-2 text-gray-500 hover:text-white transition">
                <Home className="h-5 w-5" />
                <span className="text-[9px] font-bold uppercase tracking-wider">Головна</span>
            </a>
            <a href="#categories" className="flex flex-col items-center gap-1 p-2 text-gray-500 hover:text-white transition">
                <Grid className="h-5 w-5" />
                <span className="text-[9px] font-bold uppercase tracking-wider">Каталог</span>
            </a>
            <a href="#cart" className="relative flex flex-col items-center gap-1 p-2 text-gray-500 hover:text-white transition">
                <div className="relative">
                    <ShoppingBag className="h-5 w-5" />
                    {cartCount > 0 && (
                        <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-[9px] font-black text-white shadow-sm">
                            {cartCount}
                        </span>
                    )}
                </div>
                <span className="text-[9px] font-bold uppercase tracking-wider">Заявка</span>
            </a>
            <a href="#page/contact" className="flex flex-col items-center gap-1 p-2 text-gray-500 hover:text-white transition">
                <MessageSquare className="h-5 w-5" />
                <span className="text-[9px] font-bold uppercase tracking-wider">Зв'язок</span>
            </a>
        </div>
    );
}