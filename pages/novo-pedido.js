import React, { useEffect, useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
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

import styles from "assets/jss/nextjs-material-kit/pages/loginPage.js";

import image from "assets/img/bg7.jpg";
import api from "../services/api";
import { InputLabel, MenuItem, Select } from "@material-ui/core";

const useStyles = makeStyles(styles);

export default function LoginPage(props) {
    const [loading, setloading] = useState(false)
    const [menuClientes, setMenuClientes] = useState([])
    const [menuProdutos, setMenuProdutos] = useState([])
    const [prodSelecionados, setProdSelecionados] = useState([])
    const [produto, setProduto] = useState('')
    const [cliente, setCliente] = useState('')
    const [total, setTotal] = useState(0)

    useEffect(() => {
        async function getData() {
            setloading(true)
            let options = []

            const clientes = await api.get('/clientes')
                .then(res => {
                    return res.data
                })

            clientes.map(dados => (
                options.push(
                    <MenuItem key={dados.id} value={dados.id}>{dados.nome}</MenuItem>
                )
            ))

            setMenuClientes(options)

            const produtos = await api.get('/produtos')
                .then(res => {
                    return res.data
                })
            options = []
            produtos.map(dados => (
                options.push(
                    <MenuItem key={dados.id} value={{ nome: dados.nome[0].toUpperCase() + dados.nome.substr(1), valor: dados.valor, id: dados.id }}>{dados.nome[0].toUpperCase() + dados.nome.substr(1) + " -  R$ " + dados.valor}</MenuItem>
                )
            ))
            setloading(false)
            setMenuProdutos(options)
        }
        getData()
    }, [])

    const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
    setTimeout(function () {
        setCardAnimation("");
    }, 700);
    const classes = useStyles();
    const { ...rest } = props;

    async function cadastrarPedido(e) {
        e.preventDefault()
        setloading(true)
        if (!cliente) {
            return alert("Selecione um cliente.")
        }

        if (!total) {
            return alert("Adicione pelo menos um produto ao pedido.")
        }

        let arrayProd = []
        prodSelecionados.map(dados => (
            arrayProd.push(dados[2])
        ))

        const dataPedido = {
            idCliente: cliente,
            valorTotal: total,
            produtos: arrayProd
        }

        await api.post('/pedidos', dataPedido)
            .then(() => {
                alert("Cadastrado com sucesso.")
                window.location.reload()
            })
            .catch(() =>
                alert("Erro ao cadastrar")
            )
            .finally(() => {
                setloading(false)
            })
    }

    function adicionarProduto() {
        console.log(parseFloat(produto.valor.replace(",", ".")))
        const lista = prodSelecionados
        lista.push([produto.nome, produto.valor, produto.id])
        if (produto) {
            setProdSelecionados([...lista]);
        } else {
            alert("Selecione um produto.")
        }
        setTotal(total + parseFloat(produto.valor.replace(",", ".")))
    }

    function deletarDaLista(e) {
        setTotal(total - parseFloat(prodSelecionados[e][1].replace(",", ".")))
        var antigoArray = prodSelecionados
        antigoArray.splice(e, 1)
        setProdSelecionados([...antigoArray])
    }

    return (
        <>
            <div style={{ cursor: `${loading ? "progress" : "auto"}` }}>

                <Header
                    absolute
                    brandComponent="oxe"
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
                            <GridItem xs={12} sm={10} md={8} >
                                <Card className={classes[cardAnimaton]}>
                                    <form className={classes.form} onSubmit={e => cadastrarPedido(e)} >
                                        <CardHeader color="primary" className={classes.cardHeader}>
                                            <h3>Novo Pedido</h3>
                                        </CardHeader>
                                        <CardBody>
                                            <GridContainer justify="center">
                                                <GridItem >
                                                    <InputLabel id="label">Selecione o Cliente</InputLabel>
                                                    <Select
                                                        style={{ width: "100%" }}
                                                        labelId="demo-customized-select-label"
                                                        id="demo-customized-select"
                                                        onChange={e => setCliente(e.target.value)}
                                                        value={cliente}
                                                    >
                                                        {menuClientes}
                                                    </Select>
                                                    <GridContainer justify="center">
                                                        <GridItem xs={12} sm={8} md={10} >
                                                            <InputLabel style={{ marginTop: "1rem" }} id="label">Selecione o Produto</InputLabel>
                                                            <Select
                                                                inputProps={{
                                                                    required: true
                                                                }}
                                                                onChange={e => setProduto(e.target.value)}
                                                                value={produto}
                                                                style={{ width: "100%" }}
                                                                labelId="demo-customized-select-label"
                                                                id="demo-customized-select"
                                                            >
                                                                {menuProdutos}
                                                            </Select>
                                                        </GridItem>
                                                        <GridItem xs={12} sm={4} md={2} >
                                                            <Button simple color="primary" onClick={() => adicionarProduto()} size="sm" style={{ marginTop: "40px", marginLeft: "-20px" }} >
                                                                Adicionar
                                                            </Button>
                                                        </GridItem>
                                                    </GridContainer>

                                                </GridItem>
                                            </GridContainer>
                                            <ol>
                                                {prodSelecionados.map((dados, index) => (

                                                    <li key={index} style={{ listStyle: "none" }}>{dados[0]} R${dados[1]}
                                                        {
                                                            <Button simple color="primary" size="sm" onClick={() => deletarDaLista(index)} style={{ width: "5px" }} >
                                                                <DeleteForeverIcon />
                                                            </Button>
                                                        }
                                                    </li>
                                                ))}
                                            </ol>
                                            <h4 style={{ textAlign: "end" }} >Total: R$ {total.toFixed(2)}</h4>
                                        </CardBody>
                                        <CardFooter className={classes.cardFooter}>
                                            <Button simple color="primary" type="submit" size="lg">
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
