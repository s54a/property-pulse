import Link from "next/link";
import { FC, ReactNode } from "react";

interface ButtonInfo {
	link: string;
	text: string | ReactNode;
	backgroundColor?: string;
}

interface InfoBoxProps {
	heading: string;
	backgroundColor?: string;
	textColor?: string;
	buttonInfo: ButtonInfo;
	children: ReactNode;
}

const InfoBox: FC<InfoBoxProps> = ({
	heading,
	backgroundColor = "bg-gray-100",
	textColor = "text-gray-800",
	buttonInfo,
	children,
}) => (
	<div className={`rounded-lg ${backgroundColor} p-6 shadow-md`}>
		<h2 className={`text-2xl font-bold ${textColor}`}>{heading}</h2>

		<p className={`mt-2 mb-4 ${textColor}`}>{children}</p>

		<Link
			href={buttonInfo.link}
			className={`inline-block rounded-lg ${buttonInfo.backgroundColor} px-4 py-2 text-white hover:opacity-80`}
		>
			{buttonInfo.text}
		</Link>
	</div>
);

export default InfoBox;
