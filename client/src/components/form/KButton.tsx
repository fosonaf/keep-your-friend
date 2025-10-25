import React from 'react';
import './KButton.css'

interface KButtonProps {
    label: string;
    handleClick: () => void;
    disabled?: boolean;
}

const KButton: React.FC<KButtonProps> = ({
                                             label,
                                             handleClick,
                                             disabled = false
                                         }) => {

    return (
        <button
            className={`kds-button ${disabled ? 'kds-button-disabled' : ''}`}
            disabled={disabled}
            onClick={handleClick}
        >
            {label}
        </button>
    );
};

export default KButton;
