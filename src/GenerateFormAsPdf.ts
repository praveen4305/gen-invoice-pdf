import path from "path";
import fs from "fs";
import chromium from "chrome-aws-lambda";
import * as hb from "handlebars";
import puppeteer from "puppeteer-core";
import { PDFDocument  } from 'pdf-lib';
const locateChrome = require('locate-chrome');

const htmlFile = fs.readFileSync(path.resolve(__dirname, 'demo-invoice.html'), 'utf8');

export default class GenerateFormAsPdf {

    async toBuffer(data: {}, logoBuffer: any) {
      const executablePath = await new Promise(resolve => locateChrome((arg: any) => resolve(arg)));
      //const executablePath = "./node_modules/puppeteer/.local-chromium/win64-901912/chrome"
        
        //const executablePath = await chromium.executablePath;
        //console.log("executablePath", executablePath);
        try{
            let pdf;
            pdf = await this.getGeneratedPdf(data, executablePath, htmlFile);
            return await this.addLogoToPdf(logoBuffer, pdf);
        } catch(error) {
            console.error(error);
        }
    }

    async getGeneratedPdf(data: {}, executablePath: any, htmlFile: any) {
        try {
          return await new Promise(async (resolve, reject) => {
            const template = await hb.compile(htmlFile, { strict: true });
            const html = await template(data);
    
            // console.log(" ");
            console.log("html ++++++++++++++++++++++++++++++++++++++==============> ");
    
            let browser = await puppeteer.launch({
              args: chromium.args,
              executablePath,
            });
    
            const page = await browser.newPage();
            await page.setContent(html);
    
            // 4. Create pdf file with puppeteer
            let pdf = await page.pdf({
              format: 'a4',
              printBackground: true,
              margin: { top: "1.5cm", right: "1cm", bottom: "0cm", left: "1cm" },
            });
            // pdf = await Buffer.from(pdf).toString("base64"); //converts to base64 uncomment only if required
            //console.log("pdf ===>>> ", pdf);
            resolve(pdf);
          });
        } catch (error) {
          throw error;
        }
      }

      async addLogoToPdf(logoBuffer: any, existingPdfBytes: any) {
        try {
          // Load a PDFDocument from the existing PDF bytes
          const pdfDoc = await PDFDocument.load(existingPdfBytes);
          const pngImage = await pdfDoc.embedPng(logoBuffer);
          const pages = await pdfDoc.getPages();
          for await (let page of pages) {
            await page.drawImage(pngImage, {
              x: 50,
              y: 700,
              width:  120,
              height: 80,
            });
          }
          let pdfBytes = await pdfDoc.save();
          var buf2 = await Buffer.from(pdfBytes).toString("base64");
          console.log("pdf=================================== ===> ", buf2);
          return Buffer.from(pdfBytes);
        } catch (error) {
          throw error;
        }
      }
}