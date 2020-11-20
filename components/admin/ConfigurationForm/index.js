import { Fragment, useState } from "react";
import { Grid, Typography, TextField, ListItem, FormLabel, ListItemText, RadioGroup, Radio, IconButton, FormControl,  FormControlLabel, Collapse, List } from "@material-ui/core/"
import EditIcon from '@material-ui/icons/Edit'
import ExpandLess from "@material-ui/icons/ExpandLess"
import ExpandMore from "@material-ui/icons/ExpandMore"
import DeleteIcon from '@material-ui/icons/Delete'
import BorderInnerIcon from '@material-ui/icons/BorderInner'
import BorderVerticalIcon from '@material-ui/icons/BorderVertical'
import BorderClearIcon from '@material-ui/icons/BorderClear'
import AddIcon from '@material-ui/icons/Add'
import withStore from "../../../utils/withStore";
import {customUseState} from "../../../utils/customHooks"
import { makeStyles } from "@material-ui/core/styles"
export default props => {
    const [openPatrols, setOpenPatrols] = customUseState(false)
    const [openCrimes, setOpenCrimes] = customUseState(false)
    return (
        <Fragment>
            <Typography align="center" variant="h5">
                Изменение конфигурации системы
            </Typography>
            <List>
                <ListItem>
                <ListItemText primary="город" />
                <ListItemText primary="city" />
                <IconButton>
                    <EditIcon/>
                </IconButton>
                </ListItem>
                <ListItem button onClick={setOpenPatrols.bind(null, !openPatrols)}>
                    <ListItemText primary="районы патрулирования" />
                    {openPatrols ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={openPatrols} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItem>
                                <TextField label="введите текст" />
                                <IconButton>
                                    <AddIcon/>
                                </IconButton>
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="Северный" />
                                <IconButton>
                                    <DeleteIcon/>
                                </IconButton>
                            </ListItem>
                        </List>
                </Collapse>
                <ListItem button onClick={setOpenCrimes.bind(null, !openCrimes)}>
                    <ListItemText primary="Список преступлений" />
                    {openCrimes ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={openCrimes} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItem>
                                <TextField label="введите текст" />
                                <IconButton>
                                    <AddIcon/>
                                </IconButton>
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="Убийство" />
                                <IconButton>
                                    <DeleteIcon/>
                                </IconButton>
                            </ListItem>
                        </List>
                </Collapse>
                <ListItem button>
                    <ListItemText primary="Службы раскрытия преступлений" />
                    {false ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={true} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItem>
                                <Grid container direction="column">
                                    <TextField label="введите текст" />
                                    <FormControl component="fieldset">
                                        <FormLabel component="legend">Метка на значке преступления</FormLabel>
                                        <RadioGroup aria-label="gender" value="twoLine" onChange={() => {}}>
                                            <FormControlLabel value="twoLine" control={<Radio color="primary" />} label={<BorderInnerIcon/>} />
                                            <FormControlLabel value="oneLine" control={<Radio color="primary" />} label={<BorderVerticalIcon/>} />
                                            <FormControlLabel value="withoutLine" control={<Radio color="primary" />} label={<BorderClearIcon/>} />
                                        </RadioGroup>
                                    </FormControl>
                                </Grid>
                                <IconButton>
                                    <AddIcon/>
                                </IconButton>
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="войсковой наряд" />
                                <IconButton>
                                    <DeleteIcon/>
                                </IconButton>
                            </ListItem>
                        </List>
                </Collapse>
            </List>
        </Fragment> 
    )
}