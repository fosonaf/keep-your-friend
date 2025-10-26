import React, { useRef, useState, useEffect } from 'react';
import './KUpload.css';

interface KUploadProps {
    label: string;
    inputFile: File | null;
    setInputFile: (file: File | null) => void;
}

const KUpload: React.FC<KUploadProps> = ({ label, inputFile, setInputFile }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [preview, setPreview] = useState<string | null>(null);

    const handleClick = () => {
        fileInputRef.current?.click();
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setInputFile(file);

            const objectUrl = URL.createObjectURL(file);
            setPreview(objectUrl);
        }
    };

    useEffect(() => {
        return () => {
            if (preview) URL.revokeObjectURL(preview);
        };
    }, [preview]);

    return (
        <div className="kds-upload-container">
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
            {inputFile && preview && (
                <div className="kds-upload-preview">
                    <img src={preview} alt="preview" className="kds-upload-image" />
                    <p className="kds-upload-name">{inputFile.name}</p>
                </div>
            )}
        </div>
    );
};

export default KUpload;
