import React, { useState } from "react";

const TruncatedContent = ({ content, maxLength }) => {
  const [showFullContent, setShowFullContent] = useState(false);

  const truncatedContent = content.slice(0, maxLength);
  const remainingContent = content.slice(maxLength);

  const handleToggleContent = () => {
    setShowFullContent(!showFullContent);
  };

  return (
    <td>
      {showFullContent ? (
        <span>
          {content}{" "}
          <p onClick={handleToggleContent} style={{ cursor: "pointer" }} className="text-primary">See Less</p>
        </span>
      ) : (
        <span>
          {truncatedContent}
          {content.length > maxLength && (
            <div>
              <p onClick={handleToggleContent} style={{ cursor: "pointer" }} className="text-primary">...See More</p>
              <div style={{ display: "none" }}>{remainingContent}</div>
            </div>
          )}
        </span>
      )}
    </td>
  );
};

export default TruncatedContent;