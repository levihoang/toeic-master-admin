import React from 'react';

const TitlePage = ({
  icon,
  name,
  className,
}: {
  icon: () => JSX.Element;
  name: string;
  isBack?: boolean;
  className?: string;
}) => {
  return (
    <>
      <div className={`flex`}>
        <div className="flex items-center justify-center space-x-2">
          <span className="text-xl xl:text-2xl">{React.createElement(icon)}</span>
          <span
            className={`font-semibold text-xl xl:text-2xl text-gray-33 self-center ${className}`}>
            {name}
          </span>
        </div>
      </div>
    </>
  );
};

export default TitlePage;
