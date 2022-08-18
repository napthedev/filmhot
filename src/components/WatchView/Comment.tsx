import classNames from "classnames";
import { useAtom } from "jotai";
import Link from "next/link";
import { FC, FormEvent, useState } from "react";
import { FaPaperPlane, FaThumbsDown, FaThumbsUp } from "react-icons/fa";

import { useFetch } from "@/hooks/useFetch";
import { userAtom } from "@/store";
import { CommentItem } from "@/types/comment";
import { MovieDetail } from "@/types/movie";
import { supabase } from "@/utils/supabase";
import { calculateCreatedTime } from "@/utils/time";

import ImageFade from "../Shared/ImageFade";

interface CommentProps {
  data: MovieDetail;
  episodeIndex: number | undefined;
}

const Comment: FC<CommentProps> = ({ data, episodeIndex }) => {
  const [user] = useAtom(userAtom);

  const [commentInputValue, setCommentInputValue] = useState("");
  const [isCommenting, setIsCommenting] = useState(false);

  const movieSlug = `${typeof episodeIndex === "undefined" ? "movie" : "tv"}-${
    data.id
  }`;

  const {
    data: comments,
    error,
    loading,
    mutate,
  } = useFetch(movieSlug, async () => {
    const { data: comments, error } = await supabase
      .from("comments")
      .select("*,user(*),reactions(*)")
      .eq("movie_slug", movieSlug)
      .order("created_at", { ascending: false });

    if (error) {
      console.log(error);
      throw error;
    }

    return comments as CommentItem[];
  });

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (commentInputValue.trim() || !user?.id) {
      setIsCommenting(true);
      setCommentInputValue("");

      const { error } = await supabase.from("comments").insert({
        user: user?.id,
        content: commentInputValue.trim().slice(0, 1000),
        movie_slug: movieSlug,
      });

      console.log(error);

      await mutate();

      setIsCommenting(false);
    }
  };

  const addReaction = async (commentId: string, value: number) => {
    if (!user?.id) return;

    await supabase.from("reactions").upsert({
      user: user.id,
      comment: commentId,
      value,
    });

    mutate();
  };

  return (
    <div className="max-w-[92vw] md:max-w-[calc(88vw-300px)]">
      <h1 className="text-2xl mt-10">Comments</h1>

      {error ? (
        <div className="my-3">Cannot load comments</div>
      ) : (
        <>
          {user ? (
            <form
              onSubmit={handleFormSubmit}
              className="relative border border-gray-600 rounded-full my-6"
            >
              <div className="w-[30px] h-[30px] absolute top-1/2 -translate-y-1/2 left-[10px]">
                <ImageFade
                  src={user.user_metadata.avatar_url}
                  width={30}
                  height={30}
                  className="rounded-full"
                  alt=""
                />
              </div>

              <input
                value={commentInputValue}
                onChange={(e) => setCommentInputValue(e.target.value)}
                onKeyDown={(e) => e.stopPropagation()}
                onKeyUp={(e) => e.stopPropagation()}
                onKeyPress={(e) => e.stopPropagation()}
                className="w-full h-12 bg-transparent outline-none text-white px-12"
                placeholder="Comment what you think..."
                maxLength={1000}
                type="text"
              />

              {isCommenting ? (
                <div className="absolute right-[14px] top-1/2 -translate-y-1/2">
                  <div className="w-[25px] h-[25px] rounded-full border-white border-t-transparent border-[3px] animate-spin"></div>
                </div>
              ) : (
                <button
                  className="absolute right-[14px] top-1/2 -translate-y-1/2"
                  type="submit"
                >
                  <FaPaperPlane className="w-5 h-5" />
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
                <Link href="/sign-in">
                  <a className="text-primary">Sign in</a>
                </Link>{" "}
                to comment
              </p>
            </div>
          )}

          <div className="flex flex-col items-stretch gap-3 w-full">
            {comments?.map((comment) => (
              <div key={comment.id} className="flex gap-2 w-full">
                <ImageFade
                  className="rounded-full flex-shrink-0"
                  src={comment.user.photo_url}
                  width={50}
                  height={50}
                  alt=""
                />
                <div className="flex-1 min-w-0">
                  <div className="flex gap-2 items-end">
                    <p className="font-bold">{comment.user.display_name}</p>
                    <p className="text-gray-400 text-sm">
                      {calculateCreatedTime(comment.created_at)}
                    </p>
                  </div>
                  <p
                    style={{
                      wordWrap: "break-word",
                      overflowWrap: "break-word",
                    }}
                  >
                    {comment.content}
                  </p>

                  <div className="flex gap-3 items-center">
                    <button
                      onClick={() =>
                        addReaction(
                          comment.id,
                          comment.reactions.some(
                            (reaction) =>
                              reaction.user === user?.id && reaction.value === 1
                          )
                            ? 0
                            : 1
                        )
                      }
                      className={classNames(
                        "flex items-center gap-1 transition",
                        {
                          "cursor-default": !user,
                          "hover:brightness-75": user,
                          "text-primary": comment.reactions.some(
                            (reaction) =>
                              reaction.user === user?.id && reaction.value === 1
                          ),
                        }
                      )}
                    >
                      <FaThumbsUp className="fill-current" />
                      <span>
                        {
                          comment.reactions.filter(
                            (reaction) => reaction.value === 1
                          ).length
                        }
                      </span>
                    </button>

                    <button
                      onClick={() =>
                        addReaction(
                          comment.id,
                          comment.reactions.some(
                            (reaction) =>
                              reaction.user === user?.id && reaction.value === 2
                          )
                            ? 0
                            : 2
                        )
                      }
                      className={classNames(
                        "flex items-center gap-1 transition",
                        {
                          "cursor-default": !user,
                          "hover:brightness-75": user,
                          "text-primary": comment.reactions.some(
                            (reaction) =>
                              reaction.user === user?.id && reaction.value === 2
                          ),
                        }
                      )}
                    >
                      <FaThumbsDown className="fill-current" />
                      <span>
                        {
                          comment.reactions.filter(
                            (reaction) => reaction.value === 2
                          ).length
                        }
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {!loading && comments?.length === 0 && (
            <p className="text-center text-gray-400">No one has commented</p>
          )}
        </>
      )}
    </div>
  );
};

export default Comment;
