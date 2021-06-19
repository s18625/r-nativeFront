import {configureStore} from '@reduxjs/toolkit';
import subjectSelection from "./redux_operations/subjectSelection";

const store = configureStore({
    reducer: {
        subjects:subjectSelection
    },
})
export default store;
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
