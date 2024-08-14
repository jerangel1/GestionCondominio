import { Inter } from "next/font/google";
import { AdminLayout } from "../../layouts/AdminLayouts";
import { useEffect, useState } from "react";
import TotalCard from "../../components/TotalCards"; // Importar TotalCard
import { fetchDollarData } from "../api/home.service"; // Importar fetchDollarData
import { Euro, DollarSign, Calendar } from "lucide-react"; // Asegúrate de que la ruta sea correcta

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [dollarValue, setDollarValue] = useState<number | null>(null);
  const [euroValue, setEuroValue] = useState<number | null>(null);
  const [date, setDate] = useState<string | null>(null);

  useEffect(() => {
    const getDollarData = async () => {
      const data = await fetchDollarData();
      setDollarValue(data.monitors.usd.price); // Obtener el precio del dólar
      setEuroValue(data.monitors.eur.price); // Obtener el precio del euro
      setDate(data.datetime.date); // Obtener la fecha
    };
    getDollarData();
  }, []);

  return (
    <AdminLayout>
      <main
        className={`flex min-h-screen flex-col items-center justify-between ${inter.className}`}
      >
        <div className="grid grid-cols-3 gap-4 mb-4"> {/* Añadido mb-4 para margen inferior */}
          <TotalCard 
            title={`Dólar BCV`}
            value={`${dollarValue ? dollarValue.toFixed(2) : 0} Bs`} // Muestra 0 si no hay valor
            href="#"
            color="#f0f0f0"
            icon={<DollarSign size={24} />} // Asegúrate de que el tamaño sea adecuado
            colorIcon="#000"
          />
          <TotalCard
            title={`Euro`}
            value={`${euroValue ? euroValue.toFixed(2) : 0} Bs`} // Muestra 0 si no hay valor
            href="#"
            color="#e0e0e0"
            icon={<Euro size={24} />} // Asegúrate de que el tamaño sea adecuado
            colorIcon="#000"
          />
          <TotalCard
            title={`Fecha`}
            value={date || "Sin fecha"} // Muestra "Sin fecha" si no hay valor
            href="#"
            color="#d0d0d0"
            icon={<Calendar size={24} />} // Asegúrate de que el tamaño sea adecuado
            colorIcon="#000"
          />
        </div>
      </main>
    </AdminLayout>
  );
}