import React, { useState } from 'react';
import { useForm, FormProvider, Controller } from 'react-hook-form';
import { AdminLayout } from '../../layouts/AdminLayouts';
import { Button} from '../ui';
import { Input, Select} from '../form';



import toast from 'react-hot-toast';

const estados = [
    { value: 'activo', id: 1},
    { value: 'inactivo' , id: 2},
];

const metodosPago = [
    { value: 'efectivo', id: 1},
    { value: 'tarjeta', id: 3},
    { value: 'transferencia', id: 4},
];

type Residente = {
    id: string;
    nombre: string;
    estado: string;
    metodoPago: string;
};

export const ResidentesTemplate = () => {
    const [addingResidente, setAddingResidente] = useState(false);
    const [residentes, setResidentes] = useState<Residente[]>([]);

    const methods = useForm({
        defaultValues: {
            nombre: '',
            estado: '',
            metodoPago: '',
        },
    });

    const { control, handleSubmit, formState: { errors } } = methods;


    const onSubmit = (data: any) => {
        // Aquí iría la lógica para guardar el nuevo residente
        console.log(data);
        toast.success('Residente agregado con éxito');
        setAddingResidente(false);
        // Actualizar la lista de residentes
    };

    return (
        <AdminLayout>
            <div className="p-6">
                <h1 className="text-2xl font-bold mb-4">Gestión de Residentes</h1>

                <Button onClick={() => setAddingResidente(true)} className="mb-4">
                    Agregar Residente
                </Button>

                {addingResidente && (
                    <FormProvider {...methods}>
                        <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded-lg shadow-md mb-6">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <Controller
                                    name="nombre"
                                    control={control}
                                    rules={{ required: 'El nombre es requerido' }}
                                    render={({ field }) => (
                                        <Input {...field} label="Nombre" error={errors.nombre?.message} />
                                    )}
                                />
                                <Controller
                                    name="estado"
                                    control={control}
                                    rules={{ required: 'El estado es requerido' }}
                                    render={({ field }) => (
                                        <Select
                                            {...field}
                                            label="Estado"
                                            options={estados}
                                            error={errors.estado?.message}
                                        />
                                    )}
                                />
                                <Controller
                                    name="metodoPago"
                                    control={control}
                                    rules={{ required: 'El método de pago es requerido' }}
                                    render={({ field }) => (
                                        <Select
                                            {...field}
                                            label="Método de Pago"
                                            options={metodosPago}
                                            error={errors.metodoPago?.message}
                                        />
                                    )}
                                />
                            </div>
                            <div className="mt-4 flex justify-end">
                                <Button type="submit">Guardar</Button>
                            </div>
                        </form>
                    </FormProvider>
                )}

                <table className="w-full bg-white rounded-lg shadow-md">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-3 text-left">Nombre</th>
                            <th className="p-3 text-left">Estado</th>
                            <th className="p-3 text-left">Método de Pago</th>
                            <th className="p-3 text-left">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {residentes.map((residente) => (
                            <tr key={residente.id}>
                                <td className="p-3">{residente.nombre}</td>
                                <td className="p-3">{residente.estado}</td>
                                <td className="p-3">{residente.metodoPago}</td>
                                <td className="p-3">
                                    <Button size="small">Editar</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </AdminLayout>
    );
}