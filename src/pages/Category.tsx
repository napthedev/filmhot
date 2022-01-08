import CategoryResult from "../components/Category/CategoryResult";
import { FC } from "react";
import NavBar from "../components/NavBar";
import { getSearchConfig } from "../services/explore";
import { useParams } from "react-router-dom";
import useSWR from "swr";

const Category: FC = () => {
  const { id } = useParams() as { id: string };

  const { data: searchConfig } = useSWR(`search-config`, () =>
    getSearchConfig()
  );

  if (!searchConfig) return <div>Loading</div>;

  const categoryName = searchConfig[0].screeningItems
    .find((item) => item.id === 5)
    ?.items.find((item) => item.params === id)?.name;

  if (!categoryName) return <div>Error</div>;

  return (
    <div>
      <div className="mx-[7vw]">
        <NavBar />
        <h1 className="my-6 text-2xl">Category: {categoryName}</h1>
      </div>

      <CategoryResult id={id} categoryName={categoryName} />
    </div>
  );
};

export default Category;
