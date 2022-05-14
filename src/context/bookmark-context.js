import { createContext, useContext, useEffect, useState } from "react";
import { useReducer } from "react";
import { bookmarkReducer } from "reducers";
import { getBookmarkDataHandler } from "backend";
import { useAuth } from "./auth-context";

const defaultBookmarkState = {
	itemsInBookmark: [],
};

const BookmarkContext = createContext({ defaultBookmarkState });

const BookmarkProvider = ({ children }) => {
	const [bookmarkState, bookmarkDispatch] = useReducer(
		bookmarkReducer,
		defaultBookmarkState
	);
	const { authState } = useAuth();
	useEffect(() => {
		authState?.uid?.length &&
			getBookmarkDataHandler(authState.uid, bookmarkDispatch);
	}, [authState]);
	return (
		<BookmarkContext.Provider
			value={{
				bookmarkState,
				bookmarkDispatch,
			}}
		>
			{children}
		</BookmarkContext.Provider>
	);
};

const useBookmark = () => useContext(BookmarkContext);
export { useBookmark, BookmarkProvider };
