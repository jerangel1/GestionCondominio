import { TableCell, type Content } from "pdfmake/interfaces";
import { TicketPollaData } from "@/components/NewTicketForm";
import createPdf from "./createPdf";
import { formatNumber } from "@/utils/functions";
import { format } from "date-fns";

export const generateInvoicePolla = async ({
  ticketData,
  output,
}: {
  ticketData: TicketPollaData;
  output: "print" | "b64" | "blob";
}) => {

  // Header - document metadata
  const headerDocument: Content = [
    {
      image:
        "data:image/png;base64,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", //Logo
      fit: [120.73, 48.692],
      margin: [0, 10],
      alignment: "center",
    },
    { text: "BETSOL", style: "header", margin: [0, 10, 0, 0] },
    {
      text: `TICKET ${ticketData.id}`,
      style: "header",
      margin: [0, 10, 0, 2.25],
    },
  ];

  // Header - ticket metadata
  const headerTicket: Content = [
    {
      margin: [0, 10, 0, 0],
      table: {
        widths: ["25%", "35%", "15%", "25%"],
        body: [
          [
            { text: "FECHA:", style: "tHeaderLabel" },
            { text: ticketData.fecha, style: "tHeaderValue" },
            { text: "HORA:", style: "tHeaderLabel" },
            { text: format(new Date(ticketData.tiempo_creacion), "hh:mm"), style: "tHeaderValue" },
          ],
          [
            { text: "N/T:", style: "tHeaderLabel" },
            {
              text: ticketData.id,
              style: "tHeaderValue",
              colSpan: 3,
            },
          ],
          [
            { text: "N/S:", style: "tHeaderLabel" },
            {
              text: ticketData.serial,
              style: "tHeaderValue",
              colSpan: 3,
            },
          ],
          [
            { text: "AGENCIA:", style: "tHeaderLabel" },
            {
              text: ticketData.agencia_nombre,
              style: "tHeaderValue",
              colSpan: 3,
            },
            {},
            {},
          ],
        ],
      },
      layout: "noBorders",
    },
  ];

  const draws: TableCell[][][] = ticketData.sorteos_polla.map((draw) => [
    [
      {
        text: draw.nombre,
        style: "tProductsBody",
        colSpan: 4,
      },
      {},
      {},
      {},
    ],
    [
      {
        text: Object.keys(draw.numeros).join("-"),
        style: "tProductsBody",
        alignment: "left",
        colSpan: 2,
      },
      {},
      { text: draw.fecha, style: "tProductsBody", alignment: "left" },
      { text: formatNumber(draw.monto) + " Bs", style: "tProductsBody", alignment: "right" },
    ],
  ]);

  const drawsTable: Content[] = [
    {
      margin: [0, 10, 0, 0],
      table: {
        widths: ["20%", "30%", "30%", "20%"],
        headerRows: 1,
        body: [
          [
            { text: "Sorteo", style: "tProductsHeader", colSpan: 2 },
            {},
            { text: "", style: "tProductsHeader", alignment: "left" },
            { text: "", style: "tProductsHeader", alignment: "right" },
          ],
          [
            { text: "Números Apostados", style: "tProductsHeader", colSpan: 2 },
            {},
            { text: "Fecha", style: "tProductsHeader", alignment: "left" },
            { text: "Total", style: "tProductsHeader", alignment: "right" },
          ],
          ...draws.flat(),
        ],
      },
      layout: {
        hLineWidth: function (i: number) {
          return i === 2 ? 0.5 : 0;
        },
        vLineWidth: function () {
          return 0;
        },
        hLineColor: function () {
          return "#f2f0f0";
        },
        paddingTop: function (i: number) {
          return i % 2 === 0 ? 10 : 1;
        },
      },
    },
  ];

  const totals: Content[] = [
    {
      margin: [0, 10, 0, 0],
      table: {
        widths: ["25%", "35%", "15%", "25%"],
        body: [
          //TOTALES
          [
            {
              text: "TOTAL TICKET:",
              style: "tTotals",
              colSpan: 2,
              alignment: "left",
            },
            {},
            {},
            { text: formatNumber(ticketData.monto_total) + " Bs", style: "tTotals", colSpan: 1 },
          ],
          //DATOS CLIENTE
          [
            {
              text: "CLIENTE: ",
              style: "tTotals",
              alignment: "left",
              colSpan: 1,
              margin: [0, 6, 0, 0],
            },
            {
              text: [
                ticketData.cliente_nombre,
                ticketData.cliente_apellido,
              ].join(" "),
              style: "tTotals",
              alignment: "right",
              colSpan: 3,
              margin: [0, 6, 0, 0],
            },
            {},
            {},
          ],
          [
            {
              text: `C.I. ${ticketData.cliente_cedula}`,
              style: "tTotals",
              alignment: "right",
              colSpan: 4,
              margin: [0, 0, 0, 0],
            },
            {},
            {},
            {},
          ],
          [
            {
              text: ticketData.cliente_telefono,
              style: "tTotals",
              alignment: "right",
              colSpan: 4,
              margin: [0, 0, 0, 0],
            },
            {},
            {},
            {},
          ],
        ],
      },
      layout: "noBorders",
    },
  ];

  const footNote: Content = [
    {
      text: "EL TICKET CADUCA A LOS TRES DÍAS.",
      style: "tTotals",
      alignment: "center",
      margin: [0, 20],
    },
  ];

  const qrSection: Content = [
    {
      stack: [
        {
          text: "Consulta tu progreso en:",
          style: "text",
        },
        {
          text: "https://betsol.la",
          link: "https://betsol.la",
          style: "link",
        },
        {
          text: "o escanea el siguiente código qr:",
          style: "text",
        },
        {
          qr:
            "https://polla.betsol.la" +
            (ticketData.cliente_cedula
              ? `?cedula=${ticketData.cliente_cedula}`
              : ""),
          fit: 80,
          alignment: "center",
          eccLevel: "Q",
          margin: [0, 10, 0, 3],
        },
      ],
    },
  ];

  const content: Content = [
    ...headerDocument,
    ...headerTicket,
    ...drawsTable,
    ...totals,
    ...footNote,
    ...qrSection,
  ];

  const response = await createPdf(
    { content },
    output,
    32 * ticketData.sorteos_polla.length
  );
  return response;
};
