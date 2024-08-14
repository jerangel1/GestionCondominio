import { axiosPrivate } from "@/shared/api/axiosPrivate";
import { Paginated } from "@/types/types";
import { CashRegisterAdminTableDataType } from "@/components/tables/CashRegisterTable.admin";

const getCashRegisterAdminDatatable = async (data: {
	to_date?: string;
	from_date?: string;
	status_flow_id?: number;
	father_id?: number;
	agency_id?: number;
	ticket_offices_id?: number;
}) => {
	const apiUrl = "/api/v1/models/admin/cash-register/datatable";
	const result = await axiosPrivate.post<Paginated<CashRegisterAdminTableDataType>>(apiUrl, data);
	return result.data;
};

export const cashRegister = {
	getCashRegisterAdminDatatable	
};