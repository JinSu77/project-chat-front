export type SecurityQuestion = {
    id: number;
    label: string;
    type: 'text' | 'number';
    placeholder: string;
    min: number;
    max: number;
    name: string;
};

export const securityQuestions: SecurityQuestion[] = [
    {
        id: 1,
        label: 'identifiant',
        type: 'text',
        placeholder: 'Entrez votre identifiant',
        min: 2,
        max: 50,
        name: 'username',
    },
    {
        id: 2,
        label: 'mot de passe',
        type: 'text',
        placeholder: 'Entrez votre mot de passe',
        min: 2,
        max: 50,
        name: 'mot de passe',
    },
];
