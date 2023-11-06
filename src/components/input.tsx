import { ChangeEvent } from 'react';

type InputProps = {
    id: number;
    label: string;
    type: 'text' | 'number';
    placeholder: string;
    min: number;
    max: number;
    name: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

function InputField(props: InputProps): JSX.Element {
    const { id, label, type, placeholder, min, max, name, onChange } = props;

    return (
        <div key={id}>
            <label htmlFor={name}>{label}</label>
            <input
                id={name}
                type={type}
                placeholder={placeholder}
                min={min}
                max={max}
                name={name}
                onChange={onChange}
            />
        </div>
    );
}

export default InputField;
