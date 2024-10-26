const RenderButton = ({tabId, label, activeTab, setActiveTab}) => (
  <button
    className={`py-2 px-4 font-semibold rounded-full ${
      activeTab === tabId
        ? "bg-white text-[#6078DF]"
        : "bg-transparent text-[#AAA] border-[1px] border-solid border-[#4B5057]"
    }`}
    onClick={() => setActiveTab(tabId)}
  >
    {label}
  </button>
);

export default RenderButton;
