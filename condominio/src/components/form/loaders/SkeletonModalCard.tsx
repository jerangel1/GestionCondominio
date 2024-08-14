import React from "react";

type SkeletonModalProps = {
    className?: string;
};

const SkeletonModalCard: React.FC<SkeletonModalProps> = ({ className }) => {
    return (
        <div className={`p-6 flex flex-col h-full animate-pulse ${className}`}>
            <div className="flex justify-between items-center mb-2">
                <h2 className="text-2xl flex items-center">
                    <span className="font-bold text-black bg-neutral-400/50 w-20 h-6 rounded-[30px]"></span>
                </h2>
                <div className="bg-neutral-400/50 w-20 h-6 rounded-[30px]"></div>
            </div>
            <div className="text-gray-500 mb-6">
                <span className="font-bold mb-4 text-black bg-neutral-400/50 w-full h-6 rounded-[30px]"></span>
            </div>
            <div className="bg-gray-200 rounded-[15px] shadow-xl p-10">
                <h3 className="text-xl font-bold mb-4 text-center bg-neutral-400/50 w-full h-6 rounded-[30px]"></h3>
                <div className="flex flex-col mt-6 mb-6">
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="flex justify-between items-center mb-4">
                            <h4 className="font-bold text-lg capitalize bg-neutral-400/50 w-1/2 h-6 rounded-[30px]"></h4>
                            <div className="flex items-center">
                                <p className="text-black bg-neutral-400/50 w-1/2 h-6 rounded-[30px]"></p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="mt-6 flex justify-end gap-4">
                <div className="bg-neutral-400/50 w-20 h-10 rounded-[30px] flex items-center justify-center cursor-pointer hover:bg-neutral-500/50 transition-colors duration-200 ease-in-out">
                </div>
                <div className="bg-neutral-400/50 w-20 h-10 rounded-[30px] flex items-center justify-center cursor-pointer hover:bg-neutral-500/50 transition-colors duration-200 ease-in-out">
                </div>
            </div>
        </div>
    );
};

export default SkeletonModalCard;