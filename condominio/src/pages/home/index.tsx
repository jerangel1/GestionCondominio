import { Inter } from "next/font/google";
import { AdminLayout } from "../../layouts/AdminLayouts"; 

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <AdminLayout>
      <main
        className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
      >
        {/* {{ edit_1 }} Asegúrate de que el contenido esté visible */}
        <h1 className="text-black">probando</h1> {/* Cambié el color del texto a negro para asegurar visibilidad */}
      </main>
    </AdminLayout>
  );
}