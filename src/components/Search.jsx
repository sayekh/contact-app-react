import { useContext, useState, useEffect } from "react";
import { ContactsContent } from "../contexts/ContactsContent";
import axios from "axios";

import style from "./Search.module.css";
import SearchIcon from "@mui/icons-material/Search";

function Search() {
	const { state, dispatch } = useContext(ContactsContent);
	const [search, setSearch] = useState("");

	useEffect(() => {
		setSearch(state.searchTerm);
	}, [state.searchTerm]);

	const handleSearch = async () => {
		try {
			await axios.put("http://localhost:3001/searchTerm", { id: 1, value: search });
			dispatch({ type: "SET_SEARCH_TERM", payload: { searchTerm: search } });
		} catch (err) {
			console.error("خطا در آپدیت searchTerm در json:", err);
		}
	};
	return (
		<div className={style.search}>
			<input value={search} onChange={(e) => setSearch(e.target.value)} />
			<button onClick={handleSearch}>
				جستجو
				<SearchIcon style={{paddingRight:"10px"}}/>
			</button>
		</div>
	);
}

export default Search;
