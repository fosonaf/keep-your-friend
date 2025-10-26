import React, { useRef } from 'react';
import './KUpload.css'

interface KUploadProps {
    label: string;
    inputFile: File | null;
    setInputFile: (file: File | null) => void;
}

const KUpload: React.FC<KUploadProps> = ({ label, inputFile, setInputFile }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleClick = () => {
        fileInputRef.current?.click();
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setInputFile(e.target.files[0]);
        }
    };

    return (
        <>
            <button className="kds-upload" type="button" onClick={handleClick}>
                {label}
            </button>
            <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleChange}
            />
        </>
    );
};

export default KUpload;
