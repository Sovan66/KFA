export default function PreHarvestCard({ capitalGains }) {
  const stNet =
    capitalGains.stcg.profits - capitalGains.stcg.losses;

  const ltNet =
    capitalGains.ltcg.profits - capitalGains.ltcg.losses;

  const realised = stNet + ltNet;

  const formatCurrency = (value) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(value);

  return (
    <div className="bg-zinc-900 text-white p-6 rounded-2xl">
      <h2 className="text-xl font-bold mb-6">
        Pre-Harvesting
      </h2>

      <div className="grid grid-cols-3 gap-y-4 text-sm">
        <div></div>
        <div className="font-semibold text-center">
          Short-term
        </div>
        <div className="font-semibold text-center">
          Long-term
        </div>

        <div>Profits</div>
        <div className="text-center">
          {formatCurrency(capitalGains.stcg.profits)}
        </div>
        <div className="text-center">
          {formatCurrency(capitalGains.ltcg.profits)}
        </div>

        <div>Losses</div>
        <div className="text-center">
          {formatCurrency(capitalGains.stcg.losses)}
        </div>
        <div className="text-center">
          {formatCurrency(capitalGains.ltcg.losses)}
        </div>

        <div className="font-semibold">
          Capital Gains
        </div>
        <div className="text-center font-semibold">
          {formatCurrency(stNet)}
        </div>
        <div className="text-center font-semibold">
          {formatCurrency(ltNet)}
        </div>
      </div>

    <div className="border-t border-zinc-700 mt-6 pt-4 flex items-center gap-3">
  <span className="text-sm font-bold text-white-400">
    Realised Capital Gains : 
  </span>

  <span className="text-xl font-bold text-white">
    {formatCurrency(realised)}
  </span>
</div>
    </div>
  );
}