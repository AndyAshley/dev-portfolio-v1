type ButtonTabsProps = {
  tabs: string[];
  activeTab: string;
  handleClick: (tab: string) => void;
};

const ButtonTabs = ({ tabs, activeTab, handleClick }: ButtonTabsProps) => {
  return (
    <div className="mb-12">
      <div className="flex justify-center">
        <div className="inline-flex border border-zinc-700/80 bg-zinc-900/20 backdrop-blur rounded-md p-1 gap-3">
          {tabs.map((tab) => (
            <button
              onClick={() => handleClick(tab)}
              key={tab}
              className={`px-4 py-2 rounded-sm text-sm font-bold transition-colors cursor-pointer ${
                activeTab === tab
                  ? "bg-ember-400 text-zinc-800"
                  : " text-zinc-200 hover:text-ember-500"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ButtonTabs;
