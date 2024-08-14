//**StepsFrom Component */
import React, { useEffect, useState } from "react";
import {
  Controller,
  useForm,
} from "react-hook-form";
import { Input } from "../input";
import { Button } from "@/components/ui/Button";
import { PhoneNumberInput } from "../PhoneNumberInput";
import { Select, DEFAULT_OPTION } from "@/components/form/select/PatchSelect";
import { Switch } from "@/components/form/switch";
import Grid from "@mui/material/Grid";
import { motion } from "framer-motion";
import { AgencySchema } from "@/schemas/AgencySchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldType, Step, FormStepsProps, initialData, StepsFormProps, FormAgencyData } from "@/schemas/AgencyStepsform";
import { Modal } from "@/components/ui/Modal";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";



export const FormSteps: React.FC<FormStepsProps> = ({
  control: formControl,
  updateFormData,
  type,
  queryFn,
  queryKey,
  defaultValue,
  ...field
}) => {
  switch (type) {
    case FieldType.Input:
      return (
        <Controller
          name={field.name as keyof FormAgencyData}
          control={formControl}
          defaultValue={defaultValue || ""}
          render={({ field }) => (
            <Input
              type=""
              {...field}
              id={field.name}
              className=""
              placeholder="Placeholder"
              onChange={(e) => {
                field.onChange(e);
                updateFormData({ ...initialData, [field.name]: e.target.value });
              }}
              value={field.value ? field.value.toString() : ""}
            />
          )}
        />
      );
      // TODO Refactorizar  como ARQUEO/Ingresos y egresos
    // case FieldType.Phone:
    //   return (
    //     <Controller
    //       name={field.name as keyof FormAgencyData}
    //       control={formControl}
    //       render={({ field }) => (
    //         <PhoneNumberInput
    //           {...field}
    //           control={formControl}
    //           label=""
    //           onChange={(value) => {
    //             const phoneNumber = typeof value === "string" ? value : value.target.value;
    //             field.onChange(phoneNumber);
    //             updateFormData({ ...initialData, [field.name]: phoneNumber });
    //           }}
    //           value={field.value ? { __tag: field.value.toString() } : ""}
    //         />
    //       )}
    //     />
    //   );
    // case FieldType.Select:
    //   return (
    // <Controller
    //   name={field.name as keyof FormAgencyData}
    //   control={formControl}
    //   defaultValue={field.label || defaultValue}
    //   render={({ field }) => (
    //     <Select
    //       label=""
    //       name=""
    //       queryFn={queryFn}
    //       queryKey={queryKey}
    //       onChange={(selectedOption: DEFAULT_OPTION) => {
    //         const value = isNaN(parseFloat(selectedOption.value.toString())) ? 0 : parseFloat(selectedOption.value.toString());
    //         field.onChange(value);
    //         updateFormData({ ...initialData, [field.name]: value });
    //       }}
    //     />
    //   )}
    // />
    //);
    case FieldType.Switch:
      return (
        <Controller
          name={field.name as keyof FormAgencyData}
          control={formControl}
          render={({ field: { onChange, value, ...field } }) => (
            <Switch
              {...field}
              label=""
              checked={Boolean(value)}
              onChange={(newValue) => {
                onChange(newValue);
                updateFormData({ ...initialData, [field.name]: value });
              }}
              disabled={Boolean(field.disabled)}
            />
          )}
        />
      );
    default:
      return null;
  }
};

export const StepsForm: React.FC<StepsFormProps> = ({ control, updateFormData, steps, onSubmit }) => {
  //** Form setup
  const { control: formControl, handleSubmit, reset, formState: { errors } } = useForm<FormAgencyData>({
    resolver: zodResolver(AgencySchema),
    defaultValues: initialData,
  });

  //** State variables
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormAgencyData | undefined>(initialData);
  const [currentFieldNames] = useState<string[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const onClickSave = async () => {
    try {
      await handleSubmit(onClickSaveConfirmation)();
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
    }
  };

  const onClickSaveConfirmation = async (data: FormAgencyData) => {
    console.log("Confirming save");
    try {
      const response = await axios.post("https://api.betsol.la/api/v1/models/agency", data);
      console.log(response);
      console.log("Datos de agencia guardados con éxito");
      setFormData(undefined);
    } catch (error) {
      console.error("Error al guardar los datos de la agencia:", error);
    }
  };

  const formAgencyDataToFormData = (data: FormAgencyData): FormData => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (typeof value === "number") {
        formData.append(key, value.toString());
      } else if (typeof value === "string") {
        formData.append(key, value);
      }
    });
    return formData;
  };

  //** Handlers
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);
  const handleModalSubmit = () => {
    if (formData) {
      onClickSaveConfirmation(formData);
    } else {
      console.error("No form data to send");
    }
  };
  const handleNextStep = async () => {
    const data = await handleSubmit((data) => {
      setFormData((prevData) => ({ ...prevData, ...data }));
    })();
    setCurrentStep((prevStep) => Math.min(prevStep + 1, steps.length - 1));
  };
  const handlePrevStep = () => setCurrentStep((prevStep) => Math.max(prevStep - 1, 0));
  const updateAllFormData = (currentStep: number, data: Partial<FormAgencyData>) => {
    setFormData((prevData) => ({ ...prevData!, ...data }));
  };

  //**Effects
  useEffect(() => {
    reset(initialData);
  }, [reset]);

  return (
    <>
      <ToastContainer />
      <div className="h-full p-2">
        <div className="h-1/2 overflow-hidden">
          <form onSubmit={onSubmit} className="h-[500px]">
            <div className="mb-8">
              <ul className="flex gap-3 list-none justify-center">
                {steps.map((step: Step, index: number) => (
                  <li
                    key={index}
                    className={`${index + 1} ${index === currentStep ? "active" : "disabled"
                      } flex items-center font-bold`}
                  >
                    <motion.span
                      className={`w-8 h-8 bg-${index === currentStep ? "secondary-1000" : "gray-400"
                        } text-white rounded-full mr-2 flex items-center justify-center`}
                      initial={{ y: -50, scale: 0.6 }}
                      animate={{ y: 0, scale: index === currentStep ? 1 : 0.75 }}
                      transition={{ duration: 0.7, type: "spring", bounce: 0.8 }}
                    >
                      {index + 1}
                    </motion.span>
                    {(currentStep === index ||
                      currentStep === steps.length - 1) &&
                      step.label}{" "}
                  </li>
                ))}
              </ul>
            </div>
            <Grid container spacing={2} className="mb-8">
              {steps[currentStep].fields.map((field, fieldIndex) => {
                console.log(steps[currentStep].label, JSON.stringify(formData));
                return (
                  <Grid item xs={field.gridSize} key={fieldIndex}>
                    <label htmlFor={field.name}>{field.label}</label>
                    <FormSteps
                      control={formControl}
                      updateFormData={(data: FormAgencyData) => updateAllFormData(currentStep, data)}
                      {...field}
                      defaultValue={field.defaultValue}
                    />
                  </Grid>
                );
              })}
            </Grid>
          </form>
        </div>
        <Grid container spacing={2} className="w-full">
          <div className="flex justify-end m-2 gap-2 gap-x-4">
            {currentStep > 0 && (
              <Button className="gap-1" onClick={handlePrevStep}>
                Atrás
              </Button>
            )}
            {currentStep < steps.length - 1 && (
              <Button
                type="button"
                className=""
                onClick={handleNextStep}
              >
                Siguiente
              </Button>
            )}
            {currentStep === steps.length - 1 && (
              <Button
                type="button"
                className=""
                onClick={handleOpenModal}
              >
                Guardar
              </Button>
            )}
          </div>
        </Grid>
        <Modal isOpen={openModal} onClose={handleCloseModal} onSave={handleModalSubmit}>
          <div>
            <h2>Confirmar envío</h2>
            <p>¿Estás seguro de que quieres enviar los datos del formulario?</p>
            <button onClick={handleModalSubmit}>Enviar</button>
          </div>
        </Modal>
      </div>
    </>
  );
};