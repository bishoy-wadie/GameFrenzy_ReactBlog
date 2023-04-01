import { createContext } from "react";

const PostContext = createContext([]);

// export function PostContext({ children }) {
//   const [listPosts, setListPosts] = useState([]);

//   return (
//     <PostContext.Provider value={{ lostPosts, setListPosts }}>
//       {children}
//     </PostContext.Provider>
//   );
// }

export default PostContext;
