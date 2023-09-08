import React, { useMemo } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Box, IconButton } from "@mui/material";
import HtmlTagMapper from "../lib/HtmlTagMapper";
import CSSMapper from "../lib/CSSMapper";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

const getChild: any = (data: any, checkId: any) => {
  return data.filter((section: any) => section.parent_pdf_row_id === checkId);
};

const RenderSection = (props: any) => {
  const {
    data,
    expanded,
    children,
    parentId,
    handleClose,
    handleOpen,
    handleDragDrop,
  } = props;

  return (
    <>
      {parentId === -1 ? (
        <DragDropContext
          onDragEnd={handleDragDrop}
          onDragStart={(event: any) => {
            handleClose(`${event.draggableId}`);
          }}
        >
          <Droppable droppableId={`area${parentId}`} type="group">
            {(provided: any, snapshot: any) => (
              <CommonDropable
                props={props}
                provided={provided}
                snapshot={snapshot}
              />
            )}
          </Droppable>
        </DragDropContext>
      ) : (
        <Droppable droppableId={`area${parentId}`} type="group">
          {(provided: any, snapshot: any) => (
            <CommonDropable
              props={props}
              provided={provided}
              snapshot={snapshot}
            />
          )}
        </Droppable>
      )}
    </>
  );
};

const CommonDropable = (props: any) => {
  const { provided, snapshot } = props;
  const {
    data,
    expanded,
    children,
    parentId,
    handleClose,
    handleOpen,
    handleClick,
    handleDragDrop,
  } = props.props;

  return (
    <>
      <div
        {...provided.dropableProps}
        ref={provided.innerRef}
        style={{
          paddingBottom: "5px",
          backgroundColor: `${snapshot.isDraggingOver ? "#E7FFEC" : ""}`,
        }}
      >
        {children.map((row: any, index: any) => {
          return (
            <Draggable
              key={`section${row.pdf_row_id}`}
              draggableId={`section${row.pdf_row_id}`}
              index={index}
            >
              {(provided: any, snapshot: any) => (
                <div
                  {...provided.draggableProps}
                  ref={provided.innerRef}
                  id={`section${row.pdf_row_id}`}
                  className={`item_sec ${
                    !expanded.includes(`section${row.pdf_row_id}`) &&
                    getChild(data, row.pdf_row_id)?.length
                      ? "parent_sec"
                      : !expanded.includes(`section${row.parent_pdf_row_id}`)
                      ? "child_sec"
                      : ""
                  }`}
                  // style={{
                  //   backgroundColor: `${snapshot.isDragging ? "red" : ""}`,
                  // }}
                >
                  <HtmlTagMapper
                    row={row}
                    CSS={CSSMapper(row)}
                    isChild={getChild(data, row.pdf_row_id)?.length}
                    handleOpen={handleOpen}
                    handleClose={handleClose}
                    handleClick={handleClick}
                    expanded={expanded}
                    provided={provided}
                  />

                  {!expanded.includes(`section${row.pdf_row_id}`) ? (
                    <RenderSection
                      data={data}
                      expanded={expanded}
                      children={getChild(data, row.pdf_row_id)}
                      handleClose={handleClose}
                      handleOpen={handleOpen}
                      parentId={row.pdf_row_id}
                      handleClick={handleClick}
                      handleDragDrop={handleDragDrop}
                    />
                  ) : null}
                </div>
              )}
            </Draggable>
          );
        })}
        {provided.placeholder}
      </div>
    </>
  );
};

export default RenderSection;

// const RenderSection = (props: any) => {
//   const { data, expanded, parentId, handleClose, handleOpen } = props;

//   function handleDragDrop(result: any) {
//     console.log(result);
//   }
//   return (
//     <>
//       {parentId === -1 ? (
//         <DragDropContext onDragEnd={handleDragDrop}>
//           <CommonDropable props={props} />
//         </DragDropContext>
//       ) : (
//         <CommonDropable props={props} />

//       )}
//     </>
//   );
// };

// const CommonDropable = (props: any) => {
//   const { data, expanded, parentId, handleClose, handleOpen, handleClick } = props.props;
//   return (
//     <>
//       <Droppable droppableId={`area${parentId}`} type="group">
//         {(provided: any) => (
//           <div
//             {...provided.dropableProps}
//             ref={provided.innerRef}
//             style={{ paddingBottom: "5px" }}
//           >
//             {data.map((row: any, index: any) => {
//               return (
//                 <Draggable
//                   key={`section${row.pdf_row_id}`}
//                   draggableId={`section${row.pdf_row_id}`}
//                   index={index}
//                 >
//                   {(provided: any) => (
//                     <div
//                       {...provided.draggableProps}
//                       ref={provided.innerRef}

//                       id={`section${row.pdf_row_id}`}
//                       className={`item_sec ${!expanded.includes(`section${row.pdf_row_id}`) &&
//                         row.children?.length
//                         ? "parent_sec"
//                         : !expanded.includes(
//                           `section${row.parent_pdf_row_id}`
//                         )
//                           ? "child_sec"
//                           : ""
//                         }`}
//                     >
//                       <div
//                         style={{
//                           display: "flex",
//                           paddingLeft: `${row.children?.length ? 0 : 28}px`,
//                         }}
//                         onClick={handleClick}
//                       >
//                         <IconButton
//                           aria-label="delete"
//                           size="small"
//                           {...provided.dragHandleProps}
//                         >
//                           <DragIndicatorIcon fontSize="inherit"
//                             color="primary" />

//                         </IconButton>
//                         {row.children?.length ? (
//                           expanded.includes(`section${row.pdf_row_id}`) ? (
//                             <IconButton
//                               aria-label="delete"
//                               size="small"
//                               // sx={{width:"12px",height:"12px"}}
//                               onClick={() =>
//                                 handleClose(`section${row.pdf_row_id}`)
//                               }
//                             >
//                               <ChevronRightIcon
//                                 fontSize="inherit"
//                                 color="primary"
//                               />
//                             </IconButton>
//                           ) : (
//                             <IconButton
//                               aria-label="delete"
//                               size="small"
//                               // sx={{width:"12px",height:"12px"}}
//                               onClick={() =>
//                                 handleOpen(`section${row.pdf_row_id}`)
//                               }
//                             >
//                               <ExpandMoreIcon
//                                 fontSize="inherit"
//                                 color="primary"
//                               />
//                             </IconButton>
//                           )
//                         ) : null}

//                         <HtmlTagMapper
//                           Text={row.Text}
//                           innerHtml={null}
//                           CSS={CSSMapper(row)}
//                           tagName={row.Path[0]}
//                           dept={row?.heading_level_dept}
//                         />

//                       </div>

//                       {!expanded.includes(`section${row.pdf_row_id}`) ? (
//                         <RenderSection
//                           data={row.children}
//                           expanded={expanded}
//                           handleClose={handleClose}
//                           handleOpen={handleOpen}
//                           parentId={row.pdf_row_id}
//                         />
//                       ) : null}
//                     </div>
//                   )}
//                 </Draggable>
//               );
//             })}
//             {provided.placeholder}
//           </div>
//         )}
//       </Droppable>
//     </>
//   );
// };

// export default RenderSection;
