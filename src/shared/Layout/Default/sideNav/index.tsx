import Drawer from "@material-ui/core/Drawer";
import React from "react";

import Divider from "@material-ui/core/Divider";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import TreeItem from "@material-ui/lab/TreeItem";
import TreeView from "@material-ui/lab/TreeView";
import NestedMenuItem from "material-ui-nested-menu-item";

import { withStyles, fade } from "@material-ui/core/styles";
import clsx from "clsx";

import navigation, { SidenavItem } from "./_nav";
import { Typography } from "@material-ui/core";
import { useSideNavStyles } from "./styles";

export const StyledTreeItem = withStyles((theme) => ({
  iconContainer: {
    "& .close": {
      opacity: 0.3,
    },
  },
  group: {
    marginLeft: 7,
    paddingLeft: 10,
    borderLeft: `1px dashed ${fade(theme.palette.primary.main, 0.6)}`,
  },
  label: {
    padding: theme.spacing(1),
    marginRight: theme.spacing(1),
    marginTop: theme.spacing(1),
    paddingLeft: theme.spacing(2),
    borderRadius: 10,
  },
  // @ts-ignore
}))((props) => <TreeItem {...props} />);

function SideNav({
  open,
  handleDrawerOpen,
  handleClick,
  handleDrawerClose,
  selectedIndex,
  openColls,
  changePage,
  handleMenuClose,
  anchorEl,
  auth,
}: any) {
  const classes = useSideNavStyles();
  const [menuPosition, setMenuPosition] =
    React.useState<{
      top: number;
      left: number;
      index: number;
    } | null>(null);
  const renderItems = (nodes: SidenavItem[]) =>
    nodes.map((itemNode) => {
      const { Icon } = itemNode;
      return (
        <StyledTreeItem
          // @ts-ignore
          onLabelClick={
            !Array.isArray(itemNode.children)
              ? () => changePage(itemNode.url, 0)
              : null
          }
          key={itemNode.url}
          nodeId={itemNode.url}
          label={
            <div className={classes.labelRoot}>
              {Icon && (
                <Icon
                  color="primary"
                  size="small"
                  className={classes.labelIcon}
                />
              )}
              <Typography className={classes.labelText} variant="body2">
                {itemNode.name}
              </Typography>
            </div>
          }
        >
          {Array.isArray(itemNode.children)
            ? itemNode.children.map((node: any) => renderTree(node))
            : null}
        </StyledTreeItem>
      );
    });

  const renderTree = (nodes: SidenavItem) => (
    <StyledTreeItem
      // @ts-ignore
      onLabelClick={
        !Array.isArray(nodes.children) ? () => changePage(nodes.url, 0) : null
      }
      key={nodes.url}
      nodeId={nodes.url}
      label={nodes.name}
    >
      {Array.isArray(nodes.children)
        ? // @ts-ignore
          nodes.children.map((node) => renderTree(node))
        : null}
    </StyledTreeItem>
  );

  const renderItemsMenu = (nodes: SidenavItem) =>
    !Array.isArray(nodes.children) ? (
      <MenuItem
        onClick={() => {
          setMenuPosition(null);
          changePage(nodes.url, 0);
        }}
      >
        {nodes.name}
      </MenuItem>
    ) : (
      <NestedMenuItem
        label={nodes.name}
        parentMenuOpen={!!menuPosition}
        onClick={handleItemClick}
      >
        {nodes.children.map((node: SidenavItem) => renderItemsMenu(node))}
      </NestedMenuItem>
    );

  const handleRightClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number
  ) => {
    if (menuPosition) {
      return;
    }
    event.preventDefault();
    setMenuPosition({
      top: event.clientY,
      left: event.clientX,
      index,
    });
  };

  const handleItemClick = () => {
    setMenuPosition(null);
  };

  return (
    <Drawer
      variant="permanent"
      className={clsx(classes.drawer, {
        [classes.drawerOpen]: open,
        [classes.drawerClose]: !open,
      })}
      classes={{
        paper: clsx({
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        }),
      }}
    >
      <div className={classes.toolbar}></div>
      <Divider />
      <List>
        <div className={classes.toolbarRight}>
          <IconButton
            className={clsx(classes.sideNavClose, {
              [classes.hide]: open,
            })}
            onClick={handleDrawerOpen}
          >
            <ChevronRightIcon />
          </IconButton>
          <IconButton
            className={clsx(classes.sideNavClose, {
              [classes.hide]: !open,
            })}
            onClick={handleDrawerClose}
          >
            <ChevronLeftIcon />
          </IconButton>
        </div>
        {open ? (
          <TreeView
            defaultCollapseIcon={<ExpandMore />}
            defaultExpanded={["root"]}
            defaultExpandIcon={<ChevronRightIcon />}
          >
            {renderItems(navigation.items)}
          </TreeView>
        ) : (
          <>
            {navigation.items.map((text, index) => (
              <>
                <ListItem
                  onClick={
                    text.children
                      ? (e) => handleRightClick(e, index)
                      : () => changePage(text.url, index)
                  }
                  selected={selectedIndex === index}
                  button
                  key={text.name}
                >
                  <ListItemIcon>
                    {text.Icon && <text.Icon color="primary" size="small" />}
                    {!open && text.children && <ChevronRightIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text.name} />
                  {text.children &&
                    (openColls[index] ? <ExpandLess /> : <ExpandMore />)}
                </ListItem>
                <Menu
                  open={!!(menuPosition && menuPosition.index === index)}
                  onClose={() => setMenuPosition(null)}
                  anchorReference="anchorPosition"
                  anchorPosition={
                    menuPosition
                      ? { top: menuPosition.top, left: menuPosition.left }
                      : { top: 0, left: 0 }
                  }
                  className={classes.menuUwU}
                >
                  {renderItemsMenu(text)}
                </Menu>
              </>
            ))}
          </>
        )}
      </List>
    </Drawer>
  );
}

export default React.memo(SideNav);
