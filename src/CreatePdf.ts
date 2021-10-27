import fs from 'fs';
import express, { Request, Response } from "express";

import GenerateFormAsPdf from "./GenerateFormAsPdf";
import ToWords from './CurrencyToWords/toWords';

const router = express.Router();

const invoice = {
  heading: {
    name: "Black Tulip Flowers LLC",
    address_line_one: "Box 577, Sharjah – U.A.E.",
    address_line_two: "Tel : 600 55 5115, Fax : 06-531 5522",
    email: "E-mail : accounts.rfl@btfgroup.com",
    website: "Website : www.btfgroup.com",
    trn: "TRN : 100016556100003"
  },
  invoice_no: "INV00964",
  invoice_date: "14.12.2021",
  del_date: "14.12.2021",
  order_no: "9721312",
  payment_method: "telr",
  currecy: "AED",
  "billing_address": {
      name: "asd",
      area: "jgasdsad",
      town: "hgadsad",
      country: "asdfad"
  },
  "shipping_address": {
    name: "asd",
    area: "jgasdsad",
    town: "hgadsad",
    country: "asdfad"
  },
  "invoiceAmount": {
    head: [
      "S.No",
      "STOKE CODE",
      "DESCRIPTION",
      "QTY",
      "RATE",
      "DISCOUNT AMOUNT",
      "TAXABLE AMOUNT",
      "TAX %",
      "TAX AMOUNT",
      "TOTAL AMOUNT",
    ],
    items: [
      {
        "S_No": 1,
        "STOKE_CODE": "BT_123",
        DESCRIPTION: "BOU",
        QTY: 1,
        RATE: 200.0,
        "DISCOUNT_AMOUNT": 20.0,
        "TAXABLE_AMOUNT": 180.0,
        "TAX": 5,
        "TAX_AMOUNT": 9.0,
        "TOTAL_AMOUNT": 189.0,
      },
      {
        "S_No": 2,
        "STOKE_CODE": "BT_123",
        DESCRIPTION: "BOU",
        QTY: 1,
        RATE: 200.0,
        "DISCOUNT_AMOUNT": 20.0,
        "TAXABLE_AMOUNT": 180.0,
        "TAX": 5,
        "TAX_AMOUNT": 9.0,
        "TOTAL_AMOUNT": 189.0,
      },
      {
        "S_No": 3,
        "STOKE_CODE": "BT_123",
        DESCRIPTION: "BOU",
        QTY: 1,
        RATE: 200.0,
        "DISCOUNT_AMOUNT": 20.0,
        "TAXABLE_AMOUNT": 180.0,
        "TAX": 5,
        "TAX_AMOUNT": 9.0,
        "TOTAL_AMOUNT": 189.0,
      },
    ],
  },
  "delivery_charges": {
    "TAXABLE_AMOUNT": 50.0,
    "TAX": 5,
    "TAX_AMOUNT": 9.0,
    "TOTAL_AMOUNT": 189.0,
  },
  "total_amount": 455.0,
  tax: 22.75,
  total: 477.75,
};

router.get("/", async (req: Request, res: Response) => {
  console.log("generating pdf..........");
  const conWords = new ToWords();
  const words = await conWords.convert(555.02);
  //const genPdf = new GenerateFormAsPdf();
  //const imageAsBase64 = fs.readFileSync('C:/Users/Admin/Desktop/pdf/new-pdf/logo.png', 'base64');

  console.log("after completing.......");
  res.json({ words: words });
});

module.exports = router;
