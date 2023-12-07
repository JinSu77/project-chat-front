import React from 'react';

interface TextInputProps {
    label: string;
    type: string;
    placeholder: string;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    minLength?: number;
    required?: boolean;
}

const TextInput: React.FC<TextInputProps> = ({
    label,
    type,
    placeholder,
    value,
    onChange,
    minLength,
    required,
}: TextInputProps) => {
    return (
        <div>
            <label className="label">
                <span className="label-text">{label}</span>
            </label>
            <input
                type={type}
                placeholder={placeholder}
                className="input input-bordered w-auto rounded-xl"
                value={value}
                onChange={onChange}
                minLength={minLength}
                required={required}
            />
        </div>
    );
};

export default TextInput;
