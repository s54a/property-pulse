"use client";
import ClipLoader from "react-spinners/ClipLoader";

const override = {
	display: "block",
	margin: "100px auto",
};

interface LoadingPageProps {
	loading: boolean;
}

const Spinner = ({ loading }: LoadingPageProps) => {
	return (
		<div className="flex min-h-screen items-center justify-center">
			<ClipLoader
				color="#3b82f6"
				loading={loading}
				cssOverride={override}
				size={150}
				aria-label="Loading Spinner"
			/>
		</div>
	);
};

export default Spinner;
