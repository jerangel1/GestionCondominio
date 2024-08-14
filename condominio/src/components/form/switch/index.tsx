import { Switch as SwitchBase } from "@headlessui/react";

type SwitchProps = {
  label?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  defaultChecked?: boolean;
  disabled?: boolean;
};

export const Switch = ({
  label,
  checked,
  onChange,
  defaultChecked,
  disabled,
}: SwitchProps) => {
  return (
    <div className="py-4">
      <label className="flex items-center">
        <SwitchBase
          checked={checked}
          defaultChecked={defaultChecked}
          onChange={onChange}
          disabled={disabled}
          className={`${checked ? "bg-secondary-1000" : "bg-secondary-200"}
            relative inline-flex h-[19px] w-[37px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white/75`}
        >
          <span className="sr-only">Use setting</span>
          <span
            aria-hidden="true"
            className={`${checked ? "translate-x-4" : "translate-x-0"}
              pointer-events-none inline-block h-[16px] w-[16px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
          />
        </SwitchBase>
        <span className="mr-2 pl-2">{label}</span>
      </label>
    </div>
  );
};
