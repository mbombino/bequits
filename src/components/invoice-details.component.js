import React, { useState } from "react";

import { Dayjs } from "dayjs";

import HeadingSection from "./invoice-heading.component";
import ItemsSections from "./invoice-items.component";
import PaymentSection from "./invoice-payment.component";

export default function InvoiceDetails() {
  return (
    <>
      <HeadingSection />
      <ItemsSections />
      <PaymentSection />
    </>
  );
}
