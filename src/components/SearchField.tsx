import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import ProgressIcon from "./ProgressIcon";
import axios from "axios";
import { useState, useContext } from "react";
import { ArticlesContext } from "../providers/ArticlesProvider";

export default function SearchField(): JSX.Element {
  const [isScraping, setIsScraping] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [inputIsEmpty, setInputIsEmpty] = useState(false);
  const [, setArticles] = useContext(ArticlesContext);

  function keywordChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setKeyword(e.target.value);
  }

  async function searchArticlesHandler(e: React.FormEvent) {
    e.preventDefault();
    if (!keyword) {
      setInputIsEmpty(true);
      return;
    }
    setInputIsEmpty(false);
    setIsScraping(true);

    try {
      const response = await axios.post(
        "",
        keyword
      );
      console.log(response.data);
      setArticles(response.data);
      setIsScraping(false);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Paper
      component="form"
      sx={{
        p: "3px 4px",
        display: "flex",
        alignItems: "center",
        maxWidth: 400,
        borderRadius: "7px",
        flex: 1,
        border: inputIsEmpty ? "2px solid red" : "none",
      }}
      onSubmit={searchArticlesHandler}
    >
      {isScraping && <ProgressIcon />}
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Szukaj wiadomości z dzisiaj"
        inputProps={{ "aria-label": "search news" }}
        onChange={keywordChangeHandler}
      />

      <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}
