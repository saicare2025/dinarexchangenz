"use client";

import React from "react";
import MainLayout from "../MainLayout";
import OrderForm from "../../components/order-form/OrderForm";
import { ZIMBABWE_DOLLAR_CONFIG } from "../../config/currencyConfigs";

export default function BuyZimDollar() {
  return (
    <MainLayout>
      <OrderForm
        currencyOptions={ZIMBABWE_DOLLAR_CONFIG.currencyOptions}
        bankDetails={ZIMBABWE_DOLLAR_CONFIG.bankDetails}
        shippingFee={ZIMBABWE_DOLLAR_CONFIG.shippingFee}
        bonusConfig={ZIMBABWE_DOLLAR_CONFIG.bonusConfig}
        pageTitle={ZIMBABWE_DOLLAR_CONFIG.pageTitle}
      />
    </MainLayout>
  );
}
