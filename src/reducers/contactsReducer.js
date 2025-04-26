export const initialState = {
	contacts: [],
	filteredContacts: [],
	searchTerm: "",
	loading: false,
	error: null,
};

const filterContacts = (contacts, searchTerm) => {
	if (!searchTerm) return contacts;
	return contacts.filter(
		(contact) =>
			contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			contact.email.toLowerCase().includes(searchTerm.toLowerCase())
	);
};
export const contactsReducer = (state, action) => {
	switch (action.type) {
		case "FETCH_CONTACTS_REQUEST":
			return { ...state, loading: true, error: null };
		case "FETCH_CONTACTS_SUCCESS": {
			const { contacts, searchTerm } = action.payload;
			return {
				...state,
				contacts,
				searchTerm,
				filteredContacts: filterContacts(state.contacts, searchTerm),
				loading: false,
				error: null,
			};
		}
		case "FETCH_CONTACTS_FAILURE":
			return { ...state, loading: false, error: action.payload };
		case "SET_SEARCH_TERM": {
			const { searchTerm } = action.payload;
			return {
				...state,
				searchTerm,
				filteredContacts: filterContacts(state.contacts, searchTerm),
				loading: false,
				error: null,
			};
		}
		case "DELETE_CONTACT":
			return {
				...state,
				contacts: state.contacts.filter((contact) => contact.id !== action.payload),
				filteredContacts: state.filteredContacts.filter((contact) => contact.id !== action.payload),
			};
		case "ADD_CONTACT": {
			const updatedContacts = [...state.contacts, action.payload];
			return {
				...state,
				contacts: updatedContacts,
				filteredContacts: filterContacts(updatedContacts, state.searchTerm),
			};
		}
		case "UPDATE_CONTACT": {
			// let contactIndex = state.contacts.findIndex((contact) => contact.id === action.payload.id);
			// let updatedContacts = [...state.contacts];
			// updatedContacts[contactIndex] = action.payload;
			const updatedContacts = state.contacts.map((contact) =>
				contact.id === action.payload.id ? action.payload : contact
			);
			return {
				...state,
				contacts: updatedContacts,
				filteredContacts: filterContacts(updatedContacts, state.searchTerm),
			};
		}
		default:
			return state;
	}
};
