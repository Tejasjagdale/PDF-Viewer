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
  return final;
};

export const addIndex = (data: any) => {
  let final: any = [...data];
  let level: any = new Stack<StackElement>();

  let cur_index = 0;
  level.push({ id: 1, level: -2, index: -1 });

  final = final.map((row: any) => {
    //heading_level_dept,pdf_row_id
    let cur = level.peek();

    while (cur.level > row.heading_level_dept) {
      level.pop();
      cur = level.peek();
    }

    if (cur.level < row.heading_level_dept && cur.level !== -1) {
      cur_index = 0;
    } else {
      cur_index = cur.index + 1;
    }

    if (cur.level === row.heading_level_dept) {
      level.pop();
    }

    level.push({
      id: row.pdf_row_id,
      level: row.heading_level_dept,
      index: cur_index,
    });

    console.log(cur, cur_index, cur.level, row.heading_level_dept);

    return { ...row, index_id: cur_index };
  });
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

export function sortPDFRows(data: any): any {
  const sortedData: any = [...data];

  sortedData.sort((a: any, b: any) => {
    // First, compare by level
    if (a.pdf_row_id < b.pdf_row_id) {
      return -1;
    }
    if (a.pdf_row_id > b.pdf_row_id) {
      return 1;
    }

    // If levels are the same, compare by index_id
    if (a.index_id < b.index_id) {
      return -1;
    }
    if (a.index_id > b.index_id) {
      return 1;
    }

    // Items are identical
    return 0;
  });
  console.log(sortedData);
  return sortedData;
}

export const getChild: any = (data: any, checkId: any) => {
  return data.filter((section: any) => section.parent_pdf_row_id === checkId);
};

export const getUniqueValues=(data:any)=> {
  const result:any = {};

  data.forEach((item:any) => {
    for (const key in item) {
      if (item.hasOwnProperty(key)) {
        if (!result[key]) {
          result[key] = new Set();
        }
        result[key].add(item[key]);
      }
    }
  });

  // Convert sets to arrays
  for (const key in result) {
    if (result.hasOwnProperty(key)) {
      result[key] = Array.from(result[key]);
    }
  }

  return result;
}

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
