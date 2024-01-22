import { createContext, useState } from "react";

export const postContext = createContext(null);

const Post = ({ children }) => {
  const [postDetails, setPostDetails] = useState(
    localStorage.getItem("postDetails")
      ? JSON.parse(localStorage.getItem("postDetails"))
      : {}
  );
  return (
    <postContext.Provider value={{ postDetails, setPostDetails }}>
      {children}
    </postContext.Provider>
  );
};

export default Post;
