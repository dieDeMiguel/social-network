export default function ChatMessage({ data }) {
    console.log("dentro de ChatMessage.js", data);
    return <li>{data.firstName}</li>;
}
