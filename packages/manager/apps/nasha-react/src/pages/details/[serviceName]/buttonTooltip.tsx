import React, { useState, useRef, useEffect } from 'react';
import { OsdsIcon } from '@ovhcloud/ods-stencil/components/react/';
import { OdsIconName, OdsIconSize } from '@ovhcloud/ods-core';
import { OdsThemeColorIntent } from '@ovhcloud/ods-theming';

function ButtonTooltip(props: any) {
  const { tooltipContent } = props;
  const [showTooltip, setShowTooltip] = useState(false);
  const tooltipRef = useRef(null);

  useEffect(() => {
    const handleDocumentClick = (event: any) => {
      if (tooltipRef.current && !tooltipRef.current.contains(event.target)) {
        setShowTooltip(false);
      }
    };

    document.addEventListener('click', handleDocumentClick);

    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, []);

  const handleTooltipToggle = (event: any) => {
    event.stopPropagation();
    setShowTooltip(!showTooltip);
  };

  return (
    <button className="buttonTile" onClick={handleTooltipToggle}>
      <OsdsIcon
        name={OdsIconName.ELLIPSIS}
        size={OdsIconSize.xxs}
        color={OdsThemeColorIntent.primary}
      />

      {showTooltip && (
        <div ref={tooltipRef} className="tooltip">
          <div className="tooltiptext">
            {tooltipContent.map((item: any, index: any) => (
              <div key={index}>{item.label}</div>
            ))}
          </div>
        </div>
      )}
    </button>
  );
}

export default ButtonTooltip;
