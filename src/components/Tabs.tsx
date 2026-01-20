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
                            bg-(--surface-bg) rounded-md px-3 py-1.5 cursor-pointer
                            ${isActive
                                ? "text-white shadow-sm"
                                : "text-gray-400 hover:text-gray-200 hover:bg-white/5"
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
