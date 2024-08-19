import React, { useState } from "react";

import { Dayjs } from "dayjs";

import HeadingSection from "./invoice-heading.component";
import ItemsSections from "./invoice-items.component";

export default function InvoiceDetails() {
  return (
    <>
      <HeadingSection />
      <ItemsSections />
    </>
  );
}
