import { usePost } from "context";
import { useState } from "react";

const FilesContainer = () => {
	const { postState } = usePost();
	const [slideIndex, setSlideIndex] = useState(1);

	const nextSlide = () => {
		if (slideIndex >= postState?.newPost?.fileUrls?.length) {
			setSlideIndex(1);
		} else {
			setSlideIndex(slideIndex + 1);
		}
	};
	const prevSlide = () => {
		if (slideIndex === 1) {
			setSlideIndex(postState?.newPost?.fileUrls?.length);
		} else {
			setSlideIndex(slideIndex - 1);
		}
	};
	const moveIndex = (index) => setSlideIndex(index);
	// useEffect(() => {
	// 	const moveSlide = () => {
	// 		if (slideIndex >= sliderData.length) {
	// 			setSlideIndex(1);
	// 		} else {
	// 			setSlideIndex(slideIndex + 1);
	// 		}
	// 	};
	// 	clearTimeout();
	// 	setTimeout(moveSlide, 15000);
	// }, [slideIndex]);
	return (
		<>
			<article className="post-image-container flex-row justify-content-center align-center">
				{postState?.newPost?.fileUrls?.length &&
					postState?.newPost?.fileUrls?.map(({ type, url }, index) => {
						if (type === "images" || type === "gifs") {
							return (
								<img
									src={url}
									className={`banner ${
										slideIndex === index + 1 ? "slide-active" : "slide-inactive"
									}`}
									alt="post"
									key={index}
								/>
							);
						} else if (type === "videos") {
							return (
								<video
									controls
									className={`banner ${
										slideIndex === index + 1 ? "slide-active" : "slide-inactive"
									}`}
									alt="post"
								>
									<source src={url} type="video/*" />
								</video>
							);
						} else if (type === "pdfs") {
							return (
								<iframe
									src={url}
									className={`pdf-banner ${
										slideIndex === index + 1 ? "slide-active" : "slide-inactive"
									}`}
									alt="post"
								/>
							);
						}
					})}
			</article>
			<div className="flex-row justify-content-center align-center flex-gap-half banner-dots-container">
				{Array.from({ length: postState?.newPost?.fileUrls?.length }).map(
					(item, index) => (
						<i
							key={index}
							onClick={() => moveIndex(index + 1)}
							className={`fa-solid fa-circle banner-dot ${
								slideIndex === index + 1 ? "active-dot" : "dot"
							}`}
						></i>
					)
				)}
			</div>
			<div className="flex-row justify-content-space-between align-center banner-nav-btn-container w-100 px-10">
				<i className="fa-solid fa-circle-chevron-left" onClick={prevSlide}></i>
				<i className="fa-solid fa-circle-chevron-right" onClick={nextSlide}></i>
			</div>
		</>
	);
};
export { FilesContainer };
