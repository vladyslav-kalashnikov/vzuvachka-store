import * as React from "react";
import { PageLayout } from "./PageLayout";

export function Shipping() {
  return (
    <PageLayout
      title="Доставка та строки"
      subtitle="Швидко та зручно по всій Україні."
    >
      <p>Доставка Новою поштою зазвичай займає 1–3 дні.</p>
      <p>Вартість доставки залежить від тарифів перевізника.</p>
    </PageLayout>
  );
}
