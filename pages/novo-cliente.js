import React, { useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
// @material-ui/icons
import PhoneIcon from '@material-ui/icons/Phone';
import People from "@material-ui/icons/People";
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
    const [loading, setloading] = useState(false)
    const [telefone, setTelefone] = useState('')
    const [dataNasc, setDataNascimento] = useState('')
    
    const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
    setTimeout(function() {
        setCardAnimation("");
    }, 700);
    const classes = useStyles();
    const { ...rest } = props;

    async function cadastrarCliente(e) {
        e.preventDefault()

        var date = new Date(dataNasc)
        var day = date.getDate();
        if(day < 10) {
            day = "0" + day
        }
        var month = date.getMonth() + 1;
        if(month < 10) {
            month = "0" + month
        }
        var year = date.getFullYear();
        const dataNascimento = day+"/"+month+"/"+year
        const data = {
            nome: nome[0].toUpperCase() + nome.substr(1), telefone, dataNascimento
        }        
        setloading(true)
        
        await api.post('/clientes', data)
        .then(() => {
            alert("Cadastrado com sucesso")
            window.location.reload()
        })
        .catch(err => {
            console.log(err.response)
            alert(err.response.data.message)
            console.log(err.response)
        })
        .finally(() => {
            setloading(false)
        })
    }    

    function handleChangeTelefone(e) {
        if(telefone.length === 2) {
            setTelefone("(" + telefone + ")")
        } else if(telefone.length === 9) {
            setTelefone(telefone + "-")
        } else if(telefone.length > 13 ){
            return
        } else {
            setTelefone(e.target.value)
        }
    }

    return (
        <>
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
                    <form className={classes.form} onSubmit = {e => cadastrarCliente(e)} >
                    <CardHeader color="primary" className={classes.cardHeader}>
                        <h3> Cadastrar Novo Cliente</h3>
                        <div className={classes.socialLine}>
                        
                        </div>
                    </CardHeader>
                    <CardBody>
                        <CustomInput
                        labelText="Nome"
                        id="nome"
                        formControlProps={{
                            fullWidth: true
                        }}
                        inputProps={{
                            type: "text",
                            value: nome,                        
                            required: true,
                            maxLength: "2",
                            endAdornment: (
                            <InputAdornment position="end">
                                <People className={classes.inputIconsColor} />
                            </InputAdornment>
                            ),
                            onChange: e => setNome(e.target.value)
                        }}
                        />
                        <CustomInput
                        labelText="Telefone"
                        id="telefone"
                        formControlProps={{
                            fullWidth: true,                                                       
                        }}
                        inputProps={{
                            required: true, 
                            type: "text",
                            value: telefone,
                            endAdornment: (
                            <InputAdornment position="end">
                            <PhoneIcon />
                            </InputAdornment>
                            ),
                            onChange: e => handleChangeTelefone(e)
                        }}
                        />
                        <label >Data de Nascimento</label>
                        <CustomInput
                        id="dataNascimento"
                        formControlProps={{
                            fullWidth: true                
                        }}
                        inputProps={{
                            required: true, 
                            type: "date",
                            value: dataNasc,
                            onChange: e => setDataNascimento(e.target.value)
                        }}
                        />
                        
                    </CardBody>
                    <CardFooter className={classes.cardFooter}>
                        <Button simple color="primary" type = "submit" size="lg">
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
        </>
    );
}
