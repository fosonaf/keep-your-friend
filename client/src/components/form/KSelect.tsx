import React from 'react';
import './KSelect.css'

interface KSelectProps {
    placeholder: string;
    label: string
    option: string;
    setOption: (value: string) => void;
    options: string[];
}

const KSelect: React.FC<KSelectProps> = ({
    placeholder,
    label,
    option,
    setOption,
    options
                                         }) => {

    return (
        <div className="kds-select">
            <label
                htmlFor={label}
                className="label-field"
            >
                {label}
            </label>
            <select
                id={label}
                className="kds-options"
                value={option}
                onChange={(e) => setOption(e.target.value)}
            >
                <option value="">{placeholder}</option>
                {options.map((opt) => (
                    <option key={opt} value={opt}>
                        {opt}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default KSelect;
