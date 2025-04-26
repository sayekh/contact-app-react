import React, { useContext, useState } from "react";
import { ContactsContent } from "../contexts/ContactsContent";

import style from "./Contact.module.css";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
function Contacts({ showModal, setShowModal }) {
	const { filteredContacts, loading, error } = useContext(ContactsContent).state;
	const { dispatch } = useContext(ContactsContent);
	const [selectedIds, setSelectedIds] = useState([]);
	const editHandler = (id) => {
		setShowModal((prev) => ({
			...prev,
			renderModal: true,
			content: filteredContacts.find((contact) => contact.id === id),
		}));
	};
	const toggleSelect = (id) => {
		setSelectedIds((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
	};
	const deleteContact = (id) => {
		dispatch({ type: "DELETE_CONTACT", payload: id });
		if (selectedIds.includes(id)) {
			setSelectedIds((prev) => prev.filter((item) => item !== id));
		}
	};
	const deleteGroup = () => {
		selectedIds.forEach((id) => {
			dispatch({ type: "DELETE_CONTACT", payload: id });
		});
		setSelectedIds([]);
	};
	const unselectAll = () => {
		const ids = filteredContacts.map((item) => item.id);
		const updatedSelectedIds = [...new Set([...ids, ...selectedIds])];
		setSelectedIds(() => updatedSelectedIds);
	};
	const none = () => {
		const ids = filteredContacts.map((item) => item.id);
		const updatedSelectedIds = selectedIds.filter((item) => !ids.includes(item));
		setSelectedIds(() => updatedSelectedIds);
	};

	if (loading) return <p>loadiiiiiing .....</p>;
	if (error) return <p>{error}</p>;
	return (
		<div>
			<div className={style.actionBar}>
				<button
					className={style.add}
					onClick={() => setShowModal((prev) => ({ ...prev, renderModal: true }))}
				>
					افزودن مخاطب
				</button>
				<div className={style.selection}>
					{filteredContacts.length > 0 && <button onClick={unselectAll}>انتخاب همه موارد </button>}
					{filteredContacts.length > 0 && <button onClick={none}>لغو همه موارد</button>}
					{selectedIds.length > 0 && (
						<button onClick={deleteGroup} className={style.deleteGroup}>
							حذف گروهی ({selectedIds.length}) مورد
						</button>
					)}
				</div>
			</div>
			<ul className={style.contactList}>
				{filteredContacts.length > 0 ? (
					filteredContacts.map((contact) => (
						<li key={contact.id}>
							<div className={style.content}>
								<input
									type="checkbox"
									checked={selectedIds.includes(contact.id)}
									onChange={() => toggleSelect(contact.id)}
								/>
								<span>{contact.name}</span>
								<span>{contact.email}</span>
							</div>
							<div className={style.actions}>
								<button onClick={() => deleteContact(contact.id)} className={style.delete}>
									<DeleteOutlineIcon />
								</button>
								<button onClick={() => editHandler(contact.id)} className={style.edit}>
									<EditIcon />
								</button>
							</div>
						</li>
					))
				) : (
					<div>no contacts</div>
				)}
			</ul>
		</div>
	);
}

export default Contacts;
