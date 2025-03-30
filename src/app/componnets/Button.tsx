type ButtonProps = {
    text: string;
};

export default function Button({ text }: ButtonProps) {
    return <button className="px-4 rounded-2xl cursor-pointer py-2 bg-blue-500 text-white">{text}</button>;
}
