import { CommentType, DetailType } from "../../shared/types";
import { FC, FormEvent, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  addDoc,
  collection,
  doc,
  limit,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";

import { calculateCreatedTime } from "../../shared/utils";
import { db } from "../../shared/firebase";
import { resizeImage } from "../../shared/constants";
import { useCollectionQuery } from "../../hooks/useCollectionQuery";
import { useStore } from "../../store";

interface CommentProps {
  data: DetailType;
  episodeIndex: number | undefined;
}

const Comment: FC<CommentProps> = ({ data, episodeIndex }) => {
  const currentUser = useStore((state) => state.currentUser);

  const location = useLocation();

  const [commentInputValue, setCommentInputValue] = useState("");
  const [commentLoading, setCommentLoading] = useState(false);

  const mediaType = typeof episodeIndex === "undefined" ? "movie" : "tv";

  const collectionPath = `${mediaType}-${data.id}`;

  const [commentLimit, setCommentLimit] = useState(10);

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (commentInputValue.trim()) {
      setCommentLoading(true);

      addDoc(collection(db, collectionPath), {
        user: currentUser,
        value: commentInputValue.trim(),
        reactions: {},
        createdAt: serverTimestamp(),
      }).finally(() => setCommentLoading(false));

      setCommentInputValue("");
    }
  };

  const addReaction = async (commentId: string, value: number) => {
    if (currentUser?.uid)
      updateDoc(doc(db, collectionPath, commentId), {
        [`reactions.${currentUser?.uid}`]: value,
      });
  };

  const {
    data: commentData,
    error,
    loading,
  } = useCollectionQuery(
    `${collectionPath}-${commentLimit}`,
    query(
      collection(db, collectionPath),
      orderBy("createdAt", "desc"),
      limit(commentLimit)
    )
  );

  return (
    <div>
      <h1 className="text-2xl mt-10">Comments</h1>

      {error ? (
        <div className="my-3">Cannot load comments</div>
      ) : (
        <>
          {currentUser ? (
            <form
              onSubmit={handleFormSubmit}
              className="relative border border-gray-600 rounded-full my-6"
            >
              <img
                className="w-[30px] h-[30px] rounded-full absolute top-1/2 -translate-y-1/2 left-[10px]"
                src={resizeImage(currentUser.photoURL, "30", "30")}
                alt=""
              />

              <input
                value={commentInputValue}
                onChange={(e) => setCommentInputValue(e.target.value)}
                onKeyDown={(e) => e.stopPropagation()}
                onKeyUp={(e) => e.stopPropagation()}
                onKeyPress={(e) => e.stopPropagation()}
                className="w-full h-12 bg-transparent outline-none text-white px-12"
                placeholder="Comment what you think..."
                type="text"
              />

              {commentLoading ? (
                <div className="absolute right-[14px] top-1/2 -translate-y-1/2">
                  <div className="w-[25px] h-[25px] rounded-full border-white border-t-transparent border-[3px] animate-spin"></div>
                </div>
              ) : (
                <button
                  className="absolute right-[14px] top-1/2 -translate-y-1/2"
                  type="submit"
                >
                  <i className="fas fa-paper-plane text-xl"></i>
                </button>
              )}
            </form>
          ) : (
            <div className="flex items-center gap-3 h-12 border border-gray-600 rounded-full my-6 px-3">
              <img
                className="w-[30px] h-[30px] rounded-full"
                src="/default-avatar.png"
                alt=""
              />
              <p>
                You need to{" "}
                <Link
                  className="text-primary"
                  to={`/sign-in?redirect=${encodeURIComponent(
                    location.pathname
                  )}`}
                >
                  Sign in
                </Link>{" "}
                to comment
              </p>
            </div>
          )}

          <div className="flex flex-col items-stretch gap-3">
            {commentData?.docs.map((doc) => {
              const docData = doc.data() as CommentType;
              return (
                <div key={doc.id} className="flex gap-2">
                  <img
                    className="w-[50px] h-[50px] rounded-full"
                    src={resizeImage(docData.user.photoURL, "50", "50")}
                    alt=""
                  />
                  <div className="flex flex-col items-stretch">
                    <div className="flex gap-2 items-end">
                      <p className="font-bold">{docData.user.displayName}</p>
                      <p className="text-gray-400 text-sm">
                        {docData?.createdAt?.seconds
                          ? calculateCreatedTime(
                              docData.createdAt.seconds * 1000
                            )
                          : "Just now"}
                      </p>
                    </div>
                    <p>{docData.value}</p>

                    <div className="flex gap-3 items-center">
                      <button
                        onClick={() =>
                          addReaction(
                            doc.id,
                            Object.entries(docData.reactions).find(
                              (item) => item[0] === currentUser?.uid
                            )?.[1] === 1
                              ? 0
                              : 1
                          )
                        }
                        className={`flex items-center gap-1 transition ${
                          !currentUser
                            ? "cursor-default"
                            : "hover:brightness-75"
                        } ${
                          Object.entries(docData.reactions).find(
                            (item) => item[0] === currentUser?.uid
                          )?.[1] === 1
                            ? "text-primary"
                            : ""
                        }`}
                      >
                        <i className="fas fa-thumbs-up"></i>
                        <span>
                          {
                            Object.values(docData.reactions).filter(
                              (item) => item === 1
                            ).length
                          }
                        </span>
                      </button>

                      <button
                        onClick={() =>
                          addReaction(
                            doc.id,
                            Object.entries(docData.reactions).find(
                              (item) => item[0] === currentUser?.uid
                            )?.[1] === 2
                              ? 0
                              : 2
                          )
                        }
                        className={`flex items-center gap-1 transition ${
                          !currentUser
                            ? "cursor-default"
                            : "hover:brightness-75"
                        } ${
                          Object.entries(docData.reactions).find(
                            (item) => item[0] === currentUser?.uid
                          )?.[1] === 2
                            ? "text-primary"
                            : ""
                        }`}
                      >
                        <i className="fas fa-thumbs-down"></i>
                        <span>
                          {
                            Object.values(docData.reactions).filter(
                              (item) => item === 2
                            ).length
                          }
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {!loading && !commentData?.size && (
            <p className="text-center text-gray-400">No one has commented</p>
          )}

          {!loading &&
            Boolean(commentData?.size) &&
            (commentData?.size as number) >= commentLimit && (
              <div className="flex justify-center mt-8">
                <button
                  onClick={() => setCommentLimit(commentLimit + 10)}
                  className="bg-primary text-white px-4 py-2 rounded hover:brightness-[115%] transition"
                >
                  Load more
                </button>
              </div>
            )}
        </>
      )}
    </div>
  );
};

export default Comment;
