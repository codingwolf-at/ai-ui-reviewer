"use client";

type TabItem = {
    id: string;
    label: string;
};

type TabsProps = {
    tabs: TabItem[];
    activeTab: TabItem["id"];
    onChange: (id: TabItem["id"]) => void;
};

const Tabs = ({ tabs, activeTab, onChange }: TabsProps) => {
    if (!tabs.length) return null;

    return (
        <div className="flex gap-2 mb-4">
            {tabs.map(({ id, label }) => {
                const isActive = activeTab === id;
                return (
                    <button
                        key={id}
                        onClick={() => onChange(id)}
                        disabled={isActive}
                        className={`
                            px-3 py-1 rounded-md text-sm
                            transition-colors cursor-pointer
                            ${isActive
                                ? "bg-gray-800 text-white cursor-default"
                                : "text-gray-400 hover:text-white"
                            }
                        `}
                    >
                        {label}
                    </button>
                );
            })}
        </div>
    );
};

export default Tabs;
