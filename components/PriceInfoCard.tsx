import Image from "next/image";

interface Props {
    title: string;
    iconSrc: string;
    value: string;
}

const PriceInfoCard = ({ title, iconSrc, value }: Props) => {
    return (
        <div className={`flex-1 min-w-[200px] border-l-2 border-zinc-400  flex flex-col gap-2 rounded bg-white-100 px-5 py-4 shadow-[-10px_0px_15px_-3px_rgba(0,0,0,0.1)]`} >
            <p className="text-base text-black-100 ">{title}</p>
            <div className="flex gap-1 ">
                <Image src={iconSrc} alt={title} width={24} height={24} />
                <p className="text-2xl font-bold text-secondary">{value}</p>
            </div>
        </div>
    )
}


export default PriceInfoCard;