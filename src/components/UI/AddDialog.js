import {useEffect, useState} from "react";
import React from "react";
import Dialog from "@material-ui/core/Dialog/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import TextField from "@material-ui/core/TextField/TextField";
import FormControl from "@material-ui/core/FormControl/FormControl";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import Select from "@material-ui/core/Select/Select";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import Button from "@material-ui/core/Button/Button";
import {API_DRIVER} from "../../config";

const AddDialog = (props) => {
    const [bookCategory, setBookCategory] = useState("");
    const [categories, setCategories] = useState(null);
    const [bookName, setBookName] = useState("");
    const [authorId, setAuthorId] = useState("");
    const [availableCopies, setCopies] = useState("");

    const getCategories = () => {
        API_DRIVER.get("/api/book/user/categories")
            .then(response => {
                setCategories(response.data);
            })
            .catch(error => {
                //TODO
            })
    };

    const addBook = (refresh) => {
        const addBookDto = {
            name: bookName,
            ecategory : bookCategory,
            availableCopies: availableCopies,
            authorId: authorId
        };

        API_DRIVER.post("/api/book/librarian", addBookDto)
            .then(response => {
                refresh();
            })
            .catch(error => {
                //TODO
            })
    };

    const handleAddClick = () => {
        addBook(props.refresh);
        props.handleCloseClick();
    };

    useEffect(() => {
        getCategories();
    }, []);

    return (
        <React.Fragment>
            <Dialog open={props.open} onClose={props.handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add Book</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Book name"
                        type="text"
                        fullWidth
                        value={bookName}
                        onChange={(event) => setBookName(event.target.value)}
                    />
                    <FormControl fullWidth={true}>
                        <InputLabel id="demo-simple-select-label">Book Category</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={bookCategory}
                            onChange={(event) => setBookCategory(event.target.value)}
                        >
                            {categories ? categories.map((category, index) => (
                                <MenuItem key={index} value={category}>
                                    {category}
                                </MenuItem>
                            )) : null};

                        </Select>
                    </FormControl>
                    <TextField
                        margin="dense"
                        id="copies"
                        label="Available copies"
                        type="number"
                        fullWidth
                        value={availableCopies}
                        onChange={(event) => setCopies(event.target.value)}
                    />
                    <TextField
                        margin="dense"
                        id="author"
                        label="Author ID"
                        type="number"
                        value={authorId}
                        onChange={(event) => setAuthorId(event.target.value)}
                        fullWidth
                    />

                </DialogContent>
                <DialogActions>
                    <Button onClick={props.handleCloseClick} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={() => handleAddClick()} color="primary">
                        Add
                    </Button>
                </DialogActions>
            </Dialog>

        </React.Fragment>
    );

};

export default AddDialog;