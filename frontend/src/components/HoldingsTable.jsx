import { useEffect, useMemo, useState } from "react";

export default function HoldingsTable({
  data = [],
  onSelectionChange,
}) {
  const [selectedCoins, setSelectedCoins] = useState({});

  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "asc",
  });

  const [showAll, setShowAll] = useState(false);

  const visibleData = useMemo(() => {
    return showAll ? data : data.slice(0, 4);
  }, [data, showAll]);

  useEffect(() => {
    const init = {};

    data.forEach((item) => {
      init[item.coin] = false;
    });

    setSelectedCoins(init);
  }, [data]);

  const allSelected =
    data.length > 0 &&
    data.every((item) => selectedCoins[item.coin]);

  const toggleRow = (coin) => {
    const updated = {
      ...selectedCoins,
      [coin]: !selectedCoins[coin],
    };

    setSelectedCoins(updated);

    onSelectionChange?.({
      selectedData: visibleData.filter(
        (item) => updated[item.coin]
      ),
    });
  };

  const toggleAll = () => {
    const value = !allSelected;

    const updated = {};

    data.forEach((item) => {
      updated[item.coin] = value;
    });

    setSelectedCoins(updated);

    onSelectionChange?.({
      selectedData: value ? visibleData : [],
    });
  };

  const handleSort = (key) => {
    setSortConfig((prev) => {
      if (prev.key === key) {
        return {
          key,
          direction:
            prev.direction === "asc"
              ? "desc"
              : "asc",
        };
      }

      return {
        key,
        direction: "asc",
      };
    });
  };

  const sortedData = useMemo(() => {
    const arr = [...visibleData];

    if (!sortConfig.key) return arr;

    return arr.sort((a, b) => {
      const getVal = (item) => {
        switch (sortConfig.key) {
          case "stcg":
            return item.stcg?.gain || 0;

          case "ltcg":
            return item.ltcg?.gain || 0;

          case "price":
            return item.currentPrice || 0;

          case "holding":
            return item.totalHolding || 0;

          default:
            return 0;
        }
      };

      const aVal = getVal(a);
      const bVal = getVal(b);

      return sortConfig.direction === "asc"
        ? aVal - bVal
        : bVal - aVal;
    });
  }, [visibleData, sortConfig]);

  const Cell = ({ top, bottom }) => (
    <div className="flex flex-col leading-tight">
      <span className="text-white font-medium">
        {top}
      </span>

      <span className="text-xs text-gray-400">
        {bottom}
      </span>
    </div>
  );

  return (
    <div className="bg-zinc-900 border border-zinc-700 rounded-2xl text-white overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-zinc-800 text-gray-200">
            <tr>
              <th className="p-3">
                <input
                  type="checkbox"
                  checked={allSelected}
                  onChange={toggleAll}
                />
              </th>

              <th className="p-3 text-left">
                Asset
              </th>

              <th className="p-3 text-left">
                Holdings / Avg Buy
              </th>

              <th
                className="p-3 cursor-pointer"
                onClick={() =>
                  handleSort("price")
                }
              >
                Current Price
                {sortConfig.key === "price" &&
                  (sortConfig.direction === "asc"
                    ? " ▲"
                    : " ▼")}
              </th>

              <th
                className="p-3 cursor-pointer"
                onClick={() =>
                  handleSort("stcg")
                }
              >
                Short Term 
                {sortConfig.key === "stcg" &&
                  (sortConfig.direction === "asc"
                    ? " ▲"
                    : " ▼")}
              </th>

              <th
                className="p-3 cursor-pointer"
                onClick={() =>
                  handleSort("ltcg")
                }
              >
                Long Term
                {sortConfig.key === "ltcg" &&
                  (sortConfig.direction === "asc"
                    ? " ▲"
                    : " ▼")}
              </th>

              <th className="p-3 text-left">
                Sell
              </th>
            </tr>
          </thead>

          <tbody>
            {sortedData.map((item) => (
              <tr
                key={`${item.coin}-${item.coinName}`}
                className="border-b border-zinc-800 hover:bg-zinc-800"
              >
                <td className="p-3 text-center">
                  <input
                    type="checkbox"
                    checked={
                      selectedCoins[item.coin] ||
                      false
                    }
                    onChange={() =>
                      toggleRow(item.coin)
                    }
                  />
                </td>

                <td className="p-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={item.logo}
                      alt={item.coin}
                      className="w-8 h-8 rounded-full"
                    />

                    <div>
                      <div className="font-medium">
                        {item.coin}
                      </div>

                      <div className="text-xs text-gray-400">
                        {item.coinName}
                      </div>
                    </div>
                  </div>
                </td>

                <td className="p-3">
                  <Cell
                    top={item.totalHolding}
                    bottom={`Avg: ${item.averageBuyPrice}`}
                  />
                </td>

                <td className="p-3">
                  {item.currentPrice}
                </td>

                <td className="p-3">
                  <Cell
                    top={item.stcg?.gain}
                    bottom={`Bal: ${
                      item.stcg?.balance ?? 0
                    }`}
                  />
                </td>

                <td className="p-3">
                  <Cell
                    top={item.ltcg?.gain}
                    bottom={`Bal: ${
                      item.ltcg?.balance ?? 0
                    }`}
                  />
                </td>

                <td className="p-3">
                  {selectedCoins[item.coin]
                    ? item.totalHolding
                    : "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {data.length > 4 && (
        <div className="p-3 text-center border-t border-zinc-800">
          <button
            onClick={() =>
              setShowAll(!showAll)
            }
            className="text-blue-400 hover:text-blue-300 font-medium"
          >
            {showAll
              ? "Show Less"
              : `View More (${data.length - 4})`}
          </button>
        </div>
      )}
    </div>
  );
}