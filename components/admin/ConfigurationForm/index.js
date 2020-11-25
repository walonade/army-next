import { Fragment, useCallback, useEffect, useState } from "react";
import { Grid, Typography, TextField, ListItem, FormLabel, ListItemText, RadioGroup, Radio, IconButton, FormControl,  FormControlLabel, Collapse, List, ListItemIcon } from "@material-ui/core/"
import EditIcon from '@material-ui/icons/Edit'
import ExpandLess from "@material-ui/icons/ExpandLess"
import ExpandMore from "@material-ui/icons/ExpandMore"
import DeleteIcon from '@material-ui/icons/Delete'
import BorderInnerIcon from '@material-ui/icons/BorderInner'
import BorderVerticalIcon from '@material-ui/icons/BorderVertical'
import BorderClearIcon from '@material-ui/icons/BorderClear'
import AddIcon from '@material-ui/icons/Add'
import CloseIcon from '@material-ui/icons/Close';
import SaveIcon from '@material-ui/icons/Save';
import {customUseState} from "../../../utils/customHooks"
import withStore from "../../../utils/withStore";
export default withStore((props) => {
    const {sistemData, changeSistemData} = props.store.SistemDataStore
    const [openPatrols, setOpenPatrols] = customUseState(false)
    const [openCrimes, setOpenCrimes] = customUseState(false)
    const [openService, setOpenService] = customUseState(false)
    const [fieldPatrol, setFieldPatrol] = useState("")
    const [fieldCrime, setFieldCrime] = useState("")
    const [fieldService, setFieldService] = useState("")
    const [isEdit, setEdit] = customUseState(false)
    const [city, setCity] = useState("")
    const [serviceIcon, setServiceIcon] = useState("withoutLine")
    const handleSetServiceIcon = useCallback(event => {
        setServiceIcon(event.target.value)
    }, [serviceIcon])
    useEffect(() => {
        setCity(sistemData.city)
    }, [sistemData.city])
    const handleSetCity = useCallback(event => setCity(event.target.value), [city])
    const handleSetFieldPatrol = useCallback(event => setFieldPatrol(event.target.value),[fieldPatrol])
    const handleSetFieldCrime = useCallback(event => setFieldCrime(event.target.value), [fieldCrime])
    const handleSetFieldService = useCallback(event => setFieldService(event.target.value))
    const changeCity = () => {
        if(city === "") {
            props.store.NotificationStore.add(
                "поле не должно быть пустым",
                "warning"
            )
        } else if(city === sistemData.city) {
            props.store.NotificationStore.add(
                "данное значение уже существует",
                "warning"
            )
        } else {
            changeSistemData({...JSON.parse(JSON.stringify(sistemData)), city})
            setEdit(false)
        }
    }
    const addToBase = (field, objKey) => {
        if(field === "") {
            props.store.NotificationStore.add(
                "поле не должно быть пустым",
                "warning"
            )
        } else if (sistemData[objKey].includes(field)) {
            props.store.NotificationStore.add(
                "данное значение уже существует",
                "warning"
            )
        } else {
            const data = JSON.parse(JSON.stringify(sistemData))
            changeSistemData({...data, 
                [objKey]: [...data[objKey], field]
            })
        }
    }
    const addService = () => {
        if(fieldService === "") {
            props.store.NotificationStore.add(
                "поле не должно быть пустым",
                "warning"
            )
        } else if (sistemData["serviceList"].find(el => el.name === fieldService)) {
            props.store.NotificationStore.add(
                "данное значение уже существует",
                "warning"
            )
        } else {
            const data = JSON.parse(JSON.stringify(sistemData))
            changeSistemData({...data, 
                ["serviceList"]: [...data["serviceList"], {name: fieldService, icon: serviceIcon}]
            })
        }
    }
    const removeFromBase = (field, objKey) => {
        const data = JSON.parse(JSON.stringify(sistemData))
        changeSistemData({...data, 
            [objKey]: data[objKey].filter(item => item !== field)
        })
    }
    const removeFromService = field => {
        const data = JSON.parse(JSON.stringify(sistemData))
        changeSistemData({...data, 
            ["serviceList"]: data["serviceList"].filter(item => item.name !== field)
        })
    }
    return (
        <Fragment>
            <Typography align="center" variant="h5">
                Изменение конфигурации системы
            </Typography>
            <List>
                <ListItem>
                <ListItemText primary="город" />
                {!isEdit 
                ? <ListItemText primary={sistemData.city} />
                : <TextField value={city} onChange={handleSetCity}/>}
                {!isEdit ?  
                <IconButton onClick={setEdit.bind(null, true)}>
                    <EditIcon/> 
                </IconButton>
                :
                <Fragment>
                    <IconButton onClick={changeCity}>
                        <SaveIcon/>
                    </IconButton>
                    <IconButton onClick={setEdit.bind(null, false)}>
                        <CloseIcon/>
                    </IconButton>   
                </Fragment>
                }
                </ListItem>
                <ListItem button onClick={setOpenPatrols.bind(null, !openPatrols)}>
                    <ListItemText primary="районы патрулирования" />
                    {openPatrols ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={openPatrols} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItem>
                                <TextField label="введите текст" value={fieldPatrol} onChange={handleSetFieldPatrol}/>
                                <IconButton onClick={addToBase.bind(null, fieldPatrol, "patrols")}>
                                    <AddIcon/>
                                </IconButton>
                            </ListItem>
                            {sistemData.patrols.map(patrol => (
                                <ListItem key={patrol}>
                                    <ListItemText primary={patrol} />
                                    <IconButton onClick={removeFromBase.bind(null, patrol, "patrols")}>
                                        <DeleteIcon/>
                                    </IconButton>
                                </ListItem>
                            ))}
                        </List>
                </Collapse>
                <ListItem button onClick={setOpenCrimes.bind(null, !openCrimes)}>
                    <ListItemText primary="Список преступлений" />
                    {openCrimes ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={openCrimes} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItem>
                                <TextField label="введите текст" value={fieldCrime} onChange={handleSetFieldCrime}/>
                                <IconButton onClick={addToBase.bind(null, fieldCrime, "crimesList")}>
                                    <AddIcon/>
                                </IconButton>
                            </ListItem>
                            {sistemData.crimesList.map(crime => (
                            <ListItem key={crime}>
                                <ListItemText primary={crime} />
                                <IconButton onClick={removeFromBase.bind(null, crime, "crimesList")}>
                                    <DeleteIcon/>
                                </IconButton>
                            </ListItem>
                            ))}
                        </List>
                </Collapse>
                <ListItem button onClick={setOpenService.bind(null, !openService)}>
                    <ListItemText primary="Службы раскрытия преступлений" />
                    {openService ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={openService} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItem>
                                <Grid container direction="column">
                                    <TextField label="введите текст" value={fieldService} onChange={handleSetFieldService}/>
                                    <FormControl component="fieldset">
                                        <FormLabel component="legend">Метка на значке преступления</FormLabel>
                                        <RadioGroup value={serviceIcon} onChange={handleSetServiceIcon}>
                                            <FormControlLabel value="twoLine" control={<Radio color="primary" />} label={<BorderInnerIcon/>} />
                                            <FormControlLabel value="oneLine" control={<Radio color="primary" />} label={<BorderVerticalIcon/>} />
                                            <FormControlLabel value="withoutLine" control={<Radio color="primary" />} label={<BorderClearIcon/>} />
                                        </RadioGroup>
                                    </FormControl>
                                </Grid>
                                <IconButton onClick={addService}>
                                    <AddIcon/>
                                </IconButton>
                            </ListItem>
                            {sistemData.serviceList.map(service => (
                                <ListItem key={service.name}>
                                    <ListItemText primary={service.name} />
                                    <ListItemIcon>
                                    {service.icon === "twoLine" ? <BorderInnerIcon/>
                                    : service.icon === "oneLine" ? <BorderVerticalIcon/>
                                    : <BorderClearIcon/>}
                                    </ListItemIcon>
                                    <IconButton onClick={removeFromService.bind(null, service.name)}>
                                        <DeleteIcon/>
                                    </IconButton>
                                </ListItem>
                            ))}
                        </List>
                </Collapse>
            </List>
        </Fragment> 
    )
})