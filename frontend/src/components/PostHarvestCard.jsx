const formatCurrency = (value) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(value);

export default function PostHarvestCard({
  capitalGains,
  selectedHoldings,
}) {
  
  const preStNet =
    capitalGains.stcg.profits - capitalGains.stcg.losses;

  const preLtNet =
    capitalGains.ltcg.profits - capitalGains.ltcg.losses;

  const preRealisedCapitalGains =
    preStNet + preLtNet;

  
  const after = {
    stcg: {
      profits: capitalGains.stcg.profits,
      losses: capitalGains.stcg.losses,
    },
    ltcg: {
      profits: capitalGains.ltcg.profits,
      losses: capitalGains.ltcg.losses,
    },
  };

  
  selectedHoldings.forEach((holding) => {
    const stGain = holding.stcg.gain;
    const ltGain = holding.ltcg.gain;

    if (stGain > 0) {
      after.stcg.profits += stGain;
    } else if (stGain < 0) {
      after.stcg.losses += Math.abs(stGain);
    }

    if (ltGain > 0) {
      after.ltcg.profits += ltGain;
    } else if (ltGain < 0) {
      after.ltcg.losses += Math.abs(ltGain);
    }
  });

  
  const stNet =
    after.stcg.profits - after.stcg.losses;

  const ltNet =
    after.ltcg.profits - after.ltcg.losses;

  const effectiveCapitalGains =
    stNet + ltNet;

  
  const savings =
    preRealisedCapitalGains - effectiveCapitalGains;

  const showSavings =
    preRealisedCapitalGains > effectiveCapitalGains;

  return (
    <div className="bg-blue-600 text-white rounded-2xl p-6">
      <h2 className="text-xl font-bold mb-6">
        After Harvesting
      </h2>

      <div className="grid grid-cols-3 gap-y-4">
        <div></div>

        <div className="text-center font-semibold">
          Short-term
        </div>

        <div className="text-center font-semibold">
          Long-term
        </div>

        <div>Profits</div>

        <div className="text-center">
          {formatCurrency(after.stcg.profits)}
        </div>

        <div className="text-center">
          {formatCurrency(after.ltcg.profits)}
        </div>

        <div>Losses</div>

        <div className="text-center">
          {formatCurrency(after.stcg.losses)}
        </div>

        <div className="text-center">
          {formatCurrency(after.ltcg.losses)}
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

      <div className="border-t border-blue-400 mt-6 pt-4">
        <div className="flex items-center gap-2">
          <p className="text-sm opacity-80">
            Effective Capital Gains :
          </p>

          <p className="text-2xl font-bold">
            {formatCurrency(effectiveCapitalGains)}
          </p>
        </div>

        
        {showSavings && (
          <p className="mt-3 text-green-200 font-semibold">
            You're going to save {formatCurrency(savings)}
          </p>
        )}
      </div>
    </div>
  );
}