import { useEffect, useState } from "react";

const useInfiniteScroll = ({ lastElement, posts }) => {
	const noOfPages = Math.ceil(posts?.length / 4);
	const [pageNum, setPageNum] = useState(0);
	const [loader, setLoader] = useState(false);

	useEffect(() => {
		const elementRef = lastElement.current;
		const handleObserver = (entries) => {
			if (pageNum !== noOfPages - 1) setLoader(true);
			const target = entries[0];
			if (
				target.isIntersecting &&
				(pageNum < noOfPages || (pageNum === 0 && noOfPages === 0))
			) {
				setTimeout(() => {
					setPageNum((prev) => prev + 1);
					setLoader(false);
				}, 1500);
			}
		};
		const observer = new IntersectionObserver(handleObserver);
		if (elementRef) {
			observer.observe(elementRef);
		}

		return () => {
			observer.unobserve(elementRef);
		};
	}, []);

	return { pageNum, loader };
};

export { useInfiniteScroll };
