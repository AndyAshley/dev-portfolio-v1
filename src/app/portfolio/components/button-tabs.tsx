type ButtonTabsProps = {
  tabs: string[];
  activeTab: string;
  handleClick: (tab: string) => void;
};

const ButtonTabs = ({ tabs, activeTab, handleClick }: ButtonTabsProps) => {
  return (
    <div className="mb-12">
      <div className="flex justify-center">
        <div className="inline-flex border border-gray-700 bg-steel-grey-800/75 rounded-md p-1 gap-3">
          {tabs.map((tab) => (
            <button
              onClick={() => handleClick(tab)}
              key={tab}
              className={`px-4 py-2 rounded-sm text-sm font-bold transition-colors cursor-pointer ${
                activeTab === tab
                  ? "bg-cyber-green-400 text-shadow-green-800"
                  : " text-gray-300 hover:bg-gray-700"
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
