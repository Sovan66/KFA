import { useState } from "react";

import PreHarvestCard from "./components/PreHarvestCard";
import PostHarvestCard from "./components/PostHarvestCard";
import HoldingsTable from "./components/HoldingsTable";
import { holdingsData } from "./utils/calculateHoldings";

const capitalGains = {
  stcg: {
    profits: 70200.88,
    losses: 1548.53,
  },
  ltcg: {
    profits: 5020,
    losses: 3050,
  },
};

function App() {
  const [selectedHoldings, setSelectedHoldings] = useState([]);
  const [showNotes, setShowNotes] = useState(false);
  const [showHowItWorks, setShowHowItWorks] = useState(false);
  

  return (
    <div className="min-h-screen p-6 bg-black text-white">

      {/* Header */}
   <div className="relative mb-4">
  <div className="flex items-center gap-3">
    <h1 className="text-3xl font-bold">
      Tax Optimization
    </h1>

    <button
      onClick={() => setShowHowItWorks(!showHowItWorks)}
      className="text-blue-500 underline underline-offset-4 hover:text-blue-400 font-medium"
    >
      How it works?
    </button>
  </div>

  {showHowItWorks && (
    <div className="absolute top-10 left-56 z-50 w-80 bg-zinc-900 border border-zinc-700 rounded-xl p-4 shadow-lg">
      <h3 className="font-semibold mb-2">
        Tax Harvesting Tips
      </h3>

      <ul className="list-disc pl-5 space-y-2 text-gray-300 text-sm">
        <li>Harvest loss-making assets to reduce taxable gains.</li>
        <li>Review short-term and long-term gains before selling.</li>
        <li>Offset gains with losses wherever regulations allow.</li>
        <li>Avoid making decisions based only on tax benefits.</li>
        <li>Consult a tax advisor for personalized guidance.</li>
        
      </ul>
    </div>
  )}
</div>

      
      <div className="bg-blue-900 rounded-xl p-4 mb-8">
        <button
          onClick={() => setShowNotes(!showNotes)}
          className="flex items-center gap-3 font-semibold w-full text-left"
        >
          <div className="w-5 h-5 rounded-full bg-white text-blue-900 flex items-center justify-center text-xs font-bold">
            i
          </div>

          <span>Important Notes & Disclaimers</span>
        </button>

        {showNotes && (
          <div className="mt-4 text-sm text-blue-100 space-y-2">
            <p>
              Tax harvesting estimates are based on available transaction data.
            </p>

            <p>
              Actual tax liability may differ after final assessment.
            </p>

            <p>
              Capital gains depend on holdings selected for harvesting.
            </p>

            <p>
              Consult a tax advisor before making investment decisions.
            </p>

            <p>
              Tax regulations may change based on applicable laws.
            </p>
          </div>
        )}
      </div>

      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <PreHarvestCard capitalGains={capitalGains} />

        <PostHarvestCard
          capitalGains={capitalGains}
          selectedHoldings={selectedHoldings}
        />
      </div>

      
      <HoldingsTable
        data={holdingsData}
        onSelectionChange={({ selectedData }) => {
          setSelectedHoldings(selectedData);
        }}
      />
    </div>
  );
}

export default App;