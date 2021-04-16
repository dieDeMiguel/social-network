export default function Chat({ data }) {
    console.log("dentro del map", data);
    return <li>{data.firstName}</li>;
}
