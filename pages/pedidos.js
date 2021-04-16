import React, { useEffect, useState } from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import PersonIcon from '@material-ui/icons/Person';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
// core components
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Parallax from "components/Parallax/Parallax.js";

import styles from "assets/jss/nextjs-material-kit/pages/profilePage.js";
import api from "../services/api";

const useStyles = makeStyles(styles);

export default function ProfilePage(props) {
    const classes = useStyles();
    const { ...rest } = props;

    var cores = [
        "warning",
        "success",
        "danger",
        "info",
        "primary"
    ];
      
    const [loading, setLoading] = useState()
    const [cardAtivo, setCardAtivo] = useState(true)
    const [pedidosDados, setPedidosDados] = useState([])

    useEffect(() => {
        async function getData() {
            setLoading(true)
            const pedidos = await api.get('/pedidos')
            .then(res => {
                return res.data
            })
            .finally(() => {
                setLoading(false)  
            })            
            setPedidosDados(pedidos)
        }
        getData()
    },[])

    return (
        <div style = {{cursor: `${loading ? "progress": "auto"}`}} >
        <Header
            color="white"
            rightLinks={<HeaderLinks />}
            fixed
            changeColorOnScroll={{
            height: 100,
            color: "white"
            }}
            {...rest}
        />
        <Parallax small filter image={require("assets/img/profile-bg.jpg")} />
            <div className={classNames(classes.main, classes.mainRaised)} >
                <div >     
                    <GridContainer alignItems="flex-start" justify = "flex-start" style = {{margin: "1rem 0"}} >  
                        {pedidosDados.map(dados => (
                            <GridItem key = {dados.id} xs={12} sm={6} md={4} lg= {3} style = {{marginTop: "1rem"}}>
                            <CustomTabs 
                                headerColor= {`${cores[Math.floor(Math.random()*cores.length)]}`}
                                tabs={[
                                {                                   
                                    tabName: "Geral",
                                    tabIcon: InsertDriveFileIcon,
                                    tabContent: (
                                    <p className={classes.textCenter}  >
                                        <strong>ID do Pedido: </strong>{dados.id} <br />
                                        <strong>Cliente: </strong>{dados.cliente.nome} <br />
                                        <strong>Valor: </strong>R$ {parseFloat(dados.valorTotal).toFixed(2)} <br />
                                        <strong>Data: </strong>{dados.createdAt.substring(8,10) + "/" + dados.createdAt.substring(5,7) + "/" + dados.createdAt.substring(0,4)} as 
                                        {" " + dados.createdAt.substring(11,13) + ":" + dados.createdAt.substring(14,16) }
                                    </p>
                                    )
                                },
                                {
                                    tabName: "",
                                    tabIcon: ShoppingCartIcon,
                                    tabContent: (
                                        <div className={classes.selected} >
                                            Produtos: <br />
                                            <ol>
                                                {dados.produtos.map(produto => (
                                                    <li key = {produto.id} >
                                                        {produto.produto.nome + " - " + produto.produto.valor}
                                                    </li>
                                                ))}
                                            </ol>
                                        </div>
                                    )
                                },
                                {
                                    tabName: "",
                                    tabIcon: PersonIcon,
                                    tabContent: (  
                                        <div >                                      
                                            <li style = {{listStyle: "none"}} >
                                                <strong>Nome: </strong>{dados.cliente.nome}
                                            </li>
                                            <li style = {{listStyle: "none"}} >
                                            <strong>Telefone: </strong>{dados.cliente.telefone}
                                            </li>
                                            <li style = {{listStyle: "none"}} >
                                            <strong>Data de Nascimento: </strong>{dados.cliente.dataNascimento}
                                            </li>
                                        </div>
                                    )
                                },
                                ]}
                            />
                            </GridItem>
                        ))}
                    </GridContainer>
                </div>
            </div>
        <Footer />
        </div>
    );
}
