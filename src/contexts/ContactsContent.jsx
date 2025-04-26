import { createContext, useReducer, useEffect } from "react";
import { contactsReducer, initialState } from "../reducers/contactsReducer";
import axios from "axios";

export const ContactsContent = createContext();

function ContactsProvider({ children }) {
	const [state, dispatch] = useReducer(contactsReducer, initialState);

	useEffect(() => {
		const fetchContactsInfos = async () => {
			dispatch({ type: "FETCH_CONTACTS_REQUEST" });
			try {
				const res = await axios.get("http://localhost:3001/contacts");
				const searchTerm = await axios.get("http://localhost:3001/searchTerm");
				// console.log(res.data);
				// console.log(searchTerm.data);
				dispatch({
					type: "FETCH_CONTACTS_SUCCESS",
					payload: { contacts: res.data, searchTerm: searchTerm.data.value },
				});
			} catch (err) {
				dispatch({ type: "FETCH_CONTACTS_FAILURE", payload: err.message });
			}
		};
		fetchContactsInfos();
	}, []);
	return <ContactsContent.Provider value={{ state, dispatch }}>{children}</ContactsContent.Provider>;
}

export default ContactsProvider;
