/*eslint-disable*/
import React from "react";
import Link from "next/link";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Tooltip from "@material-ui/core/Tooltip";
import Icon from "@material-ui/core/Icon";

// @material-ui/icons
import { Add } from "@material-ui/icons";
import ListIcon from '@material-ui/icons/List';

// core components
import CustomDropdown from "components/CustomDropdown/CustomDropdown.js";
import Button from "components/CustomButtons/Button.js";

import styles from "assets/jss/nextjs-material-kit/components/headerLinksStyle.js";

const useStyles = makeStyles(styles);

export default function HeaderLinks(props) {
  const classes = useStyles();
  return (
    <List className={classes.list}>
        <ListItem className={classes.listItem}>
            <CustomDropdown
            noLiPadding
            navDropdown
            buttonText="Cadastros"
            buttonProps={{
                className: classes.navLink,
                color: "transparent"
            }}
            buttonIcon={Add}
            dropdownList={[
                <Link href="/novo-cliente">
                    <a className={classes.dropdownLink}>Cadastrar Cliente</a>
                </Link>,
                <Link href="/novo-produto">
                    <a className={classes.dropdownLink}>Cadastrar Produto</a>
                </Link>,
            ]}
            />
        </ListItem>
        <ListItem className={classes.listItem}>
        <Link href="/novo-pedido">
            <Button          
            color="transparent"
            className={classes.navLink}
            >
            <Icon className={classes.icons}>add</Icon> Novo Pedido
            </Button>
            </Link>
        </ListItem>
        <ListItem className={classes.listItem}>
        <Link href="/pedidos">
            <Button          
            color="transparent"
            className={classes.navLink}
            >
            <Icon className={classes.icons}>list_icon</Icon>Pedidos
            </Button>
            </Link>
        </ListItem>
    </List>
  );
}
