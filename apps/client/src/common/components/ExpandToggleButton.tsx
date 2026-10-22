import circle_down from '@/assets/icons/expand_circle_down_white.svg';
import circle_up from '@/assets/icons/expand_circle_up_white.svg';

import { useState } from 'react';

type ExpandToggleButtonProps = {
  onClick: () => void;
  initExpanded?: boolean;
};
const ExpandToggleButton = ({
  onClick,
  initExpanded = false,
}: ExpandToggleButtonProps) => {
  const [isExpanded, setIsExpanded] = useState(initExpanded);

  const toggle = () => {
    setIsExpanded((prev) => !prev);
  };

  const handleClick = () => {
    toggle();
    onClick();
  };

  return (
    <button
      className="button-image rounded-full"
      type="button"
      onClick={handleClick}
      aria-label="Toggle board details"
    >
      {!isExpanded && <img src={circle_down} aria-hidden={true} />}
      {isExpanded && <img src={circle_up} aria-hidden={true} />}
    </button>
  );
};

export { ExpandToggleButton };
