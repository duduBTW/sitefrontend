import { Breadcrumbs, Menu, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { useSideNavStyles } from "../sideNav/styles";

import TreeView from "@material-ui/lab/TreeView";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { useCurrent } from "pages/_app";
import { getBreadcrumbsProsesmt } from "./controller";
import { useRouter } from "next/router";
import { StyledTreeItem } from "../sideNav";

import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import { useFetch } from "@/shared/services/useFetch";

export default function BreadcrumbsProsesmt() {
  const { current } = useCurrent();
  const history = useRouter();
  const locs: any = getBreadcrumbsProsesmt();
  const [anchorEl, setAnchorEl] = useState({
    index: null,
    el: null,
  });

  const close = () => {
    setAnchorEl({
      index: null,
      el: null,
    });
  };

  const renderItems = (childrenBefore: string[]) => {
    return (
      <TreeView
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
        style={{ padding: 10 }}
        multiSelect
      >
        {childrenBefore.map((itemA) => {
          const itemInfo = locs.find((item) => item.name === itemA);

          if (itemInfo?.custom) return itemInfo.custom(close);

          if (!itemInfo?.link) return <> </>;

          return (
            <StyledTreeItem
              //@ts-ignore
              onLabelClick={(e: React.MouseEvent<HTMLLIElement>) => {
                if (itemInfo.link !== "/") {
                  history.push(itemInfo.link);
                  setAnchorEl({
                    index: null,
                    el: null,
                  });
                }
              }}
              nodeId={itemA}
              label={itemA}
            >
              {Array.isArray(itemInfo.children) && itemInfo.children.length > 0
                ? itemInfo.children.map((node: any) => renderTree(node))
                : null}
            </StyledTreeItem>
          );
        })}
      </TreeView>
    );
  };

  const renderTree = (node: string) => {
    const itemInfo = locs.find((item) => item.name === node);
    if (itemInfo?.custom) return itemInfo.custom(close);
    if (!itemInfo?.link) return <> </>;

    return (
      <StyledTreeItem
        //@ts-ignore
        onLabelClick={(e: React.MouseEvent<HTMLLIElement>) => {
          if (itemInfo.link !== "/") {
            history.push(itemInfo.link);
            setAnchorEl({
              index: null,
              el: null,
            });
          }
        }}
        nodeId={itemInfo.name}
        label={itemInfo.name}
      >
        {Array.isArray(itemInfo.children) && itemInfo.children.length > 0
          ? itemInfo.children.map((node: any) => renderTree(node))
          : null}
      </StyledTreeItem>
    );
  };

  if (!current) return null;

  let last = locs.find((item) => item.name === current);
  if (!last) return null;
  let stack = [last];

  while (last?.before) {
    last = locs.find((item) => item.name === last?.before);
    stack = [last, ...stack];
  }

  return (
    <Breadcrumbs
      separator={
        <NavigateNextIcon style={{ color: "white" }} fontSize="small" />
      }
      aria-label="breadcrumb"
    >
      {stack.map((item, index) => (
        <div>
          <Header item={item} setAnchorEl={setAnchorEl} index={index} />
          {/* <Typography
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
              history.push(item.link);
            }}
            onContextMenu={(e: React.MouseEvent<HTMLButtonElement>) => {
              console.log(`item.children`, item.children);
              if (item.children) {
                e.preventDefault();
                setAnchorEl({
                  el: e.currentTarget,
                  index,
                });
              }
            }}
            style={{ cursor: "pointer", color: "white" }}
            // color="textPrimary"
          >
            {item.name}
          </Typography> */}
          {item.children && (
            <Menu
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              MenuListProps={{ disablePadding: true }}
              anchorEl={anchorEl.el}
              getContentAnchorEl={null}
              keepMounted={false}
              open={Boolean(anchorEl.index === index)}
              onClose={close}
              style={{ padding: 0, margin: 0 }}
            >
              <div>{renderItems(item.children)}</div>
            </Menu>
          )}
        </div>
      ))}
    </Breadcrumbs>
  );
}

function Header({ item, setAnchorEl, index }) {
  const history = useRouter();
  const { data } = useFetch<any>(item.url);

  console.log(`item.url`, item.url);
  console.log(`data`, data);

  return (
    <Typography
      variant="subtitle2"
      onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
        history.push(item.link);
      }}
      onContextMenu={(e: React.MouseEvent<HTMLButtonElement>) => {
        console.log(`item.children`, item.children);
        if (item.children) {
          e.preventDefault();
          setAnchorEl({
            el: e.currentTarget,
            index,
          });
        }
      }}
      style={{ cursor: "pointer", color: "white" }}
      // color="textPrimary"
    >
      <div style={{ display: "flex", flexDirection: "column" }}>
        {item.name}
        <Typography variant="caption">{data && data[item.prop]}</Typography>
      </div>
    </Typography>
  );
}
