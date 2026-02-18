
// src/components/BillForm.jsxs
import React, { useState, useEffect } from 'react';
import { generateInvoicePdf } from "../Utils/generateInvoicePdf.js";

const emptyItem = { desc: '', qty: '', price: '' };

export default function BillForm() {
  const [customerName, setCustomerName] = useState('');
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [invoiceDate, setInvoiceDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [items, setItems] = useState([{ ...emptyItem }]);
  const [editable, setEditable] = useState(true); // keep fields editable in PDF
  const [fileName, setFileName] = useState('');   // override name if provided

  // Load from localStorage (optional)
  useEffect(() => {
    const saved = localStorage.getItem('billForm');
    if (saved) {
      const parsed = JSON.parse(saved);
      setCustomerName(parsed.customerName || '');
      setInvoiceNumber(parsed.invoiceNumber || '');
      setInvoiceDate(parsed.invoiceDate || new Date().toISOString().slice(0,10));
      setItems(parsed.items && parsed.items.length ? parsed.items : [{ ...emptyItem }]);
      setEditable(parsed.editable ?? true);
    }
  }, []);

  const addItem = () => setItems([...items, { ...emptyItem }]);
  const removeItem = (idx) => setItems(items.filter((_, i) => i !== idx));
  const updateItem = (idx, field, value) => {
    setItems(items.map((it, i) => (i === idx ? { ...it, [field]: value } : it)));
  };

  const onSave = async (e) => {
    e.preventDefault();

    const data = { customerName, invoiceNumber, invoiceDate, items, editable };
    // Save to localStorage
    localStorage.setItem('billForm', JSON.stringify(data));

    // Generate file name if user provided one, else let generator create it
    const name = fileName && fileName.trim().length > 0 ? fileName.trim() : undefined;

    // Generate PDF
    await generateInvoicePdf({ ...data, fileName: name });

    alert('Saved and PDF downloaded!');
  };

  return (
    <form onSubmit={onSave} style={{ maxWidth: 900, margin: '24px auto', padding: 16, border: '1px solid #ddd', borderRadius: 8 }}>
      <h2>Invoice / Bill</h2>

      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
        <div>
          <label>Customer Name</label><br />
          <input value={customerName} onChange={e => setCustomerName(e.target.value)} placeholder="Enter customer name" />
        </div>
        <div>
          <label>Invoice #</label><br />
          <input value={invoiceNumber} onChange={e => setInvoiceNumber(e.target.value)} placeholder="e.g., INV-1001" />
        </div>
        <div>
          <label>Date</label><br />
          <input type="date" value={invoiceDate} onChange={e => setInvoiceDate(e.target.value)} />
        </div>
      </div>

      <h3 style={{ marginTop: 24 }}>Items</h3>
      {items.map((it, idx) => (
        <div key={idx} style={{ display: 'grid', gridTemplateColumns: '1fr 120px 120px 80px', gap: 12, marginBottom: 8, alignItems: 'center' }}>
          <input
            placeholder="Description"
            value={it.desc}
            onChange={(e) => updateItem(idx, 'desc', e.target.value)}
          />
          <input
            placeholder="Qty"
            type="number"
            value={it.qty}
            onChange={(e) => updateItem(idx, 'qty', e.target.value)}
          />
          <input
            placeholder="Price"
            type="number"
            value={it.price}
            onChange={(e) => updateItem(idx, 'price', e.target.value)}
          />
          <button type="button" onClick={() => removeItem(idx)} disabled={items.length === 1}>Remove</button>
        </div>
      ))}
      <button type="button" onClick={addItem}>+ Add Item</button>

      <div style={{ marginTop: 16, display: 'flex', gap: 16, alignItems: 'center' }}>
        <label>
          <input type="checkbox" checked={editable} onChange={e => setEditable(e.target.checked)} />
          Keep fields editable in PDF (uncheck to flatten)
        </label>
      </div>

      <div style={{ marginTop: 12 }}>
        <label>Custom PDF File Name (optional)</label><br />
        <input
          placeholder="Invoice_Custom_Name.pdf"
          value={fileName}
          onChange={e => setFileName(e.target.value)}
          style={{ width: 360 }}
        />
        <div style={{ fontSize: 12, color: '#666' }}>
          Leave empty to auto-generate like: <code>Invoice_INV-1001_John_2026-01-20.pdf</code>
        </div>
      </div>

      <div style={{ marginTop: 24 }}>
        <button type="submit">Save & Download PDF</button>
      </div>
    </form>
  );
}
