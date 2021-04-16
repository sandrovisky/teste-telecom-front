import React, { useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import PostAddIcon from '@material-ui/icons/PostAdd';
// core components
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";
import CustomInput from "components/CustomInput/CustomInput.js";

import styles from "assets/jss/nextjs-material-kit/pages/loginPage.js";

import image from "assets/img/bg7.jpg";
import api from "../services/api";

const useStyles = makeStyles(styles);

export default function LoginPage(props) {
    const [nome, setNome] = useState('')
    const [valor, setValor] = useState('')    
    const [loading, setLoading] = useState(false)

    const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
    setTimeout(function() {
        setCardAnimation("");
    }, 700);
    const classes = useStyles();
    const { ...rest } = props;

    async function cadastrarProduto(e) {
        e.preventDefault()
        const data = {
            nome, valor
        }
        setLoading(true)
        await api.post('/produtos', data)
        .then(response => {
            alert("Cadastrado com sucesso")
            console.log(response.data)
            window.location.reload()
        })
        .catch(err => {
            alert(err.response.data.message)
            console.log(err.response)
        })
        .finally(() => {
            setloading(false)
        })
    }

    function handleChangeValor(e) {
        if(e.target.value.replace(",","").length > 1) {
            setValor(e.target.value.replace(",","").slice(0, -2) + ',' + e.target.value.replace(",","").slice(-2))
        } else {
            setValor(e.target.value)
        }
    }

    return (
        <div style = {{cursor: `${loading ? "progress": "auto"}`}}> 
        <Header
            absolute
            rightLinks={<HeaderLinks />}
            {...rest}
        />
        <div
            className={classes.pageHeader}
            style={{
            backgroundImage: "url(" + image + ")",
            backgroundSize: "cover",
            backgroundPosition: "top center"
            }}
        >
            <div className={classes.container}>
            <GridContainer justify="center">
                <GridItem xs={12} sm={6} md={4}>
                <Card className={classes[cardAnimaton]}>
                    <form className={classes.form} onSubmit = {e => cadastrarProduto(e)} >
                    <CardHeader color="primary" className={classes.cardHeader}>
                        <h2>Cadastrar Novo Produto</h2>
                    </CardHeader>
                    <CardBody>
                        <CustomInput
                        labelText="Nome"
                        id="nome"
                        formControlProps={{
                            fullWidth: true,
                        }}
                        inputProps={{
                            type: "text",
                            onChange: e => setNome(e.target.value),
                            required: true,
                            value: nome,
                            endAdornment: (
                            <InputAdornment position="end">
                                <PostAddIcon className={classes.inputIconsColor} />
                            </InputAdornment>
                            )
                        }}
                        />
                        <CustomInput
                        labelText="Valor"
                        id="valor"
                        formControlProps={{
                            fullWidth: true
                        }}
                        inputProps={{
                            type: "text",
                            onChange: e => handleChangeValor(e),
                            value: valor,
                            required: true,
                            endAdornment: (
                            <InputAdornment position="end">
                                <AttachMoneyIcon className={classes.inputIconsColor} />
                            </InputAdornment>
                            )
                        }}
                        />
                    </CardBody>
                    <CardFooter className={classes.cardFooter}>
                        <Button simple type = "submit" color="primary" size="lg">
                        Cadastrar
                        </Button>
                    </CardFooter>
                    </form>
                </Card>
                </GridItem>
            </GridContainer>
            </div>
            <Footer whiteFont />
        </div>
        </div>
    );
}
