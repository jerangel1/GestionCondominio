import { useQuery } from "@tanstack/react-query";

import { fetchMessagingAuditorUser } from "@/shared/api/services/messaging-auditor-user.service";
import { InputField } from "@/shared/models/InputField.interface";

const labels = {
  minimo_monto_terminal: "Mínimo Terminal",
  minimo_monto_triple: "Mínimo Triple",
  minimo_monto_terminalazo: "Mínimo Terminalazo",
  minimo_monto_tripletazo: "Mínimo Tripletazo",
  minimo_monto_animalito: "Mínimo Animal",
  minimo_fraccion_apuesta: "Fracción Mínima por Apuesta",
  minimo_monto_ticket: "Monto Mínimo por Ticket",
  auditor_mensajeria_usuario_id: "Usuario Auditor de Mensajería",
  impuesto: "I.V.A",
};

export const useMinimumPlayInputs = () => {
  const { data: messagingAuditorUsers } = useQuery({
    queryKey: ["fetchMessagingAuditorUser"],
    queryFn: async () => {
      const data = await fetchMessagingAuditorUser();
      return data.map((auditorUser) => ({
        text: auditorUser.nombre,
        value: auditorUser.id,
      }));
    },
    retry: false,
  });

  const minimumPlayInputs = [
    {
      key: "minimo_monto_terminal",
      label: labels.minimo_monto_terminal,
      value: "",
      type: "number",
      rules: { required: true, minLength: 1 },
    },
    {
      key: "minimo_monto_triple",
      label: labels.minimo_monto_triple,
      value: "",
      type: "number",
      rules: { required: true, minLength: 1 },
    },
    {
      key: "minimo_monto_terminalazo",
      label: labels.minimo_monto_terminalazo,
      value: "",
      type: "number",
      rules: { required: true, minLength: 1 },
    },
    {
      key: "minimo_monto_tripletazo",
      label: labels.minimo_monto_tripletazo,
      value: "",
      type: "number",
      rules: { required: true, minLength: 1 },
    },
    {
      key: "minimo_monto_animalito",
      label: labels.minimo_monto_animalito,
      value: "",
      type: "number",
      rules: { required: true, minLength: 1 },
    },
    {
      key: "minimo_fraccion_apuesta",
      label: labels.minimo_fraccion_apuesta,
      value: "",
      type: "number",
      rules: { required: true, minLength: 1 },
    },
    {
      key: "minimo_monto_ticket",
      label: labels.minimo_monto_ticket,
      value: "",
      type: "number",
      rules: { required: true, minLength: 1 },
    },
    {
      key: "auditor_mensajeria_usuario_id",
      label: labels.auditor_mensajeria_usuario_id,
      value: "",
      type: "select",
      data: messagingAuditorUsers,
      rules: { required: true, min: 1 },
    },
    {
      key: "impuesto",
      label: labels.impuesto,
      value: "",
      type: "number",
      rules: { required: true, minLength: 1 },
    },
  ] as InputField[];

  return { data: minimumPlayInputs };
};
