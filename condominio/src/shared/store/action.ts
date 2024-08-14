type TAction =
	| "NOT_FOUND_ACTION"
	| "SET_DATE_RANGE"

export interface IAction {
	type: TAction;
	params?: any;
}
