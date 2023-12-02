import { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { FilterMatchMode } from "primereact/api";
import { Button } from "primereact/button";

export const App = () => {
	const [users, setUsers] = useState([]);
	const [selectedProducts, setSelectedProducts] = useState([]);
	const [globalFilterValue, setGlobalFilterValue] = useState("");
	const [filters, setFilters] = useState({
		global: {value: null, matchMode: FilterMatchMode.CONTAINS},
		name: {value: null, matchMode: FilterMatchMode.CONTAINS},
		email: {value: null, matchMode: FilterMatchMode.CONTAINS},
		roll: {value: null, matchMode: FilterMatchMode.CONTAINS}
	});
	
	const onRowEditComplete = (e) => {
		const _users = [...users];
		const { newData, index } = e;
		_users[index] = newData;
		setUsers(_users);
	}
	
	const textEditor = (options) => {
		return <InputText type="text" value={options.value} onChange={(e) => options.editorCallback(e.target.value)}/>
	}
	
	const onGlobalFilterChange = (e) => {
		const value = e.target.value;
		const _filters = {...filters};
		_filters["global"].value = value;
		setFilters(_filters);
		setGlobalFilterValue(value);
	}
	
	useEffect(() => {
		const getData = async () => {
			const response = await fetch("https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json");
			const result = await response.json();
			setUsers(result);
		}
		getData();
	}, []);
	
	return (
		<DataTable
			value={users}
			selection={selectedProducts}
			selectionPageOnly
			onSelectionChange={(e) => setSelectedProducts(e.value)}
			dataKey="id"
			tableStyle={{minWidth: '50rem'}}
			paginator
			paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
			currentPageReportTemplate="Page {currentPage} of {totalPages}"
			rows={10}
			editMode="row"
			onRowEditComplete={onRowEditComplete}
			globalFilterFields={["name", "email", "role"]}
			filters={filters}
			header={
				<div className="flex justify-content-end">
					<span className="p-input-icon-left">
						<i className="pi pi-search" />
						<InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Search..."/>
					</span>
					<Button
						style={{ marginLeft: "2rem" }}
						type="button"
						severity="danger"
						icon="pi pi-trash"
						disabled={selectedProducts.length === 0}
						onClick={() => {
							setUsers(users.filter((user) => !selectedProducts.includes(user)));
							setSelectedProducts([]);
						}}
					/>
				</div>
			}
		>
			<Column selectionMode="multiple" headerStyle={{width: '3rem'}}/>
			<Column field="name" header="Name" editor={(options) => textEditor(options)}/>
			<Column field="email" header="Email" editor={(options) => textEditor(options)}/>
			<Column field="role" header="Role" editor={(options) => textEditor(options)}/>
			<Column rowEditor field="edit" header="Edit"/>
			<Column field="delete" header="Delete" body={(data, props) => {
				return (
					<Button
						type="button"
						severity="danger"
						icon="pi pi-trash"
						onClick={(e) => setUsers(users.filter((user) => user !== data))}
					/>
				);
			}}/>
		</DataTable>
	);
}