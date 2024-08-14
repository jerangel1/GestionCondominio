import React, { useEffect, useState } from 'react';
import { AdminLayout } from '@/layouts/AdminLayouts';
import { CurrencyInput } from '@/components/form/CurrencyInput';
import { fetchDollarData } from '@/pages/api/home.service';
import { Input, Label } from '@/components/form';

const Cobranza = () => {
  const [month, setMonth] = useState('');
  const [receiptDate, setReceiptDate] = useState('');
  const [generalExpenses, setGeneralExpenses] = useState(0);
  const [specialExpenses, setSpecialExpenses] = useState(0);
  const [apartmentFees, setApartmentFees] = useState(0);
  const [salariesAndFees, setSalariesAndFees] = useState(0);
  const [exchangeRate, setExchangeRate] = useState(0); // Tipo de cambio a dólares
  const [apartmentCount, setApartmentCount] = useState(1); // Contador de alícuotas
  const [apartmentAmounts, setApartmentAmounts] = useState<number[]>([]); // Montos de alícuotas
  const [specialDescription, setSpecialDescription] = useState(''); // Descripción de gastos especiales
  const [salaryDescription, setSalaryDescription] = useState(''); // Descripción de sueldos y honorarios

  const [invoiceItems, setInvoiceItems] = useState<{ description: string; quantity: number; price: number }[]>([]); // Items de la factura
  const [newItem, setNewItem] = useState({ description: '', quantity: 1, price: 0 }); // Nuevo item a agregar

  useEffect(() => {
    const getDollarData = async () => {
      const data = await fetchDollarData();
      setExchangeRate(data.monitors.usd.price); // Obtener el precio del dólar
    };
    getDollarData();
  }, []);

  const totalBs = generalExpenses + specialExpenses + apartmentFees + salariesAndFees;
  const totalUsd = totalBs / exchangeRate; // Conversión a dólares

  const addItem = () => {
    setInvoiceItems([...invoiceItems, newItem]);
    setNewItem({ description: '', quantity: 1, price: 0 }); // Reiniciar el formulario
  };

  const subtotal = invoiceItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const tax = subtotal * 0.1; // 10% de impuestos
  const total = subtotal + tax;

  const handleApartmentCountChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const count = parseInt(e.target.value);
    setApartmentCount(count);
    setApartmentAmounts(new Array(count).fill(0)); // Inicializar montos de alícuotas
  };

  const handleApartmentAmountChange = (index: number, value: number) => {
    const newAmounts = [...apartmentAmounts];
    newAmounts[index] = value;
    setApartmentAmounts(newAmounts);
  };

  return (
    <AdminLayout>
      <div className="w-full h-full p-8">
        <h1 className='text-3xl font-bold text-center text-black'>Cobranza</h1>
        <form className="mt-8 space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label className="block text-sm font-medium text-gray-700">Mes en curso</Label>
              <input
                type="text"
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                placeholder="Ej: Enero 2024"
              />
            </div>
            <div>
              <Label className="block text-sm font-medium text-gray-700">Fecha del recibo</Label>
              <Input
                type="date"
                value={receiptDate}
                onChange={(e) => setReceiptDate(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label className="block text-sm font-medium text-gray-700">Tipo de cambio (Bs a $)</Label>
              <Input
                type="number"
                value={exchangeRate}
                readOnly
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div>
              <Label className="block text-sm font-medium text-gray-700">Monto de gastos generales</Label>
              <CurrencyInput
                value={generalExpenses}
                onChange={(e) => setGeneralExpenses(parseFloat(e.target.value))}
                currency="Bs"
                className="mt-1 block w-full"
              />
            </div>
            <div>
              <Label className="block text-sm font-medium text-gray-700">Gastos especiales</Label>
              <CurrencyInput
                value={specialExpenses}
                onChange={(e) => setSpecialExpenses(parseFloat(e.target.value))}
                currency="Bs"
                className="mt-1 block w-full"
              />
              <input
                type="text"
                value={specialDescription}
                onChange={(e) => setSpecialDescription(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                placeholder="Descripción de gastos especiales"
              />
            </div>
          </div>
          <div className='grid grid-cols-1 gap-4'>
            <Label className="block text-sm font-medium text-gray-700">Alicuotas por apartamentos</Label>
            <select
              value={apartmentCount}
              onChange={handleApartmentCountChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            >
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
            </select>
            {Array.from({ length: apartmentCount }).map((_, index) => (
              <Input
                key={index}
                min={0}
                value={apartmentAmounts[index]}
                onChange={(e) => handleApartmentAmountChange(index, parseFloat(e.target.value))} // Convertir a número
                className="mt-1 block w-full"
              />
            ))}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Sueldos y honorarios</label>
            <CurrencyInput
              value={salariesAndFees}
              onChange={(e) => setSalariesAndFees(parseFloat(e.target.value))}
              currency="Bs"
              className="mt-1 block w-full"
            />
            <Input
              type="text"
              value={salaryDescription}
              onChange={(e) => setSalaryDescription(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              placeholder="Descripción de sueldos y honorarios"
            />
          </div>
          <div>
            <h2 className="text-xl font-bold">Agregar Item</h2>
            <input
              type="text"
              value={newItem.description}
              onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
              placeholder="Descripción"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
            <input
              type="number"
              value={newItem.quantity}
              onChange={(e) => setNewItem({ ...newItem, quantity: parseInt(e.target.value) })}
              min={1}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
            <input
              type="number"
              value={newItem.price}
              onChange={(e) => setNewItem({ ...newItem, price: parseFloat(e.target.value) })}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              placeholder="Precio"
            />
            <button type="button" onClick={addItem} className="mt-2 bg-blue-500 text-white p-2 rounded">
              Agregar Item
            </button>
          </div>
        </form>
        <div className="mt-8">
          <h2 className="text-xl font-bold">Resumen de la Factura</h2>
          <table className="mt-4">
            <thead>
              <tr>
                <th>Item</th>
                <th>Cantidad</th>
                <th>Precio</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {invoiceItems.map((item, index) => (
                <tr key={index}>
                  <td>{item.description}</td>
                  <td>{item.quantity}</td>
                  <td>${item.price.toFixed(2)}</td>
                  <td>${(item.price * item.quantity).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p>Subtotal: ${subtotal.toFixed(2)}</p>
          <p>Impuesto (10%): ${tax.toFixed(2)}</p>
          <p>Total: ${total.toFixed(2)}</p>
          <p>Por favor, realice el pago antes de la fecha de vencimiento. ¡Gracias por su negocio!</p>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Cobranza;