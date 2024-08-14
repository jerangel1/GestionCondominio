import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { type TDocumentDefinitions } from "pdfmake/interfaces";

import printjs from "print-js";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

type CreatePdfResponse = {
  success: boolean,
  content: null | string,
  message: string
}

const createPdf = async (props: TDocumentDefinitions, output = "print", drawsSectionSize = 0):Promise<CreatePdfResponse> => {
  return new Promise((resolve, reject)  => {
    try {
      const {
        pageSize = {
          width: 226.77,
          height: 480.88 + drawsSectionSize,
        },
        pageMargins = [12, 5.66, 12, 5.66],
        info = {
          title: "F001-000001",
          author: "maclode",
          subject: "ticket",
          keywords: "tck, sale",
        },
        styles = {
          header: {
            fontSize: 9,
            bold: true,
            alignment: "center",
          },
          tHeaderLabel: {
            fontSize: 8,
            alignment: "right",
          },
          tHeaderValue: {
            fontSize: 8,
            bold: true,
          },
          tProductsHeader: {
            fontSize: 8.5,
            bold: true,
          },
          tProductsBody: {
            fontSize: 8,
          },
          tTotals: {
            fontSize: 9,
            bold: true,
            alignment: "right",
          },
          tClientLabel: {
            fontSize: 8,
            alignment: "right",
          },
          tClientValue: {
            fontSize: 8,
            bold: true,
          },
          text: {
            fontSize: 8,
            alignment: "center",
          },
          link: {
            fontSize: 8,
            bold: true,
            margin: [0, 0, 0, 4],
            alignment: "center",
          },
        },
        content,
      } = props;

      const docDefinition:TDocumentDefinitions = {
        watermark: {
          text: "BETSOL",
          color: "black",
          opacity: 0.05,
          bold: true,
        },
        pageSize,
        pageMargins,
        info,
        content, 
        styles,
      };

      if (output === "b64") {
        const pdfMakeCreatePdf = pdfMake.createPdf(docDefinition);
        pdfMakeCreatePdf.getBase64((data) => {
          resolve({
            success: true,
            content: data,
            message: "Archivo generado correctamente.",
          });
        });
        return;
      }

      if (output === "blob") {
        const pdfMakeCreatePdf = pdfMake.createPdf(docDefinition);
        pdfMakeCreatePdf.getDataUrl((data) => {
          resolve({
            success: true,
            content: data + "#toolbar=0&navpanes=0",
            message: "Archivo generado correctamente.",
          });
        });
        return;
      }

      if (output === "print") {
        const pdfMakeCreatePdf = pdfMake.createPdf(docDefinition);
        pdfMakeCreatePdf.getBase64((data) => {
          printjs({
            printable: data,
            type: "pdf",
            base64: true,
          });
          resolve({
            success: true,
            content: null,
            message: "Documento enviado a impresión.",
          });
        });
        return;
      }

      reject({
        success: false,
        content: null,
        message: "Debes enviar tipo salida.",
      });
    } catch (error) {
      reject({
        success: false,
        content: null,
        // @ts-expect-error: Find the way yo type this
        message: error?.message ?? "No se pudo generar proceso.",
      });
    }
  });
};

export default createPdf;
