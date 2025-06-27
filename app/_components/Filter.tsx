"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

const filterValues = ["any", "2", "4", "6", "8", "10"];

type FilterButtonProps = {
  value: string;
  onClick: (arg0: string) => void
  active: boolean
}

const FilterButton = ({value, onClick, active }: FilterButtonProps) => {
  return (
    <button
      className={`px-5 py-2 border-l-[1px] border-primary-800
        ${active ? "bg-primary-700" : "hover:bg-primary-700"}`}
      onClick={() => {
        onClick(value)
      }}
    >
      {value === "any" ? "All Cabins" : `${value} guests`}
    </button>
  );
};

function Filter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const activeFilter = searchParams.get("capacity") ?? "any";

  const handleFilter = (filter: string) => {
    // 1. Build the params
    const params = new URLSearchParams(searchParams);
    params.set("capacity", filter);
    // 2. Add params to URL
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="border border-primary-800 flex">
      {filterValues.map((value) => (
        <FilterButton
          key={value}
          value={value}
          onClick={handleFilter}
          active={value === activeFilter}
        />
      ))}
    </div>
  );
}

export default Filter;
