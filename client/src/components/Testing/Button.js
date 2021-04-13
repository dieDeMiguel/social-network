export const DEFAULT_TEXT = "Empty";

export default function Button({ text }) {
    const buttonText = text || DEFAULT_TEXT;
    return <button>{buttonText}</button>;
}
