import {
  Client,
  Databases,
  Account,
  AppwriteException,
  ID,
  Query,
  Storage,
} from "appwrite";
import { createContext, useContext } from "react";
import { GlobalProviderProps } from "types/GlobalProvider";
import * as sdk from "node-appwrite";

// eslint-disable-next-line react-refresh/only-export-components
export const client = new Client();
client
  .setEndpoint(import.meta.env.VITE_APPWRITE_API)
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

// eslint-disable-next-line react-refresh/only-export-components
export const databases = new Databases(client);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const GlobalContext = createContext<any>(null);

// eslint-disable-next-line react-refresh/only-export-components
export const useGlobalContext = () => useContext(GlobalContext);

export const GlobalProvider = ({ children }: GlobalProviderProps) => {
  const getUserData = async () => {
    try {
      const account = new Account(client);
      return await account.get();
    } catch (error) {
      const appwriteError = error as AppwriteException;
      throw new Error(appwriteError.message);
    }
  };

  const loginWithGoogle = async () => {
    const account = new Account(client);
    account.createOAuth2Session("google");
  };

  const register = async (email: string, password: string, name: string) => {
    try {
      const account = new Account(client);
      return await account.create(ID.unique(), email, password, name);
    } catch (error) {
      const appwriteError = error as AppwriteException;
      throw new Error(appwriteError.message);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const account = new Account(client);
      return await account.createEmailSession(email, password);
    } catch (error) {
      const appwriteError = error as AppwriteException;
      throw new Error(appwriteError.message);
    }
  };

  const logout = async () => {
    try {
      const account = new Account(client);
      await account.deleteSession("current");
    } catch (error) {
      const appwriteError = error as AppwriteException;
      throw new Error(appwriteError.message);
    }
  };

  const checkUserIdValidity = async (userId: string): Promise<boolean> => {
    try {
      const client = new sdk.Client();
      client
        .setEndpoint(import.meta.env.VITE_APPWRITE_API)
        .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID)
        .setKey(import.meta.env.VITE_APPWRITE_API_READUSERS);

      const users = new sdk.Users(client);

      await users.get(userId);

      return true;
    } catch (error) {
      // User ID is invalid
      return false;
    }
  };

  const getUserDocument = async (docId: string) => {
    try {
      return await databases.getDocument(
        import.meta.env.VITE_APPWRITE_DB_ID,
        import.meta.env.VITE_APPWRITE_USERDATA_COLLECTION_ID,
        docId
      );
    } catch (error) {
      const appwriteError = error as AppwriteException;
      throw new Error(appwriteError.message);
    }
  };

  const getUserPostsImpressions = async (userId: string) => {
    try {
      const { documents } = await databases.listDocuments(
        import.meta.env.VITE_APPWRITE_DB_ID,
        import.meta.env.VITE_APPWRITE_USERFEED_COLLECTION_ID,
        [Query.equal("userId", [userId])]
      );
      const userPostsImpressions = documents.reduce(
        (totalImpressions, { Likes }) => totalImpressions + Likes,
        0
      );
      return userPostsImpressions;
    } catch (error) {
      const appwriteError = error as AppwriteException;
      throw new Error(appwriteError.message);
    }
  };

  // this is using sdk version of the client: 'node-appwrite'
  const searchUsersByName = async (searchName: string) => {
    try {
      const client = new sdk.Client();

      const users = new sdk.Users(client);

      client
        .setEndpoint(import.meta.env.VITE_APPWRITE_API)
        .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID)
        .setKey(import.meta.env.VITE_APPWRITE_API_READUSERS);

      // Best to use is probably 'startsWith' but is giving me an error.
      const searchResult = await users.list([Query.equal("name", searchName)]);
      return searchResult;
    } catch (error) {
      const appwriteError = error as AppwriteException;
      throw new Error(appwriteError.message);
    }
  };

  const getUserProfileImg = async (
    profileImgId = "",
    setPreviewUrl: React.Dispatch<React.SetStateAction<string>>
  ) => {
    try {
      const storage = new Storage(client);
      const result = storage.getFilePreview(
        import.meta.env.VITE_APPWRITE_USERIMAGE_BUCKET_ID,
        profileImgId
      );
      setPreviewUrl(result.href);
    } catch (error) {
      const appwriteError = error as AppwriteException;
      throw new Error(appwriteError.message);
    }
  };

  const handleAddPost = async (
    postText: string,
    userId: string,
    likes: 10,
    comments: []
  ): Promise<string> => {
    try {
      const { $id: postId } = await databases.createDocument(
        import.meta.env.VITE_APPWRITE_DB_ID,
        import.meta.env.VITE_APPWRITE_USERFEED_COLLECTION_ID,
        ID.unique(),
        {
          Content: postText,
          Likes: likes,
          Comments: comments,
          userId: userId,
        }
      );
      return postId;
    } catch (error) {
      const appwriteError = error as AppwriteException;
      throw new Error(appwriteError.message);
    }
  };

  const listUserPost = async (userId: string) => {
    try {
      const response = await databases.listDocuments(
        import.meta.env.VITE_APPWRITE_DB_ID,
        import.meta.env.VITE_APPWRITE_USERFEED_COLLECTION_ID,
        [Query.equal("userId", [userId])]
      );
      return response;
    } catch (error) {
      const appwriteError = error as AppwriteException;
      throw new Error(appwriteError.message);
    }
  };

  const updatePostLike = async (postId: string, isLiked: boolean) => {
    try {
      const { Likes: prevPostLike } = await databases.getDocument(
        import.meta.env.VITE_APPWRITE_DB_ID,
        import.meta.env.VITE_APPWRITE_USERFEED_COLLECTION_ID,
        postId
      );
      console.log(prevPostLike);

      const updatedLike = isLiked ? prevPostLike + 1 : prevPostLike - 1;

      const updateResponse = await databases.updateDocument(
        import.meta.env.VITE_APPWRITE_DB_ID,
        import.meta.env.VITE_APPWRITE_USERFEED_COLLECTION_ID,
        postId,
        {
          Likes: updatedLike,
        }
      );

      console.log(updateResponse);
    } catch (error) {
      const appwriteError = error as AppwriteException;
      throw new Error(appwriteError.message);
    }
  };

  const updatePostComment = async (postId: string, comment: string) => {
    try {
      const { Comments: prevPostComments } = await databases.getDocument(
        import.meta.env.VITE_APPWRITE_DB_ID,
        import.meta.env.VITE_APPWRITE_USERFEED_COLLECTION_ID,
        postId
      );

      console.log(prevPostComments);

      const updateResponse = await databases.updateDocument(
        import.meta.env.VITE_APPWRITE_DB_ID,
        import.meta.env.VITE_APPWRITE_USERFEED_COLLECTION_ID,
        postId,
        {
          Comments: [...prevPostComments, comment],
        }
      );

      console.log(updateResponse);
    } catch (error) {
      const appwriteError = error as AppwriteException;
      throw new Error(appwriteError.message);
    }
  };

  const handleImageSubmit = async (file: File) => {
    try {
      const storage = new Storage(client);
      const { $id: fileId } = await storage.createFile(
        import.meta.env.VITE_APPWRITE_USERIMAGE_BUCKET_ID,
        ID.unique(),
        file
      );
      return fileId;
    } catch (error) {
      const appwriteError = error as AppwriteException;
      throw new Error(appwriteError.message);
    }
  };

  // this is used to fetch the docId of the user, which is created when the user first registers
  const getDocId = async (userId: string): Promise<string | null> => {
    try {
      const response = await databases.listDocuments(
        import.meta.env.VITE_APPWRITE_DB_ID,
        import.meta.env.VITE_APPWRITE_USERDATA_COLLECTION_ID,
        [Query.equal("userId", [userId])]
      );

      if (response.documents && response.documents.length > 0) {
        const docId = response.documents[0].$id;
        return docId;
      } else {
        return null;
      }
    } catch (error) {
      const appwriteError = error as AppwriteException;
      throw new Error(appwriteError.message);
    }
  };

  const contextProps = {
    login,
    logout,
    register,
    getDocId,
    getUserData,
    listUserPost,
    handleAddPost,
    updatePostLike,
    updatePostComment,
    getUserDocument,
    loginWithGoogle,
    searchUsersByName,
    getUserProfileImg,
    handleImageSubmit,
    checkUserIdValidity,
    getUserPostsImpressions,
  };

  return (
    <GlobalContext.Provider value={contextProps}>
      {children}
    </GlobalContext.Provider>
  );
};
