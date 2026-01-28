
// src/pdf/generateInvoicePdf.js
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import { saveAs } from 'file-saver';

/**
 * Generate a PDF invoice with fillable fields (AcroForm) for header data.
 * Items are drawn as table rows. You can flatten the form to make it non-editable.
 */
export async function generateInvoicePdf({
  customerName,
  invoiceNumber,
  invoiceDate,     // string e.g. '2026-01-20'
  items = [],      // [{ desc, qty, price }]
  editable = true, // if false, the form will be flattened
  fileName,        // optional override for filename
}) {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([595.28, 841.89]); // A4 in points (72dpi)
  const { width, height } = page.getSize();
  const margin = 40;

  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const form = pdfDoc.getForm();

  // Title
  page.drawText('INVOICE', {
    x: margin,
    y: height - margin - 10,
    size: 24,
    font,
    color: rgb(0.1, 0.1, 0.1),
  });

  // Header fields
  const label = (text, x, y) =>
    page.drawText(text, { x, y, size: 10, font, color: rgb(0.3, 0.3, 0.3) });

  const fieldHeight = 20;
  const startY = height - margin - 50;

  // Customer Name
  label('Customer Name', margin, startY + 5);
  const nameField = form.createTextField('customerName');
  nameField.setText(customerName || '');
  nameField.addToPage(page, { x: margin, y: startY - fieldHeight + 5, width: 240, height: fieldHeight });

  // Invoice Number
  label('Invoice #', margin + 260, startY + 5);
  const invField = form.createTextField('invoiceNumber');
  invField.setText(String(invoiceNumber || ''));
  invField.addToPage(page, { x: margin + 260, y: startY - fieldHeight + 5, width: 120, height: fieldHeight });

  // Date
  label('Date', margin + 400, startY + 5);
  const dateField = form.createTextField('invoiceDate');
  dateField.setText(invoiceDate || '');
  dateField.addToPage(page, { x: margin + 400, y: startY - fieldHeight + 5, width: 140, height: fieldHeight });

  // Items table header
  let tableY = startY - 60;
  const headers = [
    { text: 'Description', width: 300 },
    { text: 'Qty', width: 60 },
    { text: 'Price', width: 80 },
    { text: 'Amount', width: 80 },
  ];

  // Draw headers
  let x = margin;
  headers.forEach(h => {
    page.drawText(h.text, { x, y: tableY, size: 11, font, color: rgb(0, 0, 0) });
    x += h.width;
  });

  tableY -= 14;
  page.drawLine({
    start: { x: margin, y: tableY },
    end: { x: width - margin, y: tableY },
    thickness: 1,
    color: rgb(0, 0, 0),
  });

  // Draw rows
  let subtotal = 0;
  const rowHeight = 22;
  for (const it of items) {
    const qty = Number(it.qty) || 0;
    const price = Number(it.price) || 0;
    const amount = qty * price;
    subtotal += amount;

    const rowY = tableY - rowHeight + 4;
    let colX = margin;

    page.drawText(String(it.desc || ''), { x: colX, y: rowY, size: 10, font }); colX += headers[0].width;
    page.drawText(qty ? String(qty) : '', { x: colX, y: rowY, size: 10, font }); colX += headers[1].width;
    page.drawText(price ? price.toFixed(2) : '', { x: colX, y: rowY, size: 10, font }); colX += headers[2].width;
    page.drawText(amount ? amount.toFixed(2) : '', { x: colX, y: rowY, size: 10, font });

    tableY -= rowHeight;

    // (Optional) add new pages if needed
    if (tableY < margin + 120) {
      // Draw totals first, or add new page and redraw headers
      // For simplicity, this sample keeps single-page invoices.
      break;
    }
  }

  // Totals
  tableY -= 10;
  page.drawLine({
    start: { x: width - margin - 220, y: tableY },
    end: { x: width - margin, y: tableY },
    thickness: 1,
    color: rgb(0, 0, 0),
  });

  page.drawText('Subtotal:', { x: width - margin - 200, y: tableY - 16, size: 12, font });
  page.drawText(subtotal.toFixed(2), { x: width - margin - 70, y: tableY - 16, size: 12, font });

  // Flatten or keep editable
  if (!editable) {
    form.flatten(); // makes fields non-editable
  } else {
    // Optional: make fields read-only but visible as fields
    nameField.enableReadOnly();
    invField.enableReadOnly();
    dateField.enableReadOnly();
  }

  // Save & download with controlled filename
  const bytes = await pdfDoc.save();
  const blob = new Blob([bytes], { type: 'application/pdf' });

  if (!fileName) {
    const safeCustomer = (customerName || 'Customer').replace(/[^a-z0-9-_]+/gi, '_');
    const datePart = invoiceDate || new Date().toISOString().slice(0, 10);
    fileName = `Invoice_${invoiceNumber || 'NA'}_${safeCustomer}_${datePart}.pdf`;
  }
  saveAs(blob, fileName);
}
