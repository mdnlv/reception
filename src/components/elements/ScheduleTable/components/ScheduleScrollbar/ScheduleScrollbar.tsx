import React, { useCallback, useState } from 'react';
import './styles.scss';

const ScheduleScrollbar: React.FC = (props) => {
  const SCROLL_ITEM_BASE = 40;
  const [hovering, setHovering] = useState(false);

  const handleMoveOn = useCallback(() => {
    setHovering(true);
  }, []);

  const handleMoveOut = useCallback(() => {
    setHovering(false);
  }, []);

  return (
    <div
      onMouseOver={handleMoveOn}
      onMouseOut={handleMoveOut}
      className={'scrollbar-container'}>
      <div className="scrollbar-item"></div>
    </div>
  );
};

export default ScheduleScrollbar;
