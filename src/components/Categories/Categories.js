import React, {useEffect, useState} from "react";
import {withRouter} from "react-router";
import {makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {API_DRIVER} from "../../config";
import Typography from "@material-ui/core/Typography/Typography";

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

const Categories = () => {

    const [categories, setCategories] = useState(null);


    const getCategories = () => {
        API_DRIVER.get("/api/book/user/categories")
            .then(response => {
                setCategories(response.data);
            })
            .catch(error => {
                //TODO
            })
    };

    useEffect(() => {
        getCategories();
    }, []);

    const classes = useStyles();

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">
                            <Typography variant="h6">
                                Category name
                            </Typography>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {categories !== null ? categories.map((category) => (
                        <TableRow key={category}>
                            <TableCell align="center">{category}</TableCell>
                        </TableRow>
                    )) : null}
                </TableBody>
            </Table>
        </TableContainer>
    );


};

export default withRouter(Categories);