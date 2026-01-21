"use client";

type TabItem = {
    id: string;
    label: string;
};

type TabsProps = {
    tabs: TabItem[];
    activeTab: TabItem["id"];
    onChange: (id: TabItem["id"]) => void;
    disabled: boolean
};

const Tabs = ({ tabs, activeTab, onChange, disabled }: TabsProps) => {
    if (!tabs.length) return null;

    return (
        <div className="flex gap-4 border-b border-white/10">
            {tabs.map(({ id, label }) => {
                const isActive = activeTab === id;
                return (
                    <button
                        key={id}
                        onClick={() => onChange(id)}
                        disabled={isActive || disabled}
                        className={`relative pb-2 px-2 text-sm font-medium transition-colors cursor-pointer disabled:cursor-not-allowed
                            ${isActive
                                ? "text-white"
                                : "text-gray-400 hover:text-gray-200"
                            }
                        `}
                    >
                        {label}
                        {activeTab === id && (
                            <span className="absolute left-0 bottom-0 w-full h-0.5 bg-white rounded-full" />
                        )}

                    </button>
                );
            })}
        </div>
    );
};

export default Tabs;
