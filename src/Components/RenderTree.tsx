import React, { useMemo } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { IconButton } from "@mui/material";

const RenderTree = (props: any) => {
  const { data, parentSectionId, expanded, handleClose, handleOpen } = props;
  const getChild: any = (data: any, checkId: any) => {
    return data.filter((section: any) => section.parent_toc_id === checkId);
  };
  const children = useMemo(
    () => getChild(data, parentSectionId),
    [parentSectionId]
  );

  function scrollToElement(id:any) {
    const element = document.getElementById(`scroll${id}`); 
    console.log(element,`scroll${id}`);
    
    if (element) {
      element.scrollIntoView({ behavior: "smooth" }); // This scrolls to the element smoothly
    }
  }

  return (
    <div className={`level-${props.level ? props.level : 0}`}>
      {children.map((child: any) => (
        <div
          key={child.toc_id}
          id={`section${child.toc_id}`}
          className={`item
           ${
             expanded.includes(`section${child.toc_id}`) &&
             getChild(data, child.toc_id).length
               ? "parent"
               : expanded.includes(`section${parentSectionId}`)
               ? "child"
               : ""
           }`}
          onClick={() => (child.map ? scrollToElement(child.map) : null)}

        >
          {getChild(data, child.toc_id).length ? (
            expanded.includes(`section${child.toc_id}`) ? (
              <IconButton
                aria-label="delete"
                size="small"
                onClick={() => handleClose(`section${child.toc_id}`)}
              >
                <ExpandMoreIcon fontSize="inherit" color="info" />
              </IconButton>
            ) : (
              <IconButton
                aria-label="delete"
                size="small"
                onClick={() => handleOpen(`section${child.toc_id}`)}
              >
                <ChevronRightIcon fontSize="inherit" color="info" />
              </IconButton>
            )
          ) : null}

          {child.content}
          {expanded.includes(`section${child.toc_id}`) ? (
            <RenderTree
              data={data}
              parentSectionId={child.toc_id}
              expanded={expanded}
              handleClose={handleClose}
              handleOpen={handleOpen}
              level={child.level}
            />
          ) : null}
        </div>
      ))}
    </div>
  );
};

export default RenderTree;
