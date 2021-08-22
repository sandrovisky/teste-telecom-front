import React, { useEffect, useState } from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import GetAppIcon from "@material-ui/icons/GetApp";
import DescriptionIcon from "@material-ui/icons/Description";
import StarHalfIcon from "@material-ui/icons/StarHalf";
// core components
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Parallax from "components/Parallax/Parallax.js";
import Quote from "components/Typography/Quote.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import SearchIcon from "@material-ui/icons/Search";
import { InputLabel, MenuItem, Select } from "@material-ui/core";

import styles from "assets/jss/nextjs-material-kit/pages/profilePage.js";
import api from "../services/api";
import { Link } from "@material-ui/core";

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

    var genre = [
        "mmorpg", 
        "shooter", 
        "strategy", 
        "moba", 
        "racing", 
        "sports", 
        "social",
        "card", 
        "mmo", 
        "fantasy", 
        "sci-fi", 
        "fighting", 
        "action",
    ]

    var platforms = [
        "pc", "browser"
    ]

    const [loading, setLoading] = useState()
    const [dados, setDados] = useState([])
    const [allGames, setAllGames] = useState([])
    const [sPlatform, setSPlatform] = useState("")
    const [sGenre, setSGenre] = useState("")
    const [vSearch, setVSearch] = useState("")
    let sSearch = ""

    useEffect(() => {
        async function getData() {
            api.get("/games").then(function (response) {
                let array = response.data.sort((a, b) => (a.title > b.title) ? 1 : -1);
                setDados(array)
                setAllGames(array)
            }).catch(function (error) {
                console.error(error);
            });
        }
        getData()
    }, [])
    
    useEffect(() => {
        filter()
    }, [sPlatform, sGenre, vSearch])


    async function getAllGames() {
        return await api.get("/games").then(async function (response) {
            console.log(response.data)
            let array = response.data.sort((a, b) => (a.title > b.title) ? 1 : -1);
            return array
        }).catch(function (error) {
            console.error(error);
        });
    }

    async function search(e) {
        e.preventDefault()
        setVSearch(sSearch)
    }

    async function plataformFilter(e) {
        setSPlatform(e.target.value)
    }

    async function genreFilter(e) {
        setSGenre(e.target.value)
    }

    function filter(array_filtered) {
        let filtered_data = allGames
        let filtered_aux = []

        if (sPlatform) {
            filtered_aux = []
            filtered_data.map(item => {
                if (item.platform.toUpperCase().search(sPlatform.toUpperCase()) != -1) {
                    filtered_aux.push(item)
                }
            })
            filtered_data = filtered_aux
        }
        
        if (sGenre) {
            filtered_aux = []
            filtered_data.map(item => {
                if (item.genre.toUpperCase().search(sGenre.toUpperCase()) != -1) {
                    filtered_aux.push(item)
                }
            })
            filtered_data = filtered_aux
        }
        
        if (vSearch) {
            filtered_aux = []
            filtered_data.map(item => {
                if (item.title.toUpperCase().search(vSearch.toUpperCase()) != -1) {
                    filtered_aux.push(item)
                }
            })
            filtered_data = filtered_aux
        }
        setDados(filtered_data)
    }

    async function clearFilters() {
        setSPlatform("")
        setVSearch("")
        setSGenre("")
        document.getElementById("search").value = ""
    }

    return (
        <div >
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
                <div style={{ marginLeft: "50px" }}>
                    <GridContainer >
                        <GridItem style={{marginTop: "10px"}} xs={12} sm={6} md={4} lg={3} >
                            <form onSubmit={e => search(e)}>
                                <CustomInput
                                    labelText="Search Title"
                                    inputProps={{
                                        id: "search",
                                        type: "text",
                                        onChange: e => sSearch = e.target.value
                                    }}
                                />
                                <Button type="submit" size="sm" required style={{ marginTop: "20px", marginLeft: "10px" }} variant="contained" color="primary">
                                    <SearchIcon className={classes.icons} />
                                </Button>
                            </form>
                        </GridItem>
                        <GridItem style={{marginTop: "20px"}} xs={12} sm={6} md={4} lg={3} >
                            <InputLabel id="label">Select Platform</InputLabel>
                            <Select
                                labelId="demo-customized-select-label"
                                id="demo-customized-select"
                                onChange={e => plataformFilter(e)}
                                value={sPlatform}                                
                                style={{ width: "100%" }}
                            >                                
                                 <MenuItem key={""} value={" "}>{" "}</MenuItem>
                                 {platforms.map((e, x) => <MenuItem key={x} value={e}>{e}</MenuItem>)}
                            </Select>
                        </GridItem>
                        <GridItem style={{marginTop: "20px"}} xs={12} sm={6} md={4} lg={3} >
                            <InputLabel id="label">Select Genre</InputLabel>
                            <Select
                                labelId="demo-customized-select-label"
                                id="demo-customized-select"
                                onChange={e => genreFilter(e)}
                                value={sGenre}                                
                                style={{ width: "100%" }}
                            >                                
                                 <MenuItem key={""} value={""}>{""}</MenuItem>
                                 {genre.map((e, x) => <MenuItem key={x} value={e}>{e}</MenuItem>)}
                            </Select>
                        </GridItem>
                        <GridItem style={{marginTop: "20px"}} xs={12} sm={6} md={4} lg={3} >                            
                        <Button size="sm" required style={{ marginTop: "20px", marginLeft: "10px" }} variant="contained" color="warning" onClick={() => clearFilters()}>
                                    Clear
                                </Button>
                        </GridItem>
                    </GridContainer>
                    <GridContainer justify="center">
                    </GridContainer>
                </div>
                <div >
                    <GridContainer alignItems="flex-start" justify="flex-start" style={{ margin: "1rem 0" }} >
                        {dados.map(item => (
                            <GridItem key={item.id} xs={12} sm={6} md={4} lg={3} style={{ marginTop: "1rem" }}>
                                <CustomTabs
                                    headerColor={`${cores[Math.floor(Math.random() * cores.length)]}`}
                                    tabs={[
                                        {
                                            tabName: "",
                                            tabIcon: DescriptionIcon,
                                            tabContent: (
                                                <div>
                                                    <h4 style={{ textAlign: "center" }} >{item.title}</h4>
                                                    <img src={item.thumbnail} style={{ width: "100%" }} ></img>
                                                    <div className={classes.typo}><br />
                                                        <div className={classes.note}><b>Description</b></div>
                                                        <Quote
                                                            text={item.short_description}
                                                        />
                                                    </div>
                                                    <div className={classes.typo}>
                                                        <div className={classes.note}><b>Genre</b></div>
                                                        <p>{item.genre}
                                                        </p>
                                                    </div>
                                                    <div className={classes.typo}>
                                                        <div className={classes.note}><b>Platform</b></div>
                                                        <p>{item.platform}
                                                        </p>
                                                    </div>
                                                    <div className={classes.typo}>
                                                        <div className={classes.note}><b>Developer</b></div>
                                                        <p>{item.developer}
                                                        </p>
                                                    </div>
                                                    <div className={classes.typo}>
                                                        <div className={classes.note}><b>Publisher</b></div>
                                                        <p>{item.publisher}
                                                        </p>
                                                    </div>
                                                    <div className={classes.typo}>
                                                        <div className={classes.note}><b>Release Date</b></div>
                                                        <p>{item.release_date.split("-")[2]}/{item.release_date.split("-")[1]}/{item.release_date.split("-")[0]}
                                                        </p>
                                                    </div>
                                                </div>
                                            ),
                                        },
                                        {
                                            tabName: "",
                                            tabIcon: StarHalfIcon,
                                            tabContent: (
                                                <div className={classes.selected} >
                                                    Produtos: <br />
                                                </div>
                                            )
                                        },
                                        {
                                            tabName: "",
                                            tabIcon: GetAppIcon,
                                            tabContent: (
                                                <div >
                                                    <Link href={item.game_url}>
                                                        <Button className={classes.navLink} color="primary">Download<GetAppIcon className={classes.icons} /></Button>
                                                    </Link>
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
