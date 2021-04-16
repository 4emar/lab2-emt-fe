import React, {useEffect, useState} from "react";
import {withRouter} from "react-router";
import {withStyles, makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {API_DRIVER} from "../../config";
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import BookmarkOutlinedIcon from '@material-ui/icons/BookmarkOutlined';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import IconButton from "@material-ui/core/IconButton/IconButton";
import EditDialog from "../UI/EditDialog";
import AddDialog from "../UI/AddDialog";

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: "gray",
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

const useStyles = makeStyles({
    table: {
        minWidth: 700,
    },
});

const Books = () => {
    const classes = useStyles();
    const [books, setBooks] = useState(null);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [addDialogOpen, setAddDialogOpen] = useState(false);
    const [selectedBook, setSelectedBook] = useState(null);

    const getBooks = () => {
        API_DRIVER.get("/api/book")
            .then(response => {
                setBooks(response.data);
            })
            .catch(error => {
                //TODO
            })
    };

    const markAsTakenBook = (bookId) => {
        const markAsTakenBookDto = {
            id: bookId
        };
        API_DRIVER.patch("api/book/librarian/takeBook", markAsTakenBookDto)
            .then(res => {
                getBooks();
            })
            .catch(error => {
                //TODO
            })
    };

    const deleteBook = (bookId) => {
        API_DRIVER.delete("api/book/librarian/" + bookId)
            .then(res => {
                getBooks()
            })
            .catch(error => {
                //TODO
            })
    };

    const handleEditClick = (book) => {
        setSelectedBook(book);
        setEditDialogOpen(true);
    };

    useEffect(() => {
        getBooks();
    }, []);

    return (
        <React.Fragment>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="left">Book Name</StyledTableCell>
                            <StyledTableCell align="left">Available Copies</StyledTableCell>
                            <StyledTableCell align="left">Category</StyledTableCell>
                            <StyledTableCell align="left">Author Name</StyledTableCell>
                            <StyledTableCell align="left"/>
                            <StyledTableCell align="right">
                                <IconButton onClick={() => setAddDialogOpen(true)} aria-label="delete">
                                    <AddIcon color="primary"/>
                                </IconButton>
                            </StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {books !== null ? books.map((book) => (
                            <StyledTableRow key={"book-row-" + book.id}>
                                <StyledTableCell component="th" scope="row">
                                    {book.name}
                                </StyledTableCell>
                                <StyledTableCell align="left">{book.availableCopies}</StyledTableCell>
                                <StyledTableCell align="left">{book.ecategory}</StyledTableCell>
                                <StyledTableCell align="left">{book.authorName}</StyledTableCell>
                                <StyledTableCell align="left">

                                    <IconButton onClick={() => markAsTakenBook(book.id)} aria-label="delete">
                                        <BookmarkOutlinedIcon color={"action"}/>
                                    </IconButton>

                                    <IconButton onClick={() => handleEditClick(book)} aria-label="delete">
                                        <EditIcon color={"primary"}/>
                                    </IconButton>

                                    <IconButton onClick={() => deleteBook(book.id)} aria-label="delete">
                                        <DeleteOutlineOutlinedIcon color={"error"}/>
                                    </IconButton>

                                </StyledTableCell>
                            </StyledTableRow>
                        )) : null}
                    </TableBody>
                </Table>
            </TableContainer>

            <EditDialog open={editDialogOpen}
                        refresh={getBooks}
                        handleCloseClick={() => setEditDialogOpen(false)}
                        selectedBook={selectedBook}/>

            <AddDialog open={addDialogOpen}
                       refresh={getBooks}
                       handleCloseClick={() => setAddDialogOpen(false)}
            />

        </React.Fragment>
    );
};

export default withRouter(Books);