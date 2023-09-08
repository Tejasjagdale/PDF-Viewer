import React, { useState } from "react";
import * as XLSX from "xlsx";
import Stack from "../hooks/newStack";

const PDFRestructure = (data: any) => {
  let temp: any = [];
  let final: any = [];
  let cur_page = 0;
  data.map((row: any) => {
    if (cur_page === row.Page) {
      temp.push(row);
    } else {
      final.push(temp);
      cur_page = row.Page;
      temp = [];
    }
  });

  console.log(final);
  return final;
};

export const FilterNull = (data: any) => {
  let final: any = [...data];
  final = final.filter((row: any) => row.Text !== null);
  return final;
};

export const TagsHierarchy = (data: any) => {
  let final: any = [...data];
  final = final.map((row: any) => {
    return { ...row, Path: row["Path"].filter((tag: any) => tag !== "") };
  });
  return final;
};

export const PageRelation = (data: any) => {};

interface StackElement {
  id: number;
  level: number;
  index: number;
}

export const SectionRelation = (data: any) => {
  let final: any = [...data];
  let level: any = new Stack<StackElement>();

  final = final.filter((row: any) => row.Text !== null);
  let cur_index = 0;
  level.push({ id: -1, level: -1, index: 0 });

  final = final.map((row: any) => {
    if (row.heading_level_dept !== -1) {
      //heading_level_dept,pdf_row_id
      let cur = level.peek();

      if (cur.level < row.heading_level_dept) {
        cur_index = 0;
      }

      console.log(cur, cur_index, cur.level, row.heading_level_dept);

      while (cur.level >= row.heading_level_dept) {
        level.pop();
        cur = level.peek();
      }
      cur_index = cur.index + 1;

      level.push({
        id: row.pdf_row_id,
        level: row.heading_level_dept,
        index: cur_index,
      });
      return { ...row, parent_pdf_row_id: cur.id, index_id: cur.index };
    } else {
      return { ...row, parent_pdf_row_id: -1, index_id: 0 };
    }
  });
  console.log(final);
  return final;
};

export const buildTree = (data: any) => {
  const tree: any = [];
  const childrenMap: any = {};

  console.log(data);

  // First, create a mapping of children for quick lookup
  data.forEach((item: any) => {
    const { pdf_row_id, parent_pdf_row_id } = item;
    childrenMap[pdf_row_id] = childrenMap[pdf_row_id] || [];
    item.children = childrenMap[pdf_row_id];
    if (parent_pdf_row_id === -1) {
      tree.push(item);
    } else {
      childrenMap[parent_pdf_row_id] = childrenMap[parent_pdf_row_id] || [];
      childrenMap[parent_pdf_row_id].push(item);
    }
  });
  console.log(tree);
  return tree;
};

export const downloadJsonFile: any = (data: any, filename: any) => {
  const jsonBlob = new Blob([JSON.stringify(data)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(jsonBlob);

  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();

  URL.revokeObjectURL(url);
};

export const downloadExcel = (data: any) => {
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
  //let buffer = XLSX.write(workbook, { bookType: "xlsx", type: "buffer" });
  //XLSX.write(workbook, { bookType: "xlsx", type: "binary" });
  XLSX.writeFile(workbook, "heading_level_dept.xlsx");
};

export default PDFRestructure;
