const InfoBox = ({
  heading,
  backgroundColor = "bg-gray-100",
  textColor = "text-gray-800",
  buttonInfo,
  children,
}: {
  heading: string;
  backgroundColor?: string;
  textColor?: string;
  buttonInfo: { link: string; text: string; backgroundColor: string };
  children: React.ReactNode;
}) => {
  return (
    <div className={`${backgroundColor} rounded-lg p-6 shadow-md`}>
      <h2 className={`${textColor} text-2xl font-bold`}>{heading}</h2>
      <p className={`${textColor} mb-4 mt-2`}>{children}</p>
      <a
        href={`${buttonInfo.link}`}
        className={`${buttonInfo.backgroundColor} inline-block rounded-lg px-4 py-2 text-white hover:opacity-80`}
      >
        {buttonInfo.text}
      </a>
    </div>
  );
};
export default InfoBox;
