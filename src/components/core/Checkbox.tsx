import React, { ChangeEvent, ReactNode } from "react";

interface CheckboxProps {
    id: string;
    type: string;
    name: string;
    handleClick: (event: ChangeEvent<HTMLInputElement>) => void;
    isChecked: boolean;
    children?: ReactNode;
}

const Checkbox: React.FC<CheckboxProps> = ({id, type, name, handleClick, isChecked= false, children = ""}) => {

    return (<>
        <input 
            id={id}
            name={name}
            type={type}
            onChange={handleClick}
            checked={isChecked}
            className="w-4 h-4 text-violet-600 bg-gray-100 rounded border-gray-300 focus:ring-violet-500 dark:focus:ring-violet-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        />
        <span>{children}</span>
        </>
    );
}

export default Checkbox;