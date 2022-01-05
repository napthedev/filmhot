import { FC, useEffect, useRef, useState } from "react";

import { Link } from "react-router-dom";
import { searchKeywords } from "../services/search";

const Search: FC = () => {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const timeoutRef = useRef<any>(null);

  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    setSuggestions([]);

    if (!inputValue.trim()) return;

    timeoutRef.current = setTimeout(async () => {
      const data = await searchKeywords(inputValue.trim());

      setSuggestions(data);
    }, 500);
  }, [inputValue]);

  return (
    <div className="relative group">
      <form className="relative">
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="bg-transparent outline-none border border-gray-600 w-full rounded-full py-2 pl-4 pr-8"
          type="text"
          placeholder="Search..."
        />
        <button className="absolute right-2 top-1/2 -translate-y-1/2">
          <i className="fas fa-search text-xl"></i>
        </button>
      </form>

      {suggestions.length > 0 && (
        <div className="absolute z-10 top-full left-0 w-full bg-dark-lighten rounded overflow-x-hidden overflow-y-auto max-h-[200px] flex-col items-stretch hidden group-focus-within:flex">
          {suggestions.map((suggestion, index) => (
            <Link to="/">
              <button
                className={`text-left p-2 w-full ${
                  index !== suggestions.length - 1
                    ? "border-b border-gray-500"
                    : ""
                }`}
                dangerouslySetInnerHTML={{ __html: suggestion }}
              ></button>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
