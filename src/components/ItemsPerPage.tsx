import React from 'react';

const ItemsPerPage = ({
  choice,
  setChoice
}: {
  choice?: number;
  setChoice: (value: number) => void;
}) => {
  return (
    <>
      <div className="flex items-center gap-1 whitespace-nowrap">
        <span className="text-sm min-w-[120px]">Items per page</span>
        <select
          value={choice}
          onChange={e => setChoice(Number(e.target.value))}
          className="!w-[60px] min-h-[50px] border border-solid border-[#E5E5E5] rounded"
        >
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={30}>30</option>
          <option value={50}>50</option>
        </select>
      </div>
    </>
  );
};

export default ItemsPerPage;
