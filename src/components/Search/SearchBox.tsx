import classNames from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC, FormEvent, useEffect, useRef, useState } from "react";
import { FaSearch } from "react-icons/fa";

import { htmlToText } from "@/utils/text";
import { trpc } from "@/utils/trpc";

interface SearchBoxProps {
  autoFocus?: boolean;
}

const SearchBox: FC<SearchBoxProps> = ({ autoFocus }) => {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const timeoutRef = useRef<any>(null);

  const router = useRouter();

  const { mutateAsync: fetchKeywords } = trpc.useMutation("search.keywords");

  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    setSuggestions([]);

    if (!inputValue.trim()) return;

    timeoutRef.current = setTimeout(async () => {
      const data = await fetchKeywords({ keyword: inputValue.trim() });

      setSuggestions(data.map((item) => htmlToText(item)));
    }, 500);
  }, [inputValue, fetchKeywords]);

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (inputValue.trim()) {
      router.push({
        pathname: "/search",
        query: {
          q: inputValue.trim(),
        },
      });
    }
  };

  return (
    <div className="relative group w-full">
      <form onSubmit={handleFormSubmit} className="relative">
        <input
          value={inputValue}
          onKeyDown={(e) => e.stopPropagation()}
          onKeyUp={(e) => e.stopPropagation()}
          onKeyPress={(e) => e.stopPropagation()}
          onChange={(e) => setInputValue(e.target.value)}
          className="bg-transparent outline-none border border-gray-600 w-full rounded-full py-2 pl-4 pr-8"
          type="text"
          placeholder="Search..."
          autoFocus={autoFocus}
        />
        <button className="absolute right-2 top-1/2 -translate-y-1/2">
          <FaSearch className="w-5 h-5" />
        </button>
      </form>

      {suggestions.length > 0 && (
        <div className="absolute z-10 top-full left-0 w-full bg-dark-lighten rounded overflow-x-hidden overflow-y-auto max-h-[200px] flex-col items-stretch hidden group-focus-within:flex">
          {suggestions.map((suggestion, index) => (
            <Link
              key={index}
              href={{ pathname: "/search", query: { q: suggestion } }}
            >
              <a
                className={classNames("text-left p-2 w-full", {
                  "border-b border-gray-500": index !== suggestions.length - 1,
                })}
              >
                {suggestion}
              </a>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBox;
