import React from "react";

export const HtmlTagMapper = (props: any) => {
  let { Text, innerHtml, CSS, tagName, dept } = props;
  Text = `${Text}`;
  const pattern = /^row\d+$/;

  switch (tagName) {
    case "th":
    case "td":
    case "p":
    case "li":
    case "lbody":
    case "title":
    case "paragraphspan":
    case "sub":
      return <p style={CSS} contentEditable>{Text}</p>;
    case "div":
      return <div style={CSS} contentEditable>{Text}</div>;
    case "h1":
      return <h1 style={CSS} contentEditable>{Text}</h1>;
    case "h2":
      return <h2 style={CSS} contentEditable>{Text}</h2>;
    case "h3":
      return <h2 style={CSS} contentEditable>{Text}</h2>;
    case "reference":
      return (
        <>
          <a href="#" style={CSS}>
            {Text}
          </a>
          <br />
        </>
      );
    case "lbl":
    case "span":
      return <span style={CSS} contentEditable>{Text}</span>;
    default:
      if (pattern.test(tagName)) {
        return <p style={CSS} contentEditable>{Text}</p>;
      }

      return null;
  }
};

export default HtmlTagMapper;
