import React, { useState, useContext } from "react";
import { ContactsContent } from "../contexts/ContactsContent";

import style from "./AddContactModal.module.css";

function AddContactModal({ onClose, content }) {
	const { state, dispatch } = useContext(ContactsContent);
	const contacts = state.contacts;
	const [form, setForm] = useState(
		content === null
			? {
					name: "",
					email: "",
					job: "",
					address: "",
			  }
			: content
	);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setForm((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const existingContact = checkContact();
		if (existingContact) {
			alert("این مخاطب قبلا اضافه شده است.");
			return;
		} else {
			if (content) {
				dispatch({ type: "UPDATE_CONTACT", payload: { ...form, id: content.id } });
				onClose();
				return;
			} else {
				let id = Math.floor(Math.random() * 100);
				const newContact = {
					id,
					...form,
				};
				dispatch({ type: "ADD_CONTACT", payload: newContact });
				onClose();
				return;
			}
		}
	};

	const checkContact = () => {
		let existingContact = contacts.find(
			(contact) =>
				(contact.name === form.name || contact.email === form.email) &&
				(content ? contact.id !== content.id : true)
		);
		return existingContact;
	};
	return (
		<div className={style.modal}>
			<h2>افزودن مخاطب جدید</h2>
			<form onSubmit={handleSubmit} className={style.modalContent}>
				<input name="name" value={form.name} onChange={handleChange} placeholder="نام" required />
				<input name="email" value={form.email} onChange={handleChange} placeholder="ایمیل" required />
				<input name="job" value={form.job} onChange={handleChange} placeholder="شغل" />
				<input name="address" value={form.address} onChange={handleChange} placeholder="آدرس" />

				<div>
					<button type="button" onClick={onClose}>
						بستن
					</button>
					<button>{content ? "ویرایش" : "افزودن"}</button>
				</div>
			</form>
		</div>
	);
}

export default AddContactModal;
