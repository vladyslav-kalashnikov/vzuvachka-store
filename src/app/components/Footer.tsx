import * as React from "react";

// Допоміжна функція для об'єднання класів
function cx(...cls: Array<string | false | null | undefined>) {
  return cls.filter(Boolean).join(" ");
}

export function Footer() {
  return (
      <footer className="mt-20 border-t border-white/10 bg-[#0a0a0a] font-sans text-white">
        <div className="mx-auto max-w-[1600px] px-6 py-16 sm:py-24">
          <div className="grid gap-16 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <div className="mb-8 flex items-center gap-3">
                <div className="tech-clip flex h-10 w-10 items-center justify-center bg-red-600 text-sm font-black text-white">
                  В/Ч
                </div>
                <div>
                  <div className="text-2xl font-black uppercase tracking-tighter text-white">
                    ВЗУВАЧКА
                  </div>
                  <div className="mt-0.5 text-[10px] font-bold uppercase tracking-[0.3em] text-gray-500">
                    Екстремальне екіпірування
                  </div>
                </div>
              </div>

              <div className="mb-10 flex flex-wrap items-center gap-3">
                <SocialIcon href="#" label="Instagram" icon={<IconInstagram />} />
                <SocialIcon href="#" label="TikTok" icon={<IconTikTok />} />
                <SocialIcon href="#" label="Telegram" icon={<IconTelegram />} />
                <SocialIcon href="#" label="Viber" icon={<IconViber />} />
              </div>

              <div className="mb-10 space-y-3 text-[13px] font-bold uppercase tracking-widest text-gray-400">
                <div>
                  ТЕЛЕФОН:
                  <a
                      className="ml-1 text-white transition-colors hover:text-red-500"
                      href="tel:+380939753837"
                  >
                    +38 (093) 975-38-37
                  </a>
                </div>
                <div>
                  EMAIL:
                  <a
                      className="ml-1 text-white transition-colors hover:text-red-500"
                      href="mailto:hello@vzuvachka.ua"
                  >
                    HELLO@VZUVACHKA.UA
                  </a>
                </div>
              </div>

              <div className="space-y-2 border-t border-white/10 pt-6 text-[10px] font-bold uppercase tracking-widest text-gray-500">
                <p className="mb-3 text-red-600">Офіційна інформація</p>
                <p>ФОП: ВзуваЧка Retail</p>
                <p>ІПН/РНОКПП: 3159724842</p>
                <p className="leading-relaxed">
                  АДРЕСА: м. Хмельницький, вул. Водопровідна 75/1
                </p>
              </div>

              <div className="pt-8">
                <p className="mb-4 text-[10px] font-bold uppercase tracking-widest text-red-600">
                  Оплата
                </p>
                <div className="flex flex-wrap gap-2">
                  <PayBadge>Apple Pay</PayBadge>
                  <PayBadge>Google Pay</PayBadge>
                  <PayBadge>VISA</PayBadge>
                  <PayBadge>Mastercard</PayBadge>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4">
              <div className="grid grid-cols-2 gap-8">
                <FooterCol title="Каталог">
                  <FooterLink to="#page/women">Жіноче</FooterLink>
                  <FooterLink to="#page/men">Чоловіче</FooterLink>
                  <FooterLink to="#page/kids">Дитяче</FooterLink>
                  <FooterLink to="#page/work">ВЗУВАЧКА PRO™</FooterLink>
                  <FooterLink
                      to="#page/sale"
                      className="text-red-500 hover:text-red-400"
                  >
                    Розпродаж
                  </FooterLink>
                </FooterCol>

                <FooterCol title="Допомога">
                  <FooterLink to="#page/shipping">Доставка та оплата</FooterLink>
                  <FooterLink to="#page/returns">Обмін і повернення</FooterLink>
                  <FooterLink to="#page/size-guide">Розмірна сітка</FooterLink>
                  <FooterLink to="#page/faq">Часті питання</FooterLink>
                  <FooterLink to="#page/contact">Контакти</FooterLink>
                </FooterCol>

                <FooterCol title="Навігація">
                  <FooterLink to="#wishlist">Wishlist</FooterLink>
                  <FooterLink to="#cart">Кошик</FooterLink>
                  <FooterLink to="#search">Пошук</FooterLink>
                  <FooterLink to="#page/club">A/D CLUB</FooterLink>
                  <FooterLink to="#page/sitemap">Мапа сайту</FooterLink>
                </FooterCol>

                <FooterCol title="Компанія">
                  <FooterLink to="#page/about">Про нас</FooterLink>
                  <FooterLink to="#page/careers">Кар’єра</FooterLink>
                  <FooterLink to="#page/privacy">
                    Політика конфіденційності
                  </FooterLink>
                  <FooterLink to="#page/terms">Умови використання</FooterLink>

                  <div className="mt-8">
                  <span className="tech-clip inline-flex items-center border border-red-600/20 bg-red-600/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-widest text-red-500">
                    ВЗУВАЧКА PRO™
                  </span>
                  </div>
                </FooterCol>
              </div>
            </div>

            <div className="lg:col-span-4">
              <div className="tech-clip group relative overflow-hidden border border-white/10 bg-[#111] p-8">
                <div className="pointer-events-none absolute -right-10 -top-10 select-none text-[100px] font-black text-white/5 transition-transform duration-700 group-hover:scale-110">
                  A/D
                </div>

                <div className="relative z-10">
                  <div className="mb-2 text-sm font-black uppercase tracking-widest text-white">
                    A/D CLUB // РОЗСИЛКА
                  </div>
                  <p className="mb-8 text-[11px] font-bold uppercase tracking-widest leading-relaxed text-gray-400">
                    Знижка -10% на перше замовлення та доступ до закритих дропів.
                  </p>

                  <form className="space-y-4">
                    <input
                        type="email"
                        placeholder="ВВЕДІТЬ EMAIL"
                        className="tech-clip w-full border border-white/20 bg-black px-4 py-4 text-[11px] font-bold uppercase tracking-widest text-white outline-none transition-colors placeholder:text-gray-600 focus:border-red-600"
                    />
                    <button
                        type="button"
                        className="tech-clip w-full bg-white px-6 py-4 text-[11px] font-black uppercase tracking-widest text-black transition-colors hover:bg-red-600 hover:text-white"
                    >
                      Підписатися
                    </button>
                  </form>

                  <p className="mt-6 text-[9px] font-bold uppercase tracking-widest text-gray-600">
                    Ми поважаємо ваш Inbox. Можна відписатись будь-коли.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-20 flex flex-col gap-6 border-t border-white/10 pt-8 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 sm:flex-row sm:items-center sm:justify-between">
            <div>© 2026 ВЗУВАЧКА. ВСІ ПРАВА ЗАХИЩЕНО.</div>

            <div className="flex flex-wrap gap-x-8 gap-y-4">
              <a className="transition-colors hover:text-white" href="#page/terms">
                Публічна оферта
              </a>
              <a
                  className="transition-colors hover:text-white"
                  href="#page/privacy"
              >
                Політика конфіденційності
              </a>
              <a
                  className="transition-colors hover:text-white"
                  href="#page/size-guide"
              >
                Розмірна сітка
              </a>
            </div>
          </div>
        </div>
      </footer>
  );
}

function FooterCol({
                     title,
                     children,
                     className,
                   }: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
      <div className={cx("min-w-0", className)}>
        <div className="mb-6 inline-block border-b border-white/10 pb-2 text-[11px] font-black uppercase tracking-widest text-white">
          {title}
        </div>
        <div className="space-y-4">{children}</div>
      </div>
  );
}

function FooterLink({
                      to,
                      children,
                      className,
                    }: {
  to: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
      <a
          href={to}
          className={cx(
              "block text-[11px] font-bold uppercase tracking-widest text-gray-400 transition-colors hover:text-white",
              className
          )}
      >
        {children}
      </a>
  );
}

function PayBadge({ children }: { children: React.ReactNode }) {
  return (
      <span className="tech-clip inline-flex cursor-default items-center border border-white/10 bg-[#111] px-3 py-1.5 text-[9px] font-black uppercase tracking-widest text-gray-400 transition-colors hover:border-red-600">
      {children}
    </span>
  );
}

function SocialIcon({
                      href,
                      label,
                      icon,
                    }: {
  href: string;
  label: string;
  icon: React.ReactNode;
}) {
  return (
      <a
          href={href}
          aria-label={label}
          className="tech-clip flex h-10 w-10 items-center justify-center border border-white/10 bg-[#111] text-gray-400 transition-all duration-300 hover:border-red-600 hover:bg-red-600 hover:text-white"
          title={label}
      >
        <span className="h-4 w-4">{icon}</span>
      </a>
  );
}

function IconInstagram() {
  return (
      <svg viewBox="0 0 24 24" fill="none" className="h-full w-full">
        <path
            d="M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9A5.5 5.5 0 0 1 16.5 22h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2Z"
            stroke="currentColor"
            strokeWidth="2"
        />
        <path
            d="M12 16.2A4.2 4.2 0 1 0 12 7.8a4.2 4.2 0 0 0 0 8.4Z"
            stroke="currentColor"
            strokeWidth="2"
        />
        <path
            d="M17.2 6.8h.01"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
        />
      </svg>
  );
}

function IconTelegram() {
  return (
      <svg viewBox="0 0 24 24" fill="none" className="h-full w-full">
        <path
            d="M21.5 3.5 3.6 10.6c-1 .4-1 1.8.1 2.1l4.6 1.5 1.7 5.2c.3 1 1.6 1.1 2.1.3l2.7-3.8 4.8 3.5c.8.6 2 .1 2.2-.9l2.8-13.1c.2-1.1-.8-2-1.9-1.4Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
        />
        <path
            d="M8.3 14.2 20 6.5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
        />
      </svg>
  );
}

function IconTikTok() {
  return (
      <svg viewBox="0 0 24 24" fill="none" className="h-full w-full">
        <path
            d="M14 3v10.2a3.8 3.8 0 1 1-3-3.7"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M14 6.2c1.2 1.9 3 3 5 3.1V6.7c-1.2-.2-2.5-.9-3.6-2.2"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
      </svg>
  );
}

function IconViber() {
  return (
      <svg viewBox="0 0 24 24" fill="none" className="h-full w-full">
        <path
            d="M7.5 4.3h9c2.3 0 4.2 1.9 4.2 4.2v6.2c0 2.3-1.9 4.2-4.2 4.2H12l-3.3 2c-.6.4-1.4-.1-1.3-.8l.4-1.2c-2.6-.3-4.5-2.1-4.5-4.2V8.5c0-2.3 1.9-4.2 4.2-4.2Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
        />
        <path
            d="M9.2 9.6c.2 2.2 2.8 4.8 5 5 .8.1 1.8-.4 2.2-1.1.2-.3.1-.7-.2-.9l-1.2-.7c-.3-.2-.7-.1-.9.1l-.4.4c-.2.2-.5.2-.7.1-.8-.4-1.7-1.3-2.1-2.1-.1-.2-.1-.5.1-.7l.4-.4c.2-.2.3-.6.1-.9l-.7-1.2c-.2-.3-.6-.4-.9-.2-.7.4-1.2 1.4-1.1 2.2Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
        />
      </svg>
  );
}