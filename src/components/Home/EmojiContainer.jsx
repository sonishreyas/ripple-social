import { usePost } from "context";
import Picker, { SKIN_TONE_MEDIUM_DARK } from "emoji-picker-react";

const EmojiContainer = () => {
	const { postDispatch, postState } = usePost();
	const onEmojiClick = (event, emojiObject) => {
		postDispatch({
			type: "UPDATE_POST_TEXT",
			payload: {
				newPost: {
					postText: postState.newPost.postText + emojiObject.emoji,
				},
			},
		});
	};
	return (
		<div>
			<Picker
				onEmojiClick={onEmojiClick}
				disableAutoFocus={true}
				skinTone={SKIN_TONE_MEDIUM_DARK}
				groupNames={{ smileys_people: "PEOPLE" }}
			/>
		</div>
	);
};

export { EmojiContainer };
