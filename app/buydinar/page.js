"use client";

import React from "react";
import MainLayout from "../MainLayout";
import OrderForm from "../../components/order-form/OrderForm";
import { IRAQI_DINAR_CONFIG } from "../../config/currencyConfigs";

export default function BuyDinar() {
  return (
    <MainLayout>
      <OrderForm
        currencyOptions={IRAQI_DINAR_CONFIG.currencyOptions}
        bankDetails={IRAQI_DINAR_CONFIG.bankDetails}
        shippingFee={IRAQI_DINAR_CONFIG.shippingFee}
        bonusConfig={IRAQI_DINAR_CONFIG.bonusConfig}
        pageTitle={IRAQI_DINAR_CONFIG.pageTitle}
      />
    </MainLayout>
  );
}
